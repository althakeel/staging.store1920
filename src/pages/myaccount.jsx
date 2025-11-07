import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../components/sub/account/Sidebar';

import OrderSection from '../components/sub/account/sections/OrderSection';
import ReviewsSection from '../components/sub/account/sections/ReviewsSection';
import ProfileSection from '../components/sub/account/sections/ProfileSection';
import CouponsSection from '../components/sub/account/sections/CouponsSection';
// import CreditBalanceSection from '../components/sub/account/sections/CreditBalanceSection';
// import FollowedStoresSection from '../components/sub/account/sections/FollowedStoresSection';
import BrowsingHistorySection from '../components/sub/account/sections/BrowsingHistorySection';
import AddressesSection from '../components/sub/account/sections/AddressesSection';
import PaymentMethodsSection from '../components/sub/account/sections/PaymentMethodsSection';
import SecuritySection from '../components/sub/account/sections/SecuritySection';
import PermissionsSection from '../components/sub/account/sections/PermissionsSection';
import NotificationsSection from '../components/sub/account/sections/NotificationsSection';
import ProductsUnder20AED from '../components/ProductsUnder20AED';

import { useAuth } from '../contexts/AuthContext';

import '../assets/styles/myaccount.css';

const API_BASE = 'https://db.store1920.com/wp-json/custom/v1';

const MyAccount = () => {
  const { user } = useAuth(); // Fetch user from context
  const [coinBalance, setCoinBalance] = useState(0);
  const [coinHistory, setCoinHistory] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState(false);
  const [coinError, setCoinError] = useState(null);

  const userId = user?.id;
  const email = user?.email;
  const token = user?.token;

  // Fetch coin data for logged-in user
  useEffect(() => {
    if (!userId || !token) {
      setCoinBalance(0);
      setCoinHistory([]);
      return;
    }

    const fetchCoinData = async () => {
      setLoadingCoins(true);
      setCoinError(null);

      try {
        const res = await axios.get(`${API_BASE}/coins/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoinBalance(res.data.balance || 0);
        setCoinHistory(res.data.history || []);
      } catch (err) {
        console.error('Failed to fetch coin data:', err);
        setCoinError('Failed to load coin data.');
        setCoinBalance(0);
        setCoinHistory([]);
      } finally {
        setLoadingCoins(false);
      }
    };

    fetchCoinData();
  }, [userId, token]);

  return (
    <div className="account-wrapper">
      <div className="account-layout">
        <Sidebar />
        <main className="account-main">
          <Routes>
            <Route path="orders" element={<OrderSection userId={userId} token={token} />} />
            <Route path="reviews" element={<ReviewsSection customerEmail={email} />} />
            <Route path="profile" element={<ProfileSection userId={userId} token={token} />} />
            <Route path="coupons" element={<CouponsSection />} />
            {/* <Route
              path="credit-balance"
              element={
                <CreditBalanceSection
                  customerEmail={email}
                  coinBalance={coinBalance}
                  coinHistory={coinHistory}
                  loadingCoins={loadingCoins}
                  coinError={coinError}
                />
              }
            /> */}
            {/* <Route path="followed-stores" element={<FollowedStoresSection />} /> */}
            <Route path="browsing-history" element={<BrowsingHistorySection />} />
            <Route path="addresses" element={<AddressesSection />} />
            <Route path="payment-methods" element={<PaymentMethodsSection />} />
            <Route path="account-security" element={<SecuritySection />} />
            <Route path="permissions" element={<PermissionsSection />} />
            <Route
              path="notifications"
              element={<NotificationsSection userId={userId} token={token} />}
            />
            <Route path="" element={<Navigate to="orders" replace />} />
          </Routes>
        </main>
      </div>

      <div style={{ maxWidth: "1400px", margin: '0 auto', textAlign: 'center' }}>
        <ProductsUnder20AED />
      </div>
    </div>
  );
};

export default MyAccount;
