import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/Categories.css';
import Electronics from '../assets/images/megamenu/Main catogory webp/Electronics & Smart Devices.webp'
import HomeAppliance from '../assets/images/megamenu/Main catogory webp/Home Appliances.webp'
import HomeImprovement from '../assets/images/megamenu/Main catogory webp/Home Improvement & Tools.webp'
import Furniture from '../assets/images/megamenu/Main catogory webp/Furniture & Home Living.webp'
import MenClothing from '../assets/images/megamenu/Main catogory webp/MenClothing.webp'
import WomenClothing from '../assets/images/megamenu/Main catogory webp/WomenClothing.webp'
import Lingerie from '../assets/images/megamenu/Main catogory webp/Lingerie & Loungewear.webp'
import Accessories from '../assets/images/megamenu/Main catogory webp/Accessories.webp'
import Beauty from '../assets/images/megamenu/Main catogory webp/Beauty & Personal Care.webp'
import Shoes from '../assets/images/megamenu/Main catogory webp/Shoes & Footwear.webp'
import Baby from '../assets/images/megamenu/Main catogory webp/Baby, Kids & Maternity.webp'
import Toys from '../assets/images/megamenu/Main catogory webp/Toys, Games & Entertainment.webp'
import Sports from '../assets/images/megamenu/Main catogory webp/Sports, Outdoors & Hobbies.webp'
import Automotive from '../assets/images/megamenu/Main catogory webp/Automotive & Motorcycle.webp'
import Security from '../assets/images/megamenu/Main catogory webp/Security & Safety.webp'
import Pet from '../assets/images/megamenu/Main catogory webp/Pet Supplies.webp'
import SpecialOccasion from '../assets/images/megamenu/Main catogory webp/Special Occasion & Costumes.webp'


const categories = [
  {
    id: 1,
    name: "Electronics & Smart Devices",
    image: Electronics,
    path: "/category/electronics-smart-devices"
  },
  {
    id: 2,
    name: "Home Appliances",
    image: HomeAppliance,
    path: "/category/home-appliances"
  },
  {
    id: 3,
    name: "Home Improvement & Tools",
    image: HomeImprovement,
    path: "/category/home-improvement-tools	"
  },
  {
    id: 4,
    name: "Furniture & Home Living",
    image: Furniture,
    path: "/category/furniture-home-living	"
  },
  {
    id: 5,
    name: "Men's Clothing",
    image: MenClothing,
    path: "/category/mens-clothing	"
  },
  {
    id: 6,
    name: "Women's Clothing",
    image: WomenClothing,
    path: "/category/womens-clothing	"
  },
  {
    id: 7,
    name: "Lingerie & Loungewear",
    image: Lingerie,
    path: "/category/lingerie-loungewear	"
  },
  {
    id: 8,
    name: "Accessories",
    image: Accessories,
    path: "/category/6525"
  },
  {
    id: 9,
    name: "Beauty & Personal Care",
    image: Beauty,
    path: "/category/beauty-personal-care"
  },
  {
    id: 10,
    name: "Shoes & Footwear",
    image: Shoes,
    path: "/category/shoes-footwear	"
  },
  {
    id: 11,
    name: "Baby, Kids & Maternity",
    image: Baby,
    path: "/category/baby-kids-maternity	"
  },
  {
    id: 12,
    name: "Toys, Games & Entertainment",
    image:  Toys,
    path: "/category/toys-games-entertainment	"
  },
  {
    id: 13,
    name: "Sports, Outdoors & Hobbies",
    image: Sports,
    path: "/category/sports-outdoors-hobbies		"
  },
  {
    id: 14,
    name: "Automotive & Motorcycle",
    image:Automotive,
    path: "/category/automotive-motorcycle	"
  },
  {
    id: 15,
    name: "Security & Safety",
    image: Security,
    path: "/category/security-safety	"
  },
  {
    id: 16,
    name: "Pet Supplies",
    image: Pet,
    path: "/category/pet-supplies	"
  },
  {
    id: 17,
    name: "Special Occasion & Costumes",
    image: SpecialOccasion,
    path: "/category/special-occasion-costumes	"
  }
];

// const API_AUTH = {
//   username: 'ck_c4e35c0d93df1f96cae81fccae967b8969a1eb85',
//   password: 'cs_b2b2ab3b1cdbc7db01cd718dc52b8f5a5711a6e5',
// };

const CategoryList = () => {
  const [visibleCount, setVisibleCount] = useState(25);

  const loadMore = () => setVisibleCount((prev) => prev + 25);

  const displayedCategories = categories.slice(0, visibleCount);

  return (
    <div className="category-wrapper">
      <div className="category-topbar">
        <h1 className="category-heading">Browse Categories</h1>
      </div>

      <div className="category-grid">
        {displayedCategories.map((cat) => (
         <Link to={cat.path} key={cat.id} className="category-card">
            <div className="card-content">
              <img
                src={cat.image}
                alt={cat.name}
                className="category-img"
              />
              <p className="category-name">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < categories.length && (
        <div className="loadmore-section">
          <button className="loadmore-button" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
