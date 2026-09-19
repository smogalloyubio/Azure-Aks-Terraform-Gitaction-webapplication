import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Flame, 
  RotateCw, 
  FileText, 
  ChevronRight,
  ArrowRight,
  MapPin,
  UtensilsCrossed
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const MyOrdersPage: React.FC = () => {
  const { orders, addToCart, setCurrentPage } = useApp();
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<Order | null>(null);

  const statusSteps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending', label: 'Order Received', icon: Clock },
    { key: 'preparing', label: 'Hearth Cooking', icon: Flame },
    { key: 'on_the_way', label: 'Out for Delivery / Ready', icon: Truck },
    { key: 'delivered', label: 'Delivered / Completed', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'ready':
      case 'on_the_way': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(ci => {
      addToCart(ci.item, ci.quantity, ci.specialInstructions, ci.selectedOptions);
    });
    setCurrentPage('cart');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest block mb-1">
            Dining History &amp; Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
            My Orders
          </h1>
        </div>

        <button
          onClick={() => {
            setCurrentPage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all self-start sm:self-auto"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Order Something New</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-800 text-amber-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-100">No Orders Placed Yet</h3>
          <p className="text-xs text-stone-400">
            Explore our wood-fired creations and hand-crafted pastas to place your first culinary order.
          </p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const currentStepIdx = getStepIndex(order.status);
            const isCompleted = order.status === 'delivered';

            return (
              <div
                key={order.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-5 transition-all shadow-md"
              >
                {/* Header row: Order #, Date, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-amber-400">
                        #{order.orderNumber}
                      </span>
                      <span className="text-stone-500">•</span>
                      <span className="text-xs text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString(undefined, { 
                          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                      <span className="text-stone-500">•</span>
                      <span className="text-xs font-semibold text-stone-300 capitalize">
                        {order.deliveryType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      order.status === 'delivered'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : order.status === 'cancelled'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="font-serif text-lg font-bold text-stone-100">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Real-time Order Progress Stepper */}
                {!isCompleted && order.status !== 'cancelled' && (
                  <div className="py-2 px-1 sm:px-4 bg-stone-950/60 rounded-xl border border-stone-800/80">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-stone-300">Live Kitchen Tracker</span>
                      <span className="text-amber-400 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {order.estimatedDeliveryOrPickupTime}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 relative">
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        const StepIcon = step.icon;

                        return (
                          <div key={step.key} className="flex flex-col items-center text-center space-y-1.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isCurrent
                                ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20 font-bold'
                                : isDone
                                ? 'bg-amber-500/30 text-amber-400'
                                : 'bg-stone-800 text-stone-600'
                            }`}>
                              <StepIcon className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] font-medium leading-tight hidden sm:block ${
                              isCurrent ? 'text-amber-400 font-bold' : isDone ? 'text-stone-300' : 'text-stone-600'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Items preview list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map(ci => (
                    <div 
                      key={ci.cartItemId}
                      className="p-3 rounded-xl bg-stone-950/50 border border-stone-800/80 flex items-center gap-3"
                    >
                      <img 
                        src={ci.item.image} 
                        alt={ci.item.name} 
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-stone-200 truncate">
                          {ci.quantity}x {ci.item.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          ${ci.lineTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-xs">
                  {order.address && (
                    <div className="text-stone-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{order.address.street}, {order.address.city}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setSelectedOrderReceipt(order)}
                      className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 flex items-center gap-1.5 font-semibold transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Reorder Items</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedOrderReceipt && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="font-serif text-lg font-bold text-stone-100">Table &amp; Taste Receipt</span>
                <span className="block font-mono text-xs text-amber-400">Order #{selectedOrderReceipt.orderNumber}</span>
              </div>
              <button 
                onClick={() => setSelectedOrderReceipt(null)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300 max-h-60 overflow-y-auto pr-1">
              {selectedOrderReceipt.items.map(ci => (
                <div key={ci.cartItemId} className="flex justify-between border-b border-stone-800/60 pb-2">
                  <div>
                    <div className="font-semibold text-stone-100">{ci.quantity}x {ci.item.name}</div>
                    {ci.specialInstructions && (
                      <div className="text-[10px] text-stone-500 italic">Note: {ci.specialInstructions}</div>
                    )}
                  </div>
                  <div className="font-mono text-stone-200">${ci.lineTotal.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${selectedOrderReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${selectedOrderReceipt.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (9%)</span>
                <span>${selectedOrderReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gratuity</span>
                <span>${selectedOrderReceipt.tip.toFixed(2)}</span>
              </div>
              {selectedOrderReceipt.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-${selectedOrderReceipt.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-stone-800 pt-2 flex justify-between font-serif text-base font-bold text-stone-100">
                <span>Total Amount</span>
                <span className="text-amber-400">${selectedOrderReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[10px] text-stone-500 text-center">
              Paid with {selectedOrderReceipt.paymentMethod.replace('_', ' ').toUpperCase()} • Thank you for dining with Table &amp; Taste
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
