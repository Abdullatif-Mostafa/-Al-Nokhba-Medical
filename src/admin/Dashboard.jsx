import { useState, useEffect } from "react";
import { Sidebar } from "./components";
import { fetchBookings } from "./lib/supabase";
import Overview  from "./pages/Overview";
import Bookings  from "./pages/Bookings";
import Doctors   from "./pages/Doctors";
import Patients  from "./pages/Patients";
import Reports   from "./pages/Reports";

const PAGES = { overview: "الرئيسية", bookings: "الحجوزات", doctors: "الأطباء", patients: "المرضى", reports: "التقارير" };

// ===== Login =====
function Login({ onLogin }) {
  const [form, setForm] = useState({ u: "", p: "" });
  const [err,  setErr]  = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (form.u === "admin" && form.p === "test123") onLogin();
    else setErr("بيانات الدخول غير صحيحة");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal',sans-serif", direction: "rtl" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap'); *{box-sizing:border-box}`}</style>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[[500,500,"#3B9EBE","-100px","-100px"],[400,400,"#0D6B8C","auto","-80px"]].map(([w,h,c,t,r],i) => (
          <div key={i} style={{ position:"absolute", width:w, height:h, borderRadius:"50%", background:c, opacity:.1, filter:"blur(80px)", top:t, right:r }} />
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "48px 40px", width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>🏥</div>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>عيادة النخبة الطبية</h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, margin: 0 }}>لوحة تحكم الإدارة</p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[["u","اسم المستخدم","text","admin"],["p","كلمة المرور","password","••••••••"]].map(([k,l,t,ph]) => (
            <div key={k}>
              <label style={{ fontSize: 13, color: "rgba(255,255,255,.55)", display: "block", marginBottom: 7 }}>{l}</label>
              <input type={t} placeholder={ph} value={form[k]} onChange={e => setForm(p => ({...p,[k]:e.target.value}))}
                style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: "13px 16px", color: "#fff", fontFamily: "inherit", fontSize: 15, outline: "none", textAlign: "right" }} />
            </div>
          ))}
          {err && <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", color: "#f87171", padding: "10px 16px", borderRadius: 10, fontSize: 13, textAlign: "center" }}>⚠️ {err}</div>}
          <button type="submit" style={{ background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", marginTop: 4 }}>دخول</button>
        </form>
      </div>
    </div>
  );
}

// ===== Main Dashboard =====
export default function Dashboard() {
  const [loggedIn,    setLoggedIn]    = useState(false);
  const [page,        setPage]        = useState("overview");
  const [collapsed,   setCollapsed]   = useState(false);
  const [bookings,    setBookings]    = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const loadBookings = async () => {
    setLoadingData(true);
    try {
      const data = await fetchBookings();
      setBookings(data || []);
    } catch (e) {
      console.error("Supabase:", e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { if (loggedIn) loadBookings(); }, [loggedIn]);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const pageMap = {
    overview: <Overview  bookings={bookings} setActive={setPage} />,
    bookings: <Bookings  bookings={bookings} setBookings={setBookings} />,
    doctors:  <Doctors   />,
    patients: <Patients  />,
    reports:  <Reports   />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060e1c", fontFamily: "'Tajawal',sans-serif", direction: "rtl", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,.03) }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 3px }
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      <Sidebar active={page} setActive={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ background: "rgba(255,255,255,.02)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>{PAGES[page]}</h2>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 2 }}>
              {new Date().toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", color: "#22c55e", padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} /> نظام نشط
            </div>
            <button onClick={loadBookings} disabled={loadingData} style={{ background: "rgba(59,158,190,.1)", border: "1px solid rgba(59,158,190,.2)", color: "#3B9EBE", padding: "7px 14px", borderRadius: 9, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>
              {loadingData ? "⏳" : "🔄"} تحديث
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3B9EBE,#0D6B8C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>A</div>
            <button onClick={() => setLoggedIn(false)} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#ef4444", padding: "7px 14px", borderRadius: 9, fontFamily: "inherit", fontSize: 13, cursor: "pointer" }}>خروج</button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          {pageMap[page]}
        </div>
      </div>
    </div>
  );
}
