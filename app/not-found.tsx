import React from 'react'
import Link from 'next/link'
import { Home, Search, Phone, Compass } from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const NotFound = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="max-w-xl w-full bg-white rounded-3xl border border-neutral-200/90 shadow-2xl p-8 sm:p-12 text-center space-y-6">

                    {/* Visual 404 Badge */}
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-3xl bg-neutral-100 text-brand-primary flex items-center justify-center mx-auto shadow-inner">
                            <Compass className="w-12 h-12 text-brand-accent animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                        <span className="absolute -bottom-2 -right-2 px-2.5 py-1 bg-brand-primary text-white font-mono font-extrabold text-xs rounded-lg shadow-sm">
                            404
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-900">
                            Page Not Found
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
                            The page or property listing you are looking for may have been leased, moved, or is temporarily off-market.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            <span>Go to Homepage</span>
                        </Link>

                        <Link
                            href="/apartments"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            <span>Browse All Apartments</span>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-2 text-xs text-neutral-500">
                        <Link href="/apartments" className="hover:text-brand-primary font-semibold">
                            All Listings
                        </Link>
                        <Link href="/apartments?purpose=shortlet" className="hover:text-brand-primary font-semibold">
                            Shortlet Stays
                        </Link>
                        <Link href="/contact" className="hover:text-brand-primary font-semibold">
                            Contact Support
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound
