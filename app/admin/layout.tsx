import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import FloatingActions from '@/components/layout/floatingactions'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-full flex flex-col bg-[#f8fafc]">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <FloatingActions />
        </main>
    )
}

export default AdminLayout
