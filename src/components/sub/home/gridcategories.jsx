// src/components/home/GridCategories.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/home/GridCategories.css";
import { useCart } from "../../../contexts/CartContext";

// Images
import PlaceHolderImage from "../../../assets/images/common/Placeholder.png";
import grid1 from "../../../assets/images/gridhome/1 (1).png";
import grid2 from "../../../assets/images/gridhome/2.png";
import grid3 from "../../../assets/images/gridhome/3.png";
import grid4 from "../../../assets/images/gridhome/4.png";

import Static1 from '../../../assets/images/stattic/static1.png'
import Static2 from '../../../assets/images/stattic/static2.jpg'
import Static3 from '../../../assets/images/stattic/static3.jpg'
import Static4 from '../../../assets/images/stattic/static4.jpg'

// WooCommerce API credentials
const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CK = "ck_408d890799d9dc59267dd9b1d12faf2b50f9ccc8";
const CS = "cs_c65538cff741bd9910071c7584b3dffb";

// Static left categories
const staticCategories = [
  { id: 1, name: "Mobiles & Tablets", image: grid2, link: "/category/laptops-tablets" },
  { id: 2, name: "Auto & Moto", image: grid4, link: "/category/automotive-motorcycle" },
  { id: 3, name: "Fashion Deals", image: grid1, link: "/category/mens-watches" },
  { id: 4, name: "Home & Kitchen", image: grid3, link: "/category/home-office-essentials" },
];

// Initial placeholder products (shown instantly)
const initialProductPlaceholders = [
  { 
    id: 128574, 
    slug: "ip68-universal-waterproof-phone-cases-bag-for-iphone-16-15-14-13-12-11-pro-max-x-xiaomi-samsung-s24-ultra-swim-cover-accessories", 
    name: "IP68 Universal Waterproof Phone Cases Bag For iP", 
    price: "8.16",  
    images: [{ src: Static1 }]  
  },
  { 
    id: 126009, 
    slug: "ibudim-bike-phone-holder-360-rotation-bicycle-phone-holder-for-4-7-7-0-inch-devices-motorcycle-handlebar-mobile-phone-stand", 
    name: "iBudim Bike Phone Holder 360 Rotation Bicycle Phone Holder for 4.7-7.0 inc", 
    price: "22.17", 
    images: [{ src: Static2 }] 
  },
  { 
    id: 125961, 
    slug: "portable-mini-selfie-fill-light-rechargeable-3-modes-adjustable-brightness-clip-on-for-mobile-phone-make-up-computer-fill-light", 
    name: "Portable Mini Selfie Fill Light Rechargeable 3 Modes Adjustable Brightness C", 
    price: "58.16", 
    images: [{ src: Static3 }] 
  },
  { 
    id: 125925, 
    slug: "multifunction-6-in-1-otg-sd-card-reader-usb2-0-type-c-tf-sd-memory-card-smart-cardreader-for-laptop-accessories-adapter", 
    name: "Multifunction 6 in 1 OTG SD Card Reader USB2.0 Type-C/TF/SD Memory Card", 
    price: "11.47", 
    images: [{ src: Static4 }] 
  },
];

// Countdown hook
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        h: Math.floor(distance / (1000 * 60 * 60)),
        m: Math.floor((distance / (1000 * 60)) % 60),
        s: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

const GridCategories = () => {
  const [products, setProducts] = useState(initialProductPlaceholders);
  const [banners, setBanners] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [targetDate] = useState(new Date().getTime() + 24 * 60 * 60 * 1000);

  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const featuredCountdown = useCountdown(targetDate);

  // Resize detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-slide banners
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, banners.length]);

  // Fetch real products in background
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${API_BASE}/products?consumer_key=${CK}&consumer_secret=${CS}&per_page=4&page=1&orderby=date&order=asc&_fields=id,name,price,regular_price,images`;
        const res = await fetch(url);
        const data = await res.json();

        if (data?.length > 0) {
          const formatted = data.map((prod) => ({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            regular_price: prod.regular_price,
            images: prod.images?.length ? prod.images : [{ src: PlaceHolderImage }],
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Set banners
  useEffect(() => {
    setBanners([
      { id: 1, image: "https://db.store1920.com/wp-content/uploads/2025/11/Sub-1-1.webp" },
      { id: 2, image: "https://db.store1920.com/wp-content/uploads/2025/11/Banners-Tamara.webp" },
    ]);
  }, []);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="gcx-container">
      {/* LEFT */}
      <div className="gcx-left">
        <h3 className="gcx-section-title">More Reasons to Shop</h3>
        <div className="gcx-left-grid">
          {staticCategories.map((cat) => (
            <div key={cat.id} className="gcx-category-card" onClick={() => navigate(cat.link)}>
              <img src={cat.image || PlaceHolderImage} alt={cat.name} style={{ objectFit: "fill" }} />
              <div className="gcx-cat-info">
                <h4>{cat.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER */}
      <div className="gcx-middle">
        <div className="gcx-featured-header">
          <h3 className="gcx-mega-title">MEGA DEALS</h3>
          <div className="gcx-featured-countdown">
            ⏳ {featuredCountdown.h}h : {featuredCountdown.m}m : {featuredCountdown.s}s
          </div>
        </div>

        <div className="gcx-middle-grid">
          {products.map((prod, idx) => {
            const inCart = isInCart(prod.id);
            const displayName =
              prod.name?.length > 22 ? prod.name.substring(0, 22) + "…" : prod.name || "Loading...";

            return (
              <div key={prod.id || `ph-${idx}`} className="gcx-product-card"
                onClick={() => prod.id && navigate(`/product/${prod.slug}`)}>
                <img
                  src={prod?.images?.[0]?.src || PlaceHolderImage}
                  alt={prod?.name || "Product"}
                  className="gcx-product-image"
                  loading="lazy"
                />
                <h4
                  className="gcx-product-title"
                  style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {displayName}
                </h4>
                {prod?.price && (
                  <div className="gcx-price-wrap">
                    {prod?.regular_price && <span className="gcx-old-price">AED {prod.regular_price}</span>}
                    <span className="gcx-product-price">AED {prod.price}</span>
                  </div>
                )}
                {prod?.id && (
                  <button className="gcx-cart-btn" onClick={() => !inCart && addToCart(prod)}>
                    {inCart ? "Added" : "Add to Cart"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div className="gcx-right">
        {isMobile ? (
          <div className="gcx-banner">
            <img
              src={banners[currentBanner]?.image}
              alt={`Banner ${banners[currentBanner]?.id}`}
              style={{ transition: "opacity 0.5s ease-in-out" }}
            />
          </div>
        ) : (
          banners.map((ban) => (
            <div key={ban.id} className="gcx-banner">
              <img src={ban.image} alt={`Banner ${ban.id}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridCategories;
