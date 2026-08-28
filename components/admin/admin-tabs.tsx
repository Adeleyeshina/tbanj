'use client'
import { Layers, Plus, Calendar } from 'lucide-react'
import { AdminTab } from './admin-types'
import { cn } from '@/utils/cn'

interface AdminTabsProps {
    activeTab: AdminTab
    onChange: (tab: AdminTab) => void
    propertiesCount: number
    inquiriesCount: number
    newInquiriesCount: number
    editing: boolean
}

const AdminTabs: React.FC<AdminTabsProps> = ({
    activeTab,
    onChange,
    propertiesCount,
    inquiriesCount,
    newInquiriesCount,
    editing,
}) => {
    const tabBtn = (active: boolean, tab: AdminTab) =>
        cn(
            'px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2',
            activeTab === tab
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
        )

    return (
        <div className="flex bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 overflow-x-auto">
            <button onClick={() => onChange('properties')} className={tabBtn(activeTab === 'properties', 'properties')}>
                <Layers className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Properties ({propertiesCount})</span>
            </button>

            <button
                onClick={() => onChange('add')}
                className={tabBtn(activeTab === 'add', 'add')}
            >
                <Plus className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{editing ? 'Edit Property' : 'Add New Property'}</span>
            </button>

            <button
                onClick={() => onChange('inquiries')}
                className={tabBtn(activeTab === 'inquiries', 'inquiries')}
            >
                <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Client Inquiries ({inquiriesCount})</span>
                {newInquiriesCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                        {newInquiriesCount}
                    </span>
                )}
            </button>
        </div>
    )
}

export default AdminTabs
