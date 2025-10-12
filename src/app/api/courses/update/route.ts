import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { requireAdmin } from '@/lib/auth-utils';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(request);

        const { courseId, title, description, details, instructor, level, duration, image, interestingStudents, color } = await request.json();

        if (!courseId || !title || !description || !instructor || !level || !duration) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = await getDatabase();
        const coursesCollection = db.collection('courses');

        const updateData = {
            title,
            description,
            details: details || '',
            instructor,
            level,
            duration,
            image: image || '',
            interestingStudents: interestingStudents || 0,
            color: color || 'var(--chart-1)',
            updatedAt: new Date()
        };

        const result = await coursesCollection.updateOne(
            { _id: new ObjectId(courseId) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Fetch the updated course
        const updatedCourse = await coursesCollection.findOne({ _id: new ObjectId(courseId) });

        if (!updatedCourse) {
            return NextResponse.json({ error: 'Course not found after update' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            course: {
                _id: updatedCourse._id,
                ...updateData,
                createdAt: updatedCourse.createdAt
            }
        });

    } catch (error) {
        console.error('Error updating course:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}