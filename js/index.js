import { initNewsSection } from "./components/news-section.js";
import { initSidebar } from "./components/sidebar.js";

export async function loadSidebar() {
  const container = document.getElementById("sidebar");
  if (!container) return;
  const res = await fetch("../html/components/sidebar.html");
  container.innerHTML = await res.text();
}

export async function loadNavBar() {
  const container = document.getElementById("navbar");
  const res = await fetch("../html/components/navbar.html");
  container.innerHTML = await res.text();

  highlightActiveNav();
}

function highlightActiveNav() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  let currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

export async function loadNewsSection() {
  const container = document.getElementById("news-section");
  if (!container) return;
  const res = await fetch("../html/components/news-section.html");
  container.innerHTML = await res.text();
}

export async function loadFooter() {
  const container = document.getElementById("footer");
  const res = await fetch("../html/components/footer.html");
  container.innerHTML = await res.text();
}

(async function init() {
  await loadNavBar();
  await loadSidebar();
  await loadNewsSection();
  await loadFooter();
  initSidebar();
  $(function () {
    initNewsSection();
  });
})();
