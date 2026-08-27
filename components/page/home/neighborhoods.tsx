import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Compass } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'

const neighborhoods = [
    {
        name: 'Ikoyi',
        count: 42,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        description: 'Diplomatic enclave, upscale waterfront residences & colonial charm.',
    },
    {
        name: 'Lekki Phase 1',
        count: 58,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        description: 'Vibrant lifestyle hub with modern duplexes, cafes & nightlife.',
    },
    {
        name: 'Victoria Island',
        count: 36,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        description: 'Financial metropolis and high-rise luxury towers overlooking the Atlantic.',
    },
    {
        name: 'Eko Atlantic',
        count: 24,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        description: 'The future of coastal African luxury with world-class infrastructure.',
    },
]

const Neighborhoods = () => {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <SectionHeading
                    kicker="Prime Enclaves"
                    title="Explore Prime Lagos Neighborhoods"
                    subtitle="From serene waterfronts to vibrant urban corridors, find the exact neighborhood suited to your lifestyle."
                    className="mb-10"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {neighborhoods.map((nh) => (
                        <Link
                            key={nh.name}
                            href="/apartments"
                            className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md cursor-pointer border border-neutral-200 block"
                        >
                            <Image
                                src={nh.image}
                                alt={nh.name}
                                fill
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                            <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                                <div className="self-end">
                                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold">
                                        {nh.count} Properties
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-brand-accent transition-colors flex items-center justify-between">
                                        <span>{nh.name}</span>
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </h3>
                                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                                        {nh.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Neighborhoods
