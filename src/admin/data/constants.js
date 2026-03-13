export const DOCTORS = [
  { id: 1, name: "د. أحمد محمد", specialty: "القلب والأوعية", exp: 18, patients: 1240, rating: 4.9, days: "الأحد، الثلاثاء، الخميس", fee: 200, available: true },
  { id: 2, name: "د. سارة المنصور", specialty: "طب الأطفال", exp: 14, patients: 980, rating: 4.8, days: "السبت، الاثنين، الأربعاء", fee: 150, available: true },
  { id: 3, name: "د. خالد حسن", specialty: "جراحة العظام", exp: 20, patients: 860, rating: 4.9, days: "الاثنين، الأربعاء، الخميس", fee: 180, available: true },
  { id: 4, name: "د. محمود حسين", specialty: "طب العيون", exp: 16, patients: 720, rating: 4.7, days: "الأحد، الثلاثاء، السبت", fee: 160, available: false },
  { id: 5, name: "د. عمر احمد", specialty: "الأسنان التجميلي", exp: 12, patients: 650, rating: 4.8, days: "السبت، الاثنين، الأربعاء", fee: 120, available: true },
  { id: 6, name: "د. منى عادل", specialty: "الجلدية والتجميل", exp: 10, patients: 590, rating: 4.6, days: "الأحد، الأربعاء، الخميس", fee: 180, available: true },
];

export const PATIENTS = [
  { id: 1, name: "أحمد محمد علي", age: 34, phone: "0501234567", email: "ahmed@gmail.com", visits: 5, lastVisit: "2026-03-12", doctor: "د. أحمد محمد", insurance: "بوبا" },
  { id: 2, name: "سارة عبدالله", age: 28, phone: "0509876543", email: "sara@gmail.com", visits: 3, lastVisit: "2026-03-12", doctor: "د. سارة المنصور", insurance: "ميدغلف" },
  { id: 3, name: "محمد الغامدي", age: 45, phone: "0551234567", email: "mhmd@gmail.com", visits: 8, lastVisit: "2026-03-11", doctor: "د. خالد حسن", insurance: "الراجحي" },
  { id: 4, name: "فاطمة حسين", age: 32, phone: "0561234567", email: "fatma@gmail.com", visits: 2, lastVisit: "2026-03-10", doctor: "د. عمر احمد", insurance: "لا يوجد" },
  { id: 5, name: "نورة احمد", age: 24, phone: "0581234567", email: "nora@gmail.com", visits: 1, lastVisit: "2026-03-09", doctor: "د. منى عادل", insurance: "AXA" },
  { id: 6, name: "عبدالرحمن الحربي", age: 61, phone: "0591234567", email: "abdo@gmail.com", visits: 12, lastVisit: "2026-03-08", doctor: "د. أحمد محمد", insurance: "بوبا" },
  { id: 7, name: "خلود حسن", age: 38, phone: "0521234567", email: "mona@gmail.com", visits: 4, lastVisit: "2026-03-07", doctor: "د. سارة المنصور", insurance: "سلامة" },
];

export const MONTHLY_DATA = [
  { month: "أكتوبر", bookings: 180, revenue: 28000, patients: 160 },
  { month: "نوفمبر", bookings: 210, revenue: 33000, patients: 190 },
  { month: "ديسمبر", bookings: 195, revenue: 30000, patients: 175 },
  { month: "يناير", bookings: 240, revenue: 38000, patients: 215 },
  { month: "فبراير", bookings: 228, revenue: 36000, patients: 205 },
  { month: "مارس", bookings: 247, revenue: 41000, patients: 230 },
];

export const SPECIALTY_DATA = [
  { name: "القلب", count: 58, color: "#ef4444" },
  { name: "الأطفال", count: 72, color: "#3b82f6" },
  { name: "العظام", count: 45, color: "#f59e0b" },
  { name: "العيون", count: 38, color: "#22c55e" },
  { name: "الأسنان", count: 52, color: "#a855f7" },
  { name: "الجلدية", count: 41, color: "#ec4899" },
];

export const STATUS_CFG = {
  confirmed: { label: "مؤكد", bg: "rgba(34,197,94,.12)", color: "#22c55e", icon: "✓" },
  pending: { label: "انتظار", bg: "rgba(245,158,11,.12)", color: "#f59e0b", icon: "⏳" },
  cancelled: { label: "ملغي", bg: "rgba(239,68,68,.12)", color: "#ef4444", icon: "✕" },
  completed: { label: "مكتمل", bg: "rgba(99,102,241,.12)", color: "#6366f1", icon: "★" },
};

export const EMPTY_BOOKING = {
  name: "", age: "", specialty: "القلب", doctor: "د. أحمد محمد",
  date: "", time: "", phone: "", email: "", notes: "",
};

export const avatar = (name) => {
  const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#06b6d4", "#84cc16"];
  return { bg: colors[name.charCodeAt(0) % colors.length], letter: name[0] || "?" };
};

// البحث المحسّن — يبحث في أي حقل نصي بغض النظر عن الحروف
export const normalize = (str = "") =>
  str.toString().trim().toLowerCase()
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");

export const matchSearch = (booking, q) => {
  if (!q) return true;
  const n = normalize(q);
  return (
    normalize(booking.name || "").includes(n) ||
    normalize(booking.specialty || "").includes(n) ||
    normalize(booking.doctor || "").includes(n) ||
    normalize(booking.phone || "").includes(n) ||
    normalize(booking.email || "").includes(n) ||
    normalize(booking.status || "").includes(n)
  );
};
