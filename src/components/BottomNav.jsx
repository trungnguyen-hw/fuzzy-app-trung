import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="navbar-menu">
      <ul>
        <li className={path === '/' || path === '/landing' ? 'active' : ''}>
          <Link to="/">
            <div className="icon">
              <img className="unactive" src="/assets/images/svg/home.svg" alt="home" />
              <img className="active" src="/assets/images/svg/home-fill.svg" alt="home" />
            </div>
          </Link>
        </li>
        <li className={path === '/categories' ? 'active' : ''}>
          <Link to="/categories">
            <div className="icon">
              <img className="unactive" src="/assets/images/svg/categories.svg" alt="categories" />
              <img className="active" src="/assets/images/svg/categories-fill.svg" alt="categories" />
            </div>
          </Link>
        </li>
        <li className={path === '/cart' ? 'active' : ''}>
          <Link to="/cart">
            <div className="icon">
              <img className="unactive" src="/assets/images/svg/bag.svg" alt="bag" />
              <img className="active" src="/assets/images/svg/bag-fill.svg" alt="bag" />
            </div>
          </Link>
        </li>
        <li className={path === '/wishlist' ? 'active' : ''}>
          <Link to="/wishlist">
            <div className="icon">
              <img className="unactive" src="/assets/images/svg/heart.svg" alt="heart" />
              <img className="active" src="/assets/images/svg/heart-fill.svg" alt="heart" />
            </div>
          </Link>
        </li>
        <li className={path === '/profile' ? 'active' : ''}>
          <Link to="/profile">
            <div className="icon">
              <img className="unactive" src="/assets/images/svg/profile.svg" alt="profile" />
              <img className="active" src="/assets/images/svg/profile-fill.svg" alt="profile" />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
