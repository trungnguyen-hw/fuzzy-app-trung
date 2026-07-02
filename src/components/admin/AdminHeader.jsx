import React from 'react';
import Iconsax from '../Iconsax';
import { useApp } from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

export default function AdminHeader({ title, toggleSidebar }) {
  const { user } = useApp();
  const location = useLocation();

  // Create simple breadcrumb labels based on route path
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/admin') return ['Admin', 'Dashboard'];
    if (path === '/admin/products') return ['Admin', 'Products'];
    if (path === '/admin/categories') return ['Admin', 'Categories'];
    if (path === '/admin/orders') return ['Admin', 'Orders'];
    if (path === '/admin/users') return ['Admin', 'Users'];
    if (path === '/admin/settings') return ['Admin', 'Settings'];
    return ['Admin'];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-toggle d-lg-none" onClick={toggleSidebar}>
          <Iconsax icon="menu-hamburger" />
        </button>
        
        <div className="admin-header-title-wrapper">
          <nav className="admin-breadcrumb" aria-label="breadcrumb">
            <ol className="admin-breadcrumb-list">
              {breadcrumbs.map((crumb, idx) => (
                <li 
                  key={idx} 
                  className={`admin-breadcrumb-item ${idx === breadcrumbs.length - 1 ? 'active' : ''}`}
                >
                  {crumb}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="admin-header-title">{title || 'Dashboard'}</h1>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-search-wrapper d-none d-md-block">
          <span className="admin-search-icon">
            <Iconsax icon="search-normal-2" />
          </span>
          <input 
            type="text" 
            className="admin-search-input" 
            placeholder="Search dashboard..." 
          />
        </div>

        <button className="admin-notification-btn" aria-label="Notifications">
          <Iconsax icon="notification" />
          <span className="admin-notification-badge"></span>
        </button>

        <div className="admin-profile-dropdown">
          <img 
            src={user.avatar || "/assets/images/icons/profile.png"} 
            alt="admin avatar" 
            className="admin-profile-avatar"
          />
          <div className="admin-profile-info d-none d-sm-block">
            <h6 className="admin-profile-name">{user.name || 'System Admin'}</h6>
            <span className="admin-profile-role">{user.role || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
