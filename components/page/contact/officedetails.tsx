import React from 'react'
import { MapPin, Mail, Clock, Phone, ExternalLink } from 'lucide-react'
import { siteConfig, getMapUrl, getMailUrl, getCallUrl } from '@/lib/site-config'

const OfficeDetails = () => {
    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-heading font-bold text-xl text-neutral-900 pb-3 border-b border-neutral-100">
                Corporate Office & Concierge
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-bold text-neutral-900">Headquarters Address</p>
                        <a
                            href={getMapUrl()}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="text-neutral-600 mt-0.5 block hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                        >
                            {siteConfig.address}
                            <ExternalLink className="w-3 h-3 text-brand-accent shrink-0" />
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-bold text-neutral-900">Call the Senior Desk</p>
                        <a
                            href={getCallUrl(siteConfig.officePhone)}
                            className="text-neutral-600 mt-0.5 block hover:text-brand-primary transition-colors"
                        >
                            {siteConfig.officePhone}
                        </a>
                        <a
                            href={getCallUrl(siteConfig.supportPhone)}
                            className="text-neutral-600 block hover:text-brand-primary transition-colors"
                        >
                            {siteConfig.supportPhone}
                        </a>
                        <a
                            href={getCallUrl(siteConfig.officePhoneUK)}
                            className="text-neutral-600 block hover:text-brand-primary transition-colors"
                        >
                            {siteConfig.officePhoneUK} (International)
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-bold text-neutral-900">Email Inquiries</p>
                        <a
                            href={getMailUrl()}
                            className="text-neutral-600 mt-0.5 block hover:text-brand-primary transition-colors"
                        >
                            {siteConfig.email}
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="font-bold text-neutral-900">Office Working Hours</p>
                        <p className="text-neutral-600 mt-0.5">Monday - Saturday: 8:00 AM – 7:00 PM</p>
                        <p className="text-neutral-600">Sunday: 11:00 AM – 5:00 PM (By Appointment)</p>
                        <p className="text-emerald-700 font-semibold text-xs mt-1">24/7 WhatsApp Hotline Active</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficeDetails
