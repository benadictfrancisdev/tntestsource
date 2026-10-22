import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import {
  Check,
  CheckCircle2,
  Clock,
  UploadCloud,
  X,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Mail,
  ShieldCheck,
  Building,
  Globe,
  Info
} from 'lucide-react';
import { multiStepBuyerFormSchema, MultiStepBuyerFormData } from '../../types/buyerFormSchema';
import { PRODUCT_CATEGORIES } from '../../data/categories';
import { requestService } from '../../services/requestService';
import { CONTACT_EMAIL } from '../../config/site';
import { trackFormEvent } from '../../utils/analytics';
import { useActiveLanguage } from '../../utils/localizedRoute';
import { LocalizedLink } from '../common/LocalizedLink';

const DRAFT_STORAGE_KEY = 'connecthf_buyer_rfq_draft_v2';

export const MultiStepBuyerForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const { t } = useTranslation(['forms', 'common', 'categories']);
  const { currentLang, isRtl } = useActiveLanguage();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const defaultValues: MultiStepBuyerFormData = {
    line_items: [
      {
        category: categoryParam || 'textiles-garments',
        product_name: '',
        specifications: '',
        quantity: '',
        unit: 'pieces',
        order_frequency: 'oneTime',
        currency: 'USD'
      }
    ],
    destination_country: '',
    delivery_location: '',
    incoterm: 'notSure',
    required_delivery_date: '',
    sample_required: false,
    customisation_needed: false,
    customisation_notes: '',
    compliance_needs: '',
    full_name: '',
    business_email: '',
    company_name: '',
    country: '',
    company_website: '',
    whatsapp: '',
    preferred_contact: 'email',
    consent: false,
    honeypot: ''
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors }
  } = useForm<MultiStepBuyerFormData>({
    resolver: zodResolver(multiStepBuyerFormSchema),
    defaultValues,
    mode: 'onTouched'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'line_items'
  });

  const watchAllFields = watch();
  const watchCustomisationNeeded = watch('customisation_needed');

  // Restore draft from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        reset(parsed);
      } else if (categoryParam) {
        setValue('line_items.0.category', categoryParam);
      }
    } catch {
      // ignore
    }
  }, [categoryParam, reset, setValue]);

  // Track form start once
  useEffect(() => {
    trackFormEvent('form_start', { form: 'buyer_rfq' });
  }, []);

  // Autosave draft on change
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(watchAllFields));
    } catch {
      // ignore
    }
  }, [watchAllFields]);

  // File upload management
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    if (uploadedFiles.length + newFiles.length > 3) {
      setFileError(t('forms:errors.maxFiles', 'You can upload a maximum of 3 files'));
      return;
    }

    const invalidSize = newFiles.some((f) => f.size > 10 * 1024 * 1024);
    if (invalidSize) {
      setFileError(t('forms:errors.fileTooBig', 'Each file must be less than 10MB'));
      return;
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // Step validation before advancing
  const handleNextStep = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger('line_items');
      if (!isValid) {
        const firstErrorEl = document.querySelector('[data-error="true"], input:invalid, textarea:invalid');
        if (firstErrorEl) (firstErrorEl as HTMLElement).focus();
      }
    } else if (currentStep === 2) {
      isValid = await trigger([
        'destination_country',
        'delivery_location',
        'incoterm',
        'customisation_notes'
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger([
        'full_name',
        'business_email',
        'company_name',
        'country',
        'company_website',
        'whatsapp'
      ]);
    }

    if (isValid) {
      trackFormEvent('form_step_complete', { step: currentStep });
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: document.getElementById('enquiry')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: document.getElementById('enquiry')?.offsetTop || 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: MultiStepBuyerFormData) => {
    setIsSubmitting(true);
    try {
      const record = await requestService.submitBuyerEnquiry({
        full_name: data.full_name,
        business_email: data.business_email,
        company_name: data.company_name,
        country: data.country,
        company_website: data.company_website || undefined,
        whatsapp: data.whatsapp || undefined,
        preferred_contact: data.preferred_contact,
        line_items: data.line_items,
        destination_country: data.destination_country,
        delivery_location: data.delivery_location || undefined,
        incoterm: data.incoterm,
        required_delivery_date: data.required_delivery_date || null,
        sample_required: Boolean(data.sample_required),
        customisation_needed: Boolean(data.customisation_needed),
        customisation_notes: data.customisation_notes || undefined,
        compliance_needs: data.compliance_needs || undefined,
        file_paths: uploadedFiles.map((f) => `uploads/${f.name}`),
        consent: data.consent,
        submitted_language: currentLang
      });

      trackFormEvent('form_submit_success', { reference_no: record.reference_no });
      setSubmittedRef(record.reference_no);
      try {
        sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
    } catch (err) {
      console.error(err);
      trackFormEvent('form_submit_error', { error: String(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success view
  if (submittedRef) {
    return (
      <div className="bg-[#EBF7F7] border border-[#0E9F9A]/40 rounded-2xl p-6 sm:p-10 space-y-6 animate-in fade-in">
        <div className="w-14 h-14 rounded-full bg-[#0E9F9A] text-white flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F9A]">
            {t('forms:success.title', 'Sourcing Request Received')}
          </span>
          <h3 className="text-2xl font-bold text-[#0B2545]">
            {t('forms:success.reviewNotice', 'We have received your request and will review it.')}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-2xl">
            {t('forms:success.nextSteps', 'Our coordination desk is reviewing your technical specifications against active Tamil Nadu clusters. We will reach out through your preferred contact method.')}
          </p>
        </div>

        {/* Reference Number Box */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 inline-block shadow-xs">
          <span className="text-xs text-slate-500 block">
            {t('forms:success.referenceText', 'Your quotation request reference number is:')}
          </span>
          <span className="font-mono text-xl font-bold text-[#b91c1c] tracking-wider select-all">
            {submittedRef}
          </span>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmittedRef(null);
              setCurrentStep(1);
              reset(defaultValues);
            }}
            className="px-5 py-2.5 text-xs font-bold text-[#0B2545] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors text-center"
          >
            {t('forms:success.submitAnother', 'Submit Another Request')}
          </button>

          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              t('forms:success.emailSubject', { ref: submittedRef, defaultValue: `Inquiry regarding Quote Request ${submittedRef}` })
            )}`}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-lg transition-colors text-center inline-flex items-center justify-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>{t('forms:success.emailUs', 'Email Coordination Desk')}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="enquiry">
      {/* 4-Step Progress Header */}
      <div className="bg-slate-50 p-4 sm:p-6 border-b border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
          <span>{t('forms:multiStep.stepOf', { current: currentStep, total: 4 })}</span>
          <span className="text-[#b91c1c] font-bold">
            {currentStep === 1 && t('forms:multiStep.step1Title', 'Your Products')}
            {currentStep === 2 && t('forms:multiStep.step2Title', 'Delivery & Terms')}
            {currentStep === 3 && t('forms:multiStep.step3Title', 'Your Details')}
            {currentStep === 4 && t('forms:multiStep.step4Title', 'Review & Send')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
          <div
            className="bg-[#b91c1c] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Step indicator labels */}
        <div className="grid grid-cols-4 gap-2 pt-3 text-[11px] text-slate-600 font-medium">
          <div className={currentStep >= 1 ? 'text-[#0B2545] font-bold' : 'text-slate-400'}>
            1. {t('forms:multiStep.step1Title', 'Products')}
          </div>
          <div className={currentStep >= 2 ? 'text-[#0B2545] font-bold' : 'text-slate-400'}>
            2. {t('forms:multiStep.step2Title', 'Delivery')}
          </div>
          <div className={currentStep >= 3 ? 'text-[#0B2545] font-bold' : 'text-slate-400'}>
            3. {t('forms:multiStep.step3Title', 'Details')}
          </div>
          <div className={currentStep >= 4 ? 'text-[#0B2545] font-bold' : 'text-slate-400'}>
            4. {t('forms:multiStep.step4Title', 'Review')}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-6">
        <input type="hidden" {...register('honeypot')} />

        {/* STEP 1: Repeatable Products */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B2545]">
                {t('forms:multiStep.step1Title', 'Your Products')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('forms:multiStep.step1Subtitle', 'Specify the products you need to source (up to 5 line items).')}
              </p>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => {
                const selectedCatSlug = watch(`line_items.${index}.category`);
                const selectedCategory = PRODUCT_CATEGORIES.find((c) => c.slug === selectedCatSlug);

                return (
                  <div
                    key={field.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 relative"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                        {t('forms:step1.productItemTitle', { index: index + 1 })}
                      </span>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{t('forms:step1.removeProduct', 'Remove Product')}</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category select */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.categoryLabel', 'Product Category *')}
                        </label>
                        <select
                          {...register(`line_items.${index}.category` as const)}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                        >
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>
                              {t(`categories:${cat.slug}.name`, cat.name)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.productNameLabel', 'Product Name *')}
                        </label>
                        <input
                          type="text"
                          {...register(`line_items.${index}.product_name` as const)}
                          placeholder={t('forms:step1.productNamePlaceholder', 'e.g. Combed Cotton Loopback Sweatshirt')}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                        />
                        {errors.line_items?.[index]?.product_name && (
                          <span className="text-[11px] text-rose-600 mt-1 block">
                            {errors.line_items[index]?.product_name?.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category quote info hint */}
                    {selectedCategory && (
                      <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-slate-700 space-y-1">
                        <span className="font-semibold text-amber-900 flex items-center gap-1.5 text-[11px]">
                          <Info className="w-3.5 h-3.5 text-amber-700" />
                          <span>{t('forms:step1.quoteHintsTitle', 'What suppliers need to quote for this category:')}</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {selectedCategory.quoteInfo.map((hint, hIdx) => (
                            <span key={hIdx} className="bg-white/80 px-2 py-0.5 rounded text-[11px] text-slate-600 border border-amber-200/50">
                              {hint}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-700">
                          {t('forms:step1.specsLabel', 'Specifications & Technical Details *')}
                        </label>
                      </div>
                      <textarea
                        rows={3}
                        {...register(`line_items.${index}.specifications` as const)}
                        placeholder={t('forms:step1.specsPlaceholder', 'Provide exact technical specs, grade, fabric GSM, or CAD tolerances...')}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                      />
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {t('forms:step1.specsHelper', 'Material, dimensions/size, colour, finish, tolerances, weight (GSM), and applicable standards.')}
                      </p>
                      {errors.line_items?.[index]?.specifications && (
                        <span className="text-[11px] text-rose-600 mt-1 block">
                          {errors.line_items[index]?.specifications?.message}
                        </span>
                      )}
                    </div>

                    {/* Quantity, Unit, Frequency, Target Price */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.quantityLabel', 'Estimated Quantity *')}
                        </label>
                        <input
                          type="text"
                          {...register(`line_items.${index}.quantity` as const)}
                          placeholder={t('forms:step1.quantityPlaceholder', 'e.g. 2500')}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                        />
                        {errors.line_items?.[index]?.quantity && (
                          <span className="text-[11px] text-rose-600 mt-1 block">
                            {errors.line_items[index]?.quantity?.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.unitLabel', 'Unit *')}
                        </label>
                        <select
                          {...register(`line_items.${index}.unit` as const)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                        >
                          <option value="pieces">{t('forms:step1.units.pieces', 'pieces')}</option>
                          <option value="kg">{t('forms:step1.units.kg', 'kg')}</option>
                          <option value="metres">{t('forms:step1.units.metres', 'metres')}</option>
                          <option value="sets">{t('forms:step1.units.sets', 'sets')}</option>
                          <option value="cartons">{t('forms:step1.units.cartons', 'cartons')}</option>
                          <option value="tonnes">{t('forms:step1.units.tonnes', 'tonnes')}</option>
                          <option value="other">{t('forms:step1.units.other', 'other')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.orderFrequencyLabel', 'Order Frequency')}
                        </label>
                        <select
                          {...register(`line_items.${index}.order_frequency` as const)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                        >
                          <option value="oneTime">{t('forms:step1.frequencies.oneTime', 'One-time trial order')}</option>
                          <option value="monthly">{t('forms:step1.frequencies.monthly', 'Monthly recurring')}</option>
                          <option value="quarterly">{t('forms:step1.frequencies.quarterly', 'Quarterly recurring')}</option>
                          <option value="yearly">{t('forms:step1.frequencies.yearly', 'Annual contract')}</option>
                          <option value="notSure">{t('forms:step1.frequencies.notSure', 'Not sure yet')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {t('forms:step1.targetPriceLabel', 'Target Price (optional)')}
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            {...register(`line_items.${index}.target_price` as const)}
                            placeholder="e.g. 12.50"
                            className="w-full text-xs px-2.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                          />
                          <select
                            {...register(`line_items.${index}.currency` as const)}
                            className="text-xs px-2 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700"
                          >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="AED">AED</option>
                            <option value="INR">INR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {fields.length < 5 && (
                <button
                  type="button"
                  onClick={() =>
                    append({
                      category: 'textiles-garments',
                      product_name: '',
                      specifications: '',
                      quantity: '',
                      unit: 'pieces',
                      order_frequency: 'oneTime',
                      currency: 'USD'
                    })
                  }
                  className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-[#b91c1c] text-xs font-bold text-slate-700 hover:text-[#b91c1c] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('forms:step1.addProduct', '+ Add Another Product (up to 5)')}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Delivery & Terms */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B2545]">
                {t('forms:multiStep.step2Title', 'Delivery & Terms')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('forms:multiStep.step2Subtitle', 'Destination, shipping terms and compliance requirements.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step2.destinationCountryLabel', 'Destination Country *')}
                </label>
                <input
                  type="text"
                  {...register('destination_country')}
                  placeholder="e.g. Germany, United Kingdom, USA, UAE..."
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
                {errors.destination_country && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.destination_country.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step2.deliveryLocationLabel', 'Delivery Port / Location')}
                </label>
                <input
                  type="text"
                  {...register('delivery_location')}
                  placeholder={t('forms:step2.deliveryLocationPlaceholder', 'e.g. Hamburg Port, Germany or CIF basis')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step2.tradeTermsLabel', 'Preferred Trade Terms (Incoterms)')}
                </label>
                <select
                  {...register('incoterm')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                >
                  <option value="notSure">{t('forms:step2.incoterms.notSure', 'Not sure / Recommend best')}</option>
                  <option value="fob">{t('forms:step2.incoterms.fob', 'FOB (Free On Board Chennai / Tuticorin port)')}</option>
                  <option value="cif">{t('forms:step2.incoterms.cif', 'CIF (Cost, Insurance & Freight to destination port)')}</option>
                  <option value="exw">{t('forms:step2.incoterms.exw', 'EXW (Ex Works factory)')}</option>
                  <option value="ddp">{t('forms:step2.incoterms.ddp', 'DDP (Delivered Duty Paid to warehouse)')}</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t('forms:step2.tradeTermsHelper', 'Indicative preference only. Final terms are agreed between buyer and manufacturer.')}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step2.deliveryDateLabel', 'Target Delivery Date (optional)')}
                </label>
                <input
                  type="date"
                  {...register('required_delivery_date')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
              </div>
            </div>

            {/* Checkboxes: Sample & Customisation */}
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('sample_required')}
                  className="mt-0.5 rounded text-[#0E9F9A] focus:ring-[#0E9F9A]"
                />
                <span className="text-xs text-slate-700">
                  {t('forms:step2.sampleRequiredLabel', 'Physical pre-production sample required before bulk order')}
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('customisation_needed')}
                  className="mt-0.5 rounded text-[#0E9F9A] focus:ring-[#0E9F9A]"
                />
                <span className="text-xs text-slate-700">
                  {t('forms:step2.customisationLabel', 'Custom branding / private label / custom tooling required')}
                </span>
              </label>

              {watchCustomisationNeeded && (
                <div className="pt-2 animate-in fade-in">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t('forms:step2.customisationNotesLabel', 'Customisation & Branding Details')}
                  </label>
                  <textarea
                    rows={2}
                    {...register('customisation_notes')}
                    placeholder={t('forms:step2.customisationNotesPlaceholder', 'Describe custom debossing, tags, embroidery, custom moulds or branded packaging...')}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Compliance */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('forms:step2.complianceLabel', 'Certifications, Testing or Regulatory Needs (optional)')}
              </label>
              <input
                type="text"
                {...register('compliance_needs')}
                placeholder={t('forms:step2.compliancePlaceholder', 'e.g. GOTS, OEKO-TEX Standard 100, REACH, FDA food grade, mill test reports...')}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
              />
            </div>

            {/* File Upload (Optional, 3 files, 10MB) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                {t('forms:step2.fileUploadLabel', 'Upload Drawings, Tech Packs or Spec Sheets (optional)')}
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <label className="text-xs font-bold text-[#b91c1c] hover:underline cursor-pointer">
                  <span>Click to browse files</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.stp,.step,.docx"
                  />
                </label>
                <p className="text-[11px] text-slate-500 mt-1">
                  {t('forms:step2.fileUploadHelper', 'Up to 3 files, maximum 10MB each (PDF, PNG, JPG, CAD drawings, DOCX).')}
                </p>
              </div>

              {fileError && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fileError}</span>
                </p>
              )}

              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-slate-100 rounded-lg text-xs"
                    >
                      <span className="truncate max-w-[80%] font-mono text-slate-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Your Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B2545]">
                {t('forms:multiStep.step3Title', 'Your Details')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('forms:multiStep.step3Subtitle', 'Company information and contact preference.')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.fullNameLabel', 'Full Name *')}
                </label>
                <input
                  type="text"
                  {...register('full_name')}
                  placeholder={t('forms:step3.fullNamePlaceholder', 'Your name')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
                {errors.full_name && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.full_name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.businessEmailLabel', 'Business Email *')}
                </label>
                <input
                  type="email"
                  {...register('business_email')}
                  placeholder={t('forms:step3.businessEmailPlaceholder', 'name@company.com')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
                {errors.business_email && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.business_email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.companyNameLabel', 'Company Name *')}
                </label>
                <input
                  type="text"
                  {...register('company_name')}
                  placeholder={t('forms:step3.companyNamePlaceholder', 'Registered business name')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
                {errors.company_name && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.company_name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.countryLabel', 'Your Country *')}
                </label>
                <input
                  type="text"
                  {...register('country')}
                  placeholder={t('forms:step3.selectCountry', 'e.g. United Kingdom, Germany, USA...')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
                {errors.country && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.country.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.websiteLabel', 'Company Website (optional)')}
                </label>
                <input
                  type="text"
                  {...register('company_website')}
                  placeholder={t('forms:step3.websitePlaceholder', 'https://example.com')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t('forms:step3.whatsappLabel', 'WhatsApp / Direct Phone (optional)')}
                </label>
                <input
                  type="text"
                  {...register('whatsapp')}
                  placeholder={t('forms:step3.whatsappPlaceholder', '+1 (555) 000-0000')}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('forms:step3.preferredContactLabel', 'Preferred Contact Method')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    value="email"
                    {...register('preferred_contact')}
                    className="text-[#0E9F9A] focus:ring-[#0E9F9A]"
                  />
                  <span className="text-xs text-slate-800">{t('forms:step3.contacts.email', 'Email')}</span>
                </label>
                <label className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    value="whatsapp"
                    {...register('preferred_contact')}
                    className="text-[#0E9F9A] focus:ring-[#0E9F9A]"
                  />
                  <span className="text-xs text-slate-800">{t('forms:step3.contacts.whatsapp', 'WhatsApp')}</span>
                </label>
                <label className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    value="videoCall"
                    {...register('preferred_contact')}
                    className="text-[#0E9F9A] focus:ring-[#0E9F9A]"
                  />
                  <span className="text-xs text-slate-800">{t('forms:step3.contacts.videoCall', 'Video Call')}</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review and Send */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#0B2545]">
                {t('forms:step4.reviewTitle', 'Review Sourcing Request Summary')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('forms:multiStep.step4Subtitle', 'Verify details and submit your request.')}
              </p>
            </div>

            {/* Read-Only Summary with Edit jumps */}
            <div className="space-y-4">
              {/* Products Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">
                    {t('forms:step4.sectionProducts', 'Products to Source')} ({watchAllFields.line_items?.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-[#b91c1c] hover:underline"
                  >
                    {t('forms:step4.editSection', 'Edit')}
                  </button>
                </div>
                <div className="divide-y divide-slate-200">
                  {watchAllFields.line_items?.map((item, idx) => (
                    <div key={idx} className="py-2 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{item.product_name || 'Item ' + (idx + 1)}</strong>
                        <span className="text-slate-600 font-mono">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] line-clamp-2">{item.specifications}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">
                    {t('forms:step4.sectionDelivery', 'Delivery & Terms')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold text-[#b91c1c] hover:underline"
                  >
                    {t('forms:step4.editSection', 'Edit')}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Destination:</span>
                    <strong className="text-slate-900">{watchAllFields.destination_country}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Incoterms:</span>
                    <strong className="text-slate-900 uppercase">{watchAllFields.incoterm}</strong>
                  </div>
                  {watchAllFields.sample_required && (
                    <div className="col-span-2 text-emerald-700 font-semibold text-[11px]">
                      ✓ Pre-production physical sample requested
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-xs text-[#0B2545] uppercase tracking-wider">
                    {t('forms:step4.sectionContact', 'Contact & Company')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold text-[#b91c1c] hover:underline"
                  >
                    {t('forms:step4.editSection', 'Edit')}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact:</span>
                    <strong className="text-slate-900">{watchAllFields.full_name}</strong> ({watchAllFields.company_name})
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email:</span>
                    <span className="font-mono text-slate-800">{watchAllFields.business_email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consent checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-1 rounded text-[#0E9F9A] focus:ring-[#0E9F9A]"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  {t('forms:step4.consentText', 'I agree that Connect HF may share these specifications with vetted manufacturers in Tamil Nadu to coordinate quotations, in accordance with the')}{' '}
                  <LocalizedLink to="/privacy-policy" className="text-[#0E9F9A] underline font-semibold">
                    {t('forms:step4.privacyPolicyLink', 'Privacy Policy')}
                  </LocalizedLink>
                  . *
                </span>
              </label>
              {errors.consent && (
                <span className="text-[11px] text-rose-600 mt-1 block">
                  {errors.consent.message}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t('common:cta.back', 'Back')}</span>
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>{t('common:cta.next', 'Next')}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] disabled:opacity-50 rounded-lg transition-colors inline-flex items-center gap-2 shadow-md"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('forms:step4.submitting', 'Submitting Sourcing Request...')}</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('forms:step4.submitButton', 'Submit Sourcing Request')}</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
