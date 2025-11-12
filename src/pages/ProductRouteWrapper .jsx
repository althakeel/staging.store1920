import { useParams } from "react-router-dom";
import DefaultProductPage from "../pages/ProductDetails";
import CustomProductPage from "../pages/StaticProductDetails";
import { getProductBySlug } from "../api/woocommerce";
import { useEffect, useState } from "react";

const customSlugs = [
  "rain-humidifier",
  "gaming-chair",
  "wireless-headphones",
  "yoga-mat",
  "coffee-machine",
  "fitness-tracker",
  "led-monitor",
  "travel-backpack",
  "desk-organizer"
];

const ProductRouteWrapper = () => {
  const { slug } = useParams();
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCustom = async () => {
      // Fetch product from WooCommerce
      const product = await getProductBySlug(slug);
      if (product) {
        setIsCustom(customSlugs.includes(product.slug));
      }
      setLoading(false);
    };
    checkCustom();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return isCustom ? (
    <CustomProductPage slug={slug} />
  ) : (
    <DefaultProductPage slug={slug} />
  );
};

export default ProductRouteWrapper;
