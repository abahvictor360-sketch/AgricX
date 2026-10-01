import { products, posts } from '../data.js';
import { icon, img, homeHeader, productCard, postCard, cta } from '../layout.js';

export default function home() {
  const body = `
  <section class="hero-shell hero-home" style="--bg:url('${img('field-rows.jpg')}')">
    ${homeHeader()}
    <div class="hero-grid">
      <div class="hero-copy">
        <h1>Part of future <span class="nowrap">Agriculture <span class="hero-badge">${icon('leaf')}</span></span></h1>
        <p class="lead">Spraying, mapping and scouting drones that help farmers cover more ground with less water, less chemical and less effort.</p>
        <a href="/drones" class="btn btn-outline-light">Shop All <span class="line-arrow">${icon('arrow')}</span></a>
      </div>
      <aside class="rating-card">
        <div class="rating-top">
          <strong>4.9<sup>★</sup></strong>
          <span>500+ Customers Review</span>
        </div>
        <div class="avatars"><span>AO</span><span>KM</span><span>TB</span></div>
        <div class="rating-bottom">
          <span class="g-mark">G</span>
          <a href="/about" class="round-arrow dark" aria-label="Read reviews">${icon('sparkle')}</a>
        </div>
      </aside>
    </div>
    <div class="hero-cards">
      <article class="hero-card">
        <img src="${img('agras-drone.jpg')}" alt="DJI Agras T50 spraying a field" />
        <div>
          <h3>DJI Agras T50</h3>
          <p>Fully automatic and manual operation, orchard mode, variable rate.</p>
          <a href="/products/agras-t50" class="btn btn-outline btn-xs">View Details</a>
        </div>
        <a href="/products/agras-t50" class="round-arrow lime corner" aria-label="View DJI Agras T50">${icon('arrowUpRight')}</a>
      </article>
      <article class="hero-card hero-card-2">
        <div>
          <h3>DJI Mavic 3M</h3>
          <p>Multispectral mapping for crop-health insight before you spray.</p>
          <a href="/products/mavic-3m" class="btn btn-dark btn-xs">Explore More <span class="dot-arrow">${icon('arrow')}</span></a>
        </div>
        <img src="${img('mavic-drone.jpg')}" alt="DJI Mavic 3M drone" />
      </article>
    </div>
  </section>

  <section class="section container">
    <div class="section-head split">
      <h2 class="display">
        <span class="chip-icon">${icon('drone')}</span> Elevates<br />
        drone agricultural <span class="spark">${icon('sparkle')}</span><br />
        <span class="indent">operations new heights</span>
      </h2>
      <a href="/drones" class="btn btn-outline btn-sm">Explore Drones</a>
    </div>
    <div class="feature-slider">
      <div class="slider-intro">
        <p>The DJI RC Plus has a 7-inch high-brightness screen and an 8-core processor for smooth operations. Intelligent route planning minimises distances flown, with a full rate.</p>
        <div class="slider-arrows">
          <button class="circle-btn" data-scroll="#featureTrack" data-dir="-1" aria-label="Previous">${icon('arrowLeft')}</button>
          <button class="circle-btn" data-scroll="#featureTrack" data-dir="1" aria-label="Next">${icon('arrow')}</button>
        </div>
      </div>
      <div class="track" id="featureTrack">
        ${[
          ['drone-tractor.jpg', 'Heavy Payload'],
          ['field-rows.jpg', 'Smooth Spreading'],
          ['drone-sunset.jpg', 'Four Sprinkler Kit'],
          ['drone-spray-tall.jpg', 'Precision Spraying'],
          ['smart-farm.jpg', 'Smart Planting'],
        ]
          .map(([f, t]) => `<figure class="tile"><img src="${img(f)}" alt="${t}" loading="lazy" /><figcaption>${t}</figcaption></figure>`)
          .join('')}
      </div>
    </div>
  </section>

  <section class="section container">
    <h2 class="display center">
      <span class="spark">${icon('sparkle')}</span> Elevates agricultural<br />
      operations to <span class="pill-arrow">${icon('arrow')}</span><br />
      <span class="indent">new heights</span>
    </h2>
    <div class="spec-split">
      <div class="accordion" data-accordion>
        <div class="acc-item open">
          <button class="acc-head">Magnetic Drive Impeller Pump</button>
          <div class="acc-body"><p>Dual pump flow rate of up to 24 L/min — a 100% increase compared with the previous generation — to meet the demands of fields, orchards and high-temperature environments.</p></div>
        </div>
        <div class="acc-item">
          <button class="acc-head">Dual Atomizing Centrifugal Sprinklers</button>
          <div class="acc-body"><p>Droplet size is adjustable from 50 to 500 μm, giving uniform coverage and reducing drift on windy days.</p></div>
        </div>
        <div class="acc-item">
          <button class="acc-head">Brand-New Solenoid Valves</button>
          <div class="acc-body"><p>Fast-switching valves stop spraying instantly at field edges and over gaps, eliminating overlap waste.</p></div>
        </div>
      </div>
      <div class="spec-image">
        <img src="${img('agras-drone.jpg')}" alt="Agricultural drone spraying crops" loading="lazy" />
      </div>
    </div>
  </section>

  <section class="section container about-split">
    <div class="about-image">
      <img src="${img('drone-spray-tall.jpg')}" alt="Drone spraying a field" loading="lazy" />
    </div>
    <div class="about-copy">
      <span class="pill-label">About Us</span>
      <h2>Tested for reliability and durability</h2>
      <p>The AgricX lineup elevates drone agricultural operations to new heights. Each model inherits a powerful coaxial twin-rotor propulsion system and a split-type torque-resistant structure for next-level stability when carrying 40 kg spraying or 50 kg spreading payloads.</p>
      <div class="mini-features">
        <div>
          <span class="mini-icon">${icon('spray')}</span>
          <h4>Smooth Spreading</h4>
          <p>Fully automatic and manual operation, orchard mode, variable rate application.</p>
        </div>
        <div>
          <span class="mini-icon">${icon('weight')}</span>
          <h4>50 kg Payload</h4>
          <p>75 L max capacity and an expanded loading port for quick refills.</p>
        </div>
      </div>
      <a href="/about" class="btn btn-dark">Learn more about us <span class="dot-arrow">${icon('arrow')}</span></a>
    </div>
  </section>

  <section class="section container why" id="why">
    <h2 class="why-title">Why AgricX?</h2>
    <div class="why-panel">
      <div class="why-list" data-accordion>
        <div class="why-item acc-item open">
          <button class="acc-head"><span>All Scenario Adaptability</span><span class="num">01</span></button>
          <div class="acc-body">
            <div class="why-body">
              <p>Fully automatic and manual operation, orchard mode and variable-rate application let one drone handle row crops, terraces and tree crops.</p>
              <img src="${img('tractor-spray.jpg')}" alt="" loading="lazy" />
            </div>
          </div>
        </div>
        <div class="why-item acc-item">
          <button class="acc-head"><span>Heavy Payload</span><span class="num">02</span></button>
          <div class="acc-body"><div class="why-body"><p>Carry 40 kg of liquid or 50 kg of granules per flight, cutting refill trips in half.</p><img src="${img('drone-tractor.jpg')}" alt="" loading="lazy" /></div></div>
        </div>
        <div class="why-item acc-item">
          <button class="acc-head"><span>Four Sprinkler Kit</span><span class="num">03</span></button>
          <div class="acc-body"><div class="why-body"><p>Optional four-sprinkler kit widens the spray swath to 11 m for broad-acre crops.</p><img src="${img('drone-sunset.jpg')}" alt="" loading="lazy" /></div></div>
        </div>
        <div class="why-item acc-item">
          <button class="acc-head"><span>High Flow Rate</span><span class="num">04</span></button>
          <div class="acc-body"><div class="why-body"><p>Up to 24 L/min means a hectare sprayed in under two minutes.</p><img src="${img('agras-drone.jpg')}" alt="" loading="lazy" /></div></div>
        </div>
      </div>
      <div class="why-visual">
        <img src="${img('smart-farm.jpg')}" alt="Drone flying over a planter and tractor" loading="lazy" />
        <div class="why-card">
          <a href="/how-it-works" class="play" aria-label="See how it works">${icon('play')}</a>
          <h4>Spreader &amp; spiral channel spinning disk significantly</h4>
          <a href="/how-it-works" class="btn btn-outline btn-xs">View More <span class="dot-arrow">${icon('arrow')}</span></a>
        </div>
      </div>
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <h2>Explore Our Products</h2>
      <div class="slider-arrows">
        <button class="circle-btn" data-scroll="#productTrack" data-dir="-1" aria-label="Previous">${icon('arrowLeft')}</button>
        <button class="circle-btn" data-scroll="#productTrack" data-dir="1" aria-label="Next">${icon('arrow')}</button>
      </div>
    </div>
    <div class="track product-track" id="productTrack">
      ${products.map(productCard).join('')}
    </div>
  </section>

  <section class="section container">
    <div class="section-head">
      <h2>News &amp; Articles</h2>
      <a href="/blog" class="btn btn-outline btn-sm">View All</a>
    </div>
    <div class="post-grid">
      ${posts.slice(0, 3).map(postCard).join('')}
    </div>
  </section>

  ${cta()}`;

  return { title: '', body };
}
