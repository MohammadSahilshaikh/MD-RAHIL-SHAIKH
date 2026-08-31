/* ============================================================
   SHARED SITE BEHAVIOUR
   Nav bar + footer inject karta hai har page pe (taaki edit ek
   jagah se ho), scroll-reveal animation, mobile menu toggle.
   ============================================================ */

function currentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  return path;
}

function buildNav(data) {
  const page = currentPage();
  const links = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "experience.html", label: "Experience" },
    { href: "gallery.html", label: "Gallery" },
    { href: "contact.html", label: "Contact" }
  ];

  const linksHtml = links
    .map(
      (l) =>
        `<a href="${l.href}" class="nav-link ${page === l.href ? "active" : ""}">${l.label}</a>`
    )
    .join("");

  return `
  <nav class="navbar">
    <a href="index.html" class="brand">
      <span class="brand-mark">CE</span>
      <span class="brand-text">${data.name}</span>
    </a>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" id="navLinks">
      ${linksHtml}
      <a href="admin.html" class="nav-link admin-link">⚙ Admin</a>
    </div>
  </nav>`;
}

function buildFooter(data) {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <div class="brand-text footer-brand">${data.name}</div>
        <p class="footer-role">${data.title}</p>
      </div>
      <div class="footer-contact">
        <span>${data.contact.email}</span>
        <span>${data.contact.phone}</span>
        <span>${data.contact.location}</span>
      </div>
    </div>
    <div class="blueprint-rule"></div>
    <p class="footer-copy">© ${year} ${data.name} — Site under continuous construction 🏗</p>
  </footer>`;
}

function injectLayout() {
  const data = getData();
  const navMount = document.getElementById("navMount");
  const footMount = document.getElementById("footMount");
  if (navMount) navMount.innerHTML = buildNav(data);
  if (footMount) footMount.innerHTML = buildFooter(data);

  // Mobile menu toggle
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }
  return data;
}

// Scroll reveal using IntersectionObserver
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
});
