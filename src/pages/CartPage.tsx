import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  ArrowLeft,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cartItems, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    deliveryFee, 
    tax, 
    discount, 
    promoCode, 
    applyPromoCode, 
    cartTotal, 
    setCurrentPage 
  } = useApp();

  const [inputPromo, setInputPromo] = useState('');
  const [editingInstructionsId, setEditingInstructionsId] = useState<string | null>(null);
  const [instructionText, setInstructionText] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    applyPromoCode(inputPromo);
    setInputPromo('');
  };

  const handleSaveInstruction = (cartItemId: string) => {
    // Save instructions by updating the cart line item
    const target = cartItems.find(c => c.cartItemId === cartItemId);
    if (target) {
      target.specialInstructions = instructionText.trim() || undefined;
    }
    setEditingInstructionsId(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center text-amber-500 mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-stone-100">Your Dining Cart is Empty</h2>
          <p className="text-sm text-stone-400 max-w-md mx-auto">
            You haven’t selected any artisanal dishes yet. Browse our wood-fired specialties, hand-rolled pastas, and reserve cellar wines.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentPage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
        >
          <span>Explore Artisanal Menu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing Menu</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            Review Your Order
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All Items
        </button>
      </div>

      {/* Main Grid: Cart Items & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map(cartItem => {
            const { item, quantity, selectedOptions, specialInstructions, lineTotal, cartItemId } = cartItem;
            const isEditing = editingInstructionsId === cartItemId;

            return (
              <div 
                key={cartItemId}
                className="p-4 sm:p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-stone-950 shrink-0 border border-stone-800"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-stone-100">
                        {item.name}
                      </h4>
                      <span className="font-serif text-base font-bold text-amber-400 shrink-0">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">
                      ${item.price.toFixed(2)} each • {item.category}
                    </p>

                    {/* Selected Options summary */}
                    {selectedOptions && Object.keys(selectedOptions).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {Object.entries(selectedOptions).map(([k, v]) => (
                          <span 
                            key={k}
                            className="text-[11px] bg-stone-950 border border-stone-800 text-amber-400/90 px-2 py-0.5 rounded-md"
                          >
                            {k}: <strong>{v}</strong>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Special instruction preview */}
                    {specialInstructions && !isEditing && (
                      <div className="mt-2 text-xs text-stone-300 bg-stone-950/70 p-2 rounded-lg border border-stone-800/80 flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="italic">"{specialInstructions}"</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline Special Instruction Editor */}
                {isEditing ? (
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <label className="text-xs text-stone-300 font-semibold block">
                      Kitchen Note for {item.name}:
                    </label>
                    <textarea
                      value={instructionText}
                      onChange={e => setInstructionText(e.target.value)}
                      placeholder="e.g., Dressing on the side, extra crispy, no cutlery..."
                      rows={2}
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingInstructionsId(null)}
                        className="px-3 py-1 text-xs text-stone-400 hover:text-stone-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveInstruction(cartItemId)}
                        className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-md"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Bottom Row: Quantity changer, Note button, Remove */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs">
                  <div className="flex items-center gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-stone-700 rounded-lg bg-stone-950 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(cartItemId, quantity - 1)}
                        className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-stone-100 min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(cartItemId, quantity + 1)}
                        className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {!isEditing && (
                      <button
                        onClick={() => {
                          setInstructionText(specialInstructions || '');
                          setEditingInstructionsId(cartItemId);
                        }}
                        className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{specialInstructions ? 'Edit Note' : 'Add Note'}</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(cartItemId)}
                    className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 lg:sticky lg:top-24">
          <h3 className="font-serif text-xl font-bold text-stone-100 border-b border-stone-800 pb-3">
            Order Summary
          </h3>

          {/* Promo Code Input */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="text-xs text-stone-400 font-medium block">
              Promo Code or Gift Voucher
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="e.g. TASTE10 or WELCOME"
                  value={inputPromo}
                  onChange={e => setInputPromo(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 uppercase placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs rounded-xl transition-colors shrink-0"
              >
                Apply
              </button>
            </div>
            {promoCode && (
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Coupon {promoCode} active (-${discount.toFixed(2)})
              </p>
            )}
          </form>

          {/* Financial Breakdown */}
          <div className="space-y-3 text-xs text-stone-300 border-t border-stone-800 pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-100">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span>Estimated Delivery Fee</span>
                {cartSubtotal >= 50 && (
                  <span className="block text-[10px] text-emerald-400">Complimentary over $50</span>
                )}
              </div>
              <span className="font-semibold text-stone-100">
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Sales Tax &amp; Culinary Fee (9%)</span>
              <span className="font-semibold text-stone-100">${tax.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Promotional Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-stone-800 pt-3 flex justify-between items-baseline text-stone-100">
              <span className="font-serif text-lg font-bold">Estimated Total</span>
              <span className="font-serif text-2xl font-bold text-amber-400">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Proceed to Checkout CTA */}
          <button
            onClick={() => {
              setCurrentPage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-xl transition-all duration-200 active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Guarantee */}
          <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500/80" />
            <span>Artisanal Packaging • Heated Transport • 100% Satisfaction</span>
          </div>

        </div>

      </div>

    </div>
  );
};
