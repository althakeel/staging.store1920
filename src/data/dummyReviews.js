// src/data/dummyReviews.js

const arabicNames = [
  "Ali Al Mansoori","Fatima Al Nahyan","Mohammed bin Zayed","Sara Al Hammadi",
  "Omar Al Farsi","Layla Al Mazrouei","Hassan Al Suwaidi","Noor Al Nuaimi",
  "Khalid Al Qasimi","Aisha Al Maktoum","Yousef Al Shehhi","Mariam Al Blooshi",
  "Abdullah Al Falasi","Huda Al Ali","Salim Al Rashedi","Nada Al Mazrouei",
  "Rashid Al Tayer","Lina Al Nuaimi","Fahad Al Shamsi","Amal Al Ketbi"
];

const indianNames = [
  "Rohit Sharma","Anjali Verma","Suresh Kumar","Priya Singh",
  "Amit Patel","Deepak Yadav","Neha Sharma","Vikram Joshi",
  "Pooja Reddy","Arjun Mehta","Kavita Desai","Manish Gupta",
  "Sneha Nair","Rajesh Iyer","Anita Kapoor","Vishal Choudhary",
  "Priyanka Rathi","Rakesh Jain","Meera Nair","Sanjay Reddy"
];

const arabicComments = [
  "المنتج ممتاز جدا، أنصح الجميع بشرائه!",
  "خدمة رائعة وسريع التوصيل.",
  "جودة جيدة وسعر مناسب، تجربة ممتازة.",
  "التغليف كان جيداً، شكراً لكم.",
  "أنصح بشراء هذا المنتج مرة أخرى.",
  "تجربة رائعة، أحببت المنتج كثيراً.",
  "منتج عالي الجودة، خدمة العملاء ممتازة.",
  "التوصيل كان سريعاً والمنتج مطابق للوصف.",
  "سعر مناسب مقارنة بالجودة.",
  "منتج ممتاز، سأكرر الشراء بالتأكيد.",
  // Longer sentences
  "المنتج وصلني بشكل ممتاز والتغليف كان محكم للغاية، وأحببت خدمة العملاء التي كانت سريعة في الرد.",
  "اشتريت هذا المنتج منذ أسبوع، وقد لاحظت تحسن كبير في الأداء مقارنة بالمنتجات السابقة، أنصح الجميع بتجربته.",
  "تجربة شراء رائعة، كل شيء كان منظم بشكل جيد والخدمة سريعة والمنتج مطابق تمامًا للوصف."
];

const englishComments = [
  "Good quality product, happy with my purchase.",
  "Product is okay, could be better in packaging.",
  "Really satisfied, will order again!",
  "Value for money, decent quality.",
  "Delivery was fast and product works well.",
  "Excellent product, highly recommend!",
  "Quality exceeds expectations.",
  "Works perfectly, very happy.",
  "Fast shipping, product as described.",
  "Satisfied with the purchase, will buy again.",
  // Longer sentences
  "I bought this product last week, and I am extremely satisfied with its quality, packaging, and performance.",
  "Delivery was faster than expected, the product works perfectly and matches the description provided online, highly recommended!",
  "An amazing experience overall, the product exceeded my expectations in every way, and customer service was very responsive."
];

// Generate 120+ dummy reviews pool
export const reviewsPool = [];

for (let i = 0; i < 120; i++) {
  const isArabic = Math.random() < 0.5;
  const name = isArabic
    ? arabicNames[Math.floor(Math.random() * arabicNames.length)]
    : indianNames[Math.floor(Math.random() * indianNames.length)];
  const comment = isArabic
    ? arabicComments[Math.floor(Math.random() * arabicComments.length)]
    : englishComments[Math.floor(Math.random() * englishComments.length)];
  const rating = Math.floor(Math.random() * 5) + 1; // 1-5 stars
  const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000))
    .toISOString()
    .split('T')[0];

  reviewsPool.push({ id: `pool-${i}`, name, comment, rating, date });
}

// Function to get 2-10 random reviews for a product
export function getProductReviews(productId) {
  const count = Math.floor(Math.random() * 9) + 2; // 2-10 reviews
  const shuffled = [...reviewsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((r, index) => ({
    ...r,
    id: `${productId}-${r.id}-${index}`, // unique ID per product
  }));
}
