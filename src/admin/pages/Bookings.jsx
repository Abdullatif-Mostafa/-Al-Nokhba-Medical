import { useState } from "react";
import { BookingTable, Toast } from "../components";
import { DOCTORS, EMPTY_BOOKING, matchSearch } from "../data/constants";
import { updateBookingStatus, insertBooking } from "../lib/supabase";

const INPUT_S = {
  width: "100%", background: "rgba(255,255,255,.06)",
  border: "1px solid rgba(255,255,255,.1)", borderRadius: 10,
  padding: "10px 14px", color: "#fff", fontFamily: "inherit",
  fontSize: 14, outline: "none", textAlign: "right",
};
const SELECT_S = { ...INPUT_S, background: "#0a1628" };

export default function Bookings({ bookings, setBookings }) {
  const [filter,   setFilter]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState(EMPTY_BOOKING);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ===== تحديث الحالة =====
  const onUpdate = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      const labels = { confirmed: "✓ تم تأكيد الحجز", cancelled: "✕ تم إلغاء الحجز", completed: "★ تم إكمال الحجز" };
      showToast(labels[status] || "تم التحديث");
    } catch {
      showToast("حدث خطأ، حاول مرة أخرى", "error");
    }
  };

  // ===== إضافة حجز =====
  const addBooking = async () => {
    if (!form.name || !form.date || !form.phone)
      return showToast("يرجى ملء الحقول المطلوبة: الاسم، الهاتف، التاريخ", "error");
    try {
      const result = await insertBooking({ ...form, age: parseInt(form.age) || null, status: "pending" });
      setBookings(prev => [result[0], ...prev]);
      setForm(EMPTY_BOOKING);
      setShowForm(false);
      showToast("✓ تم إضافة الحجز بنجاح");
    } catch {
      showToast("حدث خطأ أثناء الحفظ", "error");
    }
  };

  // ===== البحث المحسّن =====
  const filtered = bookings.filter(b => {
    const statusMatch = filter === "all" || b.status === filter;
    const searchMatch = matchSearch(b, search);
    return statusMatch && searchMatch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
      <Toast toast={toast} />

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

      {/* Form */}
      {showForm && (
        <div style={{ background: "rgba(59,158,190,.06)", border: "1px solid rgba(59,158,190,.2)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ marginBottom: 18, fontSize: 15, fontWeight: 700, color: "#3B9EBE" }}>إضافة حجز جديد</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { k: "name",  label: "اسم المريض *", type: "text"   },
              { k: "age",   label: "العمر",         type: "number" },
              { k: "phone", label: "الهاتف *",      type: "text"   },
              { k: "email", label: "الإيميل",       type: "email"  },
              { k: "date",  label: "التاريخ *",     type: "date"   },
              { k: "time",  label: "الوقت",         type: "time"   },
            ].map(f => (
              <div key={f.k}>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={INPUT_S} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>التخصص</label>
              <select value={form.specialty} onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))} style={SELECT_S}>
                {["القلب","الأطفال","العظام","العيون","الأسنان","الجلدية"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>الطبيب</label>
              <select value={form.doctor} onChange={e => setForm(p => ({ ...p, doctor: e.target.value }))} style={SELECT_S}>
                {DOCTORS.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>ملاحظات</label>
              <input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={INPUT_S} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={addBooking} style={{ background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>حفظ الحجز</button>
            <button onClick={() => setShowForm(false)} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.6)", padding: "10px 24px", borderRadius: 10, fontFamily: "inherit", fontSize: 14, cursor: "pointer" }}>إلغاء</button>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <input
            placeholder="ابحث بالاسم، التخصص، الطبيب، الهاتف..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "9px 16px 9px 36px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right", width: 280 }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: .4, pointerEvents: "none" }}>🔍</span>
        </div>
        {search && (
          <button onClick={() => setSearch("")} style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", padding: "8px 12px", borderRadius: 8, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>✕ مسح</button>
        )}
        <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 4 }}>
          {[["all","الكل"],["pending","انتظار"],["confirmed","مؤكد"],["completed","مكتمل"],["cancelled","ملغي"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ background: filter === v ? "rgba(59,158,190,.2)" : "transparent", border: "none", color: filter === v ? "#3B9EBE" : "rgba(255,255,255,.4)", padding: "6px 14px", borderRadius: 7, fontFamily: "inherit", fontSize: 13, cursor: "pointer", transition: "all .2s" }}>{l}</button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,.3)", marginRight: "auto" }}>{filtered.length} نتيجة</span>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <BookingTable bookings={filtered} onUpdate={onUpdate} />
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,.25)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>{search ? `لا توجد نتائج لـ "${search}"` : "لا توجد حجوزات"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
