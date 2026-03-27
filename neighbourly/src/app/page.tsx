import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturedQuests } from "@/components/featured-quests"
import { HowItWorks } from "@/components/how-it-works"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen grid-bg relative">
      <div className="scanlines" />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedQuests />
        <HowItWorks />
        <Categories />
      </main>
      <Footer />
    </div>
  )
}