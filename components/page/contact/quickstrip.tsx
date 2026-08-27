import React from 'react'
import { Phone, MessageCircle, Calendar } from 'lucide-react'
import Container from '@/components/ui/container'
import { getWhatsAppUrl, getCallUrl, siteConfig } from '@/lib/site-config'

const QuickStrip = () => {
    return (
        <section className="py-8 sm:py-10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href={getWhatsAppUrl(siteConfig.whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-5 rounded-2xl shadow-md transition-all flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase font-bold tracking-wider text-emerald-200">Instant WhatsApp</p>
                            <p className="font-heading font-bold text-base text-white mt-0.5">Chat Directly Now</p>
                            <p className="text-xs text-emerald-100">{siteConfig.whatsappNumber}</p>
                        </div>
                    </a>

                    <a
                        href={getCallUrl(siteConfig.officePhone)}
                        className="bg-neutral-900 hover:bg-neutral-800 text-white p-5 rounded-2xl shadow-md transition-all flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-brand-accent" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Head Office Hotline</p>
                            <p className="font-heading font-bold text-base text-white mt-0.5">Call Our Senior Desk</p>
                            <p className="text-xs text-neutral-300">{siteConfig.officePhone}</p>
                        </div>
                    </a>

                    <a
                        href={getCallUrl(siteConfig.supportPhone)}
                        className="bg-neutral-900 hover:bg-neutral-800 text-white p-5 rounded-2xl shadow-md transition-all flex items-center gap-4 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                            <Calendar className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase font-bold tracking-wider text-neutral-400">Shortlet Reservations</p>
                            <p className="font-heading font-bold text-base text-white mt-0.5">24/7 Stays Desk</p>
                            <p className="text-xs text-neutral-300">{siteConfig.supportPhone}</p>
                        </div>
                    </a>
                </div>
            </Container>
        </section>
    )
}

export default QuickStrip
