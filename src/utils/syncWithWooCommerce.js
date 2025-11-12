import { getCustomerByEmail, createCustomer } from './woocommerce';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Sync Firebase user with WooCommerce customer.
 * - Checks if WooCommerce customer exists by email.
 * - Creates a new WooCommerce customer if not found.
 * - Stores WooCommerce customer ID in Firestore under the Firebase user UID.
 * 
 * @param {Object} firebaseUser - Firebase user object.
 * @returns {Object|null} WooCommerce customer object or null if error occurs.
 */
export const syncWithWooCommerce = async (firebaseUser) => {
  try {
    const email = firebaseUser.email;
    const name = firebaseUser.displayName || 'Guest User';
    const uid = firebaseUser.uid;

    // Try to find existing WooCommerce customer by email
    let wooCustomer = await getCustomerByEmail(email);

    if (!wooCustomer) {
      // Create a random password for new WooCommerce customer (if needed)
      const randomPassword = Math.random().toString(36).slice(-8);

      // Split name into first and last for billing/shipping
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Prepare WooCommerce customer creation payload
      const payload = {
        email,
        first_name: firstName,
        last_name: lastName,
        username: email.split('@')[0],
        billing: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: '00971501234567', // Required dummy phone number or replace with actual if available
          address_1: 'Test Street',
          city: 'Dubai',
          country: 'AE',
        },
        shipping: {
          first_name: firstName,
          last_name: lastName,
          address_1: 'Test Street',
          city: 'Dubai',
          country: 'AE',
        },
        // Optional: you may include password: randomPassword here if WooCommerce API requires it
      };

      // Create new WooCommerce customer
      wooCustomer = await createCustomer(payload);
    }

    console.log('✅ WooCommerce customer synced:', wooCustomer.id);

    // Save WooCommerce customer ID in Firestore under user's UID
    await setDoc(
      doc(db, 'users', uid),
      {
        email,
        wooCustomerId: wooCustomer.id,
      },
      { merge: true }
    );

    return wooCustomer;
  } catch (error) {
    // Extract detailed error message from WooCommerce API response if available
    let errorMessage = error.message;

    if (error.response?.data) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;

        if (error.response.data.data?.params) {
          const details = Object.entries(error.response.data.data.params)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join('\n');
          errorMessage += `\nDetails:\n${details}`;
        }
      }
    }

    console.error('❌ Error syncing WooCommerce:', {
      message: errorMessage,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    return null;
  }
};
