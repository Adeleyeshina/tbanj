import React from 'react'
import { Calendar } from 'lucide-react'
import CTASection from '@/components/ui/cta-section'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { getWhatsAppUrl } from '@/lib/site-config'

const CTABanner = () => {
    return (
        <CTASection
            kicker="Concierge Service"
            title="Ready to View Your Next Luxury Apartment?"
            subtitle="Contact our team today. We provide private showings, detailed floor plans, and expert area advisory across Nigeria."
            variant="brand"
            primaryAction={{
                label: 'Chat on WhatsApp',
                href: getWhatsAppUrl(),
                external: true,
                icon: <WhatsApp className="w-4 h-4" />,
            }}
            secondaryAction={{
                label: 'Book Inspection',
                href: '/contact',
                icon: <Calendar className="w-4 h-4 text-brand-accent" />,
            }}
        />
    )
}

export default CTABanner
