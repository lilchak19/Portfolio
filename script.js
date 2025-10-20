// 🌙 DARK/LIGHT MODE TOGGLE WITH MEMORY
const toggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 📱 MOBILE MENU TOGGLE
const navLinks = document.querySelector(".nav-links");
const burger = document.createElement("button");
burger.classList.add("burger");
burger.innerHTML = "☰";
document.querySelector(".navbar").insertBefore(burger, navLinks);

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// 💨 SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
  });
});

// 🎬 SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll("section, .project-card");
const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ⬆️ SCROLL TO TOP BUTTON
const toTop = document.createElement("button");
toTop.classList.add("to-top");
toTop.innerHTML = "↑";
document.body.appendChild(toTop);

window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 300 ? "block" : "none";
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 💫 PROJECT CARD HOVER EFFECT
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});
