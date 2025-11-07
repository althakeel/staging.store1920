import axios from 'axios';

// WooCommerce API base and authentication
const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const AUTH = {
  username: 'ck_5441db4d77e2a329dc7d96d2db6a8e2d8b63c29f',
  password: 'cs_81384d5f9e75e0ab81d0ea6b0d2029cba2d52b63',
};

// Create axios instance with auth
const axiosInstance = axios.create({
  baseURL: API_BASE,
  auth: AUTH,
  timeout: 10000, // 10 seconds
});

// Fetch product reviews from WooCommerce
export async function getProductReviewsWoo(productId) {
  const id = parseInt(productId, 10);
  if (isNaN(id)) {
    console.error('❌ Invalid productId:', productId);
    return [];
  }

  let allReviews = [];
  let page = 1;
  const perPage = 100;
  let keepFetching = true;

  try {
    while (keepFetching) {
      console.log(`📡 Fetching reviews for product ${id}, page ${page}`);

      const res = await axiosInstance.get('/products/reviews', {
        params: {
          product: id,
          per_page: perPage,
          page,
        },
      });

      if (!res.data || res.data.length === 0) {
        console.log('ℹ️ No more reviews found');
        break;
      }

      const reviews = res.data.map((r) => ({
        id: r.id,
        reviewer: r.reviewer || 'Anonymous',
        rating: Number(r.rating) || 0,
        comment: r.review || '',
        date: r.date_created || null,
        image_url: null, // placeholder if you want to add reviewer images later
      }));

      allReviews = [...allReviews, ...reviews];

      // Stop if we fetched less than perPage items
      if (res.data.length < perPage) keepFetching = false;
      else page++;
    }

    console.log(`✅ Total reviews fetched for product ${id}: ${allReviews.length}`);
    return allReviews;
  } catch (err) {
    console.error('🔥 WooCommerce reviews fetch error:', err.response?.data || err.message);
    return [];
  }
}
