import React, { useState, useRef } from 'react';
import SignInModal from '../sub/SignInModal';
import '../../assets/styles/ProductReviewList.css';
import  { getProductReviewsWoo } from '../../data/wooReviews'

// Star rating component
const ReviewStars = ({ rating, onRate }) => (
  <div className="stars" role="radiogroup" aria-label="Rating">
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        role={onRate ? 'radio' : undefined}
        aria-checked={i === rating}
        tabIndex={onRate ? 0 : -1}
        className={i <= rating ? 'star filled' : 'star'}
        onClick={() => onRate && onRate(i)}
        onKeyDown={e => {
          if (!onRate) return;
          if (e.key === 'Enter' || e.key === ' ') onRate(i);
        }}
        style={{ cursor: onRate ? 'pointer' : 'default' }}
        aria-label={`${i} Star${i > 1 ? 's' : ''}`}
      >
        ★
      </span>
    ))}
  </div>
);

function ReportAlertModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: 20
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'white', borderRadius: 12, maxWidth: 400, width: '100%',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)', padding: '30px 25px', textAlign: 'center'
      }}>
        <div style={{ fontSize: 48, color: '#e74c3c', marginBottom: 20 }} aria-hidden="true">&#9888;</div>
        <h2 style={{ marginBottom: 15, fontWeight: '700' }}>Product Reported</h2>
        <p style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 25 }}>This product has been reported. Our support team will contact you soon.</p>
        <button onClick={onClose} style={{
          padding: '10px 30px', backgroundColor: '#3498db', border: 'none',
          borderRadius: 6, color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: 16,
          transition: 'background-color 0.3s'
        }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#2980b9'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#3498db'}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function ProductReviewList({ reviews, setReviews, productId, user, onLogin }) {
  const [showAll, setShowAll] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [reportAlertOpen, setReportAlertOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const maskName = n => (!n || n.length <= 4 ? n : n.substring(0, 2) + '***' + n.slice(-2));

  const handleWriteReviewClick = () => {
    if (user && user.name) setShowReviewForm(true);
    else setSignInOpen(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!rating || !message.trim()) return;

    const newReview = {
      id: `${productId}-user-${Date.now()}`,
      reviewer: name || 'Anonymous',
      rating,
      review: message,
      created_at: new Date().toISOString(),
      image_url: null,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    setRating(0);
    setMessage('');
  };

  const onUserLogin = userData => {
    if (onLogin) onLogin(userData);
    setSignInOpen(false);
    setShowReviewForm(true);
    setName(userData.name || '');
  };

  function stripHtml(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }
  

  return (
    <div className="product-review-box">
      <div className="review-summary" aria-live="polite">
        <strong>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</strong> &nbsp;|&nbsp;
        <span>
          {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0).toFixed(1)}{' '}
          <ReviewStars rating={Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0)} />
        </span>
      </div>

      <div className="review-list">
        {visibleReviews.map(r => (
          <div key={r.id} className="review-item" tabIndex={0} aria-label={`Review by ${r.reviewer}`}>
            <div className="review-header">
              <div className="avatar" aria-hidden="true">{r.reviewer?.substring(0, 1).toUpperCase()}</div>
              <span className="review-user">{maskName(r.reviewer)}</span>
              <span className="review-date">{new Date(r.date || r.created_at).toLocaleDateString()}</span>
            </div>
            <ReviewStars rating={r.rating} />
            {r.image_url && <img src={r.image_url} alt="Review" className="review-image" />}
            <p className="review-text">
  {stripHtml(r.comment || r.review)}
</p>
            {/* <button className="report-btn" onClick={() => setReportAlertOpen(true)} type="button">Report</button> */}
          </div>
        ))}
      </div>

      {reviews.length > 3 && <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'See All Reviews'}</button>}

      {!showReviewForm && <button className="write-review-btn" onClick={handleWriteReviewClick}>Write a Review</button>}

      {showReviewForm && (
        <form ref={formRef} className="custom-product-review-form" onSubmit={handleSubmit}>
          <h3>Write a Review</h3>
          <label>Name:<input type="text" value={name} onChange={e => setName(e.target.value)} maxLength={50} placeholder="Your name" /></label>
          <label>Rating:<ReviewStars rating={rating} onRate={setRating} /></label>
          <label>Review Message:<textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={1000} placeholder="Write your review here" rows={5} /></label>
          <button type="submit">Submit Review</button>
        </form>
      )}

      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} onLogin={onUserLogin} />
      <ReportAlertModal isOpen={reportAlertOpen} onClose={() => setReportAlertOpen(false)} />
    </div>
  );
}
