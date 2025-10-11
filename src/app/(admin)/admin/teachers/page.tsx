'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { DataTable, teacherColumns } from '@/components/admin/DataTable';
import { AddTeacherModal } from '@/components/admin/AddTeacherModal';
import { EditTeacherModal } from '@/components/admin/EditTeacherModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { Button } from '@/components/ui/button';
import { Teacher } from '@/models/types';

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('/api/teachers/list');
            if (response.ok) {
                const data = await response.json();
                setTeachers(data.teachers || []);
            } else if (response.status === 401) {
                router.push('/admin/login');
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTeacher = async (teacherData: Omit<Teacher, '_id' | 'createdAt' | 'updatedAt'>) => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/teachers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherData),
            });

            if (response.ok) {
                const data = await response.json();
                setTeachers([data.teacher, ...teachers]);
                setShowAddModal(false);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to add teacher');
            }
        } catch (error) {
            console.error('Error adding teacher:', error);
            alert('Network error. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditTeacher = async (teacherId: string, teacherData: Omit<Teacher, '_id' | 'createdAt' | 'updatedAt'>) => {
        setActionLoading(true);
        try {
            const response = await fetch('/api/teachers/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teacherId, ...teacherData }),
            });

            if (response.ok) {
                const data = await response.json();
                setTeachers(teachers.map(t => t._id === teacherId ? data.teacher : t));
                setShowEditModal(false);
                setSelectedTeacher(null);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to update teacher');
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
            alert('Network error. Please try again.');
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteTeacher = async () => {
        if (!selectedTeacher?._id) return;

        setActionLoading(true);
        try {
            const response = await fetch('/api/teachers/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teacherId: selectedTeacher._id }),
            });

            if (response.ok) {
                setTeachers(teachers.filter((t) => t._id !== selectedTeacher._id));
                setShowDeleteModal(false);
                setSelectedTeacher(null);
            } else if (response.status === 401) {
                router.push('/admin/login');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to delete teacher');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
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
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">Teachers Management</h1>
                        <p className="text-gray-300">Manage your education platform instructors</p>
                    </div>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold shadow-xl border-0 transform hover:scale-105 transition-all duration-300"
                    >
                        Add New Teacher
                    </Button>
                </div>

                <DataTable
                    data={teachers}
                    columns={teacherColumns}
                    loading={loading}
                    onEdit={(teacher) => {
                        setSelectedTeacher(teacher);
                        setShowEditModal(true);
                    }}
                    onDelete={(teacher) => {
                        setSelectedTeacher(teacher);
                        setShowDeleteModal(true);
                    }}
                />

                <AddTeacherModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddTeacher}
                    loading={actionLoading}
                />

                <EditTeacherModal
                    isOpen={showEditModal}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedTeacher(null);
                    }}
                    onSubmit={handleEditTeacher}
                    teacher={selectedTeacher}
                    loading={actionLoading}
                />

                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedTeacher(null);
                    }}
                    onConfirm={handleDeleteTeacher}
                    title="Delete Teacher"
                    description="Are you sure you want to delete"
                    itemName={selectedTeacher?.name}
                    loading={actionLoading}
                />
            </div>
        </AdminLayout>
    );
}