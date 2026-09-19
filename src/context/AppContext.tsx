import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  FoodItem, 
  CartItem, 
  Order, 
  Reservation, 
  CustomerProfile, 
  PageView, 
  ToastMessage,
  ProductCategory
} from '../types';
import { 
  INITIAL_FOOD_ITEMS, 
  INITIAL_ORDERS, 
  INITIAL_RESERVATIONS, 
  INITIAL_CUSTOMER_PROFILE 
} from '../data/mockData';

interface AppContextType {
  // Navigation & View
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedCategory: ProductCategory | 'All';
  setSelectedCategory: (cat: ProductCategory | 'All') => void;
  selectedFoodItem: FoodItem | null;
  openFoodDetail: (item: FoodItem) => void;
  closeFoodDetail: () => void;
  
  // Menu data
  foodItems: FoodItem[];
  toggleItemStock: (id: string) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  addNewMenuItem: (item: Omit<FoodItem, 'id'>) => void;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (item: FoodItem, quantity?: number, specialInstructions?: string, selectedOptions?: Record<string, string>) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'estimatedDeliveryOrPickupTime'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  
  // Reservations
  reservations: Reservation[];
  makeReservation: (resData: Omit<Reservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  cancelReservation: (id: string) => void;
  
  // Customer
  customerProfile: CustomerProfile;
  toggleFavoriteDish: (foodId: string) => void;
  updateCustomerProfile: (updated: Partial<CustomerProfile>) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error', title?: string) => void;
  removeToast: (id: string) => void;
  
  // Admin & View Mode
  isAdminView: boolean;
  setIsAdminView: (isAdmin: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Page navigation
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Data state with localStorage initialization
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('table_taste_menu');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('table_taste_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('table_taste_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('table_taste_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('table_taste_profile');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_PROFILE;
    } catch {
      return INITIAL_CUSTOMER_PROFILE;
    }
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('table_taste_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('table_taste_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('table_taste_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('table_taste_profile', JSON.stringify(customerProfile));
  }, [customerProfile]);

  useEffect(() => {
    localStorage.setItem('table_taste_menu', JSON.stringify(foodItems));
  }, [foodItems]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success', title?: string) => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Food Item Detail Modal
  const openFoodDetail = (item: FoodItem) => {
    setSelectedFoodItem(item);
  };

  const closeFoodDetail = () => {
    setSelectedFoodItem(null);
  };

  // Cart operations
  const addToCart = (
    item: FoodItem, 
    quantity = 1, 
    specialInstructions = '', 
    selectedOptions?: Record<string, string>
  ) => {
    // calculate extra option cost
    let optionPriceAdd = 0;
    if (selectedOptions && item.options) {
      Object.entries(selectedOptions).forEach(([optName, choiceLabel]) => {
        const optDef = item.options?.find(o => o.name === optName);
        const choice = optDef?.choices.find(c => c.label === choiceLabel);
        if (choice) optionPriceAdd += choice.extraPrice;
      });
    }

    const unitPrice = item.price + optionPriceAdd;
    const cartItemId = `${item.id}-${JSON.stringify(selectedOptions || {})}-${specialInstructions ? specialInstructions.trim().slice(0, 15) : 'std'}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const current = updated[existingIndex];
        const newQty = current.quantity + quantity;
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          lineTotal: Number((unitPrice * newQty).toFixed(2))
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          item,
          quantity,
          specialInstructions: specialInstructions || undefined,
          selectedOptions,
          lineTotal: Number((unitPrice * quantity).toFixed(2))
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${quantity}x "${item.name}" to cart`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(ci => {
      if (ci.cartItemId === cartItemId) {
        const unitPrice = ci.lineTotal / ci.quantity;
        return {
          ...ci,
          quantity,
          lineTotal: Number((unitPrice * quantity).toFixed(2))
        };
      }
      return ci;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    const target = cartItems.find(c => c.cartItemId === cartItemId);
    setCartItems(prev => prev.filter(c => c.cartItemId !== cartItemId));
    if (target) {
      showToast(`Removed "${target.item.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscount(0);
  };

  // Cart Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = Number(cartItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const deliveryFee = cartSubtotal === 0 ? 0 : cartSubtotal >= 50 ? 0 : 3.99;
  const tax = Number((cartSubtotal * 0.09).toFixed(2)); // 9% sales tax
  const cartTotal = Number(Math.max(0, cartSubtotal + deliveryFee + tax - discount).toFixed(2));

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TASTE10') {
      const disc = Number((cartSubtotal * 0.1).toFixed(2));
      setDiscount(disc);
      setPromoCode(clean);
      showToast('10% VIP Discount applied!', 'success');
      return true;
    } else if (clean === 'WELCOME') {
      setDiscount(5.00);
      setPromoCode(clean);
      showToast('$5 Welcome credit applied!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try TASTE10 or WELCOME', 'error');
      return false;
    }
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'estimatedDeliveryOrPickupTime'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: `TT-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'preparing',
      estimatedDeliveryOrPickupTime: orderData.deliveryType === 'delivery' 
        ? '30–40 mins' 
        : '15–20 mins (Ready for pickup)',
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    
    // Add loyalty points (1 point per dollar spent)
    const pointsEarned = Math.floor(newOrder.total);
    setCustomerProfile(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + pointsEarned
    }));

    showToast(`Order #${newOrder.orderNumber} confirmed! Kitchen is preparing your meal.`, 'success', 'Order Placed');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, status } : null);
    }
    showToast(`Order status updated to "${status.replace('_', ' ')}"`, 'info');
  };

  // Reservations
  const makeReservation = (resData: Omit<Reservation, 'id' | 'reservationCode' | 'createdAt' | 'status'>): Reservation => {
    const code = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRes: Reservation = {
      ...resData,
      id: 'res-' + Date.now(),
      reservationCode: code,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setReservations(prev => [newRes, ...prev]);
    showToast(`Table confirmed for ${newRes.guests} guests on ${newRes.date} at ${newRes.time}!`, 'success', 'Reservation Confirmed');
    return newRes;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Reservation status updated to "${status}"`, 'info');
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
    showToast('Reservation has been cancelled.', 'info');
  };

  // Customer Favorites & Profile
  const toggleFavoriteDish = (foodId: string) => {
    setCustomerProfile(prev => {
      const exists = prev.favoriteItemIds.includes(foodId);
      const updated = exists 
        ? prev.favoriteItemIds.filter(id => id !== foodId)
        : [...prev.favoriteItemIds, foodId];
      
      showToast(exists ? 'Removed from saved dishes' : 'Saved to favorite dishes', 'info');
      return { ...prev, favoriteItemIds: updated };
    });
  };

  const updateCustomerProfile = (updated: Partial<CustomerProfile>) => {
    setCustomerProfile(prev => ({ ...prev, ...updated }));
    showToast('Customer profile updated successfully', 'success');
  };

  // Admin Menu Operations
  const toggleItemStock = (id: string) => {
    setFoodItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.inStock;
        showToast(`"${item.name}" is now ${nextState ? 'In Stock' : 'Marked Sold Out'}`, 'info');
        return { ...item, inStock: nextState };
      }
      return item;
    }));
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setFoodItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, price: newPrice };
      }
      return item;
    }));
    showToast('Menu price updated', 'success');
  };

  const addNewMenuItem = (itemData: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...itemData,
      id: 'food-' + Date.now(),
    };
    setFoodItems(prev => [newItem, ...prev]);
    showToast(`Added "${newItem.name}" to the menu`, 'success');
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedCategory,
      setSelectedCategory,
      selectedFoodItem,
      openFoodDetail,
      closeFoodDetail,
      foodItems,
      toggleItemStock,
      updateItemPrice,
      addNewMenuItem,
      cartItems,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      cartCount,
      cartSubtotal,
      deliveryFee,
      tax,
      discount,
      promoCode,
      applyPromoCode,
      cartTotal,
      orders,
      placeOrder,
      updateOrderStatus,
      activeOrder,
      setActiveOrder,
      reservations,
      makeReservation,
      updateReservationStatus,
      cancelReservation,
      customerProfile,
      toggleFavoriteDish,
      updateCustomerProfile,
      toasts,
      showToast,
      removeToast,
      isAdminView,
      setIsAdminView,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
