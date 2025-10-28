"use client"

import { usePathname, useRouter } from "next/navigation"
import { locales, type Locale } from "@/lib/i18n/config"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe } from "lucide-react"

const languageNames = {
    en: "English",
    ar: "العربية",
    ur: "اردو"
}

const languageFlags = {
    en: "🇺🇸",
    ar: "🇸🇦",
    ur: "🇵🇰"
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
    const pathname = usePathname()
    const router = useRouter()

    function switchTo(nextLocale: Locale) {
        if (!pathname) return
        const parts = pathname.split("/")
        // ['', 'en', ...]
        if (parts[1] && locales.includes(parts[1] as Locale)) {
            parts[1] = nextLocale
        } else {
            parts.splice(1, 0, nextLocale)
        }
        router.push(parts.join("/") || "/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 px-2 text-current hover:bg-white cursor-pointer"
                >
                    <Globe size={16} />
                    <span className="hidden sm:inline">
                        {languageFlags[locale]} {languageNames[locale]}
                    </span>
                    <span className="sm:hidden">
                        {languageFlags[locale]} {locale.toUpperCase()}
                    </span>
                    <ChevronDown size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
                {locales.map((l) => (
                    <DropdownMenuItem
                        key={l}
                        onClick={() => switchTo(l)}
                        className={`flex items-center gap-3 cursor-pointer ${l === locale ? "bg-black text-white hover:bg-gray-800 hover:text-white" : ""
                            }`}
                    >
                        <span className="text-lg">{languageFlags[l]}</span>
                        <span>{languageNames[l]}</span>
                        {l === locale && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
