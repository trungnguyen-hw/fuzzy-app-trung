import React from 'react';
import Iconsax from '../Iconsax';
import { useApp } from '../../context/AppContext';

export default function AdminHeader({ title, toggleSidebar }) {
  const { user } = useApp();

  return (
    <header className="admin-header">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light d-lg-none p-2 rounded-circle" onClick={toggleSidebar}>
          <Iconsax icon="menu-hamburger" />
        </button>
        <h4 className="fw-bold m-0 text-dark">{title || 'Dashboard'}</h4>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="search-box d-none d-md-block position-relative" style={{ width: '250px' }}>
          <input type="text" className="form-control rounded-pill ps-4 bg-light border-0" placeholder="Search..." />
        </div>

        <div className="position-relative cursor-pointer">
          <Iconsax icon="notification" className="fs-4 text-secondary" />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </div>

        <div className="d-flex align-items-center gap-2 ps-3 border-start">
          <img 
            src={user.avatar || "/assets/images/icons/profile.png"} 
            alt="admin avatar" 
            className="rounded-circle border" 
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
          <div className="d-none d-sm-block">
            <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '14px' }}>{user.name || 'System Admin'}</h6>
            <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '11px' }}>{user.role || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
