import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CK = 'ck_0cc00ad6554d017f130b65642953d83acde22263';
const CS = 'cs_3f59e3e45b0269a54280323df649b51b05cb9875';

const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Returns'];

const CustomerOrders = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!customerId) return;
    axios.get(`${API_BASE}/orders?customer=${customerId}`, {
      auth: { username: CK, password: CS },
    }).then(res => {
      setOrders(res.data);
      setFilteredOrders(res.data);
    }).catch(err => {
      console.error('Order fetch error:', err);
    });
  }, [customerId]);

  useEffect(() => {
    let results = [...orders];

    if (activeTab !== 'All Orders') {
      results = results.filter(order =>
        order.status.toLowerCase().includes(activeTab.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      results = results.filter(order =>
        order.id.toString().includes(searchQuery) ||
        order.tracking_number?.includes(searchQuery) ||
        order.line_items.some(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(results);
  }, [activeTab, searchQuery, orders]);

  return (
    <div>
      <h2>My Orders</h2>
      <div style={{ margin: '1rem 0' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              marginRight: 10,
              padding: '6px 12px',
              background: activeTab === tab ? '#333' : '#eee',
              color: activeTab === tab ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search by Order ID / Item / Tracking No."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          fontSize: 16,
          marginBottom: 20,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />

      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p><strong>You don't have any orders.</strong></p>
          <p>Can't find your order? Try signing in with another account.</p>
          <button style={{
            marginTop: 10,
            padding: '10px 20px',
            background: '#ff5a5f',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}>
            Self-service to find order
          </button>
        </div>
      ) : (
        filteredOrders.map(order => (
          <div key={order.id} style={{ borderBottom: '1px solid #ddd', padding: '1rem 0' }}>
            <h4>Order #{order.id}</h4>
            <p>Status: <strong>{order.status}</strong></p>
            <ul>
              {order.line_items.map(item => (
                <li key={item.id}>{item.name} × {item.quantity}</li>
              ))}
            </ul>
            <p>Total: <strong>{order.total} AED</strong></p>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerOrders;
