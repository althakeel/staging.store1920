import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../../../../../contexts/CartContext';
import 'react-toastify/dist/ReactToastify.css';

const ProcessingOrders = ({
  orders,
  cancellingOrderId,
  cancelOrder,
  handleProductClick,
  slugify,
  isCancelable,
}) => {
  const [buyingAgainOrderId, setBuyingAgainOrderId] = useState(null);
  const { addToCart } = useCart();

  const handleBuyAgain = async (lineItems, orderId) => {
    try {
      setBuyingAgainOrderId(orderId);
      for (const item of lineItems) {
        addToCart(
          {
            id: item.product_id,
            name: item.name,
            quantity: item.quantity,
            variation: item.variation || [],
            price: item.price,
            image: item.image?.src,
          },
          false
        );
      }
      toast.success('Items added to cart!');
    } catch (err) {
      toast.error('Failed to add items to cart');
    } finally {
      setBuyingAgainOrderId(null);
    }
  };

  if (orders.length === 0) {
    return <p>No processing orders found.</p>;
  }

  return (
    <div className="processing-orders" style={{ maxWidth: 800, margin: '0 auto' }}>
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />
      {orders
        .filter((o) => o.status === 'processing')
        .map((order) => (
          <div
            key={order.id}
            className="order-card-simple"
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 16,
              marginBottom: 24,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <div
              style={{
                marginBottom: 12,
                fontSize: 16,
                color: '#333',
                fontWeight: '600',
              }}
            >
              <span>
                Order ID: <span style={{ color: '#0070f3' }}>PO-{order.id}</span>
              </span>{' '}
              |{' '}
              <span>
                Date:{' '}
                <span style={{ color: '#666' }}>
                  {new Date(order.date_created).toLocaleDateString()}
                </span>
              </span>
            </div>
            <div
              className="order-items-grid-simple"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 16,
              }}
            >
              {order.line_items.map((item) => (
                <div
                  key={item.id}
                  className="order-product-simple"
                  onClick={() => handleProductClick(slugify(item.name))}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleProductClick(slugify(item.name));
                  }}
                  style={{
                    cursor: 'pointer',
                    width: 100,
                    textAlign: 'center',
                    border: '1px solid #eee',
                    borderRadius: 6,
                    padding: 8,
                    backgroundColor: '#fafafa',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={item.image?.src || 'https://via.placeholder.com/100'}
                    alt={item.name}
                    style={{ width: '100%', height: 80, objectFit: 'contain', marginBottom: 6 }}
                  />
                  <div style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>
                    {order.currency} {item.price}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn-secondary"
                onClick={() => handleBuyAgain(order.line_items, order.id)}
                disabled={buyingAgainOrderId === order.id}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#0070f3',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 4,
                  fontWeight: '600',
                  cursor: buyingAgainOrderId === order.id ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!buyingAgainOrderId) e.currentTarget.style.backgroundColor = '#005bb5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0070f3';
                }}
              >
                {buyingAgainOrderId === order.id ? 'Adding...' : 'Buy this again'}
              </button>
              {isCancelable(order.status) && (
                <button
                  className="btn-secondary"
                  onClick={() => cancelOrder(order.id)}
                  disabled={cancellingOrderId === order.id}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    backgroundColor: '#e00',
                    border: 'none',
                    color: '#fff',
                    borderRadius: 4,
                    fontWeight: '600',
                    cursor: cancellingOrderId === order.id ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!cancellingOrderId) e.currentTarget.style.backgroundColor = '#a00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e00';
                  }}
                >
                  {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel items'}
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProcessingOrders;
