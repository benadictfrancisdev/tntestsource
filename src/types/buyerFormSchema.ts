import * as z from 'zod';
import { CATEGORY_SLUGS } from '../data/categories';

export const productLineItemSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  product_name: z.string().min(2, 'Product name is required'),
  specifications: z.string().min(10, 'Please provide specifications (minimum 10 characters)'),
  quantity: z.string().min(1, 'Estimated quantity is required'),
  unit: z.enum(['pieces', 'kg', 'metres', 'sets', 'cartons', 'tonnes', 'other']),
  order_frequency: z.enum(['oneTime', 'monthly', 'quarterly', 'yearly', 'notSure']).optional(),
  target_price: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'GBP', 'AED', 'INR', 'other']).optional()
});

export const multiStepBuyerFormSchema = z.object({
  // Step 1: Products
  line_items: z.array(productLineItemSchema).min(1, 'At least one product line item is required').max(5, 'Maximum 5 products allowed'),

  // Step 2: Delivery & Terms
  destination_country: z.string().min(2, 'Destination country is required'),
  delivery_location: z.string().optional(),
  incoterm: z.enum(['notSure', 'exw', 'fob', 'cif', 'ddp']).optional(),
  required_delivery_date: z.string().optional(),
  sample_required: z.boolean().optional(),
  customisation_needed: z.boolean().optional(),
  customisation_notes: z.string().optional(),
  compliance_needs: z.string().optional(),

  // Step 3: Details
  full_name: z.string().min(2, 'Full name is required'),
  business_email: z.string().email('Please enter a valid business email address'),
  company_name: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Country is required'),
  company_website: z.string().optional(),
  whatsapp: z.string().optional(),
  preferred_contact: z.enum(['email', 'whatsapp', 'videoCall']).optional(),

  // Step 4: Verification
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy to proceed'
  }),
  honeypot: z.string().max(0, 'Spam detected')
});

export type MultiStepBuyerFormData = z.infer<typeof multiStepBuyerFormSchema>;
