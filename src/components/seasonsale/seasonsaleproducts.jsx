import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/New.css';
import '../../assets/styles/seasonsale.css';
import { useCart } from '../../contexts/CartContext';
import MiniCart from '../../components/MiniCart';
import AddCarticon from '../../assets/images/addtocart.png';
import AddedToCartIcon from '../../assets/images/added-cart.png';
import Adsicon from '../../assets/images/summer-saving-coloured.png';
import IconAED from '../../assets/images/Dirham 2.png';
import ProductCardReviews from '../../components/temp/productcardreviews';

import { getProductsByTagSlugs, getFirstVariation, getCurrencySymbol } from '../../api/woocommerce';
import axios from 'axios';

const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CONSUMER_KEY = "ck_f44feff81d804619a052d7bbdded7153a1f45bdd";
const CONSUMER_SECRET = "cs_92458ba6ab5458347082acc6681560911a9e993d";

const PRODUCTS_PER_PAGE = 24;
const TITLE_LIMIT = 35;
const SEASON_SALE_CATEGORY_SLUG = 'automotive-motorcycle'; // Temporarily using category with products for testing

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
const SeasonSaleProducts = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const cartIconRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [variationPrices, setVariationPrices] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('AED');
  const [productsPage, setProductsPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // ===================== Fetch Season Sale Products =====================
  const fetchSeasonSaleProducts = useCallback(async (page = 1, append = false) => {
    if (loadingProducts) return;
    setLoadingProducts(true);
    console.log('🔄 Starting to fetch season sale products...');

    try {
      // First, get the category ID by slug
      console.log('🔍 Looking for category with slug:', SEASON_SALE_CATEGORY_SLUG);
      const categoryResponse = await axios.get(`${API_BASE}/products/categories`, {
        params: {
          slug: SEASON_SALE_CATEGORY_SLUG,
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
        },
      });

      console.log('📂 Category response:', categoryResponse.data);

      if (categoryResponse.data.length === 0) {
        console.log('❌ Season sale category not found');
        setProducts([]);
        setHasMoreProducts(false);
        setLoadingProducts(false);
        return;
      }

      const categoryId = categoryResponse.data[0].id;
      const categoryCount = categoryResponse.data[0].count;
      console.log('✅ Found season sale category:', {
        id: categoryId,
        name: categoryResponse.data[0].name,
        count: categoryCount
      });

      if (categoryCount === 0) {
        console.log('⚠️ Category has 0 products assigned');
        setProducts([]);
        setHasMoreProducts(false);
        setLoadingProducts(false);
        return;
      }

      // Fetch products from season sale category
      console.log('🛍️ Fetching products from category ID:', categoryId);
      const response = await axios.get(`${API_BASE}/products`, {
        params: {
          category: categoryId,
          per_page: PRODUCTS_PER_PAGE,
          page: page,
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
        },
      });
      
      console.log('📦 Season sale products response:', response.data);
      console.log('📊 Products count:', response.data.length);
      
      if (response?.data && Array.isArray(response.data)) {
        const fetchedProducts = response.data;
        
        if (fetchedProducts.length === 0) {
          console.log('⚠️ No products returned from API');
          setProducts([]);
          setHasMoreProducts(false);
          setLoadingProducts(false);
          return;
        }
        
        if (append) {
          setProducts(prev => [...prev, ...fetchedProducts]);
        } else {
          setProducts(fetchedProducts);
        }
        
        setHasMoreProducts(fetchedProducts.length === PRODUCTS_PER_PAGE);
        
        // Fetch variation prices for variable products
        const variableProducts = fetchedProducts.filter(p => p.type === 'variable');
        if (variableProducts.length > 0) {
          const pricePromises = variableProducts.map(async (product) => {
            try {
              const variation = await getFirstVariation(product.id);
              return { productId: product.id, variation };
            } catch {
              return { productId: product.id, variation: null };
            }
          });
          
          const prices = await Promise.all(pricePromises);
          const priceMap = {};
          prices.forEach(({ productId, variation }) => {
            if (variation) {
              priceMap[productId] = variation;
            }
          });
          
          setVariationPrices(prev => ({ ...prev, ...priceMap }));
        }
        
        console.log('✅ Successfully loaded', fetchedProducts.length, 'season sale products');
      } else {
        console.log('❌ Invalid response data');
        if (!append) setProducts([]);
        setHasMoreProducts(false);
      }
    } catch (error) {
      console.error('❌ Error fetching season sale products:', error);
      console.error('❌ Error details:', error.response?.data || error.message);
      if (!append) setProducts([]);
      setHasMoreProducts(false);
    } finally {
      setLoadingProducts(false);
      console.log('🏁 Finished fetching season sale products');
    }
  }, [loadingProducts]);

  // ===================== Load More Products =====================
  const loadMoreProducts = useCallback(() => {
    if (hasMoreProducts && !loadingProducts) {
      const nextPage = productsPage + 1;
      setProductsPage(nextPage);
      fetchSeasonSaleProducts(nextPage, true);
    }
  }, [hasMoreProducts, loadingProducts, productsPage, fetchSeasonSaleProducts]);

  // ===================== Initialize =====================
  useEffect(() => {
    fetchSeasonSaleProducts(1, false);
    
    getCurrencySymbol()
      .then(symbol => setCurrencySymbol(symbol))
      .catch(() => setCurrencySymbol('AED'));
  }, [fetchSeasonSaleProducts]);

  // ===================== Product Click Handler =====================
  const handleProductClick = useCallback((product) => {
    navigate(`/product/${product.slug}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  // ===================== Add to Cart Animation =====================
  const flyToCart = useCallback((e, imgSrc) => {
    if (!cartIconRef.current || !imgSrc) return;
    
    const cartRect = cartIconRef.current.getBoundingClientRect();
    const startRect = e.currentTarget.getBoundingClientRect();
    
    const clone = document.createElement('img');
    clone.src = imgSrc;
    clone.style.cssText = `
      position: fixed;
      z-index: 9999;
      width: 60px;
      height: 60px;
      top: ${startRect.top}px;
      left: ${startRect.left}px;
      transition: all 0.7s ease-in-out;
      border-radius: 50%;
      pointer-events: none;
    `;
    document.body.appendChild(clone);
    
    requestAnimationFrame(() => {
      clone.style.top = `${cartRect.top}px`;
      clone.style.left = `${cartRect.left}px`;
      clone.style.opacity = '0';
      clone.style.transform = 'scale(0.2)';
    });
    
    setTimeout(() => clone.remove(), 800);
  }, []);

  // ===================== Get Product Price =====================
  const getProductPrice = (product) => {
    if (product.type === 'variable' && variationPrices[product.id]) {
      const variation = variationPrices[product.id];
      return {
        salePrice: variation.sale_price || variation.regular_price,
        regularPrice: variation.regular_price,
        onSale: variation.sale_price && variation.sale_price !== variation.regular_price
      };
    }
    
    return {
      salePrice: product.sale_price || product.price,
      regularPrice: product.regular_price || product.price,
      onSale: product.sale_price && product.sale_price !== product.regular_price
    };
  };

  // ===================== Render Product Card =====================
  const renderProductCard = memo(({ product, index }) => {
    const { salePrice, regularPrice, onSale } = getProductPrice(product);
    const isInCart = cartItems.some(item => item.id === product.id);
    const imageUrl = product.images?.[0]?.src || '';

    return (
      <div
        key={product.id}
        className="pcus-prd-card"
        onClick={() => handleProductClick(product)}
        style={{ cursor: 'pointer' }}
      >
        <div className="pcus-image-wrapper1">
          <img
            src={imageUrl}
            alt={decodeHTML(product.name)}
            className="pcus-prd-image1 primary-img"
            loading="lazy"
            decoding="async"
          />
          {product.images?.[1] && (
            <img
              src={product.images[1].src}
              alt={decodeHTML(product.name)}
              className="pcus-prd-image1 secondary-img"
              loading="lazy"
              decoding="async"
            />
          )}
          {onSale && (
            <span className="pcus-prd-discount-box1">
              -{Math.round(((parseFloat(regularPrice) - parseFloat(salePrice)) / parseFloat(regularPrice)) * 100)}% OFF
            </span>
          )}
          <div className="season-sale-badge">
            <span>🎄 Halloween Sale</span>
          </div>
        </div>

        <div className="pcus-prd-info12">
          <h2 className="pcus-prd-title1">{truncate(decodeHTML(product.name))}</h2>
          <ProductCardReviews productId={product.id} />
          <div style={{ height: '1px', width: '100%', backgroundColor: 'lightgrey', margin: '0px 0 2px 0', borderRadius: '1px' }} />
          <div className="pcus-prd-price-cart1">
            <div className="pcus-prd-prices1">
              <img src={IconAED} alt="AED" style={{ width: 'auto', height: '12px', marginRight: '0px', verticalAlign: 'middle' }} />
              {onSale ? (
                <>
                  <span className="pcus-prd-sale-price12">{parseFloat(salePrice).toFixed(2)}</span>
                  <span className="pcus-prd-regular-price12">{parseFloat(regularPrice).toFixed(2)}</span>
                </>
              ) : (
                <span className="price1">{parseFloat(salePrice).toFixed(2)}</span>
              )}
            </div>
            <button
              className={`pcus-prd-add-cart-btn ${isInCart ? 'added-to-cart' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                flyToCart(e, imageUrl);
                addToCart(product, true);
              }}
              aria-label={`Add ${decodeHTML(product.name)} to cart`}
            >
              <img
                src={isInCart ? AddedToCartIcon : AddCarticon}
                alt="cart icon"
                className="pcus-prd-add-cart-icon-img"
              />
            </button>
            <div id="cart-icon" ref={cartIconRef} style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    );
  });

  // ===================== Render =====================
  return (
    <div className="new-wrapper" style={{ display: 'flex' }}>
      <div className="new-products" style={{ width: '100%' }}>
        <div className="new-header season-sale-header" style={{ textAlign: 'center', margin: '20px 0' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}>
            🎄 Halloween Sale 🎄
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', margin: '10px 0' }}>
            Exclusive seasonal discounts on selected items!
          </p>
        </div>

        {loadingProducts && products.length === 0 ? (
          <div className="pcus-prd-grid001">
            {Array(12).fill(0).map((_, idx) => <SkeletonCard key={idx} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="no-products" style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
            No season sale products found at the moment.
          </div>
        ) : (
          <div className="pcus-prd-grid001">
            {products.map((product, index) => (
              <renderProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {hasMoreProducts && (
          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <button
              onClick={loadMoreProducts}
              disabled={loadingProducts}
              className="season-sale-load-more"
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#FF6B35',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: loadingProducts ? 'not-allowed' : 'pointer',
                opacity: loadingProducts ? 0.7 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              {loadingProducts ? 'Loading...' : 'Load More Season Sale Products'}
            </button>
          </div>
        )}
      </div>
      <MiniCart />
    </div>
  );
};

export default SeasonSaleProducts;