// Mobile browsers can restore the previous hash/scroll position after the
// first layout pass. Keep startup scrolling instant and reset again after the
// page and its high-priority hero image have finished laying out.
const resetPageToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

if (window.location.hash) {
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

resetPageToTop();

window.addEventListener("pageshow", () => {
  document.documentElement.classList.add("page-starting");
  resetPageToTop();
  requestAnimationFrame(resetPageToTop);
  window.setTimeout(() => {
    resetPageToTop();
    document.documentElement.classList.remove("page-starting");
  }, 250);
});

window.addEventListener("load", () => {
  resetPageToTop();
  requestAnimationFrame(() => {
    resetPageToTop();
    document.documentElement.classList.remove("page-starting");
  });
});

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".contact-form").addEventListener("submit", event => {
  event.preventDefault();
  alert("Inquiry received. Connect this form to Formspree, HubSpot, or your own backend before launch.");
});

document.getElementById("year").textContent = new Date().getFullYear();
