// ProductGallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../assets/styles/ProductGallery.css';
import PlaceHolderImage from '../assets/images/common/Placeholder.png';

export default function ProductGallery({
  images,
  mainImageUrl,
  setMainImageUrl,
  activeModal,
  openModal,
  closeModal,
}) {
  const [mainIndex, setMainIndex] = useState(0);
  const [mainLoading, setMainLoading] = useState(true);
  const modalThumbListRef = useRef(null);
  const [thumbsLoaded, setThumbsLoaded] = useState(false);

  // Zoom and pan state for modal
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomTranslate, setZoomTranslate] = useState({ x: 0, y: 0 });
  const zoomedImageRef = useRef(null);
  const containerRef = useRef(null);
  const lastDragPosition = useRef(null);
  const [visibleImages, setVisibleImages] = useState(images?.length ? [images[0]] : []);

  // Sync mainIndex when mainImageUrl changes
// Initialize main image when images change


useEffect(() => {
  if (!mainLoading && images.length > 1) {
    // Delay adding other images slightly after main loads
    const timer = setTimeout(() => {
      setVisibleImages(images);
    }, 200); // small delay to avoid blocking
    return () => clearTimeout(timer);
  }
}, [mainLoading, images]);

  // Reset loading and zoom state when mainIndex changes
  useEffect(() => {
    setMainLoading(true);
    setZoomScale(1);
    setZoomTranslate({ x: 0, y: 0 });
    if (modalThumbListRef.current) scrollModalThumbnails(mainIndex);
  }, [mainIndex]);

  // Delay thumbnails appearance for smoother effect
  useEffect(() => {
    if (!mainLoading) {
      const timer = setTimeout(() => setThumbsLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [mainLoading]);

  // Scroll modal thumbnails
  const scrollModalThumbnails = index => {
    if (!modalThumbListRef.current) return;
    const thumbWidth = 108; // approx
    const scrollPos = Math.max(0, index * thumbWidth - thumbWidth * 2);
    modalThumbListRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
  };

  // Navigation handlers
  const handlePrev = () => {
    const newIndex = mainIndex === 0 ? images.length - 1 : mainIndex - 1;
    setMainIndex(newIndex);
    setMainImageUrl(images[newIndex].src);
  };
  const handleNext = () => {
    const newIndex = mainIndex === images.length - 1 ? 0 : mainIndex + 1;
    setMainIndex(newIndex);
    setMainImageUrl(images[newIndex].src);
  };

  const handleModalPrev = e => {
    e.stopPropagation();
    handlePrev();
    scrollModalThumbnails(mainIndex === 0 ? images.length - 1 : mainIndex - 1);
  };
  const handleModalNext = e => {
    e.stopPropagation();
    handleNext();
    scrollModalThumbnails(mainIndex === images.length - 1 ? 0 : mainIndex + 1);
  };

  const scrollModalThumbsLeft = e => {
    e.stopPropagation();
    modalThumbListRef.current?.scrollBy({ left: -100, behavior: 'smooth' });
  };
  const scrollModalThumbsRight = e => {
    e.stopPropagation();
    modalThumbListRef.current?.scrollBy({ left: 100, behavior: 'smooth' });
  };

  // Zoom/pan logic
  const onWheel = e => {
    e.preventDefault();
    if (e.deltaY === 0) return;
    let newScale = zoomScale - e.deltaY * 0.001;
    newScale = Math.min(Math.max(newScale, 1), 4);
    setZoomScale(newScale);
    if (newScale === 1) setZoomTranslate({ x: 0, y: 0 });
  };

  const onDragStart = e => {
    e.preventDefault();
    lastDragPosition.current = {
      x: e.clientX || e.touches?.[0]?.clientX,
      y: e.clientY || e.touches?.[0]?.clientY,
    };
    containerRef.current.style.cursor = 'grabbing';
  };
  const onDragMove = e => {
    if (!lastDragPosition.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const y = e.clientY || e.touches?.[0]?.clientY;
    if (x === undefined || y === undefined) return;
    const dx = x - lastDragPosition.current.x;
    const dy = y - lastDragPosition.current.y;
    lastDragPosition.current = { x, y };

    const maxTranslateX = (zoomScale - 1) * containerRef.current.clientWidth / 2;
    const maxTranslateY = (zoomScale - 1) * containerRef.current.clientHeight / 2;

    setZoomTranslate(prev => ({
      x: Math.min(Math.max(prev.x + dx, -maxTranslateX), maxTranslateX),
      y: Math.min(Math.max(prev.y + dy, -maxTranslateY), maxTranslateY),
    }));
  };
  const onDragEnd = e => {
    e.preventDefault();
    lastDragPosition.current = null;
    if (containerRef.current) containerRef.current.style.cursor = zoomScale > 1 ? 'grab' : 'default';
  };

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeModal === 'zoom' ? 'hidden' : '';
  }, [activeModal]);

  if (!images || images.length === 0) {
    return (
      <div className="product-gallery no-images">
        <img src={PlaceHolderImage} alt="Placeholder" draggable={false} />
      </div>
    );
  }

  const isZoomModalOpen = activeModal === 'zoom';

  return (
    <>
      <div className="product-gallery-wrapper">
        {/* Thumbnail strip */}
        {thumbsLoaded && (
          <div className="thumbnail-list" role="list">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                className={`thumbnail-btn ${idx === mainIndex ? 'active' : ''}`}
                onClick={() => {
                  setMainImageUrl(img.src);
                  setMainIndex(idx);
                }}
                type="button"
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="thumbnail-image"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}

        {/* Main image wrapper with inline skeleton */}
        <div
          style={{
            position: 'relative',
            flexGrow: 1,
            height: '560px',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: mainLoading ? '#f0f0f0' : '#fff',
          }}
        >
         <img
  src={visibleImages[mainIndex]?.src || PlaceHolderImage}
  alt={visibleImages[mainIndex]?.alt || 'Product Image'}
  draggable={false}
  onLoad={() => setMainLoading(false)}
  onClick={() => openModal('zoom')}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'opacity 0.3s ease',
    opacity: mainLoading ? 0 : 1,
  }}
/>

          <button
            className="arrow-btn arrow-left"
            onClick={handlePrev}
            aria-label="Previous Image"
            type="button"
          >
            ‹
          </button>
          <button
            className="arrow-btn arrow-right"
            onClick={handleNext}
            aria-label="Next Image"
            type="button"
          >
            ›
          </button>
        </div>
      </div>

      {/* Zoom modal */}
      {isZoomModalOpen && (
        <ModalWrapper onClose={closeModal} titleId="zoomModalTitle" label="Zoomed Image Modal">
          <div
            className="zoomed-image-container"
            ref={containerRef}
            onWheel={onWheel}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onDragStart}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
          >
            <img
              src={images[mainIndex]?.src || PlaceHolderImage}
              alt={images[mainIndex]?.alt || 'Zoomed Product Image'}
              draggable={false}
              ref={zoomedImageRef}
              style={{
                transform: `translate(calc(-50% + ${zoomTranslate.x}px), calc(-50% + ${zoomTranslate.y}px)) scale(${zoomScale})`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Modal arrows */}
          <button className="modal-arrow-btn modal-arrow-left" onClick={handleModalPrev} aria-label="Previous Image" type="button">‹</button>
          <button className="modal-arrow-btn modal-arrow-right" onClick={handleModalNext} aria-label="Next Image" type="button">›</button>

          {/* Modal thumbnail strip */}
          <div className="modal-thumbnail-container" onClick={e => e.stopPropagation()}>
            <button className="modal-thumb-scroll arrow-left" onClick={scrollModalThumbsLeft} aria-label="Scroll thumbnails left" type="button">‹</button>
            <div className="thumbnail-list" role="list">
  {visibleImages.map((img, idx) => (
    <button
      key={img.id || idx}
      className={`thumbnail-btn ${idx === mainIndex ? 'active' : ''}`}
      onClick={() => {
        setMainImageUrl(img.src);
        setMainIndex(idx);
      }}
      type="button"
      aria-label={`Thumbnail ${idx + 1}`}
    >
      <img
        src={img.src}
        alt={img.alt || `Thumbnail ${idx + 1}`}
        className="thumbnail-image"
        loading="lazy"
        draggable={false}
      />
    </button>
  ))}
</div>

            <button className="modal-thumb-scroll arrow-right" onClick={scrollModalThumbsRight} aria-label="Scroll thumbnails right" type="button">›</button>
          </div>
        </ModalWrapper>
      )}
    </>
  );
}

function ModalWrapper({ onClose, titleId, label, children }) {
  useEffect(() => {
    const onKeyDown = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="zoom-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-label={label}
    >
      <div className="zoom-modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
