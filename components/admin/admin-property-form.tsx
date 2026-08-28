'use client'
import { useState } from 'react'
import {
    ImagePlus,
    Upload,
    X,
    Star,
    Check,
    CheckCircle2,
    ImageIcon,
} from 'lucide-react'
import { Property } from '@/components/card/propertycard'
import RichTextEditor from './rich-text-editor'
import { ALL_AMENITIES_OPTIONS } from './admin-types'
import { cn } from '@/utils/cn'

type FormData = Omit<Property, 'id' | 'pid'>

interface AdminPropertyFormProps {
    editingProperty?: Property | null
    submitting?: boolean
    onSubmit: (payload: FormData) => void
    onCancel: () => void
}

const NEIGHBORHOODS = [
    'Ikoyi',
    'Lekki Phase 1',
    'Victoria Island',
    'Eko Atlantic',
    'Banana Island',
    'Ikeja GRA',
    'Wuse 2',
    'Maitama',
    'Gwarinpa',
]

const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
    'Ikoyi': { lat: 6.4531, lng: 3.435 },
    'Lekki Phase 1': { lat: 6.4474, lng: 3.4723 },
    'Victoria Island': { lat: 6.4281, lng: 3.4219 },
    'Eko Atlantic': { lat: 6.4172, lng: 3.4095 },
    'Banana Island': { lat: 6.46, lng: 3.447 },
    'Ikeja GRA': { lat: 6.5925, lng: 3.3562 },
    'Wuse 2': { lat: 9.0765, lng: 7.3986 },
    'Maitama': { lat: 9.0814, lng: 7.4958 },
    'Gwarinpa': { lat: 9.0862, lng: 7.4337 },
}

const emptyForm = (): FormData => ({
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
    richDescription: '',
    features: [],
    titleDocument: "Governor's Consent",
    furnishing: 'Semi-Furnished',
    agent: {
        name: '',
        avatar: '',
        whatsapp: '',
        phone: '',
    },
})

const AdminPropertyForm: React.FC<AdminPropertyFormProps> = ({
    editingProperty,
    submitting,
    onSubmit,
    onCancel,
}) => {
    const [form, setForm] = useState<FormData>(() =>
        editingProperty
            ? {
                  ...editingProperty,
                  richDescription:
                      editingProperty.richDescription || editingProperty.description || '',
              }
            : emptyForm()
    )
    const [newImageUrl, setNewImageUrl] = useState('')
    const [customFeature, setCustomFeature] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)

    const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
        setForm((prev) => ({ ...prev, [key]: value }))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim()) {
            alert('Please provide a property title')
            return
        }
        onSubmit(form)
    }

    const downloadImages = (files: FileList | File[]) => {
        const fileList = Array.from(files).filter((f) => f.type.startsWith('image/'))
        if (fileList.length === 0) return
        setIsUploading(true)
        let loaded = 0
        const newImages: string[] = []
        fileList.forEach((file) => {
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target?.result) newImages.push(event.target.result as string)
                loaded++
                if (loaded === fileList.length) {
                    setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
                    setIsUploading(false)
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const handleDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) downloadImages(e.target.files)
        e.target.value = ''
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)
        downloadImages(e.dataTransfer.files)
    }

    const addImageUrl = () => {
        if (!newImageUrl.trim()) return
        set('images', [...form.images, newImageUrl.trim()])
        setNewImageUrl('')
    }

    const removeImage = (index: number) =>
        set('images', form.images.filter((_, i) => i !== index))

    const makeCover = (index: number) => {
        if (index === 0) return
        set('images', [form.images[index], ...form.images.filter((_, i) => i !== index)])
    }

    const features = form.features ?? []

    const toggleFeature = (feature: string) =>
        set('features', features.includes(feature)
            ? features.filter((f) => f !== feature)
            : [...features, feature])

    const addCustomFeature = () => {
        if (customFeature.trim() && !features.includes(customFeature.trim())) {
            set('features', [...features, customFeature.trim()])
            setCustomFeature('')
        }
    }

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) return
        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result)
                set('agent', { ...form.agent, avatar: event.target.result as string })
        }
        reader.readAsDataURL(file)
        e.target.value = ''
    }

    const onNeighborhoodChange = (value: string) => {
        set('neighborhood', value)
        const coords = NEIGHBORHOOD_COORDS[value]
        if (coords) {
            set('lat', coords.lat)
            set('lng', coords.lng)
        }
    }

    const inputCls =
        'w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-brand-primary transition-colors'
    const labelCls = 'block font-bold text-neutral-700 uppercase tracking-wider mb-1.5 text-[11px]'

    const sectionHead = (num: string, title: string) => (
        <h3 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wider text-brand-primary">
            {num}. {title}
        </h3>
    )

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-4 sm:p-8 space-y-8"
        >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div>
                    <h2 className="font-heading font-extrabold text-lg sm:text-xl text-neutral-900">
                        {editingProperty ? `Edit Listing: ${form.title}` : 'Create New Luxury Property'}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                        Fill in property specifications, images, amenities, and rich text description.
                    </p>
                </div>
                {editingProperty && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-xs text-neutral-500 hover:text-neutral-900 underline"
                    >
                        Cancel Edit &amp; Clear
                    </button>
                )}
            </div>

            {/* 1. Basic Info */}
            <div className="space-y-4">
                {sectionHead('1', 'Basic Property Information')}
                <div>
                    <label className={labelCls}>Property Title *</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. 5 Bedroom Fully Detached Luxury Duplex with Pool"
                        value={form.title}
                        onChange={(e) => set('title', e.target.value)}
                        className={inputCls}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className={labelCls}>Purpose *</label>
                        <select
                            value={form.purpose}
                            onChange={(e) => set('purpose', e.target.value as FormData['purpose'])}
                            className={inputCls}
                        >
                            <option value="for-rent">For Rent (Annual)</option>
                            <option value="for-sale">For Sale (Outright)</option>
                            <option value="shortlet">Shortlet (Daily/Weekly)</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Price in NGN (₦) *</label>
                        <input
                            type="number"
                            required
                            value={form.price}
                            onChange={(e) => set('price', Number(e.target.value))}
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Billing Period</label>
                        <select
                            value={form.period}
                            onChange={(e) =>
                                set('period', e.target.value as FormData['period'] || '')
                            }
                            className={inputCls}
                        >
                            <option value="per annum">Per Annum (Annual)</option>
                            <option value="per day">Per Day (Night)</option>
                            <option value="">Total Outright</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Property Category</label>
                        <select
                            value={form.type}
                            onChange={(e) => set('type', e.target.value)}
                            className={inputCls}
                        >
                            <option value="Apartment">Apartment</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Semi-Detached">Semi-Detached</option>
                            <option value="Terrace">Terrace</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Shortlet">Shortlet</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelCls}>Catchy Tagline (Optional)</label>
                    <input
                        type="text"
                        placeholder="e.g. Masterful contemporary architecture with private infinity pool and elevator"
                        value={form.tagline}
                        onChange={(e) => set('tagline', e.target.value)}
                        className={inputCls}
                    />
                </div>
            </div>

            {/* 2. Location */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                {sectionHead('2', 'Location & Map Coordinates')}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <label className={labelCls}>Street Address</label>
                        <input
                            type="text"
                            placeholder="e.g. 15 Alexander Avenue"
                            value={form.address}
                            onChange={(e) => set('address', e.target.value)}
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Prime Neighborhood</label>
                        <select
                            value={form.neighborhood}
                            onChange={(e) => onNeighborhoodChange(e.target.value)}
                            className={inputCls}
                        >
                            <option value="">Select neighborhood...</option>
                            {NEIGHBORHOODS.map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>City / State</label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => set('city', e.target.value)}
                            className={inputCls}
                        />
                    </div>
                </div>
            </div>

            {/* 3. Specs */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                {sectionHead('3', 'Specifications & Legal Title')}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                        <label className={labelCls}>Bedrooms</label>
                        <input type="number" min="0" max="20" value={form.bedrooms}
                            onChange={(e) => set('bedrooms', Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Bathrooms</label>
                        <input type="number" min="0" max="20" value={form.bathrooms}
                            onChange={(e) => set('bathrooms', Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Parking</label>
                        <input type="number" min="0" value={form.parkingSpaces}
                            onChange={(e) => set('parkingSpaces', Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Area (m²)</label>
                        <input type="number" min="0" value={form.areaSqM}
                            onChange={(e) => set('areaSqM', Number(e.target.value))} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Furnishing</label>
                        <select value={form.furnishing}
                            onChange={(e) => set('furnishing', e.target.value)} className={inputCls}>
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Semi-Furnished">Semi-Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelCls}>Title Document</label>
                        <select value={form.titleDocument}
                            onChange={(e) => set('titleDocument', e.target.value)} className={inputCls}>
                            <option value="Governor&apos;s Consent">Governor&apos;s Consent</option>
                            <option value="Certificate of Occupancy (C of O)">C of O</option>
                            <option value="Deed of Assignment">Deed of Assignment</option>
                            <option value="Gazette">Gazette</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 4. Rich Text Description */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                {sectionHead('4', 'Rich Text Description')}
                <RichTextEditor
                    value={form.richDescription || ''}
                    onChange={(html) => set('richDescription', html)}
                    label="Luxury Narrative & Terms (Rich Text HTML)"
                />
            </div>

            {/* 5. Photos */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <h3 className="font-heading font-bold text-sm text-neutral-900 uppercase tracking-wider text-brand-primary flex items-center gap-2">
                            <ImagePlus className="w-4 h-4" />
                            <span>5. High-Resolution Photos ({form.images.length})</span>
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            Upload photos directly from your device or paste image URLs. The first photo is the cover.
                        </p>
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                        {form.images.length} photo{form.images.length !== 1 ? 's' : ''} attached
                    </span>
                </div>

                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    className={cn(
                        'p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center transition-all',
                        isDragOver
                            ? 'border-brand-primary bg-blue-50/70 scale-[0.99]'
                            : 'border-neutral-300 hover:border-brand-primary/60 bg-neutral-50/60'
                    )}
                >
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-brand-primary flex items-center justify-center shadow-xs">
                            <Upload className="w-6 h-6" />
                        </div>
                        <div className="space-y-1 max-w-sm">
                            <p className="text-sm font-bold text-neutral-800">Drag and drop property photos here</p>
                            <p className="text-xs text-neutral-500">Supports JPG, PNG, WEBP from your computer, phone, or tablet</p>
                        </div>
                        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95">
                            <ImagePlus className="w-4 h-4" />
                            <span>Browse Device Files</span>
                            <input type="file" multiple accept="image/*" onChange={handleDeviceUpload} className="hidden" />
                        </label>
                        {isUploading && (
                            <p className="text-xs font-bold text-brand-primary animate-pulse mt-2">Processing images from device...</p>
                        )}
                    </div>
                </div>

                <div className="bg-neutral-50 p-3 rounded-2xl border border-neutral-200/80 space-y-2">
                    <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">Or Paste Image Link</span>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="flex-1 px-3.5 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-brand-primary min-w-0"
                        />
                        <button
                            type="button"
                            onClick={addImageUrl}
                            className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0"
                        >
                            Add URL
                        </button>
                    </div>
                </div>

                {form.images.length === 0 ? (
                    <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-200 text-neutral-400 text-xs font-medium">
                        No images added yet. Upload from device or add a URL above.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 pt-2">
                        {form.images.map((url, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    'relative rounded-2xl overflow-hidden aspect-4/3 border-2 transition-all group bg-neutral-950',
                                    idx === 0 ? 'border-brand-primary ring-2 ring-brand-primary/20 shadow-md' : 'border-neutral-200'
                                )}
                            >
                                <img src={url} alt={`Property Photo ${idx + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">#{idx + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:bg-rose-700 transition-colors"
                                            title="Delete Photo"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    {idx !== 0 && (
                                        <button
                                            type="button"
                                            onClick={() => makeCover(idx)}
                                            className="w-full py-1 bg-white/90 hover:bg-white text-neutral-900 rounded-lg text-[10px] font-bold shadow-sm flex items-center justify-center gap-1"
                                        >
                                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span>Make Cover</span>
                                        </button>
                                    )}
                                </div>
                                {idx === 0 && (
                                    <span className="absolute bottom-2 left-2 bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-md font-bold shadow-md flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" />
                                        <span>Cover Photo</span>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 6. Amenities */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                {sectionHead('6', 'Features & Amenities')}
                <div className="flex flex-wrap gap-2">
                    {ALL_AMENITIES_OPTIONS.map((feature) => {
                        const isSelected = features.includes(feature)
                        return (
                            <button
                                type="button"
                                key={feature}
                                onClick={() => toggleFeature(feature)}
                                className={cn(
                                    'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all',
                                    isSelected
                                        ? 'bg-brand-primary text-white border-brand-primary'
                                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                                )}
                            >
                                <Check className={cn('w-3 h-3', isSelected ? 'opacity-100' : 'opacity-0')} />
                                <span>{feature}</span>
                            </button>
                        )
                    })}
                </div>
                {features.filter((f) => !ALL_AMENITIES_OPTIONS.includes(f)).length > 0 && (
                    <div className="space-y-2">
                        <p className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
                            Your Custom Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {features
                                .filter((f) => !ALL_AMENITIES_OPTIONS.includes(f))
                                .map((feature) => (
                                    <span
                                        key={feature}
                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-brand-primary text-white border border-brand-primary"
                                    >
                                        <Check className="w-3 h-3" />
                                        <span>{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => toggleFeature(feature)}
                                            className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center -mr-0.5 transition-colors"
                                            aria-label={`Remove ${feature}`}
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                        </div>
                    </div>
                )}
                <div className="flex gap-2 max-w-sm pt-1">
                    <input
                        type="text"
                        placeholder="Add custom feature..."
                        value={customFeature}
                        onChange={(e) => setCustomFeature(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 min-w-0"
                    />
                    <button
                        type="button"
                        onClick={addCustomFeature}
                        className="px-3 py-1.5 bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold hover:bg-neutral-300 shrink-0"
                    >
                        + Add
                    </button>
                </div>
            </div>

            {/* 7. Agent */}
            <div className="space-y-4 pt-4 border-t border-neutral-100">
                {sectionHead('7', 'Assigned Manager & WhatsApp Hotline')}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className={labelCls}>Manager Name</label>
                        <input
                            type="text"
                            value={form.agent.name}
                            onChange={(e) => set('agent', { ...form.agent, name: e.target.value })}
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Call Phone Number</label>
                        <input
                            type="tel"
                            value={form.agent.phone}
                            onChange={(e) => set('agent', { ...form.agent, phone: e.target.value })}
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls}>WhatsApp (digits only)</label>
                        <input
                            type="tel"
                            value={form.agent.whatsapp}
                            onChange={(e) => set('agent', { ...form.agent, whatsapp: e.target.value })}
                            className={inputCls}
                        />
                    </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-50 p-3 rounded-2xl border border-neutral-200">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-primary shrink-0 bg-neutral-200">
                        {form.agent.avatar ? (
                            <img src={form.agent.avatar} alt={form.agent.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 space-y-1">
                        <p className="text-xs font-bold text-neutral-800">Manager Profile Picture</p>
                        <p className="text-[11px] text-neutral-500">Upload portrait from device or paste image URL</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-3 py-1.5 bg-white border border-neutral-300 hover:border-neutral-400 rounded-xl text-xs font-bold text-neutral-800 transition-all flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Upload Photo</span>
                            <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="featured-check"
                        checked={form.featured}
                        onChange={(e) => set('featured', e.target.checked)}
                        className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                    />
                    <label htmlFor="featured-check" className="text-xs font-bold text-neutral-800 cursor-pointer">
                        Feature on Homepage Carousel &amp; Top Spot
                    </label>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-neutral-200 flex items-center justify-end gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 text-xs font-bold hover:bg-neutral-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingProperty ? 'Save & Update Property' : 'Publish Property Live'}</span>
                </button>
            </div>
        </form>
    )
}

export default AdminPropertyForm
