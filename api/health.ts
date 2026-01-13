import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './db';
import mongoose from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const envCheck = process.env.MONGODB_URI ? 'defined' : 'missing';

        // Attempt Connection
        console.log("Health Check: Attempting to connect to DB...");
        await dbConnect();
        const dbState = mongoose.connection.readyState;
        const stateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];

        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            env_check: envCheck,
            db_connection_status: stateMap[dbState] || 'unknown',
            db_name: mongoose.connection.name || 'unknown'
        });
    } catch (error: any) {
        console.error("Health Check Failed:", error);
        return res.status(500).json({
            status: 'error',
            env_check: process.env.MONGODB_URI ? 'defined' : 'missing',
            error_message: error.message,
            stack: error.stack
        });
    }
}
