"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage({
    params,
}: {
    params: { locale: string }
}) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [error, setError] = useState<string>("")

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus("loading")
        setError("")

        const form = e.currentTarget
        const formData = new FormData(form)
        const payload = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            message: String(formData.get("message") || ""),
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            if (!res.ok) throw new Error("Request failed")
            setStatus("success")
            form.reset()
        } catch (err: any) {
            setStatus("error")
            setError(err?.message || "Error")
        }
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: "info@alkainaatld.com",
            description: "Send us an email anytime",
            href: "mailto:info@alkainaatld.com"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+92 3405622113",
            description: "Monday to Friday, 9 AM to 6 PM",
            href: "tel:+923405622113"
        },
        {
            icon: MapPin,
            title: "Online Platform",
            details: "Worldwide Access",
            description: "Learn from anywhere in the world",
            href: "#"
        },
        {
            icon: Clock,
            title: "Response Time",
            details: "Within 24 hours",
            description: "We'll get back to you quickly",
            href: "#"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 md:py-32 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 40% 30%, rgba(59,130,246,0.4) 0%, transparent 50%),
                                          radial-gradient(circle at 60% 70%, rgba(236,72,153,0.4) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent">Contact Us</h1>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Get in touch with our team. We're here to help you with any questions about our courses and programs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 md:py-24 bg-gradient-to-bl from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(16,185,129,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 70%, rgba(147,51,234,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">Get In Touch</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Choose the best way to reach us. We're committed to providing excellent support to all our students.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon
                            return (
                                <a
                                    key={index}
                                    href={info.href}
                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20 group block"
                                >
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                                    <p className="text-white font-medium mb-1">{info.details}</p>
                                    <p className="text-white/70 text-sm">{info.description}</p>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 70% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 30% 80%, rgba(236,72,153,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-pink-200 bg-clip-text text-transparent">Send Us a Message</h2>
                            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                                Have a question or want to learn more about our courses? Fill out the form below and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-white font-medium">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            required
                                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-white font-medium">
                                            Email Address *
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-white font-medium">
                                        Message *
                                    </Label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:border-white/50 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        type="submit"
                                        disabled={status === "loading"}
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 text-white font-semibold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300 disabled:opacity-60"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <MessageCircle className="mr-2 h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>

                                    {status === "success" && (
                                        <span className="text-green-300 font-medium">✓ Message sent! We'll reply soon.</span>
                                    )}
                                    {status === "error" && (
                                        <span className="text-red-300 font-medium">✗ Failed: {error}</span>
                                    )}
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-gradient-to-bl from-black via-gray-900 to-black relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 30%, rgba(16,185,129,0.3) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 70%, rgba(147,51,234,0.3) 0%, transparent 50%)`
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-green-200 to-purple-200 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Quick answers to common questions about our courses and platform
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
                        {[
                            {
                                question: "How do I enroll in a course?",
                                answer: "Simply browse our courses, select the one you're interested in, and click 'Enroll Now'. You'll be guided through the registration process."
                            },
                            {
                                question: "Are classes live or recorded?",
                                answer: "We offer both live interactive classes and recorded sessions for flexibility. You can choose based on your schedule and learning preference."
                            },
                            {
                                question: "What technical requirements do I need?",
                                answer: "You'll need a stable internet connection, a computer or mobile device, and a quiet space for learning. All course materials are provided online."
                            },
                            {
                                question: "Do you offer certificates?",
                                answer: "Yes, upon successful completion of our courses, you'll receive a certificate of achievement that you can use for personal or professional purposes."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}