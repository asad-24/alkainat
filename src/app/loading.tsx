import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
            {/* Dark Galaxy Background */}
            <div className="absolute inset-0">
                {/* Dark base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                {/* Dark animated nebula */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-cyan-900/30 animate-pulse"></div>

                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4) 0%, transparent 50%),
                                          radial-gradient(circle at 70% 60%, rgba(147,51,234,0.4) 0%, transparent 50%)`
                    }}></div>
                </div>

                {/* Dark stars layer 1 */}
                <div className="absolute inset-0 opacity-20">
                    <div className="stars stars-small"></div>
                </div>

                {/* Dark stars layer 2 */}
                <div className="absolute inset-0 opacity-15">
                    <div className="stars stars-medium"></div>
                </div>

                {/* Dark stars layer 3 */}
                <div className="absolute inset-0 opacity-10">
                    <div className="stars stars-large"></div>
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
                    {[...Array(15)].map((_, i) => (
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

            {/* Loading Content */}
            <div className="relative z-10">
                <LoadingSpinner size="lg" text="Preparing your learning experience" showLogo={true} />
            </div>
        </div>
    )
}