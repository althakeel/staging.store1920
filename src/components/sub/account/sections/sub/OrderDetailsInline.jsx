import React, { useState } from 'react';
import OrderReceiptPrint from './OrderReceiptPrint';

const OrderDetails = ({ order }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  if (!order) return null;

  const certificationLogos = [
    "https://db.store1920.com/wp-content/uploads/2025/07/219cc18d-0462-47ae-bf84-128d38206065.png.slim_.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/96e8ab9b-d0dc-40ac-ad88-5513379c5ab3.png.slim_.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/80d57653-6e89-4bd5-82c4-ac1e8e2489fd.png.slim_.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/65e96f45-9ff5-435a-afbf-0785934809ef.png.slim-1.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/058c1e09-2f89-4769-9fd9-a3cac76e13e5-1.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/28a227c9-37e6-4a82-b23b-0ad7814feed1.png.slim_.webp",
    "https://db.store1920.com/wp-content/uploads/2025/07/1f29a857-fe21-444e-8617-f57f5aa064f4.png.slim_.webp",
  ];

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'cod':
        return 'https://img.icons8.com/ios-filled/50/12b76a/cash-in-hand.png';
      case 'paypal':
        return 'https://img.icons8.com/color/48/000000/paypal.png';
      case 'stripe':
        return 'https://img.icons8.com/color/48/000000/credit-card.png';
      default:
        return 'https://img.icons8.com/ios-filled/50/12b76a/bank-card-back-side.png';
    }
  };
  const statusColors = {
  pending: '#ff3300ff',     // orange
  processing: '#28a745',  // green (Confirmed)
  confirmed: '#28a745',   // green
  completed: '#007bff',   // blue
  cancelled: '#6c757d',   // gray
  refunded: '#17a2b8',    // teal
  failed: '#dc3545',      // red
};

  const closeModal = () => setShowReceipt(false);

  return (
    <div style={styles.container}>
      <div style={styles.innerBox}>

        {/* Status & Order info */}
        <div style={styles.statusSection}>
<strong style={{ color: statusColors[order.status] || '#000' }}>
  {order.status === 'processing' ? 'Confirmed' : order.status} Order
</strong>          <p style={styles.orderInfo}>
            Order time: {new Date(order.date_created).toLocaleString()} | Order ID: {order.id}
          </p>
        </div>

        {/* Shipping & Delivery - grid 2 cols */}
        <div style={styles.grid2Cols}>

          <section style={styles.card}>
            <h4 style={styles.cardTitleShipping}>Shipping to</h4>
            <p style={styles.cardText}>
              {order.shipping.first_name} {order.shipping.last_name}<br />
              {order.shipping.address_1} {order.shipping.address_2 && `, ${order.shipping.address_2}`}<br />
              {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}<br />
              {order.shipping.country}
            </p>
          </section>

          <section style={styles.card}>
            <h4 style={styles.cardTitle}>Delivery time</h4>
            <p style={{ ...styles.cardText, color: '#12b76a', fontWeight: 500 }}>
              4-7 business days (e.g., 13-16 Aug)
            </p>
            <ul style={styles.deliveryList}>
              <li>AED20.00 Credit for delay</li>
              <li>Return if item damaged</li>
              <li>15-day no update refund</li>
              <li>40-day no delivery refund</li>
            </ul>
          </section>
        </div>

        {/* Line items */}
        {order.line_items.map(item => (
          <div key={item.id} style={styles.lineItem}>
            <img
              src={item.image?.src || 'https://via.placeholder.com/80x80.png?text=Image'}
              alt={item.name}
              style={styles.lineItemImage}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={styles.lineItemName}>{item.name}</p>
              <p style={styles.lineItemQty}>Qty: {item.quantity}</p>
              <p style={styles.lineItemPrice}>{order.currency} {item.price}</p>
            </div>
          </div>
        ))}

        {/* Action Buttons */}
     <div style={styles.buttonsWrapper}>
  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Track clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Track
  </button>

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Speed up again clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Speed up again
  </button>

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Buy this again clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Buy this again
  </button>

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => {
      if (order.receipt_url) {
        setShowReceipt(true);
      } else {
        alert('Receipt not available yet.');
      }
    }}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    View receipt
  </button>
  {showReceipt && (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal}>
      <button
        onClick={closeModal}
        style={modalStyles.closeBtn}
        aria-label="Close receipt popup"
        type="button"
      >
        ✖
      </button>
      <OrderReceiptPrint order={order} />
    </div>
  </div>
)}

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Price adjustment clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Price adjustment
  </button>

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Change address clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Change address
  </button>

  <button
    type="button"
    style={styles.actionBtn}
    onClick={() => alert('Cancel items clicked!')}
    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f3f3'}
    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
  >
    Cancel items
  </button>
</div>


        {/* Payment details and payment method side by side */}
        <div style={styles.grid2Cols}>

          <section style={styles.card}>
            <h4 style={styles.cardTitle}>Payment details</h4>
            <p style={styles.paymentRow}>
              <span>Item(s) total:</span>
              <span style={{ textDecoration: 'line-through', color: '#999' }}>
                {order.currency} 379.49
              </span>
            </p>
            <p style={styles.paymentRow}>
              <span>Item(s) discount:</span>
              <span style={{ color: '#f60' }}>- {order.currency} 313.95</span>
            </p>
            <p style={{ ...styles.paymentRow, fontWeight: 600, fontSize: '1.1rem' }}>
              <span>Subtotal:</span>
              <span>{order.currency} {order.total}</span>
            </p>
            <p style={{ ...styles.paymentRow, fontWeight: 700, fontSize: '1.2rem', marginTop: '1rem', color: '#f60' }}>
              <span>You saved:</span>
              <span>- {order.currency} 313.95</span>
            </p>
          </section>

          <section style={styles.card}>
            <h4 style={styles.cardTitle}>Payment Method</h4>
            <div style={styles.paymentMethodHeader}>
              <img
                src={getPaymentIcon(order.payment_method)}
                alt="payment method icon"
                style={styles.paymentIcon}
                loading="lazy"
              />
              <span style={styles.paymentMethodText}>
                {order.payment_method_title || order.payment_method || 'Unknown'}
              </span>
            </div>

            <p style={styles.paymentStatus}>
              <strong>Status:</strong> {order.status === 'completed' ? '✅ Paid' : order.status}
            </p>

            {order.transaction_id && (
              <p style={styles.transactionId}>
                <strong>Transaction ID:</strong> {order.transaction_id}
              </p>
            )}

            <p style={styles.paymentDate}>
              Paid on {new Date(order.date_paid || order.date_created).toLocaleDateString()}
            </p>

            <div style={styles.secureNote}>✅ All data is safeguarded</div>
            <div style={styles.secureDesc}>
              We follow PCI DSS standards, use strong encryption, and perform regular reviews to protect your payment information.
            </div>

            <div style={styles.certifications}>
              {certificationLogos.map((logo, idx) => (
                <img key={idx} src={logo} alt="certification" style={styles.certLogo} loading="lazy" />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Receipt popup/modal */}
      {showReceipt && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <button
              onClick={closeModal}
              style={modalStyles.closeBtn}
              aria-label="Close receipt popup"
              type="button"
            >
              ✖
            </button>
            <OrderReceiptPrint order={order} />
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '10px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '20px',
    position: 'relative',
    boxSizing: 'border-box',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    width: '100%',
    padding: '20px 10px',
    boxSizing: 'border-box',
  },
  innerBox: {
    maxWidth: '1000px',
    backgroundColor: '#fff',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  statusSection: {
    marginBottom: '1rem',
  },
  statusText: {
    color: '#12b76a',
    fontSize: '1rem',
    marginBottom: '0.4rem',
    fontWeight: 600,
  },
  orderInfo: {
    fontSize: '0.95rem',
    color: '#666',
  },
  grid2Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    borderTop: '1px solid #eee',
    paddingTop: '1rem',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    color: '#333',
    fontWeight: 700,
    borderBottom: '2px solid #f60',
    paddingBottom: '0.3rem',
  },
  cardTitleShipping: {
    fontSize: '1.3rem',
    marginBottom: '1rem',
    color: '#f60',
    fontWeight: 700,
    borderBottom: '2px solid #f60',
    paddingBottom: '0.3rem',
  },
  cardText: {
    fontSize: '0.95rem',
    color: '#444',
    lineHeight: 1.5,
  },
  deliveryList: {
    fontSize: '0.9rem',
    color: '#555',
    margin: 0,
    paddingLeft: '1.2rem',
  },
  lineItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    borderBottom: '1px solid #eee',
    padding: '1rem 0',
    flexWrap: 'wrap',
  },
  lineItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  lineItemName: {
    fontWeight: 600,
    margin: 0,
    fontSize: '1rem',
    color: '#333',
    wordBreak: 'break-word',
  },
  lineItemQty: {
    fontSize: '0.85rem',
    color: '#777',
    margin: '0.2rem 0',
  },
  lineItemPrice: {
    fontWeight: 600,
    fontSize: '1rem',
    margin: '0.2rem 0',
    color: '#f60',
  },
  buttonsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '1.5rem',
  },
  actionBtn: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    cursor: 'pointer',
    flex: '1 1 120px',
    outline: 'none',
    transition: 'all 0.3s ease',
    minWidth: '120px',
  },
  paymentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1rem',
    margin: '0.4rem 0',
    color: '#555',
  },
  paymentMethodHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1rem',
  },
  paymentIcon: {
    width: '36px',
    height: '36px',
  },
  paymentMethodText: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#222',
  },
  paymentStatus: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '0.6rem',
  },
  transactionId: {
    fontSize: '0.9rem',
    color: '#777',
    marginBottom: '0.6rem',
  },
  paymentDate: {
    fontSize: '0.9rem',
    color: '#555',
  },
  secureNote: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#12b76a',
    fontWeight: 500,
  },
  secureDesc: {
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '0.5rem',
    lineHeight: 1.4,
  },
  certifications: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '1.5rem',
    justifyContent: 'start',
  },
  certLogo: {
    height: '32px',
    filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.1))',
  },
};

export default OrderDetails;
