import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb-alt';
import { Teacher } from '@/models/types';
import { requireAdmin } from '@/lib/auth-utils';

export async function POST(req: NextRequest) {
    try {
        // Check admin authentication
        requireAdmin(req);

        const teacherData = await req.json();
        const {
            name,
            email,
            phone,
            subject,
            bio,
            experience,
            avatar,
            rating,
            degrees,
            gender,
            backgrounds,
            languages
        } = teacherData;

        // Validate required fields
        if (!name || !email || !subject || !bio || !experience) {
            return NextResponse.json(
                { error: 'Name, email, subject, bio, and experience are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const teachersCollection = db.collection('teachers');

        // Check if teacher with email already exists
        const existingTeacher = await teachersCollection.findOne({ email });
        if (existingTeacher) {
            return NextResponse.json(
                { error: 'Teacher with this email already exists' },
                { status: 409 }
            );
        }

        // Create new teacher
        const newTeacher = {
            name,
            email,
            phone: phone || undefined,
            subject,
            bio,
            experience,
            avatar: avatar || undefined,
            rating: rating || 5,
            degrees: degrees || [],
            gender: gender || 'male',
            backgrounds: backgrounds || [],
            languages: languages || [],
            students: 0, // Default student count
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await teachersCollection.insertOne(newTeacher);

        return NextResponse.json({
            success: true,
            teacher: {
                _id: result.insertedId,
                ...newTeacher
            }
        });
    } catch (error) {
        console.error('Add teacher error:', error);

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
        const teachersCollection = db.collection<Teacher>('teachers');

        const teachers = await teachersCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            teachers
        });
    } catch (error) {
        console.error('Get teachers error:', error);

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