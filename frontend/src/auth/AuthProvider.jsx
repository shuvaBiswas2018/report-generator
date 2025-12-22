// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Local storage keys
const AUTH_KEY = 'insightflow_auth';
const USERS_KEY = 'insightflow_users';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
    if (saved && saved.token && saved.user) {
      setToken(saved.token);
      setUser(saved.user);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [token, user]);

  const signup = async ({ name, email, password }) => {
  const res = await fetch("http://localhost:8000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) throw new Error("Signup failed");

  const data = await res.json();
  setToken(data.access_token);
  setUser(data.user);
};

  const signin = async ({ email, password }) => {
  const res = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  setToken(data.access_token);
  setUser(data.user);
};

  const signout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, loading, signup, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
