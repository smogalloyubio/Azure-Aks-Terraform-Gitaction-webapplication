import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ShoppingBag, 
  CalendarDays, 
  Heart, 
  MapPin, 
  Award, 
  Sparkles, 
  Phone, 
  Mail, 
  Edit3, 
  Check, 
  ArrowRight,
  Clock,
  RotateCw,
  Plus
} from 'lucide-react';
import { FoodCard } from '../components/FoodCard';

export const CustomerDashboard: React.FC = () => {
  const { 
    customerProfile, 
    updateCustomerProfile, 
    orders, 
    reservations, 
    foodItems, 
    setCurrentPage, 
    addToCart 
  } = useApp();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(customerProfile.name);
  const [email, setEmail] = useState(customerProfile.email);
  const [phone, setPhone] = useState(customerProfile.phone);

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'reservations' | 'favorites' | 'account'>('overview');

  const favoriteDishes = foodItems.filter(item => customerProfile.favoriteItemIds.includes(item.id));
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const upcomingReservations = reservations.filter(r => r.status === 'confirmed');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({ name, email, phone });
    setIsEditingProfile(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-serif text-2xl font-bold flex items-center justify-center shadow-inner">
            {customerProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                {customerProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                VIP Connoisseur
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Member since {customerProfile.memberSince} • {customerProfile.email}
            </p>
          </div>
        </div>

        {/* Loyalty Points Pill Card */}
        <div className="bg-stone-950/80 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">Dining Rewards</div>
            <div className="text-xl font-bold font-serif text-stone-100">
              {customerProfile.loyaltyPoints} Points
            </div>
            <div className="text-[11px] text-stone-400">Equivalent to ${(customerProfile.loyaltyPoints / 20).toFixed(2)} reward credit</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: 'Dashboard Overview', icon: Sparkles },
          { key: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { key: 'reservations', label: `Reservations (${reservations.length})`, icon: CalendarDays },
          { key: 'favorites', label: `Saved Dishes (${favoriteDishes.length})`, icon: Heart },
          { key: 'account', label: 'Account & Addresses', icon: User },
        ].map(tab => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all min-w-max ${
                isActive
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900/80 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Active Cooking Orders</span>
              <div className="font-serif text-2xl font-bold text-amber-400">
                {activeOrders.length}
              </div>
              <span className="text-[11px] text-stone-500">In real-time preparation</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Upcoming Tables</span>
              <div className="font-serif text-2xl font-bold text-stone-100">
                {upcomingReservations.length}
              </div>
              <span className="text-[11px] text-stone-500">Confirmed seatings</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Total Lifetime Spend</span>
              <div className="font-serif text-2xl font-bold text-stone-100">
                ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
              </div>
              <span className="text-[11px] text-stone-500">Across {orders.length} orders</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800">
              <span className="text-xs text-stone-400 block mb-1">Saved Favorite Dishes</span>
              <div className="font-serif text-2xl font-bold text-stone-100">
                {favoriteDishes.length}
              </div>
              <span className="text-[11px] text-stone-500">Wishlist favorites</span>
            </div>
          </div>

          {/* Active Orders Section */}
          {activeOrders.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-stone-100">Active Live Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  View All Orders →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeOrders.map(order => (
                  <div key={order.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm font-bold text-amber-400">Order #{order.orderNumber}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 capitalize">
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      {order.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                    </p>
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-800">
                      <span className="text-stone-400">Est: {order.estimatedDeliveryOrPickupTime}</span>
                      <button
                        onClick={() => setCurrentPage('my-orders')}
                        className="text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        Track Live
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Reservations */}
          {upcomingReservations.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-stone-100">Next Upcoming Reservation</h3>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  View All Tables →
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-amber-400 font-bold">#{upcomingReservations[0].reservationCode}</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-xs font-semibold text-stone-200">{upcomingReservations[0].seatingArea}</span>
                  </div>
                  <div className="font-serif text-xl font-bold text-stone-100">
                    {upcomingReservations[0].date} at {upcomingReservations[0].time}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {upcomingReservations[0].guests} Guests • Occasion: {upcomingReservations[0].occasion}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentPage('my-reservations')}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  Manage Reservation
                </button>
              </div>
            </div>
          )}

          {/* Saved Dishes Quick Shelf */}
          {favoriteDishes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-stone-100">Saved Culinary Favorites</h3>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  View All Saved ({favoriteDishes.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {favoriteDishes.slice(0, 4).map(dish => (
                  <FoodCard key={dish.id} item={dish} />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-xl font-bold text-stone-100">Order History ({orders.length})</h3>
            <button
              onClick={() => setCurrentPage('my-orders')}
              className="text-xs text-amber-400 hover:underline"
            >
              Open Dedicated Live Tracker Page
            </button>
          </div>

          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">#{order.orderNumber}</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-xs text-stone-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="text-stone-500">•</span>
                    <span className="text-xs font-semibold text-stone-300 capitalize">{order.deliveryType}</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    {order.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-serif text-lg font-bold text-stone-100">${order.total.toFixed(2)}</div>
                    <span className="text-[11px] text-amber-400 capitalize">{order.status.replace('_', ' ')}</span>
                  </div>
                  <button
                    onClick={() => {
                      order.items.forEach(ci => addToCart(ci.item, ci.quantity));
                      setCurrentPage('cart');
                    }}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                    title="Reorder items"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Reservations */}
      {activeTab === 'reservations' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-xl font-bold text-stone-100">All Reservations ({reservations.length})</h3>
            <button
              onClick={() => setCurrentPage('reservations')}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reservations.map(res => (
              <div key={res.id} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-amber-400">Ref #{res.reservationCode}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 capitalize">
                    {res.status}
                  </span>
                </div>
                <div className="font-serif text-xl font-bold text-stone-100">
                  {res.date} at {res.time}
                </div>
                <p className="text-xs text-stone-400">
                  {res.guests} Guests • {res.seatingArea}
                </p>
                {res.specialRequests && (
                  <p className="text-[11px] text-stone-500 italic">
                    "{res.specialRequests}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Saved Dishes */}
      {activeTab === 'favorites' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">
            Saved Dishes &amp; Wishlist ({favoriteDishes.length})
          </h3>

          {favoriteDishes.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 text-center space-y-3">
              <Heart className="w-8 h-8 text-stone-600 mx-auto" />
              <p className="text-xs text-stone-400">You haven't saved any dishes yet. Tap the heart icon on any dish to save it here.</p>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteDishes.map(dish => (
                <FoodCard key={dish.id} item={dish} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Account Details & Addresses */}
      {activeTab === 'account' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
          
          {/* Profile Form */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-stone-100">Personal Information</h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel' : 'Edit Info'}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 disabled:opacity-60 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Email Address</label>
                <input
                  type="email"
                  disabled={!isEditingProfile}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 disabled:opacity-60 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Phone Number</label>
                <input
                  type="tel"
                  disabled={!isEditingProfile}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 disabled:opacity-60 focus:outline-none focus:border-amber-500"
                />
              </div>

              {isEditingProfile && (
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Saved Addresses */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5">
            <h3 className="font-serif text-lg font-bold text-stone-100 border-b border-stone-800 pb-3">
              Saved Delivery Addresses
            </h3>

            <div className="space-y-3">
              {customerProfile.savedAddresses.map((addr, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-stone-200 block">{addr.label}</span>
                    <span className="text-stone-400">{addr.street}</span>
                    <span className="text-stone-400 block">{addr.city}, CA {addr.zipCode}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
