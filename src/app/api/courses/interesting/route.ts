import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb-alt'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
    try {
        const { courseId, action } = await request.json()

        if (!courseId || !action) {
            return NextResponse.json(
                { error: 'Course ID and action are required' },
                { status: 400 }
            )
        }

        if (!['increment', 'decrement'].includes(action)) {
            return NextResponse.json(
                { error: 'Invalid action. Must be increment or decrement' },
                { status: 400 }
            )
        }

        const db = await getDatabase()
        const coursesCollection = db.collection('courses')

        const incrementValue = action === 'increment' ? 1 : -1

        const result = await coursesCollection.updateOne(
            { _id: new ObjectId(courseId) },
            { $inc: { interestingStudents: incrementValue } }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            )
        }

        // Get the updated course to return the new count
        const updatedCourse = await coursesCollection.findOne({ _id: new ObjectId(courseId) })

        return NextResponse.json({
            success: true,
            interestingStudents: updatedCourse?.interestingStudents || 0
        })

    } catch (error) {
        console.error('Error updating interesting students:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}