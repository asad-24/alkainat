"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, Users, BookOpen, Award } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import type { Locale } from "@/lib/i18n/config"
import type { Teacher } from "@/models/types"

export function TeachersGrid({
    locale,
    dict,
}: {
    locale: Locale
    dict: any
}) {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await fetch('/api/teachers/list')
                if (response.ok) {
                    const data = await response.json()
                    setTeachers(data.teachers || [])
                }
            } catch (error) {
                console.error('Error fetching teachers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTeachers()
    }, [])

    const openTeacherModal = (teacher: Teacher) => {
        setSelectedTeacher(teacher)
        setIsModalOpen(true)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher) => (
                    <Card
                        key={String(teacher._id) || teacher.name}
                        className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer overflow-hidden"
                        onClick={() => openTeacherModal(teacher)}
                    >
                        <div className="relative overflow-hidden">
                            <Image
                                alt={teacher.name}
                                src={teacher.avatar || '/placeholder-teacher.svg'}
                                width={400}
                                height={192}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs text-white font-medium">{teacher.rating || 5.0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                                {teacher.name}
                            </h3>
                            <p className="text-[var(--accent)] text-sm font-medium mb-3">
                                Subject: {teacher.subject}
                            </p>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-between text-sm text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        <span>{teacher.experience}</span>
                                    </div>

                                    <div>
                                        For: {teacher.gender}
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                                onClick={() => openTeacherModal(teacher)}
                            >
                                View Profile
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Teacher Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl h-[85vh] bg-slate-900/95 backdrop-blur-xl border-white/10 overflow-hidden flex flex-col">
                    <DialogHeader className="flex-shrink-0 border-b border-white/10 pb-4">
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {selectedTeacher?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {selectedTeacher && (
                            <>
                                {/* Teacher Image */}
                                <div className="relative rounded-xl overflow-hidden">
                                    <Image
                                        src={selectedTeacher.avatar || '/placeholder-teacher.svg'}
                                        alt={selectedTeacher.name}
                                        width={600}
                                        height={256}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="text-white px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-cyan-500">
                                            {selectedTeacher.subject}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                            <span className="text-white font-medium">{selectedTeacher.rating || 5.0}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Teacher Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center text-gray-300 mb-2">
                                            <Award className="h-5 w-5 mr-2 text-purple-400" />
                                            <span className="font-medium">Experience</span>
                                        </div>
                                        <p className="text-white font-semibold">{selectedTeacher.experience}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center text-gray-300 mb-2">
                                            <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                                            <span className="font-medium">Subject</span>
                                        </div>
                                        <p className="text-white font-semibold">{selectedTeacher.subject}</p>
                                    </div>
                                </div>

                                {/* Teacher Bio */}
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h3 className="text-xl font-semibold text-white mb-4">About {selectedTeacher.name}</h3>
                                    <p className="text-gray-300 leading-relaxed">{selectedTeacher.bio}</p>
                                </div>

                                {/* Education */}
                                {selectedTeacher.degrees && selectedTeacher.degrees.length > 0 && (
                                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                        <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                                        <div className="space-y-3">
                                            {selectedTeacher.degrees.map((degree, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                    <div>
                                                        <p className="text-white font-medium">{degree.degree}</p>
                                                        <p className="text-gray-400 text-sm">{degree.university}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {selectedTeacher.languages && selectedTeacher.languages.length > 0 && (
                                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                        <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTeacher.languages.map((language, index) => (
                                                <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/40 hover:bg-purple-500/30">
                                                    {language}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Backgrounds */}
                                {selectedTeacher.backgrounds && selectedTeacher.backgrounds.length > 0 && (
                                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                        <h3 className="text-xl font-semibold text-white mb-4">Specializations</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTeacher.backgrounds.map((background, index) => (
                                                <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-200 border-emerald-500/40 hover:bg-emerald-500/30">
                                                    {background}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
