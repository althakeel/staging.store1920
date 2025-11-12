import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/LightingCategorySlider.css';

const LightingCategorySlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://db.store1920.com/wp-json';

  useEffect(() => {
    const fetchLightingCategoriesAndProducts = async () => {
      try {
        // Fetch selected categories from your custom endpoint
        const categoryRes = await axios.get(`${API_BASE}/myplugin/v1/lighting-categories`);
        const selectedCats = categoryRes.data;

        if (!Array.isArray(selectedCats) || selectedCats.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        let allProducts = [];

        // Fetch products for each selected category
        for (const cat of selectedCats) {
          try {
            const productRes = await axios.get(
              `${API_BASE}/wc/v3/products`,
              {
                params: {
                  category: cat.id,
                  per_page: 5,
                  consumer_key: 'ck_408d890799d9dc59267dd9b1d12faf2b50f9ccc8',
                  consumer_secret: 'cs_c65538cff741bd9910071c7584b3d070609fec24',
                }
              }
            );
            allProducts = [...allProducts, ...productRes.data];
          } catch (productErr) {
            console.error(`Failed to fetch products for category ${cat.id}`, productErr);
            // Continue to next category on error
          }
        }

        if (allProducts.length === 0) {
          setProducts([]);
        } else {
          setProducts(allProducts);
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch lighting categories:', err.response?.data || err.message || err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };

    fetchLightingCategoriesAndProducts();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <div className="lighting-slider-loading">Loading...</div>;

  if (error) return <div className="lighting-slider-error">{error}</div>;

  if (products.length === 0) return <div className="lighting-slider-empty">No products found.</div>;

  return (
    <div className="lighting-slider-container">
      <h2 className="lighting-slider-title">Featured Lighting Categories</h2>
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.id} className="lighting-slider-card">
            <Link to={`/product/${product.slug}`} className="slider-product-link">
              <img
                src={product.images?.[0]?.src || '/placeholder.jpg'}
                alt={product.name}
                className="slider-product-image"
              />
              <div className="slider-product-info">
                <h3 className="slider-product-name">{product.name}</h3>
                <p className="slider-product-price" dangerouslySetInnerHTML={{ __html: product.price_html || 'N/A' }} />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LightingCategorySlider;
