import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQty, subtotal } = useApp();

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Cart</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* cart section start */}
      <section>
        <div className="custom-container">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <img src="/assets/images/gif/cart.gif" alt="empty cart" style={{ maxWidth: '150px' }} className="mb-3" />
              <h3>Your cart is empty</h3>
              <p className="light-text">Explore products and add them to your cart!</p>
              <Link to="/" className="btn theme-btn mt-3 px-4">Shop Now</Link>
            </div>
          ) : (
            <ul className="horizontal-product-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-product-box">
                  <div className="horizontal-product-box">
                    <div className="horizontal-product-img">
                      <Link to="/">
                        <img className="img-fluid img" src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="horizontal-product-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <Link to="/">
                          <h4>{item.name}</h4>
                        </Link>
                        <button 
                          type="button"
                          className="border-0 bg-transparent p-0 text-danger" 
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Iconsax className="trash" icon="trash" />
                        </button>
                      </div>
                      <ul className="product-info">
                        <li>Qty : {item.qty}</li>
                        <li>
                          <span className={`product-color ${item.color === 'Black' ? 'color2' : item.color === 'Brown' ? 'color3' : 'color1'}`}></span>
                          {item.color || 'Blue'}
                        </li>
                      </ul>

                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="fw-semibold">
                            ${(item.price).toFixed(0)}{' '}
                            {item.originalPrice && (
                              <del className="light-text fw-normal">
                                ${(item.originalPrice).toFixed(0)}
                              </del>
                            )}
                          </h3>
                        </div>
                        <div className="plus-minus">
                          <button type="button" className="sub plus-minus-button" onClick={() => updateCartQty(item.id, -1)}>
                            <Iconsax icon="minus" />
                          </button>
                          <input type="number" value={item.qty} readOnly min="1" max="10" />
                          <button type="button" className="add plus-minus-button" onClick={() => updateCartQty(item.id, 1)}>
                            <Iconsax icon="add" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      {/* cart section end */}

      {/* cart bottom start */}
      {cart.length > 0 && (
        <div className="pay-popup">
          <div className="price-items">
            <h6>Total price</h6>
            <h2>${subtotal.toFixed(2)}</h2>
          </div>
          <Link to="/checkout" className="btn btn-lg theme-btn pay-btn mt-0">
            Checkout
          </Link>
        </div>
      )}
      {/* cart bottom end */}

      {/* panel-space start */}
      <section className="panel-space"></section>
      {/* panel-space end */}
    </>
  );
}
