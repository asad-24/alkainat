'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable, courseColumns } from '@/components/admin/DataTable';
import { AddCourseModal } from '@/components/admin/AddCourseModal';
import { EditCourseModal } from '@/components/admin/EditCourseModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Course } from '@/models/types';

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses/list');
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses || []);
            } else if (response.status === 401) {
                router.push('/admin/login');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (courseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>) => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/courses/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                const data = await response.json();
                setCourses([data.course, ...courses]);
                setShowAddModal(false);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Network error. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditCourse = async (courseId: string, courseData: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>) => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/courses/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId, ...courseData }),
            });

            if (response.ok) {
                const data = await response.json();
                setCourses(courses.map(c => c._id === courseId ? data.course : c));
                setShowEditModal(false);
                setSelectedCourse(null);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to update course');
            }
        } catch (error) {
            console.error('Error updating course:', error);
            alert('Network error. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteCourse = async () => {
        if (!selectedCourse?._id) return;

        setActionLoading(true);
        try {
            const response = await fetch('/api/courses/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId: selectedCourse._id }),
            });

            if (response.ok) {
                setCourses(courses.filter((c) => c._id !== selectedCourse._id));
                setShowDeleteModal(false);
                setSelectedCourse(null);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Network error. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AdminLayout onLogout={handleLogout}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">Courses Management</h1>
                        <p className="text-gray-300">Manage your education platform courses</p>
                    </div>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold shadow-xl border-0 transform hover:scale-105 transition-all duration-300"
                    >
                        Add New Course
                    </Button>
                </div>

                <DataTable
                    data={courses}
                    columns={courseColumns}
                    loading={loading}
                    onEdit={(course) => {
                        setSelectedCourse(course);
                        setShowEditModal(true);
                    }}
                    onDelete={(course) => {
                        setSelectedCourse(course);
                        setShowDeleteModal(true);
                    }}
                />

                <AddCourseModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddCourse}
                    loading={actionLoading}
                />

                <EditCourseModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedCourse(null);
                    }}
                    onSubmit={handleEditCourse}
                    course={selectedCourse}
                    loading={actionLoading}
                />

                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedCourse(null);
                    }}
                    onConfirm={handleDeleteCourse}
                    title="Delete Course"
                    description="Are you sure you want to delete"
                    itemName={selectedCourse?.title}
                    loading={actionLoading}
                />
            </div>
        </AdminLayout>
    );
}