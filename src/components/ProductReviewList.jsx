import React, { useEffect, useState } from "react";
import "../assets/styles/product-review-list.css";
import { getProductReviews, addProductReview } from "../api/woocommerce";

const ProductReviewList = ({ productId, user, onLogin }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await getProductReviews(productId);
        if (res) setReviews(res);
      } catch (e) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!user) {
      onLogin && onLogin();
      return;
    }

    if (!newReview.trim()) return;

    setSubmitting(true);
    try {
      await addProductReview(productId, {
        review: newReview,
        reviewer: user.name || "Anonymous",
        reviewer_email: user.email || "anonymous@example.com",
        rating: 5,
      });
      setNewReview("");

      // Refresh list
      const res = await getProductReviews(productId);
      if (res) setReviews(res);
    } catch {
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-review-list">
      <h3>Customer Reviews ({reviews.length})</h3>
      {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}
      <ul>
        {reviews.map((rev) => (
          <li key={rev.id} className="review-item">
            <strong>{rev.reviewer || "Anonymous"}</strong> –{" "}
            <span>{rev.date_created?.split("T")[0]}</span>
            <p>{rev.review}</p>
          </li>
        ))}
      </ul>

      <div className="review-form">
        <h4>Add Your Review</h4>
        <textarea
          rows="4"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
          disabled={submitting}
        />
        <button
          onClick={handleSubmitReview}
          disabled={submitting || !newReview.trim()}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ProductReviewList;
