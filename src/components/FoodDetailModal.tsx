import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Leaf, 
  Flame, 
  Clock, 
  FlameKindling, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const FoodDetailModal: React.FC = () => {
  const { 
    selectedFoodItem, 
    closeFoodDetail, 
    addToCart, 
    customerProfile, 
    toggleFavoriteDish 
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!selectedFoodItem?.options) return {};
    const initial: Record<string, string> = {};
    selectedFoodItem.options.forEach(opt => {
      if (opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0].label;
      }
    });
    return initial;
  });

  if (!selectedFoodItem) return null;

  const isFavorite = customerProfile.favoriteItemIds.includes(selectedFoodItem.id);

  // Calculate option cost
  let extraOptionsCost = 0;
  if (selectedFoodItem.options) {
    Object.entries(selectedOptions).forEach(([optName, choiceLabel]) => {
      const optDef = selectedFoodItem.options?.find(o => o.name === optName);
      const choice = optDef?.choices.find(c => c.label === choiceLabel);
      if (choice) {
        extraOptionsCost += choice.extraPrice;
      }
    });
  }

  const unitTotal = selectedFoodItem.price + extraOptionsCost;
  const lineTotal = unitTotal * quantity;

  const handleOptionChange = (optionName: string, choiceLabel: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choiceLabel
    }));
  };

  const handleAddToCart = () => {
    addToCart(selectedFoodItem, quantity, specialInstructions, selectedOptions);
    closeFoodDetail();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-800 text-stone-100 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeFoodDetail}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-700/60 shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavoriteDish(selectedFoodItem.id)}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 transition-colors border border-stone-700/60 shadow-lg"
          aria-label={isFavorite ? "Remove favorite" : "Save favorite"}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}`} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden">
            <img 
              src={selectedFoodItem.image} 
              alt={selectedFoodItem.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500 text-stone-950 shadow">
                {selectedFoodItem.category}
              </span>
              <div className="text-xl sm:text-2xl font-bold font-serif text-amber-400 bg-stone-900/90 px-3 py-1 rounded-lg border border-amber-500/30">
                ${selectedFoodItem.price.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Title and indicators */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {selectedFoodItem.isVegetarian && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                    <Leaf className="w-3 h-3" />
                    Vegetarian
                  </span>
                )}
                {selectedFoodItem.isSpicy && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2 py-0.5 rounded-full">
                    <Flame className="w-3 h-3" />
                    Spicy {selectedFoodItem.spicyLevel ? `(Lvl ${selectedFoodItem.spicyLevel})` : ''}
                  </span>
                )}
                {selectedFoodItem.isSpecial && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Chef’s Hearth Special
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
                  <Clock className="w-3 h-3 text-amber-400" />
                  ~{selectedFoodItem.prepTimeMinutes} mins
                </span>
                {selectedFoodItem.calories && (
                  <span className="text-[11px] text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
                    {selectedFoodItem.calories} kcal
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                {selectedFoodItem.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-sm leading-relaxed">
              {selectedFoodItem.fullDescription || selectedFoodItem.description}
            </p>

            {/* Allergens warning if any */}
            {selectedFoodItem.allergens && selectedFoodItem.allergens.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-800/50 p-3 rounded-lg border border-stone-800">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  <strong>Contains:</strong> {selectedFoodItem.allergens.join(', ')}
                </span>
              </div>
            )}

            {/* Options Selection (e.g. doneness, sides) */}
            {selectedFoodItem.options && selectedFoodItem.options.map(opt => (
              <div key={opt.name} className="space-y-2 pt-2 border-t border-stone-800">
                <label className="block text-xs font-semibold text-stone-200 uppercase tracking-wider">
                  {opt.name}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {opt.choices.map(choice => {
                    const isSelected = selectedOptions[opt.name] === choice.label;
                    return (
                      <button
                        key={choice.label}
                        type="button"
                        onClick={() => handleOptionChange(opt.name, choice.label)}
                        className={`flex items-center justify-between p-2.5 rounded-lg text-xs border text-left transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-medium'
                            : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          {choice.label}
                        </span>
                        {choice.extraPrice > 0 && (
                          <span className="text-amber-400/90 font-semibold">
                            +${choice.extraPrice.toFixed(2)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Special instructions */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <label className="block text-xs font-semibold text-stone-200 uppercase tracking-wider">
                Special Kitchen Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={e => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Dressing on the side, extra dressing, cutlery requested..."
                rows={2}
                className="w-full bg-stone-950 border border-stone-700/80 rounded-lg p-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Footer sticky action */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-stone-700 rounded-lg bg-stone-900 overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-bold text-stone-100 min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to cart CTA */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedFoodItem.inStock}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all ${
              selectedFoodItem.inStock
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 active:scale-98'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {selectedFoodItem.inStock 
                ? `Add to Cart • $${lineTotal.toFixed(2)}` 
                : 'Currently Sold Out'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
