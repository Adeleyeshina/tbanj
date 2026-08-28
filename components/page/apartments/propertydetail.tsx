'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Heart,
    Share2,
    MapPin,
    Bed,
    Bath,
    Maximize,
    Car,
    ShieldCheck,
    Calendar,
    Phone,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Send,
    ExternalLink,
    Calculator,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { PropertyCard, Property } from '@/components/card/propertycard'
import { properties } from '@/lib/data'
import { getWhatsAppUrl, getCallUrl, getMapUrl } from '@/lib/site-config'
import { siteConfig } from '@/lib/site-config'

const formatPrice = (price: number, period?: Property['period']): string => {
    const base =
        price >= 1_000_000_000
            ? `₦${(price / 1_000_000_000).toFixed(1)}B`
            : price >= 1_000_000
              ? `₦${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
              : price >= 1_000
                ? `₦${(price / 1_000).toFixed(0)}K`
                : `₦${price.toLocaleString()}`
    return period ? `${base}/${period === 'per annum' ? 'yr' : 'night'}` : base
}

const purposeBadge: Record<Property['purpose'], { label: string; bgClass: string }> = {
    'all': { label: 'All', bgClass: 'bg-neutral-900 text-white' },
    'for-rent': { label: 'For Rent', bgClass: 'bg-emerald-600 text-white' },
    'for-sale': { label: 'For Sale', bgClass: 'bg-brand-primary text-white' },
    shortlet: { label: 'Shortlet', bgClass: 'bg-amber-500 text-white' },
}

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']

interface PropertyDetailProps {
    property: Property
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [favorited, setFavorited] = useState(false)
    const [copiedLink, setCopiedLink] = useState(false)
    const touchStartX = useRef<number | null>(null)

    const goNextImage = () =>
        setSelectedImageIndex((p) => (p + 1) % property.images.length)
    const goPrevImage = () =>
        setSelectedImageIndex((p) => (p - 1 + property.images.length) % property.images.length)

    const handleGalleryTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0]?.clientX ?? null
    }
    const handleGalleryTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return
        const deltaX = e.changedTouches[0]?.clientX - touchStartX.current
        touchStartX.current = null
        if (property.images.length <= 1 || Math.abs(deltaX) < 40) return
        if (deltaX < 0) goNextImage()
        else goPrevImage()
    }

    const gallerySwipeProps = {
        onTouchStart: handleGalleryTouchStart,
        onTouchEnd: handleGalleryTouchEnd,
    }

    // Booking form
    const [bookingName, setBookingName] = useState('')
    const [bookingEmail, setBookingEmail] = useState('')
    const [bookingPhone, setBookingPhone] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('11:00 AM')
    const [bookingNotes, setBookingNotes] = useState('')
    const [bookingSuccess, setBookingSuccess] = useState(false)

    // Mortgage calculator
    const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState(30)
    const [calcInterestRate, setCalcInterestRate] = useState(18)
    const [calcYears, setCalcYears] = useState(15)

    const badge = purposeBadge[property.purpose]
    const addressLine = `${property.address || property.neighborhood}${property.city ? `, ${property.city}` : ', Lagos'}`

    const handleShare = () => {
        if (typeof navigator === 'undefined') return
        navigator.clipboard.writeText(window.location.href)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 3000)
    }

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!bookingName || !bookingPhone) return
        // TODO: wire to backend / addInquiry once the data layer is connected.
        setBookingSuccess(true)
        setTimeout(() => {
            setBookingSuccess(false)
            setBookingName('')
            setBookingEmail('')
            setBookingPhone('')
            setBookingNotes('')
        }, 6000)
    }

    const loanAmount = property.price * (1 - calcDownPaymentPercent / 100)
    const monthlyRate = calcInterestRate / 100 / 12
    const numberOfMonths = calcYears * 12
    const monthlyPayment =
        monthlyRate > 0
            ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths))) /
              (Math.pow(1 + monthlyRate, numberOfMonths) - 1)
            : loanAmount / numberOfMonths

    const similarProperties = properties
        .filter(
            (p) =>
                p.id !== property.id &&
                (p.neighborhood === property.neighborhood || p.type === property.type)
        )
        .slice(0, 3)

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
            {/* Header & Breadcrumb */}
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                        <Link href="/" className="hover:text-neutral-800">Home</Link>
                        <span>/</span>
                        <Link href="/apartments" className="hover:text-neutral-800">Apartments</Link>
                        <span>/</span>
                        <span className="text-brand-primary font-bold">{property.neighborhood}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleShare}
                            className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                        >
                            {copiedLink ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700">Link Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-3.5 h-3.5" />
                                    <span>Share</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setFavorited((f) => !f)}
                            className={cn(
                                'p-2 rounded-xl border transition-colors',
                                favorited
                                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                            )}
                            title={favorited ? 'Saved to favorites' : 'Save to favorites'}
                        >
                            <Heart className={cn('w-4 h-4', favorited && 'fill-rose-500 text-rose-500')} />
                        </button>
                    </div>
                </div>

                {/* Title & Price Strip */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={cn('px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider', badge.bgClass)}>
                                {badge.label}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-neutral-900 text-white">
                                {property.type}
                            </span>
                            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                                PID: {property.pid}
                            </span>
                        </div>

                        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-neutral-900 leading-tight">
                            {property.title}
                        </h1>

                        <div className="flex items-center gap-1.5 text-sm text-neutral-600 flex-wrap">
                            <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                            <span>{addressLine}</span>
                        </div>
                    </div>

                    {/* Price Header */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 shadow-sm shrink-0 min-w-[240px] lg:min-w-[280px]">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">
                                    Listing Price
                                </p>
                                <div className="font-heading font-extrabold text-2xl sm:text-[28px] text-brand-primary mt-1 leading-none">
                                    {formatPrice(property.price)}
                                </div>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </span>
                        </div>

                        {property.period ? (
                            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                                <span className="text-neutral-500 font-medium">Billing Period</span>
                                <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wide">
                                    {property.period === 'per annum' ? 'Per Annum' : property.period === 'per day' ? 'Per Night' : property.period}
                                </span>
                            </div>
                        ) : (
                            <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-xs text-neutral-500">
                                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                                <span>Exclusive listing</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-3">
                <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-21/9 max-h-130 bg-neutral-950 shadow-lg" {...gallerySwipeProps}>
                    {property.images[selectedImageIndex] ? (
                        <Image
                            src={property.images[selectedImageIndex]}
                            alt={property.title}
                            fill
                            priority
                            sizes="(min-width: 1280px) 1200px, 100vw"
                            className="object-cover"
                        />
                    ) : (
                        <Image
                            src={property.images[0]}
                            alt={property.title}
                            fill
                            priority
                            sizes="(min-width: 1280px) 1200px, 100vw"
                            className="object-cover"
                        />
                    )}

                    {property.images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <button
                                type="button"
                                onClick={() => setSelectedImageIndex((p) => (p - 1 + property.images.length) % property.images.length)}
                                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedImageIndex((p) => (p + 1) % property.images.length)}
                                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}

                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold">
                        Photo {selectedImageIndex + 1} of {property.images.length}
                    </div>
                </div>

                {property.images.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        {property.images.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedImageIndex(idx)}
                                className={cn(
                                    'relative w-24 h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all',
                                    idx === selectedImageIndex
                                        ? 'border-brand-primary ring-2 ring-brand-primary/20 scale-105'
                                        : 'border-transparent opacity-70 hover:opacity-100'
                                )}
                            >
                                <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Quick Specs */}
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-1">
                                <Bed className="w-4 h-4 text-brand-accent" />
                                <span className="text-xs font-semibold">Bedrooms</span>
                            </div>
                            <p className="font-heading font-extrabold text-xl text-neutral-900">{property.bedrooms} Ensuite</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-1">
                                <Bath className="w-4 h-4 text-brand-accent" />
                                <span className="text-xs font-semibold">Bathrooms</span>
                            </div>
                            <p className="font-heading font-extrabold text-xl text-neutral-900">{property.bathrooms} Baths</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-1">
                                <Car className="w-4 h-4 text-brand-accent" />
                                <span className="text-xs font-semibold">Parking</span>
                            </div>
                            <p className="font-heading font-extrabold text-xl text-neutral-900">{property.parkingSpaces || 2} Cars</p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-1">
                                <Maximize className="w-4 h-4 text-brand-accent" />
                                <span className="text-xs font-semibold">Area</span>
                            </div>
                            <p className="font-heading font-extrabold text-xl text-neutral-900">{property.areaSqM || 350} m²</p>
                        </div>
                    </div>

                    {/* Overview & Title */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
                        <h3 className="font-heading font-bold text-xl text-neutral-900 pb-3 border-b border-neutral-100">
                            Property Overview & Title
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 text-xs sm:text-sm">
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Property Type</span>
                                <span className="font-bold text-neutral-800">{property.type}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Listing Purpose</span>
                                <span className="font-bold text-neutral-800">{badge.label}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Title Document</span>
                                <span className="font-bold text-emerald-700">{property.titleDocument || "Governor's Consent"}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Furnishing</span>
                                <span className="font-bold text-neutral-800">{property.furnishing || 'Semi-Furnished'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Neighborhood</span>
                                <span className="font-bold text-neutral-800">{property.neighborhood}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-neutral-100">
                                <span className="text-neutral-500">Property ID</span>
                                <span className="font-mono font-bold text-neutral-800">{property.pid}</span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                        <h3 className="font-heading font-bold text-xl text-neutral-900 pb-3 border-b border-neutral-100">
                            Detailed Description
                        </h3>
                        {property.richDescription ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: property.richDescription }}
                                className="rich-text text-neutral-700 leading-relaxed text-sm space-y-3"
                            />
                        ) : property.description ? (
                            <p className="text-neutral-700 leading-relaxed text-sm">{property.description}</p>
                        ) : (
                            <p className="text-neutral-700 leading-relaxed text-sm">{property.tagline}</p>
                        )}
                    </div>

                    {/* Features & Amenities */}
                    {property.features && property.features.length > 0 && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                            <h3 className="font-heading font-bold text-xl text-neutral-900 pb-3 border-b border-neutral-100">
                                Features & Amenities
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {property.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5 text-xs font-semibold text-neutral-800"
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Location & Neighborhood */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
                        <div className="pb-3 border-b border-neutral-100">
                            <h3 className="font-heading font-bold text-xl text-neutral-900">
                                Location & Neighborhood
                            </h3>
                            <p className="text-xs text-neutral-500 mt-0.5">{addressLine}</p>
                        </div>

                        <a
                            href={getMapUrl(addressLine)}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="relative block h-95 rounded-2xl overflow-hidden border border-neutral-200 group"
                        >
                            <Image
                                src={property.images[0]}
                                alt={`Map view of ${property.neighborhood}`}
                                fill
                                sizes="(min-width: 1024px) 60vw, 100vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <div className="w-14 h-14 rounded-2xl bg-brand-primary/80 border border-white/40 flex items-center justify-center mb-3">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-white font-heading font-bold text-lg">View on Google Maps</p>
                                <p className="text-white/70 text-xs mt-1 max-w-xs">{addressLine}</p>
                            </div>
                            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg">
                                Open in Maps <ExternalLink className="w-3 h-3" />
                            </span>
                        </a>

                        {property.neighborhoodInfo && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                                {property.neighborhoodInfo.nearestAirport && (
                                    <div className="p-3 bg-neutral-50 rounded-xl text-xs">
                                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Airport</span>
                                        <span className="font-semibold text-neutral-800 mt-0.5 block">{property.neighborhoodInfo.nearestAirport}</span>
                                    </div>
                                )}
                                {property.neighborhoodInfo.nearestMall && (
                                    <div className="p-3 bg-neutral-50 rounded-xl text-xs">
                                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Mall / Retail</span>
                                        <span className="font-semibold text-neutral-800 mt-0.5 block">{property.neighborhoodInfo.nearestMall}</span>
                                    </div>
                                )}
                                {property.neighborhoodInfo.nearestHospital && (
                                    <div className="p-3 bg-neutral-50 rounded-xl text-xs">
                                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Hospital</span>
                                        <span className="font-semibold text-neutral-800 mt-0.5 block">{property.neighborhoodInfo.nearestHospital}</span>
                                    </div>
                                )}
                                {property.neighborhoodInfo.beachAccess && (
                                    <div className="p-3 bg-neutral-50 rounded-xl text-xs">
                                        <span className="text-neutral-400 block text-[10px] uppercase font-bold">Beach Access</span>
                                        <span className="font-semibold text-neutral-800 mt-0.5 block">{property.neighborhoodInfo.beachAccess}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mortgage Calculator */}
                    {property.purpose === 'for-sale' && (
                        <div className="bg-neutral-900 text-white p-6 sm:p-8 rounded-3xl space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-accent text-neutral-950 flex items-center justify-center">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg text-white">
                                        Estimated Mortgage Calculator
                                    </h3>
                                    <p className="text-xs text-neutral-400">
                                        Estimate your monthly financing terms for {property.title}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                                        Down Payment ({calcDownPaymentPercent}%)
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="80"
                                        step="5"
                                        value={calcDownPaymentPercent}
                                        onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                                        className="w-full accent-brand-accent"
                                    />
                                    <div className="text-xs font-bold text-brand-accent mt-1">
                                        {formatPrice((property.price * calcDownPaymentPercent) / 100)}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                                        Interest Rate ({calcInterestRate}%)
                                    </label>
                                    <input
                                        type="range"
                                        min="8"
                                        max="28"
                                        step="1"
                                        value={calcInterestRate}
                                        onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                                        className="w-full accent-brand-accent"
                                    />
                                    <div className="text-xs font-bold text-neutral-300 mt-1">{calcInterestRate}% per annum</div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                                        Loan Term ({calcYears} Years)
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="30"
                                        step="5"
                                        value={calcYears}
                                        onChange={(e) => setCalcYears(Number(e.target.value))}
                                        className="w-full accent-brand-accent"
                                    />
                                    <div className="text-xs font-bold text-neutral-300 mt-1">{calcYears} Years ({calcYears * 12} Months)</div>
                                </div>
                            </div>

                            <div className="bg-neutral-800/90 p-4 rounded-2xl border border-neutral-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-xs text-neutral-400 block font-medium">Estimated Monthly Payment:</span>
                                    <span className="font-heading font-extrabold text-2xl text-brand-accent">
                                        {formatPrice(monthlyPayment)} / month
                                    </span>
                                </div>
                                <a
                                    href={getWhatsAppUrl(property.agent.whatsapp)}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity text-center"
                                >
                                    Discuss Mortgage Options
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                    {/* Contact Agent */}
                    <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-lg space-y-5">
                        <h3 className="font-heading font-bold text-lg text-neutral-900 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-brand-primary" />
                            <span>Contact Property Manager</span>
                        </h3>

                        <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                            <div className="relative w-13 h-13 rounded-2xl overflow-hidden border-2 border-white shadow-xs shrink-0" style={{ width: 52, height: 52 }}>
                                <Image src={property.agent.avatar} alt={property.agent.name} fill sizes="52px" className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                    <h4 className="font-heading font-bold text-sm text-neutral-900 truncate">
                                        {property.agent.name}
                                    </h4>
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                </div>
                                <p className="text-[11px] text-neutral-500">Senior Real Estate Advisor</p>
                                <p className="text-[11px] font-mono text-neutral-600 mt-0.5">{property.agent.phone || siteConfig.officePhone}</p>
                            </div>
                        </div>

                        <a
                            href={getWhatsAppUrl(property.agent.whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <WhatsApp className="w-5 h-5" />
                            <span>Chat Directly on WhatsApp</span>
                        </a>

                        <a
                            href={getCallUrl(property.agent.phone)}
                            className="w-full py-3.5 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5 text-brand-accent" />
                            <span>Call Owner / Agent Directly</span>
                        </a>

                        <div className="pt-2 text-center text-[11px] text-neutral-400">
                            Instant response • No commission hidden fees
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-md space-y-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-brand-primary" />
                            <h3 className="font-heading font-bold text-lg text-neutral-900">
                                Book Private Inspection
                            </h3>
                        </div>
                        <p className="text-xs text-neutral-500">
                            Select a date and our luxury executive concierge will host your walkthrough.
                        </p>

                        {bookingSuccess ? (
                            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 space-y-2 text-xs">
                                <div className="flex items-center gap-2 font-bold text-emerald-900">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Inspection Requested Successfully!</span>
                                </div>
                                <p>
                                    Thank you, <strong>{bookingName}</strong>. Our team has received your appointment for{' '}
                                    <strong>{bookingDate || 'upcoming date'}</strong> and will call you shortly to confirm access clearance.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                                <div>
                                    <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Femi Alade"
                                        value={bookingName}
                                        onChange={(e) => setBookingName(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+234..."
                                            value={bookingPhone}
                                            onChange={(e) => setBookingPhone(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="name@mail.com"
                                            value={bookingEmail}
                                            onChange={(e) => setBookingEmail(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                            Time Slot
                                        </label>
                                        <select
                                            value={bookingTime}
                                            onChange={(e) => setBookingTime(e.target.value)}
                                            className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary font-medium"
                                        >
                                            {timeSlots.map((slot) => (
                                                <option key={slot} value={slot}>{slot}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1">
                                        Special Requests / Notes
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="Any specific questions or access needs?"
                                        value={bookingNotes}
                                        onChange={(e) => setBookingNotes(e.target.value)}
                                        className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:border-brand-primary resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Confirm Inspection Request</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
                <div className="pt-10 border-t border-neutral-200 space-y-6">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent">
                                Related Listings
                            </span>
                            <h3 className="font-heading font-extrabold text-2xl text-neutral-900">
                                Similar Properties You Might Like
                            </h3>
                        </div>
                        <Link
                            href="/apartments"
                            className="text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-primary-hover"
                        >
                            View all listings
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {similarProperties.map((p) => (
                            <PropertyCard
                                key={p.id}
                                property={p}
                                href={`/apartments/${p.id}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertyDetail
