import React, { useState } from 'react';
import axios from 'axios';

export default function TestRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg('');
    setSuccessMsg('');
  };

  const validate = () => {
    if (!formData.name.trim()) {
      setErrorMsg('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Phone is required');
      return false;
    }
    if (!formData.password) {
      setErrorMsg('Password is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Ensure phone starts with '+', if not, prepend '+'
    const phoneWithCode = formData.phone.startsWith('+') ? formData.phone : `+${formData.phone}`;

const payload = {
  email: formData.email,
  username: formData.email,
  password: formData.password,
  first_name: formData.name,
  last_name: 'User',
  billing: {
    first_name: formData.name,
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Dubai',
    state: 'Dubai',
    postcode: '00000',
    country: 'AE',
    email: formData.email,
    phone: phoneWithCode,
  },
  shipping: {
    first_name: formData.name,
    last_name: 'User',
    address_1: '123 Main St',
    city: 'Dubai',
    state: 'Dubai',
    postcode: '00000',
    country: 'AE',
  },
  meta_data: [
    {
      key: 'billing_phone',
      value: phoneWithCode,
    },
  ],
};


    try {
      const res = await axios.post(
        'https://db.store1920.com/wp-json/wc/v3/customers',
        payload,
        {
          auth: {
            username: 'ck_0a0d00041ca702d912afaabcaf637eb524b9b3cf', // Your consumer key
            password: 'cs_aeec86581438c3bea01aaebd9b6ec1183a42bd8d', // Your consumer secret
          },
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setSuccessMsg(`Customer created! ID: ${res.data.id}`);
      setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('API error response:', error.response);
      let msg = 'Registration failed';
      if (error.response?.data?.message) msg = error.response.data.message;
      else if (typeof error.response?.data === 'string') msg = error.response.data;
      else if (error.message) msg = error.message;
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Register WooCommerce Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          name="phone"
          placeholder="Phone (include country code, e.g. +971543175003)"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />

        {errorMsg && <div style={{ color: 'red', marginBottom: 8 }}>{errorMsg}</div>}
        {successMsg && <div style={{ color: 'green', marginBottom: 8 }}>{successMsg}</div>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
