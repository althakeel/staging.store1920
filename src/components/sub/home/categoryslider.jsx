// src/components/home/CategorySlider.jsx
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/styles/CategorySlider.css";
import placeholderImg from "../../../assets/images/Skelton.png";
import { FaClock } from "react-icons/fa";

// Static category images
import Static1 from '../../../assets/images/megamenu/Main catogory webp/Electronics & Smart Devices.webp';
import Static2 from '../../../assets/images/megamenu/Main catogory webp/Home Appliances.webp';
import Static3 from '../../../assets/images/megamenu/Main catogory webp/Home Improvement & Tools.webp';
import Static4 from '../../../assets/images/megamenu/Main catogory webp/Furniture & Home Living.webp';
import Static5 from '../../../assets/images/megamenu/Main catogory webp/MenClothing.webp';
import Static6 from '../../../assets/images/megamenu/Main catogory webp/WomenClothing.webp';
import Static7 from '../../../assets/images/megamenu/Main catogory webp/Lingerie & Loungewear.webp';
import Static8 from '../../../assets/images/megamenu/Main catogory webp/Accessories.webp';
import Static9 from '../../../assets/images/megamenu/Main catogory webp/Beauty & Personal Care.webp';
import Static10 from '../../../assets/images/megamenu/Main catogory webp/Shoes & Footwear.webp';
import Static11 from '../../../assets/images/megamenu/Main catogory webp/Baby, Kids & Maternity.webp';
import Static12 from '../../../assets/images/megamenu/Main catogory webp/Toys, Games & Entertainment.webp';
import Static13 from '../../../assets/images/megamenu/Main catogory webp/Sports, Outdoors & Hobbies.webp';
import Static14 from '../../../assets/images/megamenu/Main catogory webp/Automotive & Motorcycle.webp';
import Static15 from '../../../assets/images/megamenu/Main catogory webp/Security & Safety.webp';
import Static16 from '../../../assets/images/megamenu/Main catogory webp/Pet Supplies.webp';
import Static17 from '../../../assets/images/megamenu/Main catogory webp/Special Occasion & Costumes.webp';

// WooCommerce API credentials
const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CK = "ck_408d890799d9dc59267dd9b1d12faf2b50f9ccc8";
const CS = "cs_c65538cff741bd9910071c7584b3d070609fec24";

// Global cache for categories to avoid repeated API calls
let categoriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Decode HTML entities - utility function
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Static categories with correct slugs matching WooCommerce
const STATIC_CATEGORIES = [
  { id: "498", name: "Electronics & Smart Devices", image: Static1, path: "/category/electronics-smart-devices", slug: "electronics-smart-devices" },
  { id: "6519", name: "Home Appliances", image: Static2, path: "/category/home-appliances", slug: "home-appliances" },
  { id: "6520", name: "Home Improvement & Tools", image: Static3, path: "/category/home-improvement-tools", slug: "home-improvement-tools" },
  { id: "6521", name: "Furniture & Home Living", image: Static4, path: "/category/furniture-home-living", slug: "furniture-home-living" },
  { id: "6522", name: "Men's Clothing", image: Static5, path: "/category/mens-clothing", slug: "mens-clothing" },
  { id: "6523", name: "Women's Clothing", image: Static6, path: "/category/womens-clothing", slug: "womens-clothing" },
  { id: "6524", name: "Lingerie & Loungewear", image: Static7, path: "/category/lingerie-loungewear", slug: "lingerie-loungewear" },
  { id: "6525", name: "Accessories", image: Static8, path: "/category/accessories", slug: "accessories" },
  { id: "6526", name: "Beauty & Personal Care", image: Static9, path: "/category/beauty-personal-care", slug: "beauty-personal-care" },
  { id: "6527", name: "Shoes & Footwear", image: Static10, path: "/category/shoes-footwear", slug: "shoes-footwear" },
  { id: "6528", name: "Baby, Kids & Maternity", image: Static11, path: "/category/baby-kids-maternity", slug: "baby-kids-maternity" },
  { id: "6529", name: "Toys, Games & Entertainment", image: Static12, path: "/category/toys-games-entertainment", slug: "toys-games-entertainment" },
  { id: "6530", name: "Sports, Outdoors & Hobbies", image: Static13, path: "/category/sports-outdoors-hobbies", slug: "sports-outdoors-hobbies" },
  { id: "6531", name: "Automotive & Motorcycle", image: Static14, path: "/category/automotive-motorcycle", slug: "automotive-motorcycle" },
  { id: "6532", name: "Security & Safety", image: Static15, path: "/category/security-safety", slug: "security-safety" },
  { id: "6533", name: "Pet Supplies", image: Static16, path: "/category/pet-supplies", slug: "pet-supplies" },
  { id: "6591", name: "Special Occasion & Costumes", image: Static17, path: "/category/special-occasion-costumes", slug: "special-occasion-costumes" },
];

const CategorySlider = () => {
  const [categories, setCategories] = useState(STATIC_CATEGORIES);
  const sliderRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Optimized API call with caching and faster fetching
  const loadCategories = async () => {
    // Check cache first
    const now = Date.now();
    if (categoriesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      setCategories(categoriesCache);
      return;
    }

    try {
      // Use abort controller for request cancellation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const res = await axios.get(`${API_BASE}/products/categories`, {
        auth: { username: CK, password: CS },
        params: { 
          per_page: 50, // Reduced from 100 for faster response
          orderby: 'count',
          order: 'desc',
          hide_empty: true, // Only categories with products
        },
        signal: controller.signal,
        timeout: 8000,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'max-age=300', // 5 minutes browser cache
        }
      });

      clearTimeout(timeoutId);

      if (!res.data || !Array.isArray(res.data)) {
        throw new Error('Invalid response format');
      }

      // More efficient filtering and mapping
      const filtered = res.data
        .filter(cat => cat.image && cat.count > 0)
        .slice(0, 17); // Limit to 17 categories for better performance

      const categoriesWithDeals = filtered.map(cat => ({
        id: String(cat.id),
        name: cat.name,
        image: cat.image,
        path: `/category/${cat.slug}`,
        slug: cat.slug,
        count: cat.count,
        isDeal: cat.name.toLowerCase().includes('electronics') || cat.name.toLowerCase().includes('fashion'),
        megaSale: cat.enable_offer === true,
        dealTime: 172800,
      }));

      // Cache the results
      categoriesCache = categoriesWithDeals;
      cacheTimestamp = now;
      
      setCategories(categoriesWithDeals);
    } catch (err) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.warn("Failed to fetch categories:", err.message);
      }
      // Keep static categories as fallback
      setCategories(STATIC_CATEGORIES);
    }
  };

  // Fetch categories from API - optimized with cleanup
  useEffect(() => {
    if (!isHomePage) return;
    
    let isMounted = true;
    let timeoutId;

    // Debounce API call to prevent rapid requests
    timeoutId = setTimeout(() => {
      if (isMounted) {
        loadCategories();
      }
    }, 100);

    return () => { 
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isHomePage, loadCategories]);

  // Memoized slider settings to prevent recreation on every render
  const settings = useMemo(() => ({
    dots: false,
    infinite: categories.length > 7,
    speed: 600,
    slidesToShow: Math.min(7, categories.length),
    slidesToScroll: 1,
    autoplay: categories.length > 0,
    autoplaySpeed: 3500,
    swipeToSlide: true,
    arrows: false,
    lazyLoad: "ondemand",
    pauseOnHover: true, // Better UX
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: Math.min(7, categories.length) } },
      { breakpoint: 1280, settings: { slidesToShow: Math.min(6, categories.length) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(4, categories.length) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(3, categories.length) } },
      { breakpoint: 480, settings: { slidesToShow: Math.min(2, categories.length) } },
      { breakpoint: 375, settings: { slidesToShow: Math.min(1, categories.length) } },
    ],
  }), [categories.length]);

  // Memoized navigation functions
  const goPrev = useCallback(() => sliderRef.current?.slickPrev(), []);
  const goNext = useCallback(() => sliderRef.current?.slickNext(), []);

  return (
    <section className="category-slider-container" style={{ position: "relative" }}>
      <button className="custom-prev-arrow" onClick={goPrev}>{"<"}</button>
      <button className="custom-next-arrow" onClick={goNext}>{">"}</button>

      <Slider {...settings} ref={sliderRef}>
        {categories.map((cat) => (
          <CategorySlide 
            key={cat.id} 
            category={cat} 
            decodeHTML={decodeHTML}
          />
        ))}
      </Slider>
    </section>
  );
};

// Memoized CategorySlide component to prevent unnecessary re-renders
const CategorySlide = React.memo(({ category, decodeHTML }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = useCallback(() => setIsDragging(false), []);
  const handleMouseMove = useCallback(() => setIsDragging(true), []);
  const handleClick = useCallback((e) => {
    if (isDragging) e.preventDefault();
  }, [isDragging]);

  const decodedName = useMemo(() => decodeHTML(category.name), [category.name, decodeHTML]);

  return (
    <div 
      className="category-slide" 
      onMouseDown={handleMouseDown} 
      onMouseMove={handleMouseMove}
    >
      <Link
        to={category.path || `/category/${category.slug}`}
        onClick={handleClick}
        className="category-link"
        style={{ textDecoration: "none", color: "#333" }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={category.image?.src || category.image || placeholderImg}
            alt={decodedName}
            className="category-image"
            loading="lazy" // Lazy loading for better performance
            decoding="async" // Async decoding
          />
          {category.megaSale && <div className="mega-sale-badge">Mega Sale</div>}
          {category.isDeal && <ProgressBar totalDuration={category.dealTime} />}
        </div>
        <div className="category-title">{decodedName}</div>
      </Link>
    </div>
  );
});

CategorySlide.displayName = 'CategorySlide';

// Optimized ProgressBar component with better performance
const ProgressBar = React.memo(({ totalDuration = 172800 }) => {
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const storedEnd = localStorage.getItem("dealEndTime");
    if (storedEnd && !isNaN(parseInt(storedEnd, 10))) {
      endTimeRef.current = parseInt(storedEnd, 10);
    } else {
      endTimeRef.current = Date.now() + totalDuration * 1000;
      localStorage.setItem("dealEndTime", endTimeRef.current.toString());
    }

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      setTimeLeft(diff);
      
      // Stop timer when reached zero
      if (diff <= 0) {
        localStorage.removeItem("dealEndTime");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [totalDuration]);

  const percent = useMemo(() => (timeLeft / totalDuration) * 100, [timeLeft, totalDuration]);

  const formattedTime = useMemo(() => {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }, [timeLeft]);

  // Don't render if time is up
  if (timeLeft <= 0) return null;

  return (
    <div className="deal-overlay">
      <div className="deal-hurry">🔥 Hurry Up!</div>
      <div className="deal-timer-text">
        <FaClock color="black" style={{ marginRight: "6px" }} /> 
        {formattedTime}
      </div>
      <div className="deal-progress-bar">
        <div 
          className="deal-progress" 
          style={{ 
            width: `${percent}%`,
            transition: 'width 0.3s ease' // Smooth animation
          }} 
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default CategorySlider;
