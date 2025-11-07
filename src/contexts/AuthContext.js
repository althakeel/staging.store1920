// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    return id && email && token ? { id, email, token } : null;
  });

  const [loading, setLoading] = useState(true);

  // Sync user across tabs
  useEffect(() => {
    const syncUser = () => {
      const id = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      setUser(id && email && token ? { id, email, token } : null);
    };

    // Run once on mount
    syncUser();
    setLoading(false);

    // Listen for changes from other tabs
    const handleStorageChange = (e) => {
      if (["userId", "email", "token"].includes(e.key)) {
        syncUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("token", user.token);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    // 🔑 Important: force storage event so other tabs update immediately
    localStorage.setItem("loginEvent", Date.now());
  };

const logout = () => {
  setUser(null);
  // Remove persisted user info
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  // Trigger logout event for other tabs
  localStorage.setItem("logoutEvent", Date.now());
};

  // Also listen for custom login/logout events
  useEffect(() => {
    const syncEvents = (e) => {
      if (e.key === "loginEvent" || e.key === "logoutEvent") {
        const id = localStorage.getItem("userId");
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");
        setUser(id && email && token ? { id, email, token } : null);
      }
    };
    window.addEventListener("storage", syncEvents);
    return () => window.removeEventListener("storage", syncEvents);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
