import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import '../../styles/admin.css';

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Add admin-mode class to body to unconstrain mobile max-width: 600px
    document.body.classList.add('admin-mode');

    // Clean up any remaining offcanvas backdrop from mobile app
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    backdrops.forEach(b => b.remove());
    document.body.classList.remove('offcanvas-backdrop');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="admin-main">
        <AdminHeader title={title} toggleSidebar={toggleSidebar} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
