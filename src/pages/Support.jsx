import React, { useState } from 'react';
import '../assets/styles/SupportPage.css';
import {
  FaStar,
  FaShoppingCart,
  FaShippingFast,
  FaUndoAlt,
  FaBoxes,
  FaUserCog,
  FaCreditCard,
  FaShieldAlt,
  FaFileContract,
  FaLightbulb,
} from 'react-icons/fa';

import { FaPaperPlane } from 'react-icons/fa';



// Main topic components
import RecommendedTopics from '../components/sub/support/RecommendedTopics';
import ShippingDelivery from '../components/sub/support/ShippingDelivery';
import ReturnRefund from '../components/sub/support/ReturnRefund';
import ProductStock from '../components/sub/support/ProductStock';
import ManagingAccount from '../components/sub/support/ManagingAccount';
import PaymentPromos from '../components/sub/support/PaymentPromos';
import YourSecurity from '../components/sub/support/YourSecurity';
import PoliciesOthers from '../components/sub/support/PoliciesOthers';
import RequestItem from '../components/sub/support/RequestItem';

// Order issues
import BuyingOnTemu from '../components/sub/support/BuyingOnstore1920';
import Checkout from '../components/sub/support/Checkoutstore1920';
import FindMyOrder from '../components/sub/support/FindMyOrder';
import OrderChanges from '../components/sub/support/OrderChanges';
import Reviews from '../components/sub/support/Reviewsstore1920';

// Shipping & delivery
import TrackShipment from '../components/sub/support/TrackShipment';
import ShippingOptions from '../components/sub/support//ShippingOptions';
import DeliveryTimes from '../components/sub/support//DeliveryTimes';
import MissedDelivery from '../components/sub/support//MissedDelivery';
import CourierInfo from '../components/sub/support//CourierInfo';
import InternationalShipping from '../components/sub/support/InternationalShipping';

// Return & refund
import HowToReturn from '../components/sub/support/HowToReturn';
import RefundProcess from '../components/sub/support/RefundProcess';
import ReturnWindow from '../components/sub/support/ReturnWindow';
import DamagedItems from '../components/sub/support/DamagedItems';
import RefundDelay from '../components/sub/support/RefundDelay';
import ReturnShippingCost from '../components/sub/support/ReturnShippingCost';

// Product & stock
import OutOfStock from '../components/sub/support/OutOfStock';
import SizeChart from '../components/sub/support/SizeChart';
import ProductInfo from '../components/sub/support/ProductInfo';
import ColorOptions from '../components/sub/support/ColorOptions';
import RestockAlerts from '../components/sub/support/RestockAlerts';
import LimitedEdition from '../components/sub/support/LimitedEdition';

// Managing my account
import ChangeEmail from '../components/sub/support/ChangeEmail';
import ResetPassword from '../components/sub/support/ResetPassword';
import DeleteAccount from '../components/sub/support/DeleteAccount';
import TwoFactorAuth from '../components/sub/support/TwoFactorAuth';
import UpdateInfo from '../components/sub/support/UpdateInfo';
import LinkedAccounts from '../components/sub/support/LinkedAccounts';

// Payment & promos
import PaymentMethods from '../components/sub/support/PaymentMethods';
import AddCard from '../components/sub/support/AddCard';
import PromoCode from '../components/sub/support/PromoCode';
import FailedPayment from '../components/sub/support/FailedPayment';
import BillingInfo from '../components/sub/support/BillingInfo';
import Coupons from '../components/sub/support/Coupons';

// Your security
import PhishingScams from '../components/sub/support/PhishingScams';
import SmsScams from '../components/sub/support/SmsScams';
import DataProtection from '../components/sub/support/DataProtection';
import SafeAccess from '../components/sub/support/SafeAccess';
import TemuCertifications from '../components/sub/support/TemuCertifications';
import ReportIssues from '../components/sub/support/ReportIssues';

// Policies & others
import PrivacyPolicy from '../components/sub/support/PrivacyPolicy';
import TermsOfService from '../components/sub/support/TermsOfService';
import Cookies from '../components/sub/support/Cookies';
import UserAgreement from '../components/sub/support/UserAgreement';
import CommunityRules from '../components/sub/support/CommunityRules';
import Legal from '../components/sub/support/Legal';

// Request an item
import SuggestProduct from '../components/sub/support/SuggestProduct';
import RequestFeature from '../components/sub/support/RequestFeature';
import BulkOrder from '../components/sub/support/BulkOrder';
import CustomItems from '../components/sub/support/CustomItems';
import SupplierInfo from '../components/sub/support/SupplierInfo';
import WholesalePricing from '../components/sub/support/WholesalePricing';


const helpTopics = {
  'Recommended topics': [],
  'Order issues': ['Buying on Store1920', 'Checkout', 'Find my order', 'Order changes', 'Reviews'],
  'Shipping & delivery': ['Track shipment', 'Shipping options', 'Delivery times', 'Missed delivery', 'Courier info', 'International shipping'],
  'Return & refund': ['How to return', 'Refund process', 'Return window', 'Damaged items', 'Refund delay', 'Return shipping cost'],
  'Product & stock': ['Out of stock', 'Size chart', 'Product info', 'Color options', 'Restock alerts', 'Limited edition'],
  'Managing my account': ['Change email', 'Reset password', 'Delete account', 'Two-factor auth', 'Update info', 'Linked accounts'],
  'Payment & promos': ['Payment methods', 'Add card', 'Promo code', 'Failed payment', 'Billing info', 'Coupons'],
  'Your security': ['Phishing scams', 'SMS scams', 'Data protection', 'Safe access', 'Store1920 certifications', 'Report issues'],
  'Policies & others': ['Privacy policy', 'Terms of service', 'Cookies', 'User agreement', 'Community rules', 'Legal'],
  'Request an item': ['Suggest product', 'Request feature', 'Bulk order', 'Custom items', 'Supplier info', 'Wholesale pricing']
};

const topicIcons = {
  'Recommended topics': <FaStar />,
  'Order issues': <FaShoppingCart />,
  'Shipping & delivery': <FaShippingFast />,
  'Return & refund': <FaUndoAlt />,
  'Product & stock': <FaBoxes />,
  'Managing my account': <FaUserCog />,
  'Payment & promos': <FaCreditCard />,
  'Your security': <FaShieldAlt />,
  'Policies & others': <FaFileContract />,
  'Request an item': <FaLightbulb />
};


const subtopicComponents = {
  'Buying on Temu': <BuyingOnTemu />,
  'Checkout': <Checkout />,
  'Find my order': <FindMyOrder />,
  'Order changes': <OrderChanges />,
  'Reviews': <Reviews />,

  'Track shipment': <TrackShipment />,
  'Shipping options': <ShippingOptions />,
  'Delivery times': <DeliveryTimes />,
  'Missed delivery': <MissedDelivery />,
  'Courier info': <CourierInfo />,
  'International shipping': <InternationalShipping />,

  'How to return': <HowToReturn />,
  'Refund process': <RefundProcess />,
  'Return window': <ReturnWindow />,
  'Damaged items': <DamagedItems />,
  'Refund delay': <RefundDelay />,
  'Return shipping cost': <ReturnShippingCost />,

  'Out of stock': <OutOfStock />,
  'Size chart': <SizeChart />,
  'Product info': <ProductInfo />,
  'Color options': <ColorOptions />,
  'Restock alerts': <RestockAlerts />,
  'Limited edition': <LimitedEdition />,

  'Change email': <ChangeEmail />,
  'Reset password': <ResetPassword />,
  'Delete account': <DeleteAccount />,
  'Two-factor auth': <TwoFactorAuth />,
  'Update info': <UpdateInfo />,
  'Linked accounts': <LinkedAccounts />,

  'Payment methods': <PaymentMethods />,
  'Add card': <AddCard />,
  'Promo code': <PromoCode />,
  'Failed payment': <FailedPayment />,
  'Billing info': <BillingInfo />,
  'Coupons': <Coupons />,

  'Phishing scams': <PhishingScams />,
  'SMS scams': <SmsScams />,
  'Data protection': <DataProtection />,
  'Safe access': <SafeAccess />,
  'Temu certifications': <TemuCertifications />,
  'Report issues': <ReportIssues />,

  'Privacy policy': <PrivacyPolicy />,
  'Terms of service': <TermsOfService />,
  'Cookies': <Cookies />,
  'User agreement': <UserAgreement />,
  'Community rules': <CommunityRules />,
  'Legal': <Legal />,

  'Suggest product': <SuggestProduct />,
  'Request feature': <RequestFeature />,
  'Bulk order': <BulkOrder />,
  'Custom items': <CustomItems />,
  'Supplier info': <SupplierInfo />,
  'Wholesale pricing': <WholesalePricing />
};

const mainContentComponents = {
  'Recommended topics': <RecommendedTopics />,
  'Shipping & delivery': <ShippingDelivery />,
  'Return & refund': <ReturnRefund />,
  'Product & stock': <ProductStock />,
  'Managing my account': <ManagingAccount />,
  'Payment & promos': <PaymentPromos />,
  'Your security': <YourSecurity />,
  'Policies & others': <PoliciesOthers />,
  'Request an item': <RequestItem />
};

const Placeholder = ({ topic }) => (
  <div style={{ padding: '20px', fontStyle: 'italic', color: '#666' }}>
    Please select a subtopic from "{topic}".
  </div>
);

export default function SupportPage() {
  const [activeTopic, setActiveTopic] = useState('Recommended topics');
  const [activeSubTopic, setActiveSubTopic] = useState('');
  const [expandedTopic, setExpandedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMainClick = (topic) => {
    setActiveTopic(topic);
    setActiveSubTopic('');
    setExpandedTopic(expandedTopic === topic ? '' : topic);
    setSearchTerm('');
    setSidebarOpen(false); // close sidebar on mobile after selecting topic
  };

  // Flatten subtopics for searching
  const allSubtopics = Object.entries(helpTopics).flatMap(([topic, subs]) =>
    subs.length
      ? subs.map((sub) => ({ topic, name: sub }))
      : [{ topic, name: topic }]
  );

  // Filter search results
  const filteredItems = searchTerm.trim()
    ? allSubtopics.filter(({ topic, name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Same renderSearchResults, renderMainContent as before
  // ...

  const renderSearchResults = () => {
    if (!filteredItems.length) {
      return (
        <p style={{ padding: 20, color: '#666' }}>
          No results found for "{searchTerm}".
        </p>
      );
    }

    return filteredItems.map(({ name }, idx) => {
      if (subtopicComponents[name]) {
        return (
          <div
            key={idx}
            style={{
              marginBottom: '30px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '20px',
            }}
          >
            <h3 style={{ marginBottom: 10 }}>{name}</h3>
            {subtopicComponents[name]}
          </div>
        );
      }
      if (mainContentComponents[name]) {
        return (
          <div
            key={idx}
            style={{
              marginBottom: '30px',
              borderBottom: '1px solid #ddd',
              paddingBottom: '20px',
            }}
          >
            <h3 style={{ marginBottom: 10 }}>{name}</h3>
            {mainContentComponents[name]}
          </div>
        );
      }
      return (
        <div
          key={idx}
          style={{ marginBottom: '30px', padding: '20px', fontStyle: 'italic', color: '#666' }}
        >
          <h3>{name}</h3>
          <p>Content is not available yet.</p>
        </div>
      );
    });
  };

  const renderMainContent = () => {
    const subtopics = helpTopics[activeTopic];
    if (subtopics.length) {
      return activeSubTopic
        ? subtopicComponents[activeSubTopic] || (
            <div style={{ padding: '20px' }}>
              <h3>{activeSubTopic}</h3>
              <p>Answer to "{activeSubTopic}" will be added soon.</p>
            </div>
          )
        : (
          <div style={{ padding: '20px', fontStyle: 'italic', color: '#666' }}>
            Please select a subtopic from "{activeTopic}".
          </div>
        );
    }
    return mainContentComponents[activeTopic] || null;
  };

  return (
    <div className="support-wrapper">
      <header className="support-header">
        <div className="support-header-content" style={{position: 'relative'}}>
          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle-btn"
            aria-label="Toggle help topics menu"
            style={{
              fontSize: '24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none', // will show in CSS media query
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#007bff'
            }}
          >
            &#9776;
          </button>

          <h1 style={{ textAlign: 'center', margin: '0 auto' }}>Hi, how can we help you?</h1>
          <input
            type="text"
            placeholder="Have any questions? Ask them here!"
            className="support-search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveSubTopic('');
              setExpandedTopic('');
            }}
            style={{ maxWidth: 400, margin: '10px auto', display: 'block' }}
          />
        </div>
      </header>

      {searchTerm.trim() === '' ? (
        <div className="support-body">
          <aside
            className={`support-sidebar ${sidebarOpen ? 'open' : ''}`}
            style={{
              position: 'relative',
            }}
          >
            <h2>All help topics</h2>
            <ul>
              {Object.entries(helpTopics).map(([topic, subtopics]) => (
                <React.Fragment key={topic}>
                  <li
                    className={activeTopic === topic && !activeSubTopic ? 'active' : ''}
                    onClick={() => handleMainClick(topic)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}
                  >
                    <span style={{ fontSize: '18px', color: '#00000094' }}>{topicIcons[topic]}</span>
                    <span>{topic}</span>
                  </li>
                  {expandedTopic === topic && subtopics.length > 0 && (
                    <ul className="submenu">
                      {subtopics.map((sub) => (
                        <li
                          key={sub}
                          className={activeSubTopic === sub ? 'active' : ''}
                          onClick={() => {
                            setActiveTopic(topic);
                            setActiveSubTopic(sub);
                            setSidebarOpen(false); // close on mobile on selecting subtopic
                          }}
                          style={{ cursor: 'pointer', paddingLeft: 24 }}
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </aside>

          <main className="support-content" style={{ position: 'relative', paddingBottom: '80px' }}>
  {renderMainContent()}

{/* <button
  onClick={() => window.location.href = '/contact-us'}
  style={{
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffff',
    color: 'grey',
    border: '1px solid grey',
    padding: '12px 24px',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1,
    transition: 'all 0.3s ease'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#007bff';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.borderColor = '#007bff';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = '#ffffff';
    e.currentTarget.style.color = 'grey';
    e.currentTarget.style.borderColor = 'grey';
  }}
>
  <FaPaperPlane />
  Contact Us
</button> */}

</main>
        </div>
      ) : (
        <div
          className="search-results-container"
          style={{
            padding: 20,
            backgroundColor: '#f9f9f9',
            borderRadius: 6,
            maxWidth: 1000,
            margin: '20px auto',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <button
            onClick={() => setSearchTerm('')}
            style={{
              marginBottom: 20,
              padding: '8px 16px',
              backgroundColor: '#ff7300ff',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
            }}
            aria-label="Back to topics"
          >
            ← Back to topics
          </button>

          {renderSearchResults()}
    
        </div>
      )}

      {/* Add mobile sidebar overlay to close sidebar if open */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 10,
            cursor: 'pointer',
          }}
        />
      )}

      <style>{`
        /* Sidebar toggle button visible on mobile */
        @media (max-width: 767px) {
          .sidebar-toggle-btn {
            display: block !important;
          }

          .support-sidebar {
            position: fixed;
            top: 60px; /* header height */
            left: 0;
            width: 280px;
            height: calc(100% - 60px);
            background: #fff;
            box-shadow: 2px 0 5px rgba(0,0,0,0.15);
            overflow-y: auto;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 20;
          }
          .support-sidebar.open {
            transform: translateX(0);
          }

          .support-body {
            flex-direction: column;
          }

          .support-content {
            padding: 20px;
            margin-top: 60px;
          }
        }

        /* Sidebar styles */
        .support-sidebar ul {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }

        .support-sidebar li {
          padding: 10px 16px;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }

        .support-sidebar li.active,
        .support-sidebar li:hover {
          background-color: #e6f0ff;
          color: #ff7300ff;
        }

        .submenu {
          list-style: none;
          padding-left: 16px;
          margin-top: 4px;
        }

        .submenu li {
          padding: 6px 16px;
          border-radius: 4px;
        }

        .submenu li.active,
        .submenu li:hover {
          background-color: #cce0ff;
          color: #ff7300ff;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}