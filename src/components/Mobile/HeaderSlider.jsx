import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CK = "ck_408d890799d9dc59267dd9b1d12faf2b50f9ccc8";
const CS = "cs_c65538cff741bd9910071c7584b3d070609fec24";

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const CategorySlider = () => {
  const [categories, setCategories] = useState(null);
  const location = useLocation();
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const cachedCategories = localStorage.getItem("categories");
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
      return;
    }

    axios
      .get(`${API_BASE}/products/categories`, {
        params: { consumer_key: CK, consumer_secret: CS },
      })
      .then((res) => {
        if (!isMounted) return;
        setCategories(res.data);
        localStorage.setItem("categories", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("Category fetch failed", err);
        if (isMounted) setCategories([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentSlug = location.pathname.split("/category/")[1] || "";

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 150;
    container.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  const renderSkeletons = (count = 6) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          padding: "10px 16px",
          margin: "0 8px",
          backgroundColor: "#eee",
          borderRadius: "4px",
          width: "100px",
          height: "26px",
        }}
      />
    ));

  const linkStyle = (isActive) => ({
    padding: "6px 10px 4px",
    margin: "0 12px",
    fontSize: "15px",
    color: isActive ? "#000" : "#888",
    fontWeight: isActive ? "bold" : "bold",
    borderBottom: isActive ? "3px solid black" : "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "inline-block",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "5px 5px 5px", position: "relative" }}>
      {/* Left scroll arrow */}
 

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          flex: 1,
        }}
      >
        {/* Hide scrollbar visually */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <Link to="/" style={linkStyle(currentSlug === "")}>All</Link>

        {categories === null
          ? renderSkeletons()
          : categories.map((cat) => {
              const decoded = decodeHTML(cat.name);
              const isActive = currentSlug === cat.slug;
              return (
                <Link key={cat.id} to={`/category/${cat.slug}`} style={linkStyle(isActive)}>
                  {decoded}
                </Link>
              );
            })}
      </div>

      {/* Right scroll arrow */}
    
    </div>
  );
};

export default CategorySlider;
