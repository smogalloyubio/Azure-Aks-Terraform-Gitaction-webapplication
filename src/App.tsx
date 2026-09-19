import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { MobileCartBar } from './components/MobileCartBar';
import { FoodDetailModal } from './components/FoodDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { MyReservationsPage } from './pages/MyReservationsPage';
import { RestaurantInfoPage } from './pages/RestaurantInfoPage';
import { ContactPage } from './pages/ContactPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentPage, isAdminView } = useApp();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    if (isAdminView) {
      return <AdminDashboard />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'reservations':
        return <ReservationsPage />;
      case 'my-orders':
        return <MyOrdersPage />;
      case 'my-reservations':
        return <MyReservationsPage />;
      case 'restaurant-info':
        return <RestaurantInfoPage />;
      case 'contact':
        return <ContactPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderPage()}
      </main>

      {/* Footer (hidden in admin mode for compact terminal view) */}
      {!isAdminView && <Footer />}

      {/* Sticky Mobile Cart Bar */}
      <MobileCartBar />

      {/* Global Food Item Detail Modal */}
      <FoodDetailModal />

      {/* Notification Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
