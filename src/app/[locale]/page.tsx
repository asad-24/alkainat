import Link from "next/link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Clock, Globe, Star, ChevronRight, Sparkles, Zap } from "lucide-react"
import { demoCoursesData } from "@/lib/demo-data"
import type { Locale } from "@/lib/i18n/config"

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden h-[calc(100vh-4rem)] flex items-center bg-gradient-to-br from-black via-gray-900 to-black">
                {/* Dark Galaxy Background */}
                <div className="absolute inset-0">
                    {/* Dark base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                    {/* Dark animated nebula */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-cyan-900/30 animate-pulse"></div>

                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 50%),
                                              radial-gradient(circle at 70% 60%, rgba(147,51,234,0.4) 0%, transparent 50%)`
                        }}></div>
                    </div>

                    {/* Dark stars layer 1 */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="stars stars-small"></div>
                    </div>

                    {/* Dark stars layer 2 */}
                    <div className="absolute inset-0 opacity-15">
                        <div className="stars stars-medium"></div>
                    </div>

                    {/* Dark stars layer 3 */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="stars stars-large"></div>
                    </div>

                    {/* Dark floating orbs */}
                    <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full opacity-30 animate-float blur-xl"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full opacity-30 animate-float-delayed blur-lg"></div>
                    <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-30 animate-float-slow blur-lg"></div>

                    {/* Sliding Background Images */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="hero-slider">
                            <div className="slide slide-1"></div>
                            <div className="slide slide-2"></div>
                            <div className="slide slide-3"></div>
                            <div className="slide slide-4"></div>
                            <div className="slide slide-5"></div>
                            <div className="slide slide-6"></div>
                            <div className="slide slide-7"></div>
                            <div className="slide slide-8"></div>
                            <div className="slide slide-9"></div>
                            <div className="slide slide-10"></div>
                            <div className="slide slide-11"></div>
                        </div>
                    </div>

                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Floating elements around title */}
                        <div className="relative">
                            <div className="absolute -top-8 -left-8 text-yellow-400 animate-twinkle">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div className="absolute -top-4 -right-12 text-cyan-400 animate-twinkle-delayed">
                                <Star className="h-5 w-5" />
                            </div>
                            <div className="absolute -bottom-6 left-16 text-purple-400 animate-twinkle-slow">
                                <Zap className="h-4 w-4" />
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-glow ]">
                                {dict.hero.title}
                            </h1>
                        </div>

                        <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
                            {dict.hero.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold shadow-2xl shadow-purple-500/25 border-0 transform hover:scale-105 transition-all duration-300">
                                <Link href={`/${locale}/courses`}>
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    {dict.cta.browseCourses}
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                <Link href={`/${locale}/contact`}>
                                    {dict.cta.contact}
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features/Highlights */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-black">
                {/* Animated Matrix Background */}
                <div className="absolute inset-0">
                    {/* Moving grid lines */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `
                                linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px),
                                linear-gradient(180deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                            animation: 'moveGrid 20s linear infinite'
                        }}></div>
                    </div>

                    {/* Floating geometric shapes */}
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500/30 rotate-45 animate-spin-slow"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 border-2 border-purple-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 transform rotate-12 animate-bounce-slow"></div>

                    {/* Animated particles */}
                    <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-float"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Why Choose Al Kainaat?</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">Discover the advantages of learning with our experienced instructors and flexible platform</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {dict.highlights.map((h, index) => {
                            const icons = [Users, Clock, Globe]
                            const Icon = icons[index] || BookOpen
                            return (
                                <div
                                    key={h.title}
                                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{h.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{h.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Courses Preview */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
                {/* Animated Wave Background */}
                <div className="absolute inset-0">
                    {/* Flowing waves */}
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute w-full h-full" style={{
                            background: `
                                radial-gradient(ellipse at 0% 50%, rgba(16,185,129,0.4) 0%, transparent 50%),
                                radial-gradient(ellipse at 100% 50%, rgba(236,72,153,0.4) 0%, transparent 50%)
                            `,
                            animation: 'wave 8s ease-in-out infinite'
                        }}></div>
                    </div>

                    {/* Flowing lines */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
                                style={{
                                    top: `${20 + i * 15}%`,
                                    animation: `flowLine ${4 + i}s linear infinite`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Animated orbs */}
                    <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-radial from-green-500/20 to-transparent rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-radial from-pink-500/20 to-transparent rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">{dict.sections.courses}</h2>
                            <p className="text-gray-300 text-lg">Explore our comprehensive learning programs</p>
                        </div>
                        <Button asChild variant="outline" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
                            <Link href={`/${locale}/courses`}>
                                {dict.actions.viewAll}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {demoCoursesData.slice(0, 3).map((course, index) => (
                            <article
                                key={course.id}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 group shadow-xl hover:shadow-2xl hover:border-white/20"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        alt={course.title}
                                        src={course.image}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className="text-white px-3 py-1 rounded-full text-sm font-medium"
                                            style={{ backgroundColor: course.color }}
                                        >
                                            {course.level}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-3">{course.title}</h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{course.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-400 text-sm">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {course.duration}
                                        </span>
                                        <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10">
                                            <Link href={`/${locale}/courses`}>
                                                Learn More
                                                <ChevronRight className="ml-1 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-t from-black via-purple-900/10 to-black">
                {/* Cosmic Energy Background */}
                <div className="absolute inset-0">
                    {/* Energy rings - reduced opacity */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-96 h-96 border border-purple-500/10 rounded-full animate-pulse-ring"></div>
                        <div className="absolute w-64 h-64 border border-blue-500/15 rounded-full animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute w-32 h-32 border border-pink-500/20 rounded-full animate-pulse-ring" style={{ animationDelay: '2s' }}></div>
                    </div>

                    {/* Orbital Elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-80 h-80 animate-orbit-slow">
                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 transform -translate-x-1/2"></div>
                        </div>
                        <div className="absolute w-60 h-60 animate-orbit-reverse">
                            <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70 transform -translate-x-1/2"></div>
                        </div>
                    </div>

                    {/* Floating Geometric Shapes */}
                    <div className="absolute top-16 left-16 w-8 h-8 border-2 border-cyan-500/30 rotate-45 animate-spin-slow"></div>
                    <div className="absolute top-32 right-20 w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-bounce-slow"></div>
                    <div className="absolute bottom-24 left-24 w-4 h-8 bg-gradient-to-b from-blue-500/30 to-transparent animate-sway"></div>
                    <div className="absolute bottom-16 right-16 w-6 h-6 border border-pink-500/40 transform rotate-12 animate-float"></div>

                    {/* Shooting Stars */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shooting-star"></div>
                        <div className="absolute top-60 right-32 w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-shooting-star" style={{ animationDelay: '3s' }}></div>
                    </div>

                    {/* Lightning effects - much more subtle */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-0.5 h-10 bg-gradient-to-b from-transparent via-purple-800/50 to-transparent animate-lightning"></div>
                        <div className="absolute top-3/4 right-1/3 w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-700/50 to-transparent animate-lightning" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/2 left-3/4 w-0.5 h-6 bg-gradient-to-b from-transparent via-pink-700/50 to-transparent animate-lightning" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Enhanced Floating particles */}
                    <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute rounded-full animate-twinkle ${i % 3 === 0 ? 'w-1 h-1 bg-cyan-400/40' :
                                        i % 3 === 1 ? 'w-0.5 h-0.5 bg-purple-400/50' :
                                            'w-0.5 h-0.5 bg-white/30'
                                    }`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: `${2 + Math.random() * 2}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Central energy core - removed completely */}
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">Ready to Start Learning?</h2>
                        <p className="text-gray-200 text-lg mb-8 leading-relaxed bg-gradient-to-r from-purple-900/50 via-blue-900 to-purple-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            Join thousands of students worldwide and begin your educational journey with Al Kainaat Learning & Development Institute.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gradient-to-r from-gray-600 to-purple-800 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
                                <Link href={`/${locale}/courses`}>
                                    <Star className="mr-2 h-5 w-5" />
                                    Start Learning Today
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                <Link href={`/${locale}/about`}>
                                    Learn More About Us
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
