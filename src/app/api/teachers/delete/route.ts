import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { Teacher } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
    try {
        console.log('Starting teacher delete operation...');

        // Check admin authentication
        const admin = requireAdmin(req);
        console.log('Admin authenticated:', !!admin);

        const body = await req.json();
        const { teacherId } = body;

        console.log('Delete teacher request:', { teacherId, type: typeof teacherId });

        if (!teacherId) {
            return NextResponse.json(
                { error: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(teacherId)) {
            console.log('Invalid ObjectId format:', teacherId);
            return NextResponse.json(
                { error: `Invalid teacher ID format: ${teacherId}` },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const teachersCollection = db.collection('teachers');

        // Check if teacher exists
        const teacher = await teachersCollection.findOne({
            _id: new ObjectId(teacherId)
        });

        console.log('Teacher found:', !!teacher, teacher?._id);

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

        console.log('Delete result:', result);

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Failed to delete teacher - no documents deleted' },
                { status: 500 }
            );
        }

        // Verify deletion
        const verifyDelete = await teachersCollection.findOne({
            _id: new ObjectId(teacherId)
        });
        console.log('Verification - teacher still exists:', !!verifyDelete);

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
            { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}