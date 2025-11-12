import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { themes } from '../theme/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultThemeId = 1;

  // Initialize theme from localStorage or default to theme 6
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    const savedThemeId = localStorage.getItem('currentThemeId');
    if (savedThemeId) {
      const parsedValue = parseInt(savedThemeId, 10);
      if (!Number.isNaN(parsedValue) && themes[parsedValue]) {
        return parsedValue;
      }
    }
  // Default to theme 1 on first load
    return defaultThemeId;
  });

  const currentTheme = themes[currentThemeId];

  // Change theme immediately when website is reopened after being closed for more than 30 seconds
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Mark that the page is being closed
      localStorage.setItem('pageClosed', Date.now().toString());
    };

    const handleLoad = () => {
      // Check if the page was previously closed
      const pageClosedTime = localStorage.getItem('pageClosed');
      
      if (pageClosedTime) {
        const timeSinceClose = Date.now() - parseInt(pageClosedTime);
        
        // Clear the flag
        localStorage.removeItem('pageClosed');
        
        // Only trigger if the page was closed for more than 30 seconds
        if (timeSinceClose > 30 * 1000) {
          // Website reopened after being closed for more than 30 seconds - advance to the next theme
          const currentThemeFromStorage = parseInt(localStorage.getItem('currentThemeId'), 10) || defaultThemeId;
          const themeIds = Object.keys(themes)
            .map(Number)
            .sort((a, b) => a - b);

          if (themeIds.length <= 1) {
            setCurrentThemeId(defaultThemeId);
            localStorage.setItem('currentThemeId', defaultThemeId.toString());
          } else {
            const currentIndex = Math.max(0, themeIds.indexOf(currentThemeFromStorage));
            const nextThemeId = themeIds[(currentIndex + 1) % themeIds.length];

            setCurrentThemeId(nextThemeId);
            localStorage.setItem('currentThemeId', nextThemeId.toString());
          }
        }
        // If closed for less than 30 seconds, keep the same theme (do nothing)
      }
    };

    // Set up the event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [currentThemeId]); // Add currentThemeId to dependencies

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentThemeId, currentThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
