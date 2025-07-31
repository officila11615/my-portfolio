// --- Theme Toggle ---
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  themeIcon.textContent = document.body.classList.contains("light-theme")
    ? "☀️"
    : "🌙";
});

// --- Navigation Highlight + Smooth scroll ---
document.querySelectorAll(".comet-navlink").forEach((link) => {
  link.addEventListener("click", (evt) => {
    const dest = document.querySelector(link.getAttribute("href"));
    if (dest) {
      evt.preventDefault();
      dest.scrollIntoView({ behavior: "smooth" });
    }
  });
});
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".comet-section");
  const scrollY = window.scrollY + 80;
  sections.forEach((section) => {
    const nav = document.querySelector(`.comet-navlink[href="#${section.id}"]`);
    if (nav) {
      if (
        section.offsetTop <= scrollY &&
        section.offsetTop + section.offsetHeight > scrollY
      ) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    }
  });
});

// --- Fade-in animation for sections ---
const sections = document.querySelectorAll(".comet-section");
const showSection = () => {
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) sec.classList.add("visible");
  });
};
showSection();
window.addEventListener("scroll", showSection);

// --- Dynamic Projects (with a featured/card split) ---
const projectData = [
  {
    title: "Project Neo 🚀",
    desc: "Modern landing page for SaaS startup with Comet-inspired modular UI and mobile-first design.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    link: "#",
    linkText: "Demo",
    featured: true,
  },
  {
    title: "TaskMaster Pro",
    desc: "Productivity app built with React & Firebase, featuring real-time sync and beautiful Comet-style animations.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    link: "#",
    linkText: "GitHub",
  },
  {
    title: "Cosmic Blog Platform",
    desc: "Multi-author blog engine built with no-code backend tool Xano, deployed in under 1 hour.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    link: "#",
    linkText: "Live",
  },
];

const projectList = document.querySelector(".comet-cards");
const featuredContainer = document.querySelector(".comet-featured-card");
if (projectList && featuredContainer) {
  projectList.innerHTML = "";
  // Show first "featured" project above
  const featured = projectData.find((p) => p.featured);
  if (featured) {
    featuredContainer.innerHTML = `
      <article class="comet-card">
        <img src="${featured.img}" alt="Screenshot of ${featured.title}" class="comet-card-img">
        <h3>${featured.title}</h3>
        <p>${featured.desc}</p>
        <a class="comet-button" href="${featured.link}" target="_blank">${featured.linkText}</a>
      </article>
    `;
  }
  // Render the remaining
  projectData
    .filter((p) => !p.featured)
    .forEach((proj) => {
      projectList.innerHTML += `
      <article class="comet-card">
        <img src="${proj.img}" alt="Screenshot of ${proj.title}" class="comet-card-img">
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <a class="comet-button" href="${proj.link}" target="_blank">${proj.linkText}</a>
      </article>
    `;
    });
}

// --- Starfield background ---
const addStars = () => {
  const n = 36;
  for (let i = 0; i < n; i++) {
    const star = document.createElement("div");
    star.className = "comet-star";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.width = star.style.height = Math.random() * 2 + 1 + "px";
    star.style.borderRadius = "50%";
    star.style.background =
      "rgba(105,255,252," + (Math.random() * 0.4 + 0.3) + ")";
    star.style.boxShadow = "0 0 14px #0ff9";
    star.style.zIndex = 0;
    document.body.appendChild(star);
  }
};
addStars();

// --- Skills sparkle and ripple effect for comet and social buttons ---
document
  .querySelectorAll(".comet-chip, .comet-button, .comet-btn-social")
  .forEach((btn) => {
    btn.addEventListener("mousedown", function (e) {
      let ripple = document.createElement("span");
      ripple.className = "comet-ripple";
      ripple.style.left = e.offsetX + "px";
      ripple.style.top = e.offsetY + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
const style = document.createElement("style");
style.innerHTML = `
.comet-ripple{
  position: absolute; border-radius:50%; transform: scale(0);
  background:rgba(60,250,255,0.49); animation: comet-ripple .45s linear;
  pointer-events:none; width:88px;height:88px;margin-left:-44px;margin-top:-44px;z-index:2;
}
@keyframes comet-ripple { to {transform: scale(1.8); opacity:0;} }
.comet-button, .comet-btn-social, .comet-chip {position:relative;overflow:hidden;}
`;
document.head.appendChild(style);

// --- Contact form feedback ---
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for contacting! (This is a style demo, no data is sent.)");
    form.reset();
  });
}
// --- Cosmic comet-tail cursor effect ---
const cursorTrail = [];
const trailLength = 12; // Number of dots in the trail

for (let i = 0; i < trailLength; i++) {
  const dot = document.createElement("div");
  dot.className = "comet-cursor-dot";
  dot.style.opacity = (1 - i / trailLength).toFixed(2); // Fade tail
  document.body.appendChild(dot);
  cursorTrail.push(dot);
}

let mouseX = window.innerWidth / 2,
  mouseY = window.innerHeight / 2;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
// --- Comet Glow Cursor + Trailing Ring ---
const cometDot = document.createElement("div");
cometDot.className = "comet-cursor-dot";
document.body.appendChild(cometDot);

const cometRing = document.createElement("div");
cometRing.className = "comet-cursor-ring";
document.body.appendChild(cometRing);

let dotX = window.innerWidth / 2,
  dotY = window.innerHeight / 2;
let ringX = dotX,
  ringY = dotY;

document.addEventListener("mousemove", (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
  cometDot.style.left = dotX + "px";
  cometDot.style.top = dotY + "px";
});

// Animate trailing ring smoothly
function animateRing() {
  ringX += (dotX - ringX) * 0.19;
  ringY += (dotY - ringY) * 0.19;
  cometRing.style.left = ringX + "px";
  cometRing.style.top = ringY + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow ring on hover for interactive/clickable items
const selector = "a, button, input, textarea, .comet-chip, .comet-btn-social";
document.querySelectorAll(selector).forEach((el) => {
  el.addEventListener("mouseenter", () => cometRing.classList.add("active"));
  el.addEventListener("mouseleave", () => cometRing.classList.remove("active"));
});
