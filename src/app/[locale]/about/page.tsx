import { getDictionary } from "@/lib/i18n/get-dictionary"
import { TeachersGrid } from "@/components/teachers-grid"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Users, Globe, Award, Heart, Target, Star, GraduationCap } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await params
    const dict = await getDictionary(locale)

    const values = [
        {
            icon: Heart,
            title: "Compassionate Learning",
            description: "We believe in creating a supportive and nurturing environment where every student feels valued and encouraged."
        },
        {
            icon: Target,
            title: "Excellence in Education",
            description: "Our commitment to high-quality education ensures that students receive the best possible learning experience."
        },
        {
            icon: Globe,
            title: "Global Community",
            description: "Connecting learners from around the world to create a diverse and enriching educational community."
        }
    ]

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
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">About Al-Kainaat</h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            {dict.about.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-16 md:py-24 bg-gradient-to-bl from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(16,185,129,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 70%, rgba(236,72,153,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-pink-200 bg-clip-text text-transparent">Our Mission & Values</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Empowering minds through comprehensive education that combines traditional wisdom with modern learning techniques
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <Icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-gradient-to-tr from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147,51,234,0.4) 0%, transparent 70%),
                                          radial-gradient(circle at 20% 80%, rgba(59,130,246,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { number: "500+", label: "Students Worldwide" },
                            { number: "15+", label: "Expert Teachers" },
                            { number: "25+", label: "Courses Available" },
                            { number: "98%", label: "Student Satisfaction" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-gray-300 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teachers Section */}
            <section className="py-16 md:py-24 bg-gradient-to-bl from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 70% 20%, rgba(16,185,129,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 30% 80%, rgba(236,72,153,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-green-200 bg-clip-text text-transparent">{dict.about.ourTeachers}</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Meet our dedicated team of experienced educators who are passionate about helping you achieve your learning goals
                        </p>
                    </div>
                    <TeachersGrid locale={locale} dict={dict} />
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 md:py-24 bg-gradient-to-tr from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147,51,234,0.4) 0%, transparent 70%),
                                          radial-gradient(circle at 20% 80%, rgba(59,130,246,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 20%, rgba(236,72,153,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">Join Our Learning Community</h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Become part of a global community of learners dedicated to personal and spiritual growth through quality education.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
                                <a href={`/${locale}/courses`}>
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    View Our Courses
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                                <a href={`/${locale}/contact`}>
                                    Get in Touch
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
