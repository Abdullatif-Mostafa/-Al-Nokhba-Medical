import { StatCard, MiniChart, DonutChart, BookingTable } from "../components";
import { MONTHLY_DATA, SPECIALTY_DATA } from "../data/constants";

export default function Overview({ bookings, setActive }) {
  const today = new Date().toISOString().split("T")[0];
  const todayB = bookings.filter(b => b.date === today);
  const pending = bookings.filter(b => b.status === "pending");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="إجمالي الحجوزات" value={bookings.length} sub={`+${MONTHLY_DATA[5].bookings - MONTHLY_DATA[4].bookings} هذا الشهر`} icon="📅" color="#3b82f6" trend={8} />
        <StatCard label="حجوزات اليوم" value={todayB.length || 0} sub="اليوم" icon="🗓️" color="#22c55e" trend={12} />
        <StatCard label="في الانتظار" value={pending.length} sub="تحتاج تأكيد" icon="⏳" color="#f59e0b" trend={-5} />
        <StatCard label="الإيرادات" value="41,000" sub="جنيه  هذا الشهر" icon="💰" color="#a855f7" trend={14} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>الحجوزات عادلة</div>
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
        {bookings.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,.25)" }}>لا توجد حجوزات بعد</div>
        )}
      </div>
    </div>
  );
}
