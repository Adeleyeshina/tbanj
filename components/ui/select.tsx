'use client'
import { cn } from '@/utils/cn'
import React, { SelectHTMLAttributes } from 'react'
import { LucideIcon } from 'lucide-react'

interface Option {
    value: string
    label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[]
    className?: string
    icon?: LucideIcon
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>((
    { options, className, icon: Icon, ...props },
    ref
) => {
    return (
        <div className="relative">
            {Icon && (
                <Icon className="w-4 h-4 text-brand-accent absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            <select
                ref={ref}
                className={cn(
                    'w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none focus:border-brand-primary transition-colors',
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
})

Select.displayName = 'Select'

export default Select
