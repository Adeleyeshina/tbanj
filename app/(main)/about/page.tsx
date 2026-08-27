import React from 'react'
import AboutHero from '@/components/page/about/abouthero'
import StoryMission from '@/components/page/about/storymission'
import Pillars from '@/components/page/about/pillars'
import Team from '@/components/page/about/team'
import CTASection from '@/components/ui/cta-section'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Tbanj Apartment',
    description:
        'Learn about Tbanj Apartment — Nigeria\'s bespoke luxury real estate platform curating verified apartments, duplexes, penthouses, and shortlets across Lagos, Ibadan, Abuja and beyond.',
}

const About = () => {
    return (
        <>
            <AboutHero />
            <StoryMission />
            <Pillars />
            <Team />
            <CTASection
                kicker="Get In Touch"
                title="Ready to Explore Verified Residences?"
                subtitle="Browse our curated catalog or speak directly with our advisory team on WhatsApp."
                variant="dark"
                primaryAction={{
                    label: 'Explore All Apartments',
                    href: '/apartments',
                    icon: <ArrowRight className="w-4 h-4" />,
                }}
                secondaryAction={{
                    label: 'Contact Advisory',
                    href: '/contact',
                }}
            />
        </>
    )
}

export default About
