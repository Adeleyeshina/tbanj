import Button from '@/components/ui/button'
import { ArrowRight, Building2, Calendar, MapPin, Search, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import HeroSearch from './herosearch'

const Hero = () => {
    return (
        <section className="relative min-h-svh lg:min-h-165 flex items-center justify-center bg-neutral-900 overflow-hidden">
            {/* Background Image with Ambient Luxury Gradient */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-banner.avif"
                    alt="Luxury Architecture"
                    className="w-full h-full object-cover opacity-35 scale-105 transform animate-pulse duration-10000"
                    fill
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

                {/* Left Headline */}
                <div className="w-full max-w-2xl space-y-5 sm:space-y-6 text-white">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-accent">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Premium Curated Residences & Shortlets Across Nigeria</span>
                    </div>

                    <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white">
                        Discover <span className="text-brand-accent">Exceptional Living</span> in Nigeria.
                    </h1>

                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                            From waterfront duplexes in Ikoyi to fully serviced luxury shortlets in Lekki Phase 1 and Ibadan's serene neighbourhoods. Connect directly with verified property managers via WhatsApp or direct call.
                        </p>

                    {/* Quick Action Badges */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                        <Button
                            variant='primary'
                            href='/apartments'
                            className="gap-2 group"
                        >
                            <span>Browse All Apartments</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button
                            href='/contact'
                            variant='secondary'
                            className="gap-2"
                        >
                            <Calendar className="w-4 h-4 text-brand-accent" />
                            <span>Book an Inspection</span>
                        </Button>
                    </div>
                </div>

                {/* Right Floating Search Card */}
                <HeroSearch />

            </div>
        </section>

    )
}

export default Hero