import { DOCTORS, WHATSAPP_NUMBER } from '../data'
import styles from './Doctors.module.css'

function bookDoctor(name) {
  const msg = `مرحباً، أريد حجز موعد مع ${name} 👨‍⚕️\n\nأرجو التواصل معي لتحديد الموعد المناسب. شكراً 🙏`
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
}

export default function Doctors() {
  return (
    <section id="doctors">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">فريقنا الطبي</div>
          <h2 className="section-title">نخبة من <span>أمهر الأطباء</span></h2>
          <p className="section-desc">يضم فريقنا الطبي أطباء حاصلين على أعلى الشهادات من أفضل الجامعات العالمية</p>
        </div>

        <div className={styles.grid}>
          {DOCTORS.map((doc, i) => (
            <div key={doc.id} className={`${styles.card} reveal reveal-delay-${i + 1}`}>
              <div className={styles.imgWrap} style={{ background: doc.bgGradient }}>
                <div className={styles.avatar} style={{ background: doc.avatarGradient }}>
                  <i className="fas fa-user-md" />
                </div>
                {doc.available && (
                  <div className={styles.badge} style={{ background: doc.badgeColor }}>متاح</div>
                )}
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{doc.name}</h3>
                <p className={styles.spec}>{doc.specialty}</p>
                <div className={styles.stars}>
                  {'★'.repeat(doc.rating)}{'☆'.repeat(5 - doc.rating)}
                </div>
                <div className={styles.meta}>
                  <span><i className="fas fa-graduation-cap" /> {doc.university}</span>
                  <span><i className="fas fa-clock" /> {doc.experience} خبرة</span>
                </div>
                <button className={styles.btn} onClick={() => bookDoctor(doc.name)}>
                  <i className="fab fa-whatsapp" /> احجز مع الدكتور
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
