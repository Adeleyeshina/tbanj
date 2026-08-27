import CountUp from '@/components/ui/countup'
import React from 'react'

const Secondsection = () => {
  return (
    <section className="max-w-7xl xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200/90 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          <div className="pt-3 md:pt-0">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-primary">
              <CountUp end={100} suffix="%" />
            </p>
            <p className="text-xs font-semibold text-neutral-600 mt-1">Verified Property Titles</p>
          </div>
          <div className="pt-3 md:pt-0">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-primary">
              <CountUp end={500} suffix="+" />
            </p>
            <p className="text-xs font-semibold text-neutral-600 mt-1">Properties Across Nigeria</p>
          </div>
          <div className="pt-3 md:pt-0">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-primary">
              <CountUp end={15} suffix=" mins" />
            </p>
            <p className="text-xs font-semibold text-neutral-600 mt-1">Average WhatsApp Response</p>
          </div>
          <div className="pt-3 md:pt-0">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-primary">
              <CountUp end={4.9} decimals={1} suffix=" ★" />
            </p>
            <p className="text-xs font-semibold text-neutral-600 mt-1">Client Satisfaction Rating</p>
          </div>
        </div>
      </section>
  )
}

export default Secondsection