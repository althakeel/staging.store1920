import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

// Safely import staticProducts with fallback
let staticProducts = [];
try {
  const staticProductsModule = require('../../data/staticProducts');
  staticProducts = staticProductsModule.default || staticProductsModule || [];
} catch (error) {
  console.warn('Could not load static products data:', error);
  staticProducts = [];
}

// Utility: convert product name to slug
const slugify = (text) =>
  text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-') || '';

const ItemList = ({ items = [], onRemove, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const { removeFromCart, updateQuantity } = useCart();

  if (!items.length) return <p style={{ textAlign: 'center', marginTop: 20 }}>Your cart is empty.</p>;

  // Get all static product IDs for COD checking
  let staticProductIds = [];
  try {
    staticProductIds = staticProducts.flatMap(product => {
      const ids = [];
      if (product.id) {
        ids.push(product.id);
      }
      if (product.bundles && Array.isArray(product.bundles)) {
        product.bundles.forEach(bundle => {
          if (bundle.id) {
            ids.push(bundle.id);
          }
        });
      }
      return ids;
    });
  } catch (error) {
    console.warn('Error loading static products for COD checking:', error);
    staticProductIds = [];
  }

  const handleItemClick = (item) => {
    if (!item || !item.name) return;
    navigate(`/product/${slugify(item.name)}`);
  };

  const handleRemove = (id) => {
    if (onRemove) onRemove(id);
    else removeFromCart?.(id);
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    const id = item.id ?? item.product_id ?? item.sku;
    if (newQuantity <= 0) return handleRemove(id);

    if (onUpdateQuantity) onUpdateQuantity(id, newQuantity);
    else if (updateQuantity) updateQuantity(id, newQuantity);
  };

  const quantityStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  };

  const qtyButtonStyle = {
    width: 28,
    height: 28,
    border: '1px solid #ccc',
    borderRadius: 4,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const qtyNumberStyle = {
    minWidth: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={{ padding:"16px 5px" }}>
      <h3 style={{ marginBottom: 16 }}>Items in Cart ({items.length})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {items.map((item, index) => {
          const key = `${item.id ?? item.product_id ?? 'item'}-${index}`;
          const imageUrl = item.images?.[0]?.src || item.images?.[0]?.url || item.image || '';
          const rawPrice = item.prices?.price ?? item.price ?? 0;
          const price = parseFloat(rawPrice).toFixed(2);

          const hasStockInfo = ['stock_quantity', 'in_stock', 'is_in_stock', 'stock_status'].some(
            (key) => Object.prototype.hasOwnProperty.call(item, key)
          );

          const stockOutByQuantity =
            typeof item.stock_quantity === 'number' && item.stock_quantity <= 0;
          const stockOutByFlag =
            (typeof item.in_stock === 'boolean' && !item.in_stock) ||
            (typeof item.is_in_stock === 'boolean' && !item.is_in_stock) ||
            (typeof item.stock_status === 'string' &&
              item.stock_status.toLowerCase() !== 'instock');

          const isOutOfStock =
            (!price || parseFloat(price) <= 0) &&
            (hasStockInfo && (stockOutByQuantity || stockOutByFlag));

          // Check if this item supports COD
          const isCodAvailable = staticProductIds.includes(item.id);

          return (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 12,
                border: '1px solid #eee',
                borderRadius: 8,
                position: 'relative',
                opacity: isOutOfStock ? 0.6 : 1,
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name || 'Product image'}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div
                  style={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#f0f0f0',
                    borderRadius: 6,
                    color: '#888',
                  }}
                >
                  No image
                </div>
              )}

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
                <p style={{ margin: '4px 0' }}>AED {price} × <span style={{fontWeight:"bold"}}>{item.quantity ?? 1}</span></p>
                
                {/* COD Availability Badge */}
                <div style={{ marginTop: 6 }}>
                  {isCodAvailable ? (
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      border: '1px solid #c3e6cb',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}>
                      ✓ COD Available
                    </span>
                  ) : (
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 8px',
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      border: '1px solid #f5c6cb',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}>
                      ✗ COD Not Available
                    </span>
                  )}
                </div>

                <div style={quantityStyle}>
                  <button
                    style={qtyButtonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateQuantity(item, (item.quantity ?? 1) - 1);
                    }}
                  >
                    −
                  </button>

                  <span style={qtyNumberStyle}><span style={{color:"#dd5405ff",fontWeight:"bold"}}>{item.quantity ?? 1}</span></span>

                  <button
                    style={qtyButtonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateQuantity(item, (item.quantity ?? 1) + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                
              </div>
                

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id ?? item.product_id ?? item.sku ?? index);
                }}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 35,
                  cursor: 'pointer',
                  color: '#888',
                }}
              >
                ×
              </button>

              {isOutOfStock && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(255,0,0,0.8)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: 4,
                    fontWeight: 'bold',
                  }}
                >
                  Out of Stock
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;
