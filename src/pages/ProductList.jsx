import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Example fetch (replace with WooCommerce/Backend API)
    // axios.get(`/api/products?category=${categorySlug}&sub=${subCategorySlug}`)
    //   .then(res => setProducts(res.data));

    // Temporary mock
    setProducts([
      { id: 1, name: "Blue Shirt", price: 50 },
      { id: 2, name: "Black Jacket", price: 120 },
    ]);
  }, [categorySlug, subCategorySlug]);

  return (
    <div>
      <h2>
        {categorySlug} → {subCategorySlug}
      </h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <p>{p.name}</p>
            <span>${p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
