import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { Course } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
    try {
        console.log('Starting course delete operation...');

        // Check admin authentication
        const admin = requireAdmin(req);
        console.log('Admin authenticated:', !!admin);

        const body = await req.json();
        const { courseId } = body;

        console.log('Delete course request:', { courseId, type: typeof courseId });

        if (!courseId) {
            return NextResponse.json(
                { error: 'Course ID is required' },
                { status: 400 }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(courseId)) {
            console.log('Invalid ObjectId format:', courseId);
            return NextResponse.json(
                { error: `Invalid course ID format: ${courseId}` },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const coursesCollection = db.collection('courses');

        // Check if course exists
        const course = await coursesCollection.findOne({
            _id: new ObjectId(courseId)
        });

        console.log('Course found:', !!course, course?._id);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        // Delete the course
        const result = await coursesCollection.deleteOne({
            _id: new ObjectId(courseId)
        });

        console.log('Delete result:', result);

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Failed to delete course - no documents deleted' },
                { status: 500 }
            );
        }

        // Verify deletion
        const verifyDelete = await coursesCollection.findOne({
            _id: new ObjectId(courseId)
        });
        console.log('Verification - course still exists:', !!verifyDelete);

        return NextResponse.json({
            success: true,
            message: 'Course deleted successfully',
            deletedCourse: {
                _id: courseId,
                title: course.title,
                instructor: course.instructor
            }
        });
    } catch (error) {
        console.error('Delete course error:', error);

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