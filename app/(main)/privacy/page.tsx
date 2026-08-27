import React from 'react'
import Container from '@/components/ui/container'
import PageHero from '@/components/ui/page-hero'
import LegalPageContent from '@/components/page/legal/legalpage'
import { siteConfig } from '@/lib/site-config'

const sections = [
    {
        title: 'Information We Collect',
        body: 'We collect information you voluntarily provide when you fill out our inspection and booking forms, subscribe to our newsletter, or communicate with us directly via WhatsApp, phone, or email. This may include your name, email address, phone number, inquiry type, preferred viewing date and time, and any messages you send regarding properties.',
    },
    {
        title: 'How We Use Your Information',
        body: `Your information is used solely to respond to your inquiries, schedule property inspections, facilitate shortlet reservations, verify property requests, and keep you informed about listings you express interest in. We do not sell or rent your personal data to third parties. Contact us at ${siteConfig.email}.`,
    },
    {
        title: 'How We Share Information',
        body: 'We only share your details with the specific property manager or advisor handling your request within our organisation. We never disclose your personal information to external parties without your explicit consent, except where required to do so by law.',
    },
    {
        title: 'Security of Your Data',
        body: 'We take reasonable administrative, technical, and physical safeguards to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Communications over WhatsApp are protected by their native end-to-end encryption.',
    },
    {
        title: 'Your Data Rights',
        body: 'You have the right to request a copy of the personal data we hold about you, request corrections, or ask us to delete your information at any time. To exercise these rights, contact our privacy desk directly via the contact channels provided on this website.',
    },
    {
        title: 'Cookies and Analytics',
        body: 'This website may use cookies and similar technologies to improve your browsing experience and understand aggregate traffic patterns. You may disable cookies through your browser settings, though some site features may be affected as a result.',
    },
    {
        title: 'Third-Party Links',
        body: 'Our website may contain links to external sites such as WhatsApp and social media platforms. We are not responsible for the privacy practices or content of those external websites and encourage you to review their respective privacy policies.',
    },
    {
        title: 'Contact About This Policy',
        body: `For any questions regarding this Privacy Policy, your data, or our practices, please reach out to our team via ${siteConfig.email} or ${siteConfig.officePhone}.`,
    },
]

export const metadata = {
    title: 'Privacy Policy | Tbanj Apartment',
    description:
        'Learn how Tbanj Apartment collects, uses, and protects your personal information across our real estate and shortlet services in Nigeria.',
}

const PrivacyPolicy = () => {
    return (
        <>
            <PageHero
                kicker="Legal"
                title="Privacy Policy"
                subtitle="Your privacy matters. This policy explains how Tbanj Apartment collects, uses, and protects the information you share with us."
            />
            <section className="py-16 sm:py-20">
                <LegalPageContent sections={sections} />
            </section>
        </>
    )
}

export default PrivacyPolicy
