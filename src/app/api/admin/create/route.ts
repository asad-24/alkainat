import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/mongodb-alt';
import { Admin } from '@/models/types';

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Username, email, and password are required' },
                { status: 400 }
            );
        }

        // Only allow this in development or with admin secret
        const adminSecret = process.env.ADMIN_SECRET;
        if (!adminSecret || password !== adminSecret) {
            return NextResponse.json(
                { error: 'Invalid admin creation secret' },
                { status: 403 }
            );
        }

        const db = await getDatabase();
        const adminsCollection = db.collection('admins');

        // Check if admin already exists
        const existingAdmin = await adminsCollection.findOne({
            $or: [{ username }, { email }]
        });

        if (existingAdmin) {
            return NextResponse.json(
                { error: 'Admin with this username or email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create admin
        const newAdmin = {
            username,
            email,
            password: hashedPassword,
            role: 'admin',
            createdAt: new Date()
        };

        const result = await adminsCollection.insertOne(newAdmin);

        return NextResponse.json({
            success: true,
            admin: {
                id: result.insertedId,
                username,
                email,
                role: 'admin'
            }
        });
    } catch (error) {
        console.error('Admin creation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}