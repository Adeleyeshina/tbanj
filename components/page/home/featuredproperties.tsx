import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import PropertyCard, { Property } from '@/components/card/propertycard'
import { siteConfig } from '@/lib/site-config'

const featuredProperties: Property[] = [
    {
        id: '1',
        pid: 'TB08419',
        title: 'Waterfront Executive Duplex',
        tagline: '5 bedrooms with private pool, BQ and direct lagoon frontage on Banana Island.',
        type: 'Duplex',
        purpose: 'for-sale',
        price: 850_000_000,
        bedrooms: 5,
        bathrooms: 6,
        parkingSpaces: 3,
        areaSqM: 720,
        neighborhood: 'Banana Island',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        ],
        featured: true,
        agent: {
            name: 'Adaeze Nwosu',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
            whatsapp: siteConfig.whatsappNumber,
            phone: siteConfig.officePhone,
        },
    },
    {
        id: '2',
        pid: 'TB07312',
        title: 'Skyline Penthouse',
        tagline: 'Full-floor penthouse with panoramic Atlantic views and private elevator.',
        type: 'Penthouse',
        purpose: 'for-rent',
        price: 45_000_000,
        period: 'per annum',
        bedrooms: 4,
        bathrooms: 5,
        parkingSpaces: 2,
        areaSqM: 480,
        neighborhood: 'Victoria Island',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        ],
        featured: true,
        agent: {
            name: 'Tunde Bakare',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            whatsapp: siteConfig.whatsappNumber,
            phone: siteConfig.officePhone,
        },
    },
    {
        id: '3',
        pid: 'TB06807',
        title: 'Serviced Luxury Shortlet',
        tagline: 'Fully serviced 3-bed shortlet with concierge, gym and 24/7 security in the heart of Ibadan.',
        type: 'Shortlet',
        purpose: 'shortlet',
        price: 220_000,
        period: 'per day',
        bedrooms: 3,
        bathrooms: 4,
        parkingSpaces: 1,
        areaSqM: 310,
        neighborhood: 'Ibadan City',
        images: [
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        ],
        featured: true,
        agent: {
            name: 'Chiamaka Obi',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
            whatsapp: siteConfig.whatsappNumber,
            phone: siteConfig.officePhone,
        },
    },
]

const FeaturedProperties = () => {
    return (
        <section className="pb-16  pt-5">
            <Container>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-neutral-200">
                    <SectionHeading
                        align="left"
                        kicker="Hand-Picked Selection"
                        title="Featured Luxury Residences"
                        subtitle="Browse top-tier duplexes, penthouses, and shortlets in prime locations across Nigeria."
                    />

                    <Link
                        href="/apartments"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors self-start sm:self-auto shrink-0"
                    >
                        <span>View all listings</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                    {featuredProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            href={`/apartments/${property.id}`}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/apartments"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors"
                    >
                        <span>View all listings</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </Container>
        </section>
    )
}

export default FeaturedProperties
