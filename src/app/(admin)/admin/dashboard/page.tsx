'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
  totalTeachers: number;
  totalCourses: number;
  totalStudents: number;
  recentActivity: Array<{
    id: string;
    type: 'teacher' | 'course';
    action: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTeachers: 0,
    totalCourses: 0,
    totalStudents: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch teachers count
      const teachersResponse = await fetch('/api/teachers/add');
      const coursesResponse = await fetch('/api/courses/add');

      if (teachersResponse.ok) {
        const teachersData = await teachersResponse.json();
        const coursesData = coursesResponse.ok ? await coursesResponse.json() : { courses: [] };

        setStats({
          totalTeachers: teachersData.teachers?.length || 0,
          totalCourses: coursesData.courses?.length || 0,
          totalStudents: 0, // This would come from your student data
          recentActivity: [] // This would come from your activity log
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-gray-300">Overview of your education platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Total Teachers</h3>
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalTeachers}</div>
            <p className="text-xs text-gray-400 mt-1">
              Active instructors
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Total Courses</h3>
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalCourses}</div>
            <p className="text-xs text-gray-400 mt-1">
              Available courses
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-300">Total Students</h3>
              <span className="text-2xl">👨‍🎓</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalStudents}</div>
            <p className="text-xs text-gray-400 mt-1">
              Enrolled students
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Quick Actions</h3>
              <p className="text-gray-400 mt-1">Common administrative tasks</p>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => router.push('/admin/teachers')}
                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-cyan-600/10 transition-all duration-300 group"
              >
                <div className="font-medium text-white group-hover:text-cyan-200">Manage Teachers</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300">Add, edit, or remove instructors</div>
              </button>
              <button
                onClick={() => router.push('/admin/courses')}
                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-cyan-600/10 transition-all duration-300 group"
              >
                <div className="font-medium text-white group-hover:text-cyan-200">Manage Courses</div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300">Add, edit, or remove courses</div>
              </button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              <p className="text-gray-400 mt-1">Latest changes to your platform</p>
            </div>
            <div className="p-6">
              {stats.recentActivity.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="text-sm">
                      <span className="font-medium text-white">{activity.action}</span>
                      <span className="text-gray-400 ml-2">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
