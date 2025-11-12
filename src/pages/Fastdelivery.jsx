import React from 'react';
import { useNavigate } from 'react-router-dom';
import Product1 from '../assets/images/staticproducts/pressurewasher/1.webp';
import Product2 from '../assets/images/staticproducts/airbed/1.webp';
import Product3 from '../assets/images/staticproducts/paintspray/14.webp';
import Product4 from '../assets/images/staticproducts/pruningmachine/10.webp';
import Product5 from '../assets/images/staticproducts/gamekit/1.webp';
import Product7 from '../assets/images/staticproducts/Air Blower/1.webp';
import Product8 from '../assets/images/staticproducts/AIR BLOWER MINI/9.webp'
import Product9 from '../assets/images/staticproducts/Steamer/1.webp'
import Product10 from '../assets/images/staticproducts/Peeler/1.webp'

const staticProducts = [
  {
    id: "68V Cordless Portable Car Wash Pressure Washer Gun with Dual",
    name: "68V Cordless Portable Car Wash Pressure Washer Gun with Dual",
    price: "69.90",
    regular_price: "149.90",
    sale_price: "69.90",
    images: [{ src: Product1 }],
    path: "/products/68v-cordless-portable-car-wash-pressure-washer-gun-with-dual",
    rating: 4,
    reviews: 18,
    sold: 120
  },
  {
    id: "twin-size-air-mattress-with-built-in-rechargeable-pump",
    name: "Twin Size Air Mattress with Built-in Rechargeable Pump – Self-Inflating Blow Up Bed",
    price: "139.00",
    regular_price: "189.0",
    sale_price: "139.00",
    images: [{ src: Product2 }],
    path: "/products/twin-size-air-mattress-with-built-in-rechargeable-pump-16-self-inflating-blow-up-bed-for-home-camping-guests",
    rating: 5,
    reviews: 45,
    sold: 135,
  },
  {
    id: "850w-electric-paint-sprayer-uae",
    name: "Electric Paint Sprayer",
    price: "85.00",
    regular_price: "250.0",
    sale_price: "89.99",
    images: [{ src: Product3 }],
    path: "/products/850w-electric-paint-sprayer-uae",
    rating: 5,
    reviews: 159,
    sold: 195,
  },
  {
    id: "5",
    name: "TrimPro™ 21V Cordless Electric Pruning Shears",
    price: "109.9",
    regular_price: "250.0",
    sale_price: "109.9",
    images: [{ src: Product4 }],
    path: "/products/trimpro-21v-cordless-electric-pruning-shears",
    rating: 5,
    reviews: 169,
    sold: 225,
  },
  {
    id: "6",
    name: "GameBox 64 Retro Console – 20,000+ Games, 4K HDMI, Wireless Controllers",
    price: "96.00",
    regular_price: "96.0",
    sale_price: "69.99",
    images: [{ src: Product5 }],
    path: "/products/gamebox-64-retro-console-20000-preloaded-games-4k-hdmi-wireless-controllers",
    rating: 5,
    reviews: 110,
    sold: 185,
  },
  {
    id: "7",
    name: "Cordless 2-in-1 Leaf Blower & Vacuum",
    price: "55.90",
    regular_price: "189.00",
    sale_price: "55.90",
    images: [{ src: Product7 }],
    path: "/products/cordless-2-in-1-leaf-blower-vacuum",
    rating: 5,
    reviews: 195,
    sold: 285,
  },
    {
    id: "8",
    name: "Turbo Cordless Leaf Blower – 21V Power for Every Task",
    price: "49.90",
    regular_price: "99.98",
    sale_price: "49.90",
    images: [{ src: Product8 }],
    path: "/products/turbo-cordless-leaf-blower-21v-power-for-every-task",
    rating: 5,
    reviews: 169,
    sold: 225,
  },
      {
    id: "9",
    name: "Steam Cleaner DF-A001 – Japan Technology",
    price: "89.90",
    regular_price: "129.70",
    sale_price: "89.90",
    images: [{ src: Product9 }],
    path: "/products/steam-cleaner-df-a001-japan-technology",
    rating: 5,
    reviews: 139,
    sold: 295,
  },
  {
    id: "10",
    name: "Electric Grape & Garlic Peeling Machine",
    price: "89.00",
    regular_price: "100",
    sale_price: "89.00",
    images: [{ src: Product10 }],
    path: "/products/electric-grape-garlic-peeling-machine",
    rating: 5,
    reviews: 199,
    sold: 305,
  },
];

const Fastdelivery = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#ffffffff', padding: '10px 0 50px' }}>
      {/* Section Title */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 30px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '8px',
        }}>
         Fast Delivery Products
        </h2>
        <p style={{
          color: '#666',
          fontSize: '15px',
          margin: 0,
        }}>
          Get your top-selling items delivered in no time!
        </p>
      </div>

      {/* Product Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: '20px',
        padding: '0 10px',
      }}>
        {staticProducts.map((product) => (
          <div
            key={product.id}
            style={{
              position: 'relative',
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 3px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onClick={() => navigate(product.path)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Top Badge */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#ff6b00',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              Fast Moving
            </div>

            {/* Product Image */}
            <img
              src={product.images[0].src}
              alt={product.name}
              style={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderBottom: '1px solid #f0f0f0',
              }}
            />

            {/* Product Info */}
            <div style={{ padding: '14px 14px 52px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                lineHeight: '1.4em',
                marginBottom: '10px',
                minHeight: '44px',
                overflow: 'hidden',
              }}>
                {product.name}
              </h3>

              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#ff6b00' }}>AED {product.sale_price}</span>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '12px' }}>AED {product.regular_price}</span>
              </div>

              <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                ⭐ {product.rating} ({product.reviews}) • Sold {product.sold}
              </div>
            </div>

            {/* Bottom Labels */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: '#ffcc00',
              color: '#000',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 'bold',
            }}>
              Fast Delivery
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(product.path);
              }}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: '#ff6b00',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e65c00'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#ff6b00'}
            >
              Buy Now
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fastdelivery;
