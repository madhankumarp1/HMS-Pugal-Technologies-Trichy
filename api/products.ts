
import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dbConnect from './db';

// Define the Product Schema
// Note: In a real app, you might want to put this in a separate models folder
const ProductSchema = new mongoose.Schema({
    category: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        desc: { type: String, required: true },
    }]
});

// Prevent model recompilation error in serverless environment
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const products = await Product.find({});

            // If no products exist, return the default list (for demo purposes)
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

                // Optional: Uncomment to seed database automatically
                // await Product.insertMany(defaultProducts);

                return res.status(200).json(defaultProducts);
            }

            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
