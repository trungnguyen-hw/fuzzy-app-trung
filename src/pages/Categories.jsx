import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Iconsax from '../components/Iconsax';

export default function Categories() {
  useEffect(() => {
    if (window.init_iconsax) {
      window.init_iconsax();
    }
  }, []);

  const categoryItems = [
    { name: "Chairs", count: "Total 120 item available", img: "/assets/images/product/3.png", cls: "img-fluid img" },
    { name: "Tables", count: "Total 120 item available", img: "/assets/images/product/21.png", cls: "img-fluid categories img" },
    { name: "Sofas", count: "Total 120 item available", img: "/assets/images/product/11.png", cls: "img-fluid categories img" },
    { name: "Hanging chairs", count: "Total 120 item available", img: "/assets/images/product/22.png", cls: "img-fluid categories img" },
    { name: "Cabinets", count: "Total 120 item available", img: "/assets/images/product/23.png", cls: "img-fluid categories img" },
    { name: "Lamp", count: "Total 120 item available", img: "/assets/images/product/24.png", cls: "img-fluid categories img" },
    { name: "Cupboard", count: "Total 120 item available", img: "/assets/images/product/25.png", cls: "img-fluid categories img" },
  ];

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3>Categories</h3>
            <Link to="/profile" className="notification">
              <Iconsax className="notification-icon" icon="bell-2" />
            </Link>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* search section starts */}
      <section>
        <div className="custom-container">
          <form className="theme-form search-head" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <div className="form-input w-100">
                <input type="text" className="form-control search" id="inputusername" placeholder="Search here..." />
                <Iconsax className="search-icon" icon="search-normal-2" />
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* search section end */}

      {/* Categories section start */}
      <section>
        <div className="custom-container">
          <ul className="categories-list">
            {categoryItems.map((cat, index) => (
              <li key={index} className={index === 0 ? "mt-0" : ""}>
                <Link to="/" className="d-flex align-items-center">
                  <div className="ps-3">
                    <h2>{cat.name}</h2>
                    <h4 className="mt-1">{cat.count}</h4>
                    <div className="arrow">
                      <Iconsax className="right-arrow" icon="arrow-right" />
                    </div>
                  </div>
                  <div className="categories-img">
                    <img className={cat.cls} src={cat.img} alt={`p${index}`} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Categories section end */}

      {/* panel-space start */}
      <section className="panel-space"></section>
      {/* panel-space end */}

      {/* bottom navbar start */}
      <BottomNav />
    </>
  );
}
