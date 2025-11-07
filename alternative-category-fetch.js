// Alternative fetchCategoryAndProducts function for CategoryPage.jsx
// Use this if you implement the WordPress functions.php solution

const fetchCategoryAndProductsWithCustomAPI = async (pageNum = 1) => {
  if (!slug) return;
  setLoading(true);

  try {
    console.log('🔍 Fetching category with frontend slug:', slug);
    
    // 1️⃣ Use custom WordPress endpoint
    const catRes = await axios.get(`https://db.store1920.com/wp-json/custom/v1/category/${slug}`);
    
    console.log('📦 Custom Category API Response:', catRes.data);
    
    const cat = catRes.data;
    setCategory(cat);

    // 2️⃣ Fetch products using actual category ID
    console.log('🛍️ Fetching products for category ID:', cat.id);
    const prodRes = await axios.get(`${API_BASE}/products`, {
      params: {
        category: cat.id,
        per_page: PRODUCTS_PER_PAGE,
        page: pageNum,
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      },
    });

    console.log('📦 Products API Response:', prodRes.data);
    console.log('📊 Products found:', prodRes.data.length);
    
    if (prodRes.data.length === 0) {
      console.log('⚠️ No products found for category ID:', cat.id);
      console.log('⚠️ Category name:', cat.name);
    }

    const newUnique = prodRes.data.filter(
      (p) => !products.some((existing) => existing.id === p.id)
    );

    setProducts((prev) =>
      pageNum === 1 ? prodRes.data : [...prev, ...newUnique]
    );
    setHasMore(prodRes.data.length >= PRODUCTS_PER_PAGE);
  } catch (err) {
    console.error("❌ Error fetching category/products:", err);
    console.error("❌ Error details:", err.response?.data);
    console.error("❌ Error status:", err.response?.status);
    if (pageNum === 1) setProducts([]);
    setHasMore(false);
  } finally {
    setLoading(false);
    setInitialLoading(false);
  }
};