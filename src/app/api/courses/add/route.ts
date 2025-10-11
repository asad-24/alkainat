import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { Course } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';

export async function POST(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const courseData = await req.json();
        const { title, description, details, instructor, level, duration, image, color } = courseData;

        // Validate required fields
        if (!title || !description || !instructor || !level || !duration) {
            return NextResponse.json(
                { error: 'Title, description, instructor, level, and duration are required' },
                { status: 400 }
            );
        }

        // Validate level
        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validLevels.includes(level)) {
            return NextResponse.json(
                { error: 'Level must be Beginner, Intermediate, or Advanced' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const coursesCollection = db.collection('courses');

        // Check if course with title already exists
        const existingCourse = await coursesCollection.findOne({ title });
        if (existingCourse) {
            return NextResponse.json(
                { error: 'Course with this title already exists' },
                { status: 409 }
            );
        }

        // Create new course
        const newCourse = {
            title,
            description,
            details: details || '',
            instructor,
            level: level as 'Beginner' | 'Intermediate' | 'Advanced',
            duration,
            image: image || undefined,
            color: color || 'var(--chart-1)',
            interestingStudents: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await coursesCollection.insertOne(newCourse);

        return NextResponse.json({
            success: true,
            course: {
                _id: result.insertedId,
                ...newCourse
            }
        });
    } catch (error) {
        console.error('Add course error:', error);

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

export async function GET(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const db = await getDatabase();
        const coursesCollection = db.collection<Course>('courses');

        const courses = await coursesCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            courses
        });
    } catch (error) {
        console.error('Get courses error:', error);

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