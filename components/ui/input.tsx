'use client'
import { cn } from '@/utils/cn'
import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                'w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-brand-primary transition-colors',
                className
            )}
            {...props}
        />
    )
})

Input.displayName = 'Input'

export default Input
