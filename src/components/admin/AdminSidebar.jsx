import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Iconsax from '../Iconsax';
import { useApp } from '../../context/AppContext';

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'show' : ''}`}>
      <div className="admin-sidebar-brand-wrapper">
        <NavLink to="/admin" className="admin-sidebar-brand">
          <span className="admin-brand-icon">🛡️</span>
          <span className="admin-brand-text">Fuzzy Admin</span>
        </NavLink>
      </div>

      <ul className="admin-sidebar-menu">
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin" 
            end 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="category" />
            <span className="admin-sidebar-label">Dashboard</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="box" />
            <span className="admin-sidebar-label">Products</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin/categories" 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="element-3" />
            <span className="admin-sidebar-label">Categories</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="shopping-bag" />
            <span className="admin-sidebar-label">Orders</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="user" />
            <span className="admin-sidebar-label">Users</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => `admin-sidebar-link ${isActive ? 'active' : ''}`} 
            onClick={toggleSidebar}
          >
            <Iconsax icon="setting-2" />
            <span className="admin-sidebar-label">Settings</span>
          </NavLink>
        </li>
      </ul>

      <ul className="admin-sidebar-menu admin-sidebar-footer">
        <li className="admin-sidebar-item">
          <NavLink to="/" className="admin-sidebar-link admin-link-back" onClick={toggleSidebar}>
            <Iconsax icon="home" />
            <span className="admin-sidebar-label">Back to App</span>
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <a href="#logout" onClick={handleLogout} className="admin-sidebar-link admin-link-logout">
            <Iconsax icon="logout" />
            <span className="admin-sidebar-label">Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
