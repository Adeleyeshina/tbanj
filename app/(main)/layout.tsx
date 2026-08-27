import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import React from 'react'

const MainLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <main className='min-h-full flex flex-col'>
        <Navbar />
        {children}
        <Footer />
    </main>
  )
}

export default MainLayout