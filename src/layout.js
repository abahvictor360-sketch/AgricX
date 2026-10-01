import { site, nav, products } from './data.js';

const paths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  cart: '<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6"/><circle cx="10" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="none"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  drone: '<circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>',
  spray: '<path d="M8 3h4v4H8zM10 7v3M6 10h8v11H6zM16 5h1M18 3h1M18 7h1M20 5h1"/>',
  map: '<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  graduation: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  truck: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  weight: '<path d="M6 8h12l2 12H4z"/><circle cx="12" cy="5" r="2"/>',
  sparkle: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;

export const img = (file) => `/images/${file}`;
export const money = (n) => '$' + n.toLocaleString('en-US');

const logo = (extra = '') => `
  <a href="/" class="logo ${extra}" aria-label="${site.name} home">
    <span class="logo-mark">${icon('drone')}</span>
    <span>${site.name}</span>
  </a>`;

function header(active) {
  const links = nav
    .map((n) => `<li><a href="${n.href}" class="${n.href === active ? 'active' : ''}">${n.label}</a></li>`)
    .join('');
  return `
  <header class="site-header">
    ${logo()}
    <nav class="main-nav" aria-label="Main">
      <ul>${links}</ul>
    </nav>
    <div class="header-actions">
      <form class="search-pill" action="/drones" role="search">
        ${icon('search')}
        <input type="search" name="q" placeholder="Search" aria-label="Search drones" />
      </form>
      <a href="/drones" class="icon-btn cart-btn" aria-label="Cart">${icon('cart')}<span class="cart-count" data-cart-count>0</span></a>
      <a href="/contact" class="btn btn-light btn-sm hide-sm">Contact Us</a>
      <button class="icon-btn menu-toggle" aria-label="Open menu" aria-expanded="false" data-menu-toggle>${icon('menu')}</button>
    </div>
  </header>
  <div class="mobile-menu" data-mobile-menu>
    <div class="mobile-menu-top">${logo()}<button class="icon-btn" aria-label="Close menu" data-menu-close>${icon('close')}</button></div>
    <ul>${links}<li><a href="/contact" class="${active === '/contact' ? 'active' : ''}">Contact</a></li></ul>
    <a href="/contact" class="btn btn-lime">Get a quote ${icon('arrow')}</a>
  </div>`;
}

export function pageHero({ title, crumb, image = 'field-rows.jpg', active, text = '' }) {
  return `
  <section class="hero-shell hero-inner" style="--bg:url('${img(image)}')">
    ${header(active)}
    <div class="inner-hero-content">
      <p class="breadcrumb"><a href="/">Home</a> <span>/</span> ${crumb}</p>
      <h1>${title}</h1>
      ${text ? `<p class="lead">${text}</p>` : ''}
    </div>
  </section>`;
}

export function homeHeader() {
  return header('/');
}

export function productCard(p) {
  return `
  <article class="product-card" data-category="${p.category}">
    <a href="/products/${p.slug}" class="product-media">
      <img src="${img(p.image)}" alt="${p.name}" loading="lazy" />
      <span class="badge">${p.badge}</span>
      <span class="round-arrow">${icon('arrowUpRight')}</span>
    </a>
    <div class="product-info">
      <span class="eyebrow">${p.category}</span>
      <h3><a href="/products/${p.slug}">${p.name}</a></h3>
      <p class="price"><del>${money(p.oldPrice)}</del> <strong>${money(p.price)}</strong></p>
    </div>
  </article>`;
}

export function postCard(p) {
  return `
  <article class="post-card" data-category="${p.category}">
    <a href="/blog/${p.slug}" class="post-media">
      <img src="${img(p.image)}" alt="" loading="lazy" />
      <span class="round-arrow">${icon('arrowUpRight')}</span>
    </a>
    <p class="post-meta">${p.date} · ${p.read}</p>
    <h3><a href="/blog/${p.slug}">${p.title}</a></h3>
    <span class="tag">${p.category}</span>
  </article>`;
}

export function cta() {
  return `
  <section class="cta-wrap">
    <div class="cta" style="--bg:url('${img('tractor-spray.jpg')}')">
      <h2>Top model for agriculture<br />Ready, Steady, Go</h2>
      <form class="subscribe" data-subscribe>
        ${icon('mail')}
        <input type="email" required placeholder="Enter Email Address" aria-label="Email address" />
        <button class="btn btn-lime btn-sm" type="submit">Explore More</button>
      </form>
      <p class="form-note" data-subscribe-note hidden>Thanks! We’ll be in touch soon.</p>
    </div>
  </section>`;
}

function footer() {
  const popular = products.slice(0, 6).map((p) => `<li><a href="/products/${p.slug}">${p.name}</a></li>`).join('');
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        ${logo('logo-light')}
        <p>${site.tagline} Fly smarter, spray less and grow more.</p>
        <div class="socials">
          ${['facebook', 'x', 'instagram', 'youtube', 'linkedin'].map((s) => `<a href="#" aria-label="${s}">${icon(s)}</a>`).join('')}
        </div>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/about#why">Why AgricX</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4>Where to Buy</h4>
        <ul>
          <li><a href="/drones">AgricX Online Store</a></li>
          <li><a href="/contact">Flagship Stores</a></li>
          <li><a href="/contact">Authorized Dealers</a></li>
          <li><a href="/services">Enterprise Leasing</a></li>
          <li><a href="/contact">Become a Dealer</a></li>
        </ul>
      </div>
      <div>
        <h4>Popular Products</h4>
        <ul>${popular}</ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span data-year>2026</span> ${site.name}. All rights reserved.</p>
      <p><a href="#">Privacy Policy</a> · <a href="#">Terms</a></p>
    </div>
    <div class="footer-word" aria-hidden="true">${site.name}</div>
    <button class="to-top" data-to-top aria-label="Scroll to top">Scroll to Top <span>${icon('arrowUp')}</span></button>
  </footer>`;
}

export function layout({ title, description, body }) {
  const full = title ? `${title} | ${site.name}` : `${site.name} | Part of Future Agriculture`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${full}</title>
  <meta name="description" content="${description || site.tagline}" />
  <meta property="og:title" content="${full}" />
  <meta property="og:description" content="${description || site.tagline}" />
  <meta property="og:image" content="/images/agras-drone.jpg" />
  <meta name="theme-color" content="#0f3a1f" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
  <div class="page">
${body}
  </div>
  ${footer()}
  <button class="fab-top" data-to-top aria-label="Back to top">${icon('arrowUp')}</button>
  <div class="toast" data-toast role="status" aria-live="polite"></div>
  <script src="/js/main.js" defer></script>
</body>
</html>
`;
}
