import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Settings,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  LogOut,
  Sliders,
  FileText,
  Mail,
  Building
} from 'lucide-react';
import { BRAND_NAME } from '../../config/site';
import { requestService } from '../../services/requestService';
import { PRODUCT_CATEGORIES } from '../../data/categories';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(requestService.isAdminLoggedIn());
  const categoriesRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsAdmin(requestService.isAdminLoggedIn());
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdminLogout = () => {
    requestService.adminLogout();
    setIsAdmin(false);
    setSettingsDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo matching reference aesthetic */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b91c1c] rounded-[8px]"
        >
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight text-xl sm:text-2xl font-black">
              <span className="text-[#0B2545]">CONNECT</span>
              <span className="text-[#b91c1c] ml-1.5">HF</span>
            </div>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <div className="w-8 h-0.5 bg-[#b91c1c] rounded-full" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                SOURCING PARTNER
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* Categories Dropdown */}
          <div className="relative" ref={categoriesRef}>
            <button
              type="button"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
                location.pathname.startsWith('/products')
                  ? 'text-[#0B2545] font-semibold'
                  : 'text-[#1F2937] hover:text-[#0E9F9A]'
              }`}
            >
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180 text-[#0E9F9A]' : 'text-slate-400'}`} />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-[8px] border border-slate-200 shadow-lg py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Manufacturing Sectors
                </div>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products/${cat.slug}`}
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#F5F7FA] hover:text-[#0E9F9A] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <Link
                    to="/products"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-3 py-1.5 text-xs font-semibold text-[#0E9F9A] hover:underline"
                  >
                    Browse All Categories →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/how-it-works"
            className={`text-sm font-medium transition-colors py-1 ${
              isActive('/how-it-works') ? 'text-[#0B2545] font-semibold border-b-2 border-[#0E9F9A]' : 'text-[#1F2937] hover:text-[#0E9F9A]'
            }`}
          >
            How It Works
          </Link>

          <Link
            to="/buyers"
            className={`text-sm font-medium transition-colors py-1 ${
              isActive('/buyers') ? 'text-[#0B2545] font-semibold border-b-2 border-[#0E9F9A]' : 'text-[#1F2937] hover:text-[#0E9F9A]'
            }`}
          >
            For Buyers
          </Link>

          <Link
            to="/manufacturers"
            className={`text-sm font-medium transition-colors py-1 ${
              isActive('/manufacturers') ? 'text-[#0B2545] font-semibold border-b-2 border-[#0E9F9A]' : 'text-[#1F2937] hover:text-[#0E9F9A]'
            }`}
          >
            For Manufacturers
          </Link>

          <Link
            to="/about"
            className={`text-sm font-medium transition-colors py-1 ${
              isActive('/about') ? 'text-[#0B2545] font-semibold border-b-2 border-[#0E9F9A]' : 'text-[#1F2937] hover:text-[#0E9F9A]'
            }`}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors py-1 ${
              isActive('/contact') ? 'text-[#0B2545] font-semibold border-b-2 border-[#0E9F9A]' : 'text-[#1F2937] hover:text-[#0E9F9A]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions: Settings / Admin Menu + Red/Teal Submit Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Settings & Admin Access Menu */}
          <div className="relative" ref={settingsRef}>
            <button
              type="button"
              onClick={() => setSettingsDropdownOpen(!settingsDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9F9A]"
              title="Admin & System Settings"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span>Settings</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Admin Active" />
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {settingsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-[8px] border border-slate-200 shadow-xl py-2 z-50">
                {isAdmin ? (
                  <>
                    <div className="px-4 py-2 border-b border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Admin Session
                      </span>
                      <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Administrator Active</span>
                      </div>
                    </div>
                    <div className="py-1 text-xs text-slate-700">
                      <Link
                        to="/admin"
                        onClick={() => setSettingsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F5F7FA] font-medium text-[#0B2545]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#0E9F9A]" />
                        <span>Manage Form Fills & Requests</span>
                      </Link>
                      <Link
                        to="/admin?tab=settings"
                        onClick={() => setSettingsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#F5F7FA] text-slate-600"
                      >
                        <Sliders className="w-4 h-4 text-slate-500" />
                        <span>System Settings</span>
                      </Link>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-rose-600"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Admin</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545]">
                      <ShieldCheck className="w-4 h-4 text-[#0E9F9A]" />
                      <span>Administrator Access</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Authorized personnel only. Manually enter your administrator credentials to manage requests and supplier matching.
                    </p>
                    <Link
                      to="/admin"
                      onClick={() => setSettingsDropdownOpen(false)}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#183C6C] rounded-[6px] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-[#0E9F9A]" />
                      <span>Sign In to Admin Portal</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary Requirement Button (Inspired by reference design) */}
          <Link
            to="/buyers#enquiry"
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px] transition-colors shadow-xs"
          >
            Submit Requirement
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/buyers#enquiry"
            className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px]"
          >
            Submit RFQ
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#0B2545] rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9F9A]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              Product Categories
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              How It Works
            </Link>
            <Link
              to="/buyers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              For Buyers
            </Link>
            <Link
              to="/manufacturers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              For Manufacturers
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium rounded-[8px] text-[#1F2937] hover:bg-slate-50"
            >
              Contact
            </Link>
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/buyers#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px]"
            >
              Submit Requirement
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[8px] flex items-center justify-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-[#0E9F9A]" />
              <span>Admin Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
