import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { CONTACT_EMAIL } from '../config/site';
import { requestService } from '../services/requestService';
import { Seo } from '../components/common/Seo';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  businessEmail: z.string().email('Please enter a valid business email'),
  company: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy to proceed'
  }),
  honeypot: z.string().max(0, 'Spam detected')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactPage: React.FC = () => {
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      enquiryType: 'Buyer enquiry',
      consent: false,
      honeypot: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const record = await requestService.submitContactMessage({
        name: data.name,
        business_email: data.businessEmail,
        company: data.company || undefined,
        enquiry_type: data.enquiryType,
        message: data.message,
        consent: data.consent
      });
      setSubmittedId(record.id);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact | Tamil Nadu Export Sourcing"
        description="Get in touch with our Tamil Nadu sourcing agency team. Submit general enquiries or partnership questions."
        path="/contact"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Coordination Liaison
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Contact
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Reach out with product requirements, supplier questions, or general coordination inquiries.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details (No physical address as requested) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
                <h2 className="text-base font-bold text-[#0B2545]">
                  Coordination Desk
                </h2>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#b91c1c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-slate-900">Direct Email:</span>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[#b91c1c] hover:underline font-mono"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-[6px] space-y-1">
                    <span className="font-semibold block text-slate-900 text-[11px] uppercase tracking-wider">
                      Response Timeline
                    </span>
                    <p className="text-slate-600 leading-normal">
                      We review inbound messages within 24 to 48 business hours. For immediate RFQ processing, submit a formal buyer brief.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                  For product sourcing briefs with technical specifications and target pricing, please use the{' '}
                  <Link to="/buyers#enquiry" className="text-[#b91c1c] underline font-semibold">
                    Buyer Sourcing Brief form
                  </Link>
                  .
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 shadow-xs">
              <section id="contact-form" className="space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h2 className="text-xl font-bold text-[#0B2545]">
                    Send a Message
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below to connect with our coordination desk.
                  </p>
                </div>

                {submittedId ? (
                  <div className="p-6 bg-[#EBF7F7] border border-[#0E9F9A]/30 rounded-[8px] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[8px] bg-[#0E9F9A] text-white flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#0B2545]">
                          Message Received
                        </h3>
                        <p className="text-xs text-slate-600">
                          We have received your message. Reference ID: <span className="font-mono font-semibold text-slate-900">{submittedId}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmittedId(null)}
                      className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                          Name *
                        </label>
                        <input
                          type="text"
                          {...register('name')}
                          placeholder="Your name"
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-rose-600 mt-1">{errors.name.message}</p>
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          {...register('company')}
                          placeholder="Your company name"
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Enquiry Type *
                        </label>
                        <select
                          {...register('enquiryType')}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                        >
                          <option value="Buyer enquiry">Buyer enquiry</option>
                          <option value="Manufacturer">Manufacturer</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        {...register('message')}
                        placeholder="Please share your message or enquiry details."
                        className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900"
                      />
                      {errors.message && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="pt-1">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="contact-consent"
                          {...register('consent')}
                          className="mt-0.5 w-4 h-4 text-[#0E9F9A] border-slate-300 rounded focus:ring-[#0E9F9A]"
                        />
                        <label htmlFor="contact-consent" className="text-xs text-slate-700 cursor-pointer">
                          I agree that my details may be used to respond to this message, as described in the{' '}
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
                        className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] disabled:bg-slate-400 rounded-[8px] transition-colors shadow-xs"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
