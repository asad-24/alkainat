import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';

export async function GET() {
    try {
        const db = await getDatabase();
        const adminsCollection = db.collection('admins');
        const admin = await adminsCollection.findOne({ username: 'admin' });

        return NextResponse.json({
            success: true,
            admin: admin,
            passwordHash: admin?.password
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}