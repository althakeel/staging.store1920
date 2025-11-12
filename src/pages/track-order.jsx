import React, { useState } from "react";
import Truck from '../assets/images/common/truck.png'

const API_BASE = "https://db.store1920.com/wp-json/wc/v3";
const CONSUMER_KEY = "ck_b56a66f53d1cb273b66097e1347cdfc7a49a4834";
const CONSUMER_SECRET = "cs_2ef308464511bd90cc976fbc04d65458d7b37d2f";

const TrackDeepOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [truckPosition, setTruckPosition] = useState(0);
  const [showSchedule, setShowSchedule] = useState(false);
  const [requestedDate, setRequestedDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [source, setSource] = useState("");

  const trackingSteps = [
    "Order Confirmed",
    "Payment Processed",
    "Preparing Shipment",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
  ];

  const statusMapping = {
    order_confirmed: 0,
    payment_processed: 1,
    preparing_shipment: 2,
    picked_up: 3,
    in_transit: 4,
    out_for_delivery: 5,
    delivered: 6,
    pending: 0,
    processing: 2,
    shipped: 4,
    completed: 6,
  };

  const fetchOrder = async () => {
    if (!orderId.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setOrderDetails(null);
    setTruckPosition(0);
    setShowSchedule(false);
    setSuccessMsg("");
    setSource("");

    let fetched = false;

    // 1️⃣ Shipa API
    try {
      const shipaResp = await fetch(
        `https://sandbox-api.shipa.com/v2/delivery/shipments/${orderId}`,
        { headers: { Authorization: "Bearer seHQFtzbwC3XqR0eLVTyKc0j0ZjH0rbz" } }
      );
      if (shipaResp.ok) {
        const data = await shipaResp.json();
        setOrderDetails(data);
        setSource("shipa");
        const stepIndex = statusMapping[data.status] ?? 0;
        setTruckPosition(stepIndex);
        fetched = true;
      }
    } catch (err) {
      console.warn("Shipa fetch failed, trying WooCommerce...", err);
    }

    // 2️⃣ WooCommerce fallback
    if (!fetched) {
      try {
        const wpResp = await fetch(`${API_BASE}/orders?search=${orderId}`, {
          headers: { Authorization: `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}` },
        });
        if (!wpResp.ok) throw new Error("WooCommerce API error");
        const wpDataArr = await wpResp.json();
        if (!wpDataArr.length) throw new Error("Order not found");

        const wpData = wpDataArr[0];
        setOrderDetails(wpData);
        setSource("wordpress");
        const stepIndex = statusMapping[wpData.status] ?? 0;
        setTruckPosition(stepIndex);
      } catch (err) {
        setErrorMsg("Order not found in Shipa or WooCommerce.");
      }
    }
    setLoading(false);
  };

  const handleSchedule = () => {
    if (!requestedDate) {
      setErrorMsg("Please select a date first.");
      return;
    }
    setSuccessMsg(`✅ Delivery date request submitted for ${requestedDate}. Approval required.`);
    setRequestedDate("");
    setShowSchedule(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", padding: 20, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 800, background: "#fff", borderRadius: 16, padding: 25 }}>
        <h1 style={{ textAlign: "center", color: "#1976d2", marginBottom: 20 }}>🚚 Track & Schedule Your Order</h1>

        {/* Order Input */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ccc", marginBottom: 10, fontSize: 15 }}
          />
          <button
            onClick={fetchOrder}
            disabled={loading}
            style={{ width: "100%", padding: 12, background: "linear-gradient(90deg, #42a5f5, #1e88e5)", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Loading..." : "Track Order"}
          </button>
          {errorMsg && <p style={{ color: "red", marginTop: 10 }}>{errorMsg}</p>}
        </div>

        {orderDetails && (
          <>
            {/* Animated Tracking Road */}
            <div style={{ position: "relative", marginTop: 30, marginBottom: 30 }}>
              <div
                style={{
                  height: 12,
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "repeating-linear-gradient(to right, #ddd 0 10px, transparent 10px 20px)",
                  animation: "roadMove 1s linear infinite",
                }}
              ></div>

              {/* Truck */}
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  left: `calc(${(truckPosition / (trackingSteps.length - 1)) * 100}% - 16px)`,
                  fontSize: 32,
                  transform: "rotate(0deg)",
                  transition: "left 1.5s ease-in-out",
                }}
              >
               <img src={Truck} style={{width:"45px", height:"45px"}}/>
              </div>

              {/* Steps */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                {trackingSteps.map((step, idx) => {
                  const active = idx <= truckPosition;
                  const date = orderDetails.status_history?.[step.toLowerCase().replace(/ /g, "_")] || "";
                  return (
                    <div key={idx} style={{ textAlign: "center", width: `${100 / trackingSteps.length}%` }}>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          margin: "0 auto",
                          background: active ? "#1e88e5" : "#ccc",
                          marginBottom: 6,
                        }}
                      ></div>
                      <div style={{ fontSize: 11, color: active ? "#1e88e5" : "#888" }}>{step}</div>
                      {date && <div style={{ fontSize: 10, color: "#555" }}>{date}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details Table */}
            <div style={{ marginBottom: 30 }}>
              <h2 style={{ color: "#ff6d00", marginBottom: 15 }}>Order Details</h2>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>Product</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Qty</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.line_items.map((item) => (
                    <tr key={item.id}>
                      <td style={{ padding: 8 }}>{item.name}</td>
                      <td style={{ padding: 8, textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: 8, textAlign: "right" }}>AED {item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: 8, fontWeight: "bold" }}>Total</td>
                    <td></td>
                    <td style={{ padding: 8, textAlign: "right", fontWeight: "bold" }}>AED {orderDetails.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Schedule / Contact Buttons */}
            <div>
              {!showSchedule ? (
                <div>
                  <button onClick={() => setShowSchedule(true)} style={{ width: "100%", padding: 12, background: "linear-gradient(90deg, #ff8f00, #ff6d00)", color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: "bold", cursor: "pointer", marginBottom: 10 }}>Request / Schedule Delivery Date</button>
                  <button onClick={() => window.location.href = "mailto:support@store1920.com"} style={{ width: "100%", padding: 12, background: "linear-gradient(90deg, #757575, #424242)", color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>Contact Support</button>
                </div>
              ) : (
                <div style={{ marginTop: 10 }}>
                  <p style={{ marginBottom: 10, color: "#1976d2" }}>Select a requested delivery date (Approval required):</p>
                  <input type="date" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ccc", marginBottom: 15, fontSize: 15 }} />
                  <button onClick={handleSchedule} style={{ width: "100%", padding: 12, fontSize: 16, fontWeight: "bold", color: "#fff", background: "linear-gradient(90deg, #ff8f00, #ff6d00)", border: "none", borderRadius: 10, cursor: "pointer" }}>Submit Request</button>
                  {successMsg && <p style={{ color: "green", marginTop: 10 }}>{successMsg}</p>}
                </div>
              )}
            </div>
          </>
        )}
        <style>
          {`
            @keyframes roadMove {
              0% { background-position: 0 0; }
              100% { background-position: 20px 0; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default TrackDeepOrder;
