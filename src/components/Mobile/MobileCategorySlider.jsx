import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholderImg from "../../assets/images/Skelton.png";
import { getChildCategories } from "../../api/woocommerce";

// Decode HTML entities in category names
const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cached = localStorage.getItem("categories");
        if (cached) {
          setCategories(JSON.parse(cached));
          return;
        }

        // Fetch top-level categories (parent = 0)
        const cats = await getChildCategories(0);

        if (cats) {
          setCategories(cats);
          localStorage.setItem("categories", JSON.stringify(cats));
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      style={{
        overflowX: "auto",
        padding: "10px",
        marginBottom: "10px",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "nowrap",
          scrollSnapType: "x mandatory",
        }}
      >
        {categories.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 auto",
                  width: 110,
                  height: 145,
                  background: "#eee",
                  borderRadius: 10,
                  scrollSnapAlign: "start",
                }}
              />
            ))
          : categories.map((cat) => {
              const name = decodeHTML(cat.name);
              const imgSrc = cat.image?.src || placeholderImg;

              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  style={{
                    flex: "0 0 auto",
                    width: 110,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    textDecoration: "none",
                    color: "#000",
                    scrollSnapAlign: "start",
                    display: "block",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={name}
                    style={{
                      width: "100%",
                      height: 90,
                      objectFit: "cover",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      background: "#f9f9f9",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImg; // Fallback if image fails
                    }}
                  />
                  <div
                    style={{
                      padding: "6px 5px",
                      fontSize: 12,
                      fontWeight: 500,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {name}
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategorySlider;
