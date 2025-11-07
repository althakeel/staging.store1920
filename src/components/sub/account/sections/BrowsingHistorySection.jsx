import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../../assets/styles/myaccount/browsingHistorySection.css';
import NoItemImage from '../../../../assets/images/noitem.png';

const API_BASE = 'https://db.store1920.com/wp-json/custom/v1';

const BrowsingHistorySection = ({ customerEmail }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerEmail) return;

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/history`, {
          params: { email: customerEmail },
        });

        if (Array.isArray(res.data)) {
          setHistory(res.data);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error('Error fetching browsing history:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [customerEmail]);

  return (
    <div className="browsing-history-container">
      <h2 className="history-title">Browsing History</h2>

      {loading ? (
        <p className="loading-text">Loading your history...</p>
      ) : history.length === 0 ? (
        <div className="empty-history-box">
          <img
            src={NoItemImage}
            alt="No items"
            className="no-item-img"
            onError={(e) =>
              (e.target.src = 'https://via.placeholder.com/180?text=No+Items')
            }
          />
          <p className="empty-history-text">No browsing history found.</p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item, index) => (
            <a
              className="history-card"
              href={item.product_link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="history-card-img"
                onError={(e) =>
                  (e.target.src =
                    'https://via.placeholder.com/160?text=No+Image')
                }
              />
              <div className="history-info">
                <h4>{item.title}</h4>
                <p className="view-date">
                  Viewed on {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsingHistorySection;
