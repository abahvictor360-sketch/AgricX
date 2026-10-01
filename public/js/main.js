(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  // Toast
  const toastEl = $('[data-toast]');
  let toastTimer;
  const toast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  // Mobile menu
  const menu = $('[data-mobile-menu]');
  const toggle = $('[data-menu-toggle]');
  const setMenu = (open) => {
    menu?.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
  };
  toggle?.addEventListener('click', () => setMenu(true));
  $('[data-menu-close]')?.addEventListener('click', () => setMenu(false));
  $$('a', menu || document.createElement('div')).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));
  window.addEventListener('resize', () => window.innerWidth > 1024 && setMenu(false));

  // Cart count
  const renderCart = () => $$('[data-cart-count]').forEach((el) => (el.textContent = store.get('agricx-cart', 0)));
  renderCart();

  // Qty + add to cart
  $$('[data-qty]').forEach((q) => {
    const input = $('input', q);
    const [dec, inc] = $$('button', q);
    dec.addEventListener('click', () => (input.value = Math.max(1, +input.value - 1)));
    inc.addEventListener('click', () => (input.value = +input.value + 1));
  });
  $$('[data-add-cart]').forEach((b) =>
    b.addEventListener('click', () => {
      const qty = Math.max(1, +($('[data-qty] input')?.value || 1));
      store.set('agricx-cart', store.get('agricx-cart', 0) + qty);
      renderCart();
      toast(`${qty} × ${b.dataset.addCart} added to cart`);
    })
  );

  // Accordions (one open at a time)
  $$('[data-accordion]').forEach((acc) => {
    $$('.acc-head', acc).forEach((head) => {
      const item = head.closest('.acc-item');
      head.setAttribute('aria-expanded', item.classList.contains('open'));
      head.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        $$('.acc-item', acc).forEach((i) => {
          i.classList.remove('open');
          $('.acc-head', i).setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('open');
          head.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // Slider arrows
  $$('[data-scroll]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const track = $(btn.dataset.scroll);
      if (!track) return;
      const card = track.firstElementChild;
      const step = card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.8;
      track.scrollBy({ left: step * +btn.dataset.dir, behavior: 'smooth' });
    })
  );

  // Filters + search
  $$('[data-filters]').forEach((group) => {
    const grid = $(group.dataset.filters);
    const search = $(`[data-product-search="${group.dataset.filters}"]`);
    const empty = $('[data-empty]');
    let cat = 'All';
    const params = new URLSearchParams(location.search);
    if (search && params.get('q')) search.value = params.get('q');
    const apply = () => {
      const q = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      [...grid.children].forEach((card) => {
        const ok = (cat === 'All' || card.dataset.category === cat) && (!q || card.textContent.toLowerCase().includes(q));
        card.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    $$('[data-filter]', group).forEach((b) =>
      b.addEventListener('click', () => {
        $$('[data-filter]', group).forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        cat = b.dataset.filter;
        apply();
      })
    );
    search?.addEventListener('input', apply);
    apply();
  });

  // Gallery
  $$('[data-gallery]').forEach((g) => {
    const main = $('[data-gallery-main]', g);
    $$('.gallery-thumbs button', g).forEach((b) =>
      b.addEventListener('click', () => {
        main.src = b.dataset.src;
        $$('.gallery-thumbs button', g).forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
      })
    );
  });

  // Subscribe
  $$('[data-subscribe]').forEach((f) =>
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = f.parentElement.querySelector('[data-subscribe-note]');
      if (note) note.hidden = false;
      f.reset();
      toast('Subscribed! Welcome to AgricX.');
    })
  );

  // Contact form
  const form = $('[data-contact-form]');
  if (form) {
    const product = new URLSearchParams(location.search).get('product');
    if (product && form.product) form.product.value = product;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = $('[data-form-note]', form);
      let ok = true;
      $$('[required]', form).forEach((el) => {
        const bad = !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      note.hidden = false;
      note.classList.toggle('error', !ok);
      if (!ok) {
        note.textContent = 'Please fill in your name, a valid email and a message.';
        return;
      }
      note.textContent = `Thanks ${form.name.value.split(' ')[0]}! Your message has been received — we’ll reply within one business day.`;
      form.reset();
    });
  }

  // Scroll to top & year
  $$('[data-to-top]').forEach((b) => b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  // ---------- Motion ----------
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // Scroll progress bar
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  // Split headline words for a staggered rise
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) return frag.appendChild(document.createTextNode(w));
            const outer = document.createElement('span');
            outer.className = 'word';
            const inner = document.createElement('span');
            inner.textContent = w;
            inner.style.setProperty('--i', i++);
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'svg' && !n.classList.contains('hero-badge')) {
          walk(n);
        } else if (n.nodeType === 1) {
          n.classList.add('pop');
          n.style.setProperty('--i', i++);
        }
      });
    };
    walk(el);
    el.classList.add('split');
  };
  if (!reduce) $$('.hero-copy h1, .inner-hero-content h1, .display, .why-title').forEach(splitWords);

  // Hero entrance
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  // Reveal targets with variants + stagger
  const mark = (sel, variant) => $$(sel).forEach((el) => { el.classList.add('reveal'); if (variant) el.dataset.reveal = variant; });
  mark('.section-head, .section > h2, .slider-intro, .toolbar, .about-copy, .contact-info, .center-head');
  mark('.about-image, .spec-image, .gallery, .featured-post, .why-visual', 'clip');
  mark('.accordion, .why-list, .contact-form, .product-summary, .article, .sidebar, .table-wrap, .faq', 'up');
  mark('.cta', 'zoom');
  const staggerGroups = '.product-grid, .post-grid, .track, .card-grid, .service-grid, .pricing, .steps, .timeline, .stats, .mini-features, .check-list, .footer-grid, .info-list';
  $$(staggerGroups).forEach((g) => [...g.children].forEach((c, i) => { c.classList.add('reveal'); c.dataset.reveal = c.dataset.reveal || 'up'; c.style.setProperty('--d', `${(i % 6) * 90}ms`); }));
  mark('.footer-word', 'letters');
  const fw = $('.footer-word');
  if (fw && !reduce) fw.innerHTML = [...fw.textContent].map((c, i) => `<span style="--i:${i}">${c}</span>`).join('');
  $$('.display, .why-title').forEach((h) => h.classList.add('reveal'));

  // Count-up numbers
  const countUp = (el) => {
    const m = el.textContent.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m || reduce) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num), dec = (num.split('.')[1] || '').length, t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toFixed(dec) + post;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = $$('.stats strong');

  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        setTimeout(() => (en.target.style.transitionDelay = '0s'), 1600);
        if (counters.includes(en.target)) countUp(en.target);
        io.unobserve(en.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    $$('.reveal').forEach((el) => io.observe(el));
    counters.forEach((el) => {
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach((el) => el.classList.add('in'));
  }

  // Parallax + scroll-linked effects
  const heroes = $$('.hero-shell');
  const parallaxImgs = reduce ? [] : $$('.about-image img, .spec-image img, .why-visual img, .featured-post img');
  parallaxImgs.forEach((el) => {
    if (el.tagName === 'IMG') {
      const wrap = document.createElement('span');
      wrap.className = 'px-wrap';
      wrap.style.borderRadius = getComputedStyle(el).borderRadius;
      el.replaceWith(wrap);
      wrap.appendChild(el);
    }
    el.classList.add('parallax');
  });
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY, vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    document.body.classList.toggle('scrolled', y > 300);
    if (!reduce) {
      heroes.forEach((h) => {
        if (y < h.offsetHeight + 200) h.style.setProperty('--py', `${y * 0.35}px`);
      });
      parallaxImgs.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        el.style.setProperty('--shift', `${(p * -40).toFixed(1)}px`);
      });
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // Magnetic / tilt hover on cards (pointer devices only)
  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    $$('.product-card, .post-card, .service-card, .plan, .step, .info-card').forEach((card) => {
      card.classList.add('tilt');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
    $$('.btn, .round-arrow, .circle-btn').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 6}px ${((e.clientY - r.top) / r.height - 0.5) * 6}px`;
      });
      b.addEventListener('pointerleave', () => (b.style.translate = ''));
    });
  }

  // Auto-scrolling feature slider (pauses on interaction)
  const ft = $('#featureTrack');
  if (ft && !reduce) {
    let paused = false;
    ['pointerenter', 'touchstart', 'focusin'].forEach((ev) => ft.addEventListener(ev, () => (paused = true), { passive: true }));
    ft.addEventListener('pointerleave', () => (paused = false));
    setInterval(() => {
      if (paused || document.hidden) return;
      const step = ft.firstElementChild.getBoundingClientRect().width + 18;
      const atEnd = ft.scrollLeft + ft.clientWidth >= ft.scrollWidth - 4;
      ft.scrollTo({ left: atEnd ? 0 : ft.scrollLeft + step, behavior: 'smooth' });
    }, 3500);
  }
})();
