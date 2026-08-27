import { Property } from '@/components/card/propertycard'

export interface PropertyFilters {
    search: string
    purpose: 'all' | Property['purpose']
    city: string
    maxPrice: number
    minBedrooms: number
}

export const DEFAULT_FILTERS: PropertyFilters = {
    search: '',
    purpose: 'all',
    city: 'all',
    maxPrice: 0,
    minBedrooms: 0,
}

export const allCities = (properties: Property[]): string[] => {
    const cities = new Set<string>()
    properties.forEach((p) => {
        if (p.city) cities.add(p.city)
    })
    return Array.from(cities).sort()
}

export const filterProperties = (properties: Property[], filters: PropertyFilters): Property[] => {
    const search = filters.search.trim().toLowerCase()
    return properties.filter((p) => {
        if (filters.purpose !== 'all' && p.purpose !== filters.purpose) return false
        if (filters.city !== 'all' && (p.city || '') !== filters.city) return false
        if (filters.maxPrice > 0 && p.price > filters.maxPrice) return false
        if (filters.minBedrooms > 0 && p.bedrooms < filters.minBedrooms) return false
        if (search) {
            const haystack = `${p.title} ${p.neighborhood} ${p.city ?? ''} ${p.type} ${p.pid}`.toLowerCase()
            if (!haystack.includes(search)) return false
        }
        return true
    })
}
