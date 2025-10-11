import { MongoClient, Db } from 'mongodb';

// Comprehensive fix for Node.js SSL issues with MongoDB Atlas on Windows
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Enhanced connection options for Windows SSL compatibility
const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    family: 4,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    rejectUnauthorized: false,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    // Force fresh connection by clearing cache
    delete globalWithMongo._mongoClientPromise;

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
    const client = await clientPromise;
    return client.db(process.env.MONGODB_DB || 'alkainaat_learning_institute');
}