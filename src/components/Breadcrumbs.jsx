import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/breadcrumb.css';

const routeNameMap = {
  '': 'Home',
  products: 'Products',
  product: 'Product Details',
  cart: 'Cart',
  checkout: 'Checkout',
  customerprofile: 'Profile',
  wishlist: 'Wishlist',
  lightningdeal: 'Lightning Deal',
  compare: 'Compare',
  categories: 'Categories',
  category: 'Category',
  recommended: 'Recommended',
  // Add more routes as needed
};

const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs-nav">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name =
           routeNameMap[segment.toLowerCase()] ||
           segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          return (
            <li key={to} aria-current={isLast ? 'page' : undefined}>
              {isLast ? <span>{name}</span> : <Link to={to}>{name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
