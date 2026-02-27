import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

function useCounter(ref, target) {
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
          el.textContent = Math.floor(start).toLocaleString('ar-SA')
          if (start >= target) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])
}

function StatNum({ target }) {
  const ref = useRef(null)
  useCounter(ref, target)
  return <span ref={ref}>0</span>
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.shapes}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
      </div>

      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            متاح الآن • خدمة 24/7 • عيادات متعددة
          </div>

          <h1 className={styles.title}>
            صحتك <span className={styles.highlight}>أولويتنا</span><br />
            رعاية طبية بمعايير عالمية
          </h1>

          <p className={styles.desc}>
            نقدم لك أفضل الخدمات الطبية المتخصصة على يد نخبة من أمهر الأطباء والمتخصصين، مع تقنيات حديثة وبيئة علاجية متميزة تضمن راحتك وسلامتك.
          </p>

          <div className={styles.actions}>
            <a href="#booking" className="btn-primary">
              <i className="fas fa-calendar-check" /> احجز موعدك الآن
            </a>
            <a href="tel:+966500000000" className="btn-secondary">
              <i className="fas fa-phone" /> اتصل بنا
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}><StatNum target={15000} />+</div>
              <div className={styles.statLbl}>مريض راضٍ</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <div className={styles.statNum}><StatNum target={20} /></div>
              <div className={styles.statLbl}>سنة خبرة</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.stat}>
              <div className={styles.statNum}><StatNum target={98} />%</div>
              <div className={styles.statLbl}>معدل رضا</div>
            </div>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.imageMain}>
            <i className={`fas fa-user-md ${styles.imageIcon}`} />
          </div>
          <div className={styles.overlay}>
            <div className={styles.overlayIcon}><i className="fas fa-shield-alt" /></div>
            <div>
              <strong>معتمدون دولياً</strong>
              <span>JCI & ISO 9001</span>
            </div>
          </div>
          <div className={styles.badge2}>
            <div className={styles.stars}>★★★★★</div>
            <strong>4.9</strong>
            <span>تقييم المرضى</span>
          </div>
        </div>
      </div>
    </section>
  )
}
