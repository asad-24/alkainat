import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { requireAdmin } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const db = await getDatabase();
        const coursesCollection = db.collection('courses');
        const courses = await coursesCollection.find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({
            success: true,
            courses: courses.map((course: any) => ({
                _id: course._id,
                title: course.title,
                description: course.description,
                details: course.details || '',
                instructor: course.instructor,
                level: course.level,
                duration: course.duration,
                image: course.image || '',
                interestingStudents: course.interestingStudents || 0,
                color: course.color || 'var(--chart-1)',
                createdAt: course.createdAt,
                updatedAt: course.updatedAt
            }))
        });

    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}