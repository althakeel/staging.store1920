import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../../assets/styles/myaccount/OrderSection.css';
import AllOrders from './sub/Orders';
import ProcessingOrders from './sub/processingorder';
import ShippedOrder from './sub/shippedorder';
import OrderDelivered from './sub/OrderDelivered';
import OrderReturns from './sub/OrderReturns';


const API_BASE_URL = 'https://db.store1920.com/wp-json/wc/v3/orders';
const API_AUTH = {
  username: 'ck_5441db4d77e2a329dc7d96d2db6a8e2d8b63c29f',
  password: 'cs_81384d5f9e75e0ab81d0ea6b0d2029cba2d52b63',
};

const CART_API_URL = 'https://db.store1920.com/wp-json/cocart/v2/cart/add-item';

const OrderSection = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const navigate = useNavigate();

  const orderStatuses = [
    { label: 'All orders', value: '' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'completed' },
    { label: 'Returns', value: 'refunded' },
  ];

  const fetchOrders = async () => {
    if (!userId) {
      setError('User not logged in.');
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = { customer: userId };

      // WooCommerce API doesn't support shipped filter directly
      if (activeStatus && activeStatus !== 'shipped') {
        params.status = activeStatus;
      }

      const response = await axios.get(API_BASE_URL, {
        auth: API_AUTH,
        params,
      });

      let fetchedOrders = response.data || [];

      // Client-side filtering for shipped
      if (activeStatus === 'shipped') {
        fetchedOrders = fetchedOrders.filter(order => order.status === 'shipped');
      }

      setOrders(fetchedOrders);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Unknown error';
      setError(`Failed to load orders: ${message}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeStatus, userId]);

  const handleSearch = async () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);

    try {
      const orderId = trimmed.replace(/^PO-/, '');
      const response = await axios.get(`${API_BASE_URL}/${orderId}`, {
        auth: API_AUTH,
      });

      if (response.data.customer_id !== userId) {
        alert('Order not found or access denied.');
        setOrders([]);
      } else {
        setOrders([response.data]);
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(`Search failed: ${message}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };


  const handleViewOrderDetails = (order) => {
    // navigate to a detailed order page, or open a modal
    navigate(`/order/${order.id}`);
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    setCancellingOrderId(orderId);
    try {
      await axios.put(
        `${API_BASE_URL}/${orderId}`,
        { status: 'cancelled' },
        { auth: API_AUTH }
      );

      alert(`Order #${orderId} has been cancelled.`);
      setOrders(prev =>
        prev.map(order => (order.id === orderId ? { ...order, status: 'cancelled' } : order))
      );
    } catch (err) {
      alert('Failed to cancel the order. Please try again.');
      console.error(err);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setActiveStatus('');
  };

  const slugify = text =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleProductClick = slug => {
    navigate(`/product/${slug}`);
  };

  const isCancelable = status => ['processing', 'on-hold'].includes(status);

  const handleBuyAgain = async items => {
    try {
      for (const item of items) {
        await axios.post(CART_API_URL, {
          id: item.product_id,
          quantity: item.quantity,
        });
      }
      navigate('/checkout');
    } catch (error) {
      alert('Failed to add items to cart.');
      console.error(error);
    }
  };

  const renderOrdersByStatus = () => {
    switch (activeStatus) {
      case 'processing':
        return (
          <ProcessingOrders
            orders={orders}
            cancellingOrderId={cancellingOrderId}
            cancelOrder={cancelOrder}
            handleProductClick={handleProductClick}
            slugify={slugify}
            isCancelable={isCancelable}
          />
        );

      case 'shipped':
        return (
          <ShippedOrder
            orders={orders}
            cancellingOrderId={cancellingOrderId}
            cancelOrder={cancelOrder}
            handleProductClick={handleProductClick}
            slugify={slugify}
            isCancelable={isCancelable}
            onOrdersUpdated={fetchOrders}
          />
        );

      case 'completed':
        return (
          <OrderDelivered
          orders={orders}
          handleProductClick={handleProductClick}
          slugify={slugify}
          viewOrderDetails={handleViewOrderDetails}
        />
        );

      case 'refunded':
        return (
          <OrderReturns
          orders={orders}
          handleProductClick={handleProductClick}
          slugify={slugify}
          isCancelable={isCancelable} // <-- make sure this is a function
          cancelOrder={cancelOrder}
        />
        );

      default:
        return (
          <AllOrders
            orders={orders}
            cancellingOrderId={cancellingOrderId}
            cancelOrder={cancelOrder}
            handleProductClick={handleProductClick}
            slugify={slugify}
            isCancelable={isCancelable}
            onOrdersUpdated={fetchOrders}
          />
        );
    }
  };

  return (
    <div className="order-section">
      <div className="order-header">
        <h2>Your Orders</h2>
        <div className="order-search">
          <input
            type="text"
            placeholder="Search by Order ID (e.g. PO-12345)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="scoped-search-icon12"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {searchTerm && (
            <button className="reset-search" onClick={handleResetSearch}>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="order-tabs">
        {orderStatuses.map(({ label, value }) => (
          <button
            key={value || 'all'}
            className={`tab-button ${activeStatus === value ? 'active' : ''}`}
            onClick={() => setActiveStatus(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
      {!loading && !error && orders.length > 0 && renderOrdersByStatus()}
    </div>
  );
};

export default OrderSection;
