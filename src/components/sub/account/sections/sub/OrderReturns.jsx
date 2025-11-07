import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../../../../../contexts/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../../assets/styles/myaccount/AllOrders.css';
import axios from 'axios';

const returnReasons = [
  'Wrong item delivered',
  'Item damaged or defective',
  'Quality not as expected',
  'Received late',
  'Item not as described',
  'Size or color mismatch',
  'Product missing accessories',
  'Better price available elsewhere',
  'Changed mind / No longer needed',
  'Duplicate order',
  'Other',
];

const OrderReturns = ({ orders, handleProductClick, slugify, isCancelable, cancelOrder }) => {
  const [buyingAgainOrderId, setBuyingAgainOrderId] = useState(null);
  const [returningOrder, setReturningOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const { addToCart } = useCart();

  const orderStatusLabels = {
    refunded: 'Refunded',
    completed: 'Delivered',
  };

  const orderStatusColors = {
    refunded: '#17a2b8',
    completed: '#007bff',
  };

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

  const handleReturnProduct = async () => {
    if (!returningOrder) return;
    const reason = selectedReason === 'Other' ? otherReason : selectedReason;
    if (!reason) return toast.error('Please select or enter a reason');
    try {
      const res = await axios.post('/wp-json/custom/v1/return-order/', {
        order_id: returningOrder.id,
        reason,
      });
      if (res.data.success) {
        toast.success('Return request submitted!');
        setReturningOrder(null);
        setSelectedReason('');
        setOtherReason('');
      } else {
        toast.error('Failed to submit return request');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error submitting return request');
    }
  };

  const returnedOrders = orders.filter(
    (order) => order.status === 'refunded' || (order.refunds && order.refunds.length > 0)
  );

  if (!returnedOrders.length) return <p>No returned orders found.</p>;

  return (
    <div className="order-list">
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />

      {/* Return popup */}
      {returningOrder && (
        <div className="return-modal-overlay">
          <div className="return-modal">
            <h2>Return Product - PO-{returningOrder.id}</h2>
            <p>Please select a reason for returning this product:</p>
            <div className="return-reasons">
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                <option value="">-- Select a reason --</option>
                {returnReasons.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
              {selectedReason === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter your reason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                />
              )}
            </div>
            <div className="return-modal-actions">
              <button className="btn-primary" onClick={handleReturnProduct}>Submit Return</button>
              <button className="btn-secondary" onClick={() => setReturningOrder(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {returnedOrders.map((order) => (
        <div key={order.id} className="order-card-simple">
          {/* Header */}
          <div className="order-header-simple">
            <div>
              <strong style={{ color: orderStatusColors[order.status] || '#000' }}>
                Order {orderStatusLabels[order.status] || order.status}
              </strong> | Email sent to <span>{order.billing.email}</span> on{' '}
              {new Date(order.date_created).toLocaleDateString()}
            </div>
          </div>

          {/* Products */}
          <div
  className="order-items-grid-simple"
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '16px',
  }}
>
  {order.line_items.map((item) => {
    const refundForItem = order.refunds?.find((r) =>
      r.refunded_items?.some((ri) => ri.id === item.id)
    );

    return (
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
          width: 120,
          cursor: 'pointer',
          textAlign: 'center',
          border: '1px solid #eee',
          borderRadius: 6,
          padding: 8,
          backgroundColor: '#fafafa',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <img
          src={item.image?.src || 'https://via.placeholder.com/100'}
          alt={item.name}
          style={{ width: '100%', height: 100, objectFit: 'contain', marginBottom: 6 }}
        />
        <div className="product-price">
          {order.currency} {item.price} {refundForItem ? '(Returned)' : ''}
        </div>
        {refundForItem?.reason && (
          <div className="return-reason">
            <strong>Reason:</strong> {refundForItem.reason}
          </div>
        )}
      </div>
    );
  })}
</div>


          {/* Summary */}
          <div className="order-summary-simple">
            <div>{order.line_items.length} item{order.line_items.length > 1 ? 's' : ''}</div>
            <div><del>{order.currency} {order.total}</del>&nbsp;<strong>{order.currency} {order.total}</strong></div>
            <div>
              Order Time:{' '}
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false, timeZone: 'Asia/Dubai',
              }).format(new Date(order.date_created))}
            </div>
            <div>Order ID: PO-{order.id}</div>
            <div>Payment method: {order.payment_method_title || order.payment_method}</div>
          </div>

          {/* Actions */}
          <div className="order-actions-simple">
            <button className="btn-secondary" onClick={() => handleBuyAgain(order.line_items, order.id)} disabled={buyingAgainOrderId === order.id}>
              {buyingAgainOrderId === order.id ? 'Adding...' : 'Buy this again'}
            </button>
            {isCancelable(order.status) && (
              <button className="btn-secondary" onClick={() => cancelOrder(order.id)}>
                Cancel items
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderReturns;
