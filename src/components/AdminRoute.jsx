import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminRoute({ children }) {
  const { user } = useApp();
  const token = localStorage.getItem('token') || localStorage.getItem('fuzzy_token');

  const isLoggedIn = user && user.isLoggedIn && (token || user.email || user.username);
  const isAdmin = isLoggedIn && (user.role === 'admin' || user.email === 'trungngo1903' || user.username === 'trungngo1903' || token === 'mock_jwt_token_admin');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4 text-center">
        <div className="card border-0 shadow-lg rounded-4 p-5" style={{ maxWidth: '450px' }}>
          <h1 className="display-1 text-danger fw-bold">403</h1>
          <h3 className="fw-bold mb-3 text-dark">Truy cập bị từ chối</h3>
          <p className="text-secondary mb-4">
            Tài khoản của bạn (<strong>{user.email || user.username}</strong>) không có quyền truy cập vào Trang Quản Trị Admin. Vui lòng đăng nhập bằng tài khoản Admin!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">Trang chủ Client</Link>
            <Link to="/login" className="btn btn-primary rounded-pill px-4">Đăng nhập Admin</Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
