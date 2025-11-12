// components/CustomerSettings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CK = 'ck_0cc00ad6554d017f130b65642953d83acde22263';
const CS = 'cs_3f59e3e45b0269a54280323df649b51b05cb9875';

const CustomerSettings = ({ customer, setCustomer }) => {
  const [formData, setFormData] = useState(customer || {});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData(customer || {});
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!customer?.id) return;

    setSaving(true);
    setMessage('');

    try {
      const res = await axios.put(
        `${API_BASE}/customers/${customer.id}`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          billing: {
            ...formData.billing,
            phone: formData.phone,
            address_1: formData.address_1,
          },
        },
        {
          auth: { username: CK, password: CS },
        }
      );
      setCustomer(res.data);
      setEditing(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Update error', err);
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Profile Settings</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>First Name:</label>
        <input
          name="first_name"
          value={formData.first_name || ''}
          onChange={handleChange}
          disabled={!editing}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Last Name:</label>
        <input
          name="last_name"
          value={formData.last_name || ''}
          onChange={handleChange}
          disabled={!editing}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Email:</label>
        <input
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          disabled
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Phone:</label>
        <input
          name="phone"
          value={formData.phone || formData.billing?.phone || ''}
          onChange={handleChange}
          disabled={!editing}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Address:</label>
        <input
          name="address_1"
          value={formData.address_1 || formData.billing?.address_1 || ''}
          onChange={handleChange}
          disabled={!editing}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      {!editing ? (
        <button onClick={() => setEditing(true)} style={{ padding: '10px 20px' }}>
          Edit Profile
        </button>
      ) : (
        <>
          <button onClick={handleSave} disabled={saving} style={{ padding: '10px 20px', marginRight: 10 }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setEditing(false)} disabled={saving} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        </>
      )}

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default CustomerSettings;
