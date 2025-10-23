import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { locales, type Locale, isRTL } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoadingScreen } from "@/components/loading-screen"
import { WhatsAppButton } from "@/components/whatsapp-button"

export const dynamic = "force-static"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params

    if (!locales.includes(locale)) {
        return {
            title: "Al Kainaat Learning & Development Institute",
            description: "Learn Quran, Arabic, English, and Technology — from anywhere.",
        }
    }

    const dict = await getDictionary(locale)

    if (!dict || !dict.site) {
        return {
            title: "Al Kainaat Learning & Development Institute",
            description: "Learn Quran, Arabic, English, and Technology — from anywhere.",
        }
    }

    return {
        title: dict.site.title,
        description: dict.site.description,
    }
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    if (!locales.includes(locale)) notFound()
    const dict = await getDictionary(locale)
    const dir = isRTL(locale) ? "rtl" : "ltr"

    return (
        <div data-locale={locale} dir={dir} className="min-h-dvh flex flex-col">
            <LoadingScreen />
            <SiteHeader locale={locale} dict={dict} />
            <main className="flex-1">{children}</main>
            <SiteFooter locale={locale} dict={dict} />
            <WhatsAppButton />
        </div>
    )
}
