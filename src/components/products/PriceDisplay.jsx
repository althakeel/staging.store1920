import React from 'react';
import '../../assets/styles/PriceDisplay.css';
import DirhamIcon from '../../assets/images/Dirham 2.png';

function safeParsePrice(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

// Helper to split integer and decimal
function formatPrice(price) {
  const [intPart, decPart] = price.toFixed(2).split('.');
  return { intPart, decPart };
}

export default function PriceDisplay({ product, selectedVariation }) {
  const defaultVariation = product.variations?.[0] || {};

  const price = selectedVariation?.price ?? defaultVariation.price ?? product.price ?? 0;
  const regularPrice = selectedVariation?.regular_price ?? defaultVariation.regular_price ?? product.regular_price ?? 0;
  const salePrice = selectedVariation?.sale_price ?? defaultVariation.sale_price ?? product.sale_price ?? 0;

  const priceNum = safeParsePrice(price);
  const regularPriceNum = safeParsePrice(regularPrice);
  const salePriceNum = safeParsePrice(salePrice);

  let discountPercent = 0;
  if (regularPriceNum > 0 && salePriceNum > 0 && regularPriceNum !== salePriceNum) {
    discountPercent = Math.round(((regularPriceNum - salePriceNum) / regularPriceNum) * 100);
  }

  const displayPrice = salePriceNum > 0 && salePriceNum !== regularPriceNum ? salePriceNum : priceNum;
  const { intPart, decPart } = formatPrice(displayPrice);

  const displayRegularPrice = regularPriceNum > 0 ? formatPrice(regularPriceNum) : null;

  return (
    <div className="pd-price-container">
      <span className="pd-sale-price">
        <span className="price-wrapper">
          <img src={DirhamIcon} alt="Dirham" className="currency-icon" />
          <span className="price-int">{intPart}</span>
          <span className="price-dec">.{decPart}</span>
        </span>
      </span>

      {salePriceNum > 0 && salePriceNum !== regularPriceNum && (
        <>
          <span className="pd-regular-price">
            <span className="price-wrapper">
              <img src={DirhamIcon} alt="Dirham" className="currency-icon1" />
              <span className="price-int">{displayRegularPrice.intPart}</span>
              <span className="price-dec">.{displayRegularPrice.decPart}</span>
            </span>
          </span>
          {discountPercent > 0 && <span className="pd-discount-badge">{discountPercent}% OFF</span>}
        </>
      )}
    </div>
  );
}
