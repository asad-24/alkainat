import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
    try {
        const db = await getDatabase();
        const teachersCollection = db.collection('teachers');

        // Get all male teachers sorted by creation date (newest first)
        const teachers = await teachersCollection
            .find({ gender: 'male' })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            teachers: teachers.map(teacher => ({
                ...teacher,
                _id: teacher._id.toString(),
                createdAt: teacher.createdAt,
                updatedAt: teacher.updatedAt
            }))
        });
    } catch (error) {
        console.error('Get teachers error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}