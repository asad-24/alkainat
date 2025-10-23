"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
    const phoneNumber = "923405622113"
    const whatsappUrl = `https://wa.me/${phoneNumber}`

    const handleClick = () => {
        // Open WhatsApp in new tab/window
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group animate-bounce cursor-pointer"
            aria-label="Chat on WhatsApp"
            title="Chat with us on WhatsApp"
        >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
    )
}