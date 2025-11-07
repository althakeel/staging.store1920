/**
 * Static Product Distribution Pattern
 * 
 * BEFORE (Old Pattern):
 * [Static1] [Static2] [Static3] [Real1] [Real2] [Real3] [Real4] [Real5]...
 * ❌ All static products clustered at the beginning
 * 
 * AFTER (New Even Distribution):
 * 
 * FOR "RECOMMENDED" TAB:
 * [Real1] [Real2] [Static1] [Real3] [Real4] [Real5] [Static2] [Real6] [Real7] [Real8] [Static3]...
 * ✅ Static products appear every 4th position (positions 3, 7, 11, 15...)
 * 
 * FOR SPECIFIC CATEGORY TABS:
 * [Real1] [Real2] [Static1] [Real3] [Real4] [Real5] [Static2] [Real6] [Real7]...
 * ✅ Static products distributed evenly based on total product count
 * 
 * VISUAL GRID (4 columns):
 * Row 1: [Real1] [Real2] [Static1] [Real3]
 * Row 2: [Real4] [Real5] [Static2] [Real6] 
 * Row 3: [Real7] [Real8] [Static3] [Real9]
 * Row 4: [Real10] [Real11] [Static4] [Real12]
 * 
 * This ensures:
 * ✅ Static products are visible throughout the entire grid
 * ✅ Users see promotional items no matter how far they scroll
 * ✅ Better engagement with featured products
 * ✅ More natural product browsing experience
 */

// Implementation Details:

// 1. getMergedProductsForRecommended() - For "Recommended" tab
//    - Places static products at every 4th position
//    - Ensures even distribution across the grid
//    - Maintains 3:1 ratio of real:static products

// 2. getMergedProducts() - For specific category tabs  
//    - Calculates optimal interval based on total products
//    - Distributes static products evenly throughout
//    - Adapts to different category sizes

// 3. Progressive Loading maintains distribution:
//    - Static products show immediately
//    - Real products load and fill gaps
//    - Distribution pattern preserved during loading