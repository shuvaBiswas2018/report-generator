// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

// Local storage keys
const AUTH_KEY = 'insightflow_auth';
const USERS_KEY = 'insightflow_users';

// --- Fake API (demo only) ---
// Replace these with real API calls (axios/fetch) when ready.
function fakeApiSignup({ name, email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.email === email)) {
    return Promise.reject({ message: 'Email already registered' });
  }
  const user = { id: Date.now(), name, email, password };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return Promise.resolve({ token: 'fake-jwt-' + user.id, user: { id: user.id, name: user.name, email: user.email } });
}

function fakeApiLogin({ email, password }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return Promise.reject({ message: 'Invalid credentials' });
  return Promise.resolve({ token: 'fake-jwt-' + user.id, user: { id: user.id, name: user.name, email: user.email } });
}

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
    const res = await fakeApiSignup({ name, email, password });
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const signin = async ({ email, password }) => {
    const res = await fakeApiLogin({ email, password });
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const signout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, token, loading, signup, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
