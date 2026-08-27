'use client'
import Link from 'next/link';
import { Building2, Heart, Calendar, Menu, X, ShieldCheck, } from 'lucide-react';
import { navLinks } from './data';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MobileNav from './mobilenav';


const Navbar = () => {
    const pathName = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

    const handleBookClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <Link
                        href="/"
                        id="navbar-brand-logo"
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-11 h-11 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900 leading-none">
                                TBANJ <span className="text-brand-accent">APARTMENT</span>
                            </span>
                            <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-500 mt-1">
                                Luxury Stays & Real Estate
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map(({ name, href }) => {
                            const isActive = pathName === href
                            return (
                                <Link
                                    key={name}
                                    href={href}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${isActive
                                            ? 'text-brand-primary bg-brand-primary-light font-bold'
                                            : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                                        }`}
                                >
                                    {name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-primary rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden sm:flex items-center space-x-3">

                        <button
                            onClick={() => handleBookClick}
                            className="px-5 py-2.5 rounded-xl bg-brand-primary bg-brand-primary-hover text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Book Inspection</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-2 lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>


                </div>
            </div>
            <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </header>
    );
};

export default Navbar