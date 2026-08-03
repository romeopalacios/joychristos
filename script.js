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
