// src/constants/accountMenu.js

import {
  AiOutlineShoppingCart,
  AiOutlineCheckCircle,
  AiOutlineSolution,
  AiOutlineFileText,
  AiOutlineUnlock,
  AiOutlineProfile,
  AiOutlineUser,
  AiOutlineGift,
  AiOutlineCreditCard,
  AiOutlineHeart,
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineGlobal,
  AiOutlineSafetyCertificate,
  AiOutlineBell,
} from 'react-icons/ai';

const accountMenu = [
  { label: 'All orders', slug: 'orders', icon: <AiOutlineShoppingCart /> },

  { label: 'Your reviews', slug: 'reviews', icon: <AiOutlineProfile /> },
  { label: 'Your profile', slug: 'profile', icon: <AiOutlineUser /> },
  { label: 'Coupons & offers', slug: 'coupons', icon: <AiOutlineGift /> },
  // { label: 'Credit balance', slug: 'credit-balance', icon: <AiOutlineCreditCard /> },
  // { label: 'Followed stores', slug: 'followed-stores', icon: <AiOutlineHeart /> },
  // { label: 'Browsing history', slug: 'browsing-history', icon: <AiOutlineHistory /> },
  { label: 'Addresses', slug: 'addresses', icon: <AiOutlineHome /> },
  // { label: 'Country/Region & Language', slug: 'country-region-language', icon: <AiOutlineGlobal /> },
  { label: 'Your payment methods', slug: 'payment-methods', icon: <AiOutlineCreditCard /> },
  { label: 'Account security', slug: 'account-security', icon: <AiOutlineSafetyCertificate /> },
  // { label: 'Permissions', slug: 'permissions', icon: <AiOutlineUnlock /> },
  { label: 'Notifications', slug: 'notifications', icon: <AiOutlineBell /> },
];

export default accountMenu;
