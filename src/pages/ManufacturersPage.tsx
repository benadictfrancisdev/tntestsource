import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Check,
  CheckCircle2,
  Clock,
  UploadCloud,
  X,
  FileCheck,
  Building,
  AlertCircle
} from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { requestService } from '../services/requestService';
import { Seo } from '../components/common/Seo';

const mfrFormSchema = z.object({
  businessName: z.string().min(2, 'Legal business/factory name is required'),
  website: z.string().optional(),
  contactName: z.string().min(2, 'Contact person name is required'),
  contactRole: z.string().min(2, 'Role / designation is required'),
  businessEmail: z.string().email('Please enter a valid business email'),
  phone: z.string().min(6, 'Phone number is required'),
  factoryLocation: z.string().min(2, 'Factory location is required'),
  productCategories: z.array(z.string()).min(1, 'Please select at least one product category'),
  capabilitySummary: z.string().min(15, 'Please summarize your manufacturing capabilities'),
  moqText: z.string().optional(),
  capacityText: z.string().optional(),
  leadTimeText: z.string().optional(),
  exportExperience: z.string().optional(),
  certificationsText: z.string().optional(),
  permissionToContact: z.boolean().refine((val) => val === true, {
    message: 'Permission to contact you is required to submit'
  }),
  honeypot: z.string().max(0, 'Spam detected')
});

type MfrFormData = z.infer<typeof mfrFormSchema>;

export const ManufacturersPage: React.FC = () => {
  const location = useLocation();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MfrFormData>({
    resolver: zodResolver(mfrFormSchema),
    defaultValues: {
      productCategories: ['textiles-garments'],
      permissionToContact: false,
      honeypot: ''
    }
  });

  useEffect(() => {
    if (location.hash === '#apply') {
      const el = document.getElementById('apply');
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
      setFileError('You can upload up to 3 documents.');
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

  const onSubmit = async (data: MfrFormData) => {
    setIsSubmitting(true);
    try {
      const fileNames = uploadedFiles.map((f) => `pending/${f.name}`);
      const record = await requestService.submitManufacturerApplication({
        business_name: data.businessName,
        website: data.website || undefined,
        contact_name: data.contactName,
        contact_role: data.contactRole,
        business_email: data.businessEmail,
        phone: data.phone,
        factory_location: data.factoryLocation,
        product_categories: data.productCategories,
        capability_summary: data.capabilitySummary,
        moq_text: data.moqText || undefined,
        capacity_text: data.capacityText || undefined,
        lead_time_text: data.leadTimeText || undefined,
        export_experience: data.exportExperience || undefined,
        certifications_text: data.certificationsText || undefined,
        file_paths: fileNames,
        permission_to_contact: data.permissionToContact
      });

      setSubmittedId(record.id);
      reset();
      setUploadedFiles([]);
      const el = document.getElementById('apply');
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
        title="Join Our Sourcing Network | For Tamil Nadu Manufacturers"
        description="Tamil Nadu manufacturers and suppliers seeking new international buyer relationships can submit their production capabilities for sourcing reviews."
        path="/manufacturers"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Supplier Partnerships
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Join Our Sourcing Network
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            We work with manufacturers across Tamil Nadu to present verified production capabilities to relevant international procurement desks.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          {/* Section: Who Can Apply */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              Who can apply
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Tamil Nadu manufacturers and suppliers seeking new international buyer relationships. We invite direct manufacturing operations with active facilities, registered business status, and clear product capability profiles.
            </p>
          </div>

          {/* Section: What we will ask for checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              What we will ask for
            </h2>
            <p className="text-xs text-slate-600">
              When applying to join our sourcing review roster, we will request the following information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Legal business/factory name</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Contact person & designation</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Factory location & cluster</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Product categories manufactured</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Catalogue or capability sheet</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>MOQ/capacity/lead times as provided by you</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Export experience & markets served</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Certifications/test reports</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px] sm:col-span-2">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Permission to contact you and verify details</span>
              </div>
            </div>
          </div>

          {/* Notice: Submission does not guarantee listing or buyer enquiries */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-[8px] flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-[#D98E04] shrink-0 mt-0.5" />
            <p className="font-medium text-slate-800">
              Notice: Submission does not guarantee listing or buyer enquiries.
            </p>
          </div>

          {/* Section #apply: Manufacturer Form */}
          <section id="apply" className="scroll-mt-24 bg-white border border-slate-200 rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Manufacturer Registration
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Provide your factory details for our supplier network database.
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
                      Application Received
                    </h3>
                    <p className="text-xs text-slate-600">
                      We have received your submission and will review it. Reference ID: <span className="font-mono font-semibold text-slate-900">{submittedId}</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our agency team will examine your product categories and capability profile. This record is now registered in the admin portal.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedId(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors"
                >
                  Register Another Facility
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      Legal Business / Factory Name *
                    </label>
                    <input
                      type="text"
                      {...register('businessName')}
                      placeholder="e.g. Kongu Apparels Pvt Ltd"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.businessName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.businessName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Website (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('website')}
                      placeholder="https://yourcompany.com"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      {...register('contactName')}
                      placeholder="e.g. S. Ramakrishnan"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.contactName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.contactName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Role / Designation *
                    </label>
                    <input
                      type="text"
                      {...register('contactRole')}
                      placeholder="e.g. Managing Director / Export Manager"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.contactRole && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.contactRole.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      {...register('businessEmail')}
                      placeholder="exports@company.in"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.businessEmail && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.businessEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 98421 XXXXX"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Factory Location & District *
                  </label>
                  <input
                    type="text"
                    {...register('factoryLocation')}
                    placeholder="e.g. Tiruppur Industrial Estate, Tamil Nadu"
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                  />
                  {errors.factoryLocation && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.factoryLocation.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">
                    Product Categories * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PRODUCT_CATEGORIES.map((c) => (
                      <label
                        key={c.slug}
                        className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-[6px] border border-slate-200 text-xs text-slate-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={c.slug}
                          {...register('productCategories')}
                          className="w-4 h-4 text-[#0E9F9A] border-slate-300 rounded focus:ring-[#0E9F9A]"
                        />
                        <span>{c.name}</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 p-2 bg-[#F5F7FA] rounded-[6px] border border-slate-200 text-xs text-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        value="other"
                        {...register('productCategories')}
                        className="w-4 h-4 text-[#0E9F9A] border-slate-300 rounded focus:ring-[#0E9F9A]"
                      />
                      <span>Other</span>
                    </label>
                  </div>
                  {errors.productCategories && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.productCategories.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Capability Summary *
                  </label>
                  <textarea
                    rows={3}
                    {...register('capabilitySummary')}
                    placeholder="Describe machinery fleet, production lines, processes performed in-house, and materials handled."
                    className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                  />
                  {errors.capabilitySummary && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.capabilitySummary.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      MOQ (as provided by you)
                    </label>
                    <input
                      type="text"
                      {...register('moqText')}
                      placeholder="e.g. 500 pcs per style"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Capacity (as provided by you)
                    </label>
                    <input
                      type="text"
                      {...register('capacityText')}
                      placeholder="e.g. 50,000 pcs monthly"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Lead Times (as provided by you)
                    </label>
                    <input
                      type="text"
                      {...register('leadTimeText')}
                      placeholder="e.g. 45 days from sample approval"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Export Experience and Countries Served (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('exportExperience')}
                      placeholder="e.g. 5 years supplying brands in Europe and Gulf"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Certifications / Test Reports (Optional)
                    </label>
                    <input
                      type="text"
                      {...register('certificationsText')}
                      placeholder="e.g. OEKO-TEX, GOTS, ISO 9001, Sedex"
                      className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                    />
                  </div>
                </div>

                {/* Upload Catalogue or capability sheet */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Catalogue or Capability Sheet Upload (Optional, up to 3 files, 10MB each)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-[8px] p-4 text-center bg-[#F5F7FA]">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <label className="cursor-pointer text-xs font-semibold text-[#0E9F9A] hover:underline">
                      <span>Click to upload company brochure or machinery list</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                      />
                    </label>
                    <p className="text-[11px] text-slate-500 mt-1">
                      PDF, JPG, PNG, DOCX, XLSX (Max 10MB)
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
                          <span className="truncate max-w-xs">{file.name}</span>
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

                {/* Permission Checkbox */}
                <div className="pt-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="mfr-permission"
                      {...register('permissionToContact')}
                      className="mt-0.5 w-4 h-4 text-[#0E9F9A] border-slate-300 rounded focus:ring-[#0E9F9A]"
                    />
                    <label htmlFor="mfr-permission" className="text-xs text-slate-700 cursor-pointer">
                      You may contact me and review the information I submitted. *
                    </label>
                  </div>
                  {errors.permissionToContact && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.permissionToContact.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] disabled:bg-slate-400 rounded-[8px] transition-colors shadow-xs"
                  >
                    {isSubmitting ? 'Registering Facility...' : 'Submit Manufacturer Details'}
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
