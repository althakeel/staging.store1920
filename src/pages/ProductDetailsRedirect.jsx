// src/pages/ProductDetailsRedirect.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/woocommerce';

export default function ProductDetailsRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const product = await getProductById(id);
        if (product && product.slug) {
          // Redirect to the slug URL
          navigate(`/product/slug/${product.slug}`, { replace: true });
        } else {
          navigate('/404', { replace: true });
        }
      } catch (error) {
        navigate('/404', { replace: true });
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;

  return null; 
}
