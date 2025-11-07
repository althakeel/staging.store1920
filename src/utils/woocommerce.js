// src/utils/woocommerce.js
import axios from 'axios';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_b56a66f53d1cb273b66097e1347cdfc7a49a4834';
const CONSUMER_SECRET = 'cs_2ef308464511bd90cc976fbc04d65458d7b37d2f';

// Axios instance with basic auth
const api = axios.create({
  baseURL: API_BASE,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

/**
 * Create a new WooCommerce customer.
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export const createCustomer = async (payload) => {
  try {
    const res = await api.post('/customers', payload);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get WooCommerce customer by email.
 * Returns the first customer that matches the email, or null if none found.
 * @param {string} email
 * @returns {Promise<Object|null>}
 */
export const getCustomerByEmail = async (email) => {
  try {
    const res = await api.get('/customers', {
      params: { email },
    });
    if (res.data && res.data.length > 0) {
      return res.data[0]; // Return the first matched customer
    }
    return null;
  } catch (error) {
    throw error.response?.data || error;
  }
};
