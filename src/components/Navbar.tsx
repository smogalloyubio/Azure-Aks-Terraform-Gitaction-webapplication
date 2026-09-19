import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  CalendarDays, 
  User, 
  ShieldCheck, 
  Menu as MenuIcon, 
  X, 
  Clock, 
  Phone,
  Heart,
  ChevronDown
} from 'lucide-react';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    cartCount, 
    cartSubtotal,
    isAdminView, 
    setIsAdminView,
    customerProfile
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Artisanal Menu', page: 'menu' },
    { label: 'Reservations', page: 'reservations' },
    { label: 'Our Story', page: 'restaurant-info' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-md">
      {/* Top Banner with hours and phone */}
      <div className="bg-stone-950 text-stone-400 text-xs py-1.5 px-4 border-b border-stone-800/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Open Today: Lunch 11:30 AM - 3:00 PM | Dinner 5:00 PM - 11:00 PM
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              (310) 555-8921 • West End
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-colors ${
                isAdminView 
                  ? 'bg-amber-500 text-stone-950 font-semibold' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              {isAdminView ? 'Staff Portal Active' : 'Staff Mode'}
            </button>
            <span className="text-stone-500">|</span>
            <button
              onClick={() => navigateTo('my-reservations')}
              className="hover:text-amber-400 transition-colors"
            >
              My Bookings
            </button>
            <button
              onClick={() => navigateTo('my-orders')}
              className="hover:text-amber-400 transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                Table &amp; Taste
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-amber-500/90 font-medium">
                Artisanal Dining &amp; Hearth
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive 
                      ? 'text-amber-400 bg-stone-800/80 font-semibold' 
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Reservation Button */}
            <button
              onClick={() => navigateTo('reservations')}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 rounded-md transition-all"
            >
              <CalendarDays className="w-4 h-4" />
              Book Table
            </button>

            {/* Customer Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all ${
                  currentPage === 'customer-dashboard' || currentPage === 'my-orders' || currentPage === 'my-reservations'
                    ? 'border-amber-500/80 bg-stone-800 text-amber-400'
                    : 'border-stone-700 bg-stone-800/60 hover:bg-stone-800 text-stone-200'
                }`}
                aria-label="User Account Menu"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-medium text-xs">
                  {customerProfile.name.charAt(0)}
                </div>
                <span className="text-xs font-medium hidden sm:inline max-w-[90px] truncate">
                  {customerProfile.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-2 z-50 text-stone-200 divide-y divide-stone-800">
                  <div className="px-4 py-2.5">
                    <p className="text-xs text-stone-400">Signed in as</p>
                    <p className="text-sm font-medium text-stone-100 truncate">{customerProfile.name}</p>
                    <p className="text-xs text-amber-500 mt-0.5">★ {customerProfile.loyaltyPoints} Dining Points</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => navigateTo('customer-dashboard')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 flex items-center gap-2 text-stone-200"
                    >
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      Account &amp; Saved Dishes
                    </button>
                    <button
                      onClick={() => navigateTo('my-orders')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 flex items-center gap-2 text-stone-200"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      Order History &amp; Tracking
                    </button>
                    <button
                      onClick={() => navigateTo('my-reservations')}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 flex items-center gap-2 text-stone-200"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
                      My Reservations
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsAdminView(true);
                        navigateTo('admin-dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-stone-800 flex items-center gap-2 text-amber-400 font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Restaurant Admin Panel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative flex items-center gap-2.5 px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold rounded-lg shadow-sm transition-all"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="text-xs hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-stone-950 text-amber-400 text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
              {cartSubtotal > 0 && (
                <span className="text-xs font-bold hidden lg:inline border-l border-amber-700/50 pl-2">
                  ${cartSubtotal.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2 border-b border-stone-800 pb-3">
            <button
              onClick={() => navigateTo('reservations')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-semibold rounded-md uppercase tracking-wider"
            >
              <CalendarDays className="w-4 h-4" />
              Book Table
            </button>
            <button
              onClick={() => navigateTo('menu')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold rounded-md uppercase tracking-wider"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Order Online
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  currentPage === link.page
                    ? 'bg-stone-800 text-amber-400 font-semibold'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800/80 space-y-1">
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className="w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-white flex items-center gap-2"
            >
              <User className="w-4 h-4 text-amber-500" />
              Customer Dashboard ({customerProfile.name})
            </button>
            <button
              onClick={() => navigateTo('my-orders')}
              className="w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-white flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              My Orders &amp; Receipts
            </button>
            <button
              onClick={() => navigateTo('my-reservations')}
              className="w-full text-left px-4 py-2 text-sm text-stone-300 hover:text-white flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" />
              My Table Reservations
            </button>
            <button
              onClick={() => {
                setIsAdminView(true);
                navigateTo('admin-dashboard');
              }}
              className="w-full text-left px-4 py-2 text-sm text-amber-400 font-semibold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Switch to Restaurant Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
