import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://example.com';
const LANGUAGES = ['en', 'ar', 'fr', 'de', 'es', 'ta'];

const BASE_ROUTES = [
  '',
  '/products',
  '/products/textiles-garments',
  '/products/leather-goods',
  '/products/bags-packaging',
  '/products/engineering-components',
  '/products/auto-components',
  '/products/pumps-electricals',
  '/products/rubber-plastics',
  '/products/handicrafts-home-decor',
  '/products/agricultural-products',
  '/products/food-processing',
  '/products/coir-natural-fibre',
  '/products/granite-stone-ceramics',
  '/how-it-works',
  '/buyers',
  '/manufacturers',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms'
];

function getUrl(route, lang) {
  if (lang === 'en') {
    return `${SITE_URL}${route}`;
  }
  return `${SITE_URL}/${lang}${route}`;
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

for (const route of BASE_ROUTES) {
  for (const lang of LANGUAGES) {
    const loc = getUrl(route, lang);
    xml += `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${getUrl(route, 'en')}" />
`;
    for (const altLang of LANGUAGES) {
      xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${getUrl(route, altLang)}" />
`;
    }
    xml += `    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : route.startsWith('/products/') ? '0.8' : '0.9'}</priority>
  </url>
`;
  }
}

xml += `</urlset>
`;

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
console.log('Generated sitemap.xml with 12 category slugs and 6 languages successfully.');
