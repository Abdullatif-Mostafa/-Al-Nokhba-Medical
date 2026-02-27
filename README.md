# عيادة النخبة الطبية — React + Vite

موقع عيادة طبية احترافي مبني بـ React 18 + Vite 5 مع CSS Modules.

## 🚀 تشغيل المشروع

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev

# 3. بناء للإنتاج
npm run build

# 4. معاينة الـ build
npm run preview
```

## 📁 هيكل المشروع

```
clinic-app/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # نقطة الدخول
    ├── App.jsx           # المكون الرئيسي
    ├── index.css         # CSS عام وـ variables
    ├── data.js           # ✅ كل البيانات هنا (أطباء، خدمات، إحصائيات)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Navbar.module.css
    │   ├── Footer.jsx
    │   ├── Footer.module.css
    │   ├── WhatsAppFloat.jsx
    │   └── WhatsAppFloat.module.css
    └── sections/
        ├── Hero.jsx / Hero.module.css
        ├── Services.jsx / Services.module.css
        ├── Stats.jsx / Stats.module.css
        ├── Doctors.jsx / Doctors.module.css
        ├── Testimonials.jsx / Testimonials.module.css
        ├── Booking.jsx / Booking.module.css
        └── Contact.jsx / Contact.module.css
```

## ✏️ التخصيص

كل البيانات في ملف `src/data.js`:

- `WHATSAPP_NUMBER` — رقم الواتساب
- `PHONE_PRIMARY` — رقم الهاتف الرئيسي
- `SERVICES` — الخدمات والأسعار
- `DOCTORS` — بيانات الأطباء
- `TESTIMONIALS` — آراء المرضى
- `STATS` — الإحصائيات

## 🛠️ التقنيات

- **React 18** + **Vite 5**
- **CSS Modules** لعزل الأنماط
- **Font Awesome 6** للأيقونات
- **Google Fonts** — Tajawal
- RTL كامل + Responsive
