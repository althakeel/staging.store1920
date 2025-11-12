import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '../../../../../contexts/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import { generateInvoicePDF } from '../../../../../utils/generateInvoice';
import { useNavigate } from 'react-router-dom';

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

const OrderDelivered = ({ orders, handleProductClick, slugify, viewOrderDetails }) => {
  const { addToCart } = useCart();
  const [buyingAgainOrderId, setBuyingAgainOrderId] = useState(null);
  const [returningOrder, setReturningOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [submittingReturn, setSubmittingReturn] = useState(false);
  const navigate = useNavigate();


  const deliveredOrders = orders.filter((order) => order.status === 'completed');
  if (!deliveredOrders.length) return <p>No delivered orders found.</p>;

  const handleBuyAgain = async (lineItems, orderId) => {
    try {
      setBuyingAgainOrderId(orderId);
      for (const item of lineItems) {
        addToCart({
          id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          image: item.image?.src,
        }, false);
      }
      toast.success('Items added to cart!');
    } catch {
      toast.error('Failed to add items to cart');
    } finally {
      setBuyingAgainOrderId(null);
    }
  };

  const submitReturnRequest = async () => {
    if (!selectedReason) return toast.error('Please select a reason');
    const reason = selectedReason === 'Other' ? otherReason.trim() : selectedReason;
    if (!reason) return toast.error('Please enter a reason');

    setSubmittingReturn(true);
    try {
      await axios.post('/wp-json/custom/v1/return-order/', {
        order_id: returningOrder.id,
        reason,
      });
      toast.success('Return request submitted!');
      setReturningOrder(null);
      setSelectedReason('');
      setOtherReason('');
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit return request');
    } finally {
      setSubmittingReturn(false);
    }
  };

  return (
    <div className="order-list">
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />

      {deliveredOrders.map((order) => (
        <div key={order.id} className="order-card-simple">
          {/* Header */}
          <div className="order-header-simple">
            <div>
              <strong>Order ID:</strong> PO-{order.id} | <strong>Date:</strong>{' '}
              {new Date(order.date_created).toLocaleDateString()} | <strong>Email:</strong> {order.billing.email}
            </div>
          </div>

          {/* Products */}
          <div
            className="order-items-grid-simple"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: 12,
            }}
          >
            {order.line_items.map((item) => (
              <div
                key={item.id}
                className="order-product-simple"
                onClick={() => handleProductClick(slugify(item.name))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleProductClick(slugify(item.name)); }}
                style={{
                  width: 140,
                  padding: 8,
                  border: '1px solid #eee',
                  borderRadius: 6,
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: '#fafafa',
                }}
              >
                <img
                  src={item.image?.src || 'https://via.placeholder.com/100'}
                  alt="Product"
                  style={{ width: '100%', height: 100, objectFit: 'contain', marginBottom: 6 }}
                />
                <div style={{ color: '#FF8C00', fontWeight: 'bold' }}>
                  {order.currency} {item.price}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="order-summary-simple" style={{ marginTop: 12 }}>
            <div>{order.line_items.length} item{order.line_items.length > 1 ? 's' : ''}</div>
            <div>
              Order Time:{' '}
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false, timeZone: 'Asia/Dubai',
              }).format(new Date(order.date_created))}
            </div>
            <div>Payment method: {order.payment_method_title || order.payment_method}</div>
          </div>

          {/* Actions */}
          <div className="order-actions-simple" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
            <button
              className="btn-secondary"
              onClick={() => handleBuyAgain(order.line_items, order.id)}
              disabled={buyingAgainOrderId === order.id}
            >
              {buyingAgainOrderId === order.id ? 'Adding...' : 'Buy this again'}
            </button>
            <button
              className="btn-outline"
              onClick={() => generateInvoicePDF(order)}
            >
              Download Invoice
            </button>
            <button
              className="btn-outline"
              onClick={() => setReturningOrder(order)}
            >
              Return Product
            </button>
            <button
              className="btn-outline"
              // onClick={() => viewOrderDetails(order)}
  onClick={() => navigate('/myaccount/orders')}        
      >
              View Details
            </button>
          </div>
        </div>
      ))}

      {/* Return Popup */}
      {returningOrder && (
        <div
          className="return-modal-overlay"
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 24,
              borderRadius: 8,
              width: 400,
              maxWidth: '90%',
            }}
          >
            <h3>Return Order PO-{returningOrder.id}</h3>
            <div style={{ marginTop: 16 }}>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{ width: '100%', padding: 6, marginBottom: 12 }}
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
                  style={{ width: '100%', padding: 6 }}
                />
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                className="btn-outline"
                onClick={() => setReturningOrder(null)}
                disabled={submittingReturn}
              >
                Cancel
              </button>
              <button
                className="btn-secondary"
                onClick={submitReturnRequest}
                disabled={submittingReturn}
              >
                {submittingReturn ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDelivered;
