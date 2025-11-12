// components/SkeletonLoader.jsx
import React from 'react';
import '../assets/styles/SkeletonLoader.css';

export default function SkeletonLoader() {
  return (
    <div className="product-details-container skeleton-container">
      <div className="left skeleton-left">
        <div className="skeleton-image" />
        <div className="skeleton-thumbnails">
          <div className="skeleton-thumb" />
          <div className="skeleton-thumb" />
          <div className="skeleton-thumb" />
        </div>
      </div>
      <div className="right skeleton-right">
        <div className="skeleton-title" />
        <div className="skeleton-text short" />
        <div className="skeleton-text long" />
        <div className="skeleton-text medium" />
        <div className="skeleton-button" />
      </div>
    </div>
  );
}
