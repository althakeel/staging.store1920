import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../../../../../contexts/CartContext';
import 'react-toastify/dist/ReactToastify.css';

const ShippedOrder = ({
  orders,
  cancellingOrderId,
  cancelOrder,          // Might not be used here, but keeping for prop consistency
  handleProductClick,
  slugify,
  isCancelable,         // Might not be used here
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
    return <p>No shipped orders found.</p>;
  }

  return (
    <div className="shipped-orders">
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />
      {orders
        .filter((o) => o.status === 'shipped')
        .map((order) => (
          <div key={order.id} className="order-card-simple">
            <div>
              <strong>Order ID:</strong> PO-{order.id} | <strong>Date:</strong>{' '}
              {new Date(order.date_created).toLocaleDateString()}
            </div>
            <div className="order-items-grid-simple">
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
                >
                  <img src={item.image?.src || 'https://via.placeholder.com/100'} alt={item.name} />
                  <div>
                    {order.currency} {item.price}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-secondary"
              onClick={() => handleBuyAgain(order.line_items, order.id)}
              disabled={buyingAgainOrderId === order.id}
            >
              {buyingAgainOrderId === order.id ? 'Adding...' : 'Buy this again'}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShippedOrder;
