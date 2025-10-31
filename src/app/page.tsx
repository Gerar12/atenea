import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PaymentMethods from '@/components/PaymentMethods'
import ConstructionRegime from '@/components/ConstructionRegime'
import HouseModels from '@/components/HouseModels'
import HomeMap from '@/components/HomeMap'
import Location from '@/components/Location'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PaymentMethods />
      <ConstructionRegime />
      <HouseModels />
      <HomeMap />
      <Location />
    </>
  )
}