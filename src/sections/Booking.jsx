import { useState } from 'react'
import { WHATSAPP_NUMBER, PHONE_PRIMARY, DOCTORS, SERVICES } from '../data'
import styles from './Booking.module.css'

const today = new Date().toISOString().split('T')[0]

// ✅ ضع هنا بيانات Supabase بتاعتك
const SUPABASE_URL = 'https://uzozzcrpyqhxzuszwwlv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6b3p6Y3JweXFoeHp1c3p3d2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTYwNjMsImV4cCI6MjA4Nzc3MjA2M30.pr1cNwJ4HxAbIU9sdsnTLHLqLP0mzNoh4JsZrlZtaOo'

async function saveBookingToSupabase(data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function Booking() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', date: '', doctor: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  // ===== حجز عبر واتساب =====
  const submitWhatsapp = (e) => {
    e.preventDefault()
    const { name, phone, service, date, doctor, notes } = form
    if (!name || !phone || !service || !date) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      return
    }
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
  // ===== حجز مباشر → Supabase =====
  const submitDirect = async (e) => {
    e.preventDefault()
    setError('')
    const { name, phone, service, date } = form
    if (!name || !phone || !service || !date) {
      setError('يرجى ملء الحقول المطلوبة: الاسم، الهاتف، التخصص، التاريخ')
      return
    }
    setLoading(true)
    try {
      await saveBookingToSupabase({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        specialty: form.service,
        doctor: form.doctor || null,
        date: form.date,
        time: null,
        notes: form.notes || null,
        status: 'pending',
      })
      setSuccess(true)
      setForm({ name: '', phone: '', email: '', service: '', date: '', doctor: '', notes: '' })
    } catch (err) {
      setError('حدث خطأ أثناء الحجز، يرجى المحاولة مرة أخرى أو التواصل عبر واتساب')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking">
      <div className="container">
        <div className={styles.inner}>

          {/* Info */}
          <div className="reveal">
            <div className="section-label" style={{ textAlign: 'right' }}>احجز موعدك</div>
            <h2 className={styles.infoTitle}>
              احجز موعدك الآن<br /><span>بخطوات بسيطة</span>
            </h2>
            <p className={styles.infoDesc}>
              اختر طبيبك المناسب واحجز موعدك بكل سهولة. سيتواصل معك فريقنا لتأكيد الموعد.
            </p>

            {[
              { icon: 'fas fa-clock', title: 'مواعيد مرنة', sub: 'من السبت إلى الخميس | 8 صباحاً – 10 مساءً' },
              { icon: 'fas fa-check-circle', title: 'تأكيد سريع', sub: 'سيتواصل معك فريقنا خلال دقائق' },
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

            {/* نجاح الحجز */}
            {success && (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✅</div>
                <h3>تم استلام طلب حجزك بنجاح!</h3>
                <p>سيتواصل معك فريقنا قريباً لتأكيد الموعد.</p>
                <button className={styles.resetBtn} onClick={() => setSuccess(false)}>
                  حجز موعد آخر
                </button>
              </div>
            )}

            {!success && (
              <form onSubmit={submitDirect}>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label className={styles.label}>الاسم الكامل *</label>
                    <input className={styles.input} placeholder="أدخل اسمك الكامل" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className={styles.group}>
                    <label className={styles.label}>رقم الهاتف *</label>
                    <input className={styles.input} placeholder="01xxxxxxxxxxxx" type="tel" value={form.phone} onChange={set('phone')} required />
                  </div>
                </div>

                <div className={styles.group}>
                  <label className={styles.label}>البريد الإلكتروني</label>
                  <input className={styles.input} placeholder="example@email.com" type="email" value={form.email} onChange={set('email')} />
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

                {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

                {/* زرّان */}
                <div className={styles.btnsRow}>
                  <button type="submit" className={styles.submitBtnDirect} disabled={loading}>
                    {loading
                      ? <><span className={styles.spinner} /> جاري الحجز...</>
                      : <><i className="fas fa-calendar-check" /> احجز مباشرة</>
                    }
                  </button>

                  <button type="button" className={styles.submitBtn} onClick={submitWhatsapp}>
                    <i className="fab fa-whatsapp" style={{ fontSize: 20 }} />
                    واتساب
                  </button>
                </div>

                <p className={styles.hint}>
                  <i className="fas fa-info-circle" /> الحجز المباشر يُسجَّل فوراً في نظامنا وسيتواصل معك فريقنا للتأكيد
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
