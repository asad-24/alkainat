import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';

export async function GET() {
    try {
        const db = await getDatabase();

        // Test the connection by pinging the database
        await db.admin().ping();

        // Test by listing collections
        const collections = await db.listCollections().toArray();

        return NextResponse.json({
            success: true,
            message: 'MongoDB connection successful!',
            database: db.databaseName,
            collections: collections.map(col => col.name),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to connect to MongoDB',
            details: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}