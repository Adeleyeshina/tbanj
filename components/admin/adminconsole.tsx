'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { properties as seedProperties } from '@/lib/data'
import { Property } from '@/components/card/propertycard'
import AdminHeader from './admin-header'
import AdminStats from './admin-stats'
import AdminTabs from './admin-tabs'
import AdminPropertiesTable from './admin-properties-table'
import AdminPropertyForm from './admin-property-form'
import AdminInquiriesTable from './admin-inquiries-table'
import { AdminTab, Inquiry, InquiryStatus } from './admin-types'

const sampleInquiries: Inquiry[] = [
    {
        id: 'inq-1',
        userName: 'Adaeze Okafor',
        userPhone: '+2348031234567',
        userEmail: 'adaeze@example.com',
        propertyTitle: '2 Bedroom Luxury Apartment with Pool',
        propertyPid: 'TB01001',
        date: 'Sat, 05 Sep 2026',
        timeSlot: '11:00 AM - 1:00 PM',
        message: 'Interested in a viewing this weekend. Is it still available for annual rent?',
        status: 'new',
    },
    {
        id: 'inq-2',
        userName: 'Emeka Obi',
        userPhone: '+2349098765432',
        propertyTitle: '5 Bedroom Detached Duplex with BQ',
        propertyPid: 'TB01002',
        date: 'Mon, 07 Sep 2026',
        timeSlot: '2:00 PM - 4:00 PM',
        message: 'Please share the full title documentation before inspection.',
        status: 'contacted',
    },
    {
        id: 'inq-3',
        userName: 'Fatima Bello',
        userPhone: '+2347055511223',
        propertyTitle: '3 Bedroom Shortlet Penthouse',
        propertyPid: 'TB01003',
        date: 'TBD',
        timeSlot: 'Anytime',
        message: '',
        status: 'new',
    },
]

const AdminConsole = () => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<AdminTab>('properties')
    const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null)
    const [properties, setProperties] = useState<Property[]>(seedProperties)
    const [inquiries, setInquiries] = useState<Inquiry[]>(sampleInquiries)
    const [toast, setToast] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const editingProperty = editingPropertyId
        ? properties.find((p) => p.id === editingPropertyId) || null
        : null

    const showToast = (msg: string) => {
        setToast(msg)
        setTimeout(() => setToast(null), 3500)
    }

    const handleLogout = () => {
        // TODO: connect to backend auth logout/session clear
        router.push('/')
    }

    const handleAddNew = () => {
        setEditingPropertyId(null)
        setActiveTab('add')
    }

    const handleEdit = (prop: Property) => {
        setEditingPropertyId(prop.id)
        setActiveTab('add')
    }

    const handleCancel = () => {
        setEditingPropertyId(null)
        setActiveTab('properties')
    }

    const handleSave = (payload: Omit<Property, 'id' | 'pid'>) => {
        setSubmitting(true)
        // TODO: persist to backend API (e.g. POST/PUT /api/admin/properties).
        // PID is generated automatically by the backend when creating a property.
        setTimeout(() => {
            if (editingPropertyId) {
                setProperties((prev) =>
                    prev.map((p) => (p.id === editingPropertyId ? { ...p, ...payload } : p))
                )
                showToast('Property listing updated successfully (UI only).')
            } else {
                const newProperty: Property = {
                    ...payload,
                    id: `prop-${Date.now()}`,
                    pid: `TB0${Math.floor(1000 + Math.random() * 9000)}`,
                }
                setProperties((prev) => [newProperty, ...prev])
                showToast('New luxury property published (UI only).')
            }
            setSubmitting(false)
            setEditingPropertyId(null)
            setActiveTab('properties')
        }, 400)
    }

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            // TODO: DELETE /api/admin/properties/:id
            setProperties((prev) => prev.filter((p) => p.id !== id))
            showToast('Property deleted.')
        }
    }

    const handleToggleFeatured = (id: string) => {
        // TODO: PATCH /api/admin/properties/:id { featured }
        setProperties((prev) =>
            prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
        )
    }

    const handleUpdateInquiryStatus = (id: string, status: InquiryStatus) => {
        // TODO: PATCH /api/admin/inquiries/:id
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
    }

    const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-5 sm:space-y-7">
            {toast && (
                <div className="fixed top-24 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-in slide-in-from-top duration-200 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{toast}</span>
                </div>
            )}

            <AdminHeader onLogout={handleLogout} />
            <AdminStats properties={properties} inquiriesCount={inquiries.length} />
            <AdminTabs
                activeTab={activeTab}
                onChange={setActiveTab}
                propertiesCount={properties.length}
                inquiriesCount={inquiries.length}
                newInquiriesCount={newInquiriesCount}
                editing={!!editingPropertyId}
            />

            {activeTab === 'properties' && (
                <AdminPropertiesTable
                    properties={properties}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleFeatured={handleToggleFeatured}
                    onAddNew={handleAddNew}
                />
            )}

            {activeTab === 'add' && (
                <div key={editingPropertyId || 'new'}>
                    <AdminPropertyForm
                        editingProperty={editingProperty}
                        submitting={submitting}
                        onSubmit={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {activeTab === 'inquiries' && (
                <AdminInquiriesTable
                    inquiries={inquiries}
                    onUpdateStatus={handleUpdateInquiryStatus}
                />
            )}
        </div>
    )
}

export default AdminConsole
