import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import SignInModal from "./sub/SignInModal";

const ProtectedRoute = ({ children }) => {
  const { user, loading, login } = useAuth();
  const [showModal, setShowModal] = useState(!user);

  if (loading) {
    return <div className="loading">Checking authentication...</div>;
  }

  if (!user && showModal) {
    return (
      <SignInModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}  // allow modal to close
        onLogin={(userData) => {
          login(userData); // set user
          setShowModal(false); // close modal
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
