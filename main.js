/* ==========================================================================
   NeuroAr — main.js
   1 Idioma ES|EN · 2 Menú móvil · 3 Tabs de soluciones · 4 Preselección de
   servicio · 5 Formulario · 6 Widget flotante · 7 Scrollspy · 8 Lightbox
   Cada bloque se activa solo si sus elementos existen en la página, así el
   mismo archivo sirve para index.html y sostenibilidad.html.
   ========================================================================== */
(() => {
  'use strict';

  /* ---- Configuración ---------------------------------------------------- */
  const CONFIG = {
    // URL que recibe el formulario (POST, multipart). Si queda vacía, el
    // formulario abre el correo del usuario con el mensaje ya redactado.
    formEndpoint: '',
    email: 'Gerencia@neuroar.com.co',
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* ---- 1. Idioma ES | EN ------------------------------------------------
     El texto en español vive en el HTML. Aquí solo se guarda la traducción al
     inglés; al volver a ES se restaura el texto original guardado en data-*.
     Solo se marcan con data-i18n elementos "hoja" (sin etiquetas hijas).     */
  const EN = {
    'nav.solutions': 'Solutions',
    'nav.dmaic': 'DMAIC Methodology',
    'nav.cognitive': 'NeuroAr Cognitive',
    'nav.about': 'About us',
    'nav.contact': 'Contact',
    'nav.app': 'NeuroAr App',
    'nav.menu': 'Menu',
    'cta.diagnosis': 'Request a diagnosis',
    'cta.explore': 'Explore solutions',
    'cta.consult': 'Request this service',
    'hero.eyebrow': 'Software · AI · Continuous improvement',
    'hero.title': 'Software, AI and continuous improvement that turn processes into measurable results.',
    'hero.lead': 'NeuroAr builds custom software, AI-powered improvement agents, knowledge platforms and virtual reality experiences for companies, institutions and people.',
    'pillar.1.title': 'Software, AI and DMAIC for business',
    'pillar.1.text': 'Custom software, AI and continuous improvement agents for companies.',
    'pillar.2.title': 'Knowledge and NeuroAr Cognitive',
    'pillar.2.text': 'Knowledge platforms and virtual reality for talent, education and health.',
    'pillar.3.title': 'Environmental sustainability',
    'pillar.3.text': 'Technology solutions for efficient resource use and environmental awareness.',
    'sol.eyebrow': 'What we do',
    'sol.title': 'Solutions that evolve with you',
    'sol.lead': 'Pick a service to see its scope and key deliverables, then request a proposal for your organization.',
    'tab.1': 'Custom software and AI',
    'tab.2': 'DMAIC + AI Improvement Agents',
    'tab.3': 'Enterprise Knowledge Platforms',
    'tab.4': 'Virtual Reality and NeuroAr Cognitive',
    'tab.5': 'Industrial Technology and Sustainability',
    'dmaic.eyebrow': 'Smart Improvement Agents · Lean Six Sigma + AI',
    'dmaic.title': 'From challenges to measurable results.',
    'dmaic.lead': 'We combine the DMAIC methodology, artificial intelligence and custom development to diagnose, design, implement and sustain real solutions.',
    'dmaic.method': 'DMAIC powered by AI',
    'cog.eyebrow': 'Immersive learning',
    'cog.title': 'NeuroAr Cognitive: learning by experiencing',
    'cog.app': 'Open the app',
    'cog.brochure': 'View brochure',
    'ref.eyebrow': 'Track record and connections',
    'ref.title': 'Organizations driving innovation with NeuroAr',
    'about.eyebrow': 'About NeuroAr',
    'about.title': 'About NeuroAr and our presence in Colombia',
    'contact.eyebrow': 'Let’s work together',
    'contact.title': 'Tell us your challenge',
    'form.name': 'Full name',
    'form.company': 'Company or institution',
    'form.email': 'Email',
    'form.phone': 'Phone / WhatsApp',
    'form.service': 'Service of interest',
    'form.message': 'How can we help?',
    'form.consent': 'I agree to the processing of my data to answer this request.',
    'form.submit': 'Send request',
    'footer.tagline': 'Software · Knowledge · Innovation',
    'footer.sustainability': 'Sustainability',
    'widget.toggle': 'Let’s talk?',
    'widget.hello': 'Hi! I am the NeuroAr assistant.',
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

  const EN_MESSAGES = {
    required: 'This field is required.',
    email: 'Enter a valid email address.',
    sending: 'Sending…',
    sent: 'Thanks! We received your request and will contact you soon.',
    failed: 'We could not send the form. Please write to ' + CONFIG.email + ' or use WhatsApp.',
    mailto: 'Opening your email app with the message ready to send.',
  };
  const ES_MESSAGES = {
    required: 'Este campo es obligatorio.',
    email: 'Escribe un correo válido.',
    sending: 'Enviando…',
    sent: '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.',
    failed: 'No pudimos enviar el formulario. Escríbenos a ' + CONFIG.email + ' o por WhatsApp.',
    mailto: 'Abriendo tu aplicación de correo con el mensaje listo para enviar.',
  };

  let lang = 'es';
  const msg = (key) => (lang === 'en' ? EN_MESSAGES : ES_MESSAGES)[key];

  function setLang(next) {
    lang = next;
    document.documentElement.lang = next;

    $$('[data-i18n]').forEach((el) => {
      if (!('i18nEs' in el.dataset)) el.dataset.i18nEs = el.textContent; // guarda el original ES
      el.textContent = next === 'en' ? (EN[el.dataset.i18n] ?? el.dataset.i18nEs) : el.dataset.i18nEs;
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

    try { localStorage.setItem('neuroar-lang', next); } catch (_) { /* almacenamiento bloqueado */ }
  }

  $$('.lang-switch button').forEach((button) => {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  });

  let storedLang = 'es';
  try { storedLang = localStorage.getItem('neuroar-lang') === 'en' ? 'en' : 'es'; } catch (_) { /* ignorar */ }
  setLang(storedLang);

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
      if (event.key === 'Escape' && nav.dataset.open === 'true') {
        setMenu(false);
        navToggle.focus();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));
  }

  /* ---- 3. Tabs de soluciones (patrón ARIA tabs) ------------------------- */
  const tabs = $$('[role="tab"]');
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

  // Enlaces antiguos (#detalle-*) → pestaña equivalente
  const LEGACY_ANCHORS = {
    '#detalle-software': 0,
    '#detalle-ia': 0,
    '#detalle-plataformas': 2,
    '#detalle-realidad-virtual': 3,
    '#detalle-educacion': 3,
    '#detalle-industrial': 4,
  };

  function activateTab(index, { focus = false } = {}) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }

  function openTabFromHash() {
    const hash = location.hash;
    if (!hash || !tabs.length) return;
    const index = hash in LEGACY_ANCHORS
      ? LEGACY_ANCHORS[hash]
      : panels.findIndex((panel) => `#${panel.id}` === hash);
    if (index < 0) return;
    activateTab(index);
    panels[index].scrollIntoView(); // el panel estaba oculto: el navegador no pudo desplazarse solo
  }

  if (tabs.length) {
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(index));
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const keyToIndex = {
          ArrowRight: index === last ? 0 : index + 1,
          ArrowDown: index === last ? 0 : index + 1,
          ArrowLeft: index === 0 ? last : index - 1,
          ArrowUp: index === 0 ? last : index - 1,
          Home: 0,
          End: last,
        };
        if (event.key in keyToIndex) {
          event.preventDefault();
          activateTab(keyToIndex[event.key], { focus: true });
        }
      });
    });

    activateTab(0);
    openTabFromHash();
    window.addEventListener('hashchange', openTabFromHash);

    // La consola de capacidades abre la solución asociada y conserva el flujo visual.
    $$('[data-deck-focus]').forEach((control) => {
      control.addEventListener('click', (event) => {
        event.preventDefault();
        const index = Number(control.dataset.deckFocus);
        if (!Number.isInteger(index) || !tabs[index]) return;
        activateTab(index);
        $$('.console-card').forEach((card) => card.classList.toggle('console-card--active', card === control));
        document.querySelector('#soluciones').scrollIntoView({ behavior: 'smooth' });
        window.setTimeout(() => tabs[index].focus({ preventScroll: true }), 450);
      });
    });
  }

  /* ---- 3b. Profundidad visual y progreso de lectura --------------------- */
  const progressBar = $('#read-progress-bar');
  const heroVisual = $('.hero__visual');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateProgress = () => {
    if (!progressBar) return;
    const total = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    progressBar.style.transform = `scaleX(${Math.min(Math.max(window.scrollY / total, 0), 1)})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  if (heroVisual && !reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    heroVisual.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.setProperty('--rx', `${-y * 7}deg`);
      heroVisual.style.setProperty('--ry', `${x * 9}deg`);
      heroVisual.style.setProperty('--px', `${50 + x * 18}%`);
      heroVisual.style.setProperty('--py', `${50 + y * 18}%`);
    });
    heroVisual.addEventListener('pointerleave', () => {
      heroVisual.style.removeProperty('--rx');
      heroVisual.style.removeProperty('--ry');
      heroVisual.style.removeProperty('--px');
      heroVisual.style.removeProperty('--py');
    });
  }

  // Campo espacial del hero: proyección de nodos 3D dibujada sin librerías.
  // Se pausa fuera de pantalla y se omite cuando el usuario reduce movimiento.
  const heroCanvas = $('#hero-canvas');
  const heroSection = $('.hero');
  if (heroCanvas && heroSection && !reducedMotion && heroCanvas.getContext) {
    const context = heroCanvas.getContext('2d');
    const points = [];
    let frameId = 0;
    let visible = true;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let pointerX = 0;
    let pointerY = 0;

    const buildPoints = () => {
      points.length = 0;
      const count = Math.min(72, Math.max(38, Math.round(canvasWidth / 22)));
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: (Math.random() - 0.5) * canvasWidth * 1.25,
          y: (Math.random() - 0.5) * canvasHeight * 1.1,
          z: (Math.random() - 0.5) * 520,
          seed: Math.random() * Math.PI * 2,
        });
      }
    };

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = heroSection.clientWidth;
      canvasHeight = heroSection.clientHeight;
      heroCanvas.width = Math.round(canvasWidth * ratio);
      heroCanvas.height = Math.round(canvasHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildPoints();
    };

    const drawField = (timestamp) => {
      if (!visible) { frameId = 0; return; }
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      const time = timestamp * 0.00013;
      const projected = points.map((point) => {
        const angle = time + point.seed * 0.16;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotatedX = point.x * cos - point.z * sin;
        const rotatedZ = point.x * sin + point.z * cos;
        const waveY = point.y + Math.sin(time * 10 + point.seed) * 12;
        const scale = 430 / Math.max(240, 860 + rotatedZ);
        return { x: canvasWidth / 2 + rotatedX * scale + pointerX * 26, y: canvasHeight / 2 + waveY * scale + pointerY * 18, scale };
      });

      for (let i = 0; i < projected.length; i += 1) {
        const current = projected[i];
        for (let j = i + 1; j < projected.length; j += 1) {
          const other = projected[j];
          const dx = current.x - other.x;
          const dy = current.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 104) continue;
          const alpha = (1 - distance / 104) * 0.17;
          context.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          context.lineWidth = 0.65;
          context.beginPath(); context.moveTo(current.x, current.y); context.lineTo(other.x, other.y); context.stroke();
        }
      }
      projected.forEach((point) => {
        const radius = Math.max(0.7, Math.min(2.2, point.scale * 2.7));
        context.fillStyle = `rgba(103, 232, 249, ${Math.min(0.82, point.scale * 1.25)})`;
        context.beginPath(); context.arc(point.x, point.y, radius, 0, Math.PI * 2); context.fill();
      });
      frameId = window.requestAnimationFrame(drawField);
    };

    resizeCanvas();
    frameId = window.requestAnimationFrame(drawField);
    window.addEventListener('resize', resizeCanvas);
    heroSection.addEventListener('pointermove', (event) => {
      const rect = heroSection.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    });
    heroSection.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frameId) frameId = window.requestAnimationFrame(drawField);
      }, { threshold: 0.05 }).observe(heroSection);
    }
  }

  /* ---- 4. Preselección de servicio en el formulario ---------------------- */
  const serviceSelect = $('#servicio');

  if (serviceSelect) {
    // Llegada desde otra página: /?servicio=sostenibilidad#contacto
    const fromQuery = new URLSearchParams(location.search).get('servicio');
    if (fromQuery && $(`option[value="${CSS.escape(fromQuery)}"]`, serviceSelect)) {
      serviceSelect.value = fromQuery;
    }

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

  /* ---- 5. Formulario de contacto ---------------------------------------- */
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

    const setStatus = (text, state = 'info') => {
      status.textContent = text;
      status.dataset.state = state;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Valida todos los campos y lleva el foco al primero con error
      const invalid = requiredFields.filter((field) => !validateField(field));
      if (invalid.length) { invalid[0].focus(); return; }

      if (form.elements.sitio_web.value) return; // campo trampa: un bot lo llenó

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
        const subject = `Solicitud de contacto — ${service}`;
        setStatus(msg('mailto'));
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

  /* ---- 6. Widget flotante unificado ------------------------------------- */
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
    const topicContent = {
      software: { label: 'Software e IA', service: 'software-ia', response: 'Podemos crear software a medida, automatizar tareas e integrar asistentes de IA para tu operación.' },
      dmaic: { label: 'Mejoramiento DMAIC', service: 'dmaic-ia', response: 'Nuestro equipo combina DMAIC, analítica e IA para diagnosticar, implementar y medir mejoras.' },
      inmersivo: { label: 'Realidad virtual', service: 'cognitivo-vr', response: 'Diseñamos experiencias inmersivas para capacitación, aprendizaje y desarrollo de habilidades.' },
    };

    $$('[data-widget-topic]').forEach((button) => {
      button.addEventListener('click', () => {
        const topic = topicContent[button.dataset.widgetTopic];
        if (!topic || !widgetMessages) return;
        $$('.chat-widget__choices button').forEach((choice) => {
          choice.disabled = choice !== button;
          choice.setAttribute('aria-pressed', String(choice === button));
        });
        widgetMessages.innerHTML = `<p class="chat-bubble chat-bubble--user">${topic.label}</p><p class="chat-bubble">${topic.response}</p>`;
        if (serviceSelect) serviceSelect.value = topic.service;
        const whatsApp = $('#widget-whatsapp');
        if (whatsApp) whatsApp.href = `https://wa.me/573003743575?text=${encodeURIComponent(`Hola, me interesa: ${topic.label}.`)}`;
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !widgetPanel.hidden) { setWidget(false); widgetToggle.focus(); }
    });
  }

  /* ---- 7. Scrollspy: marca el ítem de navegación de la sección visible --- */
  const navLinks = $$('.nav-list a').filter((link) => link.hash && link.pathname === location.pathname);
  const spied = navLinks
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

  /* ---- 8. Galería con lightbox (sostenibilidad) ------------------------- */
  const lightbox = $('#lightbox');

  if (lightbox && typeof lightbox.showModal === 'function') {
    const lightboxImage = $('img', lightbox);

    $$('.gallery__item').forEach((button) => {
      button.addEventListener('click', () => {
        const thumb = $('img', button);
        lightboxImage.src = thumb.currentSrc || thumb.src;
        lightboxImage.alt = thumb.alt; // el texto alternativo viaja con la imagen
        lightbox.showModal();
      });
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target.closest('[data-close]')) lightbox.close();
    });
  }

  /* ---- 9. Aparición al desplazarse (reveal) ----------------------------
     Se activa solo con JS y sin "reducir movimiento". Sin esto, todo el
     contenido queda visible desde el inicio.                                */
  const REVEAL_SELECTOR = '.section__head, .pillar, .tabs, .dmaic__step, .outcomes li, .ref, .city, .form, .card, .gallery li, .split > *, .contact > *';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    $$(REVEAL_SELECTOR).forEach((el) => {
      // Escalonado: cada hermano espera 80 ms más que el anterior (máx. 400 ms)
      const siblings = [...el.parentElement.children].filter((child) => child.matches(REVEAL_SELECTOR));
      el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 5) * 80}ms`);
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  /* ---- 10. Foco de luz bajo el cursor en las tarjetas -------------------- */
  const SPOT_SELECTOR = '.pillar, .tab, .ref, .card, .city, .dmaic__step';
  $$(SPOT_SELECTOR).forEach((el) => el.classList.add('spot'));

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return; // en táctil no hay cursor
    const card = event.target.closest(SPOT_SELECTOR);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
})();
