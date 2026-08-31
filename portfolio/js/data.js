/* ============================================================
   PORTFOLIO DATA LAYER
   Ye file saara content localStorage me store/retrieve karti hai.
   Admin panel (admin.html) isi function ko use karke data save karta hai,
   aur baaki saare pages (index, about, experience, gallery, contact)
   isi se data padhkar page pe dikhate hain.
   ============================================================ */

const STORAGE_KEY = "civilPortfolioData";
const ADMIN_PASSWORD = "admin123"; // <-- Ise yahan se change kar sakte ho

// Default content (agar pehli baar site khul rahi hai to ye dikhega)
const DEFAULT_DATA = {
  name: "Md Rahil Shaikh",
  title: "Civil Engineer",
  tagline: "Building Tomorrow, One Blueprint at a Time",
  heroImg: "", // base64 image (admin se upload hoga)
  cvFile: "",  // base64 pdf (admin se upload hoga)
  cvFileName: "Md_Rahil_Shaikh_CV.pdf",

  about: {
    heading: "About Me",
    education:
      "Diploma in Civil Engineering completed. Currently pursuing B.Tech to strengthen my technical foundation and take on bigger site challenges.",
    bio:
      "Main ek passionate Civil Engineer hoon jise site pe reh kar ek design ko haqeeqat banate dekhna acha lagta hai. Foundation se leke finishing tak, har stage ki precision mujhe achi tarah aati hai. Meri koshish rehti hai ki quality aur safety, dono cost-effective tareeke se maintain rahe.",
    skills: ["AutoCAD", "Site Supervision", "Quantity Estimation", "Structural Basics", "Team Coordination", "Quality Control"]
  },

  experience: [
    {
      company: "Patli Group",
      role: "Site Engineer",
      duration: "2022 — 2024",
      desc: "Residential aur commercial projects par site supervision, material estimation aur labour coordination ka kaam kiya."
    },
    {
      company: "IB Group",
      role: "Civil Engineer",
      duration: "2024 — Present",
      desc: "Currently ongoing infrastructure projects par quality control, progress tracking aur client coordination sambhal raha hoon."
    }
  ],

  gallery: [
    { img: "", title: "Foundation Work" },
    { img: "", title: "Site Survey" },
    { img: "", title: "Structural Framing" }
  ],

  contact: {
    email: "rahilshaikh@example.com",
    phone: "+91 90000 00000",
    location: "Patna, Bihar, India",
    linkedin: ""
  }
};

// Data load karo localStorage se (ya default do agar kuch save nahi hai)
function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    const parsed = JSON.parse(raw);
    // Merge with defaults so naye fields bhi mil jaayein purane saved data ke saath
    return { ...JSON.parse(JSON.stringify(DEFAULT_DATA)), ...parsed };
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

// Data save karo localStorage me
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Reset to default (admin panel me "Reset" button ke liye)
function resetData() {
  localStorage.removeItem(STORAGE_KEY);
}
