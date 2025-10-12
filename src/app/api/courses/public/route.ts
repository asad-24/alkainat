import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';

export async function GET(req: NextRequest) {
    try {
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
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch courses',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}