import { SERVICES } from '../data'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">خدماتنا الطبية</div>
          <h2 className="section-title">تخصصات <span>شاملة ومتكاملة</span></h2>
          <p className="section-desc">نوفر طيفاً واسعاً من التخصصات الطبية تحت سقف واحد، لضمان رعاية صحية متكاملة لك ولعائلتك</p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <div key={s.id} className={`${styles.card} reveal reveal-delay-${(i % 3) + 1}`}>
              <div className={styles.icon}><i className={s.icon} /></div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <div className={styles.priceRow}>
                <div>
                  <div className={styles.priceLabel}>الكشف من</div>
                  <div className={styles.price}>{s.price} ريال</div>
                </div>
                <a href="#booking" className={styles.link}>
                  احجز <i className="fas fa-arrow-left" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
