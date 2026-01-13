import type { VercelRequest, VercelResponse } from '@vercel/node';

// CRITICAL DEBUG STEP: ZERO DEPENDENCIES
// We have removed 'mongoose' and 'dbConnect' imports to verify if they are causing the crash.

export default async function handler(req: VercelRequest, res: VercelResponse) {
    console.log(`[DEBUG] Method: ${req.method} URL: ${req.url}`);

    // Allow CORS just in case
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const mockData = [
        {
            _id: "debug_1",
            category: "DEBUG MODE ACTIVE",
            items: [
                { _id: "1", name: "System Online", desc: "Database connection disabled for testing." },
                { _id: "2", name: "Vercel Function", desc: "Working correctly." }
            ]
        }
    ];

    return res.status(200).json(mockData);
}
