import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Truck, 
  Store, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Loader2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DeliveryType, PaymentMethod, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cartItems, 
    cartSubtotal, 
    deliveryFee: initialDeliveryFee, 
    tax, 
    discount, 
    customerProfile, 
    placeOrder, 
    setCurrentPage 
  } = useApp();

  // Form State
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');
  const [name, setName] = useState(customerProfile.name);
  const [email, setEmail] = useState(customerProfile.email);
  const [phone, setPhone] = useState(customerProfile.phone);

  const [street, setStreet] = useState(customerProfile.savedAddresses[0]?.street || '742 Evergreen Terrace');
  const [apartment, setApartment] = useState(customerProfile.savedAddresses[0]?.street.includes('Apt') ? 'Apt 4B' : '');
  const [city, setCity] = useState(customerProfile.savedAddresses[0]?.city || 'West End');
  const [zipCode, setZipCode] = useState(customerProfile.savedAddresses[0]?.zipCode || '90210');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Card fields mock
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('884');

  // Submission & Confirmation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Calculate tip and totals
  const deliveryFee = deliveryType === 'pickup' ? 0 : initialDeliveryFee;
  const tipAmount = customTip !== '' 
    ? Number(parseFloat(customTip) || 0) 
    : Number(((cartSubtotal * tipPercentage) / 100).toFixed(2));

  const total = Number(Math.max(0, cartSubtotal + deliveryFee + tax + tipAmount - discount).toFixed(2));

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Please provide complete customer details.');
      return;
    }

    if (deliveryType === 'delivery' && (!street.trim() || !city.trim() || !zipCode.trim())) {
      alert('Please provide your complete delivery street address.');
      return;
    }

    setIsProcessing(true);

    // Realistic mock payment authorization delay
    setTimeout(() => {
      const order = placeOrder({
        customer: { name, email, phone },
        deliveryType,
        address: deliveryType === 'delivery' ? { street, apartment, city, zipCode, deliveryNotes } : undefined,
        paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'pending_cash' : 'paid',
        items: cartItems,
        subtotal: cartSubtotal,
        deliveryFee,
        tax,
        tip: tipAmount,
        discount,
        total,
      });

      setIsProcessing(false);
      setConfirmedOrder(order);
    }, 1400);
  };

  // If order is placed, show confirmation screen
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-in fade-in zoom-in-95 duration-400">
        <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mx-auto shadow-xl">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
            Culinary Order Confirmed
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100">
            Thank You, {confirmedOrder.customer.name.split(' ')[0]}!
          </h2>
          <p className="text-stone-300 text-sm max-w-lg mx-auto">
            Your ticket has been sent directly to Chef Julian’s hearth brigade. Order <strong className="text-amber-400">#{confirmedOrder.orderNumber}</strong> is currently being prepared with fresh ingredients.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-left space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <span className="text-xs text-stone-400 block">Service Type</span>
              <span className="text-sm font-bold text-stone-100 capitalize">
                {confirmedOrder.deliveryType}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 block">Estimated Time</span>
              <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {confirmedOrder.estimatedDeliveryOrPickupTime}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-stone-300">
            <span className="font-bold text-stone-200 block">Items Ordered ({confirmedOrder.items.length}):</span>
            {confirmedOrder.items.map(ci => (
              <div key={ci.cartItemId} className="flex justify-between">
                <span>{ci.quantity}x {ci.item.name}</span>
                <span className="font-semibold text-stone-100">${ci.lineTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-800 pt-3 flex justify-between font-serif text-base font-bold text-stone-100">
            <span>Total Paid</span>
            <span className="text-amber-400 text-xl">${confirmedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setCurrentPage('my-orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Live Order Tracker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty and no order yet
  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-100">Your cart is empty</h2>
        <p className="text-xs text-stone-400">Please select items from our menu before checking out.</p>
        <button
          onClick={() => setCurrentPage('menu')}
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl"
        >
          View Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Header */}
      <div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-400 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart Review</span>
        </button>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100">
          Checkout &amp; Service Details
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Service Details & Payment */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Delivery or Pickup Choice */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-100">
              1. Fulfillment Method
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span className="text-xs">Direct Delivery</span>
                <span className="text-[10px] font-normal text-stone-400">
                  Heated transport to your door (~35 mins)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <Store className="w-5 h-5" />
                <span className="text-xs">Restaurant Pickup</span>
                <span className="text-[10px] font-normal text-stone-400">
                  Ready at our host stand (~15 mins)
                </span>
              </button>
            </div>
          </div>

          {/* 2. Customer Information */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-100">
              2. Guest Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-stone-400 font-medium">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-400 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-400 font-medium">Mobile Phone</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Delivery Address (if Delivery) */}
          {deliveryType === 'delivery' && (
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center justify-between">
                <span>3. Delivery Address</span>
                <span className="text-xs font-normal text-amber-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Local 10-mile radius
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs text-stone-400 font-medium">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-stone-400 font-medium">Apt / Suite / Floor (Optional)</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={e => setApartment(e.target.value)}
                    placeholder="e.g. Apt 4B"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs text-stone-400 font-medium">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-stone-400 font-medium">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={e => setZipCode(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs text-stone-400 font-medium">Delivery Gate Code / Instructions</label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={e => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Leave with lobby concierge or call on arrival"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. Culinary Gratuity */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Culinary Kitchen &amp; Courier Gratuity
              </h3>
              <span className="text-xs text-stone-400">100% goes directly to service staff</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {[10, 15, 20, 25].map(pct => {
                const isSelected = tipPercentage === pct && customTip === '';
                const calculatedTip = ((cartSubtotal * pct) / 100).toFixed(2);
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setTipPercentage(pct);
                      setCustomTip('');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-850'
                    }`}
                  >
                    <div>{pct}%</div>
                    <div className="text-[10px] text-stone-400 font-normal">${calculatedTip}</div>
                  </button>
                );
              })}

              <div className="col-span-4 sm:col-span-1">
                <input
                  type="number"
                  placeholder="Custom $"
                  value={customTip}
                  onChange={e => {
                    setCustomTip(e.target.value);
                    setTipPercentage(0);
                  }}
                  className="w-full h-full bg-stone-950 border border-stone-800 rounded-xl px-2 py-2 text-xs text-stone-200 text-center focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* 5. Payment Method */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Payment Method (Mock Processing)
              </h3>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-Bit Encrypted Simulation
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-xs">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-xs">Apple / G-Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-800'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span className="text-xs">Pay on Arrival</span>
              </button>
            </div>

            {/* Mock Card Form */}
            {paymentMethod === 'card' && (
              <div className="pt-3 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-3 space-y-1">
                  <label className="text-[11px] text-stone-400">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-stone-400">Expiration</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-stone-400">CVC / Security Code</label>
                  <input
                    type="password"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Order Summary Checkout */}
        <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 lg:sticky lg:top-24">
          <h3 className="font-serif text-lg font-bold text-stone-100 border-b border-stone-800 pb-3">
            Final Order Review
          </h3>

          {/* Quick list of items */}
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {cartItems.map(ci => (
              <div key={ci.cartItemId} className="flex justify-between items-start text-stone-300">
                <div className="pr-2">
                  <span className="font-semibold text-stone-100">{ci.quantity}x</span> {ci.item.name}
                  {ci.selectedOptions && Object.values(ci.selectedOptions).length > 0 && (
                    <span className="block text-[10px] text-stone-500">
                      {Object.values(ci.selectedOptions).join(', ')}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-stone-100 shrink-0">
                  ${ci.lineTotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Financial summary */}
          <div className="space-y-2 pt-3 border-t border-stone-800 text-xs text-stone-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-100">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Fulfillment ({deliveryType})</span>
              <span className="font-semibold text-stone-100">
                {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax &amp; Fees</span>
              <span className="font-semibold text-stone-100">${tax.toFixed(2)}</span>
            </div>

            {tipAmount > 0 && (
              <div className="flex justify-between">
                <span>Staff Gratuity</span>
                <span className="font-semibold text-stone-100">${tipAmount.toFixed(2)}</span>
              </div>
            )}

            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promo Credit</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-stone-800 pt-3 flex justify-between items-baseline text-stone-100">
              <span className="font-serif text-lg font-bold">Total Due</span>
              <span className="font-serif text-2xl font-bold text-amber-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit Button with Loading State */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl transition-all ${
              isProcessing
                ? 'bg-amber-700 text-stone-950 cursor-wait'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 active:scale-98'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing Payment...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Confirm Order • ${total.toFixed(2)}</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-stone-500 text-center">
            By confirming, you will receive real-time SMS &amp; email preparation status updates.
          </p>
        </div>

      </form>

    </div>
  );
};
