import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Check,
  CheckCircle2,
  Clock,
  UploadCloud,
  X,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { requestService } from '../services/requestService';
import { Seo } from '../components/common/Seo';

const buyerFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  businessEmail: z.string().email('Please enter a valid business email'),
  companyName: z.string().min(2, 'Company name is required'),
  country: z.string().min(2, 'Country is required'),
  productCategory: z.string().min(1, 'Please select a product category'),
  productName: z.string().min(2, 'Product name is required'),
  specifications: z.string().min(15, 'Please provide specifications (minimum 15 characters)'),
  estQuantity: z.string().min(1, 'Estimated quantity / order frequency is required'),
  targetPrice: z.string().optional(),
  currency: z.string().optional(),
  destinationCountry: z.string().min(2, 'Destination country / delivery location is required'),
  deliveryLocation: z.string().optional(),
  requiredDeliveryDate: z.string().optional(),
  complianceNeeds: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy to proceed'
  }),
  honeypot: z.string().max(0, 'Spam detected')
});

type BuyerFormData = z.infer<typeof buyerFormSchema>;

export const BuyersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const categoryParam = searchParams.get('category') || '';

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: {
      productCategory: categoryParam || 'textiles-garments',
      currency: 'USD',
      consent: false,
      honeypot: ''
    }
  });

  useEffect(() => {
    if (categoryParam) {
      setValue('productCategory', categoryParam);
    }
  }, [categoryParam, setValue]);

  useEffect(() => {
    if (location.hash === '#enquiry') {
      const el = document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    if (uploadedFiles.length + newFiles.length > 3) {
      setFileError('You can upload a maximum of 3 files.');
      return;
    }

    const invalidSize = newFiles.some((f) => f.size > 10 * 1024 * 1024);
    if (invalidSize) {
      setFileError('Each file must be less than 10 MB.');
      return;
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (data: BuyerFormData) => {
    setIsSubmitting(true);
    try {
      const fileNames = uploadedFiles.map((f) => `pending/${f.name}`);
      const record = await requestService.submitBuyerEnquiry({
        full_name: data.fullName,
        business_email: data.businessEmail,
        company_name: data.companyName,
        country: data.country,
        product_category: data.productCategory,
        product_name: data.productName,
        specifications: data.specifications,
        est_quantity: data.estQuantity,
        order_frequency: data.estQuantity,
        target_price: data.targetPrice || undefined,
        currency: data.currency || undefined,
        destination_country: data.destinationCountry,
        delivery_location: data.deliveryLocation || data.destinationCountry,
        required_delivery_date: data.requiredDeliveryDate || null,
        compliance_needs: data.complianceNeeds || undefined,
        file_paths: fileNames,
        consent: data.consent
      });

      setSubmittedId(record.id);
      reset();
      setUploadedFiles([]);
      const el = document.getElementById('enquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="For International Buyers | Sourcing from Tamil Nadu"
        description="Submit your product brief to identify and connect with suitable Tamil Nadu manufacturers. Structured sourcing support and quotation coordination."
        path="/buyers"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Buyer Representation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Work With Us as a Buyer
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            We help international procurement professionals, brand owners, and distributors explore manufacturing opportunities across Tamil Nadu's industrial clusters.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          {/* Section: Who We Work With */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              Who we work with
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Importers, Wholesalers & Distributors
                </span>
                <p className="text-xs text-slate-600">
                  Seeking competitive manufacturing alternatives and steady volume container dispatches.
                </p>
              </div>

              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Retailers & Private-Label Brands
                </span>
                <p className="text-xs text-slate-600">
                  Looking for custom-manufactured apparel, home textiles, leather accessories or packaging.
                </p>
              </div>

              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Procurement & Product-Development Teams
                </span>
                <p className="text-xs text-slate-600">
                  Navigating drawing feasibility, prototyping, lab dips, and technical supplier matching.
                </p>
              </div>
            </div>
          </div>

          {/* Section: What to prepare checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              What to prepare
            </h2>
            <p className="text-xs text-slate-600">
              To help us evaluate feasibility and gather informative supplier feedback, please have the following ready:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Product / item name</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Specifications or engineering drawings</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Estimated quantity & target batch size</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Target price and currency (optional)</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Destination country & preferred port</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Required delivery date & schedule</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px] sm:col-span-2">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Certification, testing or destination compliance needs</span>
              </div>
            </div>
          </div>

          {/* Short process recap */}
          <div className="bg-[#EBF7F7] border border-[#0E9F9A]/30 p-6 rounded-[8px] space-y-2">
            <h3 className="text-sm font-bold text-[#0B2545]">
              Short Process Recap
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Once you submit your brief below, we conduct a feasibility review, identify candidate suppliers across regional clusters, coordinate quotation discussions, and support your direct commercial negotiations.
            </p>
          </div>

          {/* Section #enquiry: Submit Your Sourcing Brief */}
          <section id="enquiry" className="scroll-mt-24 bg-white border border-slate-200 rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Submit Your Sourcing Brief
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Share your sourcing requirements. We will review the details and confirm whether we can identify suitable supplier options.
              </p>
            </div>

            {submittedId ? (
              <div className="p-6 bg-[#EBF7F7] border border-[#0E9F9A]/30 rounded-[8px] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[8px] bg-[#0E9F9A] text-white flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0B2545]">
                      Sourcing Brief Received
                    </h3>
                    <p className="text-xs text-slate-600">
                      We have received your submission and will review it. Reference ID: <span className="font-mono font-semibold text-slate-900">{submittedId}</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our coordination desk will assess your specifications and check supplier availability across the relevant Tamil Nadu cluster. This request is now visible in the admin portal.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden from view) */}
                <input
                  type="text"
                  {...register('honeypot')}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="Your full name"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      {...register('businessEmail')}
                      placeholder="name@company.com"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.businessEmail && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.businessEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      {...register('companyName')}
                      placeholder="Your company name"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.companyName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      {...register('country')}
                      placeholder="Your country"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.country && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Product Category *
                    </label>
                    <select
                      {...register('productCategory')}
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    >
                      {PRODUCT_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      {...register('productName')}
                      placeholder="e.g. Ring-spun cotton tee, valve housing, tote"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.productName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.productName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Product Specifications *
                  </label>
                  <textarea
                    rows={4}
                    {...register('specifications')}
                    placeholder="Provide details on materials, dimensions, construction, weight/GSM, finishes, or CAD specs."
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                  />
                  {errors.specifications && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.specifications.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Estimated Quantity / Order Frequency *
                    </label>
                    <input
                      type="text"
                      {...register('estQuantity')}
                      placeholder="e.g. 2,000 units initial / recurring quarterly"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.estQuantity && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.estQuantity.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Target Price (Optional)
                      </label>
                      <input
                        type="text"
                        {...register('targetPrice')}
                        placeholder="e.g. 4.50"
                        className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Currency
                      </label>
                      <select
                        {...register('currency')}
                        className="w-full text-xs px-2 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AED">AED</option>
                        <option value="INR">INR</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Destination Country / Delivery Location *
                    </label>
                    <input
                      type="text"
                      {...register('destinationCountry')}
                      placeholder="e.g. Germany (Hamburg Port or CIF Frankfurt)"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.destinationCountry && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.destinationCountry.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Required Delivery Date (Optional)
                    </label>
                    <input
                      type="date"
                      {...register('requiredDeliveryDate')}
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      Certifications, testing or compliance needs (Optional)
                    </label>
                  </div>
                  <input
                    type="text"
                    {...register('complianceNeeds')}
                    placeholder="e.g. OEKO-TEX, REACH, GOTS, ISO 9001, RoHS, etc."
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Please mention any specific destination-market compliance or laboratory testing standards required.
                  </p>
                </div>

                {/* File upload (optional, up to 3 files, 10MB each) */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    File Upload (Optional, up to 3 files, 10MB each)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-[8px] p-4 text-center bg-[#F5F7FA]">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <label className="cursor-pointer text-xs font-semibold text-[#0E9F9A] hover:underline">
                      <span>Click to upload drawings, spec sheets or tech packs</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                      />
                    </label>
                    <p className="text-[11px] text-slate-500 mt-1">
                      PDF, JPG, PNG, DOCX, XLSX (Max 10MB per file)
                    </p>
                  </div>

                  {fileError && (
                    <p className="text-[11px] text-rose-600 mt-1">{fileError}</p>
                  )}

                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-slate-100 rounded text-xs text-slate-700"
                        >
                          <span className="truncate max-w-xs">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-slate-500 hover:text-rose-600 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Consent checkbox */}
                <div className="pt-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="buyer-consent"
                      {...register('consent')}
                      className="mt-0.5 w-4 h-4 text-[#0E9F9A] border-slate-300 rounded focus:ring-[#0E9F9A]"
                    />
                    <label htmlFor="buyer-consent" className="text-xs text-slate-700 cursor-pointer">
                      I agree that my details may be used to respond to this enquiry, as described in the{' '}
                      <Link to="/privacy-policy" className="text-[#0E9F9A] underline">
                        Privacy Policy
                      </Link>
                      . *
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.consent.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] disabled:bg-slate-400 rounded-[8px] transition-colors shadow-xs"
                  >
                    {isSubmitting ? 'Submitting Sourcing Brief...' : 'Submit Sourcing Brief'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
};
