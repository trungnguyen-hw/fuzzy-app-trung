import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Iconsax from '../Iconsax';
import { useApp } from '../../context/AppContext';

export default function AdminSidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'show' : ''}`}>
      <NavLink to="/admin" className="admin-sidebar-brand">
        <span className="admin-brand-icon" style={{ fontSize: '24px' }}>🛡️</span>
        <span className="admin-brand-text">Fuzzy Admin</span>
      </NavLink>

      <ul className="admin-sidebar-menu">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="category" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="box" />
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="element-3" />
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="shopping-bag" />
            <span>Orders</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="user" />
            <span>Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? 'active' : '')} onClick={toggleSidebar}>
            <Iconsax icon="setting-2" />
            <span>Settings</span>
          </NavLink>
        </li>

        <li style={{ marginTop: '30px' }} className="border-top border-secondary pt-3">
          <NavLink to="/" className="text-info" onClick={toggleSidebar}>
            <Iconsax icon="home" />
            <span>Back to App</span>
          </NavLink>
        </li>
        <li>
          <a href="#logout" onClick={handleLogout} className="text-danger">
            <Iconsax icon="logout" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
