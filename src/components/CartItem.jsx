import React from 'react';
import { useCart } from '../contexts/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import '../assets/styles/cartitem.css';

function CartItem({ item, isUnavailable = false }) {
  const { updateQuantity, removeFromCart } = useCart();

  // Parse prices safely
  const price = parseFloat(item.price);
  const originalPrice = parseFloat(item.originalPrice);


  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  // Check discount eligibility
  const hasDiscount =
    !isNaN(originalPrice) && !isNaN(price) && originalPrice > price;

  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Limit quantity options to stock or max 10
  const maxQty = item.stock ? Math.min(item.stock, 10) : 10;

  // Product image fallback
  const imageURL =
    item.images?.[0]?.src || item.image || 'https://via.placeholder.com/80?text=No+Image';

  // Shorten long product titles
  const shortTitle =
    item.name && item.name.length > 100 ? item.name.slice(0, 100).trim() + '…' : item.name;

  return (
    <div className={`cart-item ${isUnavailable ? 'unavailable' : ''}`}>
      {/* Product Image */}
      <img src={imageURL} alt={item.name} className="item-image" />

      {/* Product Details */}
      <div className="item-info">
        {/* Title + Remove button */}
        <div className="item-top-row">
          <div className="item-title" title={item.name}>
          {decodeHtml(shortTitle)}
          </div>
          {!isUnavailable && (
            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
              type="button"
              aria-label={`Remove ${item.name} from cart`}
            >
              <FaTrashAlt size={14} />
            </button>
          )}
        </div>
  
        {/* Variant info */}
        {item.variants && <div className="item-variant">{item.variants}</div>}

        {/* Price and Quantity row */}
        <div className="price-qty-row">
          <div className="price-row">
            {hasDiscount ? (
              <>
                <span className="item-price">AED {price.toFixed(2)}</span>
                <span className="item-original">AED {originalPrice.toFixed(2)}</span>
                <span className="item-discount">{discountPercent}% OFF</span>
              </>
            ) : (
              <span className="item-price">
                AED {!isNaN(price) ? price.toFixed(2) : '0.00'}
              </span>
            )}
          </div>

          {!isUnavailable ? (
            <select
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="qty-select"
              aria-label={`Select quantity for ${item.name}`}
            >
              {[...Array(maxQty)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Qty {i + 1}
                </option>
              ))}
            </select>
          ) : (
            <div className="sold-out-text">This item is sold out.</div>
          )}
        </div>
        <hr className="divider" />
      </div>
      
    </div>
  );
}

export default CartItem;
