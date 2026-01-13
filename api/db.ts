import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// NOTE: We do NOT throw an error here anymore to prevent top-level crashes.
// We handle the missing variable inside the function.

export default async function dbConnect() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 10000,
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw error;
    }
}
