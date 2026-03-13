import { StatCard } from "../components";
import { MONTHLY_DATA, SPECIALTY_DATA } from "../data/constants";

export default function Reports() {
  const totalRev = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0);
  const totalB = MONTHLY_DATA.reduce((s, d) => s + d.bookings, 0);
  const maxRev = Math.max(...MONTHLY_DATA.map(d => d.revenue));
  const totalSpec = SPECIALTY_DATA.reduce((s, d) => s + d.count, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>التقارير والإحصائيات</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>آخر 6 أشهر</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <StatCard label="إجمالي الإيرادات" value={`${(totalRev / 1000).toFixed(0)}K`} sub="جنيه  سعودي" icon="💰" color="#a855f7" trend={14} />
        <StatCard label="إجمالي الحجوزات" value={totalB} sub="6 أشهر" icon="📅" color="#3b82f6" trend={8} />
        <StatCard label="متوسط شهري" value={Math.round(totalB / 6)} sub="حجز/شهر" icon="📊" color="#22c55e" trend={5} />
      </div>

      {/* Bar Chart */}
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>الإيرادات عادلة</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 24 }}>بالجنيه  السعودي</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
          {MONTHLY_DATA.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{(d.revenue / 1000).toFixed(0)}K</div>
              <div style={{ width: "100%", borderRadius: "6px 6px 0 0", height: `${(d.revenue / maxRev) * 100}px`, background: i === MONTHLY_DATA.length - 1 ? "linear-gradient(180deg,#a855f7,#7c3aed)" : "rgba(168,85,247,.3)", transition: "height .5s ease" }} />
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{d.month.slice(0, 3)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly table */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", fontWeight: 700, fontSize: 15 }}>تفصيل شهري</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["الشهر", "الحجوزات", "المرضى الجدد", "الإيرادات", "النمو"].map((h, i) => (
              <th key={i} style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {MONTHLY_DATA.map((d, i) => {
              const growth = i > 0 ? ((d.bookings - MONTHLY_DATA[i - 1].bookings) / MONTHLY_DATA[i - 1].bookings * 100).toFixed(1) : null;
              const isLast = i === MONTHLY_DATA.length - 1;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.04)", background: isLast ? "rgba(168,85,247,.04)" : "transparent" }}>
                  <td style={{ padding: "14px 20px", fontWeight: isLast ? 700 : 400, color: isLast ? "#a855f7" : "#fff", fontSize: 14 }}>{d.month}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.bookings}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.patients}</td>
                  <td style={{ padding: "14px 20px", fontSize: 14, color: "rgba(255,255,255,.7)" }}>{d.revenue.toLocaleString()} جنيه </td>
                  <td style={{ padding: "14px 20px" }}>
                    {growth && <span style={{ color: growth > 0 ? "#22c55e" : "#ef4444", fontWeight: 600, fontSize: 13 }}>{growth > 0 ? "↑" : "↓"} {Math.abs(growth)}%</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Specialty bars */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>الحجوزات حسب التخصص</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[...SPECIALTY_DATA].sort((a, b) => b.count - a.count).map(d => {
            const pct = Math.round(d.count / totalSpec * 100);
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
