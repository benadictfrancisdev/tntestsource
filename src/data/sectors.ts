import { ManufacturingSector } from '../types';

export const MANUFACTURING_SECTORS: ManufacturingSector[] = [
  {
    id: 'apparel-knitwear',
    name: 'Knitted Apparel & Garments',
    primaryCluster: 'Tirupur Cluster',
    secondaryClusters: ['Coimbatore', 'Erode'],
    overview: 'Tamil Nadu’s knitwear hub handles diverse circular and flat knitting operations. Through regional manufacturers, we help identify production lines for cotton, blends, activewear, and fashion jersey, subject to supplier confirmation of specific line availability.',
    materialsAndProcesses: [
      'Carded and combed ring-spun cotton',
      'Organic cotton and GOTS-aligned yarn sourcing',
      'Circular knitting: single jersey, pique, interlock, rib, fleece',
      'Rotary screen printing, digital pigment, and piece dyeing',
      'Automated cutting, flatlock stitching, and packaging'
    ],
    commonExportCategories: [
      'Basic and printed cotton T-shirts',
      'Performance polo shirts & athleisure wear',
      'Nightwear, pyjama sets, and loungewear',
      'Infant and children’s knitted sets'
    ],
    keyLogisticsPorts: ['V.O. Chidambaranar Port (Tuticorin)', 'Chennai Port', 'Coimbatore ICD'],
    illustrativeDiagramType: 'textiles'
  },
  {
    id: 'precision-engineering',
    name: 'Precision Engineering & Castings',
    primaryCluster: 'Coimbatore Cluster',
    secondaryClusters: ['Salem', 'Madurai'],
    overview: 'Recognized for foundry craftsmanship and precision machining. We source technical partners capable of grey iron casting, SG ductile iron, and CNC multi-axis milling for mechanical, agricultural, and fluid-handling applications, subject to supplier confirmation.',
    materialsAndProcesses: [
      'Grey iron (FG series) and ductile ductile iron (SGI)',
      'High-pressure molding, shell molding, and sand casting',
      '4-axis and 5-axis CNC vertical and horizontal machining',
      'Coordinate Measuring Machine (CMM) dimensional verification',
      'Shot blasting, anti-corrosive priming, and phosphate coating'
    ],
    commonExportCategories: [
      'Pump volutes, impellers, and fluid handling housings',
      'Valve bodies and high-pressure industrial flanges',
      'Electric motor end-shields and precision motor frames',
      'Agricultural implement components and transmission cases'
    ],
    keyLogisticsPorts: ['V.O. Chidambaranar Port (Tuticorin)', 'Cochin Port / ICD Coimbatore', 'Chennai Port'],
    illustrativeDiagramType: 'engineering'
  },
  {
    id: 'home-textiles',
    name: 'Woven Home Textiles & Made-Ups',
    primaryCluster: 'Karur Cluster',
    secondaryClusters: ['Erode', 'Komarapalayam'],
    overview: 'Centered in the Amaravathi basin, Karur is an internationally established cluster for yarn-dyed woven home furnishings. We help buyers identify weaving units producing table, kitchen, bath, and bed linens tailored to target textile specifications.',
    materialsAndProcesses: [
      '100% Cotton, recycled cotton blends, linen blends',
      'Dobby and Jacquard shuttleless rapier weaving',
      'Reactive yarn dyeing and continuous bleaching ranges',
      'Hemming, mitred corners, table runner tailored finishing',
      'Sustainable fiber blends and natural yarn washes'
    ],
    commonExportCategories: [
      'Kitchen towels, aprons, oven mitts, and dish cloths',
      'Table runners, place mats, and woven tablecloths',
      'Curtain drapes, jacquard cushion covers, and throws',
      'Woven bed runners and decorative living furnishings'
    ],
    keyLogisticsPorts: ['Tuticorin Port', 'Chennai Port', 'Cochin Port'],
    illustrativeDiagramType: 'home-linen'
  },
  {
    id: 'auto-components',
    name: 'Automotive & Mechanical Components',
    primaryCluster: 'Chennai & Sriperumbudur Corridor',
    secondaryClusters: ['Hosur', 'Coimbatore'],
    overview: 'The manufacturing belt surrounding Chennai and Hosur hosts extensive tier-supplier ecosystems. We help source industrial precision turned components, sheet metal pressings, and tooling partners, subject to supplier confirmation of tooling lead and capacity.',
    materialsAndProcesses: [
      'Alloy steel, stainless steel, brass, and aluminum turning',
      'Progressive stamping and deep draw metal presses',
      'Induction hardening, heat treatment, and case carburizing',
      'Zinc-nickel electroplating and electrophoretic (CED) coating',
      'Sub-assembly integration and custom packaging'
    ],
    commonExportCategories: [
      'Automotive turned pins, bushes, and fasteners',
      'Pressed chassis brackets and stamped engine mounts',
      'Tubular exhaust and fluid routing fabrications',
      'Machined aluminum housings and sensor enclosures'
    ],
    keyLogisticsPorts: ['Chennai Port', 'Kattupalli Port', 'Ennore Port'],
    illustrativeDiagramType: 'auto-components'
  },
  {
    id: 'leather-goods',
    name: 'Finished Leather Goods & Footwear',
    primaryCluster: 'Ambur & Ranipet Cluster',
    secondaryClusters: ['Vaniyambadi', 'Chennai'],
    overview: 'The Palar valley cluster maintains a longstanding heritage in leather tanning and craftsmanship. We coordinate with compliant manufacturers producing full-grain leather footwear, protective workwear, and travel leather accessories according to international buyer patterns.',
    materialsAndProcesses: [
      'Full grain cowhide, buffalo leather, and goat suede',
      'Chrome-free, vegetable-tanned, and water-resistant leathers',
      'Lasting, Goodyear welting, and direct-injection sole molding',
      'Reinforced saddle stitching and edge skiving',
      'REACH-compliant chemical finishing processes'
    ],
    commonExportCategories: [
      'Men’s and women’s formal and casual dress shoes',
      'Industrial protective safety footwear (steel toe cap)',
      'Full-grain leather weekenders, laptop bags, and wallets',
      'Industrial protective leather gloves and aprons'
    ],
    keyLogisticsPorts: ['Chennai Port', 'Kattupalli Port'],
    illustrativeDiagramType: 'leather'
  },
  {
    id: 'commercial-packaging',
    name: 'Rigid Box & Industrial Packaging',
    primaryCluster: 'Sivakasi Cluster',
    secondaryClusters: ['Chennai', 'Madurai'],
    overview: 'Sivakasi is India’s foremost printing and paper converting center. We source print and packaging specialists for luxury rigid boxes, corrugated export cartons, folding cartons, and printed collateral, subject to supplier confirmation of die-lines.',
    materialsAndProcesses: [
      'High-speed multi-color Heidelberg / Komori offset presses',
      'Duplex board, kraft corrugated fluting, and rigid paperboard',
      'Thermal lamination, spot UV, hot foil stamping, and embossing',
      'Automatic die-cutting, window patching, and folder-gluing',
      'Biodegradable aqueous coatings and soy-based inks'
    ],
    commonExportCategories: [
      'Magnetic closure luxury gift and product boxes',
      'E-commerce corrugated postal cartons & shipping shippers',
      'Pharmaceutical & cosmetic folded cartons',
      'Custom printed hangtags, woven labels, and inserts'
    ],
    keyLogisticsPorts: ['Tuticorin Port', 'Chennai Port'],
    illustrativeDiagramType: 'packaging'
  }
];
