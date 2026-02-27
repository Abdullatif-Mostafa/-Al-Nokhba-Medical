import { useState, useEffect, useRef } from 'react'
import { TESTIMONIALS } from '../data'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(3)
  const timerRef = useRef(null)

  useEffect(() => {
    const update = () => setVisible(window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const max = TESTIMONIALS.length - visible

  const go = (n) => setCurrent(Math.max(0, Math.min(n, max)))

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => c < max ? c + 1 : 0), 5000)
    return () => clearInterval(timerRef.current)
  }, [max])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => { timerRef.current = setInterval(() => setCurrent(c => c < max ? c + 1 : 0), 5000) }

  const cardWidth = 100 / visible

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">آراء مرضانا</div>
          <h2 className="section-title">ماذا يقول <span>مرضانا عنا</span></h2>
          <p className="section-desc">آراء حقيقية من مرضى حقيقيين يشاركون تجربتهم مع عيادة النخبة</p>
        </div>

        <div className={`${styles.track} reveal`} onMouseEnter={pause} onMouseLeave={resume}>
          <div
            className={styles.slider}
            style={{ transform: `translateX(${current * cardWidth}%)` }}
          >
            {TESTIMONIALS.map(t => (
              <div
                key={t.id}
                className={styles.card}
                style={{ minWidth: `calc(${cardWidth}% - 1rem)` }}
              >
                <div className={styles.quote}>"</div>
                <p className={styles.text}>{t.text}</p>
                <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
                <div className={styles.author}>
                  <div className={styles.avatar} style={{ background: t.avatarGradient }}>
                    <i className="fas fa-user" />
                  </div>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.role}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={() => go(current - 1)}>
            <i className="fas fa-chevron-right" />
          </button>
          <div className={styles.dots}>
            {Array.from({ length: max + 1 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button className={styles.navBtn} onClick={() => go(current + 1)}>
            <i className="fas fa-chevron-left" />
          </button>
        </div>
      </div>
    </section>
  )
}
