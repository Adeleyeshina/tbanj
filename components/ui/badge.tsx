import { cn } from '@/utils/cn'
import React from 'react'

interface BadgeProps {
    children: React.ReactNode
    className?: string
    variant?: 'accent' | 'light' | 'dark'
}

const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'accent' }) => {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 px-3 text-[11px] font-bold uppercase tracking-wider rounded',
                variant === 'accent' && 'text-brand-accent',
                variant === 'light' && 'text-brand-primary bg-brand-primary-light',
                variant === 'dark' && 'bg-white/10 backdrop-blur-md border border-white/20 text-brand-accent',
                className
            )}
        >
            {children}
        </span>
    )
}

export default Badge
