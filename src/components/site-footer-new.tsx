import Link from "next/link"
import {
    Facebook,
    Instagram,
    Mail,
    Phone,
    MapPin,
    Globe,
    BookOpen,
    GraduationCap,
    Heart
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { Locale } from "@/lib/i18n/config"

export function SiteFooter({
    locale,
    dict,
}: {
    locale: Locale
    dict: any
}) {
    const quickLinks = [
        { href: `/${locale}`, label: dict.nav.home, icon: Globe },
        { href: `/${locale}/courses`, label: dict.nav.courses, icon: BookOpen },
        { href: `/${locale}/about`, label: dict.nav.about, icon: GraduationCap },
        { href: `/${locale}/contact`, label: dict.nav.contact, icon: Mail },
    ]

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
        <footer className="bg-[linear-gradient(135deg,var(--chart-3),var(--chart-2),var(--brand-start))] text-white border-t border-white/10">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-[linear-gradient(45deg,var(--brand-start),var(--chart-2))] flex items-center justify-center shadow-lg">
                                <span className="text-lg font-bold text-white">AK</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Al Kainaat</h3>
                                <p className="text-xs text-white/70">Learning & Development Institute</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed">
                            {dict.footer.aboutCopy}
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">{dict.footer.links}</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => {
                                const Icon = link.icon
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors duration-200 group"
                                        >
                                            <Icon size={16} className="group-hover:text-[var(--accent)] transition-colors" />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">{dict.footer.contact}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-white/80">
                                <Mail size={16} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white/60 text-xs">Email</p>
                                    <a
                                        className="hover:text-white transition-colors duration-200 hover:underline"
                                        href="mailto:info@alkainaatld.com"
                                    >
                                        info@alkainaatld.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white/80">
                                <Phone size={16} className="text-[var(--chart-4)] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white/60 text-xs">Phone</p>
                                    <a
                                        className="hover:text-white transition-colors duration-200"
                                        href="tel:+923405622113"
                                    >
                                        +92 3405622113
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-white/80">
                                <MapPin size={16} className="text-[var(--chart-5)] mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-white/60 text-xs">Location</p>
                                    <p>Online Platform</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Features/Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Our Services</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></div>
                                Quran Recitation
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--chart-4)]"></div>
                                Arabic Language
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--chart-2)]"></div>
                                English Communication
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--chart-1)]"></div>
                                Technology Courses
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--chart-5)]"></div>
                                Live & Recorded Sessions
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-white/20" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <span>© {new Date().getFullYear()} Al Kainaat Learning & Development Institute.</span>
                        <span className="hidden sm:inline">All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <span>Made with</span>
                        <Heart size={14} className="text-[var(--chart-5)] fill-current animate-pulse" />
                        <span>for global learners</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}