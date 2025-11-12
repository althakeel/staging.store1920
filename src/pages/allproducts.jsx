// src/pages/AllProducts.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import MiniCart from "../components/MiniCart";
import FilterButton from "../components/sub/FilterButton";
import "../assets/styles/allproducts.css";
import ProductsUnder20AED from "../components/ProductsUnder20AED";
import PlaceHolderImage from '../assets/images/common/Placeholder.png';
import CartIcon from '../assets/images/addtocart.png';
import AddedCart from '../assets/images/added-cart.png';
import DirhamIcon from '../assets/images/Dirham 2.png';

// ✅ WooCommerce API wrapper
import { fetchAPI } from "../api/woocommerce";

const PRODUCTS_PER_PAGE = 50;
const MAX_PRODUCTS = 10000;
const TITLE_LIMIT = 35;

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Skeleton placeholder for loading
const SkeletonCard = () => (
  <div className="pcus-prd-card pcus-skeleton">
    <div className="pcus-prd-image-skel" />
    <div className="pcus-prd-info-skel">
      <div className="pcus-prd-title-skel" />
      <div className="pcus-prd-review-skel" />
      <div className="pcus-prd-price-cart-skel" />
    </div>
  </div>
);


const formatPrice = (price) => {
  if (!price) return "0";
  const [intPart, decimalPart] = Number(price).toFixed(2).split(".");
  return (
    <>
      {intPart}
      <span className="pcus-price-decimal">.{decimalPart}</span>
    </>
  );
};

const badgeLabelMap = {
  best_seller: "Best Seller",
  recommended: "Recommended",
};

const AllProducts = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    selectedCategories: [],
    priceMin: null,
    priceMax: null,
    sortBy: null,
    selectedBadges: [],
  });

  // Build query params string
  const buildQueryParams = (pageNum, filters) => {
    const params = new URLSearchParams();
    params.append("per_page", PRODUCTS_PER_PAGE);
    params.append("page", pageNum);

    let orderby = "date";
    let order = "desc";

    if (filters) {
      if (filters.selectedCategories?.length) {
        const slugs = filters.selectedCategories.map((c) =>
          c.toLowerCase().replace(/\s+/g, "-")
        );
        params.append("category", slugs.join(","));
      }
      if (filters.priceMin) params.append("min_price", filters.priceMin);
      if (filters.priceMax) params.append("max_price", filters.priceMax);

      switch (filters.sortBy) {
        case "price_asc":
          orderby = "price";
          order = "asc";
          break;
        case "price_desc":
          orderby = "price";
          order = "desc";
          break;
        case "newest":
          orderby = "date";
          order = "desc";
          break;
        case "popularity":
          orderby = "popularity";
          order = "desc";
          break;
      }
    }

    params.append("orderby", orderby);
    params.append("order", order);
    return params.toString();
  };

  // ✅ Fetch products
  const fetchProducts = useCallback(
    async (pageNum = 1, appliedFilters = null, replace = false) => {
      setLoading(true);
      try {
        const queryParams = buildQueryParams(pageNum, appliedFilters);
        const data = await fetchAPI(`/products?${queryParams}`);
        const productArray = Array.isArray(data) ? data : [];

        if (replace) {
          setProducts(productArray);
        } else {
          setProducts((prev) => [...prev, ...productArray]);
        }

        if (
          productArray.length < PRODUCTS_PER_PAGE ||
          pageNum * PRODUCTS_PER_PAGE >= MAX_PRODUCTS
        ) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (e) {
        console.error("Error fetching products:", e);
        setHasMore(false);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Refetch on filter change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, filters, true);
  }, [filters, fetchProducts]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, filters);
  };

  const truncate = (str) =>
    str.length <= TITLE_LIMIT ? str : `${str.slice(0, TITLE_LIMIT)}…`;

  const renderStars = (ratingStr) => {
    const rating = Math.round(parseFloat(ratingStr)) || 0;
    return (
      <span className="pcus-stars" aria-label={`Rating: ${rating} out of 5`}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "pcus-star filled" : "pcus-star"}>
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = products.filter((p) => {
    if (filters.selectedBadges?.length > 0) {
      const productBadges = p.best_seller_recommended_badges || [];
      return filters.selectedBadges.some((badge) =>
        productBadges.includes(badge)
      );
    }
    return true;
  });

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  const NoProductsFound = () => (
    <div
      className="pcus-no-products"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <p style={{ textAlign: "center", fontWeight: 500 }}>No products found.</p>
      <div className="pcus-no-products-buttons">
        <button
          className="pcus-btn-secondary"
          onClick={() => window.history.back()}
          aria-label="Go back"
        >
          Go Back
        </button>
        <button
          className="pcus-btn-primary"
          onClick={() => navigate("/allproducts")}
          aria-label="Go to all products"
        >
          Go to All Products
        </button>
      </div>
    </div>
  );

  return (
    <div className="pcus-wrapper1" style={{ display: "flex", flexDirection: "column", minHeight: "70vh" }}>
      <h2 style={{ margin: "10px 0", textAlign: "center" }}>All Products</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "5px 0",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <FilterButton onFilterChange={handleFilterChange} />
      </div>

      <div className="pcus-categories-products1" style={{ width: "100%" }}>
        <div className="pcus-prd-grid">
          {filteredProducts.map((p) => {
            const onSale =
              p.regular_price &&
              p.price &&
              Number(p.price) < Number(p.regular_price);

            const soldCount = p.meta_data?.find((m) => m.key === "_sold_count")?.value ?? 0;
            const badges = p.best_seller_recommended_badges || [];

            return (
              <div
                key={p.id}
                className="pcus-prd-card"
                onClick={() => navigate(`/product/${p.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${p.slug}`)}
                aria-label={`View details for ${decodeHTML(p.name)}`}
              >
                <div className="pcus-image-wrapper" style={{ position: "relative" }}>
                  <img
                    src={p.images?.[0]?.src || PlaceHolderImage}
                    alt={decodeHTML(p.name)}
                    className="pcus-prd-image"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  {badges.length > 0 && (
                    <div
                      className="pcus-badges"
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {badges.map((badge, i) => (
                        <span
                          key={i}
                          className={`badge badge-${badge}`}
                          style={{
                            backgroundColor: badge === "best_seller" ? "#ff9900" : "#28a745",
                            color: "white",
                            fontSize: "12px",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            fontWeight: "600",
                          }}
                        >
                          {badgeLabelMap[badge] || badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pcus-prd-info">
                  <h3 className="pcus-prd-title">
                    <span className="pcus-title-text">{truncate(decodeHTML(p.name))}</span>
                  </h3>

                  <div className="pcus-prd-review" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {renderStars(p.average_rating)}
                    <div className="pcus-sold-badge">Sold: {soldCount}</div>
                  </div>

                  <div className="pcus-prd-price-cart">
                    <div className="pcus-prd-prices">
                      <span className={`pcus-prd-sale-price ${onSale ? "on-sale" : ""}`}>
                        <img
                          src={DirhamIcon}
                          alt="AED"
                          style={{ width: '12px', height: '12px', marginRight: '2px', verticalAlign: 'middle' }}
                        />
                     {formatPrice(p.price)}

                      </span>
                      {onSale && (
                        <span className="pcus-prd-regular-price">
                          <img
                            src={DirhamIcon}
                            alt="AED"
                            style={{ width: '12px', height: '12px', marginRight: '2px', verticalAlign: 'middle' }}
                          />
                         {formatPrice(p.regular_price)}
                        </span>
                      )}

                      {onSale && p.regular_price && p.price && (
                        <span className="pcus-prd-discount-box">
                          -{Math.round(((p.regular_price - p.price) / p.regular_price) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    <button
                      className="pcus-prd-add-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInCart(p.id)) addToCart(p);
                      }}
                      aria-label={`Add ${decodeHTML(p.name)} to cart`}
                    >
                      <img
                        src={isInCart(p.id) ? AddedCart : CartIcon}
                        alt={isInCart(p.id) ? "Added to cart" : "Add to cart"}
                        className="pcus-prd-add-cart-icon-img"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
        </div>
       {hasMore && (
  <div style={{ textAlign: "center", margin: "20px 0" }}>
    <button className="pcus-load-more-btn" onClick={loadMore} disabled={loading}>
      {loading ? <span className="loading-text">Loading</span> : "Load More"}
    </button>
  </div>
)}


        {!loading && filteredProducts.length === 0 && <NoProductsFound />}
        <ProductsUnder20AED />

       
      </div>

      <MiniCart />
    </div>
  );
};

export default AllProducts;
