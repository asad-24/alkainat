export const locales = ["en", "ar", "ur"] as const
export type Locale = (typeof locales)[number]

export function isRTL(locale: string) {
    return locale === "ar" || locale === "ur"
}
