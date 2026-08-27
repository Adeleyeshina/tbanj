import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PropertyDetail from '@/components/page/apartments/propertydetail'
import { properties } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

export const dynamicParams = false

export async function generateStaticParams() {
    return properties.map((p) => ({ id: p.id }))
}

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const property = properties.find((p) => p.id === id)
    if (!property) {
        return { title: 'Listing Not Found | Tbanj Apartment' }
    }
    const badgeLabel =
        property.purpose === 'for-rent' ? 'For Rent'
        : property.purpose === 'for-sale' ? 'For Sale'
        : 'Shortlet'
    return {
        title: `${property.title} | Tbanj Apartment`,
        description:
            property.description ||
            property.tagline ||
            `${badgeLabel} ${property.type} in ${property.neighborhood}${property.city ? `, ${property.city}` : ''}. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms. ` +
            `Contact Tbanj Apartment (${siteConfig.officePhone}) via WhatsApp to arrange a private inspection.`,
    }
}

const ApartmentDetails = async ({ params }: PageProps) => {
    const { id } = await params
    const property = properties.find((p) => p.id === id)
    if (!property) notFound()

    return <PropertyDetail property={property} />
}

export default ApartmentDetails
