'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Star, Eye, Edit3, Trash2, ImageIcon } from 'lucide-react'
import { Property } from '@/components/card/propertycard'
import { formatPrice } from './admin-formatters'
import { cn } from '@/utils/cn'
import DeleteModal from '../ui/delete-modal'

interface AdminPropertiesTableProps {
    properties: Property[]
    onEdit: (prop: Property) => void
    onDelete: (id: string, title: string) => void
    onToggleFeatured: (id: string) => void
    onAddNew: () => void
}

const AdminPropertiesTable: React.FC<AdminPropertiesTableProps> = ({ properties, onEdit, onDelete, onToggleFeatured, onAddNew, }) => {

    const [search, setSearch] = useState('')
    const [isDeleteClick, setDeleteClick] = useState<boolean>(false)

    const filtered = properties.filter((p) => {
        if (!search) return true
        const q = search.toLowerCase()
        return (
            p.title.toLowerCase().includes(q) ||
            (p.pid || '').toLowerCase().includes(q) ||
            (p.neighborhood || '').toLowerCase().includes(q) ||
            (p.address || '').toLowerCase().includes(q)
        )
    })

    const purposeBadge = (purpose: string) =>
        cn(
            'px-2 py-0.5 rounded text-[10px] font-bold uppercase',
            purpose === 'for-rent' && 'bg-emerald-100 text-emerald-800',
            purpose === 'for-sale' && 'bg-amber-100 text-amber-800',
            purpose === 'shortlet' && 'bg-indigo-100 text-indigo-800'
        )


    return (
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by title, PID, or neighborhood..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand-primary"
                    />
                </div>

                <button
                    onClick={onAddNew}
                    className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Property</span>
                </button>
            </div>

            <div className="overflow-x-auto border border-neutral-200 rounded-2xl">
                <table className="w-full text-left text-xs min-w-180">
                    <thead className="bg-neutral-50 text-neutral-600 uppercase font-bold text-[10px] tracking-wider border-b border-neutral-200">
                        <tr>
                            <th className="p-3.5">Property</th>
                            <th className="p-3.5">Purpose / Type</th>
                            <th className="p-3.5">Price</th>
                            <th className="p-3.5">Location</th>
                            <th className="p-3.5">Specs</th>
                            <th className="p-3.5">Featured</th>
                            <th className="p-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-neutral-800 font-medium">
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-xs text-neutral-400 italic">
                                    No properties found.
                                </td>
                            </tr>
                        )}
                        {filtered.map((prop) => (
                            <tr key={prop.id} className="hover:bg-neutral-50/80 transition-colors">
                                <td className="p-3.5">
                                    <div className="flex items-center gap-3">
                                        {prop.images[0] ? (
                                            <img
                                                src={prop.images[0]}
                                                alt={prop.title}
                                                className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400 flex items-center justify-center shrink-0">
                                                <ImageIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="font-bold text-neutral-900 truncate max-w-55">{prop.title}</p>
                                            {prop.pid && (
                                                <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                                                    {prop.pid}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                <td className="p-3.5 whitespace-nowrap">
                                    <span className={purposeBadge(prop.purpose)}>{prop.purpose}</span>
                                    <p className="text-[11px] text-neutral-500 mt-0.5 text pl-2">{prop.type}</p>
                                </td>

                                <td className="p-3.5 whitespace-nowrap font-bold text-neutral-900">
                                    {formatPrice(prop.price)}
                                    {prop.period && (
                                        <span className="text-[10px] text-neutral-400 block font-normal">{prop.period}</span>
                                    )}
                                </td>

                                <td className="p-3.5 whitespace-nowrap">
                                    <p className="font-semibold text-neutral-900">{prop.neighborhood || '—'}</p>
                                    <p className="text-[10px] text-neutral-500 truncate max-w-37.5">{prop.address || ''}</p>
                                </td>

                                <td className="p-3.5 whitespace-nowrap text-[11px] text-neutral-600">
                                    {prop.bedrooms} Bed • {prop.bathrooms} Bath • {prop.areaSqM || 0}m²
                                </td>

                                <td className="p-3.5 whitespace-nowrap">
                                    <button
                                        onClick={() => onToggleFeatured(prop.id)}
                                        className={cn(
                                            'p-1.5 rounded-lg border transition-colors',
                                            prop.featured
                                                ? 'bg-amber-50 border-amber-300 text-amber-600'
                                                : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                                        )}
                                        title="Toggle Featured on Homepage"
                                    >
                                        <Star className={cn('w-4 h-4', prop.featured && 'fill-amber-500')} />
                                    </button>
                                </td>

                                <td className="p-3.5 whitespace-nowrap text-right space-x-1">
                                    <Link
                                        href={`/apartments/${prop.id}`}
                                        className="inline-flex p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                                        title="View on site"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => onEdit(prop)}
                                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                                        title="Edit property"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteClick(true)}
                                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                                        title="Delete property"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteModal
                isOpen={isDeleteClick}
                onClose={() => setDeleteClick(false)}
            />
        </div>
    )
}

export default AdminPropertiesTable
