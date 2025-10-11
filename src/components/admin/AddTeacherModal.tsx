import React, { useState } from 'react';
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
import { Teacher, Degree, Gender } from '@/models/types';

interface AddTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (teacher: Omit<Teacher, '_id' | 'createdAt' | 'updatedAt'>) => void;
    loading?: boolean;
}

export function AddTeacherModal({
    isOpen,
    onClose,
    onSubmit,
    loading
}: AddTeacherModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        bio: '',
        experience: '',
        avatar: '',
        rating: 5,
        degrees: [{ degree: '', university: '' }],
        gender: 'male' as Gender,
        backgrounds: [''],
        languages: [''],
    });

    // Degree handlers
    const handleDegreeChange = (idx: number, field: 'degree' | 'university', value: string) => {
        const updated = [...formData.degrees];
        updated[idx][field] = value;
        setFormData({ ...formData, degrees: updated });
    };
    const addDegree = () => setFormData({ ...formData, degrees: [...formData.degrees, { degree: '', university: '' }] });
    const removeDegree = (idx: number) => setFormData({ ...formData, degrees: formData.degrees.filter((_, i) => i !== idx) });

    // Backgrounds
    const handleBackgroundChange = (idx: number, value: string) => {
        const updated = [...formData.backgrounds];
        updated[idx] = value;
        setFormData({ ...formData, backgrounds: updated });
    };
    const addBackground = () => setFormData({ ...formData, backgrounds: [...formData.backgrounds, ''] });
    const removeBackground = (idx: number) => setFormData({ ...formData, backgrounds: formData.backgrounds.filter((_, i) => i !== idx) });

    // Languages
    const handleLanguageChange = (idx: number, value: string) => {
        const updated = [...formData.languages];
        updated[idx] = value;
        setFormData({ ...formData, languages: updated });
    };
    const addLanguage = () => setFormData({ ...formData, languages: [...formData.languages, ''] });
    const removeLanguage = (idx: number) => setFormData({ ...formData, languages: formData.languages.filter((_, i) => i !== idx) });

    // Avatar upload
    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData({ ...formData, avatar: ev.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            students: 0
        });
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            bio: '',
            experience: '',
            avatar: '',
            rating: 5,
            degrees: [{ degree: '', university: '' }],
            gender: 'male',
            backgrounds: [''],
            languages: [''],
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] h-[80vh] bg-slate-900/95 backdrop-blur-xl border-white/10 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Add New Teacher
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">
                        Fill in the details to add a new teacher to the system.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Name */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right text-slate-300">Name *</Label>
                            <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="col-span-3 bg-slate-800/50 border-white/10 text-white" required />
                        </div>
                        {/* Degrees */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right text-slate-300 pt-2">Degrees</Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                {formData.degrees.map((deg, idx) => (
                                    <div key={idx} className="flex gap-2 mb-1">
                                        <Input placeholder="Degree" value={deg.degree} onChange={e => handleDegreeChange(idx, 'degree', e.target.value)} className="bg-slate-800/50 border-white/10 text-white" />
                                        <Input placeholder="University" value={deg.university} onChange={e => handleDegreeChange(idx, 'university', e.target.value)} className="bg-slate-800/50 border-white/10 text-white" />
                                        {formData.degrees.length > 1 && <Button type="button" size="sm" variant="outline" onClick={() => removeDegree(idx)}>-</Button>}
                                    </div>
                                ))}
                                <Button type="button" size="sm" variant="outline" onClick={addDegree}>+ Add Degree</Button>
                            </div>
                        </div>
                        {/* Gender */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right text-slate-300">Gender</Label>
                            <Select value={formData.gender} onValueChange={val => setFormData({ ...formData, gender: val as Gender })}>
                                <SelectTrigger className="col-span-3 bg-slate-800/50 border-white/10 text-white">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    <SelectItem value="male" className="text-white hover:bg-white hover:text-slate-800">Boys</SelectItem>
                                    <SelectItem value="female" className="text-white hover:bg-white hover:text-slate-800">Girls</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Backgrounds */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right text-slate-300 pt-2">Backgrounds</Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                {formData.backgrounds.map((bg, idx) => (
                                    <div key={idx} className="flex gap-2 mb-1">
                                        <Input placeholder="e.g. Native Arabic speaker of beginners for English background" value={bg} onChange={e => handleBackgroundChange(idx, e.target.value)} className="bg-slate-800/50 border-white/10 text-white" />
                                        {formData.backgrounds.length > 1 && <Button type="button" size="sm" variant="outline" onClick={() => removeBackground(idx)}>-</Button>}
                                    </div>
                                ))}
                                <Button type="button" size="sm" variant="outline" onClick={addBackground}>+ Add Background</Button>
                            </div>
                        </div>
                        {/* Languages */}
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right text-slate-300 pt-2">Languages</Label>
                            <div className="col-span-3 flex flex-col gap-2">
                                {formData.languages.map((lang, idx) => (
                                    <div key={idx} className="flex gap-2 mb-1">
                                        <Input placeholder="Language" value={lang} onChange={e => handleLanguageChange(idx, e.target.value)} className="bg-slate-800/50 border-white/10 text-white" />
                                        {formData.languages.length > 1 && <Button type="button" size="sm" variant="outline" onClick={() => removeLanguage(idx)}>-</Button>}
                                    </div>
                                ))}
                                <Button type="button" size="sm" variant="outline" onClick={addLanguage}>+ Add Language</Button>
                            </div>
                        </div>
                        {/* Email (private) */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right text-slate-300">Email *</Label>
                            <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="col-span-3 bg-slate-800/50 border-white/10 text-white" required />
                        </div>
                        {/* Phone (private) */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right text-slate-300">Phone</Label>
                            <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="col-span-3 bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        {/* Subject */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="subject" className="text-right text-slate-300">Subject *</Label>
                            <Input id="subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="col-span-3 bg-slate-800/50 border-white/10 text-white" required />
                        </div>
                        {/* Experience */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="experience" className="text-right text-slate-300">Experience *</Label>
                            <Select value={formData.experience} onValueChange={value => setFormData({ ...formData, experience: value })} required>
                                <SelectTrigger className="col-span-3 bg-slate-800/50 border-white/10 text-white">
                                    <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-white/10">
                                    <SelectItem value="1-2 years" className="text-white hover:bg-white hover:text-slate-800">1-2 years</SelectItem>
                                    <SelectItem value="3-5 years" className="text-white hover:bg-white hover:text-slate-800">3-5 years</SelectItem>
                                    <SelectItem value="5-10 years" className="text-white hover:bg-white hover:text-slate-800">5-10 years</SelectItem>
                                    <SelectItem value="10+ years" className="text-white hover:bg-white hover:text-slate-800">10+ years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Bio */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right text-slate-300">Bio *</Label>
                            <textarea id="bio" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="col-span-3 min-h-[80px] rounded-md border bg-slate-800/50 border-white/10 text-white px-3 py-2 text-sm" required />
                        </div>
                        {/* Avatar upload */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="avatar" className="text-right text-slate-300">Photo</Label>
                            <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="col-span-3 bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        {/* Rating */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right text-slate-300">Rating</Label>
                            <Input id="rating" type="number" min={1} max={5} step={0.1} value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })} className="col-span-3 bg-slate-800/50 border-white/10 text-white" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={loading} className="border-white/20 text-slate-300 hover:bg-slate-800/50 hover:text-white">Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0">{loading ? 'Adding...' : 'Add Teacher'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}