'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Users, Star, BookOpen, ChevronRight, Award, Play, Heart, X } from "lucide-react"
import type { Course } from "@/models/types"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CoursesClientProps {
    courses: Course[]
    dict: any
}

export default function CoursesClient({ courses, dict }: CoursesClientProps) {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [interestingCounts, setInterestingCounts] = useState<Record<string, number>>(() => {
        const counts: Record<string, number> = {}
        courses.forEach(course => {
            counts[String(course._id)] = course.interestingStudents || 0
        })
        return counts
    })
    const [likedCourses, setLikedCourses] = useState<Set<string>>(new Set())

    const handleHeartClick = async (courseId: string) => {
        const isCurrentlyLiked = likedCourses.has(courseId)
        const action = isCurrentlyLiked ? 'decrement' : 'increment'

        try {
            const response = await fetch('/api/courses/interesting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId, action }),
            })

            if (response.ok) {
                const data = await response.json()
                setInterestingCounts(prev => ({
                    ...prev,
                    [courseId]: data.interestingStudents
                }))
                setLikedCourses(prev => {
                    const newSet = new Set(prev)
                    if (isCurrentlyLiked) {
                        newSet.delete(courseId)
                    } else {
                        newSet.add(courseId)
                    }
                    return newSet
                })
            }
        } catch (error) {
            console.error('Error updating interesting count:', error)
        }
    }

    const openCourseModal = (course: Course) => {
        setSelectedCourse(course)
        setIsModalOpen(true)
    }

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
                        {courses.map((course, index) => (
                            <article
                                key={String(course._id) || course.title}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 border border-white/20 group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        alt={course.title}
                                        src={course.image || '/placeholder-course.jpg'}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className="text-white px-3 py-1 rounded-full text-sm font-medium"
                                            style={{ backgroundColor: course.color }}
                                        >
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleHeartClick(String(course._id))}
                                            className={`rounded-full p-2 transition-colors group ${likedCourses.has(String(course._id))
                                                ? 'bg-red-500/20'
                                                : 'bg-white/20 hover:bg-red-500/20'
                                                }`}
                                        >
                                            <Heart className={`h-4 w-4 transition-colors ${likedCourses.has(String(course._id))
                                                ? 'text-red-400 fill-red-400'
                                                : 'text-white group-hover:text-red-400'
                                                }`} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-3">{course.title}</h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed truncate">{course.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Heart className="h-4 w-4 mr-1 text-red-400" />
                                            {interestingCounts[String(course._id)] ?? course.interestingStudents ?? 0} Interested
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => openCourseModal(course)}
                                            variant="ghost"
                                            size="sm"
                                            className="flex-1 text-white hover:bg-white/10 border border-white/20"
                                        >
                                            Learn More
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

            {/* Course Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl h-[85vh] bg-slate-900/95 backdrop-blur-xl border-white/10 overflow-hidden flex flex-col">
                    <DialogHeader className="flex-shrink-0 border-b border-white/10 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {selectedCourse?.title}
                            </DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsModalOpen(false)}
                                className="text-white hover:bg-white/10"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {selectedCourse && (
                            <>
                                {/* Course Image */}
                                <div className="relative rounded-xl overflow-hidden">
                                    <img
                                        src={selectedCourse.image || '/placeholder-course.jpg'}
                                        alt={selectedCourse.title}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className="text-white px-3 py-1 rounded-full text-sm font-medium"
                                            style={{ backgroundColor: selectedCourse.color }}
                                        >
                                            {selectedCourse.level}
                                        </span>
                                    </div>
                                </div>

                                {/* Course Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center text-gray-300 mb-2">
                                            <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                                            <span className="font-medium">Instructor</span>
                                        </div>
                                        <p className="text-white font-semibold">{selectedCourse.instructor}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center text-gray-300 mb-2">
                                            <Clock className="h-5 w-5 mr-2 text-cyan-400" />
                                            <span className="font-medium">Duration</span>
                                        </div>
                                        <p className="text-white font-semibold">{selectedCourse.duration}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center text-gray-300 mb-2">
                                            <Heart className="h-5 w-5 mr-2 text-red-400" />
                                            <span className="font-medium">Interested Students</span>
                                        </div>
                                        <p className="text-white font-semibold">
                                            {interestingCounts[String(selectedCourse._id)] ?? selectedCourse.interestingStudents ?? 0}
                                        </p>
                                    </div>
                                </div>

                                {/* Course Description */}
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-4">Course Description</h3>
                                    <p className="text-gray-300 leading-relaxed">{selectedCourse.description}</p>
                                </div>

                                {/* Course Details */}
                                {selectedCourse.details && (
                                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                        <h3 className="text-xl font-semibold text-white mb-4">Course Details</h3>
                                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                            {selectedCourse.details}
                                        </div>
                                    </div>
                                )}

                                {/* Course Metadata */}
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-4">Course Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-400">Level:</span>
                                            <span className="text-white ml-2 font-medium">{selectedCourse.level}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">Created:</span>
                                            <span className="text-white ml-2 font-medium">
                                                {selectedCourse.createdAt ? new Date(selectedCourse.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}