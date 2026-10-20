import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck } from 'lucide-react';
import {
  BRAND_NAME,
  CONTACT_EMAIL,
  SOCIALS
} from '../../config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2545] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Column 1: Brand & Liaison */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center tracking-tight text-xl font-black">
                <span className="text-white">CONNECT</span>
                <span className="text-[#ef4444] ml-1.5">HF</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-6 h-0.5 bg-[#ef4444] rounded-full" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  SOURCING PARTNER
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Mail className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-white underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ef4444]"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="pt-2">
              <Link
                to="/settings"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin & Settings</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/products/textiles-garments" className="hover:text-white transition-colors">
                  Textiles, Garments & Home Furnishings
                </Link>
              </li>
              <li>
                <Link to="/products/leather-goods" className="hover:text-white transition-colors">
                  Leather Goods & Footwear
                </Link>
              </li>
              <li>
                <Link to="/products/bags-packaging" className="hover:text-white transition-colors">
                  Bags & Packaging
                </Link>
              </li>
              <li>
                <Link to="/products/engineering-components" className="hover:text-white transition-colors">
                  Engineering & Industrial Components
                </Link>
              </li>
              <li>
                <Link to="/products/handicrafts-home-decor" className="hover:text-white transition-colors">
                  Handicrafts & Home Décor
                </Link>
              </li>
              <li>
                <Link to="/products/agricultural-products" className="hover:text-white transition-colors">
                  Agricultural Products & Ingredients
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sourcing & Partnerships */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Sourcing & Partnerships
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/buyers#enquiry" className="hover:text-white transition-colors">
                  Submit a Sourcing Enquiry
                </Link>
              </li>
              <li>
                <Link to="/manufacturers#apply" className="hover:text-white transition-colors">
                  Join as a Manufacturer
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us & FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Agency Transparency */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Agency Scope
            </h4>
            <p className="leading-relaxed">
              We operate as a sourcing and coordination intermediary. We do not manufacture products directly.
            </p>
            <p className="leading-relaxed">
              Supplier availability, compliance and prices are confirmed case by case.
            </p>

            {/* Social icons only if SOCIALS non-empty */}
            {SOCIALS.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2">Connect</span>
                <div className="flex items-center gap-3">
                  {SOCIALS.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-white underline"
                    >
                      {soc.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar with Privacy, Terms, and Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
