export type RequestStatus =
  | 'new'
  | 'under_review'
  | 'supplier_matching'
  | 'quotation_coordination'
  | 'client_discussion'
  | 'closed'
  | 'archived';

export interface BaseTrackerColumns {
  id: string;
  created_at: string;
  status: RequestStatus;
  owner?: string;
  acknowledged_at?: string;
  next_action?: string;
  follow_up_date?: string;
  internal_notes?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_path?: string;
}

export interface BuyerEnquiryRecord extends BaseTrackerColumns {
  full_name: string;
  business_email: string;
  company_name: string;
  country: string;
  product_category: string;
  product_name: string;
  specifications: string;
  est_quantity: string;
  order_frequency?: string;
  target_price?: string;
  currency?: string;
  destination_country: string;
  delivery_location?: string;
  required_delivery_date?: string | null;
  compliance_needs?: string;
  file_paths?: string[];
  consent: boolean;
}

export interface ManufacturerApplicationRecord extends BaseTrackerColumns {
  business_name: string;
  website?: string;
  contact_name: string;
  contact_role: string;
  business_email: string;
  phone: string;
  factory_location: string;
  product_categories: string[];
  capability_summary: string;
  moq_text?: string;
  capacity_text?: string;
  lead_time_text?: string;
  export_experience?: string;
  certifications_text?: string;
  file_paths?: string[];
  permission_to_contact: boolean;
}

export interface ContactMessageRecord extends BaseTrackerColumns {
  name: string;
  business_email: string;
  company?: string;
  enquiry_type: string;
  message: string;
  consent: boolean;
}
