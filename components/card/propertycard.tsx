'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
    Heart,
    MapPin,
    Bed,
    Bath,
    Maximize,
    Phone,
    ChevronLeft,
    ChevronRight,
    Car,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { WhatsApp } from '@/components/assets/brand/whatsapp'
import { getWhatsAppUrl, getCallUrl } from '@/lib/site-config'

export interface Property {
    id: string
    pid: string
    title: string
    tagline?: string
    type: string
    purpose: 'for-rent' | 'for-sale' | 'shortlet' | 'all'
    price: number
    period?: 'per annum' | 'per day' | ''
    bedrooms: number
    bathrooms: number
    parkingSpaces?: number
    areaSqM?: number
    neighborhood: string
    city?: string
    images: string[]
    featured?: boolean
    agent: {
        name: string
        avatar: string
        whatsapp?: string
        phone?: string
    }
}

interface PropertyCardProps {
    property: Property
    layout?: 'grid' | 'list'
    href?: string
    className?: string
}

const formatPrice = (price: number): string => {
    if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`
    if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
    if (price >= 1_000) return `₦${(price / 1_000).toFixed(0)}K`
    return `₦${price.toLocaleString()}`
}

const purposeBadge: Record<Property['purpose'], { label: string; bgClass: string }> = {
    'all': { label: 'All', bgClass: 'bg-neutral-900 text-white' },
    'for-rent': { label: 'For Rent', bgClass: 'bg-emerald-600 text-white' },
    'for-sale': { label: 'For Sale', bgClass: 'bg-brand-primary text-white' },
    shortlet: { label: 'Shortlet', bgClass: 'bg-amber-500 text-white' },
}

const AgentAvatar: React.FC<{ src: string; alt: string; size?: number }> = ({ src, alt, size = 28 }) => {
    return (
        <span
            className="relative inline-block overflow-hidden rounded-full border border-neutral-200 shrink-0 bg-neutral-100"
            style={{ width: size, height: size }}
        >
            <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" />
        </span>
    )
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
    property,
    layout = 'grid',
    href,
    className,
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [favorited, setFavorited] = useState(false)

    const badge = purposeBadge[property.purpose]
    const hasMultiple = property.images.length > 1

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }

    const currentImage = property.images[currentImageIndex] || property.images[0]

    const navigationArrows = (
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
                type="button"
                onClick={handlePrevImage}
                className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={handleNextImage}
                className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Next image"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    )

    const favoriteButton = (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation()
                setFavorited((f) => !f)
            }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-md flex items-center justify-center transition-transform hover:scale-110 z-10"
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
            aria-label="Toggle favorite"
        >
            <Heart className={cn('w-4 h-4 transition-colors', favorited && 'fill-rose-500 text-rose-500')} />
        </button>
    )

    const actionButtons = (
        <div className="flex items-center gap-1.5 shrink-0">
            <a
                href={getWhatsAppUrl(property.agent.whatsapp)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-700 border border-emerald-300 hover:border-emerald-500 transition-colors shrink-0"
                title="Chat with Agent on WhatsApp"
                aria-label="WhatsApp"
            >
                <WhatsApp className="w-4 h-4" />
            </a>
            <a
                href={getCallUrl(property.agent.phone)}
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 border border-neutral-200 transition-colors shrink-0"
                title="Call Owner / Agent"
                aria-label="Call agent"
            >
                <Phone className="w-4 h-4" />
            </a>
        </div>
    )

    const specsGrid = (
        <div className="flex items-center gap-3 text-xs text-neutral-600 font-medium mt-3 pt-3 border-t border-neutral-100">
            <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-neutral-400" />
                {property.bedrooms} Beds
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-neutral-400" />
                {property.bathrooms} Baths
            </span>
            {property.areaSqM && (
                <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-neutral-400" />
                        {property.areaSqM}m²
                    </span>
                </>
            )}
        </div>
    )

    if (layout === 'list') {
        return (
            <div
                className={cn(
                    'group bg-white rounded-2xl border border-neutral-200/90 hover:border-brand-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row',
                    className
                )}
            >
                <div className="relative md:w-80 lg:w-96 shrink-0 h-64 md:h-auto overflow-hidden bg-neutral-100">
                    {currentImage && (
                        <Image
                            src={currentImage}
                            alt={property.title}
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                        <span className={cn('px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm', badge.bgClass)}>
                            {badge.label}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-900/80 text-white">
                            {property.type}
                        </span>
                    </div>
                    {favoriteButton}
                    {hasMultiple && navigationArrows}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono tracking-wider font-semibold">
                        {property.pid}
                    </div>
                </div>

                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                                <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                                <span>{property.neighborhood}{property.city ? `, ${property.city}` : ''}</span>
                            </div>
                            <div>
                                <span className="font-heading font-extrabold text-xl text-neutral-900">
                                    {formatPrice(property.price)}
                                </span>
                                {property.period && (
                                    <span className="text-xs text-neutral-500 font-medium ml-1">
                                        /{property.period === 'per annum' ? 'yr' : property.period === 'per day' ? 'night' : ''}
                                    </span>
                                )}
                            </div>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-neutral-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                            {property.title}
                        </h3>
                        {property.tagline && (
                            <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{property.tagline}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-600 mt-4 py-3 border-y border-neutral-100">
                            <span className="flex items-center gap-1.5">
                                <Bed className="w-4 h-4 text-neutral-400" />
                                {property.bedrooms} Beds
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Bath className="w-4 h-4 text-neutral-400" />
                                {property.bathrooms} Baths
                            </span>
                            {property.parkingSpaces && (
                                <span className="flex items-center gap-1.5">
                                    <Car className="w-4 h-4 text-neutral-400" />
                                    {property.parkingSpaces} Parking
                                </span>
                            )}
                            {property.areaSqM && (
                                <span className="flex items-center gap-1.5">
                                    <Maximize className="w-4 h-4 text-neutral-400" />
                                    {property.areaSqM} m²
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            {property.agent.avatar && <AgentAvatar src={property.agent.avatar} alt={property.agent.name} size={32} />}
                            <div>
                                <p className="text-xs font-bold text-neutral-800 leading-tight">{property.agent.name}</p>
                                <p className="text-[10px] text-neutral-500">Agent</p>
                            </div>
                        </div>
                        {actionButtons}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={cn(
                'group bg-white rounded-2xl border border-neutral-200/90 hover:border-brand-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col',
                className
            )}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                {currentImage && (
                    <Image
                        src={currentImage}
                        alt={property.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className={cn('px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm', badge.bgClass)}>
                        {badge.label}
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-neutral-900/80 text-white">
                        {property.type}
                    </span>
                </div>
                {favoriteButton}
                {hasMultiple && navigationArrows}
                {hasMultiple && (
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 z-10">
                        {property.images.slice(0, 5).map((_, idx) => (
                            <span
                                key={idx}
                                className={cn(
                                    'w-1.5 h-1.5 rounded-full transition-all',
                                    idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                                )}
                            />
                        ))}
                    </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                    <div className="flex items-center gap-1 font-semibold text-white drop-shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                        <span className="truncate">{property.neighborhood}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-black/60 px-1.5 py-0.5 rounded text-neutral-200">
                        {property.pid}
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-baseline gap-1 mb-1.5">
                        <span className="font-heading font-extrabold text-xl text-neutral-900">
                            {formatPrice(property.price)}
                        </span>
                        {property.period && (
                            <span className="text-xs text-neutral-500 font-medium">
                                /{property.period === 'per annum' ? 'annum' : property.period === 'per day' ? 'day' : ''}
                            </span>
                        )}
                    </div>
                    <h3 className="font-heading font-bold text-base text-neutral-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                        {property.title}
                    </h3>
                    {specsGrid}
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                        {property.agent.avatar && <AgentAvatar src={property.agent.avatar} alt={property.agent.name} size={28} />}
                        <span className="text-xs font-semibold text-neutral-800 truncate">
                            {property.agent.name.split(' ')[0]}
                        </span>
                    </div>
                    {actionButtons}
                </div>
            </div>
        </div>
    )
}

export default PropertyCard
