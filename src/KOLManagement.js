import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, MapPin, BookOpen, Calendar, Star, Users, Globe } from 'lucide-react';
import { KOL_DATA, PRODUCT_OPTIONS } from './data/demoData';

function KOLManagement({ selectedProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [expandedKOL, setExpandedKOL] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const productName = PRODUCT_OPTIONS.find(p => p.id === selectedProduct)?.name;

  const filteredKOLs = useMemo(() => {
    return KOL_DATA.filter(kol => {
      const matchesSearch = !searchTerm ||
        kol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kol.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kol.focusAreas.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || kol.specialty === selectedSpecialty;
      const matchesTier = selectedTier === 'all' || kol.engagementTier === selectedTier;
      const matchesRegion = selectedRegion === 'all' || kol.region === selectedRegion;
      const matchesProduct = kol.productAlignment.includes(selectedProduct);
      return matchesSearch && matchesSpecialty && matchesTier && matchesRegion && matchesProduct;
    });
  }, [searchTerm, selectedSpecialty, selectedTier, selectedRegion, selectedProduct]);

  const specialties = useMemo(() => [...new Set(KOL_DATA.map(k => k.specialty))], []);
  const regions = useMemo(() => [...new Set(KOL_DATA.map(k => k.region))], []);

  const stats = useMemo(() => {
    const aligned = KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct));
    return {
      total: aligned.length,
      tier1: aligned.filter(k => k.engagementTier === 'Tier 1').length,
      tier2: aligned.filter(k => k.engagementTier === 'Tier 2').length,
      tier3: aligned.filter(k => k.engagementTier === 'Tier 3').length,
      regionCounts: regions.reduce((acc, r) => {
        acc[r] = aligned.filter(k => k.region === r).length;
        return acc;
      }, {}),
    };
  }, [selectedProduct, regions]);

  const tierColor = (tier) => {
    switch (tier) {
      case 'Tier 1': return 'bg-auri-blue/20 text-auri-blue';
      case 'Tier 2': return 'bg-emerald-500/20 text-emerald-400';
      case 'Tier 3': return 'bg-auri-gray/20 text-auri-gray';
      default: return 'bg-auri-gray/20 text-auri-gray';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20">
          <div className="text-2xl font-bold text-auri-blue">{stats.total}</div>
          <div className="text-xs text-auri-gray mt-1">KOLs Tracked ({productName})</div>
        </div>
        <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20">
          <div className="text-2xl font-bold text-auri-blue">{stats.tier1}</div>
          <div className="text-xs text-auri-gray mt-1">Tier 1 (Strategic)</div>
        </div>
        <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20">
          <div className="text-2xl font-bold text-emerald-400">{stats.tier2}</div>
          <div className="text-xs text-auri-gray mt-1">Tier 2 (Engaged)</div>
        </div>
        <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20">
          <div className="text-2xl font-bold text-auri-gray">{stats.tier3}</div>
          <div className="text-xs text-auri-gray mt-1">Tier 3 (Monitor)</div>
        </div>
        <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20">
          <div className="text-2xl font-bold text-auri-white">{Object.keys(stats.regionCounts).length}</div>
          <div className="text-xs text-auri-gray mt-1">Regions</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-auri-dark rounded-lg p-4 border border-auri-gray/20 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-auri-gray" />
            <input
              type="text"
              placeholder="Search KOLs by name, institution, or focus area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-auri-black border border-auri-gray/30 rounded-lg text-sm text-auri-white placeholder:text-auri-gray/60 focus:outline-none focus:border-auri-blue/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${showFilters ? 'bg-auri-blue/15 border-auri-blue/50 text-auri-blue' : 'border-auri-gray/30 text-auri-gray hover:text-auri-white'}`}
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 pt-2 border-t border-auri-gray/20">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 bg-auri-black border border-auri-gray/30 rounded-lg text-sm text-auri-white focus:outline-none focus:border-auri-blue/50"
            >
              <option value="all">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-2 bg-auri-black border border-auri-gray/30 rounded-lg text-sm text-auri-white focus:outline-none focus:border-auri-blue/50"
            >
              <option value="all">All Tiers</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 bg-auri-black border border-auri-gray/30 rounded-lg text-sm text-auri-white focus:outline-none focus:border-auri-blue/50"
            >
              <option value="all">All Regions</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* KOL Table */}
      <div className="bg-auri-dark rounded-lg border border-auri-gray/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-auri-black/50 text-auri-gray text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Institution</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Specialty</th>
                <th className="px-4 py-3 font-medium text-center">Influence</th>
                <th className="px-4 py-3 font-medium text-center">Tier</th>
                <th className="px-4 py-3 font-medium text-center">Interactions</th>
                <th className="px-4 py-3 font-medium text-center">Publications</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredKOLs.map(kol => (
                <React.Fragment key={kol.id}>
                  <tr
                    className={`border-t border-auri-gray/10 hover:bg-auri-black/20 cursor-pointer transition ${expandedKOL === kol.id ? 'bg-auri-black/20' : ''}`}
                    onClick={() => setExpandedKOL(expandedKOL === kol.id ? null : kol.id)}
                  >
                    <td className="px-4 py-3 font-medium text-auri-white">{kol.name}</td>
                    <td className="px-4 py-3 text-auri-gray">{kol.institution}</td>
                    <td className="px-4 py-3 text-auri-gray">{kol.country}</td>
                    <td className="px-4 py-3 text-auri-gray">{kol.specialty}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={12} className="text-amber-400" />
                        <span className="text-auri-white">{kol.influenceScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${tierColor(kol.engagementTier)}`}>
                        {kol.engagementTier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-auri-white">{kol.recentInteractions}</td>
                    <td className="px-4 py-3 text-center text-auri-white">{kol.publications}</td>
                    <td className="px-4 py-3 text-center">
                      {expandedKOL === kol.id ? <ChevronUp size={16} className="text-auri-gray" /> : <ChevronDown size={16} className="text-auri-gray" />}
                    </td>
                  </tr>

                  {expandedKOL === kol.id && (
                    <tr>
                      <td colSpan={9} className="px-4 py-4 bg-auri-black/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider">Profile</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-auri-gray">
                                <MapPin size={14} /> {kol.city}, {kol.country}
                              </div>
                              <div className="flex items-center gap-2 text-auri-gray">
                                <Globe size={14} /> {kol.region}
                              </div>
                              <div className="flex items-center gap-2 text-auri-gray">
                                <Calendar size={14} /> {kol.conferenceAppearances} conference appearances
                              </div>
                              <div className="flex items-center gap-2 text-auri-gray">
                                <Users size={14} /> Products: {kol.productAlignment.map(p => PRODUCT_OPTIONS.find(o => o.id === p)?.name).join(', ')}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider">Focus Areas</h4>
                            <div className="flex flex-wrap gap-2">
                              {kol.focusAreas.map((area, i) => (
                                <span key={i} className="px-2 py-1 bg-auri-blue/10 text-auri-blue rounded text-xs">{area}</span>
                              ))}
                            </div>
                            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider mt-4">Publications</h4>
                            <div className="flex items-center gap-2 text-sm text-auri-gray">
                              <BookOpen size={14} /> {kol.publications} peer-reviewed publications
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-auri-blue uppercase tracking-wider">Engagement Strategy</h4>
                            <p className="text-sm text-auri-gray leading-relaxed">{kol.recommendedStrategy}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {filteredKOLs.length === 0 && (
          <div className="text-center py-12 text-auri-gray">
            <Users size={32} className="mx-auto mb-3 opacity-50" />
            <p>No KOLs match your filters</p>
          </div>
        )}
      </div>

      <div className="text-xs text-auri-gray/60 text-right">
        Showing {filteredKOLs.length} of {KOL_DATA.filter(k => k.productAlignment.includes(selectedProduct)).length} KOLs aligned with {productName}
      </div>
    </div>
  );
}

export default KOLManagement;
