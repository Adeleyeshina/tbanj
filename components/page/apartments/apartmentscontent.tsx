'use client'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { SearchX, RotateCcw } from 'lucide-react'
import PropertyCard from '@/components/card/propertycard'
import PropertyFiltersBar from '@/components/page/apartments/propertyfilters'
import { properties } from '@/lib/data'
import { DEFAULT_FILTERS, PropertyFilters, filterProperties } from '@/lib/filter-properties'

const ApartmentsContent = () => {
    const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

    const filteredListings = useMemo(() => filterProperties(properties, filters), [filters])

    const resetFilters = () => setFilters(DEFAULT_FILTERS)

    return (
        <div className="max-w-7xl mx-auto w-full  px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                    <Link href="/" className="hover:text-neutral-800">Home</Link>
                    <span>/</span>
                    <span className="text-brand-primary font-bold">Apartments &amp; Residences</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-neutral-900 tracking-tight">
                            Properties &amp; Luxury Apartments
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
                            Explore verified apartments, penthouses, detached duplexes, and shortlets across Lagos, Ibadan, Abuja and beyond.
                        </p>
                    </div>
                </div>
            </div>

            <PropertyFiltersBar
                filters={filters}
                onChange={setFilters}
                onReset={resetFilters}
                totalResults={filteredListings.length}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />

            {filteredListings.length === 0 ? (
                <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                        <SearchX className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-neutral-900">
                        No properties found matching your criteria
                    </h3>
                    <p className="text-xs text-neutral-500">
                        Try loosening your search filters, adjusting your price cap, or removing specific constraints.
                    </p>
                    <button
                        onClick={resetFilters}
                        className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset All Search Filters</span>
                    </button>
                </div>
            ) : viewMode === 'list' ? (
                <div className="space-y-4">
                    {filteredListings.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            layout="list"
                            href={`/apartments/${property.id}`}
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            layout="grid"
                            href={`/apartments/${property.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ApartmentsContent
