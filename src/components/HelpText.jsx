import React from 'react';

const HelpText = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        padding: "12px 16px",
        marginTop: "20px",
        borderRadius: "8px",
        fontSize: "12px",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        lineHeight: "1.5",
      }}
    >
      <p>
        Need assistance? Visit our{" "}
        <a
          href="/support"
          style={{
            color: "#007bff",
            textDecoration: "underline",
          }}
        >
          Help Center
        </a>{" "}
        {/* or{" "} */}
        {/* <a
          href="/contact-us"
          style={{
            color: "#007bff",
            textDecoration: "underline",
          }}
        >
          contact support
        </a> */}
        {/* . */}
      </p>
      <p>
         If there's an issue charging your selected payment method, we may use another valid method from your account. You can update your preferences on the payments page.
      </p>
      <p>
        When you click “Place Order”, we’ll confirm it by email. The purchase contract is only finalized after shipment.
      </p>
      <p>
        Returns accepted within 15 days if items are new and unopened. Exceptions apply. See our Returns Policy for details.
      </p>
      <p>
        Some electronics and auto parts include a limited warranty. View our Warranty Terms for more info.
      </p>

      <button
        type="button"
        onClick={() => window.history.back()}
        style={{
          marginTop: "10px",
          backgroundColor: "#ffffffff",
          color: "#000",
          border: "1px solid #ddd",
          padding: "5px 10px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default HelpText;
