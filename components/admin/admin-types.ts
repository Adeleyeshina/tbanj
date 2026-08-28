import { Property } from '@/components/card/propertycard'

export type AdminTab = 'properties' | 'add' | 'inquiries'

export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'

export interface Inquiry {
    id: string
    userName: string
    userPhone: string
    userEmail?: string
    propertyTitle: string
    propertyPid: string
    date?: string
    timeSlot?: string
    message?: string
    status: InquiryStatus
}

export type PropertyFormData = Omit<Property, 'id' | 'pid'>

export const ALL_AMENITIES_OPTIONS = [
    'Swimming Pool',
    'Boys Quarters (BQ)',
    '24/7 Security & CCTV',
    'Fully Fitted Kitchen',
    'Gym & Fitness Studio',
    'Smart Home Automation',
    'Elevator',
    'Waterfront / Lagoon View',
    'Standby 24/7 Generator',
    'Water Treatment Plant',
    'Children Play Area',
    'Rooftop Terrace',
    'Cinema Room',
    'Walk-in Closets',
    'Stamp Concrete Floor',
]

export const EMPTY_FORM: PropertyFormData = {
    title: '',
    tagline: '',
    type: 'Apartment',
    purpose: 'for-rent',
    price: 0,
    period: 'per annum',
    bedrooms: 0,
    bathrooms: 0,
    parkingSpaces: 0,
    areaSqM: 0,
    neighborhood: '',
    city: '',
    address: '',
    images: [],
    featured: false,
    description: '',
    features: [],
    titleDocument: "Governor's Consent",
    furnishing: 'Semi-Furnished',
    agent: {
        name: '',
        avatar: '',
        whatsapp: '',
        phone: '',
    },
}
