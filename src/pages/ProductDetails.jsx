import React, { useEffect, useState, useCallback, Suspense, lazy, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ProductDescription from '../components/products/ProductDescription';
import SkeletonLoader from '../components/SkeletonLoader';
import ProductReviewList from '../components/products/ProductReviewList';
import { getProductReviewsWoo } from '../data/wooReviews';
import {
  fetchAPI,
  getProductById,
  getProductBySlug,
} from '../api/woocommerce';

const RelatedProducts = lazy(() => import('../components/RelatedProducts'));

const ReviewStars = ({ rating, onRate }) => (
  <div className="stars" role="radiogroup" aria-label="Rating">
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        role={onRate ? 'radio' : undefined}
        aria-checked={i === rating}
        tabIndex={onRate ? 0 : -1}
        className={i <= rating ? 'star filled' : 'star'}
        onClick={() => onRate && onRate(i)}
        onKeyDown={e => {
          if (!onRate) return;
          if (e.key === 'Enter' || e.key === ' ') onRate(i);
        }}
        style={{ cursor: onRate ? 'pointer' : 'default' }}
        aria-label={`${i} Star${i > 1 ? 's' : ''}`}
      >
        ★
      </span>
    ))}
  </div>
);

function getReviewSummary(reviews) {
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
    : 0;
  return { totalReviews, avgRating };
}

export default function ProductDetails() {
  const { slug, id } = useParams();
  const { user, login } = useAuth();

  const [selectedVariation, setSelectedVariation] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [variations, setVariations] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const leftColumnRef = useRef(null);
  const isLoggedIn = !!user;

  // Restore user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) login(JSON.parse(storedUser));
  }, [user, login]);

  // Window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobile = windowWidth <= 768;

  // Fetch minimal/full product
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id || slug],
    queryFn: async () => (id ? await getProductById(id) : await getProductBySlug(slug)),
    staleTime: 1000 * 60 * 5,
  });

  // Fetch variations
  useEffect(() => {
    if (!product?.variations?.length) return setVariations([]);
    async function fetchVariations() {
      try {
        const data = await fetchAPI(`/products/${product.id}/variations?per_page=100`);
        setVariations(data || []);
      } catch {
        setVariations([]);
      }
    }
    fetchVariations();
  }, [product]);

  useEffect(() => {
    if (variations.length > 0 && !selectedVariation) setSelectedVariation(variations[0]);
  }, [variations, selectedVariation]);

  // Set main image
  useEffect(() => {
    if (!product?.images?.length) return;
    const firstValidImage = product.images.find(img => img?.src) || null;
    if (firstValidImage && mainImageUrl !== firstValidImage.src) setMainImageUrl(firstValidImage.src);
  }, [product, mainImageUrl]);

  useEffect(() => {
    if (!selectedVariation) return;
    if (selectedVariation.image?.src) setMainImageUrl(selectedVariation.image.src);
    else if (product?.images?.[0]?.src) setMainImageUrl(product.images[0].src);
  }, [selectedVariation, product]);

  // Gather variation images
  useEffect(() => {
    if (variations.length > 0) {
      const imgs = variations
        .map(v => v.image)
        .filter(img => img?.src)
        .filter((img, i, arr) => arr.findIndex(x => x.src === img.src) === i);
      setExtraImages(imgs);
    }
  }, [variations]);

  const combinedImages = useMemo(() => {
    if (!product) return [];
    return [...(product.images || []), ...extraImages].filter(
      (img, idx, arr) => arr.findIndex(i => i.src === img.src) === idx
    );
  }, [product, extraImages]);

  // Fetch reviews
  useEffect(() => {
    if (!product) return;
    async function fetchReviews() {
      try {
        const reviewsFromWoo = await getProductReviewsWoo(product.id);
        setReviews(reviewsFromWoo);
      } catch {
        setReviews([]);
      }
    }
    fetchReviews();
  }, [product]);

  const reviewSummary = getReviewSummary(reviews);

  // Handlers
  const handleVariationChange = useCallback(v => setSelectedVariation(v), []);
  const openModal = useCallback(type => setActiveModal(type), []);
  const closeModal = useCallback(() => setActiveModal(null), []);
  const showToast = message => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };
  const handleAddToWishlist = () =>
    !isLoggedIn ? setShowLoginModal(true) : showToast('✅ Product added to wishlist!');
  const handleReportProduct = () => showToast('⚠️ Product reported!');
  const handleAddReview = () =>
    !isLoggedIn ? setShowLoginModal(true) : setActiveModal('review');
  const closeLoginModal = () => setShowLoginModal(false);
  const mockLogin = () => {
    const mockUser = { id: '123', name: 'Test User', token: 'mock-token' };
    localStorage.setItem('user', JSON.stringify(mockUser));
    login(mockUser);
    closeLoginModal();
    showToast('✅ Logged in successfully!');
  };

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Error loading product.</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <>
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4CAF50',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 5,
            zIndex: 9999,
            fontWeight: 'bold',
          }}
        >
          {toast}
        </div>
      )}

      <div
        style={{
          display: isMobile ? 'block' : 'flex',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '20px',
          gap: isMobile ? 0 : 5,
        }}
      >
        {/* Left Column */}
        <div
          ref={leftColumnRef}
          style={{
            flex: isMobile ? 'auto' : '1',
            boxSizing: 'border-box',
            maxHeight: isMobile ? 'auto' : '80vh',
            overflowY: isMobile ? 'visible' : 'auto',
            paddingRight: isMobile ? 0 : 10,
            scrollbarWidth: isMobile ? 'auto' : 'none',
          }}
          className={isMobile ? '' : 'thin-scrollbar'}
        >
          <ProductGallery
            images={combinedImages.length > 0 ? combinedImages : product.images || []}
            mainImageUrl={mainImageUrl || product.images?.[0]?.src}
            setMainImageUrl={setMainImageUrl}
            activeModal={activeModal}
            openModal={openModal}
            closeModal={closeModal}
          />

          {isMobile && (
            <div style={{ marginTop: 20 }}>
              <ProductInfo
                product={product}
                variations={variations}
                selectedVariation={selectedVariation}
                onVariationChange={handleVariationChange}
                loadingVariations={variations.length === 0 && !!product.variations?.length}
              />
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <div className="review-summary" aria-live="polite">
              <strong>
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </strong>{' '}
              &nbsp;|&nbsp;
              <span>
                {reviewSummary.avgRating.toFixed(1)}{' '}
                <ReviewStars rating={Math.round(reviewSummary.avgRating)} />
              </span>
            </div>
            <ProductDescription product={product} selectedVariation={selectedVariation} />
          </div>

          <div style={{ marginTop: 20 }}>
            <Suspense fallback={<div>Loading reviews...</div>}>
              <ProductReviewList
                productId={product.id}
                user={user}
                onLogin={login}
                reviews={reviews}
                setReviews={setReviews}
              />
            </Suspense>
          </div>
        </div>

        {/* Right Column */}
        {!isMobile && (
          <div style={{ flex: 1, position: 'sticky', top: 20, alignSelf: 'flex-start' }}>
            <ProductInfo
              product={product}
              variations={variations}
              selectedVariation={selectedVariation}
              onVariationChange={handleVariationChange}
              loadingVariations={variations.length === 0 && !!product.variations?.length}
            />
          </div>
        )}
      </div>

      {/* Related Products */}
      <div style={{ maxWidth: 1400, margin: '40px auto', padding: '0 10px' }}>
        <Suspense fallback={
          <div style={{ padding: '20px 0' }}>
            <h2 style={{ marginBottom: '15px', color: '#333' }}>Similar Products</h2>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', marginTop: '-10px' }}>
              Loading products from the same categories...
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              maxWidth: '1400px'
            }}>
              {[...Array(10)].map((_, i) => (
                <div key={i} style={{
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  borderRadius: '12px',
                  minHeight: '320px',
                  animation: 'shimmer 1.5s infinite',
                  border: '1px solid #eee'
                }}>
                  <style>
                    {`
                      @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                      }
                    `}
                  </style>
                </div>
              ))}
            </div>
          </div>
        }>
          <RelatedProducts
            productId={product.id}
          />
        </Suspense>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ background: '#fff', padding: 20, borderRadius: 8, minWidth: 300 }}>
            <h3>Login Required</h3>
            <button onClick={mockLogin} style={{ marginRight: 10 }}>
              Mock Login
            </button>
            <button onClick={closeLoginModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
