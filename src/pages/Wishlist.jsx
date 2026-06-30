import React from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/profile">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Wishlist</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* wishlist section start */}
      <section>
        <div className="custom-container">
          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <img src="/assets/images/gif/wishlist.gif" alt="empty wishlist" style={{ maxWidth: '150px' }} className="mb-3" />
              <h3>Your wishlist is empty</h3>
              <p className="light-text">Save items you like to view them later!</p>
              <Link to="/" className="btn theme-btn mt-3 px-4">Explore Products</Link>
            </div>
          ) : (
            <div className="row g-3">
              {wishlist.map((item) => (
                <div key={item.id} className="col-12">
                  <div className="horizontal-product-box">
                    <Link to="/" className="horizontal-product-img">
                      <img className="img-fluid img" src={item.image} alt={item.name} />
                    </Link>
                    <div className="horizontal-product-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4>{item.name}</h4>
                        <button className="close-button border-0 bg-transparent" onClick={() => removeFromWishlist(item.id)}>
                          <Iconsax icon="add" style={{ transform: 'rotate(45deg)', display: 'inline-block' }} />
                        </button>
                      </div>
                      <h5>Qty:1</h5>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="fw-semibold">
                            ${item.price.toFixed(2)}{' '}
                            {item.originalPrice && (
                              <del className="light-text fw-normal">
                                ${item.originalPrice.toFixed(2)}
                              </del>
                            )}
                          </h3>
                        </div>
                        <button 
                          className="cart-bag border-0 bg-transparent" 
                          onClick={() => addToCart({ ...item, qty: 1, color: 'Standard' })}
                        >
                          <Iconsax className="bag" icon="basket-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* wishlist section end */}

      {/* panel-space start */}
      <section className="panel-space"></section>
      {/* panel-space end */}

      <BottomNav />
    </>
  );
}
