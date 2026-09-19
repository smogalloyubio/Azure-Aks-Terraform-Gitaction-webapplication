import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Award, 
  Wheat, 
  Wine, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/mockData';

export const RestaurantInfoPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-8 sm:p-14 text-center border border-stone-800">
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80" 
              alt="Table and Taste Interior" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.32]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 inline-block">
                Our Heritage &amp; Philosophy
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-stone-100 tracking-tight leading-tight">
                Rooted in Fire, Guided by the Seasons
              </h1>
              <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed">
                Founded in 2018 in the heart of West End, Table &amp; Taste is an ode to wood-fired hearth cooking, biodynamic California agriculture, and genuine old-world hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story & The Hearth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
              The Wood Hearth Tradition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 leading-snug">
              Every dish touches flame, oak smoke, or seasoned cast iron.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              At Table &amp; Taste, our open kitchen is anchored by a hand-built white oak hearth burning at 700°F. We shun unnecessary culinary theatrics in favor of raw primal temperature control, searing dry-aged meats to mahogany crusts and blistering garden vegetables while preserving their natural nectar.
            </p>
            <p className="text-sm text-stone-400 leading-relaxed">
              Our culinary team mills heirloom California grains on-site daily for our naturally leavened sourdough and rolls pasta by hand each morning using organic egg yolks from pasture-raised hens in the Santa Ynez Valley.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800">
              <div>
                <div className="font-serif text-2xl font-bold text-amber-400">100%</div>
                <div className="text-[11px] text-stone-400">California Farm Sourced</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-400">700°F</div>
                <div className="text-[11px] text-stone-400">White Oak Hearth</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-400">350+</div>
                <div className="text-[11px] text-stone-400">Reserve Cellar Bottles</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80" 
                alt="Chef preparing food on the hearth" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-2xl hidden sm:block max-w-xs">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Chef Julian Vance</span>
              </div>
              <p className="text-xs text-stone-300">
                "Simplicity is the highest culinary discipline. When your produce is harvested at dawn, you only need fire and salt."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Provenance & Pillars */}
      <section className="bg-stone-900/60 border-y border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
              Ethical Sourcing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Our Three Gastronomic Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Wheat className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100">Farm-to-Table Integrity</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We partner with 14 small family farms across Ojai, Santa Barbara, and Salinas Valley. Produce travels less than 120 miles from soil to your table, never cold-stored or frozen.
              </p>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100">Zero Shortcut Butchery</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Our beef is 100% pasture-raised, grass-fed, and corn-finished on non-GMO grains before undergoing a minimum 35-day dry-aging cycle inside our glass-walled Himalayan salt aging room.
              </p>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Wine className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-100">Low-Intervention Cellar</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Our sommelier maintains a dynamic list of organic, biodynamic, and estate-bottled wines from pioneering winemakers in Burgundy, Piedmont, Napa Valley, and Santa Rita Hills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Private Dining & Events Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
              Celebrations &amp; Gatherings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Private Dining &amp; Hearth Buyouts
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Host your next corporate dinner, anniversary, or wedding rehearsal dinner in our secluded Wine Room or on our olive-shaded Garden Terrace. Custom multi-course tasting menus paired with cellar reserves.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => {
                setCurrentPage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg text-center"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-all text-center"
            >
              Event Inquiries
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
