import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3/products';
const AUTH = {
  username: 'ck_8adb881aaff96e651cf69b9a8128aa5d9c80eb46',
  password: 'cs_595f6cb2c159c14024d77a2a87fa0b6947041f9f',
};

export default function ProductItemDetails({ productId }) {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE}/${productId}`, { auth: AUTH })
      .then((res) => {
        // WooCommerce REST API returns meta data in res.data.meta_data
        // Find the meta with key '_item_details'
        const itemDetailsMeta = res.data.meta_data?.find(
          (meta) => meta.key === '_item_details'
        );

        if (itemDetailsMeta && Array.isArray(itemDetailsMeta.value)) {
          setItemDetails(itemDetailsMeta.value);
        } else {
          setItemDetails([]);
        }
      })
      .catch((err) => {
        setError('Failed to fetch item details');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <p>Loading item details...</p>;
  if (error) return <p>{error}</p>;

  if (!itemDetails || itemDetails.length === 0) {
    return <p>No item details available.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '5px' }}>Key</th>
          <th style={{ border: '1px solid #ccc', padding: '5px' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {itemDetails.map((detail, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ccc', padding: '5px' }}>
              {detail.key}
            </td>
            <td style={{ border: '1px solid #ccc', padding: '5px' }}>
              {detail.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
