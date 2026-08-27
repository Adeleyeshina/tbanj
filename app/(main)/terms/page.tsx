import React from 'react'
import PageHero from '@/components/ui/page-hero'
import LegalPageContent from '@/components/page/legal/legalpage'
import { siteConfig } from '@/lib/site-config'

const sections = [
    {
        title: 'Acceptance of Terms',
        body: 'By accessing or using the Tbanj Apartment website, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, please discontinue use of the website.',
    },
    {
        title: 'Nature of Services',
        body: 'Tbanj Apartment connects prospective tenants and buyers with verified luxury apartments, duplexes, and shortlets across Nigeria. We facilitate property showings, shortlet reservations, and ownership/acquisition advisory. Our listings are provided for informational purposes and are subject to availability.',
    },
    {
        title: 'Property Information Accuracy',
        body: 'We take reasonable steps to verify legal titles and the accuracy of our listings. However, property details, pricing, and availability may change at any time. Final verification, including Governor Consent and Certificate of Occupancy searches, is completed before any binding agreement is reached.',
    },
    {
        title: 'Bookings and Inspections',
        body: 'Standard physical inspections for our listed properties are free of charge. Inspection appointments are subject to advisor availability and may be rescheduled or cancelled with reasonable notice. Shortlet reservations require a valid government-issued photo ID and payment confirmation prior to access code clearance.',
    },
    {
        title: 'Payments and Security Deposits',
        body: 'All shortlet payments and security deposits are handled through secure, documented channels. Payment confirms the reservation and is subject to the specific cancellation policy of each property. You are responsible for providing accurate payment details.',
    },
    {
        title: 'Use of Content',
        body: 'All content on this website, including photographs, videos, descriptions, logos, and brand assets, is the property of Tbanj Apartment unless otherwise stated. You may not reproduce, distribute, or commercialise this content without prior written permission.',
    },
    {
        title: 'Limitation of Liability',
        body: 'To the fullest extent permitted by law, Tbanj Apartment shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, our website or services, including any reliance on property information provided.',
    },
    {
        title: 'Governing Law',
        body: 'These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nigeria, without regard to conflict of law principles.',
    },
    {
        title: 'Contact Regarding These Terms',
        body: `Questions about these Terms of Service may be directed to ${siteConfig.email} or ${siteConfig.officePhone}.`,
    },
]

export const metadata = {
    title: 'Terms of Service | Tbanj Apartment',
    description:
        'The terms and conditions governing your use of the Tbanj Apartment website and its real estate and shortlet services in Nigeria.',
}

const TermsOfService = () => {
    return (
        <>
            <PageHero
                kicker="Legal"
                title="Terms of Service"
                subtitle="Please read these terms carefully before using our website and services. They govern your relationship with Tbanj Apartment."
            />
            <section className="py-16 sm:py-20">
                <LegalPageContent sections={sections} />
            </section>
        </>
    )
}

export default TermsOfService
