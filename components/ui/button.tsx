'use client'
import { cn } from '@/utils/cn'
import { useRouter } from 'next/navigation'
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: "primary" | 'secondary'
    href? : string
}
const Button: React.FC<ButtonProps> = ({ className, variant, href, onClick, ...props }) => {

    const router = useRouter()
    return (
        <button className={cn('px-6 py-3.5 rounded-xl text-white  text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer',
            variant === "primary" && "bg-brand-primary hover:bg-brand-primary-hover shadow-lg shadow-emerald-900/40 hover:shadow-xl",
            variant === "secondary" && " bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md border", className)}
            onClick={(e) => {
                if (href) {
                    router.push(href)
                }
                onClick?.(e)
            }}
            {...props}
        />
    )
}

export default Button