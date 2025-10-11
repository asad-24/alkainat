import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getDatabase } from "@/lib/mongodb-alt"
import type { Locale } from "@/lib/i18n/config"
import type { Course } from "@/models/types"
import CoursesClient from "./CoursesClient"

async function getAllCourses(): Promise<Course[]> {
    try {
        const db = await getDatabase()
        const coursesCollection = db.collection('courses')
        const courses = await coursesCollection
            .find({})
            .sort({ createdAt: -1 })
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
    const courses = await getAllCourses()

    return (
        <CoursesClient courses={courses} dict={dict} />
    )
}

