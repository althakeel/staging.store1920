import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../../../../contexts/CartContext';
import '../../../../../assets/styles/myaccount/AllOrders.css';
import axios from 'axios';
import AddressForm from '../../../../checkoutleft/AddressForm';
import OrderTracking from './OrderTracking';
import OrderDetailsInline from './OrderDetailsInline';
import { generateInvoicePDF } from '../../../../../utils/generateInvoice';

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

const AllOrders = ({
  orders,
  cancellingOrderId,
  cancelOrder,
  handleProductClick,
  slugify,
  isCancelable,
  onOrdersUpdated,
}) => {
  const [buyingAgainOrderId, setBuyingAgainOrderId] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [detailedOrder, setDetailedOrder] = useState(null);
  const [returningOrder, setReturningOrder] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const { addToCart } = useCart();

  const orderStatusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    completed: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    failed: 'Failed',
  };

  const orderStatusColors = {
    pending: '#ff4800ff',
    confirmed: '#28a745',
    processing: '#007bff',
    completed: '#007bff',
    cancelled: '#6c757d',
    refunded: '#17a2b8',
    failed: '#dc3545',
  };

  const getExpectedDeliveryDate = (order) => {
    try {
      const date = new Date(order.date_created);
      date.setDate(date.getDate() + 7);
      return date.toLocaleDateString();
    } catch {
      return 'N/A';
    }
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
      console.error(err);
      toast.error('Failed to add items to cart');
    } finally {
      setBuyingAgainOrderId(null);
    }
  };

  const prepareFormData = (order) => ({
    shipping: {
      fullName: `${order.shipping.first_name} ${order.shipping.last_name}`.trim(),
      address1: order.shipping.address_1 || '',
      address2: order.shipping.address_2 || '',
      city: order.shipping.city || '',
      postalCode: order.shipping.postcode || '',
      phone: order.shipping.phone || '',
      state: order.shipping.state || '',
      country: order.shipping.country || '',
    },
    billing: {
      fullName: `${order.billing.first_name} ${order.billing.last_name}`.trim(),
      address1: order.billing.address_1 || '',
      address2: order.billing.address_2 || '',
      city: order.billing.city || '',
      postalCode: order.billing.postcode || '',
      phone: order.billing.phone || '',
      state: order.billing.state || '',
      country: order.billing.country || '',
    },
    billingSameAsShipping: false,
  });

  const openEditAddress = (order) => {
    setEditingOrder({
      order,
      formData: prepareFormData(order),
    });
    setAddressError('');
  };

  const handleAddressChange = (e, section) => {
    const { name, value, checked } = e.target;
    setEditingOrder((prev) => {
      if (!prev) return prev;
      if (section === 'checkbox') {
        return {
          ...prev,
          formData: { ...prev.formData, billingSameAsShipping: checked },
        };
      }
      return {
        ...prev,
        formData: {
          ...prev.formData,
          [section]: { ...prev.formData[section], [name]: value },
        },
      };
    });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    setSavingAddress(true);
    setAddressError('');

    const splitName = (fullName) => {
      const parts = fullName.trim().split(' ');
      return { first_name: parts[0] || '', last_name: parts.slice(1).join(' ') || '' };
    };

    const { order, formData } = editingOrder;
    const billingAddress = formData.billingSameAsShipping ? formData.shipping : formData.billing;

    const shippingName = splitName(formData.shipping.fullName);
    const billingName = splitName(billingAddress.fullName);

    const payload = {
      order_id: order.id,
      shipping: {
        first_name: shippingName.first_name,
        last_name: shippingName.last_name,
        address_1: formData.shipping.address1,
        address_2: formData.shipping.address2,
        city: formData.shipping.city,
        postcode: formData.shipping.postalCode,
        phone: formData.shipping.phone,
        state: formData.shipping.state,
        country: formData.shipping.country,
      },
      billing: {
        first_name: billingName.first_name,
        last_name: billingName.last_name,
        address_1: billingAddress.address1,
        address_2: billingAddress.address2,
        city: billingAddress.city,
        postcode: billingAddress.postalCode,
        phone: billingAddress.phone,
        state: billingAddress.state,
        country: billingAddress.country,
      },
    };

    try {
      const res = await axios.post('/wp-json/custom/v1/update-order-address/', payload);
      if (res.data.success) {
        toast.success('Address updated successfully!');
        setEditingOrder(null);
        onOrdersUpdated && onOrdersUpdated();
      } else setAddressError('Failed to update address.');
    } catch (err) {
      setAddressError('Error updating address.');
      console.error(err);
    } finally {
      setSavingAddress(false);
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

  const canReturn = (order) => {
    if (order.status !== 'completed') return false;
    const deliveredDate = new Date(order.date_created);
    deliveredDate.setDate(deliveredDate.getDate() + 7);
    const now = new Date();
    const diffDays = Math.floor((now - deliveredDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  };

  return (
    <div className="order-list">
      <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar />

      {editingOrder && (
        <AddressForm
          formData={editingOrder.formData}
          shippingStates={[]}
          billingStates={[]}
          countries={{ AE: { name: 'United Arab Emirates' } }}
          onChange={handleAddressChange}
          onSubmit={handleAddressSubmit}
          onClose={() => setEditingOrder(null)}
          saving={savingAddress}
          error={addressError}
        />
      )}

      {trackingOrder && (
        <OrderTracking order={trackingOrder} onClose={() => setTrackingOrder(null)} />
      )}

      {detailedOrder && (
        <OrderDetailsInline order={detailedOrder} onClose={() => setDetailedOrder(null)} />
      )}

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
                  <option key={i} value={r}>
                    {r}
                  </option>
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
              <button className="btn-primary" onClick={handleReturnProduct}>
                Submit Return
              </button>
              <button
                className="btn-secondary"
                onClick={() => setReturningOrder(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} 
          className={`order-card-simple ${order.status === 'cancelled' ? 'order-cancelled' : ''}`}>
          
          {order.status === 'cancelled' && (
            <div className="cancelled-overlay">
                  <div className="cancel-text-box">
              <div className="cancel-info-title">Order Cancelled</div>
              <div>
                <strong>Cancelled by:</strong> {order.cancelled_by?.toLowerCase() === 'customer' ? 'Customer' : 'Seller'}
              </div>
              <div>
                <strong>Order Date:</strong> {new Date(order.date_created).toLocaleDateString()}
              </div>
              {order.date_cancelled && (
                <div>
                  <strong>Cancelled Date:</strong> {new Date(order.date_cancelled).toLocaleDateString()}
                </div>
              )}
                  </div>
            </div>
          )}

          <div className="order-header-simple">
            <div>
              <strong style={{ color: orderStatusColors[order.status] || '#000' }}>
                Order {orderStatusLabels[order.status] || order.status}
              </strong> | Email sent to <span>{order.billing.email}</span> on{' '}
              {new Date(order.date_created).toLocaleDateString()}
            </div>
            <button
              onClick={() => setDetailedOrder(order)}
              aria-expanded={false}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#FF8C00',
                cursor: 'pointer',
                fontSize: 'inherit',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View order details &nbsp;<span style={{ fontWeight: 'bold', color: '#FF8C00' }}>→</span>
            </button>
          </div>

          <div className="order-delivery-simple">
            <div>
              <span className="fastest-arrival">Fastest arrival within 4 business days.</span>
              &nbsp;Delivery: {getExpectedDeliveryDate(order)}
            </div>
            <div className="credit-badge">AED20 credit if delay</div>
          </div>

          <div className="order-items-grid-simple">
            {order.line_items.map((item) => (
              <div
                key={item.id}
                className="order-product-simple"
                onClick={() => handleProductClick(slugify(item.name))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleProductClick(slugify(item.name)); }}
              >
                <img src={item.image?.src || 'https://via.placeholder.com/100'} alt={item.name} />
                <div className="product-price">{order.currency} {item.price}</div>
              </div>
            ))}
          </div>

          <div className="order-summary-simple">
            <div>{order.line_items.length} item{order.line_items.length > 1 ? 's' : ''}</div>
            <div>
              <del>{order.currency} {order.total}</del>&nbsp;
              <strong>{order.currency} {order.total}</strong>
            </div>
            <div>
              Order Time:{' '}
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Asia/Dubai',
              }).format(new Date(order.date_created))}
            </div>
            <div>Order ID: PO-{order.id}</div>
            <div>Payment method: {order.payment_method_title || order.payment_method}</div>
          </div>

          <div className="order-actions-simple">
            <button className="btn-outline" onClick={() => openEditAddress(order)}>Change address</button>
            <button className="btn-secondary" onClick={() => handleBuyAgain(order.line_items, order.id)} disabled={buyingAgainOrderId === order.id}>
              {buyingAgainOrderId === order.id ? 'Adding...' : 'Buy this again'}
            </button>
            <button className="btn-secondary" onClick={() => setTrackingOrder(order)}>Track</button>
            {isCancelable(order.status) && (
              <button className="btn-secondary" onClick={() => cancelOrder(order.id)} disabled={cancellingOrderId === order.id}>
                {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel items'}
              </button>
            )}
            {order.status === 'completed' && (
              <>
                <button className="btn-outline" onClick={() => generateInvoicePDF(order)}>Download Invoice</button>
                {canReturn(order) && (
                  <button className="btn-outline" onClick={() => setReturningOrder(order)}>Return Product</button>
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
