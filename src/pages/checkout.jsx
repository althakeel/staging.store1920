// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CheckoutLeft from '../components/CheckoutLeft';
import CheckoutRight from '../components/CheckoutRight';
// import SignInModal from '../components/sub/SignInModal';
import '../assets/styles/checkout.css';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CK = 'ck_e09e8cedfae42e5d0a37728ad6c3a6ce636695dd';
const CS = 'cs_2d41bc796c7d410174729ffbc2c230f27d6a1eda';

const fetchWithAuth = async (endpoint, options = {}) => {
  const url = `${API_BASE}/${endpoint}`;
  const authHeader = 'Basic ' + btoa(`${CK}:${CS}`);
  const fetchOptions = {
    ...options,
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  try {
    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn(`API Error [${endpoint}]:`, errData.message || `Status ${res.status}`);
      throw new Error(errData.message || `Request failed with status ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Log network errors but don't show them to users
    if (error.message.includes('fetch')) {
      console.warn(`Network error for ${endpoint}:`, error.message);
      throw new Error('Network connection issue. Please check your internet connection.');
    }
    throw error;
  }
};



const sanitizeField = (value) => (value && value.trim() ? value : 'NA');

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems: contextCartItems, clearCart } = useCart();
  const { user } = useAuth(); 

    const LOCAL_STORAGE_KEY = 'checkoutFormData';


  const [cartItems, setCartItems] = useState([]);
  const [countries, setCountries] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    shipping: {
      first_name: '',
      last_name: '',
      email: '',
      street: '',
      apartment: '',
      floor: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'AE',
      phone_number: '971',
    },
    billing: {
      first_name: '',
      last_name: '',
      email: '',
      street: '',
      apartment: '',
      floor: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'AE',
      phone_number: '971',
    },
    billingSameAsShipping: true,
    paymentMethod: 'cod',
    paymentMethodTitle: 'Cash On Delivery',
    paymentMethodLogo: null,
    shippingMethodId: null,
  });

  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [showSignInModal, setShowSignInModal] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'info' });
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch {}
    }
  }, []);


  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: 'info' }), 4000);
  };

  // Auto-fill formData email when user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        shipping: { ...prev.shipping, email: user.email || prev.shipping.email },
        billing: { ...prev.billing, email: user.email || prev.billing.email },
      }));
    }
  }, [user]);

  // Auto-fetch saved addresses if user is logged in
useEffect(() => {
  if (!user?.id) return;

  const LOCAL_STORAGE_KEY = 'checkoutFormData';

  const loadAddresses = async () => {
    // 1. Try to load from localStorage first
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
        return; // Stop here, don't fetch from WooCommerce
      } catch (err) {
        console.warn('Failed to parse saved checkout data:', err);
      }
    }

    // 2. Fetch from WooCommerce if no localStorage data
    try {
      const customer = await fetchWithAuth(`customers/${user.id}`);
      if (customer) {
        const fetchedData = {
          billing: {
            first_name: customer.billing.first_name || '',
            last_name: customer.billing.last_name || '',
            email: customer.billing.email || '',
            street: customer.billing.address_1 || '',
            apartment: customer.billing.address_2 || '',
            floor: '',
            city: customer.billing.city || '',
            state: customer.billing.state || '',
            postal_code: customer.billing.postcode || '',
            country: customer.billing.country || 'AE',
            phone_number: customer.billing.phone || '971',
          },
          shipping: {
            first_name: customer.shipping.first_name || '',
            last_name: customer.shipping.last_name || '',
            email: customer.email || '',
            street: customer.shipping.address_1 || '',
            apartment: customer.shipping.address_2 || '',
            floor: '',
            city: customer.shipping.city || '',
            state: customer.shipping.state || '',
            postal_code: customer.shipping.postcode || '',
            country: customer.shipping.country || 'AE',
            phone_number: '971',
          },
          billingSameAsShipping: true,
          paymentMethod: 'cod',
          paymentMethodTitle: 'Cash On Delivery',
          paymentMethodLogo: null,
          shippingMethodId: null,
        };

        setFormData(fetchedData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedData));
      }
    } catch (err) {
      console.warn('Could not load saved addresses:', err.message);
      // Silently fail - use default form data
    }
  };

  loadAddresses();
}, [user]);


  // Fetch cart product details
  useEffect(() => {
    if (!contextCartItems.length) return setCartItems([]);
    const fetchProducts = async () => {
      try {
       const details = await Promise.all(
  contextCartItems.map(async (item) => {
    const prod = await fetchWithAuth(`products/${item.id}`);
    return {
      ...item,
      price: parseFloat(prod.price) || 0,
      inStock: prod.stock_quantity > 0,
      name: prod.name,
    };
  })
);
        setCartItems(details);
      } catch {
        setCartItems(contextCartItems.map(i => ({ ...i, price: i.price || 0, inStock: true })));
      }
    };
    fetchProducts();
  }, [contextCartItems]);

  // Fetch countries and payment methods
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesData, paymentsData] = await Promise.all([
          fetchWithAuth('data/countries'),
          fetchWithAuth('payment_gateways'),
        ]);
        setCountries(countriesData);
        setPaymentMethods(paymentsData);
      } catch (err) {
        console.warn('Failed to load checkout data:', err.message);
        // Set default values instead of showing error to user
        setCountries([]);
        setPaymentMethods([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle payment redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('payment_success');
    const failed = params.get('payment_failed');
    const orderIdFromUrl = params.get('order_id');

    if (success && orderIdFromUrl) {
      fetchWithAuth(`orders/${orderIdFromUrl}`, { method: 'PUT', body: JSON.stringify({ set_paid: true }) })
        .then(() => {
          clearCart();
          navigate(`/order-success?order_id=${orderIdFromUrl}`);
        });
    }

    if (failed && orderIdFromUrl) {
      fetchWithAuth(`orders/${orderIdFromUrl}`, { method: 'PUT', body: JSON.stringify({ status: 'cancelled' }) })
        .then(() => showAlert('Payment failed. Order was cancelled.', 'error'));
    }
  }, []);

  const handlePaymentSelect = (id, title, logo) => {
    setFormData(prev => ({ 
      ...prev, 
      paymentMethod: id, 
      paymentMethodTitle: title,
      paymentMethodLogo: logo 
    }));
  };

  const createOrder = async () => {
    const shipping = formData.shipping;
    const billing = formData.billingSameAsShipping ? shipping : formData.billing;
    const line_items = cartItems.map(i => ({ product_id: i.id, quantity: i.quantity }));
    const userId = user?.id;

    // City code mapping
    const cityCodeMap = {
      abudhabi: 'auh',
      dubai: 'dxb',
      sharjah: 'shj',
      ajman: 'ajm',
      fujairah: 'fjr',
      ummalquwain: 'uaq',
      rasalkhaimah: 'rak',
      // add more as needed
    };

    const getCityCode = (cityName) => {
      if (!cityName) return '';
      const key = cityName.replace(/\s+/g, '').toLowerCase();
      return cityCodeMap[key] || cityName;
    };

    const payload = {
      payment_method: formData.paymentMethod,
      payment_method_title: formData.paymentMethodTitle,
      set_paid: false,
      billing: {
        first_name: billing.first_name,
        last_name: billing.last_name,
        address_1: billing.street,
        address_2: sanitizeField(billing.apartment),
        city: getCityCode(billing.city),
        state: billing.state,
        postcode: billing.postal_code,
        country: billing.country,
        phone: billing.phone_number,
        email: billing.email,
        floor: sanitizeField(billing.floor),
      },
      shipping: {
        first_name: shipping.first_name,
        last_name: shipping.last_name,
        address_1: shipping.street,
        address_2: sanitizeField(shipping.apartment),
        city: getCityCode(shipping.city),
        state: shipping.state,
        postcode: shipping.postal_code,
        country: shipping.country,
        phone: shipping.phone_number,
        email: shipping.email,
        floor: sanitizeField(shipping.floor),
      },
      line_items,
      shipping_lines: formData.shippingMethodId ? [{ method_id: formData.shippingMethodId }] : [],
meta_data: [
  { key: '_from_react_checkout', value: true },  // instead of '1'
  { 
    key: '_react_order_products', 
    value: JSON.stringify(cartItems.map(i => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity
    })))
  },
  {
    key: '_react_customer_name',
    value: `${billing.first_name} ${billing.last_name}`
  }
],

      ...(userId ? { customer_id: parseInt(userId, 10) } : { create_account: true }),
    };

      console.log('💡 WooCommerce Order Payload:', payload);


    const order = await fetchWithAuth('orders', { method: 'POST', body: JSON.stringify(payload) });
    if (!userId && order.customer_id) localStorage.setItem('userId', order.customer_id);
    setOrderId(order.id);
    return order;
  };

  const handlePlaceOrder = async () => {
    setError('');
    try {
      const order = orderId ? await fetchWithAuth(`orders/${orderId}`) : await createOrder();
      setOrderId(order.id);

      if (formData.paymentMethod === 'cod') {
        clearCart();
        navigate(`/order-success?order_id=${order.id}`);
      } else if (formData.paymentMethod === 'paymob_accept') {
        if (order.payment_url) window.location.href = order.payment_url;
        else throw new Error('Paymob payment URL not found. Check plugin setup.');
      } else {
        throw new Error('Unsupported payment method selected.');
      }
    } catch (err) {
      setError(err.message || 'Failed to place order.');
    }
  };

<div className="checkoutPageWrapper" style={{ minHeight: '40vh' }}>
  {loading && (
    <div className="checkoutLoader">
      <div className="loaderSpinner"></div>
      <div>Loading Checkout...</div>
    </div>
  )}

  <div className="checkoutGrid" style={{ minHeight: '100vh', overflowY: 'auto', opacity: loading ? 0.3 : 1 }}>
    <CheckoutLeft
      countries={countries}
      cartItems={cartItems}
      subtotal={subtotal}
      orderId={orderId}
      formData={formData}
      setFormData={setFormData}
      handlePlaceOrder={handlePlaceOrder}
      createOrder={createOrder}
    />
    <CheckoutRight
      cartItems={cartItems}
      formData={formData}
      orderId={orderId}
      createOrder={createOrder}
      clearCart={() => setCartItems([])}
      handlePlaceOrder={handlePlaceOrder}
      subtotal={subtotal}
    />
  </div>
</div>

  // return (
  //   <>
  //     <div className="checkoutGrid" style={{ minHeight: '100vh', overflowY: 'auto' }}>
  //       <CheckoutLeft
  //         countries={countries}
  //         cartItems={cartItems}
  //         subtotal={subtotal}
  //         orderId={orderId}
  //         formData={formData}
  //         setFormData={setFormData}
  //         handlePlaceOrder={handlePlaceOrder}
  //         createOrder={createOrder}
  //       />
  //       <CheckoutRight
  //         cartItems={cartItems}
  //         formData={formData}
  //         orderId={orderId}
  //         createOrder={createOrder}
  //         clearCart={() => setCartItems([])}
  //         handlePlaceOrder={handlePlaceOrder}
  //         subtotal={subtotal}
  //       />
  //     </div>

  //     {alert.message && <div className={`checkout-alert ${alert.type}`}>{alert.message}</div>}

  //     {showSignInModal && (
  //       <SignInModal
  //         onClose={() => setShowSignInModal(false)}
  //         onLoginSuccess={() => setShowSignInModal(false)}
  //       />
  //     )}

  //     {error && <div className="error-message">{error}</div>}
  //   </>
  // );

return (
  <>
    <div className="checkoutGrid" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <CheckoutLeft
        countries={countries}
        cartItems={cartItems}
        subtotal={subtotal}
        orderId={orderId}
        formData={formData}
        setFormData={setFormData}
        handlePlaceOrder={handlePlaceOrder}
        createOrder={createOrder}
      />
      <CheckoutRight
        cartItems={cartItems}
        formData={formData}
        orderId={orderId}
        createOrder={createOrder}
        clearCart={() => setCartItems([])}
        handlePlaceOrder={handlePlaceOrder}
        subtotal={subtotal}
      />
    </div>

    {alert.message && <div className={`checkout-alert ${alert.type}`}>{alert.message}</div>}

    {error && <div className="error-message">{error}</div>}
  </>
);




}
