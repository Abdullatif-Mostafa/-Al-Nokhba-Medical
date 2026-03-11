import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

// الموقع الأصلي
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

// لوحة التحكم
import Login from './sections/Login'
import Dashboard from './sections/Dashboard'

// ===== الموقع الأصلي =====
function MainSite() {
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
        <ChatWidget />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

// ===== حماية صفحة الـ Dashboard =====
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/admin/login" replace />
}

// ===== الـ Routes =====
function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      {/* الموقع الأصلي */}
      <Route path="/" element={<MainSite />} />

      {/* لوحة التحكم */}
      <Route
        path="/admin/login"
        element={user ? <Navigate to="/admin/dashboard" replace /> : <Login />}
      />
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* أي رابط تاني → الموقع */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// ===== App الرئيسي =====
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
