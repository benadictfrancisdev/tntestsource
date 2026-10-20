export interface ProductCategory {
  slug: string;
  name: string;
  short: string;
  productTypes: string[];
  clusters: string[];
  quoteInfo: string[];
}

const COMMON_QUOTE_INFO = [
  'Material',
  'Dimensions/specification',
  'Quantity',
  'Packaging',
  'Destination',
  'Target delivery date'
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'textiles-garments',
    name: 'Textiles, Garments & Home Furnishings',
    short: 'knitwear, apparel, towels, home textiles, uniforms and made-ups.',
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
    short: 'bags, wallets, belts, footwear and selected leather accessories.',
    productTypes: [
      'Wallets',
      'Belts',
      'Bags',
      'Footwear',
      'Selected accessories'
    ],
    clusters: ['Ambur', 'Vaniyambadi', 'Ranipet', 'Chennai region'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'bags-packaging',
    name: 'Bags & Packaging',
    short: 'cotton and canvas bags, reusable shopping bags and suitable packaging products.',
    productTypes: [
      'Cotton/canvas totes',
      'Reusable bags',
      'Custom printed bags',
      'Selected packaging'
    ],
    clusters: ['Chennai and textile/manufacturing clusters'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'engineering-components',
    name: 'Engineering & Industrial Components',
    short: 'precision-machined parts, fabricated metal parts, fasteners and selected industrial components.',
    productTypes: [
      'CNC parts',
      'Metal fabrication',
      'Fasteners',
      'Components',
      'Selected rubber/metal parts'
    ],
    clusters: [
      'Chennai',
      'Ambattur',
      'Sriperumbudur',
      'Oragadam',
      'Coimbatore'
    ],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'handicrafts-home-decor',
    name: 'Handicrafts & Home Décor',
    short: 'selected artisan-made products, decorative goods and gift items.',
    productTypes: [
      'Selected artisan products',
      'Gifts',
      'Decorative items'
    ],
    clusters: ['Supplier-led discovery across Tamil Nadu'],
    quoteInfo: COMMON_QUOTE_INFO
  },
  {
    slug: 'agricultural-products',
    name: 'Agricultural Products & Ingredients',
    short: 'selected products such as moringa, spices and other items, subject to supplier verification and destination-market requirements.',
    productTypes: [
      'Selected spices',
      'Moringa products',
      'Other agricultural items'
    ],
    clusters: [
      'Supplier-led discovery; processing, traceability and export requirements are verified per supplier'
    ],
    quoteInfo: COMMON_QUOTE_INFO
  }
];
