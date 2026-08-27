'use client'
import React, { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

const faqs = [
    {
        q: 'How do physical and virtual property inspections work?',
        a: 'Physical viewings are hosted by a verified Tbanj Apartment property advisor. For clients residing abroad (UK, US, Canada, etc.), we also provide live high-definition WhatsApp video walkthroughs.',
    },
    {
        q: 'Are there any hidden fees or agency charges for booking an inspection?',
        a: 'Standard physical inspections for our listed apartments and shortlets are completely free of charge. You only pay when you finalize a lease or purchase contract.',
    },
    {
        q: 'What documents are required to book a luxury shortlet?',
        a: 'For shortlet bookings, a valid government-issued photo ID (International Passport, NIMC, or Drivers License) and payment confirmation are required prior to access code clearance.',
    },
    {
        q: 'Can you help verify the title of a property before I make an offer?',
        a: 'Yes, our legal advisory team conducts comprehensive searches at the Lagos State Lands Bureau (Alausa) to verify Governors Consent, Certificate of Occupancy (C of O), or Gazette status.',
    },
]

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-3">
            <h4 className="font-heading font-bold text-sm text-neutral-900 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-brand-primary" />
                <span>Inspection FAQs</span>
            </h4>

            {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                    <div key={index} className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : index)}
                            className="w-full p-3 text-left text-xs font-bold text-neutral-800 flex items-center justify-between gap-2"
                        >
                            <span>{faq.q}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform text-neutral-400 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                            <div className="px-3 pb-3 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2 bg-neutral-50/50">
                                {faq.a}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default FAQ
