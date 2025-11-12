import React, { useState, useEffect } from 'react';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!identifier) {
      setError('Please enter your email or mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://db.store1920.com/wp-json/custom/v1/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Reset failed.');
      } else {
        setMessage('✅ If a matching account was found, a reset link has been sent.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles with responsiveness based on isMobile
 const containerStyle = {
  maxWidth: 1400,
  margin: '20px auto 40px',
  minHeight: '40vh',
  padding: isMobile ? 15 : 20,
  fontFamily: "'Montserrat', sans-serif",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
//   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
  borderRadius: 12,
  backgroundColor: '#fff',
};
  const cardStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? 25 : 40,
    background: '#fff',
    borderRadius: 12,
    // boxShadow: '0 6px 20px rgba(0,0,0,0.07)',
    padding: isMobile ? 25 : 40,
  };

  const leftStyle = {
    flex: '1',
    minWidth: 320,
  };

  const rightStyle = {
    flex: '1',
    minWidth: 320,
    color: '#444',
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.7,
    marginTop: isMobile ? 30 : 0,
  };

  const headingStyle = {
    fontSize: isMobile ? 22 : 26,
    marginBottom: 10,
    color: '#333',
  };

  const subHeadingStyle = {
    fontSize: isMobile ? 18 : 20,
    marginBottom: 15,
    color: '#222',
  };

  const paragraphStyle = {
    color: '#666',
    marginBottom: 25,
    fontSize: isMobile ? 14 : 16,
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: isMobile ? 14 : 16,
    marginBottom: 20,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const buttonStyle = {
    padding: 12,
    backgroundColor: loading ? '#555' : '#aa4d00ff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: isMobile ? 14 : 16,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const messageSuccessStyle = {
    marginTop: 15,
    fontSize: isMobile ? 14 : 15,
    color: 'green',
  };

  const messageErrorStyle = {
    marginTop: 15,
    fontSize: isMobile ? 14 : 15,
    color: 'red',
  };

  const listStyle = {
    paddingLeft: 20,
    marginBottom: 30,
  };

  const listItemStyle = {
    marginBottom: 10,
    position: 'relative',
    paddingLeft: 20,
    listStyle: 'none',
  };

  const bulletStyle = {
    position: 'absolute',
    left: 0,
    color: '#0073aa',
    fontWeight: 'bold',
  };

  const noteStyle = {
    borderLeft: '4px solid #0073aa',
    background: '#f5f8fa',
    padding: 15,
    borderRadius: 6,
  };

  const noteHeadingStyle = {
    marginBottom: 8,
    color: '#0073aa',
    fontSize: isMobile ? 16 : 18,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Left side - form */}
        <div style={leftStyle}>
          <h2 style={headingStyle}>Forgot Password 🔐</h2>
          <p style={paragraphStyle}>
            Enter your registered email or phone number. We'll send you a reset link.
          </p>

          <form onSubmit={handleReset} style={formStyle}>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or mobile number"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#0073aa')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
              disabled={loading}
            />
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {message && <p style={messageSuccessStyle}>{message}</p>}
          {error && <p style={messageErrorStyle}>{error}</p>}
        </div>

        {/* Right side - content */}
        <div style={rightStyle}>
          <h3 style={subHeadingStyle}>📋 Rules & Instructions</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              Make sure your email or mobile number is registered.
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              Reset links are valid for 1 hour.
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              Check spam/junk if you don’t receive the email.
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              For help, contact{' '}
              <a href="mailto:support@store1920.com" style={{ color: '#0073aa' }}>
                support@store1920.com
              </a>
            </li>
          </ul>

          <div style={noteStyle}>
            <h4 style={noteHeadingStyle}>Need further assistance?</h4>
            <p>
              You can always reach out to our support team for manual assistance with account recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
