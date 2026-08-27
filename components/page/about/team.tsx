import React from 'react'
import Image from 'next/image'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'

const team = [
    {
        name: 'Tunde Banjoko',
        role: 'Founder & Managing Director',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Over 14 years pioneering prime residential developments and luxury shortlet hospitality across Nigeria.',
    },
    {
        name: 'Simisola Adeleke',
        role: 'Head of Acquisitions & Advisory',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        bio: 'Specialist in title vetting, Governors Consent verification, and high-yield real estate investments.',
    },
    {
        name: 'Emeka Nwosu',
        role: 'Client Concierge & Shortlet Lead',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: 'Ensuring seamless physical inspections, guest arrivals, and executive lifestyle management.',
    },
]

const Team = () => {
    return (
        <section className="pt-16 sm:pt-24">
            <Container>
                <SectionHeading
                    kicker="Leadership Team"
                    title="Meet the Real Estate Executives"
                    subtitle="Passionate industry professionals committed to delivering unmatched real estate advisory across Nigeria."
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 space-y-2">
                                <h3 className="font-heading font-bold text-lg text-neutral-900">
                                    {member.name}
                                </h3>
                                <p className="text-xs font-semibold text-brand-primary">
                                    {member.role}
                                </p>
                                <p className="text-xs text-neutral-500 leading-relaxed pt-2 border-t border-neutral-100">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default Team
