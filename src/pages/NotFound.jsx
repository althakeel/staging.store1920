import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/NotFound.css'; // Optional CSS styling

export default function NotFound() {
  return (
    <div className="notFoundPage">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="backHomeLink">← Go back to homepage</Link>
    </div>
  );
}
