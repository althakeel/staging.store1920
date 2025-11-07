import React from 'react';
import { useCompare } from '../contexts/CompareContext';
import { useNavigate } from 'react-router-dom';
import { MdCompareArrows } from 'react-icons/md';

const CompareButton = ({ productId }) => {
  const { addToCompare } = useCompare();
  const navigate = useNavigate();

  const handleCompare = () => {
    addToCompare(productId);
    navigate('/compare');
  };

  return (
    <button
      onClick={handleCompare}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      title="Compare"
    >
      <MdCompareArrows size={22} color="#ff6600" />
    </button>
  );
};

export default CompareButton;
