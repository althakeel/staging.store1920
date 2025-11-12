import React, { createContext, useContext, useEffect, useState } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('compareList');
    if (stored) setCompareIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareIds));
  }, [compareIds]);

  const addToCompare = (id) => {
    if (compareIds.includes(id)) return;
    if (compareIds.length >= 5) {
      alert('You can only compare up to 5 products.');
      return;
    }
    setCompareIds([...compareIds, id]);
  };

  const removeFromCompare = (id) => {
    setCompareIds(compareIds.filter((pid) => pid !== id));
  };

  const clearCompare = () => setCompareIds([]);

  return (
    <CompareContext.Provider
      value={{ compareIds, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
