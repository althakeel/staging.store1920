// src/components/ProductCategory.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../assets/styles/ProductCategory.css";
import { useCart } from "../../../contexts/CartContext";
import MiniCart from "../../MiniCart";
import AddCarticon from "../../../assets/images/addtocart.png";
import AddedToCartIcon from "../../../assets/images/added-cart.png";
import IconAED from "../../../assets/images/Dirham 2.png";
import TitleImage from "../../../assets/images/seasontitle/Halloween mini banner.webp";
import PlaceholderImage from "../../../assets/images/common/Placeholder.png";
import { throttle } from "lodash";
import { API_BASE, CONSUMER_KEY, CONSUMER_SECRET } from "../../../api/woocommerce";
import ProductCardReviews from "../../temp/productcardreviews";
import Product1 from '../../../assets/images/staticproducts//pressurewasher/1.webp';
import Product2 from '../../../assets/images/staticproducts/airbed/1.webp'
import Product3 from '../../../assets/images/staticproducts/paintspray/14.webp'
import Product4 from '../../../assets/images/staticproducts/pruningmachine/10.webp'
import Product5 from '../../../assets/images/staticproducts//gamekit/1.webp'
import Product7 from '../../../assets/images/staticproducts/Air Blower/1.webp'
import Product8 from '../../../assets/images/staticproducts//AIR BLOWER MINI/1.webp'
import Product9 from '../../../assets/images/staticproducts/Steamer/1.webp'
import Product6 from '../../../assets/images/staticproducts/Peeler/1.webp'
// import Product8 from '../../../assets/images/staticproducts/'


const PAGE_SIZE = 10;
const INITIAL_VISIBLE = 24;
const PRODUCT_FETCH_LIMIT = 12;
const RECOMMENDED_CATEGORY_LIMIT = 8;
const CATEGORY_PAGE_LIMIT = 4;
const MAX_PRODUCTS = 180;


// Utility to decode HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Skeleton Loader
const SkeletonCard = () => (
  <div className="pcus-prd-card pcus-skeleton">
    <div className="pcus-prd-image-skel" />
    <div className="pcus-prd-info-skel">
      <div className="pcus-prd-title-skel" />
      <div className="pcus-prd-price-cart-skel" />
    </div>
  </div>
);

// Price Component
const Price = ({ value, className }) => {
  if (!value) return null;
  const price = parseFloat(value || 0).toFixed(2);
  const [int, dec] = price.split(".");
  return (
    <span className={className}>
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>{int}</span>
      <span style={{ fontSize: "12px" }}>.{dec}</span>
    </span>
  );
};



// Shuffle Array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Static Products
const staticProducts = [
  {
    id: "68V Cordless Portable Car Wash Pressure Washer Gun with Dual",
    name: "68V Cordless Portable Car Wash Pressure Washer Gun with Dual",
    price: "69.90",
    regular_price: "149.90",
    sale_price: "69.90",
    images: [{ src: Product1 }],
    slug: "68v-cordless-portable-car-wash-pressure-washer-gun-with-dual",
    path: "/products/68v-cordless-portable-car-wash-pressure-washer-gun-with-dual",
    rating: 4,
    reviews: 18,
    sold: 120
  },
    {
    id: "twin-size-air-mattress-with-built-in-rechargeable-pump-16-self-inflating-blow-up-bed-for-home-camping-guests",
    name: "Twin Size Air Mattress with Built-in Rechargeable Pump – 16 Self-Inflating Blow Up Bed for Home, Camping & Guests",
    price: "139.00",
    regular_price: "189.0",
    sale_price: "139.00",
    images: [{ src:Product2 }],
    slug: "twin-size-air-mattress-with-built-in-rechargeable-pump-16-self-inflating-blow-up-bed-for-home-camping-guests",
    path: "/products/twin-size-air-mattress-with-built-in-rechargeable-pump-16-self-inflating-blow-up-bed-for-home-camping-guests",
    rating: 5,
    reviews: 45,
    sold: 135,
  },
   {
    id: "850w-electric-paint-sprayer-uae",
    name: "Electric Paint Sprayer",
    price: "89.99",
    regular_price: "250.0",
    sale_price: "89.99",
    images: [{ src:Product3 }],
    slug: "850w-electric-paint-sprayer-uae",
    path: "/products/850w-electric-paint-sprayer-uae",
    rating: 5,
    reviews: 159,
    sold: 195,
  },
     {
    id: "5",
    name: "TrimPro™ 21V Cordless Electric Pruning Shears",
    price: "109.9",
    regular_price: "250.0",
    sale_price: "109.9",
    images: [{ src:Product4 }],
    slug: "trimpro-21v-cordless-electric-pruning-shears",
    path: "/products/trimpro-21v-cordless-electric-pruning-shears",
    rating: 5,
    reviews: 169,
    sold: 225,
  },
     {
    id: "6",
    name: "GameBox 64 Retro Console – 20,000+ Preloaded Games with 4K HDMI & Wireless Controllers",
    price: "96.00",
    regular_price: "96.0",
    sale_price: "69.99",
    images: [{ src:Product5 }],
    slug: "gamebox-64-retro-console-20000-preloaded-games-4k-hdmi-wireless-controllerse",
    path: "/products/gamebox-64-retro-console-20000-preloaded-games-4k-hdmi-wireless-controllers",
    rating: 5,
    reviews: 110,
    sold: 185,
  },
       {
    id: "7",
    name: "Cordless 2-in-1 Leaf Blower & Vacuum",
    price: "55.90",
    regular_price: "189.00",
    sale_price: "55.90",
    images: [{ src:Product7 }],
    slug: "cordless-2-in-1-leaf-blower-vacuum",
    path: "/products/cordless-2-in-1-leaf-blower-vacuum",
    rating: 5,
    reviews: 195,
    sold: 285,
  },

      {
    id: "8",
 name: "Turbo Cordless Leaf Blower – 21V Power for Every Task",
    price: "49.90",
    regular_price: "99.98",
    sale_price: "49.90",
    images: [{ src:Product8 }],
    slug: "turbo-cordless-leaf-blower-21v-power-for-every-task",
    path: "/products/turbo-cordless-leaf-blower-21v-power-for-every-task",
    rating: 5,
    reviews: 125,
    sold: 299,
  },
     {
    id: "9",
    name: "Steam Cleaner DF-A001 – Japan Technology",
    price: "89.90",
    regular_price: "129.98",
    sale_price: "89.90",
    images: [{ src:Product9 }],
    slug: "steam-cleaner-df-a001-japan-technology",
    path: "/products/steam-cleaner-df-a001-japan-technology",
    rating: 5,
    reviews: 125,
    sold: 299,   
  },
  {
    id: "10",
    name: "Electric Grape & Garlic Peeling Machine",
    price: "89.00",
    regular_price: "100.00",
    sale_price: "89.0",
    images: [{ src:Product6 }],
    slug: "electric-grape-garlic-peeling-machine",
    path: "/products/electric-grape-garlic-peeling-machine",
    rating: 5,
    reviews: 199,
    sold: 305,
  },
];
 

const staticPositions = [2,5, 11, 15, 19, 24,28, 32, 39,22,];

const ProductCategory = () => {
  const { addToCart, cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const [categories, setCategories] = useState([]);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [badgeText, setBadgeText] = useState("MEGA OFFER");
  const [animate, setAnimate] = useState(true);

  const categoriesRef = useRef(null);
  const cartIconRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [allProducts, setAllProducts] = useState([]); // fetched products
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const hasMoreProducts = visibleCount < allProducts.length;


  const [categoryProducts, setCategoryProducts] = useState([]); // products for selected category
const [categoryPage, setCategoryPage] = useState(1);
const [categoryHasMore, setCategoryHasMore] = useState(true);

  // Fetch categories
  const fetchCategories = useCallback(async (page = 1) => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${API_BASE}/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${PAGE_SIZE}&page=${page}&orderby=name`
      );
      const data = await res.json();
      setCategories(prev => (page === 1 ? data : [...prev, ...data]));
      setHasMoreCategories(data.length === PAGE_SIZE);
    } catch {
      setHasMoreCategories(false);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Badge animation
  useEffect(() => {
    const texts = ["MEGA OFFER", "HURRY UP"];
    let idx = 0;
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        idx = (idx + 1) % texts.length;
        setBadgeText(texts[idx]);
        setAnimate(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async (categoryId) => {
    setVisibleCount(INITIAL_VISIBLE);
    setAllProducts([]);
    setLoadingProducts(true);
    try {
      let fetchedProducts = [];

      if (categoryId === "all") {
        const catRes = await fetch(`${API_BASE}/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${RECOMMENDED_CATEGORY_LIMIT}`);
        const categoriesData = await catRes.json();
        let limitedCategories = Array.isArray(categoriesData)
          ? categoriesData
              .filter(cat => {
                const count = Number(cat?.count ?? 0);
                return !Number.isNaN(count) && count > 0;
              })
              .slice(0, RECOMMENDED_CATEGORY_LIMIT)
          : [];

        if ((!limitedCategories || limitedCategories.length === 0) && Array.isArray(categoriesData)) {
          limitedCategories = categoriesData.slice(0, RECOMMENDED_CATEGORY_LIMIT);
        }

        for (const cat of limitedCategories) {
          try {
            const res = await fetch(
              `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${PRODUCT_FETCH_LIMIT}&_fields=id,slug,name,images,price,regular_price,sale_price&category=${cat.id}`
            );
            const data = await res.json();
            if (Array.isArray(data) && data.length) {
              fetchedProducts.push(...data);
            }
          } catch (err) {
            console.error("Recommended products fetch error", err);
          }
          if (fetchedProducts.length >= MAX_PRODUCTS) break;
        }
        fetchedProducts = fetchedProducts.slice(0, MAX_PRODUCTS);
      } else {
        let page = 1;
        while (page <= CATEGORY_PAGE_LIMIT && fetchedProducts.length < MAX_PRODUCTS) {
          const res = await fetch(
            `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${PRODUCT_FETCH_LIMIT}&page=${page}&category=${categoryId}&_fields=id,slug,name,images,price,regular_price,sale_price`
          );
          const data = await res.json();
          if (!Array.isArray(data) || !data.length) break;
          fetchedProducts.push(...data);
          page++;
        }
        fetchedProducts = fetchedProducts.slice(0, MAX_PRODUCTS);
      }

      if (fetchedProducts.length > 0) {
        setAllProducts(shuffleArray(fetchedProducts));
      } else {
        setAllProducts([]);
      }
    } catch (err) {
      console.error(err);
      setAllProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts(selectedCategoryId);
  }, [selectedCategoryId, fetchProducts]);

  // Arrow visibility for categories scroll
  const updateArrowVisibility = useCallback(() => {
    const el = categoriesRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollWidth - el.scrollLeft > el.clientWidth + 10);
  }, []);

  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;
    const throttled = throttle(updateArrowVisibility, 100);
    el.addEventListener("scroll", throttled);
    updateArrowVisibility();
    return () => el.removeEventListener("scroll", throttled);
  }, [categories, updateArrowVisibility]);

  // Load more products
  const loadMoreProducts = () => {
    setVisibleCount(prev => Math.min(prev + INITIAL_VISIBLE, allProducts.length));
  };

  // Fly to cart animation
  const flyToCart = (e, imgSrc) => {
    if (!cartIconRef.current || !imgSrc) return;
    const cartRect = cartIconRef.current.getBoundingClientRect();
    const startRect = e.currentTarget.getBoundingClientRect();

    const clone = document.createElement("img");
    clone.src = imgSrc;
    clone.style.position = "fixed";
    clone.style.zIndex = 9999;
    clone.style.width = "60px";
    clone.style.height = "60px";
    clone.style.top = `${startRect.top}px`;
    clone.style.left = `${startRect.left}px`;
    clone.style.transition = "all 0.7s ease-in-out";
    clone.style.borderRadius = "50%";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = `${cartRect.top}px`;
      clone.style.left = `${cartRect.left}px`;
      clone.style.opacity = "0";
      clone.style.transform = "scale(0.2)";
    });

    setTimeout(() => clone.remove(), 800);
  };

const handleProductClick = (product) => {
  if (product.isStatic) {
    navigate(product.path || `/products/${product.slug}`);
  } else {
    navigate(`/product/${product.slug}`);
  }
  window.scrollTo(0, 0);
};

const getMergedProducts = () => {
  const merged = [...allProducts];
  staticPositions.forEach((pos, i) => {
    if (i < staticProducts.length) {
      const insertPos = Math.min(pos, merged.length); // safe position
      merged.splice(insertPos, 0, { ...staticProducts[i], isStatic: true });
    }
  });
  return merged;
};


  
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);
  const showMegaOffer = selectedCategory?.enable_offer;

const renderProducts = () => {
  const productsToShow = selectedCategoryId === "all" ? getMergedProducts() : allProducts;

  return productsToShow.slice(0, visibleCount).map((p, index) => {
    // Static product card
    if (p.isStatic) {
      return (
        <div key={p.id} className="pcus-prd-card static-product-card" onClick={() => handleProductClick(p)} style={{ cursor: "pointer", position: "relative" }}>
          <div style={{ position: "absolute", top: "8px", right: "8px", backgroundColor: "#ff6207", color: "#fff", fontSize: "10px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", zIndex: 2 }}>Fast Moving</div>
          <div className="pcus-image-wrapper" style={{ position: "relative" }}>
            <img src={p.images[0].src} alt={decodeHTML(p.name)} className="pcus-prd-image1 primary-img" />
          </div>
          <div className="pcus-prd-info12">
            <h2 className="pcus-prd-title1">{decodeHTML(p.name)}</h2>
            <div className="pcus-prd-dummy-reviews" style={{ display: "flex", alignItems: "center", margin: "0px 5px" }}>
              <div style={{ color: "#FFD700", marginRight: "8px" }}>{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</div>
              <div style={{ fontSize: "12px", color: "#666", marginRight: "8px" }}>({p.reviews})</div>
              <div style={{ fontSize: "12px", color: "#666" }}>{p.sold} sold</div>
            </div>
            <div style={{ height: "1px", width: "100%", backgroundColor: "lightgrey", margin: "0px 0 2px 0", borderRadius: "1px" }} />
            <div className="prc-row-abc123">
              <div className="prc-left-abc123">
                <img src={IconAED} alt="AED" style={{ width: "auto", height: "12px", marginRight: "0px", verticalAlign: "middle" }} />
                <Price value={p.sale_price} className="prc-sale-abc123" />
                <Price value={p.regular_price} className="prc-regular-abc123" />
                {p.sale_price < p.regular_price && <span className="prc-off-abc123">{Math.round(((p.regular_price - p.sale_price) / p.regular_price) * 100)}% Off</span>}
              </div>
            </div>
            <div className="prc-row-badge-btn">
              <div className="prc-badge-abc123">Fast Moving Product</div>
              <button className="prc-btn-abc123">Buy Now</button>
            </div>
          </div>
        </div>
      );
    }


      // Regular product card
const hasSale = p.sale_price && p.sale_price !== p.regular_price;
    return (
      <div key={p.id} className="pcus-prd-card" onClick={() => handleProductClick(p)} style={{ cursor: "pointer" }}>
        <div className="pcus-image-wrapper1">
          <img src={p.images?.[0]?.src || PlaceholderImage} alt={decodeHTML(p.name)} className="pcus-prd-image1 primary-img" loading="lazy" decoding="async" />
          {p.images?.[1] ? (
            <img src={p.images[1].src} alt={decodeHTML(p.name)} className="pcus-prd-image1 secondary-img" loading="lazy" decoding="async" />
          ) : (
            <img src={PlaceholderImage} alt={decodeHTML(p.name)} className="pcus-prd-image1 secondary-img" />
          )}
          {hasSale && <span className="pcus-prd-discount-box1">-{Math.round(((parseFloat(p.regular_price) - parseFloat(p.sale_price)) / parseFloat(p.regular_price)) * 100)}% OFF</span>}
          {showMegaOffer && index === 0 && (
            <div className="mega-offer-badge">
              <span className="mega-offer-text" style={{ transform: animate ? "translateY(0)" : "translateY(100%)", opacity: animate ? 1 : 0, display: "inline-block" }}>{badgeText}</span>
            </div>
          )}
        </div>

        <div className="pcus-prd-info12">
          <h2 className="pcus-prd-title1">{decodeHTML(p.name)}</h2>
          <ProductCardReviews productId={p.id} />
          <div style={{ height: "1px", width: "100%", backgroundColor: "lightgrey", margin: "0px 0 2px 0", borderRadius: "1px" }} />
          <div className="pcus-prd-price-cart1">
            <div className="pcus-prd-prices1">
              <img src={IconAED} alt="AED" style={{ width: "auto", height: "12px", marginRight: "0px", verticalAlign: "middle" }} />
              {hasSale ? (
                <>
                  <Price value={p.sale_price} className="pcus-prd-sale-price12" />
                  <Price value={p.regular_price} className="pcus-prd-regular-price12" />
                </>
              ) : (
                <Price value={p.price} className="price1" />
              )}
            </div>
            <button
              className={`pcus-prd-add-cart-btn ${cartItems.some((item) => item.id === p.id) ? "added-to-cart" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                flyToCart(e, p.images?.[0]?.src);
                addToCart(p, true);
              }}
              aria-label={`Add ${decodeHTML(p.name)} to cart`}
            >
              <img src={cartItems.some((item) => item.id === p.id) ? AddedToCartIcon : AddCarticon} alt="cart icon" className="pcus-prd-add-cart-icon-img" />
            </button>
            <div id="cart-icon" ref={cartIconRef} style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, cursor: "pointer" }} />
          </div>
        </div>
      </div>
    );
  });
};
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  // Add this useEffect to fetch categories initially
useEffect(() => {
  fetchCategories(1);
}, [fetchCategories]);

  return (
    <div className="pcus-wrapper3" style={{ display: "flex" }}>
      <div className="pcus-categories-products1" style={{ width: "100%", transition: "width 0.3s ease" }}>
        {/* Banner */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src='https://db.store1920.com/wp-content/uploads/2025/11/Mini-Sub-Banner-2.webp' className="schoolimage" style={{ maxWidth: "400px", width: "100%", height: "auto" }} alt="Category banner" />
        </div>

        {/* Categories */}
        <div className="pcus-categories-wrapper1 pcus-categories-wrapper3">
          {canScrollLeft && <button className="pcus-arrow-btn" onClick={() => categoriesRef.current.scrollBy({ left: -200, behavior: "smooth" })}>‹</button>}
          <div className="pcus-categories-scroll" ref={categoriesRef}>
            <button className={`pcus-category-btn ${selectedCategoryId === "all" ? "active" : ""}`} onClick={() => setSelectedCategoryId("all")}>Recommended</button>
            {categories.map((cat) => (
              <button key={cat.id} className={`pcus-category-btn ${selectedCategoryId === cat.id ? "active" : ""}`} onClick={() => setSelectedCategoryId(cat.id)} title={decodeHTML(cat.name)}>
                {decodeHTML(cat.name)}
              </button>
            ))}
            {hasMoreCategories && (
              <button
                className="pcus-category-btn load-more"
                disabled={loadingCategories}
                onClick={() => {
                  if (!loadingCategories) {
                    fetchCategories(categoriesPage + 1);
                    setCategoriesPage((p) => p + 1);
                  }
                }}
              >
                {loadingCategories ? "Loading…" : "Load More"}
              </button>
            )}
          </div>
          {canScrollRight && <button className="pcus-arrow-btn" onClick={() => categoriesRef.current.scrollBy({ left: 200, behavior: "smooth" })}>›</button>}
        </div>

        {/* Products */}
        {loadingProducts ? (
          <div className="pcus-prd-grid001">
            {Array(10).fill(0).map((_, idx) => <SkeletonCard key={idx} />)}
          </div>
        ) : allProducts.length === 0 ? (
          <div className="pcus-no-products" style={{ minHeight: "300px", textAlign: "center", paddingTop: "40px", fontSize: "18px", color: "#666" }}>
            No products found.
          </div>
        ) : (
          <div className="pcus-prd-grid001">{renderProducts()}</div>
        )}

        {/* Load More */}
        <div className="pcus-load-more-wrapper" style={{ textAlign: "center", margin: "24px 0" }}>
          {hasMoreProducts ? (
            <button
              className="pcus-load-more-btn"
              onClick={loadMoreProducts}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                backgroundColor: "#ff6207ff",
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer"
              }}
            >
              Load More
            </button>
          ) : (
            <span style={{ color: "#666", fontSize: "14px" }}></span>
          )}
        </div>
      </div>
      <MiniCart />
    </div>
  );
};

export default ProductCategory;
