import React from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import Container from '@/components/ui/container'

export interface CTAButton {
    label: string
    href: string
    icon?: React.ReactNode
    external?: boolean
}

interface CTASectionProps {
    kicker?: string
    title: string
    subtitle?: string
    variant?: 'brand' | 'dark'
    primaryAction: CTAButton
    secondaryAction?: CTAButton
    className?: string
}

const CTASection: React.FC<CTASectionProps> = ({
    kicker,
    title,
    subtitle,
    variant = 'brand',
    primaryAction,
    secondaryAction,
    className,
}) => {
    const isDark = variant === 'dark'

    return (
        <section className={cn('py-16 sm:py-24', className)}>
            <Container>
                <div
                    className={cn(
                        'rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8',
                        isDark ? 'bg-neutral-950' : 'bg-brand-primary'
                    )}
                >
                    <div className={cn('absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl', isDark ? 'bg-white/5' : 'bg-white/10')} />
                    <div className={cn('absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl', isDark ? 'bg-white/5' : 'bg-white/10')} />

                    <div className="max-w-xl space-y-3 relative z-10 text-center md:text-left">
                        {kicker && (
                            <span
                                className={cn(
                                    'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block border',
                                    isDark
                                        ? 'bg-white/15 text-white border-white/20'
                                        : 'bg-white/10 text-white border-white/10'
                                )}
                            >
                                {kicker}
                            </span>
                        )}
                        <h2 className={cn('font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight')}>
                            {title}
                        </h2>
                        {subtitle && (
                            <p className={cn('text-xs sm:text-sm leading-relaxed', isDark ? 'text-neutral-400' : 'text-emerald-100')}>
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto">
                        {primaryAction.external ? (
                            <a
                                href={primaryAction.href}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className={cn(
                                    'w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2',
                                    isDark
                                        ? 'bg-brand-primary text-white hover:opacity-90'
                                        : 'bg-white text-brand-primary hover:bg-neutral-100'
                                )}
                            >
                                {primaryAction.icon}
                                <span>{primaryAction.label}</span>
                            </a>
                        ) : (
                            <Link
                                href={primaryAction.href}
                                className={cn(
                                    'w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2',
                                    isDark
                                        ? 'bg-brand-primary text-white hover:opacity-90'
                                        : 'bg-white text-brand-primary hover:bg-neutral-100'
                                )}
                            >
                                {primaryAction.icon}
                                <span>{primaryAction.label}</span>
                            </Link>
                        )}

                        {secondaryAction && (
                            <Link
                                href={secondaryAction.href}
                                className={cn(
                                    'w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 border border-white/20',
                                    isDark
                                        ? 'bg-white/10 hover:bg-white/20 text-white font-semibold'
                                        : 'bg-neutral-900/80 hover:bg-neutral-900 text-white'
                                )}
                            >
                                {secondaryAction.icon}
                                <span>{secondaryAction.label}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default CTASection
