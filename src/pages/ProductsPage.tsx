import React, { useState, useMemo } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { PRODUCT_CATEGORIES, CategoryGroup } from '../data/categories';
import { Seo } from '../components/common/Seo';
import { CategoryIllustration } from '../components/illustrations/CategoryIllustration';
import { LocalizedLink } from '../components/common/LocalizedLink';
import { useTranslation } from 'react-i18next';

const GROUPS: { label: string; value: CategoryGroup | 'All' }[] = [
  { label: 'All Categories', value: 'All' },
  { label: 'Textiles & Leather', value: 'Textiles & Leather' },
  { label: 'Engineering & Industrial', value: 'Engineering & Industrial' },
  { label: 'Home & Lifestyle', value: 'Home & Lifestyle' },
  { label: 'Agri & Food', value: 'Agri & Food' },
  { label: 'Natural Materials & Stone', value: 'Natural Materials & Stone' }
];

export const ProductsPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroup | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation('products');

  const filteredCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.filter((cat) => {
      const matchesGroup = selectedGroup === 'All' || cat.group === selectedGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.short.toLowerCase().includes(q) ||
        cat.productTypes.some((pt) => pt.toLowerCase().includes(q)) ||
        cat.clusters.some((c) => c.toLowerCase().includes(q));

      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <>
      <Seo
        title="Product Categories | Sourcing from Tamil Nadu"
        description="Explore the 12 primary manufacturing categories we help international buyers source across Tamil Nadu clusters."
        path="/products"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Sourcing Portfolio
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Product Categories
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Tamil Nadu is a multi-category manufacturing region. Below are the 12 categories we help source, subject to supplier availability and specification confirmation for each requirement.
          </p>
        </div>
      </div>

      <div className="py-10 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
          
          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories, products, or clusters..."
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-[8px] focus:outline-none focus:border-[#0E9F9A] text-slate-900 shadow-2xs"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {GROUPS.map((group) => {
                const isActive = selectedGroup === group.value;
                return (
                  <button
                    key={group.value}
                    type="button"
                    onClick={() => setSelectedGroup(group.value)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-colors ${
                      isActive
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.slug}
                  className="bg-white border border-slate-200 rounded-[8px] overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
                >
                  <div>
                    {/* Visual Scene */}
                    <div className="w-full bg-[#F5F7FA] border-b border-slate-100">
                      <CategoryIllustration slug={cat.slug} variant="card" />
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0E9F9A] bg-[#EBF7F7] px-2 py-0.5 rounded">
                          {cat.group}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-[#0B2545] leading-snug">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {cat.short}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                          Product types include:
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {cat.productTypes.slice(0, 3).map((pt, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F9A] shrink-0"></span>
                              <span className="truncate">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          Sourcing clusters: {cat.clusters.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                    <LocalizedLink
                      to={`/products/${cat.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-[#0E9F9A] hover:text-[#0B8884] transition-colors"
                    >
                      View details
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </LocalizedLink>

                    <LocalizedLink
                      to={`/buyers?category=${cat.slug}#enquiry`}
                      className="text-xs text-slate-600 hover:text-[#0B2545] font-medium"
                    >
                      Enquire
                    </LocalizedLink>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-[8px] p-8 text-center space-y-4">
              <p className="text-sm text-slate-600">
                No categories matched your search criteria.
              </p>
              <LocalizedLink
                to="/buyers#enquiry"
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors"
              >
                Submit Custom Sourcing Enquiry
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </LocalizedLink>
            </div>
          )}

          {/* Footnote */}
          <div className="p-4 bg-white rounded-[8px] border border-slate-200 text-xs text-slate-500 leading-relaxed">
            Regions listed are areas we actively research, not a claim that every supplier in a location can meet every requirement. All quotes and manufacturing capacities are subject to supplier confirmation.
          </div>
        </div>
      </div>
    </>
  );
};

