import React from 'react'
import type { Metadata } from 'next'
import ApartmentsContent from '@/components/page/apartments/apartmentscontent'

export const metadata: Metadata = {
    title: 'Apartments & Luxury Residences | Tbanj Apartment',
    description:
        'Browse verified apartments, penthouses, duplexes, and shortlets for rent and sale across Lagos, Ibadan, Abuja and beyond in Nigeria.',
}

const Apartments = () => {
    return <ApartmentsContent />
}

export default Apartments
