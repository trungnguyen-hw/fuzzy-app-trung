import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('layout_version') === 'dark');
  const [isRtl, setIsRtl] = useState(() => localStorage.getItem('dir') === 'rtl');

  useEffect(() => {
    const bodyDom = document.body;
    if (isDark) {
      bodyDom.classList.add('dark');
      localStorage.setItem('layout_version', 'dark');
    } else {
      bodyDom.classList.remove('dark');
      localStorage.removeItem('layout_version');
    }
  }, [isDark]);

  useEffect(() => {
    const htmlDom = document.documentElement;
    const rtlLink = document.getElementById('rtl-link');
    if (isRtl) {
      htmlDom.setAttribute('dir', 'rtl');
      if (rtlLink) rtlLink.href = '/assets/css/vendors/bootstrap.rtl.min.css';
      localStorage.setItem('rtlcss', '/assets/css/vendors/bootstrap.rtl.min.css');
      localStorage.setItem('dir', 'rtl');
    } else {
      htmlDom.setAttribute('dir', 'ltr');
      if (rtlLink) rtlLink.href = '/assets/css/vendors/bootstrap.min.css';
      localStorage.setItem('rtlcss', '/assets/css/vendors/bootstrap.min.css');
      localStorage.setItem('dir', 'ltr');
    }
  }, [isRtl]);

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById('offcanvasLeft');
    if (offcanvasEl) {
      if (window.bootstrap && window.bootstrap.Offcanvas) {
        const instance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (instance) instance.hide();
      }
      offcanvasEl.classList.remove('show');
    }
    const backdrops = document.querySelectorAll('.offcanvas-backdrop');
    backdrops.forEach(b => b.remove());
    document.body.classList.remove('offcanvas-backdrop');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const handleNav = (path, action) => (e) => {
    e.preventDefault();
    closeOffcanvas();
    if (action) action();
    navigate(path);
  };

  return (
    <div className="offcanvas sidebar-offcanvas offcanvas-start" tabIndex="-1" id="offcanvasLeft">
      <div className="offcanvas-header">
        <img className="img-fluid profile-pic" src="/assets/images/icons/profile.png" alt="profile" />
        <h4>Hello, {user.name || 'Agasya!'}</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" onClick={closeOffcanvas}></button>
      </div>
      <div className="offcanvas-body">
        <div className="sidebar-content">
          <ul className="link-section">
            <li>
              <div className="pages">
                <h4>RTL</h4>
                <div className="switch-btn">
                  <input
                    id="dir-switch"
                    type="checkbox"
                    checked={isRtl}
                    onChange={(e) => setIsRtl(e.target.checked)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="pages">
                <h4>Dark</h4>
                <div className="switch-btn">
                  <input
                    id="dark-switch"
                    type="checkbox"
                    checked={isDark}
                    onChange={(e) => setIsDark(e.target.checked)}
                  />
                </div>
              </div>
            </li>

            <li>
              <a href="/categories" className="pages" onClick={handleNav('/categories')}>
                <h4>Categories</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>

            <li>
              <a href="/cart" className="pages" onClick={handleNav('/cart')}>
                <h4>My Cart</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>

            <li>
              <a href="/wishlist" className="pages" onClick={handleNav('/wishlist')}>
                <h4>My Wishlist</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>

            <li>
              <a href="/profile" className="pages" onClick={handleNav('/profile')}>
                <h4>Profile</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>

            <li>
              <a href="/admin" className="pages" onClick={handleNav('/admin')}>
                <h4>Admin</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>

            <li>
              <a href="/login" className="pages" onClick={handleNav('/login', logout)}>
                <h4>Logout</h4>
                <i className="ri-arrow-drop-right-line"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
