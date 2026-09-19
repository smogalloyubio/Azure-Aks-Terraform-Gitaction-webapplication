import React from 'react';
import { FoodItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Leaf, 
  Flame, 
  Heart, 
  Sparkles, 
  Clock,
  Check
} from 'lucide-react';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { 
    openFoodDetail, 
    addToCart, 
    customerProfile, 
    toggleFavoriteDish,
    cartItems
  } = useApp();

  const isFavorite = customerProfile.favoriteItemIds.includes(item.id);
  const cartItemMatches = cartItems.filter(ci => ci.item.id === item.id);
  const quantityInCart = cartItemMatches.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.options && item.options.length > 0) {
      // If item has customizable options, open modal for seamless choice
      openFoodDetail(item);
    } else {
      addToCart(item, 1);
    }
  };

  return (
    <div 
      onClick={() => openFoodDetail(item)}
      className="group bg-stone-900 border border-stone-800/90 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Favorite Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteDish(item.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-stone-950/60 backdrop-blur-md border border-stone-700/60 text-stone-300 hover:text-white transition-transform hover:scale-110 shadow-md"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
        </button>

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-stone-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full shadow">
            {item.category}
          </span>
          {item.isSpecial && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full shadow flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Special
            </span>
          )}
        </div>

        {/* Dietary & Status Badges */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            {item.isVegetarian && (
              <span className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                <Leaf className="w-2.5 h-2.5" />
                Veg
              </span>
            )}
            {item.isSpicy && (
              <span className="flex items-center gap-1 bg-rose-950/80 border border-rose-700/60 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                <Flame className="w-2.5 h-2.5" />
                Spicy
              </span>
            )}
          </div>
          
          <span className="text-[11px] text-stone-300 font-medium flex items-center gap-1 bg-stone-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <Clock className="w-3 h-3 text-amber-400" />
            {item.prepTimeMinutes}m
          </span>
        </div>

        {/* Out of Stock overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-300 bg-stone-900 border border-stone-700 px-3 py-1.5 rounded-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
              {item.name}
            </h4>
          </div>

          <p className="text-stone-400 text-xs leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
          <div className="font-serif text-lg font-bold text-amber-400">
            ${item.price.toFixed(2)}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!item.inStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm ${
              !item.inStock 
                ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                : quantityInCart > 0 
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400' 
                : 'bg-stone-800 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-700 hover:border-amber-500'
            }`}
            aria-label={`Add ${item.name} to cart`}
          >
            {quantityInCart > 0 ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added ({quantityInCart})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
