import React from 'react';

const ShippingInfo = () => {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: '40px auto',
        padding: '0 10px',
        fontFamily: "'Montserrat', sans-serif",
        color: '#333',
        fontSize: 14,
        lineHeight: 1.5,
        minHeight:"50vh"
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: 30,
          fontWeight: 700,
          fontSize: 28,
        }}
      >
        Shipping Details - Store1920
      </h1>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: 40,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <tr>
            <th
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid #ddd',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Shipping Area
            </th>
            <th
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid #ddd',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Delivery Time
            </th>
            <th
              style={{
                padding: '10px 12px',
                borderBottom: '1px solid #ddd',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Shipping Cost
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              Within Dubai
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              1-2 Business Days
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              Free (Orders above AED 150), else AED 15
            </td>
          </tr>
          <tr style={{ backgroundColor: '#fafafa' }}>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              Within UAE (Outside Dubai)
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              2-4 Business Days
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              AED 25 flat rate
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              Fast Delivery (Within UAE)
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              Same Day or Next Day
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              AED 50
            </td>
          </tr>
          <tr style={{ backgroundColor: '#fafafa' }}>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              International Shipping - GCC Countries
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              3-6 Business Days
            </td>
            <td style={{ padding: '10px 12px', borderBottom: '1px solid #eee' }}>
              AED 70 flat rate
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 12px' }}>
              International Shipping - Other Countries
            </td>
            <td style={{ padding: '10px 12px' }}>
              5-10 Business Days
            </td>
            <td style={{ padding: '10px 12px' }}>
              Calculated at checkout
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: 15, lineHeight: 1.6 }}>
        <h2 style={{ marginBottom: 15, fontWeight: 600 }}>
          Detailed Shipping Information
        </h2>

        <p style={{ marginBottom: 12 }}>
          Store1920 offers reliable and fast shipping across Dubai and the entire UAE.
          Orders within Dubai are shipped quickly with free delivery on orders over AED 150.
        </p>

        <p style={{ marginBottom: 12 }}>
          For deliveries outside Dubai but within the UAE, expect your package within 2 to 4 business days. Fast delivery option is available within UAE for AED 50, guaranteeing same or next day delivery.
        </p>

        <p style={{ marginBottom: 12 }}>
          We also ship to GCC countries with delivery typically within 3 to 6 business days at a fixed rate of AED 70.
          For other international destinations, delivery takes between 5 to 10 business days, and shipping costs will be calculated during checkout based on weight and destination.
        </p>

        <p style={{ marginBottom: 12 }}>
          All orders are securely packaged, and you will receive tracking details once your order has shipped. Please allow some flexibility in delivery times due to holidays or customs processing.
        </p>

        <p style={{ marginBottom: 12 }}>
          For any inquiries or assistance with your order shipment, our customer support team is always ready to help.
        </p>
      </div>
    </div>
  );
};

export default ShippingInfo;
