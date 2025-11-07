// ProductDescription.jsx
import React from 'react';
import '../../assets/styles/ProductDescription.css';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function joinWithComma(items, key = 'id', display = 'name') {
  return items.map((item, i) => (
    <span key={item[key] || i} className={`${display.toLowerCase()}-name`}>
      {decodeHtml(item[display])}
      {i < items.length - 1 ? ', ' : ''}
    </span>
  ));
}


export default function ProductDescription({ product, selectedVariation }) {
  if (!product) return null;

  const descriptionHtml = selectedVariation?.description || product.description || '';
  const sku = selectedVariation?.sku || product.sku || '';
  const categories = product.categories || [];
  const tags = product.tags || [];
  const attributes = selectedVariation?.attributes?.length
    ? selectedVariation.attributes
    : product.attributes || [];
  const media = selectedVariation?.images || product.images || [];

  return (
    <section className="product-description-section">
      <h2>Product Details</h2>

      {/* SKU */}
      {sku && (
        <dl className="product-sku">
          <dt>SKU:</dt>
          <dd>{sku}</dd>
        </dl>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <dl className="product-categories">
          <dt>Categories:</dt>
          <dd>{joinWithComma(categories)}</dd>
        </dl>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <dl className="product-tags">
          <dt>Tags:</dt>
          <dd>{joinWithComma(tags)}</dd>
        </dl>
      )}

      {/* Attributes */}
      {attributes.length > 0 && (
        <section className="product-attributes">
          <h3>Attributes:</h3>
          <ul>
            {attributes.map((attr, i) => {
              const options = Array.isArray(attr.options) ? attr.options : [attr.options];
              const displayName = attr.name || attr.attribute_name || 'Attribute';
              const displayOptions = attr.option ? [attr.option] : options;
              return (
                <li key={attr.id || i}>
                  <strong>{displayName}:</strong> {displayOptions.join(', ')}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* 1️⃣ Description first */}
      <article
        className="product-description-content"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {/* 2️⃣ Media below the description */}
      {media.length > 0 && (
        <section className="product-description-media">
          {media.map((item, i) => {
            if (item.src || item.url) {
              return (
                <img
                  key={item.id || i}
                  src={item.src || item.url}
                  alt={item.alt || product.name || 'Product Image'}
                  className="product-desc-image"
                />
              );
            }
            if (item.video) {
              return (
                <video
                  key={item.id || i}
                  src={item.video}
                  controls
                  className="product-desc-video"
                />
              );
            }
            return null;
          })}
        </section>
      )}
    </section>
  );
}
