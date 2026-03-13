import { useState } from "react";
import { PATIENTS, avatar, normalize } from "../data/constants";

export default function Patients() {
  const [search, setSearch] = useState("");

  const filtered = PATIENTS.filter(p => {
    if (!search) return true;
    const n = normalize(search);
    return (
      normalize(p.name).includes(n)      ||
      normalize(p.phone).includes(n)     ||
      normalize(p.doctor).includes(n)    ||
      normalize(p.insurance).includes(n) ||
      normalize(p.email).includes(n)
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>سجل المرضى</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{filtered.length} مريض</p>
        </div>
        <div style={{ position: "relative" }}>
          <input
            placeholder="ابحث بالاسم، الهاتف، الطبيب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "9px 16px 9px 36px", color: "#fff", fontFamily: "inherit", fontSize: 14, outline: "none", textAlign: "right", width: 260 }}
          />
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", opacity: .4, pointerEvents: "none" }}>🔍</span>
        </div>
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
                <tr key={p.id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,.04)", transition: "background .15s" }}
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
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(255,255,255,.25)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>{search ? `لا توجد نتائج لـ "${search}"` : "لا يوجد مرضى"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
