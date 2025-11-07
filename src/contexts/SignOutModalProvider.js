// src/contexts/SignOutModalContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import SignOutConfirmModal from '../components/sub/SignOutConfirmModal';

const SignOutModalContext = createContext();

export const useSignOutModal = () => useContext(SignOutModalContext);

export const SignOutModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmSignOut = async () => {
    try {
      await signOut(auth);
      closeModal();
      window.location.href = '/myaccount/login'; // Or navigate as you prefer
    } catch (error) {
      console.error('Failed to sign out', error);
      closeModal();
    }
  };

  return (
    <SignOutModalContext.Provider value={{ openModal }}>
      {children}
      <SignOutConfirmModal
        isOpen={isOpen}
        onConfirm={confirmSignOut}
        onCancel={closeModal}
      />
    </SignOutModalContext.Provider>
  );
};
