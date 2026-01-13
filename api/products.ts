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
    // 1. Check Environment Variable
    if (!process.env.MONGODB_URI) {
        return res.status(500).json({ error: 'Server Error: MONGODB_URI environment variable is not defined.' });
    }

    // 2. Connect to Database (Caught)
    try {
        await dbConnect();
    } catch (error: any) {
        console.error('Database connection failed:', error);
        return res.status(500).json({ error: `Database Connection Failed: ${error.message}` });
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

    // 4. Initialize Model (Lazy)
    const Product = getProductModel();

    // 5. Handle Methods
    if (req.method === 'GET') {
        try {
            const products = await Product.find({});

            // Return default list if empty (optional demo feature turned off for now, or on if you prefer)
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
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
    }

    if (req.method === 'POST') {
        try {
            console.log("POST Request received");

            if (!req.body) {
                console.error("req.body is missing!");
                return res.status(400).json({ error: 'Request body is empty or not parsed' });
            }

            const { category, name, desc } = req.body;
            console.log("Payload:", { category, name, desc });

            if (!category || !name || !desc) {
                return res.status(400).json({ error: 'Missing required fields (category, name, or desc)' });
            }

            const Product = getProductModel();

            // Debug: Check if we can find existing category
            console.log("Searching for category:", category);
            let productCategory = await Product.findOne({ category });

            if (productCategory) {
                console.log("Category found, pushing item");
                productCategory.items.push({ name, desc });
                await productCategory.save();
            } else {
                console.log("Category not found, creating new");
                productCategory = await Product.create({
                    category,
                    items: [{ name, desc }]
                });
            }

            console.log("Product saved successfully");
            return res.status(201).json({ message: 'Product added successfully', product: productCategory });
        } catch (error: any) {
            console.error("POST Error:", error);
            // Return the ACTUAL error message to the client
            return res.status(500).json({
                error: `Failed to add product: ${error.message}`,
                stack: error.stack
            });
        }
    }

    if (req.method === 'DELETE') {
        try {
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

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to delete product' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
