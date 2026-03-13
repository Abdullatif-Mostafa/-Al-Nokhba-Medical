// ===================== SUPABASE CONFIG =====================
export const SUPABASE_URL  = "https://uzozzcrpyqhxzuszwwlv.supabase.co";
export const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6b3p6Y3JweXFoeHp1c3p3d2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTYwNjMsImV4cCI6MjA4Nzc3MjA2M30.pr1cNwJ4HxAbIU9sdsnTLHLqLP0mzNoh4JsZrlZtaOo";

const headers = {
  "Content-Type":  "application/json",
  "apikey":        SUPABASE_ANON,
  "Authorization": `Bearer ${SUPABASE_ANON}`,
};

async function sbFetch(path, opts = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, { headers, ...opts });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const fetchBookings = () =>
  sbFetch("/bookings?select=*&order=created_at.desc");

export const updateBookingStatus = (id, status) =>
  fetch(`${SUPABASE_URL}/rest/v1/bookings?id=eq.${id}`, {
    method:  "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body:    JSON.stringify({ status }),
  });

export const insertBooking = (data) =>
  sbFetch("/bookings", {
    method:  "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body:    JSON.stringify(data),
  });
