import Hero from '@/components/page/home/hero'
import Secondsection from '@/components/page/home/secondsection'
import FeaturedProperties from '@/components/page/home/featuredproperties'
import ExploreMap from '@/components/page/home/exploremap'
import Neighborhoods from '@/components/page/home/neighborhoods'
import WhyChoose from '@/components/page/home/whychoose'
import CTABanner from '@/components/page/home/ctabanner'
import React from 'react'

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
