import { useEffect, useRef } from 'react'
import { STATS } from '../data'
import styles from './Stats.module.css'

function CounterNum({ target, suffix }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        let start = 0
        const step = target / (2000 / 16)
        const timer = setInterval(() => {
          start = Math.min(start + step, target)
          el.textContent = Math.floor(start).toLocaleString('ar-SA') + suffix
          if (start >= target) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])
  return <span ref={ref}>0</span>
}

export default function Stats() {
  return (
    <section id="stats" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <div key={i} className={`${styles.card} reveal reveal-delay-${i + 1}`}>
              <div className={styles.icon}><i className={s.icon} /></div>
              <div className={styles.num}>
                <CounterNum target={s.value} suffix={s.suffix} />
              </div>
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
