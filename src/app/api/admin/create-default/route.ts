import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/mongodb-alt';

export async function POST() {
    // Prevent execution during build time
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
        return NextResponse.json({
            success: false,
            error: 'Database not configured'
        }, { status: 500 });
    }

    try {
        const db = await getDatabase();
        const adminsCollection = db.collection('admins');

        // Check if admin already exists
        const existingAdmin = await adminsCollection.findOne({ username: 'admin' });

        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                message: 'Admin user already exists'
            }, { status: 400 });
        }

        // Hash the default password
        const hashedPassword = await bcrypt.hash('admin123', 12);

        // Create default admin
        const admin = {
            username: 'admin',
            email: 'admin@alkainat.edu',
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date(),
            lastLogin: null
        };

        const result = await adminsCollection.insertOne(admin);

        return NextResponse.json({
            success: true,
            message: 'Default admin user created successfully',
            adminId: result.insertedId
        });
    } catch (error) {
        console.error('Create admin error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create admin user',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}