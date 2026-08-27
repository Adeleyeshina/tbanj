import Hero from '@/components/page/home/hero'
import Secondsection from '@/components/page/home/secondsection'
import FeaturedProperties from '@/components/page/home/featuredproperties'
import ExploreMap from '@/components/page/home/exploremap'
import Neighborhoods from '@/components/page/home/neighborhoods'
import WhyChoose from '@/components/page/home/whychoose'
import CTABanner from '@/components/page/home/ctabanner'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tbanj Apartment | Luxury Real Estate & Shortlets in Nigeria',
    description:
        'Discover premium apartments, duplexes, penthouses, and shortlets across Lagos, Ibadan, Abuja and beyond with Tbanj Apartment.',
}

const Home = () => {
  return (
    <>
      <Hero />
      <Secondsection />
      <FeaturedProperties />
      <ExploreMap />
      <Neighborhoods />
      <WhyChoose />
      <CTABanner />
    </>
  )
}

export default Home
