import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
    children: React.ReactNode;
    onLogout: () => void;
}

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Teachers', href: '/admin/teachers', icon: '👨‍🏫' },
    { name: 'Courses', href: '/admin/courses', icon: '📚' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Cosmic Background */}
            <div className="absolute inset-0">
                {/* Dark base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                {/* Animated nebula */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-pink-900/5 to-cyan-900/10 animate-pulse"></div>

                {/* Subtle floating orbs */}
                <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full opacity-30 animate-pulse blur-xl"></div>
                <div className="absolute bottom-32 right-32 w-20 h-20 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full opacity-30 animate-pulse blur-lg" style={{ animationDelay: '2s' }}></div>

                {/* Subtle stars */}
                <div className="absolute inset-0 opacity-5">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Header */}
            <header className="relative z-10 bg-white/5 backdrop-blur-sm shadow-xl border-b border-white/10">
                <div className="w-full px-3">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                                Al Kainaat Admin Portal
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-300">Welcome, Admin</span>
                            <Button
                                variant="outline"
                                onClick={onLogout}
                                className="border-white/20 bg-white/10 text-white hover:bg-red-500 hover:border-white/30 cursor-pointer"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex relative z-10">
                {/* Sidebar */}
                <aside className="w-64 bg-white/5 backdrop-blur-sm shadow-xl min-h-[calc(100vh-4rem)] border-r border-white/10">
                    <nav className="mt-5 px-2">
                        <ul className="space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'group flex items-center px-2 py-3 text-base font-medium rounded-xl transition-all duration-300',
                                            pathname === item.href
                                                ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border border-white/20 shadow-lg'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/10 border border-transparent'
                                        )}
                                    >
                                        <span className="mr-3 text-lg">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}