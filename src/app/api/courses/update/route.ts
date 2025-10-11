import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { courseId, title, description, details, instructor, level, duration, image, interestingStudents, color } = await request.json();

        if (!courseId || !title || !description || !instructor || !level || !duration) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const adminsCollection = db.collection('admins');

        // Verify admin exists
        const admin = await adminsCollection.findOne({ email: session.user.email });
        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

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