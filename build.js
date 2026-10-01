import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products, posts } from './src/data.js';
import { layout } from './src/layout.js';
import home from './src/pages/home.js';
import * as p from './src/pages/inner.js';

const out = 'dist';
rmSync(out, { recursive: true, force: true });
cpSync('public', out, { recursive: true });

const write = (file, page) => {
  const path = join(out, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, layout(page));
};

write('index.html', home());
write('about.html', p.about());
write('drones.html', p.drones());
write('how-it-works.html', p.howItWorks());
write('services.html', p.services());
write('blog.html', p.blog());
write('contact.html', p.contact());
write('404.html', p.notFound());
products.forEach((x) => write(`products/${x.slug}.html`, p.product(x)));
posts.forEach((x) => write(`blog/${x.slug}.html`, p.post(x)));

console.log(`Built ${8 + products.length + posts.length} pages into ${out}/`);
