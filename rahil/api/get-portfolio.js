// Vercel Serverless Function: GET /api/get-portfolio
// Supabase se portfolio data fetch karta hai aur visitor ko deta hai

export default async function handler(req, res) {
  // CORS headers — sab origins se request allow
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({
      success: false,
      error: "Supabase environment variables not configured on Vercel"
    });
  }

  try {
    // Supabase REST API se portfolio_data table ka latest row fetch karo
    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/portfolio_data?select=data&order=updated_at.desc&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      return res.status(500).json({ success: false, error: errText });
    }

    const rows = await supabaseRes.json();

    if (!rows || rows.length === 0) {
      // Koi data nahi DB mein — fresh install, empty return
      return res.status(200).json({ success: true, data: {} });
    }

    return res.status(200).json({ success: true, data: rows[0].data });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}
