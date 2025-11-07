import React, { useEffect, useState } from 'react';
import CoinIcon from '../assets/images/coingroup.png';
import '../assets/styles/MyCoinsPage.css';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = 'https://db.store1920.com/wp-json/custom/v1';

const faqList = [
  { question: 'How many coins do I earn for registration?', answer: 'You earn 100 coins as a welcome bonus on new user registration.' },
  { question: 'How many coins do I earn per purchase?', answer: 'You earn 5 coins for every 100 AED spent on eligible products.' },
  { question: 'Can I redeem coins on shipping fees?', answer: 'Yes, you can apply coins to both product prices and shipping fees.' },
  { question: 'Do coins expire?', answer: 'No, your Store1920 coins never expire. Use them anytime.' },
  { question: 'What is the minimum coins required to redeem?', answer: 'You need a minimum of 10 coins (equal to 1 AED) to redeem at checkout.' },
  { question: 'What happens if my order is cancelled?', answer: 'Coins used on cancelled or refunded orders are credited back to your account.' },
  { question: 'Can I transfer my coins to another user?', answer: 'No, coins are tied securely to your account and cannot be transferred.' },
];

export default function MyCoinsPage({ userId: propUserId, useMyCoins = false }) {
  const { user, loading: authLoading } = useAuth();

  // Determine the correct user ID
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  let localUserId = null;
  if (storedUser) {
    try { localUserId = JSON.parse(storedUser)?.id || null; } catch { localUserId = null; }
  }

  const userId = Number(propUserId || user?.id || localUserId);

  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (authLoading || !userId) return; // Wait until user is loaded

    async function fetchCoins() {
      try {
        setLoading(true);
        setError(null);

        let endpoint = useMyCoins ? `${API_BASE}/my-coins` : `${API_BASE}/coins/${userId}`;
        const res = await fetch(endpoint, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          },
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setCoins(data.coins ?? 0);
      } catch (err) {
        console.error(err);
        setError('Failed to load coins');
        setCoins(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [userId, useMyCoins, authLoading, user?.token]);

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <>
      <div className="coins-banner">
        <img src="https://db.store1920.com/wp-content/uploads/2025/08/scoin-banner-1.webp" alt="Store1920 Coins Banner" className="coins-banner-img" />
      </div>

      <main className="coins-container">
        <section className="coins-balance-card">
          <div className="coins-balance-content">
            <img src={CoinIcon} alt="Coin Icon" className="coins-icon" />
            {loading && <span className="coins-loading">Loading balance...</span>}
            {error && <span className="coins-error">{error}</span>}
            {!loading && !error && (
              <div className="coins-amount">
                <span className="coins-number">{coins}</span>
                <span className="coins-label">coins</span>
              </div>
            )}
          </div>
          <p className="coins-exchange-rate">10 coins = 1 AED discount at checkout</p>
        </section>

        <section className="coins-info-cards">
          <article className="info-card">
            <h2>What Are Store1920 Coins?</h2>
            <p>Earn loyalty coins on every purchase and interaction with Store1920. Redeem them for discounts on products and shipping.</p>
          </article>

          <article className="info-card">
            <h2>How You Earn Coins</h2>
            <ul>
              <li>🎉 100 coins bonus for new user registration</li>
              <li>🛒 5 coins for every 100 AED spent on eligible products</li>
              <li>🎁 Bonus coins during special promotions and campaigns</li>
            </ul>
          </article>

          <article className="info-card">
            <h2>How to Use Coins</h2>
            <ul>
              <li>💸 Redeem coins directly at checkout for discounts</li>
              <li>✅ Apply coins on product prices and shipping fees</li>
              <li>⏳ Coins never expire — use anytime</li>
            </ul>
          </article>

          <article className="info-card">
            <h2>Redeeming Coins in Your Orders</h2>
            <ul>
              <li>Minimum redemption: 10 coins (1 AED equivalent)</li>
              <li>Coins used cannot exceed your order total</li>
              <li>If your order is canceled or refunded, coins are credited back</li>
            </ul>
          </article>

          <article className="info-card">
            <h2>Security & Best Practices</h2>
            <ul>
              <li>🔐 Coins are securely tied to your account and non-transferable</li>
              <li>⚠️ Keep your login credentials safe</li>
              <li>✅ All coin transactions are tracked securely</li>
              <li>📩 Email notifications for coin earnings and redemptions</li>
            </ul>
          </article>

          <article className="info-card">
            <h2>Benefits of the Store1920 Coins Program</h2>
            <ul>
              <li>💰 Save more on every purchase with coin discounts</li>
              <li>🎊 Exclusive deals and promotions for coin holders</li>
              <li>🎉 Participate in special bonus campaigns and offers</li>
            </ul>
          </article>
        </section>

        <section className="coins-faq-section">
          <h2 className="coins-faq-title">Frequently Asked Questions</h2>
          <div className="coins-faq-list">
            {faqList.map(({ question, answer }, idx) => (
              <div key={idx} className="coins-faq-item">
                <button
                  className="coins-faq-question"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  {question}
                  <span className="coins-faq-icon">{openFaqIndex === idx ? '−' : '+'}</span>
                </button>
                <div className={`coins-faq-answer ${openFaqIndex === idx ? 'open' : ''}`}>
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
