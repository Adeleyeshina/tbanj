export const siteConfig = {
    name: 'Tbanj Apartment',
    tagline: 'Luxury Stays & Real Estate',
    description:
        'Tbanj Apartment is Nigeria\'s leading bespoke luxury real estate platform. We curate verified apartments, duplexes, waterfront penthouses, and premium shortlets across Lagos, Ibadan, Abuja and beyond.',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@tbanjapartment.com',
    address: process.env.NEXT_PUBLIC_ADDRESS ?? '12 Admiralty Way, Lekki Phase 1, Lagos State',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '2348146401276',
    officePhone: process.env.NEXT_PUBLIC_OFFICE_PHONE ?? '+2348146401276',
    supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '+2349062511340',
    social: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
    },
} as const

export const getWhatsAppUrl = (number: string = siteConfig.whatsappNumber): string =>
    `https://wa.me/${number.replace(/\D/g, '')}`

export const getCallUrl = (number: string = siteConfig.officePhone): string => `tel:${number}`

export const getMapUrl = (address: string = siteConfig.address): string =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const getMailUrl = (email: string = siteConfig.email): string => `mailto:${email}`
