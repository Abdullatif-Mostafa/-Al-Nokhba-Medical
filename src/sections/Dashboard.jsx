import { useState, useEffect, useRef } from "react";

// ===================== DATA =====================
const INITIAL_BOOKINGS = [
  { id: 1,  name: "أحمد محمد علي",     age: 34, specialty: "القلب",    doctor: "د. أحمد الراشد",   date: "2026-03-12", time: "10:00", phone: "0501234567", email: "ahmed@gmail.com",  status: "pending",   notes: "" },
  { id: 2,  name: "سارة عبدالله",      age: 28, specialty: "الأطفال",  doctor: "د. سارة المنصور",  date: "2026-03-12", time: "11:30", phone: "0509876543", email: "sara@gmail.com",   status: "confirmed", notes: "" },
  { id: 3,  name: "محمد الغامدي",      age: 45, specialty: "العظام",   doctor: "د. خالد العتيبي",  date: "2026-03-12", time: "14:00", phone: "0551234567", email: "mhmd@gmail.com",   status: "pending",   notes: "" },
  { id: 4,  name: "فاطمة الزهراني",    age: 32, specialty: "الأسنان",  doctor: "د. عمر السبيعي",   date: "2026-03-13", time: "09:00", phone: "0561234567", email: "fatma@gmail.com",  status: "confirmed", notes: "" },
  { id: 5,  name: "خالد العتيبي",      age: 55, specialty: "العيون",   doctor: "د. فيصل الحربي",   date: "2026-03-13", time: "15:30", phone: "0571234567", email: "khalid@gmail.com", status: "cancelled", notes: "الغى بسبب سفر" },
  { id: 6,  name: "نورة السبيعي",      age: 24, specialty: "الجلدية",  doctor: "د. منى الشهري",    date: "2026-03-14", time: "10:00", phone: "0581234567", email: "nora@gmail.com",   status: "confirmed", notes: "" },
  { id: 7,  name: "عبدالرحمن الحربي",  age: 61, specialty: "القلب",    doctor: "د. أحمد الراشد",   date: "2026-03-14", time: "11:00", phone: "0591234567", email: "abdo@gmail.com",   status: "pending",   notes: "" },
  { id: 8,  name: "منيرة القحطاني",    age: 38, specialty: "الأطفال",  doctor: "د. سارة المنصور",  date: "2026-03-15", time: "08:30", phone: "0521234567", email: "mona@gmail.com",   status: "confirmed", notes: "" },
  { id: 9,  name: "تركي الدوسري",      age: 42, specialty: "العظام",   doctor: "د. خالد العتيبي",  date: "2026-03-15", time: "13:00", phone: "0531234567", email: "turki@gmail.com",  status: "pending",   notes: "" },
  { id: 10, name: "ريم الشمري",        age: 29, specialty: "الجلدية",  doctor: "د. منى الشهري",    date: "2026-03-16", time: "16:00", phone: "0541234567", email: "reem@gmail.com",   status: "confirmed", notes: "" },
];

const DOCTORS = [
  { id: 1, name: "د. أحمد الراشد",   specialty: "القلب والأوعية",   exp: 18, patients: 1240, rating: 4.9, days: "الأحد، الثلاثاء، الخميس",   fee: 200, available: true,  img: "أ" },
  { id: 2, name: "د. سارة المنصور",  specialty: "طب الأطفال",        exp: 14, patients: 980,  rating: 4.8, days: "السبت، الاثنين، الأربعاء",  fee: 150, available: true,  img: "س" },
  { id: 3, name: "د. خالد العتيبي",  specialty: "جراحة العظام",      exp: 20, patients: 860,  rating: 4.9, days: "الاثنين، الأربعاء، الخميس", fee: 180, available: true,  img: "خ" },
  { id: 4, name: "د. فيصل الحربي",   specialty: "طب العيون",         exp: 16, patients: 720,  rating: 4.7, days: "الأحد، الثلاثاء، السبت",    fee: 160, available: false, img: "ف" },
  { id: 5, name: "د. عمر السبيعي",   specialty: "الأسنان التجميلي",  exp: 12, patients: 650,  rating: 4.8, days: "السبت، الاثنين، الأربعاء",  fee: 120, available: true,  img: "ع" },
  { id: 6, name: "د. منى الشهري",    specialty: "الجلدية والتجميل",  exp: 10, patients: 590,  rating: 4.6, days: "الأحد، الأربعاء، الخميس",   fee: 180, available: true,  img: "م" },
];

const PATIENTS = [
  { id: 1,  name: "أحمد محمد علي",    age: 34, phone: "0501234567", email: "ahmed@gmail.com",  visits: 5,  lastVisit: "2026-03-12", doctor: "د. أحمد الراشد",  insurance: "بوبا" },
  { id: 2,  name: "سارة عبدالله",     age: 28, phone: "0509876543", email: "sara@gmail.com",   visits: 3,  lastVisit: "2026-03-12", doctor: "د. سارة المنصور", insurance: "ميدغلف" },
  { id: 3,  name: "محمد الغامدي",     age: 45, phone: "0551234567", email: "mhmd@gmail.com",   visits: 8,  lastVisit: "2026-03-11", doctor: "د. خالد العتيبي", insurance: "الراجحي" },
  { id: 4,  name: "فاطمة الزهراني",   age: 32, phone: "0561234567", email: "fatma@gmail.com",  visits: 2,  lastVisit: "2026-03-10", doctor: "د. عمر السبيعي",  insurance: "لا يوجد" },
  { id: 5,  name: "نورة السبيعي",     age: 24, phone: "0581234567", email: "nora@gmail.com",   visits: 1,  lastVisit: "2026-03-09", doctor: "د. منى الشهري",   insurance: "AXA" },
  { id: 6,  name: "عبدالرحمن الحربي", age: 61, phone: "0591234567", email: "abdo@gmail.com",   visits: 12, lastVisit: "2026-03-08", doctor: "د. أحمد الراشد",  insurance: "بوبا" },
  { id: 7,  name: "منيرة القحطاني",   age: 38, phone: "0521234567", email: "mona@gmail.com",   visits: 4,  lastVisit: "2026-03-07", doctor: "د. سارة المنصور", insurance: "سلامة" },
];

const MONTHLY_DATA = [
  { month: "أكتوبر", bookings: 180, revenue: 28000, patients: 160 },
  { month: "نوفمبر", bookings: 210, revenue: 33000, patients: 190 },
  { month: "ديسمبر", bookings: 195, revenue: 30000, patients: 175 },
  { month: "يناير",  bookings: 240, revenue: 38000, patients: 215 },
  { month: "فبراير", bookings: 228, revenue: 36000, patients: 205 },
  { month: "مارس",   bookings: 247, revenue: 41000, patients: 230 },
];

const SPECIALTY_DATA = [
  { name: "القلب",    count: 58, color: "#ef4444" },
  { name: "الأطفال", count: 72, color: "#3b82f6" },
  { name: "العظام",  count: 45, color: "#f59e0b" },
  { name: "العيون",  count: 38, color: "#22c55e" },
  { name: "الأسنان", count: 52, color: "#a855f7" },
  { name: "الجلدية", count: 41, color: "#ec4899" },
];

const STATUS_CFG = {
  confirmed: { label: "مؤكد",        bg: "rgba(34,197,94,.12)",  color: "#22c55e", icon: "✓" },
  pending:   { label: "انتظار",      bg: "rgba(245,158,11,.12)", color: "#f59e0b", icon: "⏳" },
  cancelled: { label: "ملغي",        bg: "rgba(239,68,68,.12)",  color: "#ef4444", icon: "✕" },
  completed: { label: "مكتمل",       bg: "rgba(99,102,241,.12)", color: "#6366f1", icon: "★" },
};

const EMPTY_BOOKING = { name: "", age: "", specialty: "القلب", doctor: "د. أحمد الراشد", date: "", time: "", phone: "", email: "", notes: "" };

// ===================== HELPERS =====================
const avatar = (name, size = 38) => {
  const colors = ["#3b82f6","#ef4444","#22c55e","#f59e0b","#a855f7","#ec4899","#06b6d4","#84cc16"];
  const c = colors[name.charCodeAt(0) % colors.length];
  return { bg: c, letter: name[0] || "?" };
};

// ===================== COMPONENTS =====================

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const items = [
    { id: "overview",  label: "الرئيسية",   icon: "⬡" },
    { id: "bookings",  label: "الحجوزات",   icon: "◫" },
    { id: "doctors",   label: "الأطباء",    icon: "✦" },
    { id: "patients",  label: "المرضى",     icon: "◎" },
    { id: "reports",   label: "التقارير",   icon: "▦" },
  ];
  return (
    <aside style={{
      width: collapsed ? 64 : 240, minHeight: "100vh",
      background: "linear-gradient(180deg,#0a1628 0%,#071020 100%)",
      borderLeft: "1px solid rgba(255,255,255,.06)",
      display: "flex", flexDirection: "column",
      transition: "width .3s cubic-bezier(.4,0,.2,1)",
      position: "relative", zIndex: 10, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "24px 14px" : "24px 20px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🏥</div>
        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>عيادة النخبة</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>لوحة الإدارة</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: collapsed ? "11px 14px" : "11px 14px",
            borderRadius: 10, border: "none", cursor: "pointer", width: "100%",
            background: active === item.id ? "rgba(59,158,190,.15)" : "transparent",
            color: active === item.id ? "#3B9EBE" : "rgba(255,255,255,.45)",
            fontFamily: "inherit", fontSize: 14, fontWeight: active === item.id ? 700 : 500,
            transition: "all .2s", textAlign: "right",
            outline: active === item.id ? "1px solid rgba(59,158,190,.25)" : "none",
            justifyContent: collapsed ? "center" : "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse btn */}
      <button onClick={() => setCollapsed(!collapsed)} style={{
        margin: "8px", padding: "10px", borderRadius: 10, border: "1px solid rgba(255,255,255,.08)",
        background: "rgba(255,255,255,.03)", color: "rgba(255,255,255,.4)", cursor: "pointer",
        fontFamily: "inherit", fontSize: 12, transition: "all .2s",
      }}>
        {collapsed ? "⟩" : "⟨ طي"}
      </button>
    </aside>
  );
}

function StatCard({ label, value, sub, icon, color, trend }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
      borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14,
      transition: "transform .2s, box-shadow .2s", cursor: "default",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: color, opacity: .06, filter: "blur(20px)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
        {trend && <span style={{ fontSize: 12, color: trend > 0 ? "#22c55e" : "#ef4444", background: trend > 0 ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</span>}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: color, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function MiniChart({ data, color }) {
  const max = Math.max(...data.map(d => d.bookings));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", borderRadius: "4px 4px 0 0",
            height: `${(d.bookings / max) * 52}px`,
            background: i === data.length - 1 ? color : color + "40",
            transition: "height .5s ease",
          }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", whiteSpace: "nowrap" }}>{d.month.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  let offset = 0;
  const r = 60, cx = 70, cy = 70, stroke = 22;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg width={140} height={140}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={stroke} />
        {data.map((d, i) => {
          const dash = (d.count / total) * circ;
          const gap = circ - dash;
          const el = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={d.color} strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset * circ / total + circ / 4}
              style={{ transition: "stroke-dasharray .5s ease" }}
            />
          );
          offset += d.count;
          return el;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontSize={22} fontWeight={800}>{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize={11}>حجز</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{d.name}</span>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 700, marginRight: "auto" }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== PAGES =====================

function Overview({ bookings, setActive }) {
  const today = new Date().toISOString().split("T")[0];
  const todayB = bookings.filter(b => b.date === today);
  const pending = bookings.filter(b => b.status === "pending");
  const confirmed = bookings.filter(b => b.status === "confirmed");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="إجمالي الحجوزات" value={bookings.length} sub={`+${MONTHLY_DATA[5].bookings - MONTHLY_DATA[4].bookings} هذا الشهر`} icon="📅" color="#3b82f6" trend={8} />
        <StatCard label="حجوزات اليوم"    value={todayB.length || 3} sub="3 متبقية" icon="🗓️" color="#22c55e" trend={12} />
        <StatCard label="في الانتظار"      value={pending.length}  sub="تحتاج تأكيد" icon="⏳" color="#f59e0b" trend={-5} />
        <StatCard label="الإيرادات"        value="41,000" sub="ريال هذا الشهر"  icon="💰" color="#a855f7" trend={14} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>الحجوزات الشهرية</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>آخر 6 أشهر</div>
            </div>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#3B9EBE" }}>247</span>
          </div>
          <MiniChart data={MONTHLY_DATA} color="#3B9EBE" />
        </div>

        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>توزيع التخصصات</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 16 }}>مارس 2026</div>
          <DonutChart data={SPECIALTY_DATA} />
        </div>
      </div>

      {/* Recent bookings */}
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>أحدث الحجوزات</div>
          <button onClick={() => setActive("bookings")} style={{ background: "rgba(59,158,190,.12)", border: "1px solid rgba(59,158,190,.25)", color: "#3B9EBE", padding: "6px 14px", borderRadius: 8, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>عرض الكل</button>
        </div>
        <BookingTable bookings={bookings.slice(0, 5)} compact />
      </div>
    </div>
  );
}

function BookingTable({ bookings, compact, onUpdate }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["المريض", "التخصص", "الطبيب", "التاريخ", "الوقت", "الحالة", !compact && "إجراءات"].filter(Boolean).map((h, i) => (
              <th key={i} style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.06)", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => {
            const av = avatar(b.name);
            const sc = STATUS_CFG[b.status] || STATUS_CFG.pending;
            return (
              <tr key={b.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.025)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{av.letter}</div>
                    <div>
                      <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{b.name}</div>
                      {!compact && <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{b.phone}</div>}
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{b.specialty}</td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{b.doctor}</td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{b.date}</td>
                <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{b.time}</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30`, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {sc.icon} {sc.label}
                  </span>
                </td>
                {!compact && onUpdate && (
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {b.status === "pending" && (
                        <>
                          <button onClick={() => onUpdate(b.id, "confirmed")} style={{ background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.3)", color: "#22c55e", padding: "5px 10px", borderRadius: 7, fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>تأكيد</button>
                          <button onClick={() => onUpdate(b.id, "cancelled")} style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.3)", color: "#ef4444", padding: "5px 10px", borderRadius: 7, fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>إلغاء</button>
                        </>
                      )}
                      {b.status === "confirmed" && (
                        <button onClick={() => onUpdate(b.id, "completed")} style={{ background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.3)", color: "#6366f1", padding: "5px 10px", borderRadius: 7, fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>مكتمل</button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BookingsPage({ bookings, setBookings }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_BOOKING);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(status === "confirmed" ? "✓ تم تأكيد الحجز" : status === "cancelled" ? "✕ تم إلغاء الحجز" : "★ تم إكمال الحجز");
  };

  const addBooking = () => {
    if (!form.name || !form.date || !form.phone) return showToast("يرجى ملء الحقول المطلوبة", "error");
    const newB = { ...form, id: Date.now(), status: "pending", age: parseInt(form.age) || 0 };
    setBookings(prev => [newB, ...prev]);
    setForm(EMPTY_BOOKING);
    setShowForm(false);
    showToast("✓ تم إضافة الحجز بنجاح");
  };

  const filtered = bookings.filter(b => {
    const ms = filter === "all" || b.status === filter;
    const mq = !search || b.name.includes(search) || b.specialty.includes(search) || b.doctor.includes(search) || b.phone.includes(search);
    return ms && mq;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", background: toast.type === "error" ? "#ef4444" : "#22c55e", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 1000, boxShadow: "0 8px 32px rgba(0,0,0,.4)", animation: "fadeIn .3s" }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>إدارة الحجوزات</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{filtered.length} حجز</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 10, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          + حجز جديد
        </button>
      </div>

      {/* New booking form */}
      {showForm && (
        <div style={{ background: "rgba(59,158,190,.06)", border: "1px solid rgba(59,158,190,.2)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ marginBottom: 18, fontSize: 15, fontWeight: 700, color: "#3B9EBE" }}>إضافة حجز جديد</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { k: "name",      label: "اسم المريض *", type: "text"   },
              { k: "age",       label: "العمر",         type: "number" },
              { k: "phone",     label: "الهاتف *",      type: "text"   },
              { k: "email",     label: "الإيميل",       type: "email"  },
              { k: "date",      label: "التاريخ *",     type: "date"   },
              { k: "time",      label: "الوقت",         type: "time"   },
            ].map(f => (
              <div key={f.k}>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                  style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>التخصص</label>
              <select value={form.specialty} onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))}
                style={{ width: "100%", background: "#0a1628", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none" }}>
                {["القلب","الأطفال","العظام","العيون","الأسنان","الجلدية"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>الطبيب</label>
              <select value={form.doctor} onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))}
                style={{ width: "100%", background: "#0a1628", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none" }}>
                {DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>ملاحظات</label>
              <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={addBooking} style={{ background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>حفظ الحجز</button>
            <button onClick={() => setShowForm(false)} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", padding: "10px 24px", borderRadius: 10, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>إلغاء</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="🔍  بحث بالاسم أو التخصص..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "9px 16px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right", width: 240 }} />
        <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 4 }}>
          {[["all","الكل"],["pending","انتظار"],["confirmed","مؤكد"],["completed","مكتمل"],["cancelled","ملغي"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ background: filter === v ? "rgba(59,158,190,.2)" : "transparent", border: "none", color: filter === v ? "#3B9EBE" : "rgba(255,255,255,.4)", padding: "6px 14px", borderRadius: 7, fontFamily: "inherit", fontSize: 13, cursor: "pointer", transition: "all .2s" }}>{l}</button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginRight: "auto" }}>{filtered.length} نتيجة</span>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <BookingTable bookings={filtered} onUpdate={updateStatus} />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,.25)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>لا توجد نتائج</div>
          </div>
        )}
      </div>
    </div>
  );
}

function DoctorsPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>فريق الأطباء</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{DOCTORS.length} طبيب مسجل</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {DOCTORS.map(d => {
          const av = avatar(d.name);
          return (
            <div key={d.id} onClick={() => setSelected(d)} style={{
              background: selected?.id === d.id ? "rgba(59,158,190,.08)" : "rgba(255,255,255,.03)",
              border: `1px solid ${selected?.id === d.id ? "rgba(59,158,190,.3)" : "rgba(255,255,255,.07)"}`,
              borderRadius: 16, padding: 20, cursor: "pointer", transition: "all .2s",
            }}
              onMouseEnter={e => { if (selected?.id !== d.id) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
              onMouseLeave={e => { if (selected?.id !== d.id) e.currentTarget.style.background = "rgba(255,255,255,.03)"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>{av.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{d.specialty}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, background: d.available ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", color: d.available ? "#22c55e" : "#ef4444", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                    {d.available ? "متاح" : "غير متاح"}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
                {[["⭐", d.rating], ["👥", d.patients], ["📅", d.exp + "س"]].map(([ic, v], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "8px 0", textAlign: "center" }}>
                    <div style={{ fontSize: 16 }}>{ic}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 12 }}>
                <span style={{ color: "#3B9EBE" }}>📅 </span>{d.days}
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <div style={{ background: "rgba(59,158,190,.06)", border: "1px solid rgba(59,158,190,.2)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#3B9EBE" }}>تفاصيل: {selected.name}</h3>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.4)", fontSize: 18, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[["التخصص", selected.specialty],["سعر الكشف", selected.fee + " ريال"],["سنوات الخبرة", selected.exp],["عدد المرضى", selected.patients]].map(([l,v]) => (
              <div key={l} style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 4 }}>{l}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,.5)" }}>
            <strong style={{ color: "rgba(255,255,255,.7)" }}>أيام العمل: </strong>{selected.days}
          </div>
        </div>
      )}
    </div>
  );
}

function PatientsPage() {
  const [search, setSearch] = useState("");
  const filtered = PATIENTS.filter(p => !search || p.name.includes(search) || p.phone.includes(search) || p.doctor.includes(search));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>سجل المرضى</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{filtered.length} مريض</p>
        </div>
        <input placeholder="🔍  بحث..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "9px 16px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right", width: 220 }} />
      </div>
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["المريض","العمر","الهاتف","الطبيب المعالج","الزيارات","آخر زيارة","التأمين"].map((h,i) => (
              <th key={i} style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const av = avatar(p.name);
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.025)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{av.letter}</div>
                      <div>
                        <div style={{ fontSize: 14, color: "#fff", fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{p.age}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)", direction: "ltr", textAlign: "right" }}>{p.phone}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{p.doctor}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: "rgba(59,158,190,.12)", color: "#3B9EBE", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{p.visits}</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{p.lastVisit}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: p.insurance === "لا يوجد" ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.7)" }}>{p.insurance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsPage() {
  const totalRev = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalB   = MONTHLY_DATA.reduce((s, d) => s + d.bookings, 0);
  const maxRev   = Math.max(...MONTHLY_DATA.map(d => d.revenue));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>التقارير والإحصائيات</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>آخر 6 أشهر</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <StatCard label="إجمالي الإيرادات"  value={`${(totalRev/1000).toFixed(0)}K`} sub="ريال سعودي"    icon="💰" color="#a855f7" trend={14} />
        <StatCard label="إجمالي الحجوزات"   value={totalB}                           sub="6 أشهر"        icon="📅" color="#3b82f6" trend={8}  />
        <StatCard label="متوسط شهري"         value={Math.round(totalB/6)}             sub="حجز/شهر"       icon="📊" color="#22c55e" trend={5}  />
      </div>

      {/* Revenue Bar Chart */}
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>الإيرادات الشهرية</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 24 }}>بالريال السعودي</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
          {MONTHLY_DATA.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{(d.revenue/1000).toFixed(0)}K</div>
              <div style={{
                width: "100%", borderRadius: "6px 6px 0 0",
                height: `${(d.revenue / maxRev) * 100}px`,
                background: i === MONTHLY_DATA.length - 1
                  ? "linear-gradient(180deg,#a855f7,#7c3aed)"
                  : "rgba(168,85,247,.3)",
                transition: "height .5s ease",
                cursor: "default",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{d.month.slice(0,3)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown table */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", fontWeight: 700, fontSize: 15 }}>تفصيل شهري</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["الشهر","الحجوزات","المرضى الجدد","الإيرادات","النمو"].map((h,i) => (
              <th key={i} style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {MONTHLY_DATA.map((d, i) => {
              const growth = i > 0 ? ((d.bookings - MONTHLY_DATA[i-1].bookings) / MONTHLY_DATA[i-1].bookings * 100).toFixed(1) : 0;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", background: i === MONTHLY_DATA.length-1 ? "rgba(168,85,247,.04)" : "transparent" }}>
                  <td style={{ padding: "14px 20px", fontWeight: i === MONTHLY_DATA.length-1 ? 700 : 400, color: i === MONTHLY_DATA.length-1 ? "#a855f7" : "#fff", fontSize: 14 }}>{d.month}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.bookings}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.patients}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.revenue.toLocaleString()} ريال</td>
                  <td style={{ padding: "14px 20px" }}>
                    {i > 0 && <span style={{ color: growth > 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: 13 }}>{growth > 0 ? "↑" : "↓"} {Math.abs(growth)}%</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Specialty breakdown */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>الحجوزات حسب التخصص</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SPECIALTY_DATA.sort((a,b)=>b.count-a.count).map(d => {
            const pct = Math.round(d.count / SPECIALTY_DATA.reduce((s,x)=>s+x.count,0) * 100);
            return (
              <div key={d.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{d.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.count} ({pct}%)</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: d.color, borderRadius: 3, transition: "width .6s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================
export default function App() {
  const [page, setPage] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ u: "", p: "" });
  const [loginErr, setLoginErr] = useState("");

  const doLogin = (e) => {
    e.preventDefault();
    if (loginForm.u === "admin" && loginForm.p === "test123") setLoggedIn(true);
    else setLoginErr("بيانات الدخول غير صحيحة");
  };

  if (!loggedIn) return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal',sans-serif", direction: "rtl" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap'); * { box-sizing: border-box; }`}</style>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[[500,500,"#3B9EBE","-100px","-100px"],[400,400,"#0D6B8C","auto","-80px","0","auto"],[300,300,"#1a3a5c","50%","50%","-50%","-50%"]].map(([w,h,c,t,r,ty,tx], i) => (
          <div key={i} style={{ position:"absolute", width:w, height:h, borderRadius:"50%", background:c, opacity:.12, filter:"blur(80px)", top:t, right:r, transform:`translate(${tx||0},${ty||0})` }} />
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🏥</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>عيادة النخبة الطبية</h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>لوحة تحكم الإدارة</p>
        </div>
        <form onSubmit={doLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[["u","اسم المستخدم","text","admin"],["p","كلمة المرور","password","••••••••"]].map(([k,l,t,ph]) => (
            <div key={k}>
              <label style={{ fontSize: 13, color: "rgba(255,255,255,.55)", display: "block", marginBottom: 7, fontWeight: 500 }}>{l}</label>
              <input type={t} placeholder={ph} value={loginForm[k]} onChange={e => setLoginForm(p => ({...p,[k]:e.target.value}))}
                style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "13px 16px", color: "#fff", fontFamily: "inherit", fontSize: 15, outline: "none", textAlign: "right" }} />
            </div>
          ))}
          {loginErr && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", padding: "10px 16px", borderRadius: 10, fontSize: 13, textAlign: "center" }}>⚠️ {loginErr}</div>}
          <button type="submit" style={{ background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", marginTop: 4 }}>دخول</button>
        </form>
      </div>
    </div>
  );

  const pages = { overview: <Overview bookings={bookings} setActive={setPage} />, bookings: <BookingsPage bookings={bookings} setBookings={setBookings} />, doctors: <DoctorsPage />, patients: <PatientsPage />, reports: <ReportsPage /> };
  const pageTitles = { overview: "الرئيسية", bookings: "الحجوزات", doctors: "الأطباء", patients: "المرضى", reports: "التقارير" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060e1c", fontFamily: "'Tajawal',sans-serif", direction: "rtl", color: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:rgba(255,255,255,.03)} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:3px} @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <Sidebar active={page} setActive={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: "rgba(255,255,255,.02)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>{pageTitles[page]}</h2>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 2 }}>
              {new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", color: "#22c55e", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
              نظام نشط
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>A</div>
            <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#ef4444", padding: "7px 14px", borderRadius: 9, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>خروج</button>
          </div>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {pages[page]}
        </div>
      </div>
    </div>
  );
}
