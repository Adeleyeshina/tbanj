import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import FloatingActions from '@/components/layout/floatingactions'
import React from 'react'

const MainLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='min-h-full flex flex-col'>
        <Navbar />
        {children}
        <Footer />
        <FloatingActions />
    </main>
  )
}

export default MainLayout