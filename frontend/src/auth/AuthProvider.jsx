// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Local storage keys
const AUTH_KEY = 'insightflow_auth';
const USERS_KEY = 'insightflow_users';
const API_URL = process.env.REACT_APP_API_URL;

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
    const res = await fetch(`${API_URL}/auth/signup`, {
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
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Login failed");
    };

    const data = await res.json();
    setToken(data.access_token);
    setUser(data.user);
  };

  const signinWithToken = async (token) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = await res.json();
    setToken(token);
    setUser(user);
  };


  const signout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, loading, signup, signin, signinWithToken, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
