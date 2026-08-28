'use client'
import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { getWhatsAppUrl } from '@/lib/site-config'

const FloatingActions = () => {
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [isMounted, setIsMounted] = useState(false) // 1. Add mount state

    useEffect(() => {
        setIsMounted(true) // 2. Trigger on client load

        const checkScroll = () => {
            setShowScrollTop(window.scrollY > 400)
        }
        window.addEventListener('scroll', checkScroll, { passive: true })
        return () => window.removeEventListener('scroll', checkScroll)
    }, [])

    // 3. Skip SSR entirely
    if (!isMounted) return null 

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
            {showScrollTop && (
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="w-11 h-11 rounded-full bg-white text-neutral-700 shadow-xl border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-all hover:scale-105"
                    title="Scroll to Top"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            <a
                id="floating-whatsapp-btn"
                href={getWhatsAppUrl(undefined, 'Hello Tbanj Apartment! I would like to make an enquiry about your luxury listings.')}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl hover:shadow-emerald-600/40 transition-all hover:scale-105"
                title="Chat with Tbanj Concierge on WhatsApp"
                aria-label="Chat with Tbanj Concierge on WhatsApp"
            >
                <WhatsApp className="w-6 h-6 shrink-0" />
                <span className="font-bold text-xs pr-1 hidden sm:inline">WhatsApp Us</span>
            </a>
        </div>
    )
}

export default FloatingActions
