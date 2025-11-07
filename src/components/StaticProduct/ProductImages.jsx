import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImages = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);

  const thumbnails = [
    product.thumb1,
    product.thumb2,
    product.thumb3,
    product.thumb4,
    product.thumb5,
    product.thumb6,
    product.thumb7,
    product.thumb8,
    product.thumb9,
    product.thumb10,
    product.thumb11,
    product.thumb12,
  ].filter(Boolean);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll handlers
  const scrollByAmount = 200;
  const handleNext = () => {
    containerRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };
  const handlePrev = () => {
    containerRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  // Mouse drag scroll
  useEffect(() => {
    const container = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDown = (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };
    const mouseLeave = () => {
      isDown = false;
      container.style.cursor = "grab";
    };
    const mouseUp = () => {
      isDown = false;
      container.style.cursor = "grab";
    };
    const mouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", mouseDown);
    container.addEventListener("mouseleave", mouseLeave);
    container.addEventListener("mouseup", mouseUp);
    container.addEventListener("mousemove", mouseMove);

    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      container.removeEventListener("mouseleave", mouseLeave);
      container.removeEventListener("mouseup", mouseUp);
      container.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: isMobile ? "100vw" : "600px",
        margin: "0 auto",
      }}
    >
      {/* Main Image */}
      <img
        src={mainImage}
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "100%",
          marginBottom: "12px",
        }}
      />

      {/* Thumbnails */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "8px",
        }}
      >
        {/* Prev Button */}
        {thumbnails.length > 6 && (
          <button
            onClick={handlePrev}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "50%",
              background: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChevronLeft size={16} />
          </button>
        )}

        {/* Scrollable Thumbnails */}
        <div
          ref={containerRef}
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            flex: 1,
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {thumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={thumb}
              alt={`${product.name} ${idx + 1}`}
              onClick={() => setMainImage(thumb)}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "12px",
                cursor: "pointer",
                border:
                  mainImage === thumb
                    ? "2px solid #007bff"
                    : "1px solid #ccc",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        {thumbnails.length > 6 && (
          <button
            onClick={handleNext}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "50%",
              background: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductImages;
