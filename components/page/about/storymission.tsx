import React from 'react'
import Image from 'next/image'
import { ShieldCheck, MessageCircle } from 'lucide-react'
import Container from '@/components/ui/container'

const stats = [
    {
        icon: ShieldCheck,
        value: '100%',
        title: 'Verified Clean Titles',
        note: "Governor's Consent & C of O",
    },
    {
        icon: MessageCircle,
        value: 'Direct',
        title: 'WhatsApp & Call',
        note: 'Zero intermediary delays',
    },
]

const StoryMission = () => {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent">
                            Our Vision
                        </span>
                        <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-900 leading-tight">
                            A Seamless Gateway to Prime Property and Shortlets
                        </h2>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                            In a rapidly developing country like Nigeria, finding trustworthy, legally certified properties without endless broker hurdles can be challenging. Tbanj Apartment was built to eliminate this friction.
                        </p>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Whether you are an expatriate seeking a secure waterfront penthouse in Ikoyi, a corporate executive booking a high-end shortlet in Lekki Phase 1 or Ibadan, or a diaspora investor securing high-yield assets, we provide guaranteed authenticity and direct communication.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            {stats.map((stat) => {
                                const Icon = stat.icon
                                return (
                                    <div key={stat.title} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon className="w-4 h-4 text-brand-accent" />
                                            <p className="font-heading font-extrabold text-2xl text-brand-primary">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <p className="text-xs font-bold text-neutral-800">{stat.title}</p>
                                        <p className="text-[11px] text-neutral-500 mt-0.5">{stat.note}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 h-[260px] sm:h-[380px] lg:h-[420px]">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                                alt="Premium Nigerian Apartment"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-neutral-200 hidden sm:flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center font-heading font-extrabold text-xl">
                                10+
                            </div>
                            <div>
                                <p className="font-heading font-bold text-sm text-neutral-900">Years of Trust</p>
                                <p className="text-xs text-neutral-500">Across prime Nigerian corridors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default StoryMission
