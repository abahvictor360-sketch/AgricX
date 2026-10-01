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

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const els = $$('.section > *, .cta');
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add('in'), io.unobserve(en.target))),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }
})();
