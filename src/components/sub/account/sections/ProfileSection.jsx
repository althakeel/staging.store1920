import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../../assets/styles/myaccount/ProfileSection.css';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_2e4ba96dde422ed59388a09a139cfee591d98263';
const CONSUMER_SECRET = 'cs_43b449072b8d7d63345af1b027f2c8026fd15428';

function getInitials(user) {
  if (user.first_name && user.last_name) {
    return (
      user.first_name.charAt(0).toUpperCase() +
      user.last_name.charAt(0).toUpperCase()
    );
  }
  if (user.email) return user.email.charAt(0).toUpperCase();
  return '?';
}

function getColorForInitials(initials) {
  const colors = [
    '#386641',
    '#6a994e',
    '#a7c957',
    '#f2e8cf',
    '#bc4749',
    '#c84b31',
    '#6b4226',
  ];
  const charCode = initials.charCodeAt(0) || 0;
  return colors[charCode % colors.length];
}

const ProfileSection = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      setOrdersCount(null);
      setLoading(false);
      return;
    }

    const fetchUserAndOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const userRes = await axios.get(`${API_BASE}/customers/${userId}`, {
          auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET },
          timeout: 8000,
        });
        setUser(userRes.data);

        // Initialize formData with fullName
        setFormData({
          fullName: `${userRes.data.first_name || ''} ${userRes.data.last_name || ''}`.trim(),
          email: userRes.data.email || '',
          phone: userRes.data.billing?.phone || '',
          billing: { ...userRes.data.billing },
          shipping: { ...userRes.data.shipping },
        });

        const ordersRes = await axios.get(`${API_BASE}/orders`, {
          auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET },
          timeout: 8000,
          params: { customer: userId, per_page: 1 },
        });
        const totalOrders = parseInt(ordersRes.headers['x-wp-total'], 10) || 0;
        setOrdersCount(totalOrders);
      } catch (e) {
        setError('Failed to load profile data.');
        setUser(null);
        setOrdersCount(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      if (field === 'fullName') {
        return { ...prev, fullName: value };
      }
      if (field.startsWith('billing.')) {
        const key = field.split('.')[1];
        return {
          ...prev,
          billing: { ...prev.billing, [key]: value },
        };
      } else if (field.startsWith('shipping.')) {
        const key = field.split('.')[1];
        return {
          ...prev,
          shipping: { ...prev.shipping, [key]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const cancelEdit = () => {
    if (user) {
      setFormData({
        fullName: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        email: user.email || '',
        phone: user.billing?.phone || '',
        billing: { ...user.billing },
        shipping: { ...user.shipping },
      });
    }
    setEditMode(false);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      // Split fullName into first and last name
      const names = formData.fullName.trim().split(' ');
      const first_name = names.shift() || '';
      const last_name = names.join(' ') || '';

      const payload = {
        first_name,
        last_name,
        email: formData.email,
        billing: formData.billing,
        shipping: formData.shipping,
      };

      await axios.put(`${API_BASE}/customers/${userId}`, payload, {
        auth: { username: CONSUMER_KEY, password: CONSUMER_SECRET },
      });

      setUser((prev) => ({ ...prev, ...payload }));
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (e) {
      alert('Failed to update profile.');
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      alert('Delete account API call not implemented yet.');
    }
  };

  if (loading)
    return <p className="ps-loading">Loading profile...</p>;
  if (error)
    return <p className="ps-error">{error}</p>;
  if (!user)
    return (
      <p className="ps-no-user">
        No user profile found. Please sign in to view your profile.
      </p>
    );

  const initials = getInitials(user);
  const bgColor = getColorForInitials(initials);

  return (
    <section className="ps-section">
      <header className="ps-header">
        <h1 className="ps-title">Customer Profile</h1>
        {!editMode && (
          <button
            className="ps-btn ps-btn-edit"
            onClick={() => setEditMode(true)}
            aria-label="Edit profile"
          >
            Edit
          </button>
        )}
      </header>

      <div className="ps-main">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt="Avatar"
            className="ps-avatar"
            loading="lazy"
          />
        ) : (
          <div
            className="ps-avatar ps-avatar-initials"
            style={{ backgroundColor: bgColor }}
            aria-label="Profile initials"
          >
            {initials}
          </div>
        )}

        <div className="ps-info">
          {editMode ? (
            <input
              type="text"
              value={formData.fullName}
              placeholder="Full Name"
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              required
              className="ps-input ps-single-input"
            />
          ) : (
            <h2 className="ps-name">{`${user.first_name} ${user.last_name}`}</h2>
          )}

          {editMode ? (
            <input
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="ps-input ps-single-input"
              required
            />
          ) : (
            <p className="ps-email">{user.email}</p>
          )}

          {editMode ? (
            <input
              type="tel"
              value={formData.billing?.phone || ''}
              placeholder="Phone"
              onChange={(e) => handleInputChange('billing.phone', e.target.value)}
              className="ps-input ps-single-input"
            />
          ) : (
            <p className="ps-phone">
              <strong>Phone:</strong> {user.billing?.phone || 'N/A'}
            </p>
          )}

          <p className="ps-orders">
            <strong>Total Orders:</strong>{' '}
            {ordersCount !== null ? ordersCount : 'Loading...'}
          </p>

          <p className="ps-date">
            <strong>Account Created:</strong>{' '}
            {new Date(user.date_created).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="ps-addresses">
        <div className="ps-address-block">
          <h3 className="ps-address-title">Billing Address</h3>
          {editMode ? (
            <>
              <input
                type="text"
                placeholder="Address 1"
                value={formData.billing.address_1 || ''}
                onChange={(e) => handleInputChange('billing.address_1', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Address 2"
                value={formData.billing.address_2 || ''}
                onChange={(e) => handleInputChange('billing.address_2', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.billing.city || ''}
                onChange={(e) => handleInputChange('billing.city', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="State"
                value={formData.billing.state || ''}
                onChange={(e) => handleInputChange('billing.state', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Postcode"
                value={formData.billing.postcode || ''}
                onChange={(e) => handleInputChange('billing.postcode', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.billing.country || ''}
                onChange={(e) => handleInputChange('billing.country', e.target.value)}
                className="ps-input"
              />
            </>
          ) : user.billing && user.billing.address_1 ? (
            <>
              <p className="ps-address-line">{user.billing.address_1}</p>
              {user.billing.address_2 && (
                <p className="ps-address-line">{user.billing.address_2}</p>
              )}
              <p className="ps-address-line">
                {user.billing.city}, {user.billing.state} {user.billing.postcode}
              </p>
              <p className="ps-address-line">{user.billing.country}</p>
            </>
          ) : (
            <p className="ps-no-address">No billing address set.</p>
          )}
        </div>

        <div className="ps-address-block">
          <h3 className="ps-address-title">Shipping Address</h3>
          {editMode ? (
            <>
              <input
                type="text"
                placeholder="Address 1"
                value={formData.shipping.address_1 || ''}
                onChange={(e) => handleInputChange('shipping.address_1', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Address 2"
                value={formData.shipping.address_2 || ''}
                onChange={(e) => handleInputChange('shipping.address_2', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="City"
                value={formData.shipping.city || ''}
                onChange={(e) => handleInputChange('shipping.city', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="State"
                value={formData.shipping.state || ''}
                onChange={(e) => handleInputChange('shipping.state', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Postcode"
                value={formData.shipping.postcode || ''}
                onChange={(e) => handleInputChange('shipping.postcode', e.target.value)}
                className="ps-input"
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.shipping.country || ''}
                onChange={(e) => handleInputChange('shipping.country', e.target.value)}
                className="ps-input"
              />
            </>
          ) : user.shipping && user.shipping.address_1 ? (
            <>
              <p className="ps-address-line">{user.shipping.address_1}</p>
              {user.shipping.address_2 && (
                <p className="ps-address-line">{user.shipping.address_2}</p>
              )}
              <p className="ps-address-line">
                {user.shipping.city}, {user.shipping.state} {user.shipping.postcode}
              </p>
              <p className="ps-address-line">{user.shipping.country}</p>
            </>
          ) : (
            <p className="ps-no-address">No shipping address set.</p>
          )}
        </div>
      </div>

      <div className="ps-buttons">
        {editMode ? (
          <>
            <button
              className="ps-btn ps-btn-save"
              onClick={saveProfile}
              disabled={saving}
              aria-label="Save profile changes"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              className="ps-btn ps-btn-cancel"
              onClick={cancelEdit}
              disabled={saving}
              aria-label="Cancel editing profile"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="ps-btn ps-btn-delete"
            onClick={deleteAccount}
            aria-label="Delete account"
          >
            Delete Account
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileSection;
