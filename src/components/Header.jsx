import Iconsax from './Iconsax';

export default function Header() {
  return (
    <header className="section-t-space">
      <div className="custom-container">
        <div className="header">
          <div className="head-content">
            <button className="sidebar-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft">
              <Iconsax className="menu-icon" icon="menu-hamburger" />
            </button>
            <div className="header-info">
              <img className="img-fluid profile-pic" src="/assets/images/icons/profile.png" alt="profile" />
              <div>
                <h4 className="light-text">Hello</h4>
                <h2 className="theme-color">Agasya!</h2>
              </div>
            </div>
          </div>
          <a href="notification.html" className="notification">
            <Iconsax className="notification-icon" icon="bell-2" />
          </a>
        </div>
      </div>
    </header>
  );
}
