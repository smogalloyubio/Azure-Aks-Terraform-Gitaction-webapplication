import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, 
  ShoppingBag, 
  CalendarDays, 
  TrendingUp, 
  Users, 
  UtensilsCrossed, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit, 
  Power, 
  Search, 
  SlidersHorizontal,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Order, Reservation, FoodItem, ProductCategory } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    reservations, 
    updateReservationStatus, 
    foodItems, 
    toggleItemStock, 
    updateItemPrice, 
    addNewMenuItem,
    setIsAdminView,
    setCurrentPage 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'reservations' | 'menu' | 'customers'>('overview');

  // Menu Search & Filter
  const [menuSearch, setMenuSearch] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Add Item Modal
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState<ProductCategory>('Starters');
  const [newDishPrice, setNewDishPrice] = useState('18.00');
  const [newDishDescription, setNewDishDescription] = useState('');
  const [newDishImage, setNewDishImage] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
  const [newDishVeg, setNewDishVeg] = useState(false);
  const [newDishSpicy, setNewDishSpicy] = useState(false);

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Reservations Filter
  const [resStatusFilter, setResStatusFilter] = useState<string>('all');

  // Statistics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const todaysOrders = orders.length;
  const activeReservationsCount = reservations.filter(r => r.status === 'confirmed').length;
  const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length) : 0;

  // Revenue chart mock data (7 days)
  const revenueChartData = [
    { day: 'Mon', revenue: 2450, orders: 32 },
    { day: 'Tue', revenue: 2890, orders: 38 },
    { day: 'Wed', revenue: 3120, orders: 42 },
    { day: 'Thu', revenue: 3640, orders: 48 },
    { day: 'Fri', revenue: 4980, orders: 64 },
    { day: 'Sat', revenue: 5820, orders: 76 },
    { day: 'Sun (Today)', revenue: 4210, orders: 54 },
  ];

  const maxRevenue = Math.max(...revenueChartData.map(d => d.revenue));

  // Category sales breakdown
  const categorySales = [
    { category: 'Main Courses', percent: 38, count: 82, color: 'bg-amber-500' },
    { category: 'Burgers & Hearth', percent: 22, count: 48, color: 'bg-amber-600' },
    { category: 'Handcrafted Pasta', percent: 18, count: 39, color: 'bg-amber-700' },
    { category: 'Starters & Crudo', percent: 12, count: 26, color: 'bg-stone-600' },
    { category: 'Wine & Cocktails', percent: 10, count: 22, color: 'bg-stone-700' },
  ];

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    return true;
  });

  const filteredReservations = reservations.filter(r => {
    if (resStatusFilter !== 'all' && r.status !== resStatusFilter) return false;
    return true;
  });

  const filteredMenuItems = foodItems.filter(item => {
    if (!menuSearch) return true;
    const q = menuSearch.toLowerCase();
    return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  const handleSavePrice = (id: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0) {
      updateItemPrice(id, val);
    }
    setEditingPriceId(null);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName || !newDishPrice) return;

    addNewMenuItem({
      name: newDishName,
      description: newDishDescription || 'Handcrafted fresh daily by Table & Taste culinary kitchen.',
      price: parseFloat(newDishPrice) || 20,
      category: newDishCategory,
      image: newDishImage,
      isVegetarian: newDishVeg,
      isSpicy: newDishSpicy,
      isFeatured: false,
      rating: 5.0,
      reviewCount: 1,
      prepTimeMinutes: 15,
      inStock: true,
    });

    setShowAddDishModal(false);
    setNewDishName('');
    setNewDishDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Live Kitchen Terminal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-100">
            Restaurant Operations Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Table &amp; Taste West End • Executive Floor &amp; Hearth Management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsAdminView(false);
              setCurrentPage('home');
            }}
            className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-xl text-xs font-semibold transition-all border border-stone-700"
          >
            Switch to Guest View
          </button>

          <button
            onClick={() => setShowAddDishModal(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Menu Dish</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: 'Analytics & Revenue', icon: TrendingUp },
          { key: 'orders', label: `Orders Manager (${orders.length})`, icon: ShoppingBag },
          { key: 'reservations', label: `Table Reservations (${reservations.length})`, icon: CalendarDays },
          { key: 'menu', label: `Menu Inventory (${foodItems.length})`, icon: UtensilsCrossed },
          { key: 'customers', label: 'Customer Directory', icon: Users },
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

      {/* TAB 1: OVERVIEW & CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-xs font-medium">Today's Gross Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-serif text-3xl font-bold text-stone-100">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.2% vs previous period</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-xs font-medium">Orders Processed</span>
                <ShoppingBag className="w-4 h-4 text-amber-400" />
              </div>
              <div className="font-serif text-3xl font-bold text-stone-100">
                {todaysOrders}
              </div>
              <div className="text-[11px] text-stone-400">
                Avg. ticket ${avgOrderValue.toFixed(2)}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-xs font-medium">Active Booked Tables</span>
                <CalendarDays className="w-4 h-4 text-sky-400" />
              </div>
              <div className="font-serif text-3xl font-bold text-stone-100">
                {activeReservationsCount}
              </div>
              <div className="text-[11px] text-stone-400">
                {reservations.reduce((sum, r) => sum + r.guests, 0)} expected guests
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-stone-400">
                <span className="text-xs font-medium">Kitchen Health</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-serif text-3xl font-bold text-emerald-400">
                Optimal
              </div>
              <div className="text-[11px] text-stone-400">
                All 4 hearth grill stations active
              </div>
            </div>
          </div>

          {/* Revenue Trend Visualizer & Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 7-Day Revenue Bar Chart */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-stone-900 border border-stone-800 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-100">Revenue Performance</h3>
                  <p className="text-xs text-stone-400">7-day gross sales volume and orders distribution</p>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                  Peak: Saturday ($5,820)
                </span>
              </div>

              {/* Responsive SVG Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 border-b border-stone-800">
                {revenueChartData.map(item => {
                  const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                  const isPeak = item.day.includes('Sat');

                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <div className="text-[10px] text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        ${item.revenue}
                      </div>

                      <div 
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 ${
                          isPeak 
                            ? 'bg-amber-400 shadow-lg shadow-amber-500/20' 
                            : 'bg-amber-600/80 group-hover:bg-amber-500'
                        }`}
                      />

                      <span className="text-[10px] sm:text-xs text-stone-400 group-hover:text-stone-200 truncate font-medium">
                        {item.day.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Daily average: $3,875.70</span>
                <span>Total 7-day revenue: $27,110.00</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-4 p-6 bg-stone-900 border border-stone-800 rounded-3xl space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-100 mb-1">Sales by Category</h3>
                <p className="text-xs text-stone-400 mb-6">Volume share across current dining service</p>

                <div className="space-y-4">
                  {categorySales.map(cat => (
                    <div key={cat.category} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-300 font-medium">{cat.category}</span>
                        <span className="text-stone-400">{cat.percent}% ({cat.count} sold)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${cat.color} rounded-full`}
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-400">
                <strong className="text-stone-200 block mb-1">Top Performer:</strong>
                Prime Dry-Aged Ribeye accounts for 24% of all kitchen tickets today.
              </div>
            </div>

          </div>

          {/* Recent Orders Snapshot */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-stone-100">Recent Live Orders</h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Go to Order Pipeline →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="text-stone-500 uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-2">Order #</th>
                    <th className="py-3 px-2">Customer</th>
                    <th className="py-3 px-2">Fulfillment</th>
                    <th className="py-3 px-2">Items</th>
                    <th className="py-3 px-2">Total</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {orders.slice(0, 5).map(o => (
                    <tr key={o.id} className="hover:bg-stone-850/60">
                      <td className="py-3 px-2 font-mono font-bold text-amber-400">#{o.orderNumber}</td>
                      <td className="py-3 px-2 text-stone-100 font-medium">{o.customer.name}</td>
                      <td className="py-3 px-2 capitalize">{o.deliveryType}</td>
                      <td className="py-3 px-2 text-stone-400 max-w-xs truncate">
                        {o.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                      </td>
                      <td className="py-3 px-2 font-bold text-stone-100">${o.total.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-amber-500/10 text-amber-400">
                          {o.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="text-amber-400 hover:underline font-semibold"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">Live Kitchen &amp; Order Pipeline</h3>
              <p className="text-xs text-stone-400">Advance order status in real time as tickets move across the kitchen</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-1 rounded-xl text-xs">
              {['all', 'pending', 'preparing', 'on_the_way', 'delivered'].map(st => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                    orderStatusFilter === st
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'All Tickets' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div 
                key={order.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                  <div>
                    <span className="font-mono text-base font-bold text-amber-400">#{order.orderNumber}</span>
                    <span className="text-stone-500 mx-2">•</span>
                    <span className="font-semibold text-stone-200">{order.customer.name}</span>
                    <span className="text-stone-400 text-xs ml-2">({order.customer.phone})</span>
                    <span className="text-stone-500 mx-2">•</span>
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-500">{order.deliveryType}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Status:</span>
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 font-bold capitalize focus:outline-none focus:border-amber-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing (Kitchen)</option>
                      <option value="ready">Ready for Pickup</option>
                      <option value="on_the_way">Out for Delivery</option>
                      <option value="delivered">Delivered / Done</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Items in ticket */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-2">
                    <span className="font-semibold text-stone-400 block uppercase tracking-wider text-[10px]">
                      Ticket Items:
                    </span>
                    {order.items.map(ci => (
                      <div key={ci.cartItemId} className="p-2 bg-stone-950/60 rounded-lg border border-stone-800/80">
                        <div className="flex justify-between font-semibold text-stone-200">
                          <span>{ci.quantity}x {ci.item.name}</span>
                          <span>${ci.lineTotal.toFixed(2)}</span>
                        </div>
                        {ci.selectedOptions && (
                          <div className="text-[10px] text-amber-400/80">
                            {Object.entries(ci.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                          </div>
                        )}
                        {ci.specialInstructions && (
                          <div className="text-[10px] text-stone-400 italic">
                            Note: "{ci.specialInstructions}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-stone-300">
                    <span className="font-semibold text-stone-400 block uppercase tracking-wider text-[10px]">
                      Fulfillment &amp; Payment Details:
                    </span>
                    <div className="p-3 bg-stone-950/60 rounded-lg border border-stone-800/80 space-y-1">
                      {order.address && (
                        <div>
                          <strong>Address:</strong> {order.address.street}, {order.address.apartment} {order.address.city}
                        </div>
                      )}
                      <div>
                        <strong>Method:</strong> {order.paymentMethod.replace('_', ' ').toUpperCase()} ({order.paymentStatus})
                      </div>
                      <div className="pt-1 flex justify-between font-bold text-stone-100 border-t border-stone-800">
                        <span>Total Paid</span>
                        <span className="text-amber-400 font-serif text-sm">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fast Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-stone-800 text-xs">
                  <span className="text-stone-500 text-[11px]">Quick Action:</span>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[11px]"
                  >
                    Send to Kitchen
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'on_the_way')}
                    className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded text-[11px]"
                  >
                    Dispatch Courier
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="px-2.5 py-1 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 rounded text-[11px] font-semibold"
                  >
                    Mark Fulfilled
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESERVATIONS MANAGEMENT */}
      {activeTab === 'reservations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">Floor &amp; Reservation Management</h3>
              <p className="text-xs text-stone-400">Host stand table assignments, arrival check-in, and guest special requests</p>
            </div>

            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-1 rounded-xl text-xs">
              {['all', 'confirmed', 'seated', 'completed', 'cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setResStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium capitalize transition-all ${
                    resStatusFilter === st
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReservations.map(res => (
              <div key={res.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-amber-400">#{res.reservationCode}</span>
                    <h4 className="font-serif text-lg font-bold text-stone-100">{res.name}</h4>
                  </div>
                  <select
                    value={res.status}
                    onChange={e => updateReservationStatus(res.id, e.target.value as any)}
                    className="bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-stone-200 font-bold capitalize focus:outline-none focus:border-amber-500"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="seated">Seated</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  <div>
                    <span className="text-stone-500 block">Date &amp; Time:</span>
                    <strong>{res.date} at {res.time}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Guests:</span>
                    <strong>{res.guests} Guests ({res.seatingArea})</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Occasion:</span>
                    <span>{res.occasion}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Contact:</span>
                    <span>{res.phone}</span>
                  </div>
                  {res.specialRequests && (
                    <div className="col-span-2 pt-1 border-t border-stone-800 text-stone-300">
                      <span className="text-stone-500 block">Special Request:</span>
                      <span className="italic">"{res.specialRequests}"</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => updateReservationStatus(res.id, 'seated')}
                    className="flex-1 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold"
                  >
                    Seat Party
                  </button>
                  <button
                    onClick={() => updateReservationStatus(res.id, 'completed')}
                    className="flex-1 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs font-semibold"
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MENU MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">Artisanal Menu Inventory</h3>
              <p className="text-xs text-stone-400">Toggle instant stock availability, edit live prices, and add new dishes</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter inventory..."
                  value={menuSearch}
                  onChange={e => setMenuSearch(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => setShowAddDishModal(true)}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Item</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="text-stone-500 uppercase tracking-wider border-b border-stone-800 bg-stone-950/60">
                  <tr>
                    <th className="py-3 px-4">Dish</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Live Price</th>
                    <th className="py-3 px-4">Indicators</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredMenuItems.map(dish => {
                    const isEditing = editingPriceId === dish.id;

                    return (
                      <tr key={dish.id} className="hover:bg-stone-850/60">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={dish.image} 
                              alt={dish.name} 
                              className="w-10 h-10 rounded-lg object-cover bg-stone-950"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <strong className="text-stone-100 block">{dish.name}</strong>
                              <span className="text-[11px] text-stone-400 line-clamp-1">{dish.description}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-semibold">
                            {dish.category}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-amber-400">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                step="0.50"
                                value={tempPrice}
                                onChange={e => setTempPrice(e.target.value)}
                                className="w-20 bg-stone-950 border border-stone-700 px-2 py-1 rounded text-xs text-stone-100"
                              />
                              <button
                                onClick={() => handleSavePrice(dish.id)}
                                className="px-2 py-1 bg-amber-600 text-stone-950 rounded text-[10px] font-bold"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>${dish.price.toFixed(2)}</span>
                              <button
                                onClick={() => {
                                  setEditingPriceId(dish.id);
                                  setTempPrice(dish.price.toString());
                                }}
                                className="text-stone-500 hover:text-amber-400"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex gap-1 text-[10px]">
                            {dish.isVegetarian && <span className="text-emerald-400">Veg</span>}
                            {dish.isSpicy && <span className="text-rose-400">Spicy</span>}
                            {dish.isSpecial && <span className="text-amber-400">Special</span>}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleItemStock(dish.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                              dish.inStock
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                                : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                            }`}
                          >
                            {dish.inStock ? '● In Stock' : '✕ Sold Out'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => toggleItemStock(dish.id)}
                            className="text-stone-400 hover:text-white text-xs underline"
                          >
                            {dish.inStock ? 'Mark Sold Out' : 'Restock'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CUSTOMER DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-100">VIP Customer Directory</h3>
            <p className="text-xs text-stone-400">Guest dining histories, loyalty points balances, and private preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Claire Kensington', email: 'claire.k@example.com', phone: '(310) 555-2311', tier: 'Gold VIP', orders: 3, spend: '$263.80', points: 480 },
              { name: 'Marcus Sterling', email: 'm.sterling@lawfirm.com', phone: '(310) 555-9012', tier: 'Platinum Connoisseur', orders: 8, spend: '$890.50', points: 1240 },
              { name: 'Dr. Evelyn Martinez', email: 'evelyn.m@ucla.edu', phone: '(310) 555-7822', tier: 'Silver Diner', orders: 2, spend: '$145.00', points: 290 },
            ].map(cust => (
              <div key={cust.email} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 font-serif font-bold text-lg flex items-center justify-center">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-100">{cust.name}</h4>
                    <span className="text-[10px] text-amber-500 uppercase font-semibold">{cust.tier}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Email:</span>
                    <span>{cust.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Phone:</span>
                    <span>{cust.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Lifetime Orders:</span>
                    <span className="font-bold text-stone-100">{cust.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Lifetime Spend:</span>
                    <span className="font-bold text-amber-400">{cust.spend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Loyalty Balance:</span>
                    <span className="font-bold text-stone-200">{cust.points} Pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <h3 className="font-serif text-2xl font-bold text-stone-100">Add New Dish to Menu</h3>

            <form onSubmit={handleCreateDish} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hearth-Roasted Duck Confit"
                  value={newDishName}
                  onChange={e => setNewDishName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Category</label>
                  <select
                    value={newDishCategory}
                    onChange={e => setNewDishCategory(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Courses">Main Courses</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Salads">Salads</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-stone-400 font-medium">Price ($)</label>
                  <input
                    type="number"
                    step="0.50"
                    required
                    value={newDishPrice}
                    onChange={e => setNewDishPrice(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Culinary Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of flavors, preparations, and farm ingredients..."
                  value={newDishDescription}
                  onChange={e => setNewDishDescription(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 font-medium">Image URL</label>
                <input
                  type="url"
                  value={newDishImage}
                  onChange={e => setNewDishImage(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={newDishVeg}
                    onChange={e => setNewDishVeg(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 bg-stone-950"
                  />
                  <span>Vegetarian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                  <input
                    type="checkbox"
                    checked={newDishSpicy}
                    onChange={e => setNewDishSpicy(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500 bg-stone-950"
                  />
                  <span>Spicy</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddDishModal(false)}
                  className="px-4 py-2 text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl"
                >
                  Create Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
