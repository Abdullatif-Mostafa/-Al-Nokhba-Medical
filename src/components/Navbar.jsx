import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data'
import ThemeToggle from './ThemeToggle'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <div className={styles.logoIcon}>
            <i className="fas fa-heartbeat" />
          </div>
          <div className={styles.logoText}>
            <strong>عيادة النخبة</strong>
            <span>رعاية صحية متميزة</span>
          </div>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#booking" className={styles.cta} onClick={closeMenu}>
              <i className="fas fa-calendar-check" /> احجز موعدك
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="قائمة التنقل"
          >
            <span className={menuOpen ? styles.bar1Open : ''} />
            <span className={menuOpen ? styles.bar2Open : ''} />
            <span className={menuOpen ? styles.bar3Open : ''} />
          </button>
        </div>
      </div>
    </nav>
  )
}
