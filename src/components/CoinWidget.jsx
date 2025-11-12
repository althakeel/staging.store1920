import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Coin from '../assets/images/coin.png';

const API_BASE = 'https://db.store1920.com/wp-json/custom/v1';

const CoinWidget = ({ user, userId: propUserId, useMyCoins = false }) => {
  const userId = propUserId || user?.id;
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch coin balance when userId or useMyCoins flag changes
    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      // Build the API URL dynamically
      let url = '';
      if (useMyCoins) {
        url = `${API_BASE}/my-coins`;
      } else {
        if (!userId) {
          console.warn('CoinWidget: No userId provided');
          setCoins(0);
          setLoading(false);
          return;
        }
        url = `${API_BASE}/coins/${userId}`;
      }

      try {
        const res = await fetch(url, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();

        // Assuming the API returns { coins: number }
        setCoins(data.coins ?? 0);
      } catch (err) {
        console.error('Error fetching coins:', err);
        setError('Failed to load coins');
        setCoins(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [userId, useMyCoins]);

  // Navigate to the user's coin page on click
  const handleClick = () => {
    navigate('/my-coins');
  };


  useEffect(() => {
  console.log('CoinWidget fetching for userId:', userId);
  console.log('CoinWidget userId:', userId);
}, [userId]);

  return (
    <div
      style={styles.widget}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => ['Enter', ' '].includes(e.key) && handleClick()}
      title="View my coins"
      aria-label="View my coins"
    >
      <img src={Coin} alt="Coins" style={styles.icon} />
      <span style={styles.text}>
        {loading ? 'Loading...' : error ? error : `${coins} Coins`}
      </span>
    </div>
  );
};

const styles = {
  widget: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    userSelect: 'none',
  },
  icon: {
    width: 18,
    height: 18,
  },
  text: {
    fontWeight: 600,
    fontSize: 12,
    color: '#fff',
  },
};

export default CoinWidget;