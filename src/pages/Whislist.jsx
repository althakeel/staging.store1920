import React, { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://db.store1920.com/wp-json/wishlist/v1/items', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch wishlist');
        return res.json();
      })
      .then(data => {
        setWishlistItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleRemove = (productId) => {
    // TODO: Implement AJAX call to remove item from wishlist backend
    // For now, optimistically update UI:
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  if (loading) return <div>Loading wishlist...</div>;
  if (error) return <div>Error: {error}</div>;
  if (wishlistItems.length === 0) return <div>Your wishlist is empty.</div>;

  return (
    <div style={{ maxWidth: 900, margin: '20px auto', padding: 20 }}>
      <h2>Your Wishlist</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Image</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Product Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Price</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  style={{ width: 80, height: 80, objectFit: 'contain' }}
                />
              </td>
              <td style={{ padding: '10px' }}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0071e3', textDecoration: 'none' }}
                >
                  {item.name}
                </a>
              </td>
              <td style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: item.price }} />
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: '#e53935',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
