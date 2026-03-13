import { avatar, STATUS_CFG } from "../data/constants";

const S = {
  btn: (bg, color, border) => ({
    background: bg, color, border, padding: "5px 10px", borderRadius: 7,
    fontFamily: "inherit", fontSize: 12, cursor: "pointer",
  }),
};

// ===== StatCard =====
export function StatCard({ label, value, sub, icon, color, trend }) {
  return (
    <div style={{
      background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
      borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14,
      transition: "transform .2s, box-shadow .2s", cursor: "default",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "absolute", top: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: color, opacity: .06, filter: "blur(20px)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
        {trend && <span style={{ fontSize: 12, color: trend > 0 ? "#22c55e" : "#ef4444", background: trend > 0 ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", padding: "3px 8px", borderRadius: 20, fontWeight: 600 }}>{trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%</span>}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ===== MiniChart =====
export function MiniChart({ data, color }) {
  const max = Math.max(...data.map(d => d.bookings));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 60 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", borderRadius: "4px 4px 0 0", height: `${(d.bookings / max) * 52}px`, background: i === data.length - 1 ? color : color + "40", transition: "height .5s ease" }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", whiteSpace: "nowrap" }}>{d.month.slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
}

// ===== DonutChart =====
export function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  let offset = 0;
  const r = 60, cx = 70, cy = 70, stroke = 22, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg width={140} height={140}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth={stroke} />
        {data.map((d, i) => {
          const dash = (d.count / total) * circ;
          const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth={stroke} strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset * circ / total + circ / 4} />;
          offset += d.count;
          return el;
        })}
        <text x={cx} y={cy - 6}  textAnchor="middle" fill="#fff"                  fontSize={22} fontWeight={800}>{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="rgba(255,255,255,.4)"  fontSize={11}>حجز</text>
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

// ===== Toast =====
export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
      background: toast.type === "error" ? "#ef4444" : "#22c55e",
      color: "#fff", padding: "12px 24px", borderRadius: 12,
      fontWeight: 600, fontSize: 14, zIndex: 1000,
      boxShadow: "0 8px 32px rgba(0,0,0,.4)", animation: "fadeIn .3s",
    }}>{toast.msg}</div>
  );
}

// ===== BookingTable =====
export function BookingTable({ bookings, compact, onUpdate }) {
  const cols = ["المريض", "التخصص", "الطبيب", "التاريخ", "الوقت", "الحالة"];
  if (!compact) cols.push("إجراءات");

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{cols.map((h, i) => (
            <th key={i} style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.06)", whiteSpace: "nowrap" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {bookings.map(b => {
            const av = avatar(b.name || "؟");
            const sc = STATUS_CFG[b.status] || STATUS_CFG.pending;
            return (
              <tr key={b.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .15s" }}
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
                <td style={{ padding: "14px 20px", fontSize: 13, color: "rgba(255,255,255,.7)" }}>{b.time || "—"}</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30`, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
                    {sc.icon} {sc.label}
                  </span>
                </td>
                {!compact && onUpdate && (
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {b.status === "pending" && (<>
                        <button onClick={() => onUpdate(b.id, "confirmed")} style={S.btn("rgba(34,197,94,.12)",  "#22c55e", "1px solid rgba(34,197,94,.3)")}>تأكيد</button>
                        <button onClick={() => onUpdate(b.id, "cancelled")} style={S.btn("rgba(239,68,68,.12)",  "#ef4444", "1px solid rgba(239,68,68,.3)")}>إلغاء</button>
                      </>)}
                      {b.status === "confirmed" && (
                        <button onClick={() => onUpdate(b.id, "completed")} style={S.btn("rgba(99,102,241,.12)", "#6366f1", "1px solid rgba(99,102,241,.3)")}>مكتمل</button>
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

// ===== Sidebar =====
export function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const items = [
    { id: "overview", label: "الرئيسية", icon: "⬡" },
    { id: "bookings", label: "الحجوزات", icon: "◫" },
    { id: "doctors",  label: "الأطباء",  icon: "✦" },
    { id: "patients", label: "المرضى",   icon: "◎" },
    { id: "reports",  label: "التقارير", icon: "▦" },
  ];
  return (
    <aside style={{ width: collapsed ? 64 : 240, minHeight: "100vh", background: "linear-gradient(180deg,#0a1628 0%,#071020 100%)", borderLeft: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", transition: "width .3s cubic-bezier(.4,0,.2,1)", position: "relative", zIndex: 10, flexShrink: 0 }}>
      <div style={{ padding: collapsed ? "24px 14px" : "24px 20px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 12, overflow: "hidden" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🏥</div>
        {!collapsed && <div><div style={{ fontWeight: 800, fontSize: 15, color: "#fff", whiteSpace: "nowrap" }}>عيادة النخبة</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", whiteSpace: "nowrap" }}>لوحة الإدارة</div></div>}
      </div>
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", background: active === item.id ? "rgba(59,158,190,.15)" : "transparent", color: active === item.id ? "#3B9EBE" : "rgba(255,255,255,.45)", fontFamily: "inherit", fontSize: 14, fontWeight: active === item.id ? 700 : 500, transition: "all .2s", textAlign: "right", outline: active === item.id ? "1px solid rgba(59,158,190,.25)" : "none", justifyContent: collapsed ? "center" : "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      <button onClick={() => setCollapsed(!collapsed)} style={{ margin: "8px", padding: "10px", borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", color: "rgba(255,255,255,.4)", cursor: "pointer", fontFamily: "inherit", fontSize: 12, transition: "all .2s" }}>
        {collapsed ? "⟩" : "⟨ طي"}
      </button>
    </aside>
  );
}
