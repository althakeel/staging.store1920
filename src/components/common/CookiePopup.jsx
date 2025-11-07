import React, { useState, useEffect } from "react";

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem("cookiePopupClosed");
    const skipPopup = sessionStorage.getItem("skipCookiePopup");
    const now = new Date().getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (!skipPopup && (!lastClosed || now - parseInt(lastClosed) > oneDayInMs)) {
      setShowPopup(true);
    }
  }, []);

  const handleContinue = () => {
    setShowPopup(false);
    localStorage.setItem("cookiePopupClosed", new Date().getTime());
  };

  const handleClearCookies = () => {
    setShowPopup(false);
    sessionStorage.setItem("skipCookiePopup", "true");

    setTimeout(() => {
      const preservedKeys = [
        "userToken",
        "userId",
        "isLoggedIn",
        "lastClickedProduct",
        "categories",
      ];

      let preservedData = {};
      preservedKeys.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value !== null) preservedData[key] = value;
      });

      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      localStorage.clear();
      Object.keys(preservedData).forEach((key) => {
        localStorage.setItem(key, preservedData[key]);
      });

      window.location.reload();
    }, 100);
  };

  if (!showPopup) return null;

  return (
    <div className="cookie-popup-overlay">
      <div className="cookie-popup-blur"></div>
      <div className="cookie-popup-card">
        <h3 className="cookie-title">🍪 Cookie Preferences</h3>
        <p className="cookie-message">
          We use cookies to personalize your experience and analyze site traffic.
          You can choose to continue with cookies or clear them anytime.
        </p>

        <div className="cookie-buttons">
          <button className="btn-continue" onClick={handleContinue}>
            Accept & Continue
          </button>
          <button className="btn-clear" onClick={handleClearCookies}>
            Clear Cookies
          </button>
        </div>
      </div>

      <style>{`
        /* Overlay wrapper */
        .cookie-popup-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          z-index: 9999;
          overflow: hidden;
          animation: fadeIn 0.3s ease-in-out;
        }

        /* Dedicated blur layer (for better compatibility) */
        .cookie-popup-blur {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: -1;
        }

        /* Card box */
        .cookie-popup-card {
          position: relative;
          background: rgba(25, 25, 25, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px 18px 0 0;
          box-shadow: 0 -6px 25px rgba(0, 0, 0, 0.6);
          padding: 25px 22px;
          color: #fff;
          text-align: center;
          width: 100%;
          max-width: 500px;
          animation: slideUp 0.4s ease-out;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .cookie-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .cookie-message {
          font-size: 15px;
          line-height: 1.6;
          opacity: 0.85;
          margin-bottom: 20px;
        }

        .cookie-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-continue,
        .btn-clear {
          padding: 12px 22px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 160px;
          font-size: 15px;
        }

        .btn-continue {
          background: linear-gradient(90deg, #00c853, #4caf50);
          color: #fff;
          border: none;
        }
        .btn-continue:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .btn-clear {
          background: transparent;
          border: 2px solid #ff4d4d;
          color: #ff4d4d;
        }
        .btn-clear:hover {
          background: #ff4d4d;
          color: #fff;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 480px) {
          .cookie-popup-card {
            border-radius: 20px 20px 0 0;
            padding: 18px;
            width: 100%;
            bottom: 0;
            max-width: none;
          }
          .cookie-title {
            font-size: 1.2rem;
          }
          .cookie-message {
            font-size: 14px;
          }
          .btn-continue,
          .btn-clear {
            width: 100%;
            font-size: 14px;
            padding: 10px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CookiePopup;
