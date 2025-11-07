import React, { useState, useEffect } from 'react';

const toggleSwitchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: 36,
  height: 20,
  userSelect: 'none',
};

const sliderStyle = (checked, disabled) => ({
  display: 'block', // <-- Important to make background visible
  position: 'relative',
  width: '36px',
  height: '20px',
  borderRadius: '20px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background 0.3s ease',
  background: disabled
    ? '#ccc'
    : checked
    ? 'linear-gradient(90deg, #4caf50 0%, #81c784 100%)'  // green gradient ON
    : 'linear-gradient(90deg, #fa3a00 0%, #ff7043 100%)',  // orange gradient OFF
  boxShadow: 'none',
  border: 'none',
});

const knobStyle = (checked, disabled) => ({
  position: 'absolute',
  top: '2px',
  left: checked ? '18px' : '2px',
  width: '16px',
  height: '16px',
  backgroundColor: disabled ? '#f5f5f5' : '#fff',
  borderRadius: '50%',
  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  transition: 'left 0.3s ease',
});

const inputStyle = {
  opacity: 0,
  width: 0,
  height: 0,
  position: 'absolute',
  margin: 0,
  padding: 0,
  border: 'none',
  outline: 'none',
};

const ToggleSwitch = ({ id, checked, disabled, onChange }) => (
  <label style={toggleSwitchStyle} htmlFor={id}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      style={inputStyle}
    />
    <span style={sliderStyle(checked, disabled)} />
    <span style={knobStyle(checked, disabled)} />
  </label>
);

const CookiesSettingsPage = () => {
  const [consent, setConsent] = useState(null);
  const [toggles, setToggles] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const enableAll = toggles.essential && toggles.analytics && toggles.marketing;

  useEffect(() => {
    const storedConsent = localStorage.getItem('store1920_cookie_consent');
    setConsent(storedConsent);

    const savedToggles = localStorage.getItem('store1920_cookie_toggles');
    if (savedToggles) setToggles(JSON.parse(savedToggles));
  }, []);

  const updateConsent = (value, updatedToggles = toggles) => {
    if (value === null) {
      localStorage.removeItem('store1920_cookie_consent');
      localStorage.removeItem('store1920_cookie_toggles');
      setConsent(null);
      setToggles({ essential: true, analytics: false, marketing: false });
    } else {
      localStorage.setItem('store1920_cookie_consent', value);
      localStorage.setItem('store1920_cookie_toggles', JSON.stringify(updatedToggles));
      setConsent(value);
      setToggles(updatedToggles);
    }
  };

  const toggleCategory = (category) => {
    if (category === 'essential') return; // essential always enabled

    setToggles((prev) => {
      const updated = { ...prev, [category]: !prev[category] };
      localStorage.setItem('store1920_cookie_toggles', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleEnableAll = () => {
    const newState = !enableAll;
    const updatedToggles = {
      essential: true,
      analytics: newState,
      marketing: newState,
    };
    localStorage.setItem('store1920_cookie_toggles', JSON.stringify(updatedToggles));
    setToggles(updatedToggles);
  };

  const containerStyle = {
    maxWidth: 600,
    margin: '60px auto',
    padding: '20px 15px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
    minWidth: '40ch',
    boxShadow: '0 4px 20px rgb(0 0 0 / 0.08)',
    borderRadius: 12,
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  };

  const infoTextStyle = {
    fontSize: 16,
    marginBottom: 35,
    color: '#444',
    maxWidth: '40ch',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const togglesContainerStyle = {
    marginBottom: 40,
    maxWidth: '100%',
    textAlign: 'left',
  };

  const toggleRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  };

  const labelStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  };

  const toggleLabelDesc = {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    maxWidth: 320,
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    flex: '1 1 140px',
    padding: '10px 0',
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 6,
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 8px rgb(0 0 0 / 0.12)',
    transition: 'background-color 0.3s ease',
    minWidth: 140,
  };

  const acceptBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#4caf50',
    color: 'white',
  };

  const rejectBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#e0e0e0',
    color: '#333',
  };

  const clearBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#f9f9f9',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Cookie Settings</h1>
      <p style={infoTextStyle}>
        Your current cookie preference:{' '}
        <b>{consent ? consent.charAt(0).toUpperCase() + consent.slice(1) : 'Not set'}</b>
      </p>

      <section style={togglesContainerStyle}>
        <div style={toggleRowStyle}>
          <div>
            <div style={labelStyle}>Enable All Cookies</div>
            <div style={toggleLabelDesc}>
              Enable all cookie categories for the best website experience.
            </div>
          </div>
          <ToggleSwitch
            id="enable-all"
            checked={enableAll}
            disabled={false}
            onChange={toggleEnableAll}
          />
        </div>

        <div style={toggleRowStyle}>
          <div>
            <div style={labelStyle}>Essential Cookies</div>
            <div style={toggleLabelDesc}>
              These cookies are necessary for the website to function and cannot be disabled.
            </div>
          </div>
          <ToggleSwitch id="essential" checked={true} disabled={true} onChange={() => {}} />
        </div>

        <div style={toggleRowStyle}>
          <div>
            <div style={labelStyle}>Analytics Cookies</div>
            <div style={toggleLabelDesc}>
              Help us understand how visitors interact with our site to improve user experience.
            </div>
          </div>
          <ToggleSwitch
            id="analytics"
            checked={toggles.analytics}
            disabled={false}
            onChange={() => toggleCategory('analytics')}
          />
        </div>

        <div style={toggleRowStyle}>
          <div>
            <div style={labelStyle}>Marketing Cookies</div>
            <div style={toggleLabelDesc}>
              Used to deliver personalized ads and measure advertising effectiveness.
            </div>
          </div>
          <ToggleSwitch
            id="marketing"
            checked={toggles.marketing}
            disabled={false}
            onChange={() => toggleCategory('marketing')}
          />
        </div>
      </section>

      <div style={buttonContainerStyle}>
        <button
          style={acceptBtnStyle}
          onClick={() => updateConsent('accepted', toggles)}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#388e3c')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4caf50')}
        >
          Accept Selected
        </button>
        <button
          style={rejectBtnStyle}
          onClick={() =>
            updateConsent('rejected', {
              essential: true,
              analytics: false,
              marketing: false,
            })
          }
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#bdbdbd')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
        >
          Reject All
        </button>
        <button
          style={clearBtnStyle}
          onClick={() => updateConsent(null)}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
        >
          Clear Preference
        </button>
      </div>
    </div>
  );
};

export default CookiesSettingsPage;
