import React, { useState, useEffect } from "react";
import Image1 from "../../assets/images/homepopup/Popup1.jpg";
import Image2 from "../../assets/images/homepopup/RBG.png";
import Image3 from "../../assets/images/homepopup/WBG.png";
import mobileBg from '../../assets/images/homepopup/PopupBG.jpg'

const NewUserBonusPopup = () => {
  const [claimed, setClaimed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const discountCode = "WELCOME1920";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  /** Check if popup should be shown */
  useEffect(() => {
    const lastShownTime = localStorage.getItem('newUserBonusPopupLastShown');
    const popupShownThisSession = sessionStorage.getItem('popupShownThisSession');
    const currentTime = Date.now();
    const fiveMinutesInMs = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Don't show if already shown in this session
    if (popupShownThisSession === 'true') {
      return;
    }

    // If no record exists or 5 minutes have passed since last shown
    if (!lastShownTime || (currentTime - parseInt(lastShownTime)) >= fiveMinutesInMs) {
      // Show popup after 3 seconds delay
      const delayTimer = setTimeout(() => {
        setVisible(true);
        // Record the time when popup is shown
        localStorage.setItem('newUserBonusPopupLastShown', currentTime.toString());
        // Mark as shown in this session
        sessionStorage.setItem('popupShownThisSession', 'true');
      }, 3000);
      
      return () => clearTimeout(delayTimer);
    }
  }, []);

  /** Auto-close after 30s */
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 30000);
    return () => clearTimeout(timer);
  }, [visible]);

  /** Countdown after copy */
  useEffect(() => {
    if (!copied) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [copied]);

  /** Handlers */
  const handleOverlayClick = (e) => {
    if (e.target.id === "popup-overlay") {
      setVisible(false);
      // Update the timestamp when user closes the popup
      localStorage.setItem('newUserBonusPopupLastShown', Date.now().toString());
      // Mark as shown in this session
      sessionStorage.setItem('popupShownThisSession', 'true');
    }
  };

  const handleClose = () => {
    setVisible(false);
    // Update the timestamp when user closes the popup
    localStorage.setItem('newUserBonusPopupLastShown', Date.now().toString());
    // Mark as shown in this session
    sessionStorage.setItem('popupShownThisSession', 'true');
  };

  const handleClaim = () => setClaimed(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode).then(() => {
      setCopied(true);
      setCountdown(5); 
    });
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        id="popup-overlay"
        onClick={handleOverlayClick}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 9998,
          padding: "10px",
          animation: "fadeIn 0.4s ease",
        }}
      >
        {/* Popup */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "560px",
            minHeight: "500px",
            borderRadius: "16px",
            overflow: "hidden",
              backgroundImage: `url(${isMobile ? mobileBg : Image1})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            transform: "scale(0.9)",
            opacity: 0,
            animation: "popupIn 0.5s ease forwards",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0,0,0,0.3)",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              zIndex: 10,
            }}
          >
            ×
          </button>

          {/* Header */}
   {isMobile && (
  <div style={{ padding: "20px", marginTop: "3.5rem", zIndex: 3 }}>
    <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#333", margin: 0 }}>
     Welcome <br/> Discount!
    </h2>
    <p style={{ fontSize: "15px", color: "#555", marginTop: "4px", marginBottom: "18px" }}>
      Super savings on your first order!
    </p>
  </div>
)}


          {/* Offers Grid 1 */}
          <div
            style={{
              position: "absolute",
              bottom: "210px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundImage: `url(${Image3})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: 2,
              aspectRatio: "2.5 / 0.5",
            }}
          >
            {[
              { top: "10% OFF", bottom: "over AED 499" },
              { top: "AED 19 OFF", bottom: "over AED 199" },
            ].map((offer, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  borderRight: i % 2 === 0 ? "1px solid #eee" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "50px",
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#000" }}>{offer.top}</div>
                <div style={{ fontSize: "12px", color: "#333", marginTop: "2px" }}>{offer.bottom}</div>
              </div>
            ))}
          </div>

          {/* Offers Grid 2 */}
          <div
            style={{
              position: "absolute",
              bottom: "110px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundImage: `url(${Image3})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              zIndex: 2,
              aspectRatio: "2.5 / 0.5",
            }}
          >
            {[
              { top: "15% OFF", bottom: "over AED 299" },
              { top: "AED 50 OFF", bottom: "over AED 799" },
            ].map((offer, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  borderRight: i % 2 === 0 ? "1px solid #eee" : "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "50px",
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#000" }}>{offer.top}</div>
                <div style={{ fontSize: "12px", color: "#333", marginTop: "2px" }}>{offer.bottom}</div>
              </div>
            ))}
          </div>

          {/* Decorative Bottom */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: 0,
              width: "100%",
              height: "180px",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            <img src={Image2} alt="Decorative Bottom" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
          </div>

          {/* Claim / Code Section */}
          {!claimed ? (
            <button
              onClick={handleClaim}
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                minWidth: "75%",
                background: "linear-gradient(90deg, #ffdf61, #ffc107)",
                color: "#000",
                fontWeight: "700",
                fontSize: "20px",
                border: "none",
                borderRadius: "40px",
                padding: "14px 22px",
                cursor: "pointer",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                zIndex: 3,
              }}
            >
              Claim Now
            </button>
          ) : (
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "#fff",
                borderRadius: "30px",
                padding: "10px 20px",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
                zIndex: 3,
                gap: "10px",
              }}
            >
              <span style={{ fontWeight: "700", color: "#000", fontSize: "18px" }}>{discountCode}</span>
              <button
                onClick={handleCopy}
                style={{
                  background: "#ffdf61",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(8, 95, 27, 0.9)",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "24px",
            fontWeight: "700",
            textAlign: "center",
            zIndex: 10000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          Code Copied! Closing in {countdown}s
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes popupIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default NewUserBonusPopup;
