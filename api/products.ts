import type { VercelRequest, VercelResponse } from '@vercel/node';

// NOTE: We rely on DYNAMIC IMPORTS to catch module loading errors.
// Do not add top-level imports for mongoose or db models.

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        console.log(`[API] ${req.method} /api/products request starting...`);

        // 1. Dynamic Import: Mongoose & DB Connect
        // This ensures if the module fails to load, we catch it here.
        console.log("Loading modules...");
        const mongoose = (await import('mongoose')).default;
        const dbConnect = (await import('./db')).default;
        console.log("Modules loaded.");

        // 2. Define Schema (Dynamically)
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

        // 3. Check Environment Variable
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables");
        }

        // 4. Connect to Database
        try {
            await dbConnect();
        } catch (dbError: any) {
            console.error('Database connection failed:', dbError);
            return res.status(500).json({ error: `Database Connection Failed: ${dbError.message}` });
        }

        // 5. Admin Security Check (Write Operations)
        if (req.method === 'POST' || req.method === 'DELETE') {
            if (!process.env.ADMIN_PASSWORD) {
                return res.status(500).json({ error: 'Server Config Error: ADMIN_PASSWORD is missing.' });
            }
            const adminPassword = req.headers['x-admin-password'];
            if (adminPassword !== process.env.ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized: Incorrect Admin Password' });
            }
        }

        const Product = getProductModel();

        // 6. Handle Methods
        if (req.method === 'GET') {
            const products = await Product.find({});
            if (products.length === 0) {
                // Hardcoded Default Data used if DB is empty
                const defaultProducts = [
                    {
                        category: "Billing Solutions",
                        items: [
                            { name: "Billing Machine (POS)", desc: "All-in-one touch POS systems." },
                            { name: "Thermal Printers", desc: "High-speed 2-inch and 3-inch printers." },
                            { name: "Bill Rolls", desc: "Premium quality thermal paper." },
                            { name: "Billing Software", desc: "Easy-to-use billing software." }
                        ]
                    },
                    {
                        category: "Security Systems",
                        items: [
                            { name: "CCTV Cameras", desc: "HD, IP, and Wireless cameras." },
                            { name: "DVR/NVR Systems", desc: "Reliable recording systems." },
                            { name: "Biometric Attendance", desc: "Fingerprint and face recognition." }
                        ]
                    },
                    {
                        category: "Cash & Automation",
                        items: [
                            { name: "Cash Counting Machine", desc: "Accurate note counters." },
                            { name: "Weighing Machines", desc: "Digital weighing scales." },
                            { name: "Sealing Machines", desc: "Heat sealers." }
                        ]
                    }
                ];
                return res.status(200).json(defaultProducts);
            }
            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            if (!req.body) return res.status(400).json({ error: 'Request body is empty' });
            const { category, name, desc } = req.body;
            if (!category || !name || !desc) return res.status(400).json({ error: 'Missing required fields' });

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
            return res.status(201).json({ message: 'Product added successfully', product: productCategory });
        }

        if (req.method === 'DELETE') {
            const { categoryId, itemId } = req.body;
            if (!categoryId || !itemId) return res.status(400).json({ error: 'Missing required IDs' });

            const productCategory = await Product.findById(categoryId);
            if (!productCategory) return res.status(404).json({ error: 'Category not found' });

            productCategory.items = productCategory.items.filter((item: any) => item._id.toString() !== itemId);

            if (productCategory.items.length === 0) {
                await Product.findByIdAndDelete(categoryId);
            } else {
                await productCategory.save();
            }
            return res.status(200).json({ message: 'Product deleted' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (globalError: any) {
        console.error("FATAL HANDLER ERROR:", globalError);
        return res.status(500).json({
            error: "Critical Server Error (Caught)",
            message: globalError.message,
            stack: globalError.stack
        });
    }
}
