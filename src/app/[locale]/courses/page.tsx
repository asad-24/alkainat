import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import CoursesClient from "./CoursesClient"

export default async function CoursesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return (
        <CoursesClient dict={dict} />
    )
}

