# محمد شامل — الموقع الشخصي | Mohammed Shamil — Personal Portfolio

موقع شخصي ثابت (SPA بصفحة واحدة)، ثيم داكن عصري، ثنائي اللغة (عربي RTL / إنجليزي LTR).
A single-page static portfolio, dark futuristic theme, bilingual (Arabic RTL / English LTR).

## التشغيل | Run

- افتح `index.html` مباشرة في المتصفح، أو
- ارفع المجلد كاملاً على GitHub Pages / Vercel / Netlify.

> ملاحظة: الخطوط تُحمَّل من Google Fonts، لذا يلزم اتصال بالإنترنت لظهورها بشكلها الصحيح.

## البنية | Structure

```
shamil-portfolio/
├── index.html            الصفحة الوحيدة
├── css/
│   └── style.css         التنسيق الكامل (يدعم RTL/LTR تلقائياً عبر الخصائص المنطقية)
├── js/
│   ├── lang.js           نصوص اللغتين (AR/EN) + زر التبديل
│   └── main.js           المهارات، الأنيميشن، الجسيمات، القائمة، النموذج
└── assets/
    └── images/
        └── profile.jpg   الصورة الشخصية
```

## الأقسام | Sections

1. **Hero** — الصورة الشخصية بإطار متدرج متوهج + اسم + عنوان بتأثير كتابة + جسيمات متحركة
2. **من أنا / About** — نبذة + بطاقة كود
3. **التحصيل الدراسي / Education** — خط زمني (بكالوريوس جامعة المعارف، دبلوم المعهد التقني الأنبار)
4. **مهاراتي / Skills** — 4 مجموعات، كل مهارة كشريحة (chip) بدون تقييمات
5. **تواصل / Contact** — بريد + نموذج يفتح تطبيق البريد

## تعديلات مطلوبة منك قبل النشر | TODO before publishing

- [ ] **فقرة "من أنا"** — عدّل النص في `js/lang.js` → `about.text` (عربي وإنجليزي)
- [ ] (اختياري) صورة OG لمشاركات السوشيال ميديا

## التقنيات | Tech

HTML5 + CSS3 + Vanilla JS — بدون أي مكتبات خارجية (الخطوط فقط من Google Fonts: Cairo للعربية، Space Grotesk للإنجليزية). الأنيميشن مبني على IntersectionObserver و CSS، مع دعم `prefers-reduced-motion`.
