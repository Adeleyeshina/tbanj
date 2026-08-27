import React from 'react'
import type { Metadata } from 'next'
import ContactHeader from '@/components/page/contact/contactheader'
import QuickStrip from '@/components/page/contact/quickstrip'
import ContactContent from '@/components/page/contact/contactcontent'

export const metadata: Metadata = {
    title: 'Contact Us | Tbanj Apartment',
    description:
        'Book a property inspection, reserve a luxury shortlet, or reach our advisory team. Contact Tbanj Apartment via WhatsApp, phone, or our contact form.',
}

const Contact = () => {
    return (
        <>
            <ContactHeader />
            <QuickStrip />
            <ContactContent />
        </>
    )
}

export default Contact
