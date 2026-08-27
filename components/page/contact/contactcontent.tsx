import React from 'react'
import Container from '@/components/ui/container'
import ContactForm from '@/components/page/contact/contactform'
import OfficeDetails from '@/components/page/contact/officedetails'
import FAQ from '@/components/page/contact/faq'

const ContactContent = () => {
    return (
        <section className="pb-20">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <ContactForm />

                    <div className="lg:col-span-5 space-y-6">
                        <OfficeDetails />
                        <FAQ />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ContactContent
