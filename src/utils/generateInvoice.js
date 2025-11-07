import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import LogoIcon from '../assets/images/logo.webp';

export const generateInvoicePDF = async (order) => {
  const doc = new jsPDF('p', 'pt', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  const paymentStatus = order.status === 'completed' ? 'Paid' : 'Not Paid';

  const invoiceElement = document.createElement('div');
  invoiceElement.style.width = '800px';
  invoiceElement.style.padding = '30px';
  invoiceElement.style.fontFamily = 'Montserrat, sans-serif';
  invoiceElement.style.background = '#fff';
  invoiceElement.style.color = '#333';
  invoiceElement.style.fontSize = '14px';
  invoiceElement.style.lineHeight = '1.4';

  invoiceElement.innerHTML = `
    <!-- Header: Logo Left, Seller Right -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
      <div>
        <img src="${LogoIcon}" style="max-width:80px;" />
      </div>
      <div style="text-align:right; font-size:14px; color:#555;">
        <strong>Seller:</strong> Your Store Name<br/>
        DIFC - Dubai, UAE<br/>
        Phone: +971 50 409 6028<br/>
        Email: support@store1920.com
      </div>
    </div>

    <!-- Invoice Title -->
    <h1 style="text-align:center; font-size:24px; color:#FF8C00; margin-bottom:20px;">Invoice</h1>

    <!-- Order Info -->
    <div style="margin-bottom:20px;">
      <strong>Order ID:</strong> PO-${order.id}<br/>
      <strong>Date & Time:</strong> ${new Date(order.date_created).toLocaleString()}<br/>
      <strong>Payment Method:</strong> ${order.payment_method_title || order.payment_method}<br/>
      <strong>Payment Status:</strong> ${paymentStatus}<br/>
      <strong>Email:</strong> ${order.billing.email}
    </div>

    <!-- Addresses -->
    <div style="display:flex; justify-content:space-between; margin-bottom:25px;">
      <div style="width:48%;">
        <h3 style="margin-bottom:5px; color:#FF8C00;">Shipping Address</h3>
        <p style="margin:0;">
          ${order.shipping.first_name} ${order.shipping.last_name}<br/>
          ${order.shipping.address_1}<br/>
          ${order.shipping.address_2 || ''}<br/>
          ${order.shipping.city}, ${order.shipping.state} ${order.shipping.postcode}<br/>
          ${order.shipping.country}<br/>
          Phone: ${order.shipping.phone}
        </p>
      </div>
      <div style="width:48%;">
        <h3 style="margin-bottom:5px; color:#FF8C00;">Billing Address</h3>
        <p style="margin:0;">
          ${order.billing.first_name} ${order.billing.last_name}<br/>
          ${order.billing.address_1}<br/>
          ${order.billing.address_2 || ''}<br/>
          ${order.billing.city}, ${order.billing.state} ${order.billing.postcode}<br/>
          ${order.billing.country}<br/>
          Phone: ${order.billing.phone}
        </p>
      </div>
    </div>

    <!-- Product Table -->
    <table style="width:100%; border-collapse: collapse; font-size:14px;">
      <thead style="background:#FF8C00; color:#fff;">
        <tr>
          <th style="padding:10px; border:1px solid #ccc;">Product</th>
          <th style="padding:10px; border:1px solid #ccc;">Qty</th>
          <th style="padding:10px; border:1px solid #ccc;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${order.line_items.map((item, index) => `
          <tr style="background:${index % 2 === 0 ? '#f9f9f9' : '#fff'}">
            <td style="border:1px solid #ccc; padding:8px;">${item.name}</td>
            <td style="border:1px solid #ccc; padding:8px;">${item.quantity}</td>
            <td style="border:1px solid #ccc; padding:8px;">${order.currency} ${item.price}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Total -->
    <div style="margin-top:20px; text-align:right; font-size:16px; font-weight:bold;">
      Total: ${order.currency} ${order.total}
    </div>

    <!-- Footer -->
    <div style="margin-top:40px; text-align:center; font-size:14px; color:#555;">
      Thank you for shopping with us! We hope you enjoy your purchase. 🌟
    </div>
  `;

  document.body.appendChild(invoiceElement);

  const canvas = await html2canvas(invoiceElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  const imgProps = doc.getImageProperties(imgData);
  const pdfWidth = pageWidth - 40;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  doc.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
  doc.save(`Invoice_PO-${order.id}.pdf`);

  document.body.removeChild(invoiceElement);
};
