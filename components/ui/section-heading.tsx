import { cn } from '@/utils/cn'
import React from 'react'

interface SectionHeadingProps {
    kicker?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    dark?: boolean
    className?: string
    as?: 'h1' | 'h2' | 'h3'
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
    kicker,
    title,
    subtitle,
    align = 'center',
    dark = false,
    className,
    as: Tag = 'h2',
}) => {
    return (
        <div
            className={cn(
                'space-y-2',
                align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left',
                className
            )}
        >
            {kicker && (
                <span
                    className={cn(
                        'text-xs font-extrabold uppercase tracking-widest text-brand-accent'
                    )}
                >
                    {kicker}
                </span>
            )}
            <Tag
                className={cn(
                    'font-heading font-extrabold text-2xl sm:text-3xl',
                    dark ? 'text-white' : 'text-neutral-900'
                )}
            >
                {title}
            </Tag>
            {subtitle && (
                <p className={cn('text-xs sm:text-sm', dark ? 'text-neutral-400' : 'text-neutral-500')}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default SectionHeading
