/* ============================================================
   main.js — rendering, animations, navigation, contact form
   ============================================================ */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Skills data ---------- */
  const SKILL_GROUPS = [
    { key: "skills.g1", items: ["HTML5", "CSS3", "JavaScript", "React.js"] },
    { key: "skills.g2", items: ["Node.js", "PHP", "Python", "MySQL", "MongoDB"] },
    { key: "skills.g3", items: ["React Native"] },
    { key: "skills.g4", items: ["Git & GitHub", "VS Code", "Figma"] }
  ];

  function renderSkills() {
    const grid = $("#skillsGrid");
    if (!grid) return;
    grid.innerHTML = SKILL_GROUPS.map((g) => `
      <div class="skill-card glass reveal">
        <h3 data-i18n="${g.key}"></h3>
        <div class="chips">
          ${g.items.map((name) => `<span class="chip">${name}</span>`).join("")}
        </div>
      </div>`).join("");
  }

  /* ---------- Typing effect for hero role ---------- */
  let typeToken = 0;
  function typeRole(text) {
    const el = $("#typed");
    if (!el) return;
    const my = ++typeToken;
    if (reducedMotion) { el.textContent = text; return; }
    el.textContent = "";
    let i = 0;
    (function step() {
      if (my !== typeToken) return;
      i++;
      el.textContent = text.slice(0, i);
      if (i < text.length) setTimeout(step, 55);
    })();
  }

  document.addEventListener("langchange", (e) => {
    const dict = window.CONTENT && window.CONTENT[e.detail];
    if (dict) typeRole(dict.hero.role);
  });

  /* ---------- Init language (from lang.js) ---------- */
  renderSkills();
  window.initLang();

  /* ---------- Navbar: solid on scroll ---------- */
  const navbar = $("#navbar");
  function onScroll() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveal on scroll + skill bars ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in");
        io.unobserve(el);
        setTimeout(() => { el.style.transitionDelay = ""; }, 900);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => {
      el.classList.add("in");
    });
  }

  /* ---------- Hero particles ---------- */
  const canvas = $("#particles");
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext("2d");
    const COLORS = ["108,99,255", "0,212,255"];
    let particles = [];
    let raf = null;

    function resize() {
      const hero = canvas.parentElement;
      canvas.width = hero.clientWidth;
      canvas.height = hero.clientHeight;
      const count = Math.min(60, Math.floor(canvas.width / 24));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.5)`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108,99,255,${0.14 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        draw();
      }
    });
  }

  /* ---------- Contact form → mailto ---------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#fName").value.trim();
      const email = $("#fEmail").value.trim();
      const message = $("#fMessage").value.trim();
      if (!name || !email || !message) return;
      const subject = encodeURIComponent(`Portfolio contact — ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href =
        `mailto:alheety330@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
