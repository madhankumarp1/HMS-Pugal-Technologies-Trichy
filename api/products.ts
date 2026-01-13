import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dbConnect from './db';

// Product Schema defined lazily to avoid top-level crashes
const getProductModel = () => {
    if (mongoose.models.Product) return mongoose.models.Product;
    const ProductSchema = new mongoose.Schema({
        category: { type: String, required: true },
        items: [{
            name: { type: String, required: true },
            desc: { type: String, required: true },
        }]
    });
    return mongoose.model('Product', ProductSchema);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // MASTER TRY/CATCH: This prevents "Invocation Failed" by catching EVERYTHING.
    try {
        console.log(`[API] ${req.method} /api/products request received`);

        // 1. Check Environment Variable
        if (!process.env.MONGODB_URI) {
            console.error("CRITICAL: MONGODB_URI is missing");
            return res.status(500).json({ error: 'Server Config Error: MONGODB_URI is missing.' });
        }

        // 2. Connect to Database
        try {
            await dbConnect();
        } catch (dbError: any) {
            console.error('Database connection failed:', dbError);
            return res.status(500).json({ error: `Database Connection Failed: ${dbError.message}` });
        }

        // 3. Admin Security Check (Write Operations)
        if (req.method === 'POST' || req.method === 'DELETE') {
            if (!process.env.ADMIN_PASSWORD) {
                return res.status(500).json({ error: 'Server Config Error: ADMIN_PASSWORD is missing in Vercel Environment Variables.' });
            }
            const adminPassword = req.headers['x-admin-password'];
            if (adminPassword !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized: Incorrect Admin Password' });
            }
        }

        // 4. Initialize Model
        let Product;
        try {
            Product = getProductModel();
        } catch (modelError: any) {
            console.error("Model Error:", modelError);
            return res.status(500).json({ error: `Server Error: Model initialization failed. ${modelError.message}` });
        }

        // 5. Handle Methods
        if (req.method === 'GET') {
            const products = await Product.find({});

            // Return default list if empty
            if (products.length === 0) {
                const defaultProducts = [
                    {
                        category: "Billing Solutions",
                        items: [
                            { name: "Billing Machine (POS)", desc: "All-in-one touch POS systems for retail and restaurants." },
                            { name: "Thermal Printers", desc: "High-speed 2-inch and 3-inch thermal receipt printers." },
                            { name: "Bill Rolls", desc: "Premium quality thermal paper rolls in all sizes." },
                            { name: "Billing Software", desc: "Easy-to-use software for inventory andGST billing." }
                        ]
                    },
                    {
                        category: "Security Systems",
                        items: [
                            { name: "CCTV Cameras", desc: "HD, IP, and Wireless cameras for home and business security." },
                            { name: "DVR/NVR Systems", desc: "Reliable recording systems with remote viewing capabilities." },
                            { name: "Biometric Attendance", desc: "Fingerprint and face recognition time attendance systems." }
                        ]
                    },
                    {
                        category: "Cash & Automation",
                        items: [
                            { name: "Cash Counting Machine", desc: "Accurate loose note counters with fake note detection." },
                            { name: "Weighing Machines", desc: "Digital weighing scales for shops and industrial use." },
                            { name: "Sealing Machines", desc: "Heat sealers for packaging efficiency." }
                        ]
                    }
                ];
                return res.status(200).json(defaultProducts);
            }

            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            console.log("POST Request Processing...");

            if (!req.body) {
                return res.status(400).json({ error: 'Request body is empty' });
            }

            const { category, name, desc } = req.body;

            if (!category || !name || !desc) {
                return res.status(400).json({ error: 'Missing required fields (category, name, or desc)' });
            }

            console.log("Searching for category:", category);
            let productCategory = await Product.findOne({ category });

            if (productCategory) {
                productCategory.items.push({ name, desc });
                await productCategory.save();
            } else {
                productCategory = await Product.create({
                    category,
                    items: [{ name, desc }]
                });
            }

            console.log("Product saved.");
            return res.status(201).json({ message: 'Product added successfully', product: productCategory });
        }

        if (req.method === 'DELETE') {
            const { categoryId, itemId } = req.body;

            if (!categoryId || !itemId) {
                return res.status(400).json({ error: 'Missing required IDs' });
            }

            const productCategory = await Product.findById(categoryId);
            if (!productCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }

            productCategory.items = productCategory.items.filter((item: any) => item._id.toString() !== itemId);

            if (productCategory.items.length === 0) {
                await Product.findByIdAndDelete(categoryId);
                return res.status(200).json({ message: 'Product and empty category deleted' });
            }

            await productCategory.save();
            return res.status(200).json({ message: 'Product deleted successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (globalError: any) {
        console.error("FATAL API HANDLER CRASH:", globalError);
        return res.status(500).json({
            error: "Internal Server Error (Crash Caught)",
            message: globalError.message,
            stack: globalError.stack
        });
    }
}
