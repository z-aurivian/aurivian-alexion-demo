import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BarChart3, MessageSquare, Users, ChevronDown } from 'lucide-react';
import MedicalInsights from './MedicalInsights';
import AuriChat from './AuriChat';
import KOLManagement from './KOLManagement';
import { PRODUCT_OPTIONS } from './data/demoData';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState('soliris');
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const currentProduct = PRODUCT_OPTIONS.find(p => p.id === selectedProduct);

  const navItems = [
    { path: '/', label: 'Survey & Analytics', icon: BarChart3 },
    { path: '/auri', label: 'Auri Intelligence', icon: MessageSquare },
    { path: '/kol', label: 'KOL Management', icon: Users },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-auri-black text-auri-white">
        {/* Header */}
        <header className="bg-auri-dark border-b border-auri-gray/20 px-6 py-3">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* Logo + Nav */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-auri-blue rounded-lg flex items-center justify-center">
                  <span className="font-michroma text-white text-sm font-bold">A</span>
                </div>
                <span className="font-michroma text-auri-white text-lg tracking-wider">AURIVIAN</span>
              </div>

              <nav className="flex items-center gap-1">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-auri-blue/15 text-auri-blue'
                          : 'text-auri-gray hover:text-auri-white hover:bg-auri-black/30'
                      }`
                    }
                  >
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Product Selector */}
            <div className="relative">
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-auri-black/50 border border-auri-gray/30 rounded-lg hover:border-auri-blue/50 transition-all"
              >
                <div className="text-left">
                  <div className="text-sm font-semibold text-auri-white">{currentProduct?.name}</div>
                  <div className="text-xs text-auri-gray">{currentProduct?.generic}</div>
                </div>
                <ChevronDown size={16} className={`text-auri-gray transition-transform ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {productDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-auri-dark border border-auri-gray/30 rounded-lg shadow-xl z-50 overflow-hidden">
                  {PRODUCT_OPTIONS.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product.id);
                        setProductDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-auri-black/30 transition-all ${
                        selectedProduct === product.id ? 'bg-auri-blue/10 border-l-2 border-auri-blue' : ''
                      }`}
                    >
                      <div className="font-semibold text-sm text-auri-white">{product.name}</div>
                      <div className="text-xs text-auri-gray">{product.generic} — {product.indications.join(', ')}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1600px] mx-auto p-6">
          <Routes>
            <Route path="/" element={<MedicalInsights selectedProduct={selectedProduct} />} />
            <Route path="/auri" element={<AuriChat selectedProduct={selectedProduct} />} />
            <Route path="/kol" element={<KOLManagement selectedProduct={selectedProduct} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
