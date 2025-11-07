import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/FilterButton.css';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_be7e3163c85f7be7ca616ab4d660d65117ae5ac5';
const CONSUMER_SECRET = 'cs_df731e48bf402020856ff21400c53503d545ac35';

const sortOptions = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Popularity', value: 'popularity' },
];

const ratingOptions = [
  { label: '4 stars & up', value: 4 },
  { label: '3 stars & up', value: 3 },
  { label: '2 stars & up', value: 2 },
  { label: '1 star & up', value: 1 },
];

export default function FilterButton({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    selectedCategories: [],
    sortBy: '',
    bestSeller: false,
    recommended: false,
    fastDelivery: false,
    rating: 0,
  });

  const [storeMinPrice, setStoreMinPrice] = useState(0);
  const [storeMaxPrice, setStoreMaxPrice] = useState(1000);

  const dropdownRef = useRef(null);

  // Fetch product categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `${API_BASE}/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=100`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data.map((cat) => cat.name));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch min & max product prices
  useEffect(() => {
    async function fetchPriceRange() {
      try {
        const resAsc = await fetch(
          `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&orderby=price&order=asc&per_page=1`
        );
        const dataAsc = await resAsc.json();
        const minPrice = parseFloat(dataAsc[0]?.price) || 0;

        const resDesc = await fetch(
          `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&orderby=price&order=desc&per_page=1`
        );
        const dataDesc = await resDesc.json();
        const maxPrice = parseFloat(dataDesc[0]?.price) || 1000;

        setStoreMinPrice(minPrice);
        setStoreMaxPrice(maxPrice);

        setFilters((prev) => ({
          ...prev,
          priceMin: prev.priceMin || minPrice,
          priceMax: prev.priceMax || maxPrice,
        }));
      } catch (error) {
        console.error('Error fetching price range:', error);
      }
    }
    fetchPriceRange();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setFilters((prev) => {
      const selected = prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category];
      return { ...prev, selectedCategories: selected };
    });
  };

  // Handle generic input changes (checkbox, select)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle price inputs
  const handlePriceChange = (name, value) => {
    let numValue = Number(value);
    if (isNaN(numValue)) numValue = '';

    if (name === 'priceMin') {
      if (numValue < storeMinPrice) numValue = storeMinPrice;
      if (numValue > Number(filters.priceMax || storeMaxPrice))
        numValue = Number(filters.priceMax || storeMaxPrice);
    } else if (name === 'priceMax') {
      if (numValue > storeMaxPrice) numValue = storeMaxPrice;
      if (numValue < Number(filters.priceMin || storeMinPrice))
        numValue = Number(filters.priceMin || storeMinPrice);
    }

    setFilters((prev) => ({ ...prev, [name]: numValue }));
  };

  // Handle rating
  const handleRatingChange = (value) => {
    setFilters((prev) => ({ ...prev, rating: value }));
  };

  // Apply filters
  const applyFilters = () => {
    if (typeof onFilterChange === 'function') {
      onFilterChange(filters);
    }
    setIsOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      priceMin: storeMinPrice,
      priceMax: storeMaxPrice,
      selectedCategories: [],
      sortBy: '',
      bestSeller: false,
      recommended: false,
      fastDelivery: false,
      rating: 0,
    });
    if (typeof onFilterChange === 'function') {
      onFilterChange(null);
    }
    setIsOpen(false);
  };

  return (
    <div className="filter-btn-container" ref={dropdownRef}>
      <button
        className="filter-btn"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Filter
      </button>

      {isOpen && (
        <div className="filter-dropdown" role="dialog" aria-modal="true">
          {/* Price Range */}
          <div className="filter-section">
            <label className="filter-label">Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                min={storeMinPrice}
                max={Number(filters.priceMax) || storeMaxPrice}
                name="priceMin"
                value={filters.priceMin}
                onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                className="price-input"
                aria-label="Minimum price"
              />
              <span className="price-separator">—</span>
              <input
                type="number"
                min={Number(filters.priceMin) || storeMinPrice}
                max={storeMaxPrice}
                name="priceMax"
                value={filters.priceMax}
                onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                className="price-input"
                aria-label="Maximum price"
              />
            </div>
            <div className="price-range-display">
              {filters.priceMin} — {filters.priceMax}
            </div>
          </div>

       

          {/* Sort Options */}
          <div className="filter-section">
            <label className="filter-label" htmlFor="sortBy">
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="sort-select"
            >
              <option value="">Select...</option>
              {sortOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <label className="filter-label">Rating</label>
            <div className="rating-options">
              {ratingOptions.map(({ label, value }) => (
                <label key={value} className="rating-label">
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={filters.rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                  <span className="stars" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < value ? 'star filled' : 'star'}
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  &nbsp; {label}
                </label>
              ))}
            </div>
          </div>

          {/* Badge Checkboxes */}
          {/* <div className="filter-section checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="bestSeller"
                checked={filters.bestSeller}
                onChange={handleChange}
              />
              Best Seller
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="recommended"
                checked={filters.recommended}
                onChange={handleChange}
              />
              Recommended
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="fastDelivery"
                checked={filters.fastDelivery}
                onChange={handleChange}
              />
              Fast Delivery
            </label>
          </div> */}

          {/* Buttons */}
          <div className="filter-buttons">
            <button type="button" className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
            <button type="button" className="apply-btn" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
