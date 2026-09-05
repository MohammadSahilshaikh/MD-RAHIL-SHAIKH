// Vercel Serverless Function: POST /api/save-portfolio
// Password verify karta hai, phir Supabase mein data upsert karta hai

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({
      success: false,
      error: "Supabase environment variables not configured on Vercel"
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ success: false, error: "Invalid JSON body" });
  }

  const { password, data } = body || {};

  // Password check
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: "Incorrect password" });
  }

  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, error: "No data provided" });
  }

  try {
    // Supabase mein upsert karo (row id=1 always update karo)
    const supabaseRes = await fetch(
      `${SUPABASE_URL}/rest/v1/portfolio_data`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates"
        },
        body: JSON.stringify({
          id: 1,
          data: data,
          updated_at: new Date().toISOString()
        })
      }
    );

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      return res.status(500).json({ success: false, error: errText });
    }

    return res.status(200).json({ success: true, message: "Saved to cloud!" });
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
}
