'use client'
import React, { useState } from 'react'
import { Calendar, Mail, Send, CheckCircle2 } from 'lucide-react'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { properties } from '@/lib/data'

type Tab = 'booking' | 'general'
type InquiryType = 'viewing' | 'booking' | 'inquiry'

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']

const propertyOptions = [
    { value: '', label: 'General Inquiry / Any Available' },
    ...properties.map((p) => ({ value: p.id, label: `[${p.pid}] ${p.title}` })),
]

const ContactForm = () => {
    const [activeTab, setActiveTab] = useState<Tab>('booking')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedPropId, setSelectedPropId] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('11:00 AM')
    const [inquiryType, setInquiryType] = useState<InquiryType>('viewing')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !phone) return

        // TODO: wire to backend / addInquiry once the data layer is connected.
        // const chosenProp = properties.find((p) => p.id === selectedPropId)

        setSubmitted(true)
        setTimeout(() => {
            setSubmitted(false)
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            setSelectedPropId('')
            setBookingDate('')
        }, 6000)
    }

    return (
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-md space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-0 bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
                <button
                    type="button"
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        activeTab === 'booking' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                >
                    <Calendar className="w-4 h-4 text-brand-primary" />
                    <span>Book Inspection</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                        activeTab === 'general' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                >
                    <Mail className="w-4 h-4 text-brand-primary" />
                    <span>General Inquiry</span>
                </button>
            </div>

            {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-emerald-950">
                        Request Sent Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{name}</strong>. Your request has been logged. Our concierge desk will contact you via phone or WhatsApp within 15 minutes to confirm the appointment.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors inline-block mt-2"
                    >
                        Send Another Request
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                Full Name *
                            </label>
                            <Input
                                type="text"
                                required
                                placeholder="e.g. Adebayo Ogunlesi"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                Phone / WhatsApp Number *
                            </label>
                            <Input
                                type="tel"
                                required
                                placeholder="+234..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                Target Property
                            </label>
                            <Select
                                value={selectedPropId}
                                onChange={(e) => setSelectedPropId(e.target.value)}
                                options={propertyOptions}
                            />
                        </div>
                    </div>

                    {activeTab === 'booking' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                    Inspection Date
                                </label>
                                <Input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                    Preferred Time Slot
                                </label>
                                <Select
                                    value={bookingTime}
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    options={timeSlots.map((t) => ({ value: t, label: t }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                                    Inspection Mode
                                </label>
                                <Select
                                    value={inquiryType}
                                    onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                                    options={[
                                        { value: 'viewing', label: 'Physical In-Person' },
                                        { value: 'booking', label: 'Shortlet Stay Booking' },
                                        { value: 'inquiry', label: 'Virtual Video Tour' },
                                    ]}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                            Message / Special Requirements
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Share any questions about price negotiation, lease tenure, or gate clearance..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand-primary transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 px-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4 shrink-0" />
                        <span className="leading-tight">
                            {activeTab === 'booking' ? (
                                <>
                                    <span className="sm:hidden">Book Inspection</span>
                                    <span className="hidden sm:inline">Submit Inspection</span>
                                </>
                            ) : (
                                <>
                                    <span className="sm:hidden">Send Inquiry</span>
                                    <span className="hidden sm:inline">Submit General Inquiry</span>
                                </>
                            )}
                        </span>
                    </button>
                </form>
            )}
        </div>
    )
}

export default ContactForm
