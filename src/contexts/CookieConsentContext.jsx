import React, { createContext, useContext, useEffect, useState } from 'react';

const CookieConsentContext = createContext();

export const useCookieConsent = () => useContext(CookieConsentContext);

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(null);
  const [toggles, setToggles] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // On mount, load from localStorage
  useEffect(() => {
    const storedConsent = localStorage.getItem('store1920_cookie_consent');
    setConsent(storedConsent);

    const storedToggles = localStorage.getItem('store1920_cookie_toggles');
    if (storedToggles) setToggles(JSON.parse(storedToggles));
  }, []);

  const updateConsent = (newConsent, newToggles = toggles) => {
    if (newConsent === null) {
      localStorage.removeItem('store1920_cookie_consent');
      localStorage.removeItem('store1920_cookie_toggles');
      setConsent(null);
      setToggles({ essential: true, analytics: false, marketing: false });
    } else {
      localStorage.setItem('store1920_cookie_consent', newConsent);
      localStorage.setItem('store1920_cookie_toggles', JSON.stringify(newToggles));
      setConsent(newConsent);
      setToggles(newToggles);
    }
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        toggles,
        updateConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};
