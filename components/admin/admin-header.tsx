'use client'
import Link from 'next/link'
import { Building2, Home, LogOut } from 'lucide-react'

interface AdminHeaderProps {
    onLogout: () => void
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center shadow-md shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-heading font-extrabold text-lg sm:text-2xl text-neutral-900">
                            Tbanj Apartment Admin Console
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap">
                            Live Backend Mode
                        </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                        Manage properties, rich text descriptions, client inquiries &amp; global color branding
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
                <Link
                    href="/"
                    className="px-3.5 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                >
                    <Home className="w-4 h-4" />
                    <span>View Website</span>
                </Link>

                <button
                    onClick={onLogout}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminHeader
