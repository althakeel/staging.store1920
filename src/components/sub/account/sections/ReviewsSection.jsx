import React, { useEffect, useState } from 'react';
// import { getProductReviews } from '../../../../api/woocommerce'; // import from your helper
import '../../../../assets/styles/myaccount/reviewSection.css';

const ReviewSection = ({ customerEmail }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!customerEmail) {
        setLoading(false);
        return;
      }

      try {
        // Review fetching disabled
        setReviews([]);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [customerEmail]);

  if (loading) {
    return (
      <div className="review-loading">
        <p>Loading your reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews-box">
        <h3>You don’t have any reviews</h3>
        <p>You have no completed reviews or your reviews have been deleted.</p>
      </div>
    );
  }

  return (
    <div className="review-section">
      <h2>Your Product Reviews</h2>
      {reviews.map((review) => (
        <div className="review-card" key={review.id}>
          <h4>Product ID: {review.product_id}</h4>
          <p><strong>Rating:</strong> {review.rating} ⭐</p>
          <p><strong>Review:</strong> {review.review}</p>
          <p className="review-date">
            {new Date(review.date_created).toLocaleDateString()} at{' '}
            {new Date(review.date_created).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
