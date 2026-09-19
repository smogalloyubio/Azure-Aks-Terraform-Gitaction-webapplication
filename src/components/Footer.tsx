import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/mockData';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Heart,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsAdminView, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Thank you for subscribing to our culinary journal & exclusive tasting invitations!', 'success');
    setEmailInput('');
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-stone-100">
                Table &amp; Taste
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              {RESTAURANT_INFO.tagline}. Handcrafted wood-fired cuisine, biodynamic produce, and warm hospitality in the heart of West End.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-500 font-medium">
              <Award className="w-4 h-4" />
              <span>{RESTAURANT_INFO.stats.awards}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-stone-100 mb-4 tracking-wide uppercase text-xs">
              Explore &amp; Experience
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('menu')} className="text-stone-400 hover:text-amber-400 transition-colors">
                  Artisanal Seasonal Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reservations')} className="text-stone-400 hover:text-amber-400 transition-colors">
                  Reserve a Dining Table
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('restaurant-info')} className="text-stone-400 hover:text-amber-400 transition-colors">
                  Our Culinary Story &amp; Hearth
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="text-stone-400 hover:text-amber-400 transition-colors">
                  Private Dining &amp; Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('customer-dashboard')} className="text-stone-400 hover:text-amber-400 transition-colors">
                  Guest Dining Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setIsAdminView(true);
                    navigateTo('admin-dashboard');
                  }} 
                  className="text-amber-500 hover:text-amber-400 transition-colors font-medium flex items-center gap-1 text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Staff &amp; Kitchen Management
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-base font-semibold text-stone-100 mb-4 tracking-wide uppercase text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Hours of Service
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              {RESTAURANT_INFO.hours.map((h, i) => (
                <div key={i} className="border-b border-stone-900 pb-2">
                  <div className="font-semibold text-stone-200">{h.days}</div>
                  <div className="flex justify-between mt-0.5 text-stone-400">
                    <span>Lunch: {h.lunch}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Dinner: {h.dinner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-stone-100 mb-2 tracking-wide uppercase text-xs">
              Culinary Dispatch
            </h4>
            <p className="text-xs text-stone-400 mb-3">
              Receive seasonal chef tasting menus, sommelier cellar releases, and special invitations.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 flex-1"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Table &amp; Taste Restaurant Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Executive Chef Julian Montgomery</span>
            <span>•</span>
            <span>Reservations &amp; Carryout Available</span>
            <span>•</span>
            <span className="text-amber-500/80">Crafted for Fine Palates</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
