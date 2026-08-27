'use client'
import React, { useEffect, useState } from 'react'
import { Search, LayoutGrid, List, RotateCcw, SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { allCities, DEFAULT_FILTERS, PropertyFilters } from '@/lib/filter-properties'
import { properties } from '@/lib/data'

interface PropertyFiltersBarProps {
    filters: PropertyFilters
    onChange: (filters: PropertyFilters) => void
    onReset: () => void
    totalResults: number
    viewMode: 'grid' | 'list'
    onViewModeChange: (mode: 'grid' | 'list') => void
}

const cities = allCities(properties)

const purposeOptions = [
    { value: 'all', label: 'All Purposes' },
    { value: 'for-rent', label: 'For Rent' },
    { value: 'for-sale', label: 'For Sale' },
    { value: 'shortlet', label: 'Shortlet' },
]

const cityOptions = [
    { value: 'all', label: 'All Locations' },
    ...cities.map((c) => ({ value: c, label: c })),
]

const priceBucket: { value: string; label: string }[] = [
    { value: '0', label: 'Any Price' },
    { value: '250000', label: 'Up to ₦250K' },
    { value: '30000000', label: 'Up to ₦30M' },
    { value: '50000000', label: 'Up to ₦50M' },
    { value: '100000000', label: 'Up to ₦100M' },
    { value: '500000000', label: 'Up to ₦500M' },
]

const bedroomOptions: { value: string; label: string }[] = [
    { value: '0', label: 'Any Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' },
]

const equals = (filters: PropertyFilters, other: PropertyFilters) =>
    filters.search === other.search &&
    filters.purpose === other.purpose &&
    filters.city === other.city &&
    filters.maxPrice === other.maxPrice &&
    filters.minBedrooms === other.minBedrooms

const PropertyFiltersBar: React.FC<PropertyFiltersBarProps> = ({
    filters,
    onChange,
    onReset,
    totalResults,
    viewMode,
    onViewModeChange,
}) => {
    const [draft, setDraft] = useState<PropertyFilters>(filters)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [desktopFiltersOpen, setDesktopFiltersOpen] = useState(false)

    useEffect(() => {
        setDraft(filters)
    }, [filters])

    const activeDropdownCount = [
        draft.purpose !== DEFAULT_FILTERS.purpose,
        draft.city !== DEFAULT_FILTERS.city,
        draft.maxPrice !== DEFAULT_FILTERS.maxPrice,
        draft.minBedrooms !== DEFAULT_FILTERS.minBedrooms,
    ].filter(Boolean).length

    const hasPendingChanges = !equals(draft, filters)

    const applyFilters = () => {
        onChange(draft)
        setMobileFiltersOpen(false)
    }

    const handleReset = () => {
        setDraft(DEFAULT_FILTERS)
        onReset()
        setMobileFiltersOpen(false)
    }

    const set = (patch: Partial<PropertyFilters>) => setDraft((d) => ({ ...d, ...patch }))

    const dropdowns = (
        <div className="grid grid-cols-2 gap-3">
            <div>
                <Select
                    value={draft.purpose}
                    onChange={(e) => set({ purpose: e.target.value as PropertyFilters['purpose'] })}
                    options={purposeOptions}
                />
            </div>
            <div>
                <Select
                    value={draft.city}
                    onChange={(e) => set({ city: e.target.value })}
                    options={cityOptions}
                />
            </div>
            <div>
                <Select
                    value={draft.maxPrice}
                    onChange={(e) => set({ maxPrice: Number(e.target.value) })}
                    options={priceBucket}
                />
            </div>
            <div>
                <Select
                    value={draft.minBedrooms}
                    onChange={(e) => set({ minBedrooms: Number(e.target.value) })}
                    options={bedroomOptions}
                />
            </div>
        </div>
    )

    const applyButton = (
        <button
            type="button"
            onClick={applyFilters}
            disabled={!hasPendingChanges}
            className={cn(
                'w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all',
                hasPendingChanges
                    ? 'bg-brand-primary text-white shadow-md hover:shadow-lg hover:opacity-90'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
            )}
        >
            <Check className="w-4 h-4" />
            <span>Apply Filters {activeDropdownCount > 0 ? `(${activeDropdownCount})` : ''}</span>
        </button>
    )

    return (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700">
                    <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                    <span>Filter &amp; Search</span>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 font-semibold text-[11px]">
                        {totalResults} results
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setDesktopFiltersOpen((open) => !open)}
                        className={cn(
                            'hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors',
                            desktopFiltersOpen
                                ? 'bg-brand-primary text-white border-brand-primary'
                                : 'text-neutral-600 border-neutral-200 hover:border-neutral-400'
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filters</span>
                        {activeDropdownCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                                {activeDropdownCount}
                            </span>
                        )}
                        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', desktopFiltersOpen && 'rotate-180')} />
                    </button>

                    <div className="flex bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                        <button
                            type="button"
                            onClick={() => onViewModeChange('grid')}
                            aria-label="Grid view"
                            className={cn(
                                'p-2 rounded-lg transition-all',
                                viewMode === 'grid' ? 'bg-white text-brand-primary shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onViewModeChange('list')}
                            aria-label="List view"
                            className={cn(
                                'p-2 rounded-lg transition-all',
                                viewMode === 'list' ? 'bg-white text-brand-primary shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                    placeholder="Search apartments, locations, or listing code..."
                    value={draft.search}
                    onChange={(e) => set({ search: e.target.value })}
                    className="pl-9"
                    inputMode="search"
                />
                {draft.search && (
                    <button
                        type="button"
                        onClick={() => set({ search: '' })}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {desktopFiltersOpen && (
                <>
                    <div className="hidden sm:block">
                        {dropdowns}
                    </div>

                    <div className="hidden sm:flex items-center gap-3 pt-1">
                        {applyButton}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-neutral-600 border border-neutral-200 hover:border-neutral-400 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Reset</span>
                        </button>
                    </div>
                </>
            )}

            <div className="sm:hidden flex items-center gap-2 pt-1">
                <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-bold text-neutral-700"
                >
                    <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
                    <span>More Filters</span>
                    {activeDropdownCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold">
                            {activeDropdownCount}
                        </span>
                    )}
                </button>
                <button
                    type="button"
                    onClick={applyFilters}
                    disabled={!hasPendingChanges}
                    className={cn(
                        'inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all',
                        hasPendingChanges
                            ? 'bg-brand-primary text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    )}
                >
                    <Check className="w-4 h-4" />
                    <span className="sm:hidden">Apply</span>
                </button>
            </div>

            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex items-end">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
                    <div className="relative w-full bg-white rounded-t-3xl p-5 pb-8 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="font-heading font-bold text-base text-neutral-900">Filter Properties</h3>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(false)}
                                aria-label="Close filters"
                                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <Input
                                placeholder="Search apartments, locations..."
                                value={draft.search}
                                onChange={(e) => set({ search: e.target.value })}
                                className="pl-9"
                            />
                        </div>
                        {dropdowns}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-neutral-600 border border-neutral-200"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Reset</span>
                            </button>
                            <button
                                type="button"
                                onClick={applyFilters}
                                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-brand-primary text-white shadow-md hover:opacity-90 transition-opacity"
                            >
                                <Check className="w-4 h-4" />
                                <span>Apply Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PropertyFiltersBar
