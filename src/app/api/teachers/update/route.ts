import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { requireAdmin } from '@/lib/auth-utils';

export async function PUT(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const { teacherId, ...teacherData } = await req.json();

        if (!teacherId) {
            return NextResponse.json(
                { error: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        // Validate required fields
        const { name, email, subject, bio, experience } = teacherData;
        if (!name || !email || !subject || !bio || !experience) {
            return NextResponse.json(
                { error: 'Name, email, subject, bio, and experience are required' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const teachersCollection = db.collection('teachers');

        // Update teacher
        const result = await teachersCollection.updateOne(
            { _id: new ObjectId(teacherId) },
            {
                $set: {
                    ...teacherData,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Teacher not found' },
                { status: 404 }
            );
        }

        // Get updated teacher
        const updatedTeacher = await teachersCollection.findOne({ _id: new ObjectId(teacherId) });

        return NextResponse.json({
            success: true,
            teacher: {
                ...updatedTeacher,
                _id: updatedTeacher?._id.toString(),
                createdAt: updatedTeacher?.createdAt,
                updatedAt: updatedTeacher?.updatedAt
            }
        });
    } catch (error) {
        console.error('Update teacher error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}