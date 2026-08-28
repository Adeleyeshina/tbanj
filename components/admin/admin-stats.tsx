'use client'
import { Property } from '@/components/card/propertycard'

interface AdminStatsProps {
    properties: Property[]
    inquiriesCount: number
}

const AdminStats: React.FC<AdminStatsProps> = ({ properties, inquiriesCount }) => {
    const rentals = properties.filter((p) => p.purpose === 'for-rent').length
    const sales = properties.filter((p) => p.purpose === 'for-sale').length

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Total Listings</span>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-900 mt-1">{properties.length}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">Active across Nigeria</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Rentals</span>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-700 mt-1">{rentals}</p>
                <span className="text-[10px] text-neutral-400 font-semibold">Shortlet &amp; Annual</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">For Sale</span>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-700 mt-1">{sales}</p>
                <span className="text-[10px] text-neutral-400 font-semibold">Prime Assets</span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Inquiries &amp; Bookings</span>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-primary mt-1">{inquiriesCount}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">WhatsApp &amp; Inspections</span>
            </div>
        </div>
    )
}

export default AdminStats
