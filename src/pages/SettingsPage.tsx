import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Settings,
  ShieldCheck,
  Mail,
  UserCheck,
  Sliders,
  Bell,
  Database,
  ExternalLink,
  CheckCircle2,
  Key,
  Globe
} from 'lucide-react';
import { ADMIN_EMAIL, BRAND_NAME, SITE_URL } from '../config/site';
import { requestService } from '../services/requestService';
import { Seo } from '../components/common/Seo';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(requestService.isAdminLoggedIn());
  const [emailInput, setEmailInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestService.adminLogin(emailInput)) {
      setIsAdminLoggedIn(true);
      setStatusMessage('Admin access verified successfully. Redirecting to management console...');
      setTimeout(() => navigate('/admin'), 600);
    } else {
      setStatusMessage('Access denied. Unrecognized administrator email address.');
    }
  };

  return (
    <>
      <Seo title={`System Settings & Admin Access | ${BRAND_NAME}`} noindex path="/settings" />

      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
            <Settings className="w-4 h-4" />
            <span>Settings & Access Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            System Settings & Administration
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Manage administrative credentials, notification recipient email, inbound form fill pipeline, and deployment configurations.
          </p>
        </div>
      </div>

      <div className="py-12 bg-[#F5F7FA] min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Admin Access Panel */}
          <div className="bg-white rounded-[10px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#b91c1c]" />
                  <h2 className="text-lg font-bold text-[#0B2545]">
                    Admin Portal Access
                  </h2>
                </div>
                <p className="text-xs text-slate-600">
                  Manually authenticate with your administrator credentials to view, edit, and action all incoming buyer enquiries and manufacturer form fills.
                </p>
              </div>

              {isAdminLoggedIn ? (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admin Session Active</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full shrink-0">
                  Authentication Required
                </span>
              )}
            </div>

            {statusMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-[6px] text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {isAdminLoggedIn ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs text-slate-900 block">
                      Form Fills & Request Pipeline Ready
                    </span>
                    <p className="text-xs text-slate-600">
                      You are authenticated as administrator with full edit rights to update request status, assigned owners, next actions, and internal notes.
                    </p>
                  </div>
                  <Link
                    to="/admin"
                    className="inline-flex items-center px-5 py-2.5 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px] transition-colors shrink-0 shadow-xs"
                  >
                    Open Form Fills Console →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Administrator Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your administrator email"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-900"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px] transition-colors shadow-xs"
                    >
                      Authenticate Admin Credentials
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* System Notification & Destination Settings */}
          <div className="bg-white rounded-[10px] border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Bell className="w-5 h-5 text-[#b91c1c]" />
              <h2 className="text-base font-bold text-[#0B2545]">
                Inbound Form Notification Settings
              </h2>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                  <span className="font-semibold text-slate-900 block">Primary Alert Recipient:</span>
                  <span className="font-mono text-[#b91c1c] font-bold block">
                    {isAdminLoggedIn ? ADMIN_EMAIL : '•••••••••••••••••@gmail.com (Authenticate to view)'}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    All form fills (Buyer brief, Manufacturer registration, Contact message) dispatch alerts to the authorized administrator.
                  </p>
                </div>

                <div className="p-3.5 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                  <span className="font-semibold text-slate-900 block">Hosting Target:</span>
                  <span className="font-mono text-slate-800 font-bold block">Vercel Production SPA</span>
                  <p className="text-[11px] text-slate-500">
                    Configured with <code className="bg-slate-200 px-1 rounded">/vercel.json</code> rewrites for clean client-side routing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
