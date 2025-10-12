"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition, useEffect } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
    Facebook,
    Instagram,
    Menu,
    X,
    Home,
    BookOpen,
    Users,
    Mail
} from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

const navIcons = {
    home: Home,
    courses: BookOpen,
    about: Users,
    contact: Mail
}

export function SiteHeader({
    locale,
    dict,
}: {
    locale: Locale
    dict: any
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [activeNav, setActiveNav] = useState<string | null>(null)

    useEffect(() => {
        // Reset active nav when navigation completes
        setActiveNav(null)
    }, [pathname])

    const nav = [
        { href: `/${locale}`, label: dict.nav.home, key: 'home' },
        { href: `/${locale}/courses`, label: dict.nav.courses, key: 'courses' },
        { href: `/${locale}/about`, label: dict.nav.about, key: 'about' },
        { href: `/${locale}/contact`, label: dict.nav.contact, key: 'contact' },
    ]

    const handleNavClick = (href: string, key: string) => {
        if (pathname === href) return // Don't navigate if already on the page

        setActiveNav(key)
        startTransition(() => {
            router.push(href)
        })
    }

    const socialLinks = [
        {
            href: "https://facebook.com",
            icon: Facebook,
            label: "Facebook",
            color: "hover:text-blue-600"
        },
        {
            href: "https://instagram.com",
            icon: Instagram,
            label: "Instagram",
            color: "hover:text-pink-600"
        }
    ]

    return (
        <header className="bg-gradient-to-r from-black/90 via-gray-800/95 to-black/90 text-white sticky top-0 z-50 backdrop-blur-lg border-b border-white/20 shadow-2xl ring-1 ring-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center shadow-lg group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                            <span className="sr-only">Al Kainaat Learning & Development Institute</span>
                            <span aria-hidden className="text-lg font-bold text-white">
                                AK
                            </span>
                        </div>
                        <div className="leading-tight hidden sm:block">
                            <div className="text-base font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Al Kainaat</div>
                            <div className="text-xs opacity-80 font-medium text-gray-300">Learning & Development Institute</div>
                        </div>
                        <div className="leading-tight sm:hidden">
                            <div className="text-sm font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Al Kainaat</div>
                            <div className="text-xs opacity-80 text-gray-300">LDI</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {nav.map((item) => {
                            const Icon = navIcons[item.key as keyof typeof navIcons]
                            const isLoading = activeNav === item.key && isPending
                            return (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href, item.key)}
                                    disabled={isPending}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 hover:shadow-md border border-transparent hover:border-white/20 relative overflow-hidden ${pathname === item.href
                                            ? "bg-white/15 shadow-md ring-1 ring-white/20 border-white/30"
                                            : ""
                                        } ${isLoading ? "animate-pulse" : ""}`}
                                >
                                    {isLoading && (
                                        <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-snake-border"></div>
                                    )}
                                    <Icon size={16} />
                                    {item.label}
                                </button>
                            )
                        })}
                    </nav>

                    {/* Right Side - Social Links, Language Switcher, Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {/* Social Links - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-1">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="p-2 rounded-lg hover:bg-white/15 transition-all duration-200 hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </a>
                                )
                            })}
                        </div>

                        <Separator orientation="vertical" className="h-6 bg-white/20 hidden md:block" />

                        {/* Language Switcher */}
                        <LanguageSwitcher locale={locale} />

                        {/* Mobile Menu Button - Only show on small and medium screens */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="lg:hidden h-8 w-8 p-0 hover:bg-white/15"
                                >
                                    <Menu size={20} />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-gradient-to-b from-black/95 via-gray-800/95 to-black/95 text-white border-l border-white/20">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3 text-white">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 backdrop-blur-sm ring-1 ring-white/20 flex items-center justify-center shadow-lg">
                                            <span className="text-sm font-bold text-white">AK</span>
                                        </div>
                                        Al Kainaat LDI
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="mt-6 space-y-4">
                                    {/* Mobile Navigation */}
                                    <div className="space-y-2">
                                        {nav.map((item) => {
                                            const Icon = navIcons[item.key as keyof typeof navIcons]
                                            const isLoading = activeNav === item.key && isPending
                                            return (
                                                <button
                                                    key={item.href}
                                                    onClick={() => {
                                                        handleNavClick(item.href, item.key)
                                                        setIsOpen(false)
                                                    }}
                                                    disabled={isPending}
                                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left relative overflow-hidden ${pathname === item.href
                                                            ? "bg-white/15 shadow-md ring-1 ring-white/20 border border-white/30 text-white"
                                                            : "hover:bg-white/10 text-gray-200 hover:text-white"
                                                        } ${isLoading ? "animate-pulse" : ""}`}
                                                >
                                                    {isLoading && (
                                                        <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-snake-border"></div>
                                                    )}
                                                    <Icon size={18} />
                                                    {item.label}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <Separator />

                                    {/* Social Links in Mobile */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-gray-300 px-4">Follow Us</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {socialLinks.map((social) => {
                                                const Icon = social.icon
                                                return (
                                                    <a
                                                        key={social.label}
                                                        href={social.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 text-gray-200 hover:text-white"
                                                    >
                                                        <Icon size={18} />
                                                        <span className="text-sm">{social.label}</span>
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Remove Mobile Navigation Bar - Navigation only shows in drawer for mobile/tablet */}
                {/* All mobile and tablet navigation is now handled by the drawer menu */}
            </div>
        </header>
    )
}
