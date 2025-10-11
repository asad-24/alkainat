import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Course } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json(
                { error: 'Course ID is required' },
                { status: 400 }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(courseId)) {
            return NextResponse.json(
                { error: 'Invalid course ID format' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const coursesCollection = db.collection('courses');

        // Check if course exists
        const course = await coursesCollection.findOne({
            _id: new ObjectId(courseId)
        });

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

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Failed to delete course' },
                { status: 500 }
            );
        }

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
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}