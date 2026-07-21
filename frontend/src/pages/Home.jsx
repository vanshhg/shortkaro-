import { Navbar } from '../components/Navbar.jsx'
import { Hero } from '../components/Hero.jsx'
import { URLShortenerForm } from '../components/URLShortenerForm.jsx'
import { LinkAnalyticsCard } from '../components/LinkAnalyticsCard.jsx'
import { Footer } from '../components/Footer.jsx'

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <URLShortenerForm />
        <LinkAnalyticsCard />
      </main>
      <Footer />
    </div>
  )
}
