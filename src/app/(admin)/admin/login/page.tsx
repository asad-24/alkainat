'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Cosmic Background */}
            <div className="absolute inset-0">
                {/* Dark base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                {/* Animated nebula */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-cyan-900/30 animate-pulse"></div>

                {/* Floating orbs */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full opacity-30 animate-pulse blur-xl"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full opacity-30 animate-pulse blur-lg" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-30 animate-pulse blur-lg" style={{ animationDelay: '2s' }}></div>

                {/* Stars */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10 mx-4">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Al Kainaat Education - Administrative Access
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Welcome Back</h3>
                        <p className="text-gray-400">
                            Enter your credentials to access the admin dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="username" className="text-gray-300">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                required
                                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                required
                                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold shadow-xl border-0 transform hover:scale-105 transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Access Dashboard'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}