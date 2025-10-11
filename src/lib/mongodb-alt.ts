import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'alkainaat_learning_institute';

// MongoDB connection options
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    bufferCommands: false,
};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDatabase(): Promise<Db> {
    // Return cached database if available
    if (cachedDb) {
        return cachedDb;
    }

    try {
        // Create new client if not cached
        if (!cachedClient) {
            cachedClient = new MongoClient(uri, options);
        }

        // Connect and cache the database
        const client = await cachedClient.connect();
        cachedDb = client.db(dbName);

        return cachedDb;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}