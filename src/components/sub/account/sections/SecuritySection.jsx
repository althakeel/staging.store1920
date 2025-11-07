import React, { useEffect, useState } from 'react';
import '../../../../assets/styles/myaccount/SecuritySection.css';
import axios from 'axios';

const API_URL = 'https://db.store1920.com/wp-json/custom/v1/account/security';

const fallbackData = {
  googleLinked: false,
  facebookLinked: false,
  appleLinked: false,
};

const SecuritySection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL, { withCredentials: true })
      .then((res) => {
        if (res.data && typeof res.data === 'object') {
          setData(res.data);
        } else {
          setData(fallbackData);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setData(fallbackData);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="security-loading">Loading...</div>;

  return (
    <div className="security-section">
      <div className="security-header">
        <h3>Third-party accounts</h3>
        <p>Link your third-party accounts for faster and safer login.</p>
      </div>

      {error && <div className="security-error">⚠️ Unable to load linked accounts</div>}

      <div className="security-list">
        <div className="security-item">
          <span>Google</span>
          <button disabled={data.googleLinked}>
            {data.googleLinked ? 'Linked' : 'Link'}
          </button>
        </div>

        <div className="security-item">
          <span>Facebook</span>
          <button disabled={data.facebookLinked}>
            {data.facebookLinked ? 'Linked' : 'Link'}
          </button>
        </div>

        <div className="security-item">
          <span>Apple</span>
          <button disabled={data.appleLinked}>
            {data.appleLinked ? 'Linked' : 'Link'}
          </button>
        </div>

        <div className="security-footer">
          <a href="/account/signin-activity">Review sign in activity for this account</a>
          <a href="/account/delete">Delete your Store1920 account</a>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
