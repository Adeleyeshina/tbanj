'use client'

import Link from "next/link";
import { navLinks } from "./data";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import React from "react";
import { MobileNavProps } from "./type";

const MobileNav: React.FC<MobileNavProps> = ({ isOpen }) => {
    if (!isOpen) return null

    const pathName = usePathname()
    return (
        <nav className="lg:hidden absolute left-0 right-0 top-full z-50 bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
                {navLinks.map(({ name, href }) => {
                    const isActive = pathName === href;
                    return (
                        <Link
                            key={name}
                            href={href}
                            className={`px-4 py-3 rounded-xl text-left text-base font-semibold flex items-center justify-between ${isActive
                                    ? 'bg-brand-primary-light text-brand-primary font-bold'
                                    : 'text-neutral-700 hover:bg-neutral-50'
                                }`}
                        >
                            {name}
                            {isActive && <span className="w-2 h-2 rounded-full bg-brand-primary" />}
                        </Link>
                    );
                })}
            </div>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
                <button
                    //onClick={() => handleNavClick('contact')}
                    className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-center flex items-center justify-center gap-2 shadow-md"
                >
                    <Calendar className="w-4 h-4" />
                    <span>Book Inspection</span>
                </button>

            </div>
        </nav>
    )
}
export default MobileNav