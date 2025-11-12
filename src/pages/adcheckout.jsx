import React from "react";

const CheckoutPage = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        padding: "20px",
      }}
    >
      {/* Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px", // space between left & right
          flexWrap: "wrap", // responsive stacking
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            maxWidth: "650px",
            minWidth: "300px",
          }}
        >
          <h3 style={{ fontSize: "16px", marginBottom: "15px" }}>
            Step 1/3 : Email or Phone
          </h3>

          <input type="text" placeholder="Email" style={inputStyle} />

          <div style={{ margin: "12px 0" }}>
            <label>
              <input type="checkbox" /> Send me live tracking and order updates
            </label>
          </div>

          <h3 style={{ fontSize: "16px", margin: "25px 0 15px" }}>Delivery</h3>

          <select style={inputStyle}>
            <option>United States</option>
          </select>

          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="First name"
              style={{ ...inputStyle, flex: 1 }}
            />
            <input
              type="text"
              placeholder="Last name"
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>

          <input type="text" placeholder="Address" style={inputStyle} />

          <input
            type="text"
            placeholder="Apartment, suite, etc (optional)"
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="City"
              style={{ ...inputStyle, flex: 1 }}
            />
            <select style={{ ...inputStyle, flex: 1 }}>
              <option>State</option>
            </select>
            <input
              type="text"
              placeholder="ZIP code"
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>

          <input type="text" placeholder="Phone (optional)" style={inputStyle} />

          <div style={{ margin: "12px 0" }}>
            <label>
              <input type="checkbox" /> Save this information for next time
            </label>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            width: "400px",
            padding: "25px",
            borderLeft: "1px solid #eee",
            minWidth: "300px",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>Order Summary</h3>

          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <img
                src="https://via.placeholder.com/60"
                alt="product"
                style={{
                  borderRadius: "8px",
                  marginRight: "15px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", margin: "0 0 2px" }}>
                  LUMINEX Red Light Therapy Wand
                </p>
                <p style={{ margin: "0 0 2px", fontSize: "12px" }}>Brown</p>
                <p style={{ margin: "0", fontSize: "12px" }}>
                  Bundle of 3 | $69.92
                </p>
              </div>
              <p style={{ marginLeft: "auto", fontWeight: "bold" }}>$177.75</p>
            </div>
          ))}

          <input type="text" placeholder="Discount code" style={inputStyle} />

          <button
            style={{
              ...paypalBtn,
              background: "#000",
              marginTop: "12px",
            }}
          >
            Apply
          </button>

          <div style={{ marginTop: "25px", fontSize: "15px" }}>
            <p>
              Subtotal: <b>$790.00</b>
            </p>
            <p>Shipping: Enter shipping address</p>
            <h3 style={{ margin: "15px 0" }}>
              Total: USD <b>$790.00</b>
            </h3>
            <p style={{ color: "green", fontWeight: "bold" }}>
              TOTAL SAVINGS $337.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px",
};

const paypalBtn = {
  background: "#ffc439",
  border: "none",
  padding: "12px",
  width: "100%",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
};

export default CheckoutPage;
