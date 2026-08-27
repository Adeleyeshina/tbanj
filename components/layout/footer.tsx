'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    Send,
    ShieldCheck,
    MessageCircle,
    Calendar,
} from 'lucide-react'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { Instagram } from '@/components/assets/brand/instagram'
import { Facebook } from '@/components/assets/brand/facebook'
import { Linkedin } from '@/components/assets/brand/linkedin'
import { Twitter } from '@/components/assets/brand/twitter'
import { getWhatsAppUrl, getCallUrl, siteConfig } from '@/lib/site-config'
import Container from '@/components/ui/container'

const exploreLinks = [
    { label: 'Home Page', href: '/' },
    { label: 'All Apartments & Duplexes', href: '/apartments' },
    { label: 'Rentals Across Nigeria', href: '/apartments?purpose=for-rent' },
    { label: 'Properties for Sale', href: '/apartments?purpose=for-sale' },
    { label: 'Luxury Shortlets', href: '/apartments?purpose=shortlet' },
    { label: 'About Our Brand', href: '/about' },
    { label: 'Schedule an Inspection', href: '/contact' },
]

const socialLinks = [
    { label: 'Instagram', href: siteConfig.social.instagram, Icon: Instagram },
    { label: 'Facebook', href: siteConfig.social.facebook, Icon: Facebook },
    { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: Linkedin },
    { label: 'Twitter', href: siteConfig.social.twitter, Icon: Twitter },
]

const Footer = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (newsletterEmail) {
            setSubscribed(true)
            setTimeout(() => {
                setSubscribed(false)
                setNewsletterEmail('')
            }, 4000)
        }
    }

    return (
        <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800 mt-auto px-4 sm:px-6 lg:px-8">
            <Container className="px-0 sm:px-0 lg:px-0">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
                    {/* Column 1: Brand Story */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-3 cursor-pointer group inline-flex">
                            <div className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-lg">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                                TBANJ <span className="text-brand-accent">APARTMENT</span>
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-400 leading-relaxed pr-6 max-w-md">
                            {siteConfig.description}
                        </p>

                        {/* Direct Contact Badges */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
                            >
                                <WhatsApp className="w-4 h-4" />
                                <span>Chat on WhatsApp</span>
                            </a>
                            <a
                                href={getCallUrl()}
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold hover:bg-neutral-700 transition-colors"
                            >
                                <Phone className="w-4 h-4 text-brand-accent" />
                                <span>Call: {siteConfig.officePhone}</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-brand-accent">
                            Explore
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {exploreLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Why Choose */}
                    <div>
                        <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-brand-accent">
                            Why Tbanj
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2.5">
                                <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span className="text-neutral-300 leading-snug">
                                    100% verified titles &amp; vetted listings
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span className="text-neutral-300 leading-snug">
                                    Lagos, Ibadan, Abuja &amp; beyond — Nigeria-wide
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MessageCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span className="text-neutral-300 leading-snug">
                                    Direct WhatsApp &amp; call to property managers
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Calendar className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span className="text-neutral-300 leading-snug">
                                    Effortless inspection booking nationwide
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Direct Hotline */}
                    <div>
                        <h4 className="font-heading text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-brand-accent">
                            Stay Informed
                        </h4>
                        <p className="text-xs text-neutral-400 mb-3">
                            Get off-market listings and prime price drops sent directly to your inbox.
                        </p>

                        {subscribed ? (
                            <div className="p-3 bg-emerald-950 border border-emerald-600/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Thank you! You are now on our VIP priority list.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Your email address"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-brand-primary"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1"
                                    >
                                        <span>Join</span>
                                        <Send className="w-3 h-3" />
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="mt-5 space-y-2 text-xs text-neutral-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                                <span>{siteConfig.email}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span>{siteConfig.address}</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-5 flex items-center gap-2">
                            {socialLinks.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    aria-label={label}
                                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-brand-primary text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
                    <div>
                        © {new Date().getFullYear()} Tbanj Apartment Ltd. All rights reserved. Built with precision for luxury living.
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <Link href="/about" className="hover:text-neutral-300">
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link href="/about" className="hover:text-neutral-300">
                            Terms of Service
                        </Link>
                        <span>•</span>
                        <Link href="/contact" className="hover:text-brand-accent">
                            Contact
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
