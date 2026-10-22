import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  BuyerEnquiryRecord,
  ManufacturerApplicationRecord,
  ContactMessageRecord,
  RequestStatus,
  ProductLineItem
} from '../types/database';
import { ADMIN_EMAIL } from '../config/site';

const STORAGE_KEY_BUYERS = 'tnes_buyer_enquiries_v2';
const STORAGE_KEY_MFRS = 'tnes_mfr_applications_v2';
const STORAGE_KEY_CONTACTS = 'tnes_contact_messages_v2';
const STORAGE_KEY_ADMIN_AUTH = 'tnes_admin_session_v1';
const STORAGE_KEY_SEQ = 'connecthf_qr_sequence_v1';

// Seed initial realistic entries for immediate admin testing
const INITIAL_BUYER_ENQUIRIES: BuyerEnquiryRecord[] = [
  {
    id: 'inq-seed-01',
    reference_no: 'QR-2026-00001',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'new',
    full_name: 'David Reynolds',
    business_email: 'd.reynolds@nordic-supply.se',
    company_name: 'Nordic Supply Group AB',
    country: 'Sweden',
    company_website: 'https://nordic-supply.se',
    whatsapp: '+46 8 123 4567',
    preferred_contact: 'email',
    line_items: [
      {
        category: 'textiles-garments',
        product_name: 'Organic Combed Cotton Fleece Sweatshirts',
        specifications: '380 GSM loopback organic cotton, custom reactive dyed to Pantone 19-4005 TCX. Double-needle coverstitch at hem and neckline.',
        quantity: '2,500',
        unit: 'pieces',
        order_frequency: 'quarterly',
        target_price: '8.50',
        currency: 'EUR'
      }
    ],
    product_category: 'textiles-garments',
    product_name: 'Organic Combed Cotton Fleece Sweatshirts',
    specifications: '380 GSM loopback organic cotton, custom reactive dyed to Pantone 19-4005 TCX. Double-needle coverstitch at hem and neckline.',
    est_quantity: '2,500 pieces',
    order_frequency: 'quarterly',
    target_price: '8.50',
    currency: 'EUR',
    destination_country: 'Sweden',
    delivery_location: 'Gothenburg Port',
    incoterm: 'CIF',
    required_delivery_date: '2027-04-15',
    sample_required: true,
    customisation_needed: true,
    customisation_notes: 'Custom woven neck labels and recycled polybag packaging with barcode print.',
    compliance_needs: 'GOTS transaction certificates for raw yarn; social audit documentation.',
    consent: true,
    owner: 'Unassigned',
    next_action: 'Initial cluster matching in Tiruppur',
    follow_up_date: '2026-10-24',
    submitted_language: 'en'
  },
  {
    id: 'inq-seed-02',
    reference_no: 'QR-2026-00002',
    created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    status: 'under_review',
    full_name: 'Claire Dupont',
    business_email: 'cdupont@mecanique-nord.fr',
    company_name: 'Mecanique Nord SAS',
    country: 'France',
    company_website: 'https://mecanique-nord.fr',
    preferred_contact: 'videoCall',
    line_items: [
      {
        category: 'engineering-components',
        product_name: 'Ductile Iron SGI Valve Housings',
        specifications: 'Grade 500/7 ductile iron casting with 4-axis CNC finish machining. Critical bore tolerances ±0.015mm.',
        quantity: '1,200',
        unit: 'pieces',
        order_frequency: 'yearly',
        target_price: '18.00',
        currency: 'EUR'
      }
    ],
    product_category: 'engineering-components',
    product_name: 'Ductile Iron SGI Valve Housings',
    specifications: 'Grade 500/7 ductile iron casting with 4-axis CNC finish machining. Critical bore tolerances ±0.015mm.',
    est_quantity: '1,200 pieces',
    order_frequency: 'yearly',
    target_price: '18.00',
    currency: 'EUR',
    destination_country: 'France',
    delivery_location: 'Le Havre Port via Tuticorin',
    incoterm: 'FOB',
    required_delivery_date: '2027-06-30',
    sample_required: true,
    customisation_needed: true,
    compliance_needs: 'EN 10204 3.1 material test certificates and CMM inspection report.',
    consent: true,
    owner: 'Benadict Francis',
    acknowledged_at: new Date(Date.now() - 86400000).toISOString(),
    next_action: 'Foundry capability check in Coimbatore',
    follow_up_date: '2026-10-22',
    internal_notes: 'Buyer has provided CAD STP files. Shortlisting 2 Coimbatore precision foundries.',
    submitted_language: 'fr'
  }
];

const INITIAL_MFR_APPLICATIONS: ManufacturerApplicationRecord[] = [
  {
    id: 'mfr-seed-01',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'new',
    business_name: 'Kongu Knits & Garments Private Limited',
    website: 'https://konguknits.example.in',
    contact_name: 'K. Senthil Kumar',
    contact_role: 'Director - Exports',
    business_email: 'senthil@konguknits.example.in',
    phone: '+91 94432 XXXXX',
    factory_location: 'Tiruppur Cluster (Avinashi Road)',
    product_categories: ['textiles-garments', 'bags-packaging'],
    capability_summary: '45 circular knitting machines, in-house soft-flow dyeing and automated cutting tables. Specializing in organic cotton and activewear.',
    moq_text: 'As agreed per program (typically 500 pcs/color)',
    capacity_text: '120,000 pcs monthly',
    lead_time_text: '45–60 days from lab dip approval',
    export_experience: 'Supplying European retail brands across UK and Germany.',
    certifications_text: 'GOTS, OEKO-TEX Standard 100 Class 1, Sedex SMETA 4-pillar.',
    permission_to_contact: true,
    owner: 'Unassigned',
    next_action: 'GST & IEC compliance verification',
    submitted_language: 'en'
  }
];

const INITIAL_CONTACT_MESSAGES: ContactMessageRecord[] = [
  {
    id: 'msg-seed-01',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'new',
    name: 'Marcus Weber',
    business_email: 'm.weber@weber-handel.de',
    company: 'Weber Import & Handel GmbH',
    enquiry_type: 'Buyer enquiry',
    message: 'We are seeking recurring supply of woven coir erosion control blankets and grow bags for the German horticultural sector. Need containerload quotes.',
    consent: true,
    owner: 'Unassigned',
    submitted_language: 'de'
  }
];

// Helper to extract marketing campaign and referral parameters
function getTrackingContext() {
  if (typeof window === 'undefined') return {};
  try {
    const url = new URL(window.location.href);
    return {
      utm_source: url.searchParams.get('utm_source') || undefined,
      utm_medium: url.searchParams.get('utm_medium') || undefined,
      utm_campaign: url.searchParams.get('utm_campaign') || undefined,
      referrer: document.referrer || undefined,
      landing_path: window.location.pathname
    };
  } catch {
    return {};
  }
}

function getNextReferenceNo(): string {
  const currentYear = new Date().getFullYear();
  let nextVal = 3;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SEQ);
    if (stored) {
      nextVal = parseInt(stored, 10) + 1;
    }
    localStorage.setItem(STORAGE_KEY_SEQ, String(nextVal));
  } catch {
    nextVal = Math.floor(Math.random() * 90000) + 10000;
  }
  return `QR-${currentYear}-${String(nextVal).padStart(5, '0')}`;
}

export const requestService = {
  // Session / Admin Auth
  isAdminLoggedIn(): boolean {
    try {
      const email = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      return email === ADMIN_EMAIL;
    } catch {
      return false;
    }
  },

  adminLogin(email: string): boolean {
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, ADMIN_EMAIL);
      } catch (e) {
        console.warn(e);
      }
      return true;
    }
    return false;
  },

  adminLogout() {
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
    } catch (e) {
      console.warn(e);
    }
  },

  // 1. Submit Buyer Enquiry
  async submitBuyerEnquiry(
    payload: Omit<BuyerEnquiryRecord, 'id' | 'created_at' | 'status' | 'reference_no'> & { reference_no?: string }
  ): Promise<BuyerEnquiryRecord> {
    const tracking = getTrackingContext();
    const reference_no = payload.reference_no || getNextReferenceNo();

    // Fill backward-compatibility fields from first line item if provided
    const firstLine: ProductLineItem | undefined = payload.line_items?.[0];
    const product_category = payload.product_category || firstLine?.category || 'textiles-garments';
    const product_name = payload.product_name || firstLine?.product_name || 'Unspecified Product';
    const specifications = payload.specifications || firstLine?.specifications || 'See line items';
    const est_quantity = payload.est_quantity || (firstLine ? `${firstLine.quantity} ${firstLine.unit}` : 'Not specified');

    const record: BuyerEnquiryRecord = {
      ...payload,
      id: crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}`,
      reference_no,
      created_at: new Date().toISOString(),
      status: 'new',
      owner: 'Unassigned',
      product_category,
      product_name,
      specifications,
      est_quantity,
      line_items: payload.line_items || [],
      ...tracking
    };

    // Save to local cache
    try {
      const list = this.getBuyerEnquiries();
      list.unshift(record);
      localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(list));
    } catch (e) {
      console.warn('Local storage error', e);
    }

    // Attempt Supabase insert if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('buyer_enquiries').insert([record]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }

    return record;
  },

  // 2. Submit Manufacturer Application
  async submitManufacturerApplication(
    payload: Omit<ManufacturerApplicationRecord, 'id' | 'created_at' | 'status'>
  ): Promise<ManufacturerApplicationRecord> {
    const tracking = getTrackingContext();
    const record: ManufacturerApplicationRecord = {
      ...payload,
      id: crypto.randomUUID ? crypto.randomUUID() : `mfr-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'new',
      owner: 'Unassigned',
      ...tracking
    };

    try {
      const list = this.getManufacturerApplications();
      list.unshift(record);
      localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('manufacturer_applications').insert([record]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }

    return record;
  },

  // 3. Submit Contact Message
  async submitContactMessage(
    payload: Omit<ContactMessageRecord, 'id' | 'created_at' | 'status'>
  ): Promise<ContactMessageRecord> {
    const tracking = getTrackingContext();
    const record: ContactMessageRecord = {
      ...payload,
      id: crypto.randomUUID ? crypto.randomUUID() : `msg-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'new',
      owner: 'Unassigned',
      ...tracking
    };

    try {
      const list = this.getContactMessages();
      list.unshift(record);
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_messages').insert([record]);
      } catch (err) {
        console.warn('Supabase sync note:', err);
      }
    }

    return record;
  },

  // Retrieval with persistence
  getBuyerEnquiries(): BuyerEnquiryRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_BUYERS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(INITIAL_BUYER_ENQUIRIES));
        return INITIAL_BUYER_ENQUIRIES;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_BUYER_ENQUIRIES;
    }
  },

  getManufacturerApplications(): ManufacturerApplicationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MFRS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(INITIAL_MFR_APPLICATIONS));
        return INITIAL_MFR_APPLICATIONS;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_MFR_APPLICATIONS;
    }
  },

  getContactMessages(): ContactMessageRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(INITIAL_CONTACT_MESSAGES));
        return INITIAL_CONTACT_MESSAGES;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_CONTACT_MESSAGES;
    }
  },

  // Updates
  updateBuyerEnquiry(id: string, updates: Partial<BuyerEnquiryRecord>): void {
    const list = this.getBuyerEnquiries();
    const idx = list.findIndex((b) => b.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(list));
      } catch (e) {
        console.warn(e);
      }
    }
  },

  updateManufacturerApplication(id: string, updates: Partial<ManufacturerApplicationRecord>): void {
    const list = this.getManufacturerApplications();
    const idx = list.findIndex((m) => m.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(list));
      } catch (e) {
        console.warn(e);
      }
    }
  },

  updateContactMessage(id: string, updates: Partial<ContactMessageRecord>): void {
    const list = this.getContactMessages();
    const idx = list.findIndex((c) => c.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      try {
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(list));
      } catch (e) {
        console.warn(e);
      }
    }
  },

  deleteRecord(type: 'buyer' | 'manufacturer' | 'contact', id: string): void {
    if (type === 'buyer') {
      const filtered = this.getBuyerEnquiries().filter((b) => b.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(filtered));
      } catch (e) {
        console.warn(e);
      }
    } else if (type === 'manufacturer') {
      const filtered = this.getManufacturerApplications().filter((m) => m.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(filtered));
      } catch (e) {
        console.warn(e);
      }
    } else {
      const filtered = this.getContactMessages().filter((c) => c.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(filtered));
      } catch (e) {
        console.warn(e);
      }
    }
  }
};
