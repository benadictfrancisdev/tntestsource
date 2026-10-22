export type CategoryGroup =
  | 'Textiles & Leather'
  | 'Engineering & Industrial'
  | 'Home & Lifestyle'
  | 'Agri & Food'
  | 'Natural Materials & Stone';

export interface CategoryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  short: string;
  group: CategoryGroup;
  productTypes: string[];
  clusters: string[];
  quoteInfo: string[];
  image?: CategoryImage;
}

export const COMMON_QUOTE_INFO = [
  'Material',
  'Dimensions/specification',
  'Quantity',
  'Packaging',
  'Destination',
  'Target delivery date'
];

export const CATEGORY_GROUPS: CategoryGroup[] = [
  'Textiles & Leather',
  'Engineering & Industrial',
  'Home & Lifestyle',
  'Agri & Food',
  'Natural Materials & Stone'
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'textiles-garments',
    name: 'Textiles, Garments & Home Furnishings',
    short: 'Knitwear, apparel, towels, home textiles, uniforms and made-ups, subject to supplier confirmation.',
    group: 'Textiles & Leather',
    productTypes: [
      'Knitwear',
      'Apparel',
      'Uniforms',
      'Towels',
      'Bed and home textiles',
      'Made-ups'
    ],
    clusters: ['Tiruppur', 'Coimbatore', 'Erode', 'Chennai'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'leather-goods',
    name: 'Leather Goods & Footwear',
    short: 'Bags, wallets, belts, footwear and selected leather accessories, subject to supplier confirmation.',
    group: 'Textiles & Leather',
    productTypes: [
      'Wallets',
      'Belts',
      'Bags',
      'Footwear',
      'Selected accessories'
    ],
    clusters: ['Ambur', 'Vaniyambadi', 'Ranipet', 'Chennai'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'bags-packaging',
    name: 'Bags & Packaging',
    short: 'Cotton and canvas bags, reusable shopping bags and suitable packaging products, subject to supplier confirmation.',
    group: 'Textiles & Leather',
    productTypes: [
      'Cotton and canvas bags',
      'Reusable shopping bags',
      'Custom printed bags',
      'Packaging containers'
    ],
    clusters: ['Chennai', 'Tiruppur', 'Coimbatore', 'Sivakasi'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'engineering-components',
    name: 'Engineering & Industrial Components',
    short: 'Precision-machined parts, fabricated metal parts, fasteners and selected industrial components, subject to supplier confirmation.',
    group: 'Engineering & Industrial',
    productTypes: [
      'CNC machined parts',
      'Fabricated metal parts',
      'Fasteners',
      'Industrial components',
      'Castings and forgings'
    ],
    clusters: ['Chennai', 'Ambattur', 'Sriperumbudur', 'Oragadam', 'Coimbatore'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'auto-components',
    name: 'Auto Components & Mobility Parts',
    short: 'Machined and cast components, rubber and metal parts, wiring and fittings, and aftermarket parts, subject to supplier confirmation.',
    group: 'Engineering & Industrial',
    productTypes: [
      'Machined and cast components',
      'Rubber and metal parts',
      'Wiring and fittings',
      'Aftermarket parts'
    ],
    clusters: ['Chennai', 'Hosur', 'Sriperumbudur', 'Oragadam'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'pumps-electricals',
    name: 'Pumps, Motors & Electricals',
    short: 'Pumps and pump parts, electric motors, switchgear components, cables and fittings, subject to supplier confirmation.',
    group: 'Engineering & Industrial',
    productTypes: [
      'Pumps and pump parts',
      'Electric motors',
      'Switchgear components',
      'Cables and fittings'
    ],
    clusters: ['Coimbatore', 'Chennai'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'rubber-plastics',
    name: 'Rubber & Plastic Products',
    short: 'Moulded rubber parts, plastic components, packaging containers and household products, subject to supplier confirmation.',
    group: 'Engineering & Industrial',
    productTypes: [
      'Moulded rubber parts',
      'Plastic components',
      'Packaging containers',
      'Household products'
    ],
    clusters: ['Chennai', 'Ambattur', 'Coimbatore'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'handicrafts-home-decor',
    name: 'Handicrafts & Home Décor',
    short: 'Selected artisan-made products, decorative goods and gift items, subject to supplier confirmation.',
    group: 'Home & Lifestyle',
    productTypes: [
      'Artisan-made decorative items',
      'Metal and brass crafts',
      'Terracotta and pottery',
      'Wood craft and carved gifts'
    ],
    clusters: ['Madurai', 'Thanjavur', 'Swamimalai', 'Chennai'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'agricultural-products',
    name: 'Agricultural Products & Ingredients',
    short: 'Selected products such as moringa, spices and other items, subject to supplier verification and destination-market requirements.',
    group: 'Agri & Food',
    productTypes: [
      'Moringa leaf and powder',
      'Selected spices',
      'Turmeric and dry ginger',
      'Agricultural raw ingredients'
    ],
    clusters: ['Dindigul', 'Theni', 'Erode', 'Tuticorin'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'food-processing',
    name: 'Food Processing & Packaged Foods',
    short: 'Packaged snacks, spice blends, ready mixes and processed ingredients, subject to supplier confirmation.',
    group: 'Agri & Food',
    productTypes: [
      'Packaged snacks',
      'Spice blends',
      'Ready mixes',
      'Processed food ingredients'
    ],
    clusters: ['Madurai', 'Chennai', 'Coimbatore', 'Virudhunagar'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'coir-natural-fibre',
    name: 'Coir & Natural Fibre Products',
    short: 'Coir mats, coco pith and grow bags, ropes and twine, natural fibre home products, subject to supplier confirmation.',
    group: 'Natural Materials & Stone',
    productTypes: [
      'Coir mats and geotextiles',
      'Coco pith and grow bags',
      'Ropes and twine',
      'Natural fibre home products'
    ],
    clusters: ['Pollachi', 'Coimbatore', 'Dindigul'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'granite-stone-ceramics',
    name: 'Granite, Stone & Ceramics',
    short: 'Granite slabs and tiles, stone products, ceramic and terracotta items, garden and home products, subject to supplier confirmation.',
    group: 'Natural Materials & Stone',
    productTypes: [
      'Granite slabs and tiles',
      'Dimension stone products',
      'Ceramic and terracotta items',
      'Garden and architectural stone'
    ],
    clusters: ['Salem', 'Krishnagiri', 'Madurai', 'Namakkal'],
    quoteInfo: COMMON_QUOTE_INFO
  }
];

export const CATEGORY_SLUGS = PRODUCT_CATEGORIES.map((c) => c.slug);
