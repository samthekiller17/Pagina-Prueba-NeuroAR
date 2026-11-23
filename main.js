/* ==========================================================================
   NeuroAr — main.js
   1 Idioma ES|EN · 2 Menú móvil · 3 Anclas heredadas · 4 Progreso de lectura
   5 Red neuronal del hero · 6 Rotador de palabras · 7 Demo go / no-go
   8 Preselección de servicio · 9 Formulario · 10 Widget · 11 Scrollspy
   12 Lightbox · 13 Reveal · 14 Spotlight · 15 Imágenes ausentes
   Cada bloque se activa solo si sus elementos existen, así el mismo archivo
   sirve para index.html y sostenibilidad.html.
   ========================================================================== */
(() => {
  'use strict';

  /* ---- Configuración ---------------------------------------------------- */
  const CONFIG = {
    // URL que recibe el formulario (POST, multipart). Si queda vacía, el
    // formulario abre el correo del usuario con el mensaje ya redactado.
    formEndpoint: '',
    email: 'Gerencia@neuroar.com.co',
    whatsapp: '573003743575',
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Idioma ES | EN ------------------------------------------------
     El español vive en el HTML. Aquí solo está el inglés; al volver a ES se
     restaura el contenido original guardado. Los textos son estáticos y de
     confianza, por eso se permite marcado simple (<strong>, <b>).            */
  const EN = {
    skip: 'Skip to content',
    'nav.menu': 'Menu',
    'nav.method': 'Method',
    'nav.solutions': 'Solutions',
    'nav.try': 'Try it',
    'nav.sectors': 'Sectors',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dmaic': 'DMAIC + AI',
    'nav.cognitive': 'NeuroAr Cognitive',
    'nav.app': 'NeuroAr App',
    'cta.demo': 'Book a demo',
    'cta.diagnosis': 'Book a demo',
    'cta.try': 'Test your mind',
    'cta.talk': 'Let’s talk about this',

    'hero.tag': 'Neurotechnology made in Colombia',
    'hero.title.a': 'Technology for',
    'hero.title.b': 'the mind that',
    'hero.title.sr': 'learns, recovers, finds its path, works safely and decides with data.',
    'hero.lead': 'We combine <strong>neuroscience</strong>, <strong>virtual reality</strong> and <strong>artificial intelligence</strong> to assess, rehabilitate and enhance human abilities, in clinics, schools, companies, industry and government.',
    'hero.eq.1': 'science',
    'hero.eq.2': 'extended reality',
    'hero.eq.3': 'predictive analytics',

    'method.eyebrow': 'The NeuroAr method',
    'method.title.a': 'Virtual reality is not the show.',
    'method.title.b': 'It is the measuring instrument.',
    'method.lead': 'Every immersive experience we design produces data on how a person pays attention, remembers, decides and reacts. AI turns that data into decisions.',
    'method.1.t': 'Immerse',
    'method.1.p': 'Controlled, safe virtual reality scenarios: cognitive tasks, job simulations or everyday situations.',
    'method.2.t': 'Measure',
    'method.2.p': 'Attention, memory, reaction time, executive functions and task performance, recorded objectively.',
    'method.3.t': 'Predict',
    'method.3.p': 'Artificial intelligence and predictive analytics to detect patterns, risks and opportunities in each profile or team.',
    'method.4.t': 'Enhance',
    'method.4.p': 'Training, rehabilitation or improvement plans that adapt every session, with results you can prove.',

    'sol.eyebrow': 'What we do',
    'sol.title': 'One technology core, four ways to transform people and organizations.',
    'uni.1.chip': 'Health',
    'uni.1.t': 'Neurorehabilitation and cognitive health',
    'uni.1.p': 'Virtual reality tools for health professionals to assess, stimulate and track their patients’ cognitive functions.',
    'uni.2.chip': 'Education',
    'uni.2.t': 'Career guidance and immersive learning',
    'uni.2.p': 'We help students discover their vocation with evidence, and schools and universities teach through experiences people live.',
    'uni.2.test': 'Take the career test',
    'uni.3.chip': 'Industry and business',
    'uni.3.t': 'Immersive training and continuous improvement',
    'uni.3.p': 'We simulate critical, high-risk tasks to train without exposing anyone, and combine Lean Six Sigma with AI to improve processes with measurable results.',
    'uni.3.dmaic': 'See the DMAIC + AI method',
    'uni.4.chip': 'Software and AI',
    'uni.4.t': 'Custom software and predictive analytics',
    'uni.4.p': 'Applications, platforms and AI assistants built on your data to automate tasks and anticipate decisions.',
    'green.t': 'NeuroAr Sustainability',
    'green.p': 'Virtual reality for environmental awareness and efficient use of resources.',

    'try.eyebrow': 'Try it now · 30 seconds',
    'try.title': 'How fast does your brain decide?',
    'try.lead': 'This is a minimal version of a classic neuroscience task (go / no-go) that measures attention and impulse control.',
    'try.rule.1': 'If a <b>cyan</b> circle appears, tap or press the space bar as fast as you can.',
    'try.rule.2': 'If it is <b>violet</b>, do nothing.',
    'try.note': 'A playful demo: not a clinical assessment and no data is stored. With NeuroAr Cognitive we measure this and much more, in virtual reality and with professional protocols.',
    'try.start': 'Tap here to start',
    'try.r.rt': 'Average reaction',
    'try.r.hits': 'Hits',
    'try.r.imp': 'Unchecked impulses',
    'try.retry': 'Try again',
    'try.cta': 'I want this for my organization',

    'cog.eyebrow': 'Product · NeuroAr Cognitive',
    'cog.title': 'A neuroscience lab that fits in a headset.',
    'cog.lead': 'Cognitive testing and training in virtual reality, with results professionals review in the NeuroAr app.',
    'cog.l1': 'Immersive, standardized and repeatable cognitive tests',
    'cog.l2': 'Works with Meta Quest 2, 3 and 3S',
    'cog.l3': 'Results and follow-up at app.neuroar.com.co',
    'cog.l4': 'For health, education and talent teams',
    'cog.app': 'Open the app',
    'cog.brochure': 'Download brochure',

    'sec.eyebrow': 'Where we work',
    'sec.title': 'Six sectors, one purpose: more capable people.',
    'sec.1.t': 'Health', 'sec.1.p': 'Clinics, healthcare providers and rehabilitation professionals.',
    'sec.2.t': 'Education', 'sec.2.p': 'Schools and universities that teach and guide differently.',
    'sec.3.t': 'Mining and industry', 'sec.3.p': 'Technical training, safety and productivity.',
    'sec.4.t': 'Companies', 'sec.4.p': 'Talent, knowledge and processes.',
    'sec.5.t': 'Government', 'sec.5.p': 'Public innovation and well-being programs.',
    'sec.6.t': 'Foundations', 'sec.6.p': 'Social projects with measurable impact.',

    'dmaic.eyebrow': 'For business and industry · Lean Six Sigma + AI',
    'dmaic.title': 'Improvement agents: from challenges to measurable results.',
    'dmaic.lead': 'An external team combining DMAIC, artificial intelligence and custom development to diagnose, implement and sustain improvements, without permanently growing your engineering staff.',

    'ref.eyebrow': 'Track record and connections',
    'ref.title': 'Organizations we have built a path with',
    'about.eyebrow': 'Who we are',
    'about.title': 'We believe the most powerful technology is the one that understands people.',
    'about.lead': 'NeuroAr is a Colombian technology-based company. We combine neuroscience, virtual reality, artificial intelligence and software development to solve real needs of health and education institutions, companies, industry and government.',
    'about.hq': 'Headquarters',

    'contact.eyebrow': 'Let’s work together',
    'contact.title': 'Which human ability do you want to enhance?',
    'contact.lead': 'Tell us your challenge: a rehabilitation program, a career guidance process, high-risk training or a process that needs to improve. We will reply with a concrete proposal.',
    'contact.mail': 'Email',
    'form.name': 'Full name',
    'form.company': 'Company or institution',
    'form.optional': '(optional)',
    'form.email': 'Email',
    'form.phone': 'Phone / WhatsApp',
    'form.service': 'Service of interest',
    'form.message': 'How can we help?',
    'form.consent': 'I agree to the processing of my data to answer this request.',
    'form.submit': 'Send request',

    'footer.tagline': 'Neuroscience · Virtual reality · Artificial intelligence',
    'footer.test': 'Career test',
    'footer.sustainability': 'Sustainability',

    'widget.toggle': 'Let’s talk?',
    'widget.status': 'Available now',
    'widget.hello': 'Hi! I am the NeuroAr assistant.',
    'widget.ask': 'What kind of organization are you looking for a solution for?',
    'widget.t1': 'Health',
    'widget.t2': 'Education',
    'widget.t3': 'Business or industry',
    'widget.whatsapp': 'Continue on WhatsApp',
    'widget.form': 'I prefer to leave my details in the form',
  };

  const EN_PLACEHOLDERS = {
    'form.name': 'Your name',
    'form.company': 'Your organization',
    'form.email': 'you@company.com',
    'form.phone': 'e.g. 300 000 0000',
    'form.message': 'Briefly describe your challenge or project',
  };

  const MESSAGES = {
    es: {
      required: 'Este campo es obligatorio.',
      email: 'Escribe un correo válido.',
      sending: 'Enviando…',
      sent: '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.',
      failed: `No pudimos enviar el formulario. Escríbenos a ${CONFIG.email} o por WhatsApp.`,
      mailto: 'Abriendo tu aplicación de correo con el mensaje listo para enviar.',
      words: ['aprende.', 'se recupera.', 'elige su futuro.', 'trabaja segura.', 'decide con datos.'],
      labGet: 'Prepárate…',
      labTooSoon: '¡Muy pronto! Espera el círculo.',
      labLive: (n, t) => `Ensayo ${n} de ${t}`,
      labDone: 'Resultado listo',
      labFast: 'Reacción veloz y buen control de impulsos. Tu cerebro decide rápido… y frena a tiempo.',
      labImpulsive: 'Rápido, pero con impulsos que se escaparon. Ese equilibrio entre velocidad y control es justo lo que entrenamos.',
      labSteady: 'Preciso y cuidadoso. En una evaluación completa veríamos cómo se sostiene tu atención con el tiempo.',
      labMissed: 'Varios estímulos se escaparon. La atención fluctúa, y medir esa fluctuación es parte de lo que hacemos.',
    },
    en: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      sending: 'Sending…',
      sent: 'Thanks! We received your request and will contact you soon.',
      failed: `We could not send the form. Please write to ${CONFIG.email} or use WhatsApp.`,
      mailto: 'Opening your email app with the message ready to send.',
      words: ['learns.', 'recovers.', 'finds its path.', 'works safely.', 'decides with data.'],
      labGet: 'Get ready…',
      labTooSoon: 'Too soon! Wait for the circle.',
      labLive: (n, t) => `Trial ${n} of ${t}`,
      labDone: 'Result ready',
      labFast: 'Fast reactions and solid impulse control. Your brain decides quickly… and brakes in time.',
      labImpulsive: 'Fast, but some impulses got through. That balance between speed and control is exactly what we train.',
      labSteady: 'Accurate and careful. A full assessment would show how your attention holds up over time.',
      labMissed: 'Several stimuli slipped by. Attention fluctuates, and measuring that is part of what we do.',
    },
  };

  let lang = 'es';
  const msg = (key) => MESSAGES[lang][key];
  const langListeners = [];

  function setLang(next) {
    lang = next;
    document.documentElement.lang = next;

    $$('[data-i18n]').forEach((el) => {
      if (!('i18nEs' in el.dataset)) el.dataset.i18nEs = el.innerHTML; // guarda el original ES
      el.innerHTML = next === 'en' ? (EN[el.dataset.i18n] ?? el.dataset.i18nEs) : el.dataset.i18nEs;
    });

    $$('[data-i18n-placeholder]').forEach((el) => {
      if (!('i18nPhEs' in el.dataset)) el.dataset.i18nPhEs = el.placeholder;
      el.placeholder = next === 'en'
        ? (EN_PLACEHOLDERS[el.dataset.i18nPlaceholder] ?? el.dataset.i18nPhEs)
        : el.dataset.i18nPhEs;
    });

    $$('.lang-switch button').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === next));
    });

    langListeners.forEach((fn) => fn(next));
    try { localStorage.setItem('neuroar-lang', next); } catch (_) { /* almacenamiento bloqueado */ }
  }

  $$('.lang-switch button').forEach((button) => {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  });

  /* ---- 2. Menú móvil accesible ----------------------------------------- */
  const nav = $('#site-nav');
  const navToggle = $('#nav-toggle');

  if (nav && navToggle) {
    const setMenu = (open) => {
      nav.dataset.open = String(open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.classList.toggle('is-open', open);
    };
    navToggle.addEventListener('click', () => setMenu(nav.dataset.open !== 'true'));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.dataset.open === 'true') { setMenu(false); navToggle.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));
  }

  /* ---- 3. Anclas heredadas → secciones nuevas ---------------------------
     Por si existen enlaces guardados a la estructura anterior del sitio.    */
  const LEGACY_ANCHORS = {
    '#detalle-software': '#software',
    '#detalle-ia': '#software',
    '#panel-software-ia': '#software',
    '#detalle-plataformas': '#industria',
    '#conocimiento': '#industria',
    '#panel-dmaic-ia': '#dmaic',
    '#detalle-industrial': '#industria',
    '#detalle-realidad-virtual': '#inmersivo',
    '#panel-cognitivo': '#inmersivo',
    '#detalle-educacion': '#educacion',
    '#panel-sostenibilidad': '#soluciones',
    '#presencia': '#nosotros',
  };
  const followLegacyAnchor = () => {
    const target = LEGACY_ANCHORS[location.hash] && $(LEGACY_ANCHORS[location.hash]);
    if (!target) return;
    history.replaceState(null, '', LEGACY_ANCHORS[location.hash]);
    target.scrollIntoView();
  };
  followLegacyAnchor();
  window.addEventListener('hashchange', followLegacyAnchor);

  /* ---- 4. Progreso de lectura ------------------------------------------ */
  const progressBar = $('#read-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      progressBar.style.transform = `scaleX(${Math.min(Math.max(window.scrollY / total, 0), 1)})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  /* ---- 5. Red neuronal del hero -----------------------------------------
     Nodos dentro de la silueta 3D de un cerebro (vista lateral), conectados
     con sus vecinos. Impulsos eléctricos viajan por las conexiones y se
     encadenan; el cursor "estimula" las neuronas cercanas. Sin librerías.
     Con "reducir movimiento" se dibuja un único fotograma estático.         */
  const heroCanvas = $('#hero-canvas');
  const heroSection = $('.hero');

  if (heroCanvas && heroSection && heroCanvas.getContext) {
    const ctx = heroCanvas.getContext('2d');
    const nodes = [];
    const pulses = [];
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let scale = 1;
    let frameId = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    // ¿Está (x, y, z) dentro del cerebro? Coordenadas normalizadas ~[-1, 1].
    const insideBrain = (x, y, z) => {
      const cerebrum = (x * x) / 1.0 + ((y + 0.08) ** 2) / 0.52 + (z * z) / 0.62 <= 1 && y < 0.5 - 0.18 * x;
      const cerebellum = ((x - 0.52) ** 2) / 0.09 + ((y - 0.5) ** 2) / 0.04 + (z * z) / 0.2 <= 1;
      const stem = Math.abs(x - 0.22) < 0.09 && y > 0.3 && y < 0.95 && Math.abs(z) < 0.1;
      const fissure = Math.abs(z) < 0.035 && y < 0.25; // separa los dos hemisferios
      return (cerebrum || cerebellum || stem) && !fissure;
    };

    const build = () => {
      nodes.length = 0;
      pulses.length = 0;
      const target = width < 700 ? 200 : 380;
      let guard = 0;
      while (nodes.length < target && guard < 40000) {
        guard += 1;
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const z = Math.random() * 2 - 1;
        if (!insideBrain(x, y, z)) continue;
        // Sesgo hacia la "corteza": más nodos cerca de la superficie
        const shell = (x * x) + ((y + 0.08) ** 2) / 0.52 + (z * z) / 0.62;
        if (shell < 0.62 && Math.random() < 0.85) continue;
        nodes.push({ x, y, z, links: [], energy: 0, seed: Math.random() * Math.PI * 2, sx: 0, sy: 0, depth: 0 });
      }
      // Vecinos más cercanos (3D)
      nodes.forEach((node, i) => {
        const distances = [];
        nodes.forEach((other, j) => {
          if (i === j) return;
          const d = (node.x - other.x) ** 2 + (node.y - other.y) ** 2 + (node.z - other.z) ** 2;
          if (d < 0.06) distances.push([d, j]);
        });
        distances.sort((a, b) => a[0] - b[0]);
        node.links = distances.slice(0, 3).map(([, j]) => j);
      });
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = heroSection.clientWidth;
      height = heroSection.clientHeight;
      heroCanvas.width = Math.round(width * ratio);
      heroCanvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const wide = width >= 900;
      cx = wide ? width * 0.7 : width * 0.5;
      cy = wide ? height * 0.48 : height * 0.36;
      scale = wide ? Math.min(width * 0.27, height * 0.55) : Math.min(width * 0.46, height * 0.3);
      build();
    };

    const spawnPulse = (from) => {
      const node = nodes[from];
      if (!node || !node.links.length || pulses.length > 70) return;
      const to = node.links[Math.floor(Math.random() * node.links.length)];
      pulses.push({ from, to, t: 0, speed: 0.025 + Math.random() * 0.03, hops: 2 + Math.floor(Math.random() * 4) });
    };

    // Mezcla cian → violeta → magenta según la posición
    const colorAt = (u, alpha) => {
      const stops = [[34, 211, 238], [167, 139, 250], [232, 121, 249]];
      const k = Math.min(Math.max(u, 0), 1) * 2;
      const i = Math.min(Math.floor(k), 1);
      const f = k - i;
      const c = stops[i].map((v, n) => Math.round(v + (stops[i + 1][n] - v) * f));
      return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const yaw = Math.sin(time * 0.00022) * 0.32;
      const pitch = Math.sin(time * 0.00017) * 0.08 - 0.05;
      const cosY = Math.cos(yaw); const sinY = Math.sin(yaw);
      const cosP = Math.cos(pitch); const sinP = Math.sin(pitch);

      // Proyección
      nodes.forEach((n) => {
        const breathe = 1 + Math.sin(time * 0.0012 + n.seed) * 0.008;
        const x1 = (n.x * cosY - n.z * sinY) * breathe;
        const z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosP - z1 * sinP;
        const z2 = n.y * sinP + z1 * cosP;
        const persp = 2.6 / (2.6 + z2);
        n.sx = cx + x1 * scale * persp;
        n.sy = cy + y1 * scale * persp;
        n.depth = (1 - z2) / 2; // 0 lejos → 1 cerca
        n.persp = persp;
        n.u = (x1 + 1) / 2;
        if (pointer.active) {
          const d = Math.hypot(n.sx - pointer.x, n.sy - pointer.y);
          if (d < 90) n.energy = Math.min(1, n.energy + (1 - d / 90) * 0.12);
        }
        n.energy *= 0.955;
      });

      // Conexiones
      ctx.lineWidth = 0.7;
      nodes.forEach((n) => {
        n.links.forEach((j) => {
          const m = nodes[j];
          if (j < 0) return;
          const glow = Math.max(n.energy, m.energy);
          const alpha = 0.05 + n.depth * 0.12 + glow * 0.5;
          ctx.strokeStyle = colorAt(n.u, alpha);
          ctx.beginPath(); ctx.moveTo(n.sx, n.sy); ctx.lineTo(m.sx, m.sy); ctx.stroke();
        });
      });

      // Impulsos que viajan y se encadenan
      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        p.t += p.speed;
        const a = nodes[p.from]; const b = nodes[p.to];
        if (p.t >= 1) {
          b.energy = Math.min(1, b.energy + 0.6);
          pulses.splice(i, 1);
          if (p.hops > 0 && b.links.length) {
            const next = b.links[Math.floor(Math.random() * b.links.length)];
            if (next !== p.from) pulses.push({ from: p.to, to: next, t: 0, speed: p.speed, hops: p.hops - 1 });
          }
          continue;
        }
        const x = a.sx + (b.sx - a.sx) * p.t;
        const y = a.sy + (b.sy - a.sy) * p.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 9);
        grad.addColorStop(0, colorAt(a.u, 0.95));
        grad.addColorStop(1, colorAt(a.u, 0));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
      }

      // Nodos
      nodes.forEach((n) => {
        const r = (0.8 + n.depth * 1.6 + n.energy * 2.4) * n.persp;
        ctx.fillStyle = colorAt(n.u, 0.25 + n.depth * 0.55 + n.energy * 0.4);
        ctx.beginPath(); ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2); ctx.fill();
        if (n.energy > 0.35) {
          ctx.fillStyle = colorAt(n.u, n.energy * 0.18);
          ctx.beginPath(); ctx.arc(n.sx, n.sy, r * 5, 0, Math.PI * 2); ctx.fill();
        }
      });

      if (Math.random() < 0.22) spawnPulse(Math.floor(Math.random() * nodes.length));
      if (pointer.active && Math.random() < 0.5) {
        const near = nodes.findIndex((n) => Math.hypot(n.sx - pointer.x, n.sy - pointer.y) < 50);
        if (near >= 0) spawnPulse(near);
      }

      if (!reducedMotion && visible) frameId = window.requestAnimationFrame(draw);
      else frameId = 0;
    };

    resize();
    if (reducedMotion) draw(0);
    else frameId = window.requestAnimationFrame(draw);

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { resize(); if (reducedMotion) draw(0); }, 150);
    });

    heroSection.addEventListener('pointermove', (event) => {
      const rect = heroSection.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });
    heroSection.addEventListener('pointerleave', () => { pointer.active = false; });

    if ('IntersectionObserver' in window && !reducedMotion) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frameId) frameId = window.requestAnimationFrame(draw);
      }, { threshold: 0.02 }).observe(heroSection);
    }
  }

  /* ---- 6. Rotador de palabras del titular ------------------------------- */
  const rotator = $('#rotator');
  if (rotator) {
    let index = 0;
    let paused = false;
    const showWord = () => { rotator.textContent = msg('words')[index % msg('words').length]; };
    langListeners.push(showWord);
    const hero = rotator.closest('h1');
    hero.addEventListener('pointerenter', () => { paused = true; });
    hero.addEventListener('pointerleave', () => { paused = false; });

    if (!reducedMotion) {
      window.setInterval(() => {
        if (paused || document.hidden) return;
        rotator.classList.add('is-out');
        window.setTimeout(() => {
          index += 1;
          showWord();
          rotator.classList.remove('is-out');
        }, 350);
      }, 2600);
    }
  }

  /* ---- 7. Demo go / no-go ----------------------------------------------
     12 ensayos (8 "go" cian, 4 "no-go" violeta) en orden aleatorio.
     Mide tiempo de reacción en aciertos y errores de comisión (impulsos).   */
  const stage = $('#lab-stage');
  if (stage) {
    const target = $('#lab-target');
    const counter = $('#lab-counter');
    const message = $('#lab-msg');
    const results = $('#lab-results');
    const live = $('#lab-live');
    const TOTAL = 12;
    const GO_COUNT = 8;

    let state = 'idle'; // idle | running | done
    let trials = [];
    let current = -1;
    let stimulusOn = false;
    let shownAt = 0;
    let responded = false;
    let timer = 0;
    let rts = [];
    let commissions = 0;
    let omissions = 0;

    const pad = (n) => String(n).padStart(2, '0');
    const flash = (kind) => {
      stage.classList.remove('flash-ok', 'flash-bad');
      void stage.offsetWidth; // reinicia la animación
      stage.classList.add(kind);
      window.setTimeout(() => stage.classList.remove(kind), 220);
    };

    const shuffle = (list) => {
      for (let i = list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      return list;
    };

    const finish = () => {
      state = 'done';
      stage.classList.remove('is-running');
      target.className = 'lab__target';
      message.textContent = msg('labDone');
      const mean = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : null;
      $('#res-rt').textContent = mean ? `${mean} ms` : '—';
      $('#res-hits').textContent = `${rts.length} / ${GO_COUNT}`;
      $('#res-imp').textContent = `${commissions} / ${TOTAL - GO_COUNT}`;
      let verdict = 'labSteady';
      if (omissions >= 3) verdict = 'labMissed';
      else if (commissions >= 2) verdict = 'labImpulsive';
      else if (mean && mean < 430) verdict = 'labFast';
      $('#res-text').textContent = msg(verdict);
      results.hidden = false;
      live.textContent = `${msg('labDone')}. ${$('#res-rt').textContent}. ${msg(verdict)}`;
    };

    const nextTrial = () => {
      current += 1;
      if (current >= TOTAL) { finish(); return; }
      counter.textContent = `${pad(current + 1)} / ${pad(TOTAL)}`;
      target.className = 'lab__target';
      stimulusOn = false;
      responded = false;
      const wait = 650 + Math.random() * 1100;
      timer = window.setTimeout(() => {
        const isGo = trials[current];
        target.classList.add(isGo ? 'is-go' : 'is-nogo');
        stimulusOn = true;
        shownAt = performance.now();
        timer = window.setTimeout(() => {
          if (isGo && !responded) omissions += 1;
          target.className = 'lab__target';
          stimulusOn = false;
          nextTrial();
        }, isGo ? 850 : 1000);
      }, wait);
    };

    const start = () => {
      state = 'running';
      trials = shuffle([...Array(GO_COUNT).fill(true), ...Array(TOTAL - GO_COUNT).fill(false)]);
      current = -1;
      rts = []; commissions = 0; omissions = 0;
      results.hidden = true;
      stage.classList.add('is-running');
      live.textContent = msg('labGet');
      nextTrial();
    };

    const respond = () => {
      if (state !== 'running') return;
      if (!stimulusOn) { flash('flash-bad'); return; } // anticipación
      if (responded) return;
      responded = true;
      const isGo = trials[current];
      if (isGo) {
        rts.push(performance.now() - shownAt);
        flash('flash-ok');
      } else {
        commissions += 1;
        flash('flash-bad');
      }
      // Pasa al siguiente ensayo sin esperar el tiempo restante
      window.clearTimeout(timer);
      target.className = 'lab__target';
      stimulusOn = false;
      timer = window.setTimeout(nextTrial, 250);
    };

    stage.addEventListener('pointerdown', (event) => {
      if (state === 'running') { event.preventDefault(); respond(); }
    });
    stage.addEventListener('click', () => { if (state !== 'running') start(); });
    document.addEventListener('keydown', (event) => {
      if (state !== 'running' || (event.code !== 'Space' && event.key !== ' ')) return;
      event.preventDefault(); // evita que la página se desplace
      if (!event.repeat) respond();
    });
    $('#lab-retry').addEventListener('click', () => { stage.focus(); start(); });
  }

  /* ---- 8. Preselección de servicio en el formulario ---------------------- */
  const serviceSelect = $('#servicio');
  const LEGACY_SERVICES = { 'cognitivo-vr': 'neuro-salud', conocimiento: 'industria-vr' };

  if (serviceSelect) {
    let fromQuery = new URLSearchParams(location.search).get('servicio');
    if (fromQuery in LEGACY_SERVICES) fromQuery = LEGACY_SERVICES[fromQuery];
    if (fromQuery && $(`option[value="${CSS.escape(fromQuery)}"]`, serviceSelect)) serviceSelect.value = fromQuery;

    $$('[data-service]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        serviceSelect.value = trigger.dataset.service;
        $('#contacto').scrollIntoView();
        history.replaceState(null, '', '#contacto');
        window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 500);
      });
    });
  }

  /* ---- 9. Formulario de contacto ---------------------------------------- */
  const form = $('#contact-form');

  if (form) {
    const status = $('#form-status');
    const submitButton = $('button[type="submit"]', form);
    const requiredFields = $$('[required]', form);

    const setError = (field, text) => {
      const errorBox = document.getElementById(`error-${field.name}`);
      field.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (errorBox) errorBox.textContent = text;
    };
    const validateField = (field) => {
      if (field.validity.valid) { setError(field, ''); return true; }
      setError(field, field.validity.typeMismatch ? msg('email') : msg('required'));
      return false;
    };
    requiredFields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); });
    });
    const setStatus = (text, state = 'info') => { status.textContent = text; status.dataset.state = state; };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const invalid = requiredFields.filter((field) => !validateField(field));
      if (invalid.length) { invalid[0].focus(); return; }
      if (form.elements.sitio_web.value) return; // campo trampa: lo llenó un bot

      if (!CONFIG.formEndpoint) {
        const service = serviceSelect.selectedOptions[0].textContent;
        const body = [
          `Nombre: ${form.elements.nombre.value}`,
          `Empresa: ${form.elements.empresa.value}`,
          `Teléfono: ${form.elements.telefono.value}`,
          `Servicio: ${service}`,
          '',
          form.elements.mensaje.value,
        ].join('\n');
        setStatus(msg('mailto'));
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Solicitud de contacto — ${service}`)}&body=${encodeURIComponent(body)}`;
        return;
      }

      submitButton.disabled = true;
      setStatus(msg('sending'));
      try {
        const response = await fetch(CONFIG.formEndpoint, { method: 'POST', body: new FormData(form) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        form.reset();
        setStatus(msg('sent'));
      } catch (_) {
        setStatus(msg('failed'), 'error');
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  /* ---- 10. Widget flotante ---------------------------------------------- */
  const widgetToggle = $('#widget-toggle');
  const widgetPanel = $('#widget-panel');

  if (widgetToggle && widgetPanel) {
    const setWidget = (open) => {
      widgetPanel.hidden = !open;
      widgetToggle.setAttribute('aria-expanded', String(open));
      if (open) widgetPanel.focus();
    };
    widgetToggle.addEventListener('click', () => setWidget(widgetPanel.hidden));
    $('#widget-close').addEventListener('click', () => { setWidget(false); widgetToggle.focus(); });
    widgetPanel.addEventListener('click', (event) => { if (event.target.closest('a')) setWidget(false); });

    const widgetMessages = $('#widget-messages');
    const TOPICS = {
      salud: {
        service: 'neuro-salud',
        es: ['Salud', 'Con NeuroAr Cognitivo evaluamos y entrenamos funciones cognitivas en realidad virtual, para neurorehabilitación, terapias y gimnasio mental.'],
        en: ['Health', 'With NeuroAr Cognitive we assess and train cognitive functions in virtual reality for neurorehabilitation, therapy and brain fitness.'],
      },
      educacion: {
        service: 'educacion',
        es: ['Educación', 'Tenemos test vocacional, aulas en realidad virtual y programas de habilidades para colegios y universidades.'],
        en: ['Education', 'We offer a career test, virtual reality classrooms and skills programs for schools and universities.'],
      },
      industria: {
        service: 'industria-vr',
        es: ['Empresa o industria', 'Entrenamos tareas críticas en realidad virtual y mejoramos procesos con DMAIC + IA y software a la medida.'],
        en: ['Business or industry', 'We train critical tasks in virtual reality and improve processes with DMAIC + AI and custom software.'],
      },
    };
    const bubble = (text, user) => {
      const p = document.createElement('p');
      p.className = user ? 'chat-bubble chat-bubble--user' : 'chat-bubble';
      p.textContent = text;
      return p;
    };

    $$('[data-widget-topic]').forEach((button) => {
      button.addEventListener('click', () => {
        const topic = TOPICS[button.dataset.widgetTopic];
        if (!topic || !widgetMessages) return;
        const [label, response] = topic[lang];
        $$('.chat-widget__choices button').forEach((choice) => {
          choice.disabled = choice !== button;
          choice.setAttribute('aria-pressed', String(choice === button));
        });
        widgetMessages.replaceChildren(bubble(label, true), bubble(response, false));
        if (serviceSelect) serviceSelect.value = topic.service;
        const whatsApp = $('#widget-whatsapp');
        if (whatsApp) whatsApp.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Hola, me interesa NeuroAr para: ${topic.es[0]}.`)}`;
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !widgetPanel.hidden) { setWidget(false); widgetToggle.focus(); }
    });
  }

  /* ---- 11. Scrollspy ---------------------------------------------------- */
  const spied = $$('.nav-list a')
    .filter((link) => link.hash && link.pathname === location.pathname)
    .map((link) => ({ link, target: document.querySelector(link.hash) }))
    .filter((item) => item.target);

  if (spied.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        spied.forEach(({ link, target }) => {
          if (target === entry.target) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spied.forEach(({ target }) => observer.observe(target));
  }

  /* ---- 12. Galería con lightbox (sostenibilidad) ------------------------ */
  const lightbox = $('#lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    const lightboxImage = $('img', lightbox);
    $$('.gallery__item').forEach((button) => {
      button.addEventListener('click', () => {
        const thumb = $('img', button);
        lightboxImage.src = thumb.currentSrc || thumb.src;
        lightboxImage.alt = thumb.alt;
        lightbox.showModal();
      });
    });
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('[data-close]')) lightbox.close();
    });
  }

  /* ---- 13. Aparición al desplazarse ------------------------------------- */
  const REVEAL_SELECTOR = '.section__head, .loop__step, .uni, .green-band, .try__copy, .lab, .cogpanel, .sectors li, .dmaic__step, .ref, .city, .form, .card, .gallery li, .split > *, .contact > *';
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    $$(REVEAL_SELECTOR).forEach((el) => {
      if (el.closest('.reveal')) return; // evita animar dos veces lo anidado
      const siblings = [...el.parentElement.children].filter((child) => child.matches(REVEAL_SELECTOR));
      el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 5) * 80}ms`);
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ---- 14. Foco de luz bajo el cursor ----------------------------------- */
  const SPOT_SELECTOR = '.loop__step, .uni, .ref, .card, .city, .dmaic__step';
  $$(SPOT_SELECTOR).forEach((el) => el.classList.add('spot'));
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const card = event.target.closest(SPOT_SELECTOR);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });

  /* ---- 15. Imágenes que faltan en el hosting ----------------------------
     Si una foto no existe, se oculta su contenedor en vez de mostrar el
     icono roto. Si falta el logo, se muestra la marca en texto.             */
  const handleMissing = (img) => {
    const media = img.closest('.media');
    if (media) { media.classList.add('is-missing'); return; }
    if (img.closest('.brand, .site-footer__brand')) {
      const text = document.createElement('span');
      text.className = 'brand__text';
      text.innerHTML = 'Neuro<b>Ar</b>';
      img.replaceWith(text);
      return;
    }
    img.style.visibility = 'hidden';
  };
  $$('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) handleMissing(img);
    else img.addEventListener('error', () => handleMissing(img), { once: true });
  });

  /* ---- Idioma inicial (al final, cuando todos los oyentes existen) ------ */
  let storedLang = 'es';
  try { storedLang = localStorage.getItem('neuroar-lang') === 'en' ? 'en' : 'es'; } catch (_) { /* ignorar */ }
  setLang(storedLang);
})();
