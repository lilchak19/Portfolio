// =============== DARK / LIGHT MODE ===============
const toggle = document.getElementById("theme-toggle");

if (toggle) {
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
}



// =============== MOBILE MENU TOGGLE ===============
const nav = document.querySelector("nav");
const navLinks = document.querySelector("nav ul");

if (nav && navLinks) {
  const burger = document.createElement("button");
  burger.classList.add("burger");
  burger.innerHTML = "☰";

  nav.insertBefore(burger, navLinks);

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}



// =============== SMOOTH SCROLLING ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    }
  });
});



// =============== SCROLL REVEAL ANIMATION ===============
const revealElements = document.querySelectorAll("section, .repo-card");

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



// =============== SCROLL TO TOP BUTTON ===============
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



// =============== PROJECT CARD HOVER EFFECT ===============
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".repo-card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});



// =============== GITHUB REPO LOADER ===============
const GITHUB_USERNAME = "lilchak19";
const repoContainer = document.getElementById("repos");
const loader = document.getElementById("loading");

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    loader.style.display = "none";

    repos
      .filter(repo => repo.name.toLowerCase() !== "portfolio")
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "repo-card";

        // Auto-image from repo root (GitHub raw)
        const imgURL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/preview.png`;

        const fallbackImg = "https://via.placeholder.com/600x400/1c1c1c/ffffff?text=" + encodeURIComponent(repo.name);

        card.innerHTML = `
          <img src="${imgURL}" 
               class="repo-img" 
               onerror="this.src='${fallbackImg}'"
               alt="Project Image">

          <div class="repo-content">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>

            <div class="repo-info">
              <span>⭐ ${repo.stargazers_count}</span>
              <span>${repo.language || "N/A"}</span>
            </div>
          </div>

          <div class="repo-buttons">
            <button class="view-btn" onclick="window.open('${repo.html_url}', '_blank')">🔗 View Source</button>

            <a href="https://github.com/${GITHUB_USERNAME}/${repo.name}/archive/refs/heads/main.zip" target="_blank">
              <button class="download-btn">⬇ Download ZIP</button>
            </a>
          </div>
        `;

        repoContainer.appendChild(card);
      });
  })
  .catch(err => {
    loader.innerText = "Error loading repos.";
    console.error(err);
  });
