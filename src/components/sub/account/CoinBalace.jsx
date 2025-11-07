import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

const COIN_API_URL = 'https://db.store1920.com/wp-json/custom/v1/coins';
const REDEEM_API_URL = 'https://db.store1920.com/wp-json/custom/v1/redeem-coins';
const AED_PER_10_COINS = 1;

const CoinBalance = ({ onCoinRedeem }) => {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);
  const [redeemCoins, setRedeemCoins] = useState('');
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [error, setError] = useState(null);
  const [hasRedeemed, setHasRedeemed] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const userId = user?.id || localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      console.warn('User ID not found');
      return;
    }

    const fetchCoins = async () => {
      try {
        console.log('Fetching coins for user:', userId);
        const response = await axios.get(`${COIN_API_URL}/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        console.log('API response:', response.data);
        setCoins(response.data.coins ?? 0);
      } catch (err) {
        console.error('Error fetching coin balance:', err);
        setError('Failed to load coin balance.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [userId]);

  // Auto close toast after 2.3 seconds
  useEffect(() => {
    if (!toast.message) return;
    const timer = setTimeout(() => setToast({ message: '', type: 'info' }), 2300);
    return () => clearTimeout(timer);
  }, [toast.message]);

  const handleRedeem = async () => {
    if (hasRedeemed) {
      setToast({ message: 'Only one redemption allowed.', type: 'error' });
      return;
    }

    const coinsToRedeem = parseInt(redeemCoins, 10);

    if (!coinsToRedeem || coinsToRedeem <= 0 || coinsToRedeem > coins) {
      setToast({ message: 'Please enter a valid number of coins to redeem.', type: 'error' });
      return;
    }

    // Calculate discount as decimal
    const discount = (coinsToRedeem / 10) * AED_PER_10_COINS;

    setRedeeming(true);
    setError(null);

    try {
      const response = await axios.post(
        REDEEM_API_URL,
        { coins: coinsToRedeem, user_id: userId },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const newBalance = response.data.new_balance;
      setCoins(newBalance);
      setRedeemCoins('');
      setHasRedeemed(true);
      onCoinRedeem?.({ coinsUsed: coinsToRedeem, discountAED: discount });
      setToast({ message: 'Redeem successful!', type: 'success' });
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to redeem coins. Please try again.';
      setToast({ message, type: 'error' });
      setError(message);
    } finally {
      setRedeeming(false);
    }
  };

  const discountPreview = (parseFloat(redeemCoins || '0') / 10) * AED_PER_10_COINS;

  // Inline Toast component centered at top
  const Toast = ({ message, type }) => {
    if (!message) return null;
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      info: '#2f86eb',
    };
    return (
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: colors[type] || colors.info,
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontWeight: 600,
          zIndex: 9999,
          minWidth: 250,
          textAlign: 'center',
        }}
        role="alert"
        aria-live="assertive"
      >
        {message}
      </div>
    );
  };

  return (
    <>
      <div
        className="coin-section"
        style={{
          border: '1px solid #eaeaea',
          borderRadius: 12,
          padding: 16,
          background: '#fefefe',
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>My Coins</span>
          <span
            style={{
              backgroundColor: '#fcd34d',
              padding: '6px 12px',
              borderRadius: 16,
              fontWeight: 600,
              fontSize: 14,
              color: '#000',
            }}
          >
            {loading ? 'Loading...' : `${coins} coins`}
          </span>
        </div>

        {!loading && (
          <>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="number"
                min="0"
                max={coins}
                value={redeemCoins}
                onChange={(e) => setRedeemCoins(e.target.value)}
                placeholder="Enter coins to redeem"
                disabled={redeeming || hasRedeemed}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                }}
              />
              <button
                onClick={handleRedeem}
                disabled={redeeming || hasRedeemed}
                style={{
                  backgroundColor: redeeming || hasRedeemed ? '#aaa' : '#ff6f00',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: redeeming || hasRedeemed ? 'not-allowed' : 'pointer',
                }}
              >
                {hasRedeemed ? 'Redeemed' : redeeming ? 'Redeeming...' : 'Redeem'}
              </button>
            </div>

            <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
              Every 10 coins = AED {AED_PER_10_COINS}
            </p>

            {redeemCoins && discountPreview > 0 && !hasRedeemed && (
              <p style={{ fontSize: 13, color: '#000', marginTop: 6 }}>
                You will get <strong>AED {discountPreview.toFixed(1)}</strong> off
              </p>
            )}

            {error && (
              <p style={{ color: 'red', marginTop: 8, fontSize: 14 }}>{error}</p>
            )}
          </>
        )}
      </div>

      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} />
    </>
  );
};

export default CoinBalance;
