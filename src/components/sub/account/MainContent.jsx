// File: src/components/account/MainContent.jsx

import React from 'react';
import '../../../assets/styles/maincontent.css';

import OrderSection from '../../sub/account/sections/OrderSection';
import ReviewsSection from '../../sub/account/sections/ReviewsSection';
import ProfileSection from '../../sub/account/sections/ProfileSection';
import CouponsSection from '../../sub/account/sections/CouponsSection';
import CreditBalanceSection from '../../sub/account/sections/CreditBalanceSection';
import FollowedStoresSection from '../../sub/account/sections/FollowedStoresSection';
import BrowsingHistorySection from '../../sub/account/sections/BrowsingHistorySection';
import AddressesSection from '../../sub/account/sections/AddressesSection';
import RegionLanguageSection from '../../sub/account/sections/RegionLanguageSection';
import PaymentMethodsSection from '../../sub/account/sections/PaymentMethodsSection';
import SecuritySection from '../../sub/account/sections/SecuritySection';
import PermissionsSection from '../../sub/account/sections/PermissionsSection';
import NotificationsSection from '../../sub/account/sections/NotificationsSection';

const sectionMap = {
  'All orders': <OrderSection />,

  'Your reviews': <ReviewsSection />,
  'Your profile': <ProfileSection />,
  'Coupons & offers': <CouponsSection />,
  'Credit balance': <CreditBalanceSection />,
  'Followed stores': <FollowedStoresSection />,
  'Browsing history': <BrowsingHistorySection />,
  'Addresses': <AddressesSection />,
  'Country/Region & Language': <RegionLanguageSection />,
  'Your payment methods': <PaymentMethodsSection />,
  'Account security': <SecuritySection />,
  'Permissions': <PermissionsSection />,
  'Notifications': <NotificationsSection />,
};

const MainContent = ({ section }) => {
  return (
    <main className="account-main">
      <h2>{section}</h2>
      {sectionMap[section] || <p>Section not found.</p>}
    </main>
  );
};

export default MainContent;