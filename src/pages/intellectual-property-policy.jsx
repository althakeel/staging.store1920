import React from 'react';

const IntellectualPropertyPolicy = () => {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: '40px auto',
        padding: '0 10px',
        fontFamily: "'Montserrat', sans-serif",
        color: '#333',
        fontSize: 15,
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ textAlign: 'center', fontWeight: 700, marginBottom: 30 }}>
        Store1920 | Intellectual Property Policy
      </h1>

      <p style={{ marginBottom: 20, fontWeight: '600' }}>
        Last updated: July 18th, 2025
      </p>

      <p style={{ marginBottom: 20 }}>
        At Store1920, we respect and are committed to protecting intellectual property rights. This Intellectual Property Policy explains how we handle allegations of intellectual property infringement related to content on our website and mobile applications. It also outlines how rights owners can submit infringement reports and how affected parties can respond.
      </p>

      <p style={{ marginBottom: 20 }}>
        Intellectual property includes copyrights, trademarks, patents, and other rights recognized by law.
      </p>

      <h2 style={{ fontWeight: 600, marginBottom: 15 }}>1. Reporting Infringement</h2>

      <ol style={{ marginBottom: 20, paddingLeft: 20 }}>
        <li style={{ marginBottom: 10 }}>
          To submit an infringement notice, you must be the rights owner or an authorized agent acting on their behalf.
        </li>
        <li style={{ marginBottom: 10 }}>
          Upon receiving your report, we will promptly investigate the claim. Please ensure reports are made in good faith and sworn under penalty of perjury.
        </li>
        <li style={{ marginBottom: 10 }}>
          Notices must be submitted via our online Intellectual Property Infringement Portal, and include:
          <ul style={{ marginTop: 6, marginBottom: 10, paddingLeft: 20 }}>
            <li>Specific identification of the intellectual property involved (registration numbers, descriptions, links, etc.)</li>
            <li>Details on the nature of the infringement (product, packaging, images, or text)</li>
            <li>List of infringing products (product URLs)</li>
            <li>Information on the infringing parties</li>
            <li>Supporting documents or evidence (e.g., order IDs for test purchases)</li>
            <li>Your contact information (name, address, phone, email)</li>
            <li>Any additional information required by applicable laws</li>
          </ul>
        </li>
        <li style={{ marginBottom: 10 }}>
          We may request further information or verification before processing the report.
        </li>
        <li style={{ marginBottom: 10 }}>
          False or misleading reports can result in liability for damages. If unsure, please seek legal advice before submitting.
        </li>
        <li style={{ marginBottom: 10 }}>
          If accepted, infringing content will be removed and appropriate actions taken. We do not disclose details of actions beyond what is publicly available.
        </li>
        <li style={{ marginBottom: 10 }}>
          We enforce a repeat infringer policy and may terminate accounts that repeatedly violate intellectual property rights.
        </li>
      </ol>

      <h2 style={{ fontWeight: 600, marginBottom: 15 }}>
        2. Responding to an Infringement Claim
      </h2>

      <ol style={{ marginBottom: 20, paddingLeft: 20 }}>
        <li style={{ marginBottom: 10 }}>
          If you believe material removed or disabled in error is authorized, you may submit a counter-notification that includes:
          <ul style={{ marginTop: 6, marginBottom: 10, paddingLeft: 20 }}>
            <li>A statement explaining why you believe the removal was mistaken</li>
            <li>Supporting information or documents as required by law</li>
          </ul>
        </li>
        <li style={{ marginBottom: 10 }}>
          We will review such replies and act in accordance with applicable laws.
        </li>
      </ol>

      <h2 style={{ fontWeight: 600, marginBottom: 15 }}>
        3. Withdrawal of Report
      </h2>

      <p style={{ marginBottom: 20 }}>
        Rights owners or authorized agents may withdraw their infringement reports through the IP Portal by clearly identifying the original report and related details.
      </p>

      <h2 style={{ fontWeight: 600, marginBottom: 15 }}>
        4. False Notices
      </h2>

      <ol style={{ marginBottom: 20, paddingLeft: 20 }}>
        <li style={{ marginBottom: 10 }}>
          We may reject or take action against reports containing false, fraudulent, incomplete, or bad faith information.
        </li>
        <li style={{ marginBottom: 10 }}>
          Repeated submission of inaccurate or fake notices may lead to loss of submission privileges or other penalties.
        </li>
      </ol>

      <p style={{ fontSize: 13, color: '#666' }}>
        For questions or to submit an intellectual property infringement report, please visit our IP Portal or contact our support team.
      </p>
    </div>
  );
};

export default IntellectualPropertyPolicy;
