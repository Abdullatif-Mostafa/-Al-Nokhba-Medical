import { useState } from "react";
import { DOCTORS, avatar } from "../data/constants";

export default function Doctors() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>فريق الأطباء</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{DOCTORS.length} طبيب مسجل</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {DOCTORS.map(d => {
          const av  = avatar(d.name);
          const sel = selected?.id === d.id;
          return (
            <div key={d.id} onClick={() => setSelected(sel ? null : d)}
              style={{ background: sel ? "rgba(59,158,190,.08)" : "rgba(255,255,255,.03)", border: `1px solid ${sel ? "rgba(59,158,190,.3)" : "rgba(255,255,255,.07)"}`, borderRadius: 16, padding: 20, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { if (!sel) e.currentTarget.style.background = "rgba(255,255,255,.05)"; }}
              onMouseLeave={e => { if (!sel) e.currentTarget.style.background = "rgba(255,255,255,.03)"; }}
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
