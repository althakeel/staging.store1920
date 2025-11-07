import React, { useState, useEffect } from 'react';
import '../assets/styles/CheckoutForm.css';

export default function ShippingModal({ isOpen, onClose, onAddressSave, countries }) {
  // Use countries from props to keep consistency
  const [countryCode, setCountryCode] = useState(countries?.[0]?.code || '');

  const [data, setData] = useState({
    fullName: '',
    phone: '',
    street: '',
    building: '',
    city: '',
    district: '',
    landmark: '',
    postalCode: '',
    state: '',
    addressType: '',
    isDefault: false,
  });

  // Update countryCode when countries change (modal reopens)
  useEffect(() => {
    if (countries?.length) {
      setCountryCode(countries[0].code);
    }
  }, [countries]);

  // Find selected country object
  const selected = countries?.find((c) => c.code === countryCode) || {};

  // Handle input changes
  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  // Submit shipping address to backend and notify parent
  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...data,
      country: selected.name || '',
      countryCode: selected.code || '',
      dialCode: selected.dial_code || '',
      flag: selected.flag || '',
    };

    fetch('/wp-json/custom/v1/save-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.wpApiSettings?.nonce,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to save address');
        return res.json();
      })
      .then(() => {
        onAddressSave(payload); // Update parent with new address
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Enter a new shipping address</h2>
        <form onSubmit={handleSubmit}>
          <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag ? `${c.flag} ` : ''}
                {c.name} {c.dial_code ? `(${c.dial_code})` : ''}
              </option>
            ))}
          </select>

          <input
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Full name"
            required
          />

          <div className="phone-wrap">
            <span>
              {selected.flag} {selected.dial_code}
            </span>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Mobile number"
              required
            />
          </div>

          <input
            name="street"
            value={data.street}
            onChange={handleChange}
            placeholder="Street name"
            required
          />
          <input
            name="building"
            value={data.building}
            onChange={handleChange}
            placeholder="Building name/no"
            required
          />
          <input
            name="city"
            value={data.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            name="district"
            value={data.district}
            onChange={handleChange}
            placeholder="Area/District"
          />
          <input
            name="landmark"
            value={data.landmark}
            onChange={handleChange}
            placeholder="Nearest landmark"
          />
          <input
            name="postalCode"
            value={data.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
          />
          <input
            name="state"
            value={data.state}
            onChange={handleChange}
            placeholder="State"
          />

          <fieldset>
            <legend>Address type</legend>
            <label>
              <input
                type="radio"
                name="addressType"
                value="home"
                onChange={handleChange}
                required
              />{' '}
              Home
            </label>
            <label>
              <input type="radio" name="addressType" value="office" onChange={handleChange} /> Office
            </label>
          </fieldset>

          <label>
            <input
              type="checkbox"
              name="isDefault"
              checked={data.isDefault}
              onChange={handleChange}
            />
            Use as my default address
          </label>

          <button type="submit">Use this address</button>
        </form>
      </div>
    </div>
  );
}
