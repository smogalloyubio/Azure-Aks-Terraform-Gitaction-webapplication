import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const MobileCartBar: React.FC = () => {
  const { cartCount, cartSubtotal, currentPage, setCurrentPage } = useApp();

  // Hide when cart is empty or already on cart/checkout pages
  if (cartCount === 0 || currentPage === 'cart' || currentPage === 'checkout') {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 p-3 lg:hidden bg-stone-900/95 backdrop-blur-md border-t border-stone-800 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-stone-100">
          <div className="relative p-2 bg-stone-800 rounded-lg text-amber-400">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <div>
            <div className="text-xs text-stone-400">Your Cart</div>
            <div className="text-sm font-bold text-stone-100">${cartSubtotal.toFixed(2)}</div>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
        >
          <span>View Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
