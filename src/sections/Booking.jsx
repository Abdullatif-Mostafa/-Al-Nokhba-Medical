import { useState } from 'react'
import { WHATSAPP_NUMBER, PHONE_PRIMARY, DOCTORS, SERVICES } from '../data'
import styles from './Booking.module.css'

const today = new Date().toISOString().split('T')[0]

export default function Booking() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', doctor: '', notes: '' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const { name, phone, service, date, doctor, notes } = form
    if (!name || !phone || !service || !date) { alert('يرجى ملء جميع الحقول المطلوبة'); return }
    const msg =
      `مرحباً، أريد حجز موعد 🏥\n\n` +
      `👤 الاسم: ${name}\n` +
      `📱 الهاتف: ${phone}\n` +
      `🩺 التخصص: ${service}\n` +
      `📅 التاريخ: ${date}\n` +
      (doctor ? `👨‍⚕️ الطبيب المفضل: ${doctor}\n` : '') +
      (notes ? `📝 ملاحظات: ${notes}\n` : '') +
      `\nشكراً لكم ✨`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section id="booking">
      <div className="container">
        <div className={styles.inner}>
          {/* Info */}
          <div className="reveal">
            <div className="section-label" style={{ textAlign: 'right' }}>احجز موعدك</div>
            <h2 className={styles.infoTitle}>احجز موعدك الآن<br /><span>بخطوات بسيطة</span></h2>
            <p className={styles.infoDesc}>اختر طبيبك المناسب واحجز موعدك بكل سهولة. سيتواصل معك فريقنا عبر الواتساب لتأكيد الموعد.</p>

            {[
              { icon: 'fas fa-clock', title: 'مواعيد مرنة', sub: 'من السبت إلى الخميس | 8 صباحاً – 10 مساءً' },
              { icon: 'fab fa-whatsapp', title: 'تأكيد فوري عبر واتساب', sub: 'ستصلك رسالة تأكيد خلال دقائق' },
              { icon: 'fas fa-undo', title: 'إلغاء مجاني', sub: 'يمكنك إلغاء موعدك مجاناً قبل 24 ساعة' },
              { icon: 'fas fa-shield-alt', title: 'بياناتك آمنة ومحمية', sub: 'نلتزم بأعلى معايير حماية الخصوصية' },
            ].map(f => (
              <div key={f.title} className={styles.feature}>
                <div className={styles.featureIcon}><i className={f.icon} /></div>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}

            <a href={`tel:${PHONE_PRIMARY}`} className="btn-secondary" style={{ marginTop: '1.5rem' }}>
              <i className="fas fa-phone" /> اتصل مباشرة: {PHONE_PRIMARY}
            </a>
          </div>

          {/* Form */}
          <div className={`${styles.formWrap} reveal reveal-delay-2`}>
            <div className={styles.formTitle}>
              <span><i className="fas fa-calendar-check" /></span>
              نموذج الحجز
            </div>
            <form onSubmit={submit}>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>الاسم الكامل *</label>
                  <input className={styles.input} placeholder="أدخل اسمك الكامل" value={form.name} onChange={set('name')} required />
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>رقم الهاتف *</label>
                  <input className={styles.input} placeholder="05xxxxxxxx" type="tel" value={form.phone} onChange={set('phone')} required />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>التخصص المطلوب *</label>
                  <select className={styles.input} value={form.service} onChange={set('service')} required>
                    <option value="">اختر التخصص</option>
                    {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>التاريخ المفضل *</label>
                  <input className={styles.input} type="date" min={today} value={form.date} onChange={set('date')} required />
                </div>
              </div>
              <div className={styles.group}>
                <label className={styles.label}>الطبيب المفضل</label>
                <select className={styles.input} value={form.doctor} onChange={set('doctor')}>
                  <option value="">أي طبيب متاح</option>
                  {DOCTORS.map(d => <option key={d.id}>{d.name} - {d.specialty}</option>)}
                </select>
              </div>
              <div className={styles.group}>
                <label className={styles.label}>ملاحظات إضافية</label>
                <textarea className={styles.input} rows={3} placeholder="أي معلومات إضافية..." value={form.notes} onChange={set('notes')} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className={styles.submitBtn}>
                <i className="fab fa-whatsapp" style={{ fontSize: 22 }} />
                احجز عبر واتساب
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
