"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Users, BookOpen, Award } from "lucide-react"
import { demoTeachersData } from "@/lib/demo-data"
import type { Locale } from "@/lib/i18n/config"

export function TeachersGrid({
    locale,
    dict,
}: {
    locale: Locale
    dict: any
}) {
    const [active, setActive] = useState<(typeof demoTeachersData)[0] | null>(null)

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {demoTeachersData.map((teacher) => (
                    <Card
                        key={teacher.id}
                        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer overflow-hidden"
                        onClick={() => setActive(teacher)}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                alt={teacher.name}
                                src={teacher.image}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-white font-medium">{teacher.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                                {teacher.name}
                            </h3>
                            <p className="text-[var(--accent)] text-sm font-medium mb-3">
                                {teacher.specialization}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <span>{teacher.experience}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4" />
                                        <span>{teacher.courses} courses</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <Users className="h-4 w-4" />
                                    <span>{teacher.students} students taught</span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                                onClick={() => setActive(teacher)}
                            >
                                View Profile
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Teacher Modal */}
            {active && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={() => setActive(null)}
                >
                    <Card
                        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative">
                            <img
                                alt={active.name}
                                src={active.image}
                                className="w-full h-64 object-cover"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                                onClick={() => setActive(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <div className="absolute bottom-4 left-4">
                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-white font-medium">{active.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">{active.name}</h2>
                            <p className="text-[var(--chart-2)] font-semibold mb-4">{active.specialization}</p>

                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--chart-2)]">{active.courses}</div>
                                    <div className="text-sm text-muted-foreground">Courses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--chart-2)]">{active.students}</div>
                                    <div className="text-sm text-muted-foreground">Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--chart-2)]">{active.experience}</div>
                                    <div className="text-sm text-muted-foreground">Experience</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">About</h3>
                                    <p className="text-muted-foreground leading-relaxed">{active.bio}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button className="flex-1 bg-[var(--chart-2)] hover:bg-[var(--chart-2)]/90">
                                    View Courses
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    Contact Teacher
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    )
}
