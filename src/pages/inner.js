import { products, posts, site } from '../data.js';
import { icon, img, money, pageHero, productCard, postCard, cta } from '../layout.js';

const stats = `
  <div class="stats">
    <div><strong>500+</strong><span>Farms served</span></div>
    <div><strong>120k</strong><span>Hectares sprayed</span></div>
    <div><strong>4.9★</strong><span>Average rating</span></div>
    <div><strong>24/7</strong><span>Field support</span></div>
  </div>`;

export function about() {
  const values = [
    ['leaf', 'Sustainability', 'Targeted application uses up to 90% less water and 30% less chemical than conventional spraying.'],
    ['shield', 'Reliability', 'Every unit is stress-tested in heat, dust and rain before it ships to a farm.'],
    ['graduation', 'Training', 'Certified pilot training and agronomy workshops for every customer.'],
    ['wrench', 'Support', 'Local service centres and same-week repairs keep your fleet in the air.'],
  ];
  const body = `
  ${pageHero({ title: 'About AgricX', crumb: 'About', image: 'drone-tractor.jpg', active: '/about', text: 'We bring precision drone technology to farms of every size.' })}

  <section class="section container about-split">
    <div class="about-image"><img src="${img('drone-closeup.jpg')}" alt="AgricX drone in a field" /></div>
    <div class="about-copy">
      <span class="pill-label">Our Story</span>
      <h2>Built by farmers, engineers and agronomists</h2>
      <p>AgricX started in 2019 with a simple question: why do farmers still walk every row to find problems, and spray every plant to fix them? Today we supply spraying, mapping and scouting drones, ground equipment and the training to use them well.</p>
      <p>Our mission is to make precision agriculture affordable and practical, so every farm can grow more food with fewer inputs.</p>
      ${stats}
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>What we stand for</h2></div>
    <div class="card-grid four">
      ${values.map(([i, t, d]) => `<div class="info-card"><span class="mini-icon">${icon(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </section>

  <section class="section container why" id="why">
    <h2 class="why-title">Why AgricX?</h2>
    <div class="why-panel why-static">
      <ul class="check-list">
        <li>${icon('check')} Authorised dealer for leading agricultural drone brands</li>
        <li>${icon('check')} Free field assessment before you buy</li>
        <li>${icon('check')} Certified pilot training included with every drone</li>
        <li>${icon('check')} Flexible financing and fleet leasing</li>
        <li>${icon('check')} Local spare parts and 48-hour repair turnaround</li>
      </ul>
      <div class="why-visual"><img src="${img('drone-sunset.jpg')}" alt="Drone spraying corn at sunset" loading="lazy" /></div>
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>Our journey</h2></div>
    <ol class="timeline">
      <li><span>2019</span><h4>Founded</h4><p>First spraying service launched on 40 hectares of rice.</p></li>
      <li><span>2021</span><h4>Dealer network</h4><p>Became an authorised agricultural drone dealer.</p></li>
      <li><span>2023</span><h4>Training academy</h4><p>Over 300 pilots certified through the AgricX Academy.</p></li>
      <li><span>2026</span><h4>500+ farms</h4><p>Serving farms across West Africa with 24/7 support.</p></li>
    </ol>
  </section>
  ${cta()}`;
  return { title: 'About Us', description: 'Learn about AgricX, our mission and why farmers trust us.', body };
}

export function drones() {
  const cats = ['All', ...new Set(products.map((p) => p.category))];
  const body = `
  ${pageHero({ title: 'Our Drones &amp; Equipment', crumb: 'Drones', image: 'agras-drone.jpg', active: '/drones', text: 'Spraying, mapping, monitoring and ground equipment for modern farms.' })}

  <section class="section container">
    <div class="toolbar">
      <div class="filters" data-filters="#droneGrid">
        ${cats.map((c, i) => `<button class="filter ${i === 0 ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('')}
      </div>
      <label class="search-inline">${icon('search')}<input type="search" placeholder="Search products" data-product-search="#droneGrid" /></label>
    </div>
    <div class="product-grid" id="droneGrid">
      ${products.map(productCard).join('')}
    </div>
    <p class="empty" data-empty hidden>No products match your search.</p>
  </section>

  <section class="section container">
    <div class="section-head"><h2>Compare spraying drones</h2></div>
    <div class="table-wrap">
      <table class="compare">
        <thead><tr><th>Model</th><th>Payload</th><th>Flow Rate</th><th>Spray Width</th><th>Price</th></tr></thead>
        <tbody>
          ${products
            .filter((p) => p.category === 'Spraying')
            .map((p) => `<tr><td><a href="/products/${p.slug}">${p.name}</a></td><td>${p.specs['Max Payload']}</td><td>${p.specs['Flow Rate']}</td><td>${p.specs['Spray Width']}</td><td>${money(p.price)}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  </section>
  ${cta()}`;
  return { title: 'Drones', description: 'Shop agricultural spraying, mapping and scouting drones.', body };
}

export function product(p) {
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 4);
  const stars = Array.from({ length: 5 }, () => icon('star')).join('');
  const body = `
  ${pageHero({ title: p.name, crumb: `<a href="/drones">Drones</a> <span>/</span> ${p.name}`, image: p.image, active: '/drones' })}

  <section class="section container product-detail">
    <div class="gallery" data-gallery>
      <div class="gallery-main"><img src="${img(p.gallery[0])}" alt="${p.name}" data-gallery-main /></div>
      <div class="gallery-thumbs">
        ${p.gallery.map((g, i) => `<button class="${i === 0 ? 'active' : ''}" data-src="${img(g)}" aria-label="View image ${i + 1}"><img src="${img(g)}" alt="" /></button>`).join('')}
      </div>
    </div>
    <div class="product-summary">
      <span class="pill-label">${p.category}</span>
      <h2>${p.name}</h2>
      <div class="rating">${stars}<span>${p.rating} · 120+ reviews</span></div>
      <p class="price big"><del>${money(p.oldPrice)}</del> <strong>${money(p.price)}</strong> <span class="badge static">${p.badge}</span></p>
      <p>${p.description}</p>
      <div class="buy-row">
        <div class="qty" data-qty>
          <button aria-label="Decrease">${icon('minus')}</button>
          <input type="number" value="1" min="1" aria-label="Quantity" />
          <button aria-label="Increase">${icon('plus')}</button>
        </div>
        <button class="btn btn-dark" data-add-cart="${p.name}">Add to Cart <span class="dot-arrow">${icon('cart')}</span></button>
        <a href="/contact?product=${p.slug}" class="btn btn-outline">Request a Demo</a>
      </div>
      <ul class="perks">
        <li>${icon('truck')} Free delivery &amp; setup</li>
        <li>${icon('shield')} 12-month warranty</li>
        <li>${icon('graduation')} Pilot training included</li>
      </ul>
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>Specifications</h2></div>
    <div class="table-wrap">
      <table class="specs">
        <tbody>${Object.entries(p.specs).map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>You may also like</h2></div>
    <div class="product-grid">${related.map(productCard).join('')}</div>
  </section>
  ${cta()}`;
  return { title: p.name, description: p.short, body };
}

export function howItWorks() {
  const steps = [
    ['map', 'Survey the field', 'We fly a mapping drone to capture high-resolution and multispectral imagery of your farm.'],
    ['chart', 'Analyse crop health', 'Our agronomists turn the imagery into NDVI maps showing exactly where crops are stressed.'],
    ['spray', 'Precision application', 'Spraying drones apply fertilizer or crop protection only where it is needed, at variable rates.'],
    ['leaf', 'Monitor &amp; improve', 'Repeat scouting flights track recovery and feed results into next season’s plan.'],
  ];
  const faqs = [
    ['How much area can a drone spray per day?', 'An Agras T50 can cover up to 21 hectares per hour under ideal conditions; a typical day is 80–150 hectares depending on refill logistics.'],
    ['Do I need a licence to fly an agricultural drone?', 'Most countries require a remote pilot certificate for commercial spraying. Our training programme prepares you for certification.'],
    ['Can drones spray in wind or rain?', 'We recommend spraying in winds under 6 m/s and avoiding rain. The flight app warns you when conditions are unsuitable.'],
    ['What crops can be treated?', 'Rice, maize, cassava, cocoa, soybeans, vegetables, orchards and plantations. Orchard mode handles tree crops on slopes.'],
    ['Do you offer spraying as a service?', 'Yes. If you would rather not own a drone, our certified crews can treat your fields on a per-hectare basis.'],
  ];
  const body = `
  ${pageHero({ title: 'How It Works', crumb: 'How It Works', image: 'drone-field.jpg', active: '/how-it-works', text: 'From first flight to harvest in four simple steps.' })}

  <section class="section container">
    <div class="steps">
      ${steps.map(([i, t, d], n) => `<div class="step"><span class="step-num">0${n + 1}</span><span class="mini-icon">${icon(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </section>

  <section class="section container about-split reverse">
    <div class="about-copy">
      <span class="pill-label">Smart Workflow</span>
      <h2>One app from mapping to spraying</h2>
      <p>Plan routes, set application rates and track every flight from the same controller. Field boundaries from your survey drone sync automatically to your spraying fleet, so there is nothing to re-enter.</p>
      <ul class="check-list">
        <li>${icon('check')} Automatic route planning with obstacle avoidance</li>
        <li>${icon('check')} Variable-rate prescription maps</li>
        <li>${icon('check')} Flight logs and reports for every field</li>
      </ul>
      <a href="/contact" class="btn btn-dark">Book a free demo <span class="dot-arrow">${icon('arrow')}</span></a>
    </div>
    <div class="about-image"><img src="${img('drone-sunset.jpg')}" alt="Drone spraying at sunset" loading="lazy" /></div>
  </section>

  <section class="section container">
    <div class="section-head"><h2>Frequently asked questions</h2></div>
    <div class="faq accordion" data-accordion>
      ${faqs.map(([q, a], i) => `<div class="acc-item ${i === 0 ? 'open' : ''}"><button class="acc-head">${q}<span class="acc-icon">${icon('plus')}</span></button><div class="acc-body"><p>${a}</p></div></div>`).join('')}
    </div>
  </section>
  ${cta()}`;
  return { title: 'How It Works', description: 'See how AgricX drones survey, analyse and treat your fields.', body };
}

export function services() {
  const list = [
    ['spray', 'Crop Spraying', 'Per-hectare drone spraying by certified pilots for fertilizer, herbicide and pesticide.', 'drone-spray-tall.jpg'],
    ['map', 'Mapping &amp; Surveying', 'Orthomosaic, elevation and multispectral maps for planning and insurance.', 'drone-field.jpg'],
    ['chart', 'Crop Analytics', 'NDVI health reports, yield estimates and prescription maps from our agronomists.', 'field-rows.jpg'],
    ['graduation', 'Pilot Training', 'Hands-on courses and certification for you and your farm team.', 'drone-closeup.jpg'],
    ['wrench', 'Maintenance &amp; Repair', 'Scheduled servicing, genuine spare parts and 48-hour repairs.', 'mavic-drone.jpg'],
    ['truck', 'Fleet Leasing', 'Lease drones and ground equipment by the season with no upfront cost.', 'tractor-sprayer.jpg'],
  ];
  const plans = [
    ['Starter', 15, 'per hectare', ['Single spraying pass', 'Flight report', 'Weather rescheduling'], false],
    ['Grower', 12, 'per hectare', ['Mapping + spraying', 'NDVI health report', 'Variable-rate application', 'Priority scheduling'], true],
    ['Enterprise', null, 'custom', ['Dedicated crew &amp; fleet', 'Season-long monitoring', 'Agronomist on call', 'API &amp; data export'], false],
  ];
  const body = `
  ${pageHero({ title: 'Our Services', crumb: 'Services', image: 'tractor-spray.jpg', active: '/services', text: 'Everything you need to bring precision agriculture to your farm.' })}

  <section class="section container">
    <div class="service-grid">
      ${list
        .map(
          ([i, t, d, im]) => `
        <article class="service-card">
          <img src="${img(im)}" alt="" loading="lazy" />
          <div class="service-body">
            <span class="mini-icon">${icon(i)}</span>
            <h3>${t}</h3>
            <p>${d}</p>
            <a href="/contact" class="text-link">Get started ${icon('arrow')}</a>
          </div>
        </article>`
        )
        .join('')}
    </div>
  </section>

  <section class="section container">
    <div class="section-head center-head"><h2>Simple, transparent pricing</h2><p>Spraying services billed per hectare. No hidden fees.</p></div>
    <div class="pricing">
      ${plans
        .map(
          ([n, p, u, f, hot]) => `
        <div class="plan ${hot ? 'featured' : ''}">
          ${hot ? '<span class="plan-tag">Most popular</span>' : ''}
          <h3>${n}</h3>
          <p class="plan-price">${p ? `$${p}<small>/${u}</small>` : 'Let’s talk'}</p>
          <ul>${f.map((x) => `<li>${icon('check')} ${x}</li>`).join('')}</ul>
          <a href="/contact" class="btn ${hot ? 'btn-lime' : 'btn-outline'}">Choose ${n}</a>
        </div>`
        )
        .join('')}
    </div>
  </section>
  ${cta()}`;
  return { title: 'Services', description: 'Drone spraying, mapping, analytics, training and leasing services.', body };
}

export function blog() {
  const [feat, ...rest] = posts;
  const cats = ['All', ...new Set(posts.map((p) => p.category))];
  const body = `
  ${pageHero({ title: 'News &amp; Articles', crumb: 'Blog', image: 'drone-sunset.jpg', active: '/blog', text: 'Guides, stories and technical tips from the AgricX team.' })}

  <section class="section container">
    <a href="/blog/${feat.slug}" class="featured-post">
      <img src="${img(feat.image)}" alt="" />
      <div>
        <span class="tag">${feat.category}</span>
        <h2>${feat.title}</h2>
        <p>${feat.excerpt}</p>
        <p class="post-meta">${feat.date} · ${feat.read}</p>
        <span class="btn btn-dark btn-sm">Read Article <span class="dot-arrow">${icon('arrow')}</span></span>
      </div>
    </a>
  </section>

  <section class="section container">
    <div class="toolbar">
      <div class="filters" data-filters="#postGrid">
        ${cats.map((c, i) => `<button class="filter ${i === 0 ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('')}
      </div>
    </div>
    <div class="post-grid" id="postGrid">${rest.map(postCard).join('')}</div>
  </section>
  ${cta()}`;
  return { title: 'Blog', description: 'News, guides and technical articles about agricultural drones.', body };
}

export function post(p) {
  const recent = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const body = `
  ${pageHero({ title: p.title, crumb: `<a href="/blog">Blog</a> <span>/</span> ${p.category}`, image: p.image, active: '/blog' })}

  <section class="section container article-layout">
    <article class="article">
      <p class="post-meta"><span class="tag">${p.category}</span> ${p.date} · ${p.read}</p>
      <img src="${img(p.image)}" alt="" class="article-img" />
      <p class="lead dark">${p.excerpt}</p>
      <p>Precision agriculture is changing how farms operate. Drones that once seemed like a luxury are now one of the fastest ways to cut input costs and react to problems before they spread. In this article we walk through what we have learned from hundreds of flights with farmers across the region.</p>
      <h3>Start with the basics</h3>
      <p>Before every flight, check your batteries, propellers and nozzles. Small issues like a chipped blade or a partly blocked nozzle can reduce efficiency and coverage. Keep a simple pre-flight checklist in your kit and follow it every time.</p>
      <blockquote>“The biggest savings come from consistency: the same checks, the same settings, every field, every time.”</blockquote>
      <h3>Plan around the weather</h3>
      <p>Early morning and late afternoon usually offer the calmest winds and lowest evaporation. Avoid flights when wind exceeds 6 m/s and when rain is expected within two hours of application.</p>
      <ul class="check-list">
        <li>${icon('check')} Calibrate flow rate at the start of each season</li>
        <li>${icon('check')} Log every flight for traceability</li>
        <li>${icon('check')} Clean tanks and nozzles after each day</li>
      </ul>
      <h3>Keep learning</h3>
      <p>Technology moves quickly. Join our training sessions or contact the AgricX team at <a href="mailto:${site.email}">${site.email}</a> for advice on your specific crops and terrain.</p>
      <a href="/blog" class="btn btn-outline btn-sm">${icon('arrowLeft')} Back to Blog</a>
    </article>
    <aside class="sidebar">
      <div class="side-box">
        <h4>Recent posts</h4>
        ${recent.map((r) => `<a href="/blog/${r.slug}" class="side-post"><img src="${img(r.image)}" alt="" /><span>${r.title}<small>${r.date}</small></span></a>`).join('')}
      </div>
      <div class="side-box dark">
        <h4>Need expert advice?</h4>
        <p>Talk to an AgricX agronomist about your farm.</p>
        <a href="/contact" class="btn btn-lime btn-sm">Contact Us</a>
      </div>
    </aside>
  </section>
  ${cta()}`;
  return { title: p.title, description: p.excerpt, body };
}

export function contact() {
  const body = `
  ${pageHero({ title: 'Contact Us', crumb: 'Contact', image: 'tractor-sprayer.jpg', active: '/contact', text: 'Questions, quotes or demos — we would love to hear from you.' })}

  <section class="section container contact-layout">
    <div class="contact-info">
      <span class="pill-label">Get in touch</span>
      <h2>Let’s grow together</h2>
      <p>Our team usually replies within one business day.</p>
      <div class="info-list">
        <div><span class="mini-icon">${icon('phone')}</span><div><h4>Phone</h4><a href="tel:${site.phone.replace(/\s/g, '')}">${site.phone}</a></div></div>
        <div><span class="mini-icon">${icon('mail')}</span><div><h4>Email</h4><a href="mailto:${site.email}">${site.email}</a></div></div>
        <div><span class="mini-icon">${icon('pin')}</span><div><h4>Office</h4><p>${site.address}</p></div></div>
        <div><span class="mini-icon">${icon('clock')}</span><div><h4>Hours</h4><p>Mon – Sat, 8:00 – 18:00</p></div></div>
      </div>
    </div>
    <form class="contact-form" data-contact-form novalidate>
      <div class="field-row">
        <label>Full name<input name="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
      </div>
      <div class="field-row">
        <label>Phone<input name="phone" type="tel" placeholder="+234…" /></label>
        <label>Interested in
          <select name="product">
            <option value="">General enquiry</option>
            ${products.map((p) => `<option value="${p.slug}">${p.name}</option>`).join('')}
            <option value="service">Spraying service</option>
            <option value="training">Pilot training</option>
          </select>
        </label>
      </div>
      <label>Farm size (hectares)<input name="size" type="number" min="0" placeholder="e.g. 50" /></label>
      <label>Message<textarea name="message" rows="5" required placeholder="Tell us about your farm and what you need"></textarea></label>
      <button type="submit" class="btn btn-dark">Send Message <span class="dot-arrow">${icon('arrow')}</span></button>
      <p class="form-note" data-form-note hidden></p>
    </form>
  </section>
  ${cta()}`;
  return { title: 'Contact', description: 'Contact AgricX for quotes, demos and support.', body };
}

export function notFound() {
  const body = `
  ${pageHero({ title: 'Page not found', crumb: '404', image: 'phantom-drone.jpg', text: 'This drone flew off course. Let’s get you back on track.' })}
  <section class="section container center">
    <a href="/" class="btn btn-dark">Back to Home <span class="dot-arrow">${icon('arrow')}</span></a>
  </section>`;
  return { title: 'Not Found', body };
}
