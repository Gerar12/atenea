export const dynamic = 'force-static'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PaymentMethods from '@/components/PaymentMethods'
import PurchaseFAQ from '@/components/PurchaseFAQ'
import HouseModels from '@/components/HouseModels'
import HomeMap from '@/components/HomeMap'
import Amenities from '@/components/Amenities'
import Location from '@/components/Location'
import Gallery from '@/components/Gallery'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PaymentMethods />
      <PurchaseFAQ />
      <HouseModels />
      <HomeMap />
      <Amenities />
      <Location />
      <Gallery />
    </>
  )
}