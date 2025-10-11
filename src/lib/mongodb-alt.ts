import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Alternative MongoDB connection with Node.js crypto and SSL handling
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true,
    ssl: true,
    sslValidate: true,
    directConnection: false
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getDatabase(): Promise<Db> {
    try {
        const client = await clientPromise;
        return client.db(process.env.MONGODB_DB || 'alkainaat_learning_institute');
    } catch (error) {
        console.error('MongoDB connection failed (alternative method):', error);
        throw error;
    }
}