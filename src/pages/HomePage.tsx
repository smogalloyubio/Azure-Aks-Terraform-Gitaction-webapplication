import React from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, MENU_CATEGORIES, INITIAL_REVIEWS } from '../data/mockData';
import { FoodCard } from '../components/FoodCard';
import { 
  CalendarDays, 
  UtensilsCrossed, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Flame, 
  Award,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { ProductCategory } from '../types';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, foodItems } = useApp();

  const featuredDishes = foodItems.filter(item => item.isFeatured).slice(0, 4);
  const todaysSpecials = foodItems.filter(item => item.isSpecial).slice(0, 3);

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
        {/* Background Food Photography with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85" 
            alt="Table & Taste Artisanal Kitchen" 
            className="w-full h-full object-cover opacity-35 scale-105 animate-in fade-in zoom-in-95 duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-16 space-y-8">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Artisanal Dining &amp; Open Hearth Kitchen
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-stone-100 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Where Culinary Craft Meets the Warmth of the <span className="text-amber-400 italic">Hearth</span>
          </h1>

          {/* Subtitle */}
          <p className="text-stone-300 text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            Experience 45-day dry-aged cuts, hand-rolled pastas, and farmstead seasonal gastronomy in an intimate, candlelit ambiance.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentPage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-sm uppercase tracking-wider shadow-xl transition-all duration-200 active:scale-95"
            >
              <CalendarDays className="w-5 h-5 text-stone-950" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-stone-900/90 hover:bg-stone-800 text-stone-100 border border-stone-700 hover:border-amber-500/50 font-bold rounded-xl text-sm uppercase tracking-wider shadow-lg transition-all duration-200 active:scale-95"
            >
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              <span>Order Online</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-stone-800/80 text-stone-400 text-xs">
            <div className="flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9 Star Michelin Standard</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>White Oak Wood Hearth</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Wine Spectator 2024</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>14 Local Organic Farms</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-1">
              Explore The Hearth
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Popular Menu Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {MENU_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group p-4 sm:p-5 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-amber-500/80 mt-3 block">
                {cat.count} handcrafted selections
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TODAY'S SPECIALS */}
      <section className="bg-stone-950 py-16 border-y border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Limited Hearth Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-3">
              Today’s Chef Specials
            </h2>
            <p className="text-stone-400 text-sm">
              Hand-picked daily by Chef Julian Montgomery, featuring peak seasonal harvests and rare cuts from our aging room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {todaysSpecials.map(dish => (
              <FoodCard key={dish.id} item={dish} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SIGNATURE DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-1">
              Guest Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
              Featured Signature Dishes
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore All 28 Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map(dish => (
            <FoodCard key={dish.id} item={dish} />
          ))}
        </div>
      </section>

      {/* 5. RESTAURANT PHILOSOPHY & CHEF STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              The Culinary Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
              Rooted in Ancient Embers, Refined for Modern Connoisseurs
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              At Table &amp; Taste, we believe that cooking over open wood embers creates an elemental flavor profile that modern gas stoves can never replicate. 
              Our kitchen operates around a custom Spanish hearth fueled by kiln-dried white oak and almond wood.
            </p>
            <p className="text-stone-400 text-sm leading-relaxed">
              Every heritage ribeye rests in our Himalayan salt dry-aging room for up to 45 days. Every pasta is hand-rolled each morning with fresh golden yolks. We partner directly with 14 coastal California biodynamic growers.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <img 
                src={RESTAURANT_INFO.chef.image} 
                alt={RESTAURANT_INFO.chef.name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/60 shadow"
              />
              <div>
                <h3 className="font-serif text-base font-bold text-stone-100">{RESTAURANT_INFO.chef.name}</h3>
                <p className="text-xs text-amber-400">{RESTAURANT_INFO.chef.title}</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage('restaurant-info');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 border-b border-amber-500/40 pb-1 transition-colors"
              >
                <span>Read Our Full Story &amp; Origin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[350px] lg:min-h-full">
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80" 
              alt="Table & Taste Dining Room Ambiance" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent lg:hidden" />
          </div>

        </div>
      </section>

      {/* 6. OPENING HOURS & AMBIANCE */}
      <section className="bg-stone-950 py-16 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Hours card */}
            <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">Service Hours</h3>
                <p className="text-xs text-stone-400 mb-6">Reservations recommended for dinner and weekend brunch.</p>

                <div className="space-y-4 text-xs">
                  {RESTAURANT_INFO.hours.map((h, idx) => (
                    <div key={idx} className="border-b border-stone-800 pb-3">
                      <div className="font-bold text-stone-200">{h.days}</div>
                      <div className="text-stone-400 mt-1 flex justify-between">
                        <span>Lunch:</span>
                        <span>{h.lunch}</span>
                      </div>
                      <div className="text-stone-400 flex justify-between">
                        <span>Dinner:</span>
                        <span>{h.dinner}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('reservations');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Check Available Slots
              </button>
            </div>

            {/* Atmosphere & Seating */}
            <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">Distinct Spaces</h3>
              <p className="text-xs text-stone-400 mb-6">Four uniquely curated dining experiences under one roof.</p>

              <div className="space-y-3.5 text-xs text-stone-300">
                <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                  <span className="font-bold text-amber-400 block mb-0.5">The Main Dining Hall</span>
                  <p className="text-stone-400">Vaulted reclaimed wood ceilings, ambient chandeliers, and hearth view.</p>
                </div>
                <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                  <span className="font-bold text-amber-400 block mb-0.5">Garden Terrace &amp; Patio</span>
                  <p className="text-stone-400">Heated year-round al fresco dining beneath century-old olive trees.</p>
                </div>
                <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                  <span className="font-bold text-amber-400 block mb-0.5">Chef’s Interactive Counter</span>
                  <p className="text-stone-400">Front-row seats to the wood fire grill with bespoke omakase options.</p>
                </div>
              </div>
            </div>

            {/* Private Dining & Events */}
            <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">Private Dining</h3>
                <p className="text-xs text-stone-400 mb-6">
                  Host memorable milestone dinners, corporate galas, and bespoke wine tastings in our Velvet Room.
                </p>

                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Seating for up to 32 guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Dedicated sommelier &amp; custom menus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Integrated AV &amp; private patio access</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-6 w-full py-3 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Inquire for Private Events
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-2">
            Verified Diners
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mb-3">
            What Our Guests Are Saying
          </h2>
          <div className="flex items-center justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs text-stone-400 font-semibold ml-2">
              4.9 / 5.0 across 1,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map(rev => (
            <div 
              key={rev.id} 
              className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center gap-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.author} 
                  className="w-9 h-9 rounded-full object-cover border border-amber-500/30"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-100 truncate">{rev.author}</div>
                  <div className="text-[11px] text-amber-500 truncate">Loved: {rev.favoriteDish}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LOCATION & DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">
          
          <div className="p-8 sm:p-10 space-y-6 lg:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-2">
                Visit Table &amp; Taste
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-100 mb-4">
                Location &amp; Arrival
              </h3>
              
              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-100">Restaurant Address:</strong>
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-100">Concierge Desk:</strong>
                    <span>{RESTAURANT_INFO.phone}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                  <span className="font-bold text-amber-400 block">Complimentary Valet</span>
                  <p className="text-stone-400">
                    Valet attendants are stationed at the main entrance portico every evening starting at 4:30 PM.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentPage('reservations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Book Your Table Now
            </button>
          </div>

          {/* Interactive Map Visualizer */}
          <div className="relative min-h-[300px] lg:col-span-2 bg-stone-950 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1400&q=80" 
              alt="Map location representation" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-stone-950/40" />

            {/* Map Pin Overlay Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl bg-stone-900/95 border border-amber-500/40 shadow-2xl backdrop-blur-md text-center max-w-xs w-full">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center mx-auto mb-2 font-bold shadow-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-100">Table &amp; Taste</h4>
              <p className="text-xs text-stone-300 mt-1">428 Heritage Boulevard</p>
              <p className="text-[11px] text-amber-400 font-semibold mt-0.5">West End Cultural Arts District</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
