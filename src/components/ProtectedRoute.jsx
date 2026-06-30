import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { user } = useApp();
  
  // Check if user is logged in or token exists
  const token = localStorage.getItem('fuzzy_token');
  const isLoggedIn = user && user.isLoggedIn && (token || user.email);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
