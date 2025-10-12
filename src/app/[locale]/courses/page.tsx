import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getDatabase } from "@/lib/mongodb-alt"
import type { Course } from "@/models/types"
import dynamic from "next/dynamic"

// Enable ISR with 10 minute revalidation
export const revalidate = 600

// Dynamically import CoursesClient to reduce initial bundle size
const CoursesClient = dynamic(() => import("./CoursesClient"), {
    loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div></div>
})

async function getCourses(): Promise<Course[]> {
    try {
        const db = await getDatabase()
        const coursesCollection = db.collection('courses')
        const courses = await coursesCollection
            .find({})
            .sort({ createdAt: -1 })
            .project({
                _id: 1,
                title: 1,
                description: 1,
                details: 1,
                instructor: 1,
                level: 1,
                duration: 1,
                image: 1,
                interestingStudents: 1,
                color: 1,
                createdAt: 1,
                updatedAt: 1
            })
            .toArray()

        return courses.map(course => ({
            ...course,
            _id: course._id?.toString(),
            createdAt: course.createdAt,
            updatedAt: course.updatedAt
        })) as Course[]
    } catch (error) {
        console.error('Error fetching courses:', error)
        return []
    }
}

export default async function CoursesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)
    const courses = await getCourses()

    return (
        <CoursesClient dict={dict} initialCourses={courses} />
    )
}

