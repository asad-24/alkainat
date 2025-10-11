import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Course } from '@/models/types';

interface EditCourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (courseId: string, course: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>) => void;
    course: Course | null;
    loading?: boolean;
}

export function EditCourseModal({
    isOpen,
    onClose,
    onSubmit,
    course,
    loading
}: EditCourseModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        details: '',
        instructor: '',
        level: '',
        duration: '',
        image: '',
        color: 'var(--chart-1)'
    });

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                details: course.details || '',
                instructor: course.instructor || '',
                level: course.level || '',
                duration: course.duration || '',
                image: course.image || '',
                color: course.color || 'var(--chart-1)'
            });
        }
    }, [course]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData({ ...formData, image: ev.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (course?._id) {
            onSubmit(course._id.toString(), {
                ...formData,
                level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
                interestingStudents: course.interestingStudents || 0
            });
        }
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            details: '',
            instructor: '',
            level: '',
            duration: '',
            image: '',
            color: 'var(--chart-1)'
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] h-[85vh] bg-slate-900/95 backdrop-blur-xl border-white/10 overflow-y-auto overflow-x-auto">
                <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Edit Course
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">
                        Update the course details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right text-slate-300">
                                Title *
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="col-span-3 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-purple-400/50"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="instructor" className="text-right text-slate-300">
                                Instructor *
                            </Label>
                            <Input
                                id="instructor"
                                value={formData.instructor}
                                onChange={(e) =>
                                    setFormData({ ...formData, instructor: e.target.value })
                                }
                                className="col-span-3 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-purple-400/50"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="level" className="text-right text-slate-300">
                                Level *
                            </Label>
                            <Select
                                value={formData.level}
                                onValueChange={(value: string) =>
                                    setFormData({ ...formData, level: value })
                                }
                                required
                            >
                                <SelectTrigger className="col-span-3 bg-slate-800/50 border-white/10 text-white focus:border-purple-400/50">
                                    <SelectValue placeholder="Select course level" className="text-slate-400" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    <SelectItem value="Beginner" className="text-white hover:bg-slate-700">Beginner</SelectItem>
                                    <SelectItem value="Intermediate" className="text-white hover:bg-slate-700">Intermediate</SelectItem>
                                    <SelectItem value="Advanced" className="text-white hover:bg-slate-700">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duration" className="text-right text-slate-300">
                                Duration *
                            </Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
                                }
                                className="col-span-3 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-purple-400/50"
                                placeholder="e.g., 8 weeks"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right text-slate-300">
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="col-span-3 min-h-[80px] rounded-md border bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="details" className="text-right text-slate-300">
                                Course Details
                            </Label>
                            <textarea
                                id="details"
                                value={formData.details}
                                onChange={(e) =>
                                    setFormData({ ...formData, details: e.target.value })
                                }
                                className="col-span-3 min-h-[120px] rounded-md border bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Detailed course information, syllabus, learning outcomes..."
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right text-slate-300">
                                Course Image
                            </Label>
                            <div className="col-span-3">
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="bg-slate-800/50 border-white/10 text-white file:bg-purple-500 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:hover:bg-purple-600"
                                />
                                {formData.image && (
                                    <div className="mt-2">
                                        <img src={formData.image} alt="Course preview" className="w-20 h-20 object-cover rounded-md border border-white/10" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right text-slate-300">
                                Color Theme
                            </Label>
                            <Select
                                value={formData.color}
                                onValueChange={(value: string) =>
                                    setFormData({ ...formData, color: value })
                                }
                            >
                                <SelectTrigger className="col-span-3 bg-slate-800/50 border-white/10 text-white focus:border-purple-400/50">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    <SelectItem value="var(--chart-1)" className="text-white hover:bg-slate-700">Blue</SelectItem>
                                    <SelectItem value="var(--chart-2)" className="text-white hover:bg-slate-700">Green</SelectItem>
                                    <SelectItem value="var(--chart-3)" className="text-white hover:bg-slate-700">Yellow</SelectItem>
                                    <SelectItem value="var(--chart-4)" className="text-white hover:bg-slate-700">Red</SelectItem>
                                    <SelectItem value="var(--chart-5)" className="text-white hover:bg-slate-700">Purple</SelectItem>
                                    <SelectItem value="var(--accent)" className="text-white hover:bg-slate-700">Accent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                            className="border-white/20 text-slate-300 hover:bg-slate-800/50 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
                        >
                            {loading ? 'Updating...' : 'Update Course'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}