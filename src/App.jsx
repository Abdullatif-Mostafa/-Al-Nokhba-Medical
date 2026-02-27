import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Stats from './sections/Stats'
import Doctors from './sections/Doctors'
import Testimonials from './sections/Testimonials'
import Booking from './sections/Booking'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ChatWidget from './sections/ChatWidget'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Doctors />
        <Testimonials />
        <Booking />
        <Contact />
        <ChatWidget/>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
