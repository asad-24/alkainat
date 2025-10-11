import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Teacher } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const { teacherId } = await req.json();

        if (!teacherId) {
            return NextResponse.json(
                { error: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(teacherId)) {
            return NextResponse.json(
                { error: 'Invalid teacher ID format' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const teachersCollection = db.collection('teachers');

        // Check if teacher exists
        const teacher = await teachersCollection.findOne({
            _id: new ObjectId(teacherId)
        });

        if (!teacher) {
            return NextResponse.json(
                { error: 'Teacher not found' },
                { status: 404 }
            );
        }

        // Delete the teacher
        const result = await teachersCollection.deleteOne({
            _id: new ObjectId(teacherId)
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Failed to delete teacher' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Teacher deleted successfully',
            deletedTeacher: {
                _id: teacherId,
                name: teacher.name,
                email: teacher.email
            }
        });
    } catch (error) {
        console.error('Delete teacher error:', error);

        if (error instanceof Error && error.message.includes('Unauthorized')) {
            return NextResponse.json(
                { error: 'Unauthorized: Admin access required' },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}