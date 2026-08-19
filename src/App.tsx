import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Technology } from './components/Technology/Technology'
import { Capabilities } from './components/Capabilities/Capabilities'
import { ScrollStory } from './components/ScrollStory/ScrollStory'
import { Impact } from './components/Impact/Impact'
import { Research } from './components/Research/Research'
import { CTA } from './components/CTA/CTA'
import { Footer } from './components/Footer/Footer'
import { CustomCursor } from './components/CustomCursor/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress'

export default function App() {
  return (
    <div className="grain">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technology />
        <Capabilities />
        <ScrollStory />
        <Impact />
        <Research />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
