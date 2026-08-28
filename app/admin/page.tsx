import React from 'react'
import type { Metadata } from 'next'
import AdminConsole from '@/components/admin/adminconsole'

export const metadata: Metadata = {
    title: 'Admin Console | Tbanj Apartment',
    description:
        'Manage Tbanj Apartment property listings, rich text descriptions, photos, and client inquiries from the administrative console.',
}

const Admin = () => {
    return <AdminConsole />
}

export default Admin
