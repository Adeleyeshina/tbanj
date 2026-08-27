import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import PropertyCard from '@/components/card/propertycard'
import { properties } from '@/lib/data'

const featuredProperties = properties.filter((p) => p.featured)

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
