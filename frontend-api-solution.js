// Alternative Frontend Approach - Using Custom WordPress API Endpoint
// Replace the fetchCategoryAndProducts function in CategoryPage.jsx with this:

const fetchCategoryAndProducts = async (pageNum = 1) => {
  if (!slug) return;
  setLoading(true);

  try {
    console.log('🔍 Fetching category:', slug);
    
    // Use custom WordPress API endpoint that handles slug mapping
    const categoryResponse = await axios.get(
      `https://db.store1920.com/wp-json/custom/v1/category/${slug}`
    );
    
    console.log('📦 Category Response:', categoryResponse.data);
    
    if (categoryResponse.data && categoryResponse.data.id) {
      const categoryData = categoryResponse.data;
      
      // Set category info
      setCategory({
        id: categoryData.id,
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        count: categoryData.count
      });
      
      // Now fetch products using the actual category ID
      const productsResponse = await axios.get(`${API_BASE}/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          category: categoryData.id, // Use category ID instead of slug
          per_page: PRODUCTS_PER_PAGE,
          page: pageNum,
          status: 'publish'
        },
      });
      
      console.log('🛍️ Products Response:', productsResponse.data);
      
      const newProducts = productsResponse.data || [];
      
      if (pageNum === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length === PRODUCTS_PER_PAGE);
      
      if (categoryData.mapping_used) {
        console.log(`✅ Slug mapping used: ${slug} → ${categoryData.actual_slug}`);
      }
      
    } else {
      // Fallback to original method if custom API fails
      console.log('⚠️ Custom API failed, using fallback');
      await fetchCategoryAndProductsFallback(pageNum);
    }
    
  } catch (error) {
    console.error('❌ Error fetching category:', error);
    
    // Fallback to original method
    await fetchCategoryAndProductsFallback(pageNum);
  } finally {
    setLoading(false);
    if (pageNum === 1) {
      setInitialLoading(false);
    }
  }
};

// Keep your original function as fallback
const fetchCategoryAndProductsFallback = async (pageNum = 1) => {
  // Your existing fetchCategoryAndProducts logic here as backup
  // ... (keep the existing code with SLUG_MAPPING)
};