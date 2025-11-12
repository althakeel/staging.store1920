import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const OrderReceiptPrint = ({ order }) => {
  const printRef = useRef();

  // Hook must be called unconditionally
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (!order) return null;

  return (
    <div>
      <button
        onClick={handlePrint}
        style={{
          marginBottom: 20,
          padding: '10px 20px',
          backgroundColor: '#f60',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        Print Receipt
      </button>

      <div
        ref={printRef}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          maxWidth: 600,
          margin: '0 auto',
          border: '1px solid #ccc',
          padding: 20,
          color: '#333',
          lineHeight: 1.5,
          backgroundColor: '#fff',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#f60' }}>
          Order Receipt
        </h2>

        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Order Date:</strong> {new Date(order.date_created).toLocaleString()}</p>

        <section>
          <h3 style={{ borderBottom: '1px solid #f60', paddingBottom: 6 }}>Shipping Address</h3>
          <address style={{ fontStyle: 'normal', marginTop: 8 }}>
            {order.shipping.first_name} {order.shipping.last_name}<br />
            {order.shipping.address_1}{order.shipping.address_2 ? `, ${order.shipping.address_2}` : ''}<br />
            {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}<br />
            {order.shipping.country}
          </address>
        </section>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ borderBottom: '1px solid #f60', paddingBottom: 6 }}>Items</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f60' }}>
                <th style={{ textAlign: 'left', padding: 8 }}>Product</th>
                <th style={{ textAlign: 'center', padding: 8 }}>Qty</th>
                <th style={{ textAlign: 'right', padding: 8 }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.line_items.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: 8 }}>{item.name}</td>
                  <td style={{ padding: 8, textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: 8, textAlign: 'right' }}>
                    {order.currency} {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ marginTop: 24 }}>
          <h3 style={{ borderBottom: '1px solid #f60', paddingBottom: 6 }}>Payment Details</h3>
          <p><strong>Payment Method:</strong> {order.payment_method_title || order.payment_method}</p>
          <p><strong>Total Paid:</strong> {order.currency} {order.total}</p>
          {order.transaction_id && (
            <p><strong>Transaction ID:</strong> {order.transaction_id}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default OrderReceiptPrint;
