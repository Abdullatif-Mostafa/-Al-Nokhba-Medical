import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}><i className="fas fa-heartbeat" /></div>
              <div>
                <strong>عيادة النخبة الطبية</strong>
                <span>رعاية صحية متميزة</span>
              </div>
            </div>
            <p>نقدم أفضل رعاية طبية متكاملة بأيدي نخبة من الأطباء المتخصصين وبأحدث التقنيات الطبية.</p>
            <div className={styles.socials}>
              <a href="#" className={`${styles.social} ${styles.fb}`}><i className="fab fa-facebook-f" /></a>
              <a href="#" className={`${styles.social} ${styles.ig}`}><i className="fab fa-instagram" /></a>
              <a href="https://wa.me/966500000000" className={`${styles.social} ${styles.wa}`}><i className="fab fa-whatsapp" /></a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>روابط سريعة</h4>
            <ul>
              {['#home:الرئيسية','#services:خدماتنا','#doctors:أطباؤنا','#booking:احجز موعد','#contact:تواصل معنا'].map(item => {
                const [href, label] = item.split(':')
                return <li key={href}><a href={href}>{label}</a></li>
              })}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>تخصصاتنا</h4>
            <ul>
              {['أمراض القلب','طب الأعصاب','جراحة العظام','طب الأطفال','طب العيون','طب الأسنان'].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>معلومات</h4>
            <ul>
              {['سياسة الخصوصية','الشروط والأحكام','برنامج الولاء','وظائف','الأخبار الطبية'].map(s => (
                <li key={s}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 عيادة النخبة الطبية. جميع الحقوق محفوظة.</span>
          <span>صُمِّم بـ <i className="fas fa-heart" style={{color:'#e91e63'}} /> لصحتك</span>
        </div>
      </div>
    </footer>
  )
}
