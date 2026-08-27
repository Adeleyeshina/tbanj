import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import Badge from '@/components/ui/badge'

interface PageHeroProps {
    kicker?: string
    title: React.ReactNode
    subtitle?: string
    image?: string
    kickerIcon?: React.ReactNode
    align?: 'center' | 'left'
    className?: string
}

const PageHero: React.FC<PageHeroProps> = ({
    kicker,
    title,
    subtitle,
    image,
    kickerIcon,
    align = 'center',
    className,
}) => {
    return (
        <section className={cn('relative bg-neutral-900 text-white py-20 sm:py-24 overflow-hidden', className)}>
            {image && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60" />
                </div>
            )}

            <div
                className={cn(
                    'relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6',
                    align === 'center' ? 'text-center' : 'text-left'
                )}
            >
                {kicker && (
                    <Badge variant="dark" className="px-3.5 py-1.5 text-xs font-semibold">
                        {kickerIcon && <>{kickerIcon}</>}
                        {kicker}
                    </Badge>
                )}
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className={cn('text-sm sm:text-base text-neutral-300 leading-relaxed', align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl')}>
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    )
}

export default PageHero
