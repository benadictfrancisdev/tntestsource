export interface ManufacturingSector {
  id: string;
  name: string;
  primaryCluster: string;
  secondaryClusters: string[];
  overview: string;
  materialsAndProcesses: string[];
  commonExportCategories: string[];
  keyLogisticsPorts: string[];
  illustrativeDiagramType: 'textiles' | 'engineering' | 'home-linen' | 'leather' | 'packaging' | 'auto-components';
}

export interface SourcingInquiry {
  id: string;
  trackingCode: string;
  createdAt: string;
  companyName: string;
  buyerName: string;
  email: string;
  phoneWhatsapp: string;
  country: string;
  website?: string;
  sectorId: string;
  productName: string;
  detailedSpecifications: string;
  targetQuantity: string;
  targetPort: 'Chennai Port' | 'V.O. Chidambaranar Port (Tuticorin)' | 'Kattupalli Port' | 'Air Cargo (MAA/CJB)' | 'Flexible';
  targetDeliveryWindow?: string;
  complianceRequirements?: string;
  additionalNotes?: string;
  status: 'Inquiry Received' | 'Technical Review' | 'Supplier Identification' | 'Quotations In Coordination' | 'Delivered to Buyer';
}

export interface ManufacturerApplication {
  id: string;
  createdAt: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  locationCluster: string;
  productCategories: string[];
  factoryAddress: string;
  gstNumber?: string;
  iecCode?: string; // Import Export Code in India
  productionCapabilities: string;
  exportExperienceSummary: string;
  status: 'Received' | 'Documentation Review' | 'Initial Interview Scheduled';
}
