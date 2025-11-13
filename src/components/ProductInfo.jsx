import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

import '../assets/styles/ProductInfo.css';

import OfferBox from './OfferBox';
import ProductBadges from './ProductSellerbadge';
import ProductBadgesseller from './sub/ProductBadges';
import ShareDropdown from './ShareDropdown';
import PriceDisplay from './products/PriceDisplay';
import ProductVariants from './products/ProductVariants';
import ClearanceSaleBox from './products/ClearanceSaleBox';
import QuantitySelector from './products/QuantitySelector';
import ButtonSection from './products/ButtonSection';
import OrderPerks from './products/OrderPerks';
import ProductShortDescription from './products/ProductShortDescription';
import ItemDetailsTable from './products/ItemDetailsTable';
import ProductCardReviews from '../components/temp/productcardreviews';
import MobileStickyCart from '../components/MobileStickyCart';

export default function ProductInfo({ product, variations, selectedVariation, onVariationChange }) {
  const [quantity, setQuantity] = useState(1);
  const [hasItemDetails, setHasItemDetails] = useState(false);

  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  const isOutOfStock = selectedVariation?.stock_status === 'outofstock';

  // Reset quantity when selected variation changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedVariation]);

  // Extract brand attribute
  const brandAttribute = product.attributes?.find(attr => {
    if (!attr.name) return false;
    const name = attr.name.toLowerCase();
    const slug = (attr.slug || '').toLowerCase();
    return name.includes('brand') || slug.includes('brand');
  });
  const brandOptions = brandAttribute?.options || [];
  const brand = brandOptions.length ? brandOptions[0] : null;

  // Stock quantity calculation
  const rawQty = Number(selectedVariation?.stock_quantity);
  const productQty = Number(product?.stock_quantity);
  const manageStock = selectedVariation?.manage_stock;
  const maxQuantity =
    manageStock && Number.isInteger(rawQty) && rawQty > 0
      ? rawQty
      : Number.isInteger(productQty) && productQty > 0
      ? productQty
      : 99;

  if (!product) return null;

  // Normalize clearance sale values
  const showClearance = product.show_clearance_sale === true || product.show_clearance_sale === 'yes';
  const clearanceEndTime = product.clearance_end_time
    ? product.clearance_end_time.replace(' ', 'T') // Convert "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM:SS"
    : null;

  const handleAddToCart = () => {
    const variation = selectedVariation || product;

    const itemToAdd = {
      id: variation.id,
      name: product.name,
      quantity,
      price: variation.price || product.price,
      image: variation.image?.src || product.images?.[0]?.src || '',
      variation: selectedVariation?.attributes || [],
    };

    addToCart(itemToAdd);
    setIsCartOpen(true);

    if (showClearance) navigate('/checkout');
  };

  const combinedBadges = [
    ...(product.custom_seller_badges || []),
    ...(product.best_seller_recommended_badges || []).map(b => {
      if (b === 'best_seller') return 'best_recommended';
      if (b === 'recommended') return 'best_recommended'; // optional, or create another key
      return b;
    })
  ];
  
  return (
    <section className="pi-product-info">
      <OfferBox />

      <div className="pi-product-title-row">
        <div className="pi-badges-and-title">
      
        <h1 style={{ margin: '5px 0' }}>
            {product.name} <ShareDropdown url={window.location.href} />
          </h1>
          <ProductBadges badges={combinedBadges} />
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
  <ProductCardReviews 
    productId={product.id}
    soldCount={product.total_sales || 0}
  />
  <ProductBadgesseller />
</div>


          {product.sku && <p className="pi-product-sku">SKU: {product.sku}</p>}
          {brand && <p className="pi-product-brand">Brand: {brand}</p>}
        </div>
      </div>
    

      <PriceDisplay product={product} selectedVariation={selectedVariation} />
      {/* Official TabbyCard widget above Buy Now button (only one Tabby, as requested) */}
      <div style={{width:'100%', margin:'18px 0'}}>
        <div id="tabbyProductCard" style={{width:'100%'}}></div>
<<<<<<< HEAD
      </div>
=======
        {/* Tamara Product Widget below Tabby */}
        <div
          className="tamara-product-widget"
          data-lang="en"
          data-price={selectedVariation?.price ?? product.price ?? 0}
          data-currency="AED"
          data-country-code="AE"
          data-color-type="default"
          data-tag-position="inside"
          data-show-border="true"
          data-payment-type="installment"
          data-public-key="610bc886-8883-42f4-9f61-4cf0ec45c02e"
          data-number-of-installments="4"
          data-disable-installment="false"
          data-disable-paylater="true"
        ></div>
      </div>
      {/* Tamara widget loader (official async pattern) */}
      {typeof window !== 'undefined' && (() => {
        // Only load once
        if (!document.getElementById('tamara-product-widget-js')) {
          window.tamaraAsyncCallback = function () {
            if (window.TamaraProductWidget) {
              window.TamaraProductWidget.init({
                lang: 'en',
                currency: 'AED',
                publicKey: '610bc886-8883-42f4-9f61-4cf0ec45c02e'
              });
              window.TamaraProductWidget.render();
            }
          };
          const script = document.createElement('script');
          script.src = 'https://cdn.tamara.co/widget/product-widget.min.js';
          script.async = true;
          script.id = 'tamara-product-widget-js';
          document.body.appendChild(script);
        } else if (window.TamaraProductWidget) {
          window.TamaraProductWidget.init({
            lang: 'en',
            currency: 'AED',
            publicKey: '610bc886-8883-42f4-9f61-4cf0ec45c02e'
          });
          window.TamaraProductWidget.render();
        }
        return null;
      })()}
>>>>>>> bf1d070 (Integrate Tamara payment widget in PaymentMethods)
      {/* TabbyCard script loader */}
      {typeof window !== 'undefined' && (() => {
        // Ensure price is always a number before calling toFixed
        const rawPrice = selectedVariation?.price ?? product.price ?? 0;
        const priceNum = parseFloat(rawPrice) || 0;
        if (!document.getElementById('tabby-product-card-js')) {
          const script = document.createElement('script');
          script.src = 'https://checkout.tabby.ai/tabby-card.js';
          script.id = 'tabby-product-card-js';
          script.onload = () => {
            if (window.TabbyCard) {
              new window.TabbyCard({
                selector: '#tabbyProductCard',
                currency: 'AED',
                price: priceNum.toFixed(2),
                lang: 'en',
                shouldInheritBg: false,
                publicKey: 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf',
                merchantCode: 'Store1920'
              });
            }
          };
          document.body.appendChild(script);
        } else if (window.TabbyCard) {
          new window.TabbyCard({
            selector: '#tabbyProductCard',
            currency: 'AED',
            price: priceNum.toFixed(2),
            lang: 'en',
            shouldInheritBg: false,
            publicKey: 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf',
            merchantCode: 'Store1920'
          });
        }
        return null;
<<<<<<< HEAD
      })()}
=======
  })()}
>>>>>>> bf1d070 (Integrate Tamara payment widget in PaymentMethods)
      <ProductShortDescription shortDescription={product.short_description} />

      {showClearance && clearanceEndTime ? (
        <ClearanceSaleBox endTime={clearanceEndTime} style={{padding: '50px', background:"red"}}>
          <ProductVariants
            variations={variations}
            selectedVariation={selectedVariation}
            onVariationChange={onVariationChange}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={maxQuantity}
          />
        </ClearanceSaleBox>
      ) : (
        <>
          <ProductVariants
            variations={variations}
            selectedVariation={selectedVariation}
            onVariationChange={onVariationChange}
            maxQuantity={maxQuantity}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            maxQuantity={maxQuantity}
          />
        </>
      )}

<MobileStickyCart
  quantity={quantity}
  setQuantity={setQuantity}
  maxQuantity={maxQuantity}
  product={product}
  selectedVariation={selectedVariation}
  showClearance={showClearance}
  handleAddToCart={handleAddToCart}
/>
<<<<<<< HEAD


      {/* Official TabbyCard widget above Buy Now button */}
      <div style={{width:'100%', margin:'18px 0'}}>
        <div id="tabbyProductCard" style={{width:'350px'}}></div>
      </div>

      {/* TabbyCard script loader */}
     
 {typeof window !== 'undefined' && (() => {
        // Ensure price is always a number before calling toFixed
        const rawPrice = selectedVariation?.price ?? product.price ?? 0;
        const priceNum = parseFloat(rawPrice) || 0;
        if (!document.getElementById('tabby-product-card-js')) {
          const script = document.createElement('script');
          script.src = 'https://checkout.tabby.ai/tabby-card.js';
          script.id = 'tabby-product-card-js';
          script.onload = () => {
            if (window.TabbyCard) {
              new window.TabbyCard({
                selector: '#tabbyProductCard',
                currency: 'AED',
                price: priceNum.toFixed(2),
                lang: 'en',
                shouldInheritBg: false,
                publicKey: 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf',
                merchantCode: 'Store1920'
              });
            }
          };
          document.body.appendChild(script);
        } else if (window.TabbyCard) {
          new window.TabbyCard({
            selector: '#tabbyProductCard',
            currency: 'AED',
            price: priceNum.toFixed(2),
            lang: 'en',
            shouldInheritBg: false,
            publicKey: 'pk_test_019a4e3b-c868-29ff-1078-04aec08847bf',
            merchantCode: 'Store1920'
          });
        }
        return null;
      })()}
=======
>>>>>>> bf1d070 (Integrate Tamara payment widget in PaymentMethods)
      <ButtonSection
        product={product}
        selectedVariation={selectedVariation}
        quantity={quantity}
        isClearance={showClearance}
        handleAddToCart={handleAddToCart}
      />

      {hasItemDetails && (
        <ItemDetailsTable
          postId={product.id}
          postType="posts"
          onHasData={(exists) => setHasItemDetails(exists)}
        />
      )}

      <OrderPerks />
    </section>
  );
}
