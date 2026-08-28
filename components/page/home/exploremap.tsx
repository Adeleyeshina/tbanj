import React from 'react'
import Link from 'next/link'
import { Compass, MapPin } from 'lucide-react'
import Container from '@/components/ui/container'

const ExploreMap = () => {
    return (
        <section className="py-0">
            <Container>
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/40 border border-brand-primary/60 text-xs font-semibold text-brand-accent mb-2">
                                <Compass className="w-3.5 h-3.5" />
                                <span>Geographic Exploration</span>
                            </div>
                            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                                Explore Lagos Properties on Interactive Map
                            </h2>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
                                Pinpoint apartments across Ikoyi, Lekki Phase 1, Victoria Island, and Eko Atlantic. Click any price pin to view details or trigger a direct WhatsApp chat.
                            </p>
                        </div>

                        <Link
                            href="/apartments"
                            className="px-5 py-2.5 rounded-xl bg-brand-accent text-neutral-950 font-bold text-xs hover:brightness-95 transition-colors shrink-0 self-start md:self-auto"
                        >
                            Open Full Apartment Explorer
                        </Link>
                    </div>

                    <div className="relative h-55 sm:h-105 rounded-2xl overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.25),transparent_60%)] bg-neutral-800" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <div className="w-16 h-16 rounded-2xl bg-brand-primary/30 border border-brand-primary/50 flex items-center justify-center mb-4">
                                <MapPin className="w-8 h-8 text-brand-accent" />
                            </div>
                            <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-200">
                                Interactive map coming soon
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md">
                                Pinpoint neighborhoods and browse live pricing across prime Lagos locations once our property database is live.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ExploreMap
