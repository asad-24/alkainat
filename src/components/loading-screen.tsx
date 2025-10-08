"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800) // Show loading for 800ms

        return () => clearTimeout(timer)
    }, [pathname])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black overflow-hidden">
            {/* Dark Galaxy Background */}
            <div className="absolute inset-0">
                {/* Dark animated nebula */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-cyan-900/30 animate-pulse"></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 50%),
                                          radial-gradient(circle at 70% 60%, rgba(147,51,234,0.4) 0%, transparent 50%)`
                    }}></div>
                </div>

                {/* Floating orbs */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full opacity-30 animate-float blur-xl"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full opacity-30 animate-float-delayed blur-lg"></div>
                <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full opacity-30 animate-float-slow blur-lg"></div>

                {/* Orbital Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-96 h-96 animate-orbit-slow">
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400/60 to-blue-400/60 rounded-full transform -translate-x-1/2"></div>
                    </div>
                    <div className="absolute w-64 h-64 animate-orbit-reverse">
                        <div className="absolute top-0 left-1/2 w-1 h-1 bg-gradient-to-r from-purple-400/70 to-pink-400/70 rounded-full transform -translate-x-1/2"></div>
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-full animate-twinkle ${i % 3 === 0 ? 'w-1 h-1 bg-cyan-400/40' :
                                    i % 3 === 1 ? 'w-0.5 h-0.5 bg-purple-400/50' :
                                        'w-0.5 h-0.5 bg-white/30'
                                }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="text-center space-y-6 relative z-10">
                {/* Enhanced Animated Logo */}
                <div className="relative">
                    {/* Outer spinning ring with gradient */}
                    <div className="h-24 w-24 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm ring-2 ring-purple-500/30 flex items-center justify-center shadow-2xl animate-pulse relative overflow-hidden">
                        {/* Inner gradient glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl animate-pulse"></div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent relative z-10">AK</span>
                    </div>

                    {/* Multiple spinning rings */}
                    <div className="absolute inset-0 rounded-2xl border-4 border-purple-500/20 border-t-cyan-400 animate-spin"></div>
                    <div className="absolute inset-1 rounded-2xl border-2 border-blue-500/30 border-t-purple-400 animate-spin-reverse"></div>

                    {/* Pulsing outer glow */}
                    <div className="absolute -inset-2 rounded-3xl border border-white/10 animate-pulse-ring"></div>
                </div>

                {/* Enhanced Loading Text */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">Al Kainaat</h2>
                    <p className="text-gray-300 animate-pulse">Loading your learning experience...</p>
                </div>

                {/* Enhanced Loading Dots */}
                <div className="flex justify-center space-x-3">
                    <div className="h-3 w-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce"></div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                    <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse shadow-lg"></div>
                </div>
            </div>
        </div>
    )
}

// Enhanced Route Loading Hook
export function useRouteLoading() {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 600)

        return () => clearTimeout(timer)
    }, [pathname])

    return isLoading
}

// Enhanced Loading Spinner Component with Galaxy Theme
export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
    const sizeClasses = {
        sm: "h-6 w-6 border-2",
        md: "h-8 w-8 border-2",
        lg: "h-12 w-12 border-3"
    }

    const orbSizes = {
        sm: "w-1 h-1",
        md: "w-2 h-2",
        lg: "w-3 h-3"
    }

    return (
        <div className={`relative ${className}`}>
            {/* Outer Ring */}
            <div className={`${sizeClasses[size]} border-purple-500/20 border-t-cyan-400 rounded-full animate-spin`}>
                <div className={`absolute top-0 left-1/2 ${orbSizes[size]} bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2`}></div>
            </div>

            {/* Inner Ring */}
            <div className={`absolute inset-1 ${size === 'sm' ? 'h-4 w-4 border' : size === 'md' ? 'h-6 w-6 border-2' : 'h-10 w-10 border-2'} border-blue-500/30 border-t-purple-400 rounded-full animate-spin-reverse`}>
                <div className={`absolute top-0 left-1/2 ${size === 'sm' ? 'w-0.5 h-0.5' : size === 'md' ? 'w-1 h-1' : 'w-2 h-2'} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2`}></div>
            </div>
        </div>
    )
}