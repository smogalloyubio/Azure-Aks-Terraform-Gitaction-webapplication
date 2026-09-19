# Table & Taste - Artisanal Restaurant Web Application

**Table & Taste** is a restaurant web application representing a culinary business anchored by wood-fired hearth cooking, California farm-to-table provenance, and warm hospitality.

## Key Features & Pages

1. **Home Page (`HomePage.tsx`)**
   - Immersive hero section with quick booking & online ordering CTAs
   - Today's Chef Specials with live badges
   - Popular categories carousel & navigation
   - Featured culinary creations showcase
   - Restaurant philosophy & heritage preview
   - Live opening hours, service status, and customer reviews with verified badges
   - Location, valet, and contact card

2. **Artisanal Menu (`MenuPage.tsx`)**
   - 8 Culinary Categories: Starters, Main Courses, Burgers, Pizza, Pasta, Salads, Desserts, Drinks
   - Instant search across dishes and descriptions
   - Dietary & preference filters (All, Vegetarian only, Chef's Specials, Spicy only)
   - Price range and sorting filters (Featured, Price: Low to High, Price: High to Low, Highest Rated)
   - Detailed food cards with dietary indicators, pricing, ratings, and instant add-to-cart

3. **Food Item Details Modal (`FoodDetailModal.tsx`)**
   - High-resolution culinary photography
   - Dietary indicators (Vegetarian, Spicy, Gluten-Friendly, Chef Special)
   - Custom culinary options (e.g., steak temperatures, pasta options, truffle additions)
   - Special instructions text input for the hearth brigade
   - Quantity selector and real-time total calculation

4. **Dining Cart (`CartPage.tsx`)**
   - Itemized cart line items with custom options & kitchen notes
   - In-place note editing and quantity increments/decrements
   - Promo voucher application (`TASTE10`, `WELCOME`)
   - Transparent financial breakdown: Subtotal, Delivery fee calculation ($3.99, free over $50), 9% tax, gratuity, and discounts

5. **Checkout & Fulfillment (`CheckoutPage.tsx`)**
   - Fulfillment selection: Direct Delivery (~35 mins) vs. Restaurant Pickup (~15 mins)
   - Delivery address fields with suite/apt and delivery gate codes
   - Kitchen & Courier Gratuity selector (10%, 15%, 20%, 25%, or custom $)
   - Payment method selection: Credit Card, Apple / Google Pay, or Pay on Arrival
   - Mock payment authorization simulation with state transitions
   - Instant order confirmation ticket and direct redirection to live order tracker

6. **Table Reservations (`ReservationsPage.tsx`)**
   - Date selector with party size picker (1 to 12+ guests)
   - Interactive time slot selector with availability indicators (`Available`, `2 Left`, `Sold Out`)
   - Seating atmosphere preferences: Main Dining Hall, Heated Garden Terrace, Chef's Interactive Counter, Private Velvet Booth
   - Occasion selector and dietary/accessibility notes
   - Instant booking confirmation ticket with reference code

7. **My Orders & Live Tracker (`MyOrdersPage.tsx`)**
   - Active and past order history
   - Real-time 4-stage kitchen order progress tracker (`Order Received` -> `Hearth Cooking` -> `Out for Delivery` -> `Delivered`)
   - Printable / digital itemized receipt viewer modal
   - One-click reorder functionality to refill cart

8. **My Reservations (`MyReservationsPage.tsx`)**
   - Active upcoming and historical table bookings
   - Party size, seating area, date, time, and special requests display
   - Reservation cancellation capability

9. **Customer Dashboard (`CustomerDashboard.tsx`)**
   - Overview metrics: active orders, upcoming reservations, lifetime spend, and saved dishes
   - Loyalty rewards points counter and credit redemption balance
   - Saved favorite dishes shelf with instant add-to-cart
   - Editable account profile and saved address management

10. **Restaurant Admin Operations (`AdminDashboard.tsx`)**
    - Executive terminal with daily gross revenue, orders processed, table bookings, and kitchen status
    - 7-Day interactive revenue performance chart and category sales distribution
    - Live order status pipeline manager (`pending` -> `preparing` -> `ready` -> `on_the_way` -> `delivered` -> `cancelled`)
    - Table reservation seating manager (`confirmed` -> `seated` -> `completed` -> `cancelled`)
    - Menu inventory controller: instant stock toggling (`In Stock` / `Sold Out`), inline price editing, and add new dish modal
    - VIP customer directory with loyalty balance and lifetime spend

11. **Restaurant Information (`RestaurantInfoPage.tsx`)**
    - The Wood Hearth tradition and cooking philosophy
    - Three gastronomic pillars: Farm-to-Table, Zero Shortcut Butchery, Low-Intervention Cellar
    - Executive Chef profile and private dining & event buyout inquiries

12. **Contact & Location (`ContactPage.tsx`)**
    - Interactive message dispatch form with inquiry categories
    - Operating hours, address, phone, and email
    - Valet parking, EV charging, and arrival instructions

## Tech Stack
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS with custom typography (`Playfair Display` serif & `Plus Jakarta Sans`)
- **State Management:** Centralized React Context (`AppContext.tsx`) with automatic `localStorage` persistence
- **Icons:** `lucide-react`
