import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  BuyerEnquiryRecord,
  ManufacturerApplicationRecord,
  ContactMessageRecord,
  RequestStatus
} from '../types/database';
import { ADMIN_EMAIL } from '../config/site';

const STORAGE_KEY_BUYERS = 'tnes_buyer_enquiries_v1';
const STORAGE_KEY_MFRS = 'tnes_mfr_applications_v1';
const STORAGE_KEY_CONTACTS = 'tnes_contact_messages_v1';
const STORAGE_KEY_ADMIN_AUTH = 'tnes_admin_session_v1';

// Seed initial realistic entries for immediate admin testing
const INITIAL_BUYER_ENQUIRIES: BuyerEnquiryRecord[] = [
  {
    id: 'inq-seed-01',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'new',
    full_name: 'David Reynolds',
    business_email: 'd.reynolds@nordic-supply.se',
    company_name: 'Nordic Supply Group AB',
    country: 'Sweden',
    product_category: 'textiles-garments',
    product_name: 'Organic Combed Cotton Fleece Sweatshirts',
    specifications: '380 GSM loopback organic cotton, custom reactive dyed to Pantone 19-4005 TCX. Double-needle coverstitch at hem and neckline.',
    est_quantity: '2,500 units initial trial',
    order_frequency: 'Quarterly re-orders subject to sample review',
    target_price: 'Subject to quotation',
    currency: 'EUR',
    destination_country: 'Sweden',
    delivery_location: 'Gothenburg Port / CIF basis',
    required_delivery_date: '2027-04-15',
    compliance_needs: 'GOTS transaction certificates for raw yarn; social audit documentation.',
    consent: true,
    owner: 'Unassigned',
    next_action: 'Initial cluster matching in Tiruppur',
    follow_up_date: '2026-10-24'
  },
  {
    id: 'inq-seed-02',
    created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    status: 'under_review',
    full_name: 'Claire Dupont',
    business_email: 'cdupont@mecanique-nord.fr',
    company_name: 'Mecanique Nord SAS',
    country: 'France',
    product_category: 'engineering-components',
    product_name: 'Ductile Iron SGI Valve Housings',
    specifications: 'Grade 500/7 ductile iron casting with 4-axis CNC finish machining. Critical bore tolerances ±0.015mm.',
    est_quantity: '1,200 pcs initial run',
    order_frequency: 'Annual contract requirement',
    target_price: 'Competitive FOB Tuticorin',
    currency: 'EUR',
    destination_country: 'France',
    delivery_location: 'Le Havre Port via Tuticorin',
    required_delivery_date: '2027-06-30',
    compliance_needs: 'EN 10204 3.1 material test certificates and CMM inspection report.',
    consent: true,
    owner: 'Benadict Francis',
    acknowledged_at: new Date(Date.now() - 86400000).toISOString(),
    next_action: 'Foundry capability check in Coimbatore',
    follow_up_date: '2026-10-22',
    internal_notes: 'Buyer has provided CAD STP files. Shortlisting 2 Coimbatore precision foundries.'
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
    moq_text: 'As provided by you (typically 500 pcs/color)',
    capacity_text: '120,000 pcs monthly',
    lead_time_text: '45–60 days from lab dip approval',
    export_experience: 'Supplying European retail brands across UK and Germany.',
    certifications_text: 'GOTS, OEKO-TEX Standard 100 Class 1, Sedex SMETA 4-pillar.',
    permission_to_contact: true,
    owner: 'Unassigned',
    next_action: 'GST & IEC compliance verification'
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
    message: 'Hello, we are looking to source high-grade cotton canvas shopping bags from Tamil Nadu. Please let us know the process to discuss technical briefs.',
    consent: true,
    next_action: 'Respond via email with Buyer Brief guide'
  }
];

// Helper to get tracking params from sessionStorage
function getTrackingContext() {
  try {
    return {
      utm_source: sessionStorage.getItem('utm_source') || undefined,
      utm_medium: sessionStorage.getItem('utm_medium') || undefined,
      utm_campaign: sessionStorage.getItem('utm_campaign') || undefined,
      referrer: sessionStorage.getItem('referrer') || document.referrer || undefined,
      landing_path: sessionStorage.getItem('landing_path') || window.location.pathname
    };
  } catch {
    return {};
  }
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
    payload: Omit<BuyerEnquiryRecord, 'id' | 'created_at' | 'status'>
  ): Promise<BuyerEnquiryRecord> {
    const tracking = getTrackingContext();
    const record: BuyerEnquiryRecord = {
      ...payload,
      id: crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'new',
      owner: 'Unassigned',
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

  // Readers
  getBuyerEnquiries(): BuyerEnquiryRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_BUYERS);
      if (raw) return JSON.parse(raw);
      // Seed if not yet created
      localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(INITIAL_BUYER_ENQUIRIES));
      return INITIAL_BUYER_ENQUIRIES;
    } catch {
      return INITIAL_BUYER_ENQUIRIES;
    }
  },

  getManufacturerApplications(): ManufacturerApplicationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MFRS);
      if (raw) return JSON.parse(raw);
      localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(INITIAL_MFR_APPLICATIONS));
      return INITIAL_MFR_APPLICATIONS;
    } catch {
      return INITIAL_MFR_APPLICATIONS;
    }
  },

  getContactMessages(): ContactMessageRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
      if (raw) return JSON.parse(raw);
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(INITIAL_CONTACT_MESSAGES));
      return INITIAL_CONTACT_MESSAGES;
    } catch {
      return INITIAL_CONTACT_MESSAGES;
    }
  },

  // Admin Update Capabilities for benadictfrancis.dev@gmail.com
  updateBuyerEnquiry(id: string, updates: Partial<BuyerEnquiryRecord>): boolean {
    try {
      const list = this.getBuyerEnquiries();
      const idx = list.findIndex((item) => item.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(list));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },

  updateManufacturerApplication(id: string, updates: Partial<ManufacturerApplicationRecord>): boolean {
    try {
      const list = this.getManufacturerApplications();
      const idx = list.findIndex((item) => item.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(list));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },

  updateContactMessage(id: string, updates: Partial<ContactMessageRecord>): boolean {
    try {
      const list = this.getContactMessages();
      const idx = list.findIndex((item) => item.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(list));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  },

  deleteRecord(type: 'buyer' | 'manufacturer' | 'contact', id: string): boolean {
    try {
      if (type === 'buyer') {
        const list = this.getBuyerEnquiries().filter((x) => x.id !== id);
        localStorage.setItem(STORAGE_KEY_BUYERS, JSON.stringify(list));
        return true;
      } else if (type === 'manufacturer') {
        const list = this.getManufacturerApplications().filter((x) => x.id !== id);
        localStorage.setItem(STORAGE_KEY_MFRS, JSON.stringify(list));
        return true;
      } else {
        const list = this.getContactMessages().filter((x) => x.id !== id);
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(list));
        return true;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};
