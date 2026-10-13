/* ============================================================
   lang.js — Bilingual content (AR + EN) and language switching
   Arabic is primary (RTL). English is secondary (LTR).
   ============================================================ */

const CONTENT = {
  ar: {
    meta: {
      title: "محمد شامل | مطور ويب وتطبيقات موبايل",
      desc: "الموقع الشخصي لمحمد شامل — مطور ويب وتطبيقات موبايل. المهارات، التحصيل الدراسي، والتواصل."
    },
    nav: {
      logo: "محمد شامل",
      about: "من أنا",
      education: "التحصيل الدراسي",
      skills: "مهاراتي",
      contact: "تواصل"
    },
    hero: {
      greeting: "مرحباً، أنا",
      name: "محمد شامل",
      role: "مطور ويب وتطبيقات موبايل",
      tagline: "أبني تجارب رقمية سريعة وأنيقة للويب والموبايل — من الفكرة إلى الإطلاق.",
      cta: { contact: "تواصل معي", skills: "استعرض مهاراتي" }
    },
    about: {
      label: "نبذة",
      title: "من أنا",
      text: "مطور شغوف بتطوير حلول تقنية مبتكرة في مجال الويب والموبايل. أسعى دائماً لتقديم تجارب رقمية عالية الجودة تجمع بين الأداء والجماليات، مع اهتمام دقيق بالتفاصيل وتجربة المستخدم. حاصل على بكالوريوس علوم الحاسوب، وأواصل تطوير مهاراتي يومياً في تقنيات الويب الحديثة وتطوير التطبيقات."
    },
    edu: {
      label: "المسير التعليمي",
      title: "التحصيل الدراسي",
      b: { degree: "بكالوريوس علوم الحاسوب", inst: "جامعة المعارف" },
      d: { degree: "دبلوم تقنيات علوم الحاسوب", inst: "المعهد التقني الأنبار" },
      done: "مكتمل ✓",
      done2: "مكتمل ✓"
    },
    skills: {
      label: "الأدوات والتقنيات",
      title: "مهاراتي",
      g1: "تطوير الواجهات الأمامية",
      g2: "البرمجة الخلفية وقواعد البيانات",
      g3: "تطوير تطبيقات الموبايل",
      g4: "أدوات أخرى"
    },
    contact: {
      label: "لنبنِ شيئاً معاً",
      title: "تواصل معي",
      text: "هل لديك مشروع أو فرصة عمل؟ راسلني وسأرد عليك بأسرع وقت.",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "رسالتك",
        send: "إرسال",
        note: "النموذج يفتح تطبيق البريد الإلكتروني لديك مباشرةً."
      }
    },
    footer: { text: "© 2026 محمد شامل — جميع الحقوق محفوظة" }
  },

  en: {
    meta: {
      title: "Mohammed Shamil | Web & Mobile Developer",
      desc: "Personal website of Mohammed Shamil — Web & Mobile Developer. Skills, education, and contact."
    },
    nav: {
      logo: "Mohammed Shamil",
      about: "About",
      education: "Education",
      skills: "Skills",
      contact: "Contact"
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Mohammed Shamil",
      role: "Web & Mobile Developer",
      tagline: "I build fast, elegant digital experiences for web and mobile — from idea to launch.",
      cta: { contact: "Get in Touch", skills: "View My Skills" }
    },
    about: {
      label: "About",
      title: "About Me",
      text: "A passionate developer focused on building innovative web and mobile solutions. I always aim to deliver high-quality digital experiences that combine performance with aesthetics, with close attention to detail and user experience. I hold a B.Sc. in Computer Science and keep sharpening my skills in modern web and app technologies every day."
    },
    edu: {
      label: "Academic Path",
      title: "Education",
      b: { degree: "B.Sc. in Computer Science", inst: "Al-Maarif University" },
      d: { degree: "Diploma in Computer Science Technologies", inst: "Anbar Technical Institute" },
      done: "Completed ✓",
      done2: "Completed ✓"
    },
    skills: {
      label: "Tools & Technologies",
      title: "My Skills",
      g1: "Frontend Development",
      g2: "Backend & Databases",
      g3: "Mobile Development",
      g4: "Other Tools"
    },
    contact: {
      label: "Let's build something together",
      title: "Get in Touch",
      text: "Have a project or an opportunity? Drop me a line and I'll get back to you shortly.",
      form: {
        name: "Name",
        email: "Email",
        message: "Your message",
        send: "Send",
        note: "This form opens your email app directly."
      }
    },
    footer: { text: "© 2026 Mohammed Shamil — All rights reserved" }
  }
};

window.CONTENT = CONTENT;

let currentLang = "ar";

function t(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function applyLang(lang) {
  currentLang = lang;
  const dict = CONTENT[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", lang === "ar");
  document.body.classList.toggle("lang-en", lang === "en");
  document.title = dict.meta.title;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", dict.meta.desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(dict, el.dataset.i18n);
    if (v != null) el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = t(dict, el.dataset.i18nPh);
    if (v != null) el.placeholder = v;
  });

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = lang === "ar" ? "EN" : "عربي";

  try { localStorage.setItem("shamil-lang", lang); } catch (e) { /* private mode */ }

  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
}

window.applyLang = applyLang;

window.initLang = function () {
  let saved = null;
  try { saved = localStorage.getItem("shamil-lang"); } catch (e) { /* ignore */ }
  applyLang(saved === "en" ? "en" : "ar");

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      applyLang(currentLang === "ar" ? "en" : "ar");
    });
  }
};
