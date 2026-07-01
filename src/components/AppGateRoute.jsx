import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AppGateRoute() {
  const isUnlocked = localStorage.getItem('fuzzy_app_unlocked') === 'true';

  if (!isUnlocked) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
