/**
 * HOMEPAGE OPTIMIZATION SUMMARY
 * 
 * 🚀 PERFORMANCE IMPROVEMENTS:
 * ✅ Faster loading - Reduced API calls and product limits
 * ✅ Hide empty products - Filter out products with no reviews/ratings
 * ✅ Daily-used products prioritized in "Recommended" 
 * ✅ Static products remain untouched and distributed evenly
 * 
 * 📊 FILTERING LOGIC:
 * 
 * Products are HIDDEN if they have:
 * ❌ No reviews AND rating < 3.0 AND low sales
 * 
 * Products are SHOWN if they have:
 * ✅ At least 1 review OR
 * ✅ Rating >= 3.0 OR  
 * ✅ High sales (>10)
 * ✅ Is a static product (always shown)
 * 
 * 🏆 PRIORITIZATION ORDER:
 * 
 * For "RECOMMENDED" tab:
 * 1. Static products (untouched)
 * 2. Daily-used products (kitchen, beauty, cleaning, etc.)
 * 3. High-rated products (4.5+ stars, 5+ reviews)
 * 4. Popular products (by sales)
 * 
 * For SPECIFIC CATEGORIES:
 * 1. Static products (untouched)
 * 2. High-rated products
 * 3. Popular products
 * 4. Recent products
 * 
 * 📅 DAILY-USED KEYWORDS:
 * - Kitchen: cooking, coffee, tea, blender, peeler, etc.
 * - Beauty: cream, shampoo, makeup, moisturizer, etc.
 * - Cleaning: detergent, spray, vacuum, cloth, etc.
 * - Electronics: phone, charger, headphone, etc.
 * - Health: vitamin, thermometer, scale, etc.
 * - Baby: diaper, bottle, wipes, etc.
 * 
 * 🎨 VISUAL INDICATORS:
 * - ⭐ Green badge: High-rated products (4.5+ stars)
 * - 📅 Orange badge: Daily-use products
 * - Static products: "Fast Moving" red badge (untouched)
 * 
 * ⚡ PERFORMANCE SETTINGS:
 * - Initial load: 16 products (4x4 grid)
 * - API fetch: 6 products per category
 * - Max products: 60 total
 * - Background loading: +20 more products
 * - Lazy image loading: Only load when visible
 * 
 * 🔄 LOADING SEQUENCE:
 * 1. 0ms: Show first 6 popular products per category
 * 2. 100ms: Load +20 more products in background  
 * 3. User scrolls: Lazy load images as needed
 * 4. "Load More": Add +16 more products at a time
 */