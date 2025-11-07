import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../assets/styles/productunder20.css';
import { useCart } from '../contexts/CartContext';
import AddCartIcon from '../assets/images/addtocart.png';
import AddedCartIcon from '../assets/images/added-cart.png';
import IconAED from '../assets/images/Dirham 2.png';
import ProductCardReviews from './temp/productcardreviews';
import PlaceholderImage from '../assets/images/common/Placeholder.png';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v2';
const CONSUMER_KEY = 'ck_f44feff81d804619a052d7bbdded7153a1f45bdd';
const CONSUMER_SECRET = 'cs_92458ba6ab5458347082acc6681560911a9e993d';
const PRODUCTS_PER_PAGE = 20;
const TITLE_LIMIT = 35;

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const ProductsUnder20AED = () => {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  // Track loaded images for skeleton replacement
  const [loadedImages, setLoadedImages] = useState({});

  const fetchProducts = useCallback(async (pageNum = 1) => {
    setLoading(true);
    try {
      const url = `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=${PRODUCTS_PER_PAGE}&page=${pageNum}&max_price=20&orderby=date&order=desc`;
      const res = await fetch(url);
      const data = await res.json();

      if (pageNum === 1) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === PRODUCTS_PER_PAGE);
    } catch (e) {
      console.error('Failed to fetch products', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const truncate = (str) => (str.length <= TITLE_LIMIT ? str : `${str.slice(0, TITLE_LIMIT)}…`);

  const onProductClick = (slug, id) => {
    let recent = JSON.parse(localStorage.getItem('recentProducts')) || [];
    recent = recent.filter((rid) => rid !== id);
    recent.unshift(id);
    localStorage.setItem('recentProducts', JSON.stringify(recent.slice(0, 5)));

    const url = `/product/${slug}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showAddToCartToast = () => {
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="pu20-wrapper">
      <div className="pu20-content">
        <h3 className="pu20-title">More Deals You’ll Love</h3>

        <div className="pu20-grid">
          {(loading && products.length === 0
            ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="pu20-card pu20-skeleton" />)
            : products
          ).map((p) => {
            if (p.id) {
              return (
                <div
                  key={p.id}
                  className="pu20-card"
                  onClick={() => onProductClick(p.slug, p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onProductClick(p.slug, p.id)}
                >
                  <div className="pu20-image-wrapper">
                    {!loadedImages[p.id] && <div className="pu20-image-skeleton" />}
                    <img
                       src={p.images?.[0]?.src || PlaceholderImage}
                      alt={decodeHTML(p.name)}
                      className={`pu20-image primary ${loadedImages[p.id] ? 'visible' : 'hidden'}`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(p.id)}
                    />
                    <img
                      src={p.images?.[1]?.src || PlaceholderImage}
                      alt={decodeHTML(p.name)}
                      className={`pu20-image secondary ${loadedImages[p.id] ? 'visible' : 'hidden'}`}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(p.id)}
                    />
                  </div>

                  <div className="pu20-info">
                    <h3 className="pu20-product-title">{truncate(decodeHTML(p.name))}</h3>
                    <ProductCardReviews />

                    <div className="pu20-price-cart">
                      <div className="pu20-prices">
                        <img src={IconAED} alt="AED" className="pu20-currency-icon" />
                        <span className="pu20-price">{parseFloat(p.price).toFixed(2)}</span>
                      </div>

                      <button
                        className={`pu20-add-cart-btn ${cartItems.some((item) => item.id === p.id) ? 'added' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, true);
                          showAddToCartToast();
                        }}
                        aria-label={`Add ${decodeHTML(p.name)} to cart`}
                      >
                        <img
                          src={cartItems.some((item) => item.id === p.id) ? AddedCartIcon : AddCartIcon}
                          alt={cartItems.some((item) => item.id === p.id) ? 'Added' : 'Add'}
                          className="pu20-add-cart-icon"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {hasMore && (
          <div className="pu20-loadmore-wrapper">
            <button
              className="pu20-loadmore-btn"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      {showToast && (
        <div className="pu20-toast">Product added</div>
      )}
    </div>
  );
};

export default ProductsUnder20AED;
