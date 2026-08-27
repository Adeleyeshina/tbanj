import React from 'react'
import { Calendar } from 'lucide-react'
import Container from '@/components/ui/container'
import Button from '@/components/ui/button'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { getWhatsAppUrl } from '@/lib/site-config'

const CTABanner = () => {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <div className="bg-brand-primary rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

                    <div className="max-w-xl space-y-3 relative z-10 text-center md:text-left">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider inline-block">
                            Concierge Service
                        </span>
                        <h2 className="font-heading font-extrabold text-xl sm:text-4xl text-white leading-tight">
                            Ready to View Your Next Luxury Apartment?
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            Contact our team today. We provide private showings, detailed floor plans, and expert neighborhood advisory across Lagos.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto">
                        <a
                            href={getWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-brand-primary hover:bg-neutral-100 text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <WhatsApp className="w-4 h-4" />
                            <span>Chat on WhatsApp</span>
                        </a>

                        <Button
                            href="/contact"
                            className="w-full sm:w-auto bg-neutral-900/80 hover:bg-neutral-900 !text-white border border-white/20 text-xs sm:text-sm font-extrabold justify-center"
                        >
                            <Calendar className="w-4 h-4 text-brand-accent" />
                            <span>Book Inspection</span>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default CTABanner
