export type ProductCategory = 
  | 'Starters'
  | 'Main Courses'
  | 'Burgers'
  | 'Pizza'
  | 'Pasta'
  | 'Salads'
  | 'Desserts'
  | 'Drinks';

export interface FoodItemOption {
  name: string;
  choices: {
    label: string;
    extraPrice: number;
  }[];
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  category: ProductCategory;
  image: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  spicyLevel?: 1 | 2 | 3;
  isSpecial?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  calories?: number;
  allergens?: string[];
  options?: FoodItemOption[];
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string; // unique ID for cart line
  item: FoodItem;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: Record<string, string>;
  lineTotal: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'pickup';
export type PaymentMethod = 'card' | 'apple_pay' | 'cash';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  street: string;
  apartment?: string;
  city: string;
  zipCode: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  deliveryType: DeliveryType;
  address?: OrderAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_cash';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedDeliveryOrPickupTime: string;
}

export type SeatingArea = 'Main Dining Hall' | 'Garden Terrace & Patio' | 'Chef’s Interactive Counter' | 'Private Velvet Booth';

export interface Reservation {
  id: string;
  reservationCode: string;
  createdAt: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  savedAddresses: {
    label: string;
    street: string;
    city: string;
    zipCode: string;
  }[];
  favoriteItemIds: string[];
  loyaltyPoints: number;
  memberSince: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title?: string;
  message: string;
}

export type PageView = 
  | 'home'
  | 'menu'
  | 'item-detail'
  | 'cart'
  | 'checkout'
  | 'reservations'
  | 'my-orders'
  | 'my-reservations'
  | 'restaurant-info'
  | 'contact'
  | 'customer-dashboard'
  | 'admin-dashboard';
