import React, { useState, useRef, useEffect } from "react";
import staticProducts from "../../data/staticProducts";

const Section4 = ({ product: propProduct }) => {
  // Use passed product OR fallback
  const product = propProduct || staticProducts[0];
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width for responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!product || !product.reviews) return null; // safeguard

  // Determine number of reviews per view
  const getReviewsPerView = () => {
    if (windowWidth >= 1024) return 3; // desktop
    if (windowWidth >= 768) return 2;  // tablet
    return 1;                          // mobile
  };

  const reviewsPerView = getReviewsPerView();

  // Navigation
  const next = () => {
    setCurrent((prev) => (prev + 1) % product.reviews.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + product.reviews.length) % product.reviews.length);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX.current - endX > 50) next();
    else if (endX - startX.current > 50) prev();
  };

  // Get visible reviews based on current index
  const getVisibleReviews = () => {
    return product.reviews
      .slice(current, current + reviewsPerView)
      .concat(
        current + reviewsPerView > product.reviews.length
          ? product.reviews.slice(0, (current + reviewsPerView) % product.reviews.length)
          : []
      );
  };

  const visibleReviews = getVisibleReviews();

  return (
    <div style={{ textAlign: "center", padding: "60px 20px", background: "#f9f9f9" }}>
      {/* Title */}
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>
        {product.reviewsTitle}
      </h2>
      <div style={{ color: "#d77b7b", marginBottom: "40px", fontSize: "16px" }}>
        {"★".repeat(Math.floor(product.reviewsRating))}
        {"☆".repeat(5 - Math.floor(product.reviewsRating))}{" "}
        <span style={{ color: "#333" }}>{product.reviewsRating} / 5</span>
      </div>

      {/* Reviews container */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Mobile: swipeable carousel */}
        {reviewsPerView === 1 ? (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: "20px",
              cursor: "grab",
              paddingBottom: "10px",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {product.reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  minWidth: "100%",
                  flex: "0 0 auto",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "30px 20px",
                  border: "1px solid #eee",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  maxWidth: "350px",
                }}
              >
                <p style={{ fontSize: "15px", color: "#555", marginBottom: "20px" }}>
                  {review.text}
                </p>
                <p style={{ fontWeight: "700", marginBottom: "10px" }}>{review.author}</p>
                <div style={{ color: "#d77b7b", fontSize: "16px" }}>
                  {"★".repeat(review.stars)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop/Tablet: grid layout
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${reviewsPerView}, 1fr)`,
              gap: "20px",
            }}
          >
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "30px 20px",
                  border: "1px solid #eee",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "15px" }}>
                  {review.header}
                </h3>
                <p style={{ fontSize: "15px", color: "#555", marginBottom: "20px" }}>
                  {review.text}
                </p>
                <p style={{ fontWeight: "700", marginBottom: "10px" }}>{review.author}</p>
                <div style={{ color: "#d77b7b", fontSize: "16px" }}>
                  {"★".repeat(review.stars)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation arrows for desktop/tablet */}
        {reviewsPerView > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                fontSize: "20px",
                background: "#fff",
                borderRadius: "50%",
                border: "1px solid #ddd",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              ‹
            </button>
            <button
              onClick={next}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                fontSize: "20px",
                background: "#fff",
                borderRadius: "50%",
                border: "1px solid #ddd",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Section4;
