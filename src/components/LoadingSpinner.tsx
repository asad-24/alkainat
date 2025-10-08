"use client"

import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    text?: string
    showLogo?: boolean
}

export default function LoadingSpinner({
    size = 'md',
    text = 'Loading...',
    showLogo = false
}: LoadingSpinnerProps) {
    const [dots, setDots] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.')
        }, 500)
        return () => clearInterval(interval)
    }, [])

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    }

    const orbSizes = {
        sm: 'w-2 h-2',
        md: 'w-4 h-4',
        lg: 'w-6 h-6'
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Loading Spinner */}
            <div className="relative">
                {/* Outer Ring */}
                <div className={`${sizeClasses[size]} border-4 border-purple-500/20 rounded-full animate-spin`}>
                    <div className={`absolute top-0 left-0 ${orbSizes[size]} bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2`}></div>
                </div>

                {/* Inner Ring */}
                <div className={`absolute inset-2 ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-8 h-8' : 'w-16 h-16'} border-4 border-blue-500/30 rounded-full animate-spin-reverse`}>
                    <div className={`absolute top-0 left-0 ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2`}></div>
                </div>

                {/* Center Core */}
                <div className={`absolute ${size === 'sm' ? 'inset-3 w-2 h-2' : size === 'md' ? 'inset-4 w-4 h-4' : 'inset-8 w-8 h-8'} bg-gradient-radial from-white/40 via-purple-300/30 to-transparent rounded-full animate-pulse-core`}></div>
            </div>

            {/* Logo/Title */}
            {showLogo && (
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                        Al-Kainat
                    </h1>
                    <p className="text-gray-400 text-xs mt-1">Learning & Development Institute</p>
                </div>
            )}

            {/* Loading Text */}
            <div className="text-center">
                <p className="text-gray-400 animate-pulse">
                    {text}{dots}
                </p>
            </div>
        </div>
    )
}