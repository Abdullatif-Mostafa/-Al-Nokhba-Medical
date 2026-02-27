import { PHONE_PRIMARY, PHONE_EMERGENCY, EMAIL, ADDRESS, WORKING_HOURS, WHATSAPP_NUMBER } from '../data'
import styles from './Contact.module.css'

const contactItems = [
  { icon: 'fas fa-phone', label: 'اتصل بنا', value: PHONE_PRIMARY, href: `tel:${PHONE_PRIMARY}` },
  { icon: 'fas fa-headset', label: 'خط الطوارئ 24/7', value: PHONE_EMERGENCY, href: `tel:${PHONE_EMERGENCY}` },
  { icon: 'fas fa-envelope', label: 'البريد الإلكتروني', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: 'fas fa-map-marker-alt', label: 'العنوان', value: ADDRESS, href: null },
  { icon: 'fas fa-clock', label: 'ساعات العمل', value: WORKING_HOURS, href: null },
]

const socials = [
  { cls: styles.fb, icon: 'fab fa-facebook-f', href: '#' },
  { cls: styles.ig, icon: 'fab fa-instagram', href: '#' },
  { cls: styles.tw, icon: 'fab fa-twitter', href: '#' },
  { cls: styles.wa, icon: 'fab fa-whatsapp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { cls: styles.yt, icon: 'fab fa-youtube', href: '#' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">تواصل معنا</div>
          <h2 className="section-title">نحن هنا <span>دائماً لمساعدتك</span></h2>
          <p className="section-desc">فريق الدعم لدينا متاح لك على مدار الساعة للإجابة على استفساراتك</p>
        </div>

        <div className={styles.grid}>
          <div className="reveal">
            <div className={styles.cards}>
              {contactItems.map(item => {
                const Tag = item.href ? 'a' : 'div'
                return (
                  <Tag key={item.label} href={item.href} className={styles.card} style={!item.href ? { cursor: 'default' } : {}}>
                    <div className={styles.cardIcon}><i className={item.icon} /></div>
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                  </Tag>
                )
              })}
            </div>
            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.icon} href={s.href} className={`${styles.social} ${s.cls}`} target="_blank" rel="noopener noreferrer">
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className={`${styles.mapWrap} reveal reveal-delay-2`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.8541!2d46.6754!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzE1LjciTiA0NsKwNDAnMzEuNyJF!5e0!3m2!1sar!2ssa!4v1234567890"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="موقع العيادة"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
