import React from 'react'
import { Sparkles } from 'lucide-react'
import PageHero from '@/components/ui/page-hero'

const AboutHero = () => {
    return (
        <PageHero
            kicker="Excellence in Nigerian Luxury Real Estate"
            kickerIcon={<Sparkles className="w-3.5 h-3.5" />}
            title={
                <>
                    Setting the Benchmark for <span className="text-brand-accent">Luxury Living in Nigeria</span>
                </>
            }
            subtitle="Founded with a vision to redefine apartment procurement in Nigeria, Tbanj Apartment pairs verified legal governance with refined, bespoke architecture."
            image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
        />
    )
}

export default AboutHero
