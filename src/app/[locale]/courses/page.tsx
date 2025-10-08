import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Users, Star, BookOpen, ChevronRight, Award, Play } from "lucide-react"
import { demoCoursesData } from "@/lib/demo-data"
import type { Locale } from "@/lib/i18n/config"

export default async function CoursesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 50%),
                                          radial-gradient(circle at 70% 60%, rgba(147,51,234,0.4) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">{dict.sections.courses}</h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                            Discover our comprehensive range of courses designed to enhance your knowledge in Quran, Arabic, English, and Technology
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
                                <Star className="mr-2 h-5 w-5" />
                                Popular Courses
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                <Users className="mr-2 h-5 w-5" />
                                Join Live Classes
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-r from-black via-indigo-900/20 to-black">
                {/* Digital Rain Effect */}
                <div className="absolute inset-0">
                    {/* Matrix-style falling lines */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-0.5 bg-gradient-to-b from-transparent via-green-400 to-transparent animate-fall"
                                style={{
                                    left: `${(i * 8.33)}%`,
                                    height: '100px',
                                    animation: `fall ${2 + Math.random() * 2}s linear infinite`,
                                    animationDelay: `${i * 0.2}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Hexagonal patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-16 h-16 border border-indigo-400/50" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                        <div className="absolute top-40 right-32 w-12 h-12 border border-blue-400/50 animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-pink-200 bg-clip-text text-transparent">Course Categories</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Choose from our diverse range of educational programs tailored to your learning goals
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Quran Studies", count: "8 Courses", icon: BookOpen, color: "bg-[var(--chart-1)]" },
                            { title: "Arabic Language", count: "12 Courses", icon: Users, color: "bg-[var(--chart-4)]" },
                            { title: "English Language", count: "10 Courses", icon: Star, color: "bg-[var(--chart-5)]" },
                            { title: "Technology", count: "15 Courses", icon: Clock, color: "bg-[var(--chart-2)]" }
                        ].map((category, index) => {
                            const Icon = category.icon
                            return (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 border border-white/20 group cursor-pointer"
                                >
                                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{category.title}</h3>
                                    <p className="text-white/70">{category.count}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* All Courses */}
            <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-bl from-black via-purple-900/10 to-black">
                {/* Particle Network Background */}
                <div className="absolute inset-0">
                    {/* Network nodes */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-purple-400 rounded-full animate-network-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.3}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Connection lines */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full">
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            {[...Array(8)].map((_, i) => (
                                <line
                                    key={i}
                                    x1={`${Math.random() * 100}%`}
                                    y1={`${Math.random() * 100}%`}
                                    x2={`${Math.random() * 100}%`}
                                    y2={`${Math.random() * 100}%`}
                                    stroke="url(#line-gradient)"
                                    strokeWidth="1"
                                    className="animate-draw-line"
                                    style={{ animationDelay: `${i * 0.5}s` }}
                                />
                            ))}
                        </svg>
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">All Courses</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Explore our complete course catalog and find the perfect learning path for you
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {demoCoursesData.slice(0, dict.sampleCourses.length).map((course, index) => (
                            <article
                                key={course.title}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 border border-white/20 group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        alt={course.title}
                                        src={course.image}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className="text-white px-3 py-1 rounded-full text-sm font-medium"
                                            style={{ backgroundColor: course.color }}
                                        >
                                            {dict.sampleCourses[index]?.level || course.level}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="ml-1 text-xs text-white">{course.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-3">{dict.sampleCourses[index]?.title || course.title}</h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{dict.sampleCourses[index]?.desc || course.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {dict.sampleCourses[index]?.duration || course.duration}
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Users className="h-4 w-4 mr-1" />
                                            {course.students}+ Students
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="ghost" size="sm" className="flex-1 text-white hover:bg-white/10 border border-white/20">
                                            Learn More
                                        </Button>
                                        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                                            Enroll Now
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 md:py-24 bg-gradient-to-bl from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(16,185,129,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 70%, rgba(236,72,153,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-pink-200 bg-clip-text text-transparent">Ready to Begin Your Learning Journey?</h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Join our community of learners and start building your skills with expert guidance and flexible scheduling.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-green-600 to-pink-600 hover:from-green-700 hover:to-pink-700 text-white font-semibold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
                                <BookOpen className="mr-2 h-5 w-5" />
                                Browse All Courses
                            </Button>
                            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                Contact Our Team
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

