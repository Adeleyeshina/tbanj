import React from 'react'
import Container from '@/components/ui/container'

export interface LegalSection {
    title: string
    body: string
}

interface LegalPageProps {
    sections: LegalSection[]
}

const LegalPageContent: React.FC<LegalPageProps> = ({ sections }) => {
    return (
        <Container>
            <div className="space-y-8">
                {sections.map((section, index) => (
                    <div key={section.title} className="space-y-2">
                        <div className="flex items-start gap-3">
                            <span className="text-brand-accent font-heading font-extrabold text-sm mt-0.5 shrink-0">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h2 className="font-heading font-bold text-lg text-neutral-900">
                                {section.title}
                            </h2>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">{section.body}</p>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default LegalPageContent
