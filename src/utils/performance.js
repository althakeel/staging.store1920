// Performance optimization utilities

// Debounce function for search and API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Lazy load images
export const lazyLoadImage = (src, placeholder = '/placeholder.jpg') => {
  const img = new Image();
  img.src = src;
  return img.complete ? src : placeholder;
};

// Remove console.logs in production
export const logger = {
  log: process.env.NODE_ENV === 'development' ? console.log : () => {},
  warn: process.env.NODE_ENV === 'development' ? console.warn : () => {},
  error: console.error, // Always show errors
};

// Memoization helper
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};