import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SourcingInquiry, ManufacturerApplication } from '../types';

const STORAGE_KEY_INQUIRIES = 'tnes_saved_inquiries';
const STORAGE_KEY_MANUFACTURERS = 'tnes_saved_manufacturers';

function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TNES-${new Date().getFullYear()}-${randomPart}`;
}

// Default initial mock inquiry for demonstration/verification purposes
const DEMO_INQUIRIES: SourcingInquiry[] = [
  {
    id: 'demo-inquiry-1',
    trackingCode: 'TNES-2026-X9B2',
    createdAt: '2026-10-18T09:30:00Z',
    companyName: 'Nordic Apparel Handels GmbH',
    buyerName: 'Lukas Meyer',
    email: 'lukas@example.de',
    phoneWhatsapp: '+49 170 1234567',
    country: 'Germany',
    website: 'https://example.de',
    sectorId: 'apparel-knitwear',
    productName: 'Organic Combed Cotton Heavyweight Crewneck Sweatshirts',
    detailedSpecifications: '100% Combed Organic Cotton Fleece, 380 GSM, loopback interior, double-needle coverstitch on neck and hem. Pantone 19-4005 TCX and Pantone 11-0601 TCX.',
    targetQuantity: 'Subject to quotation (estimated initial run for Spring assortment)',
    targetPort: 'V.O. Chidambaranar Port (Tuticorin)',
    targetDeliveryWindow: 'Q2 2027 shipping window',
    complianceRequirements: 'GOTS transaction certificates for raw yarn; Sedex or equivalent social audit documentation.',
    additionalNotes: 'Need initial counter-samples dispatched for fit approval.',
    status: 'Supplier Identification'
  }
];

export const inquiryService = {
  async submitSourcingInquiry(
    inquiryData: Omit<SourcingInquiry, 'id' | 'trackingCode' | 'createdAt' | 'status'>
  ): Promise<SourcingInquiry> {
    const newInquiry: SourcingInquiry = {
      ...inquiryData,
      id: crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}`,
      trackingCode: generateTrackingCode(),
      createdAt: new Date().toISOString(),
      status: 'Inquiry Received'
    };

    // Save to local storage cache first
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      const list: SourcingInquiry[] = stored ? JSON.parse(stored) : [];
      list.unshift(newInquiry);
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(list));
    } catch (e) {
      console.warn('Local storage write warning', e);
    }

    // Try Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('sourcing_inquiries').insert([
          {
            id: newInquiry.id,
            tracking_code: newInquiry.trackingCode,
            company_name: newInquiry.companyName,
            buyer_name: newInquiry.buyerName,
            email: newInquiry.email,
            phone_whatsapp: newInquiry.phoneWhatsapp,
            country: newInquiry.country,
            website: newInquiry.website,
            sector_id: newInquiry.sectorId,
            product_name: newInquiry.productName,
            detailed_specifications: newInquiry.detailedSpecifications,
            target_quantity: newInquiry.targetQuantity,
            target_port: newInquiry.targetPort,
            target_delivery_window: newInquiry.targetDeliveryWindow,
            compliance_requirements: newInquiry.complianceRequirements,
            additional_notes: newInquiry.additionalNotes,
            status: newInquiry.status
          }
        ]);
        if (error) {
          console.warn('Supabase sync notice:', error.message);
        }
      } catch (err) {
        console.warn('Supabase connection warning:', err);
      }
    }

    return newInquiry;
  },

  async getInquiryByTrackingCode(trackingCode: string): Promise<SourcingInquiry | null> {
    const trimmed = trackingCode.trim().toUpperCase();

    // Check demo inquiries first
    const demoFound = DEMO_INQUIRIES.find(
      (item) => item.trackingCode.toUpperCase() === trimmed
    );
    if (demoFound) return demoFound;

    // Check localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (stored) {
        const list: SourcingInquiry[] = JSON.parse(stored);
        const match = list.find((item) => item.trackingCode.toUpperCase() === trimmed);
        if (match) return match;
      }
    } catch (e) {
      console.warn('Local storage read warning', e);
    }

    // Try Supabase if available
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('sourcing_inquiries')
          .select('*')
          .eq('tracking_code', trimmed)
          .single();

        if (data && !error) {
          return {
            id: data.id,
            trackingCode: data.tracking_code,
            createdAt: data.created_at,
            companyName: data.company_name,
            buyerName: data.buyer_name,
            email: data.email,
            phoneWhatsapp: data.phone_whatsapp,
            country: data.country,
            website: data.website,
            sectorId: data.sector_id,
            productName: data.product_name,
            detailedSpecifications: data.detailed_specifications,
            targetQuantity: data.target_quantity,
            targetPort: data.target_port,
            targetDeliveryWindow: data.target_delivery_window,
            complianceRequirements: data.compliance_requirements,
            additionalNotes: data.additional_notes,
            status: data.status
          };
        }
      } catch (err) {
        console.warn('Supabase query warning:', err);
      }
    }

    return null;
  },

  getLocalInquiries(): SourcingInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      const list = stored ? JSON.parse(stored) : [];
      return [...list, ...DEMO_INQUIRIES];
    } catch {
      return [...DEMO_INQUIRIES];
    }
  },

  async submitManufacturerApplication(
    appData: Omit<ManufacturerApplication, 'id' | 'createdAt' | 'status'>
  ): Promise<ManufacturerApplication> {
    const application: ManufacturerApplication = {
      ...appData,
      id: crypto.randomUUID ? crypto.randomUUID() : `mfr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Received'
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY_MANUFACTURERS);
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(application);
      localStorage.setItem(STORAGE_KEY_MANUFACTURERS, JSON.stringify(list));
    } catch (e) {
      console.warn('Local storage write warning', e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('manufacturer_applications').insert([
          {
            id: application.id,
            company_name: application.companyName,
            contact_person: application.contactPerson,
            email: application.email,
            phone: application.phone,
            location_cluster: application.locationCluster,
            product_categories: application.productCategories,
            factory_address: application.factoryAddress,
            gst_number: application.gstNumber,
            iec_code: application.iecCode,
            production_capabilities: application.productionCapabilities,
            export_experience_summary: application.exportExperienceSummary,
            status: application.status
          }
        ]);
      } catch (err) {
        console.warn('Supabase manufacturer insert warning:', err);
      }
    }

    return application;
  }
};
