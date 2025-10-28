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

// Custom SVG icons for social media platforms
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
)

const SnapchatIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.206.793c.99 0 4.347.276 5.985 3.141C19.852 6.82 20.244 11.125 20.244 12s-.392 5.18-2.053 8.066c-1.638 2.865-4.995 3.141-5.985 3.141s-4.347-.276-5.985-3.141C4.555 17.18 4.163 12.875 4.163 12s.392-5.18 2.053-8.066C7.859 1.069 11.216.793 12.206.793m0-1C11.01-.207 6.172.276 4.346 3.441.392 9.72-.244 12.875-.244 12s.636 2.28 4.59 8.559c1.826 3.165 6.664 3.648 7.86 3.648s6.034-.483 7.86-3.648C23.636 14.28 24.244 12.875 24.244 12s-.608-2.28-4.59-8.559C18.24.483 13.402 0 12.206 0z" />
    </svg>
)

const PinterestIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.75.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
    </svg>
)

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
            href: "https://www.facebook.com/alkainaat",
            icon: Facebook,
            label: "Facebook"
        },
        {
            href: "https://www.instagram.com/al_kainaat/",
            icon: Instagram,
            label: "Instagram"
        },
        {
            href: "https://www.tiktok.com/@al_kainaat",
            icon: TikTokIcon,
            label: "TikTok"
        },
        {
            href: "https://www.snapchat.com/add/al_kainaat",
            icon: SnapchatIcon,
            label: "Snapchat"
        },
        {
            href: "https://www.pinterest.com/alkainaat",
            icon: PinterestIcon,
            label: "Pinterest"
        }
    ]

    return (
        <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white border-t border-white/10 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                      radial-gradient(circle at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%),
                                      radial-gradient(circle at 40% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)`
                }}></div>
            </div>
            <div className="container mx-auto px-4 py-12 relative z-10">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <span className="text-lg font-bold text-white">AK</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Al Kainaat</h3>
                                <p className="text-xs text-gray-400">Learning & Development Institute</p>
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