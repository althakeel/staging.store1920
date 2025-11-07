import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/New.css';
import { useCart } from '../contexts/CartContext';
import MiniCart from '../components/MiniCart';
import AddCarticon from '../assets/images/addtocart.png';
import AddedToCartIcon from '../assets/images/added-cart.png';
import Adsicon from '../assets/images/summer-saving-coloured.png';
import IconAED from '../assets/images/Dirham 2.png';
import ProductCardReviews from '../components/temp/productcardreviews';

import { getProductsByTagSlugs, getFirstVariation, getCurrencySymbol } from '../api/woocommerce';

const PRODUCTS_PER_PAGE = 24;
const TITLE_LIMIT = 35;
const NEW_TAG_SLUG = 'new-arrival'; // You will handle PHP side for this tag

// ===================== Utility functions =====================
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
const truncate = (str) => (str?.length <= TITLE_LIMIT ? str : `${str.slice(0, TITLE_LIMIT)}…`);

// ===================== Skeleton Loader =====================
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

// ===================== Main Component =====================
const New = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const cartIconRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [variationPrices, setVariationPrices] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('AED');
  const [productsPage, setProductsPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // ===================== Fetch currency =====================
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const symbol = await getCurrencySymbol();
        setCurrencySymbol(symbol || 'AED');
      } catch (error) {
        console.error('Failed to fetch currency symbol:', error);
        setCurrencySymbol('AED');
      }
    };
    fetchCurrency();
  }, []);

  // ===================== Fetch products =====================
  const fetchProducts = useCallback(async (page = 1) => {
    setLoadingProducts(true);
    try {
      const data = await getProductsByTagSlugs([NEW_TAG_SLUG], page, PRODUCTS_PER_PAGE);
      const validData = Array.isArray(data) ? data : [];
      setProducts((prev) => (page === 1 ? validData : [...prev, ...validData]));
      setHasMoreProducts(validData.length >= PRODUCTS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setHasMoreProducts(false);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
    setProductsPage(1);
  }, [fetchProducts]);

  const loadMoreProducts = () => {
    if (!hasMoreProducts || loadingProducts) return;
    const nextPage = productsPage + 1;
    setProductsPage(nextPage);
    fetchProducts(nextPage);
  };

  // ===================== Handle product click =====================
  const onProductClick = useCallback((slug, id) => {
    let recent = JSON.parse(localStorage.getItem('recentProducts')) || [];
    recent = recent.filter((rid) => rid !== id);
    recent.unshift(id);
    localStorage.setItem('recentProducts', JSON.stringify(recent.slice(0, 5)));
    window.open(`/product/${slug}`, '_blank', 'noopener,noreferrer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ===================== Fetch first variation prices =====================
  useEffect(() => {
    if (!products || products.length === 0) return;
    products.forEach((p) => {
      if (p.type === 'variable' && !variationPrices[p.id]) fetchFirstVariationPrice(p.id);
    });
  }, [products]);

  const fetchFirstVariationPrice = async (productId) => {
    try {
      const variation = await getFirstVariation(productId);
      if (variation) {
        setVariationPrices((prev) => ({
          ...prev,
          [productId]: {
            price: variation.price,
            regular_price: variation.regular_price,
            sale_price: variation.sale_price,
          },
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch variation for product ${productId}:`, error);
    }
  };

  // ===================== Fly to cart animation =====================
  const flyToCart = (e, imgSrc) => {
    if (!cartIconRef.current || !imgSrc) return;

    const cartRect = cartIconRef.current.getBoundingClientRect();
    const startRect = e.currentTarget.getBoundingClientRect();

    const clone = document.createElement('img');
    clone.src = imgSrc;
    Object.assign(clone.style, {
      position: 'fixed',
      zIndex: 9999,
      width: '60px',
      height: '60px',
      top: `${startRect.top}px`,
      left: `${startRect.left}px`,
      transition: 'all 0.7s ease-in-out',
      borderRadius: '50%',
      pointerEvents: 'none',
    });
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = `${cartRect.top}px`;
      clone.style.left = `${cartRect.left}px`;
      clone.style.opacity = '0';
      clone.style.transform = 'scale(0.2)';
    });

    setTimeout(() => clone.remove(), 800);
  };

  // ===================== Render =====================
  return (
    <div className="pcus-wrapper12" style={{ display: 'flex' }}>
      <div className="pcus-categories-products1" style={{ width: '100%', transition: 'width 0.3s ease' }}>
        {/* Title Section */}
        <div className="pcus-title-section">
          <h2 className="pcus-main-title">
            <img src={Adsicon} style={{ maxWidth: '18px' }} alt="Ads icon" /> LATEST ARRIVALS{' '}
            <img src={Adsicon} style={{ maxWidth: '18px' }} alt="Ads icon" />
          </h2>
          <p className="pcus-sub-title">TOP SELLING ITEMS</p>
        </div>

        {/* Product Grid */}
        {loadingProducts && (!products || products.length === 0) ? (
          <div className="pcus-prd-grid12">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (!products || products.length === 0) ? (
          <div className="pcus-no-products" style={{ minHeight: '300px', textAlign: 'center', paddingTop: '40px', fontSize: '18px', color: '#666' }}>
            No products found.
          </div>
        ) : (
          <div className="pcus-prd-grid12">
            {products.map((p) => {
              const isVariable = p.type === 'variable';
              const variationPriceInfo = variationPrices[p.id] || {};
              const displayRegularPrice = isVariable ? variationPriceInfo.regular_price : p.regular_price || p.price;
              const displaySalePrice = isVariable ? variationPriceInfo.sale_price : p.sale_price || null;
              const displayPrice = isVariable ? variationPriceInfo.price : p.price || p.regular_price || 0;
              const onSale = displaySalePrice && displaySalePrice !== displayRegularPrice;

              return (
                <div
                  key={p.id}
                  className="pcus-prd-card"
                  onClick={(e) => { e.stopPropagation(); onProductClick(p.slug, p.id); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onProductClick(p.slug)}
                  style={{ position: 'relative' }}
                >
                  <div className="pcus-image-wrapper1">
                    <img src={p.images?.[0]?.src || ''} alt={decodeHTML(p.name)} className="pcus-prd-image1 primary-img" loading="lazy" decoding="async" />
                    {p.images?.[1] && <img src={p.images[1].src} alt={`${decodeHTML(p.name)} - second`} className="pcus-prd-image1 secondary-img" loading="lazy" decoding="async" />}
                    {p.stock_status === 'outofstock' && <div className="pcus-stock-overlay10 out-of-stock">Out of Stock</div>}
                    {typeof p.stock_quantity === 'number' && p.stock_quantity < 50 && <div className="pcus-stock-overlay10 low-stock">Only {p.stock_quantity} left in stock</div>}
                  </div>

                  <div className="pcus-prd-info1">
                    <h3 className="pcus-prd-title1">{truncate(decodeHTML(p.name))}</h3>
                      <ProductCardReviews productId={p.id} />
                                            <div style={{ height: "1px", width: "100%", backgroundColor: "lightgrey", margin: "0px 0 2px 0", borderRadius: "1px" }} />

                    <div className="pcus-prd-price-cart1">
                      <div className="pcus-prd-prices1">
                        <img src={IconAED} alt="AED currency icon" style={{ width: 'auto', height: '13px', verticalAlign: 'middle' }} />
                        {onSale ? (
                          <>
                            <span className="pcus-prd-sale-price1">{parseFloat(displaySalePrice || 0).toFixed(2)}</span>
                            <span className="pcus-prd-regular-price1">{parseFloat(displayRegularPrice || 0).toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="price1">{parseFloat(displayPrice || 0).toFixed(2)}</span>
                        )}
                      </div>

                      <button
                        className={`pcus-prd-add-cart-btn10 ${cartItems.some(item => item.id === p.id) ? 'added-to-cart' : ''}`}
                        onClick={(e) => { e.stopPropagation(); flyToCart(e, p.images?.[0]?.src); addToCart(p, true); }}
                        aria-label={`Add ${decodeHTML(p.name)} to cart`}
                      >
                        <img src={cartItems.some(item => item.id === p.id) ? AddedToCartIcon : AddCarticon} alt="Add to cart" className="pcus-prd-add-cart-icon-img" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {hasMoreProducts && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <button className="pcus-load-more-btn" onClick={loadMoreProducts} disabled={loadingProducts}>
              {loadingProducts ? 'Loading…' : 'Load More'}
            </button>
          </div>
        )}
      </div>

      <MiniCart ref={cartIconRef} />
    </div>
  );
};

export default memo(New);
