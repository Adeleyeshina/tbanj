import React from 'react'
import Container from '@/components/ui/container'

const ContactHeader = () => {
    return (
        <section className="pt-12 sm:pt-16 pb-4">
            <Container>
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent">
                        Connect With Us
                    </span>
                    <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-neutral-900 tracking-tight">
                        Book an Inspection or Speak with Our Team
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
                        Whether you want to schedule an on-site viewing, book a shortlet, or ask legal questions, our executive advisors are ready to assist you.
                    </p>
                </div>
            </Container>
        </section>
    )
}

export default ContactHeader
