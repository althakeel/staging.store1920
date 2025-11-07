import React, { useEffect, useState } from 'react';
import { useCompare } from '../contexts/CompareContext';
import { getProductsByIds } from '../api/woocommerce'; // ✅ fixed path

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (compareIds.length === 0) {
      setProducts([]);
      return;
    }
    const fetchData = async () => {
      const data = await getProductsByIds(compareIds);
      setProducts(data || []);
    };
    fetchData();
  }, [compareIds]);

  if (products.length === 0) {
    return <div style={{ padding: 20 }}>No products to compare.</div>;
  }

  const allSpecs = Array.from(
    new Set(products.flatMap((p) => p.attributes.map((a) => a.name)))
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Comparison</h2>

      <div style={{ overflowX: 'auto', marginTop: 20 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={thStyle}>Specs</th>
              {products.map((p) => (
                <th style={thStyle} key={p.id}>
                  {p.name}
                  <br />
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    style={removeBtn}
                  >
                    Remove
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Image</td>
              {products.map((p) => (
                <td style={tdStyle} key={p.id}>
                  <img
                    src={p.images[0]?.src || ''}
                    alt={p.name}
                    style={{ maxHeight: 100 }}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td style={tdStyle}>Price</td>
              {products.map((p) => (
                <td style={tdStyle} key={p.id}>
                  ${p.price}
                </td>
              ))}
            </tr>
            {allSpecs.map((spec) => (
              <tr key={spec}>
                <td style={tdStyle}>{spec}</td>
                {products.map((p) => {
                  const attr = p.attributes.find((a) => a.name === spec);
                  return (
                    <td style={tdStyle} key={p.id + spec}>
                      {attr ? attr.options.join(', ') : '-'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={() => alert('Sending products to checkout...')}
          style={checkoutBtn}
        >
          Add All to Checkout
        </button>
        <button
          onClick={clearCompare}
          style={{ ...checkoutBtn, backgroundColor: '#aaa', marginLeft: 10 }}
        >
          Clear Compare
        </button>
      </div>
    </div>
  );
}

/* ✅ define missing styles */
const thStyle = {
  border: '1px solid #ccc',
  padding: 10,
  background: '#f9f9f9',
  textAlign: 'center',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: 10,
  textAlign: 'center',
};

const removeBtn = {
  marginTop: 5,
  padding: '4px 8px',
  background: '#e60000',
  color: '#fff',
  fontSize: '12px',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};

const checkoutBtn = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#ff6600',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
