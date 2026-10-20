import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shirt,
  Briefcase,
  ShoppingBag,
  Cog,
  Palette,
  Sprout,
  Compass,
  CheckCircle,
  MessageSquare,
  Sliders,
  FileCheck2,
  Users,
  ShieldCheck,
  Globe2,
  Headphones,
  CheckCircle2,
  Layers,
  MapPin
} from 'lucide-react';
import { BRAND_NAME, TAGLINE } from '../config/site';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { Seo } from '../components/common/Seo';

export const HomePage: React.FC = () => {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'textiles-garments':
        return <Shirt className="w-5 h-5 text-[#b91c1c]" />;
      case 'leather-goods':
        return <Briefcase className="w-5 h-5 text-[#b91c1c]" />;
      case 'bags-packaging':
        return <ShoppingBag className="w-5 h-5 text-[#b91c1c]" />;
      case 'engineering-components':
        return <Cog className="w-5 h-5 text-[#b91c1c]" />;
      case 'handicrafts-home-decor':
        return <Palette className="w-5 h-5 text-[#b91c1c]" />;
      case 'agricultural-products':
        return <Sprout className="w-5 h-5 text-[#b91c1c]" />;
      default:
        return <Shirt className="w-5 h-5 text-[#b91c1c]" />;
    }
  };

  return (
    <>
      <Seo
        title={`Tamil Nadu Sourcing & Export Coordination | ${BRAND_NAME}`}
        description="Connect with potential manufacturers and suppliers across Tamil Nadu, India. Submit your product requirements for sourcing support, supplier research and quotation coordination."
        path="/"
      />

      {/* Hero Section matching Reference Image visual language */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-10 sm:pt-16 pb-20 border-b border-slate-200">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-teal-50/50 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow badge matching reference */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200/80 rounded-full text-xs font-bold uppercase tracking-wider text-[#b91c1c]">
                <span className="w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse"></span>
                <span>Sourcing From Tamil Nadu, Made Simple</span>
              </div>

              {/* Bold Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#0B2545] tracking-tight leading-[1.12]">
                  Source from Tamil Nadu. <br />
                  Connect with the{' '}
                  <span className="text-[#b91c1c]">Right Manufacturers.</span>
                </h1>
                {/* Decorative underline like reference */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-12 h-1 bg-[#b91c1c] rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-[#b91c1c] rounded-full"></div>
                </div>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                We help international buyers discover and connect with suitable manufacturers and suppliers across Tamil Nadu, India. From product enquiries and supplier shortlisting to quotation coordination, we help move sourcing conversations forward with clear communication.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/buyers#enquiry"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px] transition-all shadow-md hover:shadow-lg group"
                >
                  <span>Submit a Sourcing Enquiry</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-[8px] transition-colors shadow-xs"
                >
                  <span>Browse Categories</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 text-slate-400" />
                </Link>
              </div>

              {/* Tagline under buttons */}
              <p className="text-xs text-slate-500 font-medium">
                {TAGLINE}
              </p>

              {/* Trust Badge Icons Row from Reference */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span>Verified supplier network</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span>Quality managed</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center">
                    <Globe2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Global delivery</span>
                </div>
              </div>
            </div>

            {/* Right Side: Glowing 3D-styled Globe highlighting India / Tamil Nadu with nodes & radiant connection arcs */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
                {/* Outer radial glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/15 via-[#0B2545]/10 to-transparent rounded-full filter blur-xl" />

                {/* Globe Graphic SVG */}
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full drop-shadow-2xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="globeGrad" cx="35%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#2c3e50" />
                      <stop offset="65%" stopColor="#0B2545" />
                      <stop offset="100%" stopColor="#051329" />
                    </radialGradient>
                    <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#0E9F9A" />
                    </linearGradient>
                  </defs>

                  {/* Planet Sphere */}
                  <circle cx="250" cy="250" r="185" fill="url(#globeGrad)" stroke="#1e3a8a" strokeWidth="2" />

                  {/* Lat/Long Grid Curves */}
                  <ellipse cx="250" cy="250" rx="185" ry="70" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />
                  <ellipse cx="250" cy="250" rx="185" ry="130" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />
                  <ellipse cx="250" cy="250" rx="75" ry="185" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />
                  <ellipse cx="250" cy="250" rx="135" ry="185" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.25" />

                  {/* Continents Outlines (Simplified Eurasia & Africa) */}
                  <path
                    d="M170 120 C185 105 210 110 240 125 C265 140 310 130 330 160 C345 180 320 210 295 210 C270 210 260 230 250 250 C240 270 230 290 220 275 C210 260 215 235 195 220 C175 205 155 170 170 120 Z"
                    fill="#334155"
                    fillOpacity="0.65"
                    stroke="#475569"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M130 200 C150 205 165 240 160 270 C155 300 180 340 175 365 C170 380 150 360 140 320 C130 280 115 250 130 200 Z"
                    fill="#334155"
                    fillOpacity="0.65"
                  />

                  {/* Highlighted Glowing India & Tamil Nadu Corridor */}
                  <path
                    d="M245 205 L260 215 L268 238 L262 265 L252 285 L246 270 L238 245 L242 220 Z"
                    fill="#b91c1c"
                    fillOpacity="0.95"
                    stroke="#ef4444"
                    strokeWidth="2"
                    filter="drop-shadow(0 0 10px rgba(239, 68, 68, 0.9))"
                  />

                  {/* Pulsing Focal Node on Tamil Nadu (South India) */}
                  <circle cx="253" cy="280" r="24" fill="url(#glowRed)" />
                  <circle cx="253" cy="280" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="253" cy="280" r="3.5" fill="#ffffff" />

                  {/* International Destination Nodes */}
                  {/* Western Europe */}
                  <circle cx="165" cy="155" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                  {/* Middle East (Dubai) */}
                  <circle cx="205" cy="225" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
                  {/* East Asia / Singapore */}
                  <circle cx="340" cy="290" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                  {/* North America Gateway */}
                  <circle cx="95" cy="180" r="5.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
                  {/* Australia Gateway */}
                  <circle cx="365" cy="380" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Radiating Curved Sourcing Arcs */}
                  <path d="M253 280 Q210 190 165 155" stroke="url(#arcGrad)" strokeWidth="2.5" strokeDasharray="6 3" />
                  <path d="M253 280 Q230 240 205 225" stroke="#ef4444" strokeWidth="2" />
                  <path d="M253 280 Q300 270 340 290" stroke="url(#arcGrad)" strokeWidth="2.2" strokeDasharray="5 3" />
                  <path d="M253 280 Q160 210 95 180" stroke="#ef4444" strokeWidth="2" strokeDasharray="7 4" />
                  <path d="M253 280 Q320 340 365 380" stroke="url(#arcGrad)" strokeWidth="2" />

                  {/* Orbital decorative rings */}
                  <circle cx="250" cy="250" r="225" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.4" />
                  <ellipse cx="250" cy="250" rx="230" ry="90" stroke="#0E9F9A" strokeWidth="1.2" strokeOpacity="0.35" transform="rotate(-25 250 250)" />
                </svg>

                {/* Floating pill badge on the globe */}
                <div className="absolute -bottom-2 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-[8px] border border-slate-200 shadow-lg text-[11px] font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Tuticorin & Chennai Port Outbound</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Floating Stats Dock from Reference Image */}
          <div className="mt-14 pt-8 bg-white rounded-[12px] border border-slate-200/90 shadow-md p-6 sm:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* Stat 1 */}
              <div className="flex items-center gap-3.5 pr-4">
                <div className="w-12 h-12 rounded-[10px] bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    6 Major
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">
                    Industrial Clusters
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3.5 sm:pl-6 pt-4 sm:pt-0">
                <div className="w-12 h-12 rounded-[10px] bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    6 Sourcing
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">
                    Product Sectors
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3.5 sm:pl-6 pt-4 sm:pt-0">
                <div className="w-12 h-12 rounded-[10px] bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    6-Stage
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">
                    Managed Process
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3.5 sm:pl-6 pt-4 sm:pt-0">
                <div className="w-12 h-12 rounded-[10px] bg-red-50 text-[#b91c1c] flex items-center justify-center shrink-0">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
                    End-to-End
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight">
                    Coordination Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4b. "Explore Products We Can Help Source": 6 category cards */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
              Manufacturing Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              Explore Products We Can Help Source
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="bg-white border border-slate-200 rounded-[8px] p-6 flex flex-col justify-between hover:border-red-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-[8px] bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <h3 className="text-base font-bold text-[#0B2545] leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.short}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/products/${cat.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#b91c1c] hover:text-[#991b1b] transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <Link
                    to={`/buyers?category=${cat.slug}#enquiry`}
                    className="text-xs font-medium text-slate-500 hover:text-[#0B2545]"
                  >
                    Request brief
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4c. Value proposition (5 items, icon + title + text) */}
      <section className="py-16 sm:py-20 bg-[#F5F7FA] border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
              Why Work With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              A Structured Approach to Sourcing
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[8px] bg-red-50 text-[#b91c1c] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Regional sourcing knowledge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A focused network-building effort across Tamil Nadu manufacturing clusters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[8px] bg-red-50 text-[#b91c1c] flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Supplier matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Shortlist potential suppliers based on product specifications, quantity, target price and required timelines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[8px] bg-red-50 text-[#b91c1c] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Clear communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinate buyer requirements, supplier questions, samples and quotations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
              <div className="w-9 h-9 rounded-[8px] bg-red-50 text-[#b91c1c] flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Flexible sourcing support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Product selection and supplier availability are confirmed against each enquiry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-3 shadow-xs md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-[8px] bg-red-50 text-[#b91c1c] flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Transparent process</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We explain who manufactures the goods, who contracts for the sale and how next steps are handled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4d. How it works, 5 numbered steps */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
              Step-by-Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-[#F5F7FA] p-5 rounded-[8px] border border-slate-200 space-y-3">
              <div className="w-7 h-7 rounded-[8px] bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Tell us what you need: product, specifications, quantity, destination and timeline.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-5 rounded-[8px] border border-slate-200 space-y-3">
              <div className="w-7 h-7 rounded-[8px] bg-[#b91c1c] text-white flex items-center justify-center font-bold text-xs">
                2
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We review the brief and identify potentially suitable suppliers.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-5 rounded-[8px] border border-slate-200 space-y-3">
              <div className="w-7 h-7 rounded-[8px] bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                3
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We coordinate supplier questions, indicative quotations and sample discussions.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-5 rounded-[8px] border border-slate-200 space-y-3">
              <div className="w-7 h-7 rounded-[8px] bg-[#b91c1c] text-white flex items-center justify-center font-bold text-xs">
                4
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Buyer and manufacturer review and agree commercial terms directly, unless a different arrangement is expressly agreed.
              </p>
            </div>

            <div className="bg-[#F5F7FA] p-5 rounded-[8px] border border-slate-200 space-y-3">
              <div className="w-7 h-7 rounded-[8px] bg-[#D98E04] text-white flex items-center justify-center font-bold text-xs">
                5
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We help coordinate communication and follow-up according to the agreed scope.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/how-it-works"
              className="inline-flex items-center text-xs font-semibold text-[#b91c1c] hover:underline"
            >
              See the full process →
            </Link>
          </div>
        </div>
      </section>

      {/* 4e. Closing CTA band */}
      <section className="py-14 bg-[#b91c1c] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Have a product requirement?
          </h2>
          <p className="text-sm sm:text-base text-red-50 max-w-2xl mx-auto leading-relaxed">
            Share your sourcing brief. We will review the details and confirm whether we can identify suitable supplier options.
          </p>
          <div className="pt-2">
            <Link
              to="/buyers#enquiry"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-[#0B2545] bg-white hover:bg-slate-100 rounded-[8px] transition-colors shadow-sm"
            >
              Discuss Your Requirement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
