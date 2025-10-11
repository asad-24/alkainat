import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/mongodb';

export async function POST() {
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