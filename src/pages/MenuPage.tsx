import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_CATEGORIES } from '../data/mockData';
import { FoodCard } from '../components/FoodCard';
import { ProductCategory } from '../types';
import { 
  Search, 
  Leaf, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  UtensilsCrossed 
} from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { 
    foodItems, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [specialsOnly, setSpecialsOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) return false;
      }
      // Dietary flags
      if (vegetarianOnly && !item.isVegetarian) return false;
      if (spicyOnly && !item.isSpicy) return false;
      if (specialsOnly && !item.isSpecial) return false;
      if (inStockOnly && !item.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [foodItems, selectedCategory, searchQuery, vegetarianOnly, spicyOnly, specialsOnly, inStockOnly, sortBy]);

  const activeFiltersCount = (vegetarianOnly ? 1 : 0) + (spicyOnly ? 1 : 0) + (specialsOnly ? 1 : 0) + (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setVegetarianOnly(false);
    setSpicyOnly(false);
    setSpecialsOnly(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block">
          Seasonal Gastronomy
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100">
          The Artisanal Menu
        </h1>
        <p className="text-sm text-stone-400">
          Freshly prepared over white oak embers using local biodynamic produce, heritage meats, and heirloom grains.
        </p>
      </div>

      {/* Category Tabs Bar */}
      <div className="border-b border-stone-800 pb-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
            }`}
          >
            All Selections ({foodItems.length})
          </button>

          {MENU_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            const count = foodItems.filter(f => f.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-stone-950/20 text-stone-950 font-extrabold' : 'bg-stone-800 text-stone-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search, Filter Toggles & Sort Row */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, ingredients, truffles, pasta, wagyu..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-9 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-stone-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured Chef’s Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
            </select>
          </div>

        </div>

        {/* Filter Badges & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-800/80 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 text-xs flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
              Dietary:
            </span>

            <button
              onClick={() => setVegetarianOnly(!vegetarianOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                vegetarianOnly
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              Vegetarian Only
            </button>

            <button
              onClick={() => setSpicyOnly(!spicyOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                spicyOnly
                  ? 'bg-rose-950/80 border-rose-500 text-rose-400'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Spicy
            </button>

            <button
              onClick={() => setSpecialsOnly(!specialsOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                specialsOnly
                  ? 'bg-amber-950/80 border-amber-500 text-amber-400'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Hearth Specials
            </button>

            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                inStockOnly
                  ? 'bg-stone-800 border-amber-500 text-amber-400'
                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              Available Now
            </button>
          </div>

          {(activeFiltersCount > 0 || searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={resetFilters}
              className="text-amber-500 hover:text-amber-400 text-xs font-semibold underline underline-offset-4"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-stone-400 px-1">
        <span>
          Showing <strong className="text-stone-200">{filteredItems.length}</strong> culinary dishes
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(dish => (
            <FoodCard key={dish.id} item={dish} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-100">
            No dishes match your criteria
          </h3>
          <p className="text-xs text-stone-400">
            Try adjusting your search keywords, clearing dietary filters, or exploring another category.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
