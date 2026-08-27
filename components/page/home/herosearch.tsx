'use client'

import { Building2, MapPin, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const purposes = [
    { id: 'all', label: 'All' },
    { id: 'for-rent', label: 'Rent' },
    { id: 'for-sale', label: 'Buy' },
]

const locations = [
    { value: 'all', label: 'All Prime Lagos Neighborhoods' },
    { value: 'Ikoyi', label: 'Ikoyi (Waterfront & Diplomatic)' },
    { value: 'Lekki Phase 1', label: 'Lekki Phase 1 (Prime Hub)' },
    { value: 'Victoria Island', label: 'Victoria Island (Towers)' },
    { value: 'Eko Atlantic', label: 'Eko Atlantic City' },
    { value: 'Banana Island', label: 'Banana Island' },
    { value: 'Ikeja GRA', label: 'Ikeja GRA (Mainland Luxury)' },
]

const categories = [
    { value: 'all', label: 'All Categories (Duplex, Flat, Villa)' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Semi-Detached', label: 'Semi-Detached' },
    { value: 'Terrace', label: 'Terrace' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Shortlet', label: 'Shortlet' },
]

const HeroSearch = () => {
    const router = useRouter()
    const [purpose, setPurpose] = useState('all')
    const [location, setLocation] = useState('all')
    const [category, setCategory] = useState('all')
    const [keyword, setKeyword] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (purpose !== 'all') params.set('purpose', purpose)
        if (location !== 'all') params.set('location', location)
        if (category !== 'all') params.set('type', category)
        if (keyword.trim()) params.set('keyword', keyword.trim())
        const qs = params.toString()
        router.push(qs ? `/apartments?${qs}` : '/apartments')
    }

    return (
        <div className="w-full lg:max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/40 text-neutral-900">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-100 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center">
                        <Search className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-neutral-900">
                        Find Your Perfect Residence
                    </h3>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary-light px-2 py-0.5 rounded hidden sm:block">
                    Live Search
                </span>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
                {/* Purpose Selector */}
                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                        Looking To
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 bg-neutral-100 p-1 rounded-xl">
                        {purposes.map((p) => {
                            const isActive = purpose === p.id
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setPurpose(p.id)}
                                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        isActive
                                            ? 'bg-brand-primary text-white shadow-sm'
                                            : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Location Selector */}
                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Prime Location
                    </label>
                    <div className="relative">
                        <MapPin className="w-4 h-4 text-brand-accent absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:border-brand-primary"
                        >
                            {locations.map((l) => (
                                <option key={l.value} value={l.value}>
                                    {l.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Property Type Selector */}
                <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                        Property Category
                    </label>
                    <div className="relative">
                        <Building2 className="w-4 h-4 text-brand-accent absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:border-brand-primary"
                        >
                            {categories.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Keyword optional */}
                <div>
                    <input
                        type="text"
                        placeholder="Keywords: e.g. Pool, BQ, Ocean View..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand-primary"
                    />
                </div>

                {/* Search Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    <Search className="w-4 h-4" />
                    <span>Search Available Properties</span>
                </button>
            </form>
        </div>
    )
}

export default HeroSearch
