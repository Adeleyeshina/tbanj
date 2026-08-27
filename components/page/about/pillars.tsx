import React from 'react'
import { ShieldCheck, Sparkles, MessageCircle, Award } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'

const pillars: { icon: LucideIcon; title: string; description: string; accent: string }[] = [
    {
        icon: ShieldCheck,
        title: 'Legal Integrity',
        description:
            'Zero ambiguity. Every property document is examined at the Lands Bureau before any public listing.',
        accent: 'bg-emerald-100 text-emerald-800',
    },
    {
        icon: Sparkles,
        title: 'Architectural Standard',
        description:
            'We only select residences that meet rigorous luxury standards: 24/7 power, premium fittings, and top security.',
        accent: 'bg-amber-100 text-amber-800',
    },
    {
        icon: MessageCircle,
        title: 'Direct Accessibility',
        description:
            'Real-time communication on WhatsApp and phone directly with assigned property managers.',
        accent: 'bg-indigo-100 text-indigo-800',
    },
    {
        icon: Award,
        title: 'Dedicated Concierge',
        description:
            'From airport pickup coordination to private physical viewings and key handovers.',
        accent: 'bg-rose-100 text-rose-800',
    },
]

const Pillars = () => {
    return (
        <section className="bg-neutral-50 border-y border-neutral-200/80 py-16 ">
            <Container>
                <SectionHeading
                    kicker="Core Principles"
                    title="The Four Pillars of Tbanj Apartment"
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon
                        return (
                            <div
                                key={pillar.title}
                                className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-3"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pillar.accent}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-heading font-bold text-base text-neutral-900">
                                    {pillar.title}
                                </h3>
                                <p className="text-xs text-neutral-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

export default Pillars
