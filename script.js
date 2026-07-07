"use strict";

/* ---------- helpers ---------- */
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const arrowSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`;

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Marquee ---------- */
const marqueeItems = [
  { label: "Figma", logo: "public/logos/figma.svg" },
  { label: "HTML", logo: "public/logos/html5.svg" },
  { label: "CSS", logo: "public/logos/css3.svg" },
  { label: "Tilda", logo: "public/logos/tilda.svg" },
  { label: "Photoshop", logo: "public/logos/photoshop.svg" },
  { label: "Adaptive Design" },
];

(function renderMarquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return;
  // Duplicate items enough times, then repeat the whole set twice so the
  // -50% translate loops seamlessly.
  const base = [...marqueeItems, ...marqueeItems];
  const full = [...base, ...base];
  track.innerHTML = full
    .map((item) => {
      const logo = item.logo
        ? `<img src="${item.logo}" alt="" aria-hidden="true" width="28" height="28" />`
        : "";
      return `<span class="marquee-item"><span class="marquee-bullet" aria-hidden="true"></span><span class="marquee-label">${logo}${item.label}</span></span>`;
    })
    .join("");
})();

/* ---------- Typewriter ---------- */
(function typewriter() {
  const el = document.querySelector("#typewriter .typewriter-text");
  if (!el) return;

  const words = ["Design"];
  const typingSpeed = 220;
  const deletingSpeed = 120;
  const pauseMs = 2400;

  if (prefersReduced) {
    el.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let text = "";
  let phase = "typing";

  function tick() {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        text = current.slice(0, text.length + 1);
        el.textContent = text;
        setTimeout(tick, typingSpeed);
      } else {
        phase = "deleting";
        setTimeout(tick, pauseMs);
      }
    } else {
      if (text.length > 0) {
        text = current.slice(0, text.length - 1);
        el.textContent = text;
        setTimeout(tick, deletingSpeed);
      } else {
        phase = "typing";
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, typingSpeed);
      }
    }
  }

  tick();
})();

/* ---------- Works data ---------- */
const images = [
  "public/works/work-1.png",
  "public/works/work-2.png",
  "public/works/work-3.png",
  "public/works/work-4.png",
  "public/works/work-5.png",
  "public/works/work-6.png",
];

const titles = [
  "Coffee Brand — Landing",
  "Analytics Dashboard",
  "Sneakers Store",
  "Fitness Tracker",
  "Photo Portfolio",
  "Travel Booking",
  "Food Delivery",
  "Crypto Wallet",
  "SaaS Landing",
  "Music Player",
  "Learning Platform",
  "Real Estate",
  "Event Tickets",
  "News Reader",
  "Recipe App",
  "Task Manager",
  "Weather App",
  "Podcast Studio",
  "Marketplace",
];

const works = [
  {
    title: "Формат — салон красоты",
    image: "public/works/formatnn.png",
    href: "https://formatnn.ru/",
    external: true,
  },
  {
    title: "Визуал План — шаблоны Google Таблиц",
    image: "public/works/visuelplan.png",
    href: "https://visuelplan.ru/",
    external: true,
  },
  {
    title: "ReadyMath School — поиск репетиторов",
    image: "public/works/readymath.png",
    href: "https://readymath.ru/",
    external: true,
  },
  {
    title: "Fashion Stylist — стилист Мария Луконина",
    image: "public/works/fashion-stylist.png",
    href: "https://fashion-stylist.pro/",
    external: true,
  },
  {
    title: "Wedding Cake — кондитерская Анны Ульяновой",
    image: "public/works/wedding-cake.png",
    href: "https://wedding-cake.ru/",
    external: true,
  },
  {
    title: "VIVA LA VIKA — ювелирный магазин украшений",
    image: "public/works/vivalavika.png",
    href: "https://vivalavika.com/",
    external: true,
  },
  {
    title: "Aroma Air — ароматы для бизнеса",
    image: "public/works/aromaair.png",
    href: "https://aromaair.uz/fragrances",
    external: true,
  },
  {
    title: "Berry Bouquet — ягодный бутик",
    image: "public/works/berry-bouquet.png",
    href: "https://www.berry-bouquet.ru/collection/sublimirovannye-yagody-v-shokolade",
    external: true,
  },
  {
    title: "Cat Society — котокафе в Ставрополе",
    image: "public/works/catsocietybar.png",
    href: "https://catsocietybar.site/",
    external: true,
  },
  ...titles.map((title, i) => ({
    title,
    image: images[i % images.length],
    href: "#",
    external: false,
  })),
];

const MAX_WORKS = 10;

const grid = document.getElementById("works-grid");

/* ---------- Reveal on scroll ---------- */
let revealObserver = null;
if (!prefersReduced && "IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
}

function observeReveal(el, delay) {
  if (!revealObserver) {
    el.classList.add("is-visible");
    return;
  }
  el.style.transitionDelay = `${delay || 0}ms`;
  revealObserver.observe(el);
}

// Observe the static heading
document.querySelectorAll(".reveal").forEach((el) => observeReveal(el, 0));

/* ---------- Render works ---------- */
function renderWorks() {
  const visible = works.slice(0, MAX_WORKS);

  grid.innerHTML = visible
    .map((work, i) => {
      const attrs = work.external
        ? ` target="_blank" rel="noopener noreferrer"`
        : "";
      return `
      <div class="reveal" data-delay="${(i % 2) * 100}">
        <a class="work-card" href="${work.href}"${attrs}>
          <div class="work-thumb">
            <img src="${work.image}" alt="${work.title}" loading="lazy" />
            <span class="work-overlay"></span>
            <span class="work-arrow">${arrowSvg}</span>
          </div>
          <p class="work-name">${work.title}</p>
        </a>
      </div>`;
    })
    .join("");

  grid.querySelectorAll(".reveal").forEach((el) => {
    observeReveal(el, Number(el.dataset.delay));
  });
}

renderWorks();
