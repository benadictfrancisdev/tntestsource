import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Settings,
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Search,
  Filter,
  PlusCircle,
  Download,
  Trash2,
  Edit3,
  X,
  Save,
  LogOut,
  Bell,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Check
} from 'lucide-react';
import { ADMIN_EMAIL, BRAND_NAME } from '../config/site';
import { requestService } from '../services/requestService';
import {
  BuyerEnquiryRecord,
  ManufacturerApplicationRecord,
  ContactMessageRecord,
  RequestStatus
} from '../types/database';
import { Seo } from '../components/common/Seo';

export const SettingsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'all' | 'buyers' | 'manufacturers' | 'contacts' | 'config') || 'all';

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(requestService.isAdminLoggedIn());
  const [emailInput, setEmailInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Form fills data states
  const [buyers, setBuyers] = useState<BuyerEnquiryRecord[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerApplicationRecord[]>([]);
  const [contacts, setContacts] = useState<ContactMessageRecord[]>([]);

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<'all' | 'buyers' | 'manufacturers' | 'contacts' | 'config'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notificationSaved, setNotificationSaved] = useState(false);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<{
    type: 'buyer' | 'manufacturer' | 'contact';
    item: BuyerEnquiryRecord | ManufacturerApplicationRecord | ContactMessageRecord;
  } | null>(null);

  // Edit form fields
  const [editStatus, setEditStatus] = useState<RequestStatus>('new');
  const [editOwner, setEditOwner] = useState('');
  const [editNextAction, setEditNextAction] = useState('');
  const [editFollowUpDate, setEditFollowUpDate] = useState('');
  const [editInternalNotes, setEditInternalNotes] = useState('');

  const loadData = () => {
    setBuyers(requestService.getBuyerEnquiries());
    setManufacturers(requestService.getManufacturerApplications());
    setContacts(requestService.getContactMessages());
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadData();
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (requestService.adminLogin(emailInput)) {
      setIsAdminLoggedIn(true);
      loadData();
    } else {
      setLoginError('Access denied. Unrecognized or unauthorized administrator credentials.');
    }
  };

  const handleAdminLogout = () => {
    requestService.adminLogout();
    setIsAdminLoggedIn(false);
  };

  const openEditModal = (
    type: 'buyer' | 'manufacturer' | 'contact',
    item: BuyerEnquiryRecord | ManufacturerApplicationRecord | ContactMessageRecord
  ) => {
    setEditingItem({ type, item });
    setEditStatus(item.status);
    setEditOwner(item.owner || ADMIN_EMAIL);
    setEditNextAction(item.next_action || '');
    setEditFollowUpDate(item.follow_up_date || '');
    setEditInternalNotes(item.internal_notes || '');
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    const updates = {
      status: editStatus,
      owner: editOwner,
      next_action: editNextAction,
      follow_up_date: editFollowUpDate,
      internal_notes: editInternalNotes,
      acknowledged_at: editingItem.item.acknowledged_at || new Date().toISOString()
    };

    if (editingItem.type === 'buyer') {
      requestService.updateBuyerEnquiry(editingItem.item.id, updates);
    } else if (editingItem.type === 'manufacturer') {
      requestService.updateManufacturerApplication(editingItem.item.id, updates);
    } else {
      requestService.updateContactMessage(editingItem.item.id, updates);
    }

    loadData();
    setEditingItem(null);
  };

  const handleDelete = (type: 'buyer' | 'manufacturer' | 'contact', id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      requestService.deleteRecord(type, id);
      loadData();
      if (editingItem && editingItem.item.id === id) {
        setEditingItem(null);
      }
    }
  };

  // Generate a live sample buyer form fill to verify instant pipeline
  const handleGenerateSampleFormFill = async () => {
    const sampleItems = [
      {
        full_name: 'Alexander Schmidt',
        business_email: 'a.schmidt@berlin-apparel.de',
        company_name: 'Berlin Apparel Imports GmbH',
        country: 'Germany',
        product_category: 'textiles-garments',
        product_name: 'Heavyweight Loopback Cotton Hoodies',
        specifications: '100% Combed Organic Cotton, 420 GSM, reactive piece dyed, custom metal aglets. Required port: Tuticorin or Chennai.',
        est_quantity: '3,000 units initial run',
        order_frequency: 'Bi-annual recurring',
        target_price: '8.50',
        currency: 'EUR',
        destination_country: 'Germany',
        delivery_location: 'Hamburg Port / CIF basis',
        required_delivery_date: '2027-05-30',
        compliance_needs: 'GOTS, OEKO-TEX Standard 100 Class 1',
        consent: true
      },
      {
        full_name: 'Matteo Rossi',
        business_email: 'mrossi@milano-pelletteria.it',
        company_name: 'Milano Leather Goods Srl',
        country: 'Italy',
        product_category: 'leather-goods',
        product_name: 'Full-Grain Vegetable Tanned Leather Wallets',
        specifications: 'Cowhide 1.2mm, burnished edges, RFID blocking lining, custom debossed logo.',
        est_quantity: '1,500 units',
        order_frequency: 'Quarterly',
        target_price: '11.00',
        currency: 'EUR',
        destination_country: 'Italy',
        delivery_location: 'Genoa Port',
        required_delivery_date: '2027-04-15',
        compliance_needs: 'REACH compliance certificate',
        consent: true
      }
    ];

    const randomPick = sampleItems[Math.floor(Math.random() * sampleItems.length)];
    await requestService.submitBuyerEnquiry(randomPick);
    loadData();
  };

  // Export all form fills as CSV
  const handleExportCSV = () => {
    const rows = [
      ['Type', 'ID', 'Date', 'Name', 'Company', 'Email', 'Product/Category', 'Status', 'Owner', 'Next Action']
    ];

    buyers.forEach((b) => {
      rows.push(['Buyer Enquiry', b.id, b.created_at, b.full_name, b.company_name, b.business_email, b.product_name, b.status, b.owner || '', b.next_action || '']);
    });

    manufacturers.forEach((m) => {
      rows.push(['Manufacturer', m.id, m.created_at, m.contact_name, m.business_name, m.business_email, m.product_categories.join('; '), m.status, m.owner || '', m.next_action || '']);
    });

    contacts.forEach((c) => {
      rows.push(['Contact Message', c.id, c.created_at, c.name, c.company || '', c.business_email, c.enquiry_type, c.status, c.owner || '', c.next_action || '']);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `connect_hf_form_fills_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'new':
        return <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">New</span>;
      case 'under_review':
        return <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Under Review</span>;
      case 'supplier_matching':
        return <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Supplier Matching</span>;
      case 'quotation_coordination':
        return <span className="text-[11px] font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">Quotation Coordination</span>;
      case 'client_discussion':
        return <span className="text-[11px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">Buyer Discussion</span>;
      case 'closed':
        return <span className="text-[11px] font-semibold text-slate-800 bg-slate-200 px-2 py-0.5 rounded">Closed</span>;
      case 'archived':
        return <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Archived</span>;
      default:
        return <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{status}</span>;
    }
  };

  // Filtered lists
  const filteredBuyers = buyers.filter((b) => {
    const matchesSearch =
      b.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.business_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMfrs = manufacturers.filter((m) => {
    const matchesSearch =
      m.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.factory_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.business_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.business_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Seo title={`Settings & Admin Portal | ${BRAND_NAME}`} noindex path="/settings" />

      {/* Settings Header */}
      <div className="py-10 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b91c1c]">
              <Settings className="w-4 h-4" />
              <span>Admin Access & System Settings</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight">
              {isAdminLoggedIn ? 'Form Fills & Request Administration' : 'Administrator Authentication'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              {isAdminLoggedIn
                ? 'Manage incoming buyer sourcing briefs, manufacturer applications, inquiry statuses, and export pipelines.'
                : 'Please manually enter your authorized administrator email address to access inbound form fills.'}
            </p>
          </div>

          {isAdminLoggedIn && (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={handleGenerateSampleFormFill}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[6px] transition-colors shadow-xs"
                title="Test: Simulate an incoming buyer request to verify the pipeline"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Simulate Form Fill</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[6px] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handleAdminLogout}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-[6px] transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-8 bg-[#F5F7FA] min-h-[75vh]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Unauthenticated View: Manual Entry Form */}
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-[10px] p-6 sm:p-8 shadow-sm space-y-6 my-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-[10px] bg-[#0B2545] text-white flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7 text-[#b91c1c]" />
                </div>
                <h2 className="text-lg font-bold text-[#0B2545]">
                  Sign In as Administrator
                </h2>
                <p className="text-xs text-slate-600">
                  Enter your administrator email address to view and manage inbound buyer enquiries and manufacturer form fills.
                </p>
              </div>

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
                      placeholder="Enter administrator email address"
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-900"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[8px] transition-colors shadow-xs"
                >
                  Authenticate & View Form Fills
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated View: The Form Fills Come Directly Here */
            <div className="space-y-6">
              {/* Metrics Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-[8px] border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Buyer Briefs
                  </span>
                  <div className="text-2xl font-black text-[#0B2545]">{buyers.length}</div>
                  <p className="text-[11px] text-slate-500">
                    {buyers.filter((b) => b.status === 'new').length} newly submitted
                  </p>
                </div>

                <div className="bg-white p-4 rounded-[8px] border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Manufacturer Applications
                  </span>
                  <div className="text-2xl font-black text-[#0B2545]">{manufacturers.length}</div>
                  <p className="text-[11px] text-slate-500">
                    {manufacturers.filter((m) => m.status === 'new').length} pending review
                  </p>
                </div>

                <div className="bg-white p-4 rounded-[8px] border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Messages
                  </span>
                  <div className="text-2xl font-black text-[#0B2545]">{contacts.length}</div>
                  <p className="text-[11px] text-slate-500">
                    {contacts.filter((c) => c.status === 'new').length} require response
                  </p>
                </div>

                <div className="bg-white p-4 rounded-[8px] border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Admin Status
                  </span>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Full Access Granted</span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    Logged in as admin
                  </p>
                </div>
              </div>

              {/* Navigation Tabs & Search Controls */}
              <div className="bg-white p-4 rounded-[8px] border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-[8px] overflow-x-auto text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                        activeTab === 'all'
                          ? 'bg-white text-slate-900 shadow-xs font-bold text-[#b91c1c]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All Form Fills ({buyers.length + manufacturers.length + contacts.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('buyers')}
                      className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                        activeTab === 'buyers'
                          ? 'bg-white text-slate-900 shadow-xs font-bold text-[#b91c1c]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Buyer Briefs ({buyers.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('manufacturers')}
                      className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                        activeTab === 'manufacturers'
                          ? 'bg-white text-slate-900 shadow-xs font-bold text-[#b91c1c]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Manufacturers ({manufacturers.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('contacts')}
                      className={`px-3 py-1.5 rounded-[6px] transition-colors ${
                        activeTab === 'contacts'
                          ? 'bg-white text-slate-900 shadow-xs font-bold text-[#b91c1c]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Contact Desk ({contacts.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('config')}
                      className={`px-3 py-1.5 rounded-[6px] transition-colors flex items-center gap-1 ${
                        activeTab === 'config'
                          ? 'bg-white text-slate-900 shadow-xs font-bold text-[#b91c1c]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Settings className="w-3.5 h-3.5" />
                      <span>Alert Config</span>
                    </button>
                  </div>

                  {activeTab !== 'config' && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search form fills..."
                          className="text-xs pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] w-full sm:w-56"
                        />
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-700"
                      >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="under_review">Under Review</option>
                        <option value="supplier_matching">Supplier Matching</option>
                        <option value="quotation_coordination">Quotation Coordination</option>
                        <option value="client_discussion">Buyer Discussion</option>
                        <option value="closed">Closed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Alert Config Tab */}
              {activeTab === 'config' && (
                <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-base font-bold text-[#0B2545] flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#b91c1c]" />
                      <span>Inbound Request Notification Routing</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Confirm notification delivery and data storage synchronization.
                    </p>
                  </div>

                  {notificationSaved && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Admin notification preferences confirmed.</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-2">
                      <span className="font-semibold text-slate-900 block">Admin Email Account:</span>
                      <input
                        type="text"
                        disabled
                        value={ADMIN_EMAIL}
                        className="w-full text-xs px-3 py-2 bg-slate-100 border border-slate-300 rounded font-mono text-slate-800"
                      />
                      <p className="text-[11px] text-slate-500">
                        Configured with administrative authorization in <code className="bg-slate-200 px-1 rounded">src/config/site.ts</code>.
                      </p>
                    </div>

                    <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-2">
                      <span className="font-semibold text-slate-900 block">Form Fills Synchronization:</span>
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Real-time Local Cache + Cloud Persistence Ready</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Total records in database: {buyers.length + manufacturers.length + contacts.length}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationSaved(true);
                        setTimeout(() => setNotificationSaved(false), 3000);
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[6px] transition-colors"
                    >
                      Save Settings
                    </button>
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-[6px] transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Full Backup (CSV)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Form Fills: Buyer Enquiries */}
              {activeTab !== 'config' && (activeTab === 'all' || activeTab === 'buyers') && (
                <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#b91c1c]" />
                      <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                        Buyer Sourcing Form Fills ({filteredBuyers.length})
                      </h2>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      All buyer RFQ submissions arrive here
                    </span>
                  </div>

                  {filteredBuyers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No buyer requests found matching query. Click "Simulate Form Fill" above to test.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-[#F5F7FA] border-b border-slate-200 text-slate-600">
                          <tr>
                            <th className="p-3 font-semibold">Date / Ref</th>
                            <th className="p-3 font-semibold">Buyer & Company</th>
                            <th className="p-3 font-semibold">Product & Category</th>
                            <th className="p-3 font-semibold">Volume / Destination</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold">Admin Owner / Action</th>
                            <th className="p-3 font-semibold text-right">Edit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredBuyers.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3">
                                <span className="font-mono text-slate-900 block font-medium">
                                  {b.id.slice(0, 10)}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {new Date(b.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-semibold text-slate-900 block">
                                  {b.company_name}
                                </span>
                                <span className="text-slate-600 block">{b.full_name} ({b.country})</span>
                                <a
                                  href={`mailto:${b.business_email}`}
                                  className="text-[11px] text-[#b91c1c] hover:underline"
                                >
                                  {b.business_email}
                                </a>
                              </td>
                              <td className="p-3">
                                <span className="font-medium text-slate-900 block">
                                  {b.product_name}
                                </span>
                                <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                                  {b.product_category}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="block text-slate-800">{b.est_quantity}</span>
                                <span className="text-[11px] text-slate-500">{b.destination_country}</span>
                              </td>
                              <td className="p-3">
                                {getStatusBadge(b.status)}
                              </td>
                              <td className="p-3 max-w-xs">
                                <span className="text-[11px] text-slate-600 block">
                                  Owner: <strong className="text-slate-800">{b.owner || 'Unassigned'}</strong>
                                </span>
                                {b.next_action && (
                                  <span className="text-[11px] text-slate-500 block truncate">
                                    Action: {b.next_action}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal('buyer', b)}
                                    className="px-2.5 py-1 text-xs font-bold text-[#b91c1c] hover:text-white hover:bg-[#b91c1c] border border-[#b91c1c] rounded-[6px] transition-colors"
                                  >
                                    Edit & Action
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete('buyer', b.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                    title="Delete Submission"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Form Fills: Manufacturer Applications */}
              {activeTab !== 'config' && (activeTab === 'all' || activeTab === 'manufacturers') && (
                <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#0B2545]" />
                      <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                        Manufacturer Form Fills ({filteredMfrs.length})
                      </h2>
                    </div>
                  </div>

                  {filteredMfrs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No manufacturer registrations found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-[#F5F7FA] border-b border-slate-200 text-slate-600">
                          <tr>
                            <th className="p-3 font-semibold">Date / Ref</th>
                            <th className="p-3 font-semibold">Factory / Business</th>
                            <th className="p-3 font-semibold">Location Cluster</th>
                            <th className="p-3 font-semibold">Categories</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold">Owner / Next Action</th>
                            <th className="p-3 font-semibold text-right">Edit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredMfrs.map((m) => (
                            <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3">
                                <span className="font-mono text-slate-900 block font-medium">
                                  {m.id.slice(0, 10)}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {new Date(m.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-semibold text-slate-900 block">
                                  {m.business_name}
                                </span>
                                <span className="text-slate-600 block">{m.contact_name} ({m.contact_role})</span>
                                <a
                                  href={`mailto:${m.business_email}`}
                                  className="text-[11px] text-[#b91c1c] hover:underline"
                                >
                                  {m.business_email}
                                </a>
                              </td>
                              <td className="p-3">
                                <span className="font-medium text-slate-900 block">
                                  {m.factory_location}
                                </span>
                                <span className="text-[11px] text-slate-500">{m.phone}</span>
                              </td>
                              <td className="p-3">
                                <span className="text-[11px] text-slate-700 block truncate max-w-xs">
                                  {m.product_categories.join(', ')}
                                </span>
                              </td>
                              <td className="p-3">
                                {getStatusBadge(m.status)}
                              </td>
                              <td className="p-3 max-w-xs">
                                <span className="text-[11px] text-slate-600 block">
                                  Owner: <strong className="text-slate-800">{m.owner || 'Unassigned'}</strong>
                                </span>
                                {m.next_action && (
                                  <span className="text-[11px] text-slate-500 block truncate">
                                    Action: {m.next_action}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal('manufacturer', m)}
                                    className="px-2.5 py-1 text-xs font-bold text-[#b91c1c] hover:text-white hover:bg-[#b91c1c] border border-[#b91c1c] rounded-[6px] transition-colors"
                                  >
                                    Edit & Action
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete('manufacturer', m.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                    title="Delete Submission"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Form Fills: Contact Messages */}
              {activeTab !== 'config' && (activeTab === 'all' || activeTab === 'contacts') && (
                <div className="bg-white rounded-[8px] border border-slate-200 overflow-hidden shadow-xs">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#b91c1c]" />
                      <h2 className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">
                        Contact Desk Messages ({filteredContacts.length})
                      </h2>
                    </div>
                  </div>

                  {filteredContacts.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No contact messages found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-[#F5F7FA] border-b border-slate-200 text-slate-600">
                          <tr>
                            <th className="p-3 font-semibold">Date / Ref</th>
                            <th className="p-3 font-semibold">Sender & Company</th>
                            <th className="p-3 font-semibold">Enquiry Type</th>
                            <th className="p-3 font-semibold">Message Preview</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold text-right">Edit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredContacts.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3">
                                <span className="font-mono text-slate-900 block font-medium">
                                  {c.id.slice(0, 10)}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {new Date(c.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="font-semibold text-slate-900 block">{c.name}</span>
                                {c.company && <span className="text-slate-500 block">{c.company}</span>}
                                <a
                                  href={`mailto:${c.business_email}`}
                                  className="text-[11px] text-[#b91c1c] hover:underline"
                                >
                                  {c.business_email}
                                </a>
                              </td>
                              <td className="p-3">
                                <span className="text-xs font-medium text-slate-800">{c.enquiry_type}</span>
                              </td>
                              <td className="p-3 max-w-sm">
                                <p className="text-xs text-slate-600 line-clamp-2">{c.message}</p>
                              </td>
                              <td className="p-3">
                                {getStatusBadge(c.status)}
                              </td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal('contact', c)}
                                    className="px-2.5 py-1 text-xs font-bold text-[#b91c1c] hover:text-white hover:bg-[#b91c1c] border border-[#b91c1c] rounded-[6px] transition-colors"
                                  >
                                    Edit & Action
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete('contact', c.id)}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Submission Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[10px] border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#b91c1c]">
                  Admin Edit & Status Update
                </span>
                <h3 className="text-lg font-bold text-[#0B2545]">
                  Manage Form Fill: {editingItem.item.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read-Only Submission Summary */}
            <div className="p-4 bg-slate-50 rounded-[8px] border border-slate-200 text-xs space-y-2">
              {editingItem.type === 'buyer' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block">Buyer / Company:</span>
                      <strong className="text-slate-900">
                        {(editingItem.item as BuyerEnquiryRecord).full_name} — {(editingItem.item as BuyerEnquiryRecord).company_name}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email / Country:</span>
                      <span className="text-slate-800">
                        {(editingItem.item as BuyerEnquiryRecord).business_email} ({(editingItem.item as BuyerEnquiryRecord).country})
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Product & Quantity:</span>
                    <span className="text-slate-900 font-medium">
                      {(editingItem.item as BuyerEnquiryRecord).product_name} ({(editingItem.item as BuyerEnquiryRecord).est_quantity})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Technical Specifications:</span>
                    <p className="text-slate-700 bg-white p-2 rounded border border-slate-200 mt-1">
                      {(editingItem.item as BuyerEnquiryRecord).specifications}
                    </p>
                  </div>
                </>
              )}

              {editingItem.type === 'manufacturer' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block">Business / Factory:</span>
                      <strong className="text-slate-900">
                        {(editingItem.item as ManufacturerApplicationRecord).business_name}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Location:</span>
                      <span className="text-slate-800">
                        {(editingItem.item as ManufacturerApplicationRecord).factory_location}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Product Categories:</span>
                    <span className="text-slate-800 font-medium">
                      {(editingItem.item as ManufacturerApplicationRecord).product_categories.join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Facility Capabilities:</span>
                    <p className="text-slate-700 bg-white p-2 rounded border border-slate-200 mt-1">
                      {(editingItem.item as ManufacturerApplicationRecord).capability_summary}
                    </p>
                  </div>
                </>
              )}

              {editingItem.type === 'contact' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 block">Sender:</span>
                      <strong className="text-slate-900">
                        {(editingItem.item as ContactMessageRecord).name}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email:</span>
                      <span className="text-slate-800">
                        {(editingItem.item as ContactMessageRecord).business_email}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Message Content:</span>
                    <p className="text-slate-700 bg-white p-2 rounded border border-slate-200 mt-1">
                      {(editingItem.item as ContactMessageRecord).message}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Editable Fields by Admin */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
                Administrator Actions & Coordination Status
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Request Pipeline Status *
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as RequestStatus)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-800 font-semibold"
                  >
                    <option value="new">New (Unreviewed)</option>
                    <option value="under_review">Under Review (Spec Verification)</option>
                    <option value="supplier_matching">Supplier Matching (In Cluster)</option>
                    <option value="quotation_coordination">Quotation Coordination</option>
                    <option value="client_discussion">Buyer Discussion</option>
                    <option value="closed">Closed (Completed)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned Admin Owner
                  </label>
                  <input
                    type="text"
                    value={editOwner}
                    onChange={(e) => setEditOwner(e.target.value)}
                    placeholder="e.g. Benadict Francis"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Next Action Item
                  </label>
                  <input
                    type="text"
                    value={editNextAction}
                    onChange={(e) => setEditNextAction(e.target.value)}
                    placeholder="e.g. Dispatch RFQ brief to Tirupur knitwear cluster"
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={editFollowUpDate}
                    onChange={(e) => setEditFollowUpDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internal Notes & Supplier Coordination History
                </label>
                <textarea
                  rows={3}
                  value={editInternalNotes}
                  onChange={(e) => setEditInternalNotes(e.target.value)}
                  placeholder="Record supplier responses, quotations received, or buyer clarifications..."
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#b91c1c] text-slate-800"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-[6px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-[6px] transition-colors shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Update Request</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
