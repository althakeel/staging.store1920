// App.js
import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { CartProvider, useCart } from './contexts/CartContext';
import { CompareProvider } from './contexts/CompareContext';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/checkout';
import NotFound from './pages/NotFound';
import Myaccount from './pages/myaccount';
import Wishlist from './pages/Whislist';
import Lightningdeal from './pages/lightningdeal';
import ComparePage from './pages/compare';
import Categories from './pages/Categories';
import AllProducts from './pages/allproducts';
import New from './pages/New';
import Rated from './pages/rated';
import SupportPage from './pages/Support';
import SafetyCenter from './pages/SafetyCenter';
import PurchaseProtection from './pages/PurchaseProtection';
import PartnerWithUs from './pages/partnerwithus';
import Returnandrefundpolicy from './pages/Returnandrefundpolicy';
import About from './pages/about';
import Shippinginfo from './pages/shippinginfo';
import Intellectualproperty from './pages/intellectual-property-policy';
import PrivacyPolicy from './pages/privacy-policy';
import Terms0fuse from './pages/TermsOfuse';
import OrderSuccess from './pages/OrderSuccess';
import TrackOrder from './pages/track-order';
import Festsale from './pages/Festsale';
import SeasonSale from './pages/seasonsale';
import CookiesSettings from './pages/CookiesSettingsPage';
import LostPassword from './pages/lost-password';
import MyCoins from './pages/my-coins';
import TopSellingitems from './pages/topselling';
import CategoryPageid from './pages/CategoryPage';
import Contact from './pages/contact';
import Search from './pages/search';
import PaymobSuccess from './pages/PaymobSuccess';
import PaymobCheckoutPage from './pages/PaymobCheckoutPage';
import StaticProductDetails from './pages/StaticProductDetails';
import ProductRouteWrapper from './pages/ProductRouteWrapper '
import CustomCheckout from './pages/adcheckout'
import Fastdelivery from './pages/Fastdelivery';


// Components
import Topbar from './components/topbar';
import NavbarWithMegaMenu from './components/NavbarMain';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import MiniCart from './components/MiniCart';
import ProtectedRoute from './components/ProtectedRoute';
import CheckoutNavbar from './components/checkout/CheckoutNavbar';
import MobileBottomNav from './components/MobileBottomNav';
import MobileNavbar from './components/Mobile/MobileNavbar';
import ChatBot from './components/sub/Chatbot';
import CookiePopup from './components/common/CookiePopup';
import PurchasePopup from './components/common/PurchasePopup';
import SoundAlert from './assets/sound/alertsound.mp3';
import LogoIcon from './assets/images/logo.webp';
import AdsImage from './assets/images/ads/ads.webp'
import NewUserBonusPopup from './components/common/newpopup';


const AppContent = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();
  const location = useLocation();
  const path = location.pathname;
  const cartIconRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const CLIENT_ID = "387544567110-hjjhf6sapjq6k35hgoki34kq5c2b6j51.apps.googleusercontent.com";


  // Update mobile flag on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Notification effect in AppContent
  useEffect(() => {
    if (!("Notification" in window)) return; // Browser doesn't support notifications

    let promoInterval;
    let promoIndex = 0;

    // Array of promotional items
    const promotions = [
      {
        title: "🔥 Limited Offer!",
        body: "Buy now – 80% off on this product!",
        image: `${window.location.origin}/promo-product1.jpg`,
      },
      {
        title: "🎁 Special Deal!",
        body: "Grab 50% off on our best-seller!",
        image: AdsImage,
      },
      {
        title: "💥 Flash Sale!",
        body: "Hurry! 50% off on selected items!",
        image: AdsImage,
      },
    ];

    const showPromoNotification = () => {
      if (Notification.permission === "granted") {
        const promo = promotions[promoIndex];

        const notification = new Notification(promo.title, {
          body: promo.body,
          icon: `${window.location.origin}/logo.webp`,
          image: promo.image,
          requireInteraction: true,
        });

        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000);

        notification.onclick = () => {
          window.focus();
          window.location.href = "/allproducts"; // Redirect to promo page
        };

        // Cycle to the next promotion for next notification
        promoIndex = (promoIndex + 1) % promotions.length;
      }
    };

    // Request permission on first user interaction
    const requestPermission = () => {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }
      window.removeEventListener("click", requestPermission);
    };
    window.addEventListener("click", requestPermission);

    // Show immediately on first load
    showPromoNotification();

    // Repeat every 10 minutes
    promoInterval = setInterval(showPromoNotification, 10 * 60 * 1000);

    return () => {
      clearInterval(promoInterval);
      window.removeEventListener("click", requestPermission);
    };
  }, []);


  // Cart notification logic
  // Cart notification logic
  useEffect(() => {
    if (!("Notification" in window)) return; // Browser doesn't support notifications

    let notificationTimeout;
    let notificationInterval;

    const showCartNotification = () => {
      if (Notification.permission === 'granted' && cartItems?.length > 0) {
        const notification = new Notification('Cart Reminder', {
          body: `You have ${cartItems.length} pending item(s) in your cart!`,
          icon: `${window.location.origin}/logo.webp`,
          image: cartItems[0]?.image,
        });
        const audio = new Audio(SoundAlert);
        audio.play().catch(() => console.log('Audio blocked until user interacts'));

        notification.onclick = () => {
          window.focus();
          window.location.href = '/cart';
        };
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && cartItems?.length > 0) {
        // Start timer 30 sec after tab hidden
        notificationTimeout = setTimeout(() => {
          showCartNotification();
          // Repeat every 15 min
          notificationInterval = setInterval(showCartNotification, 15 * 60 * 1000);
        }, 30 * 1000);
      } else {
        // Tab is active: clear timers
        clearTimeout(notificationTimeout);
        clearInterval(notificationInterval);
      }
    };

    // Request permission on first user interaction if not granted
    const requestPermission = () => {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      window.removeEventListener('click', requestPermission);
    };
    window.addEventListener('click', requestPermission);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearTimeout(notificationTimeout);
      clearInterval(notificationInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('click', requestPermission);
    };
  }, [cartItems]);


  const excludeMiniCartPaths = ['/cart', '/checkout', '/lost-password', '/order-success'];

  const shouldShowMiniCart =
    !isMobile &&
    isCartOpen &&
    !excludeMiniCartPaths.some(
      (excludedPath) => path === excludedPath || path.startsWith(`${excludedPath}/`)
    );

  const isHomePage = path === '/';
  const isSupportPage = path === '/support';
  const isFestSalePage = path === '/fest-sale';
  const isSeasonSalePage = path === '/season-sale';
  const onCheckoutPage = path === '/checkout' || path.startsWith('/checkout/');

  const queryClient = new QueryClient();

  // Close cart if navigating to excluded paths
  useEffect(() => {
    if (
      excludeMiniCartPaths.some(
        (excludedPath) => path === excludedPath || path.startsWith(`${excludedPath}/`)
      ) &&
      isCartOpen
    ) {
      setIsCartOpen(false);
    }
  }, [path, excludeMiniCartPaths, isCartOpen, setIsCartOpen]);

  return (
    <ThemeProvider>
<GoogleOAuthProvider clientId={CLIENT_ID}>
          <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <>
              {!isMobile && <Topbar />}
              {onCheckoutPage ? (
                <CheckoutNavbar />
              ) : isMobile ? (
                <MobileNavbar
                  openCart={() => setIsCartOpen(true)}
                  isCartOpen={isCartOpen}
                  cartIconRef={cartIconRef}
                />
              ) : (
                <NavbarWithMegaMenu
                  openCart={() => {
                    if (!isMobile) setIsCartOpen(true);
                  }}
                  isCartOpen={isCartOpen}
                  cartIconRef={cartIconRef}
                />
              )}

              <div style={{ display: 'flex', position: 'relative' }}>
                <main
                  style={{
                    width: shouldShowMiniCart ? 'calc(100% - 250px)' : '100%',
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                    background: '#fff',
                  }}
                >
                  {!isHomePage && !isFestSalePage && !isSeasonSalePage && !isSupportPage && <Breadcrumbs />}

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:slug" element={<ProductDetails />} />
                   {/* <Route path="/product/:slug" element={<ProductRouteWrapper />} />  */}

                    <Route path="/cart" element={<CartPage />} />
                    {/* <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      }
                    /> */}


                      <Route
                      path="/checkout"
                      element={
                      
                          <CheckoutPage />
                
                      }
                    />

                    <Route
                      path="/myaccount/*"
                      element={
                        <ProtectedRoute>
                          <Myaccount />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/lightningdeal" element={<Lightningdeal />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/category" element={<Categories />} />
                    {/* <Route path="/category/:id" element={<CategoryPageid />} /> */}
                    <Route path="/category/:slug" element={<CategoryPageid />} />

                    
                     <Route path="/products/:slug" element={<StaticProductDetails />} />


                    <Route path="/allproducts" element={<AllProducts />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/rated" element={<Rated />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/safetycenter" element={<SafetyCenter />} />
                    <Route path="/purchaseprotection" element={<PurchaseProtection />} />
                    <Route path="/partnerwithus" element={<PartnerWithUs />} />
                    <Route path="/returnandrefundpolicy" element={<Returnandrefundpolicy />} />
                    {/* SEO-friendly alias */}
                    <Route path="/return-policy" element={<Returnandrefundpolicy />} />
                    <Route path="/Intellectual-property-policy" element={<Intellectualproperty />} />
                    <Route path="/shippinginfo" element={<Shippinginfo />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-0f-use" element={<Terms0fuse />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/fest-sale" element={<Festsale />} />
                    <Route path="/season-sale" element={<SeasonSale />} />
                    <Route path="/cookies-settings" element={<CookiesSettings />} />
                    <Route path="/lost-password" element={<LostPassword />} />
                    <Route path="/my-coins" element={<MyCoins />} />
                    <Route path="/top-selling-item" element={<TopSellingitems />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="search" element={<Search />} />

                    <Route path="fast-delivery" element={<Fastdelivery />} />
                    <Route path="/payment-success" element={<PaymobSuccess />} />
                    <Route path="/paymob-checkout" element={<PaymobCheckoutPage />} />
                        <Route path="/adscheckout" element={<CustomCheckout />} />

                  </Routes>
                </main>

                {shouldShowMiniCart && (
                  <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                )}
              </div>

              {!isMobile && <PurchasePopup />}
{!path.startsWith('/products/') && !path.startsWith('/checkout') && <CookiePopup />}
       <ChatBot />
{isHomePage && <NewUserBonusPopup />}
              <Footer />

           {isMobile &&
  !excludeMiniCartPaths.some(
    (excludedPath) => path === excludedPath || path.startsWith(`${excludedPath}/`)
  ) &&
  !path.startsWith('/product/') &&
  !path.startsWith('/products/') && <MobileBottomNav />}

            </>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <CookieConsentProvider>
          <Router>
            <AppContent />
          </Router>
        </CookieConsentProvider>
      </CompareProvider>
    </CartProvider>
  );
}
