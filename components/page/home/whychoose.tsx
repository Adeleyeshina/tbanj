'use client'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import { ShieldCheck, MessageCircle, Calendar, Compass } from 'lucide-react'
import React from 'react'
import { LucideIcon } from 'lucide-react'

const features: { icon: LucideIcon; title: string; description: string; accent: string }[] = [
    {
        icon: ShieldCheck,
        title: '100% Vetted & Verified Titles',
        description:
            'Every listing undergoes rigorous physical inspection and title verification (Governor\'s Consent, C of O, Deed of Assignment) before publishing.',
        accent: 'bg-emerald-100 text-emerald-800',
    },
    {
        icon: MessageCircle,
        title: 'Direct WhatsApp & Call Integration',
        description:
            'No tedious forms or intermediary bottlenecks. Reach the assigned property manager or owner directly with one click on WhatsApp or phone.',
        accent: 'bg-amber-100 text-amber-800',
    },
    {
        icon: Calendar,
        title: 'Effortless Inspection Booking',
        description:
            'Schedule in-person or virtual video tours at your convenience. Our concierge ensures an executive viewing experience with zero stress.',
        accent: 'bg-indigo-100 text-indigo-800',
    },
]

const WhyChoose = () => {
    return (
        <section className="bg-neutral-50 border-y border-neutral-200/80 py-16">
            <Container>
                <SectionHeading
                    kicker="The Tbanj Difference"
                    title="Why Discerning Clients Choose Tbanj Apartment"
                    subtitle="We bridge the gap between premium real estate and seamless client concierge."
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="bg-white p-7 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.accent}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-heading font-bold text-lg text-neutral-900">
                                    {feature.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

export default WhyChoose
