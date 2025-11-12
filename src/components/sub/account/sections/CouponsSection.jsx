import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../../assets/styles/myaccount/couponsSection.css';

const API_BASE = 'https://db.store1920.com/wp-json/wc/v3';
const CONSUMER_KEY = 'ck_8adb881aaff96e651cf69b9a8128aa5c80eb46';
const CONSUMER_SECRET = 'cs_595f6cb2c159c14024d77a2a87fa0b6947041f9f';

const TABS = ['Unused', 'Used', 'Expired'];

const CouponsSection = () => {
  const [activeTab, setActiveTab] = useState('Unused');
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCouponStatus = (coupon) => {
    const now = new Date();
    const expiry = coupon.date_expires ? new Date(coupon.date_expires) : null;

    if (coupon.used_by.length > 0) return 'Used';
    if (expiry && now > expiry) return 'Expired';
    return 'Unused';
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`${API_BASE}/coupons`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            per_page: 100,
          },
        });
        setCoupons(res.data);
      } catch (err) {
        console.error('Failed to fetch coupons', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    const list = coupons.filter((c) => getCouponStatus(c) === activeTab);
    setFilteredCoupons(list);
  }, [activeTab, coupons]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading coupons...</p>;

  return (
    <div className="coupon-section">
      <h2 style={{ marginBottom: 20 }}>My Coupons</h2>

      <div className="coupon-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`coupon-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="coupon-content">
        {filteredCoupons.length === 0 ? (
          <div className="no-coupons">
            <p>You don't have any coupons or offers available</p>
          </div>
        ) : (
          <div className="coupon-list">
            {filteredCoupons.map((coupon) => (
              <div key={coupon.id} className="coupon-card">
                <div className="coupon-title">
                  {coupon.code.toUpperCase()}
                </div>
                <div className="coupon-desc">
                  {coupon.description || 'No description'}
                </div>
                {coupon.amount && (
                  <div className="coupon-discount">
                    Discount: {coupon.amount} {coupon.discount_type === 'percent' ? '%' : 'AED'}
                  </div>
                )}
                {coupon.date_expires && (
                  <div className="coupon-expiry">
                    Expires: {new Date(coupon.date_expires).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsSection;
