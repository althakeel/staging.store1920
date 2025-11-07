// src/components/sub/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import "../../assets/styles/SearchBar.css";
import { useNavigate } from "react-router-dom";
import { searchProducts, getTopSoldProducts } from "../../api/woocommerce";
import { useAuth } from "../../contexts/AuthContext";

import category1 from '../../assets/images/megamenu/Sub catogory Webp/Baby Care & Hygiene copy.webp';
import Category2 from '../../assets/images/megamenu/Sub catogory Webp/Electronic Toys copy.webp';
import Category3 from '../../assets/images/megamenu/Sub catogory Webp/Smart Home Devices copy.webp';
import Category4 from '../../assets/images/megamenu/Sub catogory Webp/Wedding Dresses copy.webp';
import category5 from '../../assets/images/megamenu/Sub catogory Webp/Sports & Outdoor Toys copy.webp';

const BEST_CATEGORIES = [
  { id: "6634", name: "Baby Products", image: category1 },
  { id: "498", name: "Electronics", image: Category2 },
  { id: "6519", name: "Home & Kitchen", image: Category3 },
  { id: "6523", name: "Fashion", image: Category4 },
  { id: "6530", name: "Sports", image: category5 },
];

const SearchBar = () => {
  const { user } = useAuth();
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const wrapper = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const RECENT_SEARCH_KEY = "guest_recent_searches";

  // Animation phrases
  const phrases = [
    "Search for Electronics...",
    "Find Baby Products...",
    "Look for Fashion Items...",
    "Discover Home & Kitchen...",
    "Browse Sports Equipment...",
    "Search products by name...",
  ];

  // Typing animation effect
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeEffect = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setPlaceholderText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId = setTimeout(typeEffect, 500); // Pause before typing next
        } else {
          timeoutId = setTimeout(typeEffect, 50); // Deleting speed
        }
      } else {
        setPlaceholderText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeEffect, 2000); // Pause before deleting
        } else {
          timeoutId = setTimeout(typeEffect, 100); // Typing speed
        }
      }
    };

    typeEffect();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Load recent searches for guest users
  useEffect(() => {
    if (!user?.id) {
      const stored = JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY) || "[]");
      setRecentSearches(stored);
    }
  }, [user]);

  // Fetch top sold products (last 24h)
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const results = await getTopSoldProducts(24);
        setTopProducts(results.slice(0, 5));
      } catch (err) {
        console.error("Error fetching top sold products:", err);
        setTopProducts([]);
      }
    };
    fetchTopProducts();
  }, []);

  // Fetch search suggestions dynamically
  useEffect(() => {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const results = await searchProducts(term);
        const mapped = results.map((p) => ({
          label: p.name,
          slug: p.slug,
          id: p.id,
        }));
        setSuggestions(mapped.slice(0, 10));
      } catch (err) {
        console.error("Error searching products:", err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [term]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapper.current && !wrapper.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300);
  };
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);

  const saveRecentSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    if (!user?.id) {
      const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5);
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    }
  };

  const deleteRecentSearch = (searchToDelete) => {
    if (!user?.id) {
      const updated = recentSearches.filter((s) => s !== searchToDelete);
      localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    }
  };

const goToProduct = (slug = null, customLabel = "") => {
  const searchTerm = customLabel || term;
  saveRecentSearch(searchTerm);

  // Do NOT clear term here
  if (slug) navigate(`/product/${slug}`);
  else navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
};

  const goToCategory = (slug) => navigate(`/category/${slug}`);

  const highlightTerm = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="highlight-term">{part}</span> : part
    );
  };

  const matchingCategories = term
    ? BEST_CATEGORIES.filter(
        (cat) =>
          cat.name.toLowerCase().includes(term.toLowerCase()) ||
          cat.id.includes(term)
      )
    : [];

  return (
    <>
      <style>
        {`
          .scoped-search-input::placeholder {
            color: #999;
            transition: color 0.3s ease;
          }
          
          .scoped-search-input:focus::placeholder {
            color: transparent;
          }
          
          .scoped-search-dropdown {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 150%;
            min-width: 500px;
            max-width: 700px;
            margin-top: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            border-radius: 12px;
            border: 1px solid #e0e0e0;
            background: white;
            z-index: 1000;
            opacity: 0;
            animation: slideDown 0.2s ease forwards;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
          
          .scoped-search-dropdown::before {
            content: '';
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #e0e0e0;
          }
          
          .scoped-search-dropdown::after {
            content: '';
            position: absolute;
            top: -7px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid white;
          }
          
          .scoped-search-wrap {
            position: relative;
          }
          
          .scoped-search-item {
            padding: 12px 16px;
            transition: background-color 0.2s ease;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .scoped-search-item:hover {
            background-color: #f5f5f5;
          }
          
          .scoped-search-item-content {
            flex: 1;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          
          .delete-recent-btn {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 4px 8px;
            border-radius: 50%;
            font-size: 18px;
            opacity: 0;
            transition: all 0.2s ease;
            margin-left: 8px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .scoped-search-item:hover .delete-recent-btn {
            opacity: 1;
          }
          
          .delete-recent-btn:hover {
            background-color: #ff4444;
            color: white;
            transform: scale(1.1);
          }
          
          .scoped-search-title {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            padding: 8px 16px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
            margin: 0;
          }
          
          .scoped-search-title:first-child {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }
        `}
      </style>
      <div
        className="scoped-search-wrap"
        ref={wrapper}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
      <div
        className={`scoped-search-bar ${open ? "focused" : ""}`}
        onClick={() => setOpen(true)}
      >
        <input
          className="scoped-search-input"
          type="text"
          placeholder={placeholderText}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === "Enter") goToProduct(); }}
          autoComplete="off"
          spellCheck="false"
        />
        {term && (
          <button
            className="scoped-search-clear"
            onClick={() => setTerm("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        <button
          className="scoped-search-btn"
          onClick={() => goToProduct()}
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="scoped-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {open && (suggestions.length > 0 || matchingCategories.length > 0 || recentSearches.length > 0) && (
        <div className="scoped-search-dropdown" style={{ 
          maxHeight: '400px', 
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          <div className="scoped-search-grid">

            {/* Matching Categories */}
            {term && matchingCategories.length > 0 && (
              <>
                <div className="scoped-search-title">Categories</div>
                {matchingCategories.map((cat) => (
                  <div
                    key={`cat-${cat.id}`}
                    className="scoped-search-item category-search-item"
                    onMouseDown={() => goToCategory(cat.id)}
                  >
                    <img src={cat.image} alt={cat.name} style={{ width: '24px', marginRight: '8px' }} />
                    {highlightTerm(cat.name, term)}
                  </div>
                ))}
              </>
            )}

            {/* Live search suggestions */}
            {term && suggestions.length > 0 && (
              <>
                <div className="scoped-search-title">Products</div>
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    className="scoped-search-item"
                    onMouseDown={() => { setTerm(item.label); goToProduct(item.slug, item.label); }}
                  >
                    {highlightTerm(item.label, term)} {item.id ? `(ID: ${item.id})` : ""}
                  </div>
                ))}
              </>
            )}

            {/* No results */}
            {term && suggestions.length === 0 && matchingCategories.length === 0 && (
              <div className="scoped-search-item muted">No results found</div>
            )}

            {/* Recent Searches */}
            {!term && recentSearches.length > 0 && (
              <>
                <div className="scoped-search-title">Recent Searches</div>
                {recentSearches.map((s, idx) => (
                  <div
                    key={`recent-${idx}`}
                    className="scoped-search-item"
                  >
                    <div
                      className="scoped-search-item-content"
                      onMouseDown={() => {
                        setTerm(s);
                        goToProduct(null, s);
                      }}
                    >
                      <svg 
                        style={{ width: '16px', height: '16px', marginRight: '8px', color: '#666' }}
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      {s}
                    </div>
                    <button
                      className="delete-recent-btn"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        deleteRecentSearch(s);
                      }}
                      aria-label="Delete search"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}


            {/* Best Categories */}
            {/* {!term && BEST_CATEGORIES.length > 0 && (
              <>
                <div className="scoped-search-title" style={{ marginTop: '12px' }}>Best Selling Categories</div>
                <div className="categories-grid">
                  {BEST_CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      className="category-item"
                      onMouseDown={() => goToCategory(cat.id)}
                    >
                      <img src={cat.image} alt={cat.name} />
                      <span style={{color:"#000"}}>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )} */}

          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SearchBar;
