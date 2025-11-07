// src/components/ProductCategory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/ProductCategory.css";
import { useCart } from "../../../contexts/CartContext";

const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CONSUMER_KEY = "ck_f44feff81d804619a052d7bbdded7153a1f45bdd";
const CONSUMER_SECRET = "cs_92458ba6ab5458347082acc6681560911a9e993d";

const ProductCategory = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple category list
  const categories = [
    { id: "all", name: "Recommended" },
    { id: "498", name: "Electronics" },
    { id: "6526", name: "Home & Kitchen" },
    { id: "6528", name: "Furniture" },
    { id: "6522", name: "Beauty" },
    { id: "6523", name: "Automotive" },
  ];

  // Fetch products for selected category
  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      let url = `${API_BASE}/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=12`;
      
      if (categoryId !== "all") {
        url += `&category=${categoryId}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load products when category changes
  useEffect(() => {
    fetchProducts(selectedCategoryId);
  }, [selectedCategoryId]);

  // Handle product click
  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="product-category-section">
      <h2>Featured Products</h2>
      
      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategoryId === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-container">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.images?.[0]?.src || '/placeholder.jpg'}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">AED {product.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;