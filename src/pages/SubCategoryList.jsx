import React from "react";
import { useParams, Link } from "react-router-dom";

// Example subcategories (in real case, fetch from API)
const subCategories = {
  "mens-clothing": [
    { id: 1, name: "Shirts", slug: "shirts" },
    { id: 2, name: "Trousers", slug: "trousers" },
    { id: 3, name: "Jackets", slug: "jackets" },
  ],
  "womens-clothing": [
    { id: 1, name: "Dresses", slug: "dresses" },
    { id: 2, name: "Tops", slug: "tops" },
  ],
};

const SubCategoryList = () => {
  const { categorySlug } = useParams();
  const subCats = subCategories[categorySlug] || [];

  return (
    <div className="subcategory-wrapper">
      <h2>{categorySlug.replace("-", " ")} - Subcategories</h2>
      <div className="subcategory-grid">
        {subCats.map((sub) => (
          <Link
            key={sub.id}
            to={`/category/${categorySlug}/${sub.slug}`}
            className="subcategory-card"
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryList;
