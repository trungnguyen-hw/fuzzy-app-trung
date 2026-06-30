import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Iconsax from '../components/Iconsax';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  const productsList = [
    { id: 1, title: "Sheesham Wood Armchair", subtitle: "Chair", price: "$120.00", oldPrice: "$150.00", rating: 4.5, img: "/assets/images/product/1.png" },
    { id: 2, title: "Modern Velvet Sofa", subtitle: "Sofa", price: "$350.00", oldPrice: "$400.00", rating: 4.8, img: "/assets/images/product/2.png" },
    { id: 3, title: "Wooden Dining Table", subtitle: "Table", price: "$280.00", oldPrice: "$320.00", rating: 4.7, img: "/assets/images/product/3.png" },
    { id: 7, title: "Side Table", subtitle: "Table", price: "$50.00", oldPrice: "$80.00", rating: 4.3, img: "/assets/images/product/7.png" },
    { id: 11, title: "Lounge Chair", subtitle: "Chair", price: "$130.00", oldPrice: "$160.00", rating: 4.6, img: "/assets/images/product/11.png" },
    { id: 13, title: "Hanging Light", subtitle: "Lamp", price: "$30.00", oldPrice: "$60.00", rating: 4.9, img: "/assets/images/product/13.png" },
    { id: 18, title: "Shiny wooden Chair", subtitle: "Chair", price: "$130.00", oldPrice: "$160.00", rating: 4.4, img: "/assets/images/product/18.png" },
    { id: 19, title: "Bedroom Lamp", subtitle: "Lamp", price: "$30.00", oldPrice: "$60.00", rating: 4.7, img: "/assets/images/product/19.png" },
    { id: 20, title: "Marble Flower Vase", subtitle: "Decor", price: "$50.00", oldPrice: "$80.00", rating: 4.8, img: "/assets/images/product/20.png" }
  ];

  const filteredProducts = productsList.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>All Products</h3>
            <Link to="/cart">
              <Iconsax className="icons" icon="bag-2" />
            </Link>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* search section */}
      <section className="mt-3">
        <div className="custom-container">
          <div className="theme-form search-head">
            <div className="form-group">
              <div className="form-input w-100">
                <input 
                  type="text" 
                  className="form-control search" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Iconsax className="search-icon" icon="search-normal-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* products section */}
      <section className="section-b-space mt-3">
        <div className="custom-container">
          <div className="row g-3">
            {filteredProducts.map((p) => (
              <div key={p.id} className="col-6">
                <ProductCard 
                  id={p.id}
                  img={p.img}
                  title={p.title}
                  subtitle={p.subtitle}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  rating={p.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-space"></section>
      <BottomNav />
    </>
  );
}
