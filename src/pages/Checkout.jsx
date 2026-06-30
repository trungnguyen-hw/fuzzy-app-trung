import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQty, subtotal, shippingFee, grandTotal, addresses } = useApp();
  const defaultAddr = addresses ? (addresses.find(a => a.isDefault) || addresses[0]) : null;

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/cart">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Checkout</h3>
            <Link to="/wishlist">
              <Iconsax className="icons" icon="heart" />
            </Link>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* shipping address section start */}
      <section>
        <div className="custom-container">
          <div className="address-section">
            <h2>Shipping Address</h2>
            {defaultAddr ? (
              <Link to="/saved-addresses" className="shipping-address p-3 mt-3 text-decoration-none d-flex align-items-center">
                <div className="address-icon me-3">
                  <img className="icon" src="/assets/images/svg/location-white.svg" alt="location" />
                </div>
                <div className="address-details flex-grow-1">
                  <div className="d-block w-100">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h2 className="m-0">{defaultAddr.type}</h2>
                      <span className="badge bg-light text-dark border px-2 py-0" style={{ fontSize: '10px' }}>{defaultAddr.name}</span>
                    </div>
                    <h4 className="light-text fw-medium mb-1" style={{ fontSize: '13px' }}>{defaultAddr.details}</h4>
                    <h4 className="light-text fw-medium m-0" style={{ fontSize: '12px' }}>SĐT: {defaultAddr.phone}</h4>
                  </div>
                </div>
                <Iconsax icon="chevron-right" />
              </Link>
            ) : (
              <Link to="/saved-addresses" className="btn btn-outline-dashed w-100 p-3 mt-3 rounded-4 d-flex align-items-center justify-content-center gap-2 border">
                <Iconsax icon="add" />
                <span>Thêm địa chỉ giao hàng</span>
              </Link>
            )}
          </div>
        </div>
      </section>
      {/* shipping address section end */}

      {/* checkout section start */}
      <section>
        <div className="custom-container">
          {cart.length === 0 ? (
            <div className="text-center py-4">
              <p className="light-text">Your cart is empty.</p>
              <Link to="/" className="btn theme-btn btn-sm">Go Shopping</Link>
            </div>
          ) : (
            <ul className="horizontal-product-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-product-box">
                  <div className="horizontal-product-box">
                    <div className="horizontal-product-img">
                      <img className="img-fluid img" src={item.image} alt={item.name} />
                    </div>
                    <div className="horizontal-product-details">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4>{item.name}</h4>
                        <button type="button" className="border-0 bg-transparent p-0 text-danger" onClick={() => removeFromCart(item.id)}>
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
                            ${item.price.toFixed(0)}{' '}
                            {item.originalPrice && (
                              <del className="light-text fw-normal">
                                ${item.originalPrice.toFixed(0)}
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
      {/* checkout section end */}

      {/* shipping section start */}
      <section className="">
        <div className="custom-container">
          <div className="shipping-section">
            <h2>Choose Shipping</h2>
            <Link to="/shipping" className="shipping-type p-3 mt-3">
              <div className="d-flex align-items-center gap-2">
                <Iconsax className="icon" icon="truck-fast" />
                <h4>Choose Shipping Type</h4>
              </div>
              <Iconsax className="icon" icon="chevron-right" />
            </Link>
          </div>
        </div>
      </section>
      {/* shipping section end */}

      {/* coupon section start */}
      <section>
        <div className="custom-container">
          <div className="apply-coupon">
            <h2 className="theme-color">apply Coupon</h2>
            <div className="coupon-code">
              <div>
                <h6>#GOOGLE20</h6>
              </div>
              <Iconsax className="icon" icon="chevron-right" />
            </div>
          </div>
        </div>
      </section>
      {/* coupon section end */}

      {/* billing section start */}
      <section className="bill-details section-b-space">
        <div className="custom-container">
          <div className="total-detail">
            <div className="sub-total d-flex justify-content-between">
              <h5 className="light-text">Sub Total</h5>
              <h4 className="fw-medium">${subtotal.toFixed(0)}</h4>
            </div>
            <div className="sub-total mt-3 d-flex justify-content-between">
              <h5 className="light-text">Shipping charge</h5>
              <h4 className="fw-medium">${shippingFee.toFixed(2)}</h4>
            </div>
            <div className="sub-total mt-3 mb-3 d-flex justify-content-between">
              <h5 className="fw-medium light-text">Discount (10%)</h5>
              <h4 className="fw-medium">$0.00</h4>
            </div>
            <div className="grand-total pt-3 d-flex justify-content-between">
              <h5 className="fw-medium">Grand Total</h5>
              <h4 className="fw-semibold amount">${grandTotal.toFixed(0)}</h4>
            </div>
          </div>

          <button type="button" onClick={() => navigate('/payment')} className="btn theme-btn w-100 border-0">
            Continue to Payment
          </button>
        </div>
      </section>
      {/* billing section end */}
    </>
  );
}
