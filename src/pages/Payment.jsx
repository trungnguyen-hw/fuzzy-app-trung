import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';

export default function Payment() {
  const navigate = useNavigate();
  const { grandTotal, selectedPayment, setSelectedPayment, createOrder } = useApp();
  const [showModal, setShowModal] = useState(false);

  const handlePayNow = async () => {
    await createOrder();
    setShowModal(true);
  };

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to="/checkout">
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Payment Method</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* payment method section start */}
      <section className="payment-method section-lg-b-space">
        <div className="custom-container">
          <h2 className="fw-semibold theme-color">Your Card</h2>

          <ul className="payment-list section-lg-b-space">
            <li className="cart-add-box payment-card-box gap-0 mt-3">
              <div className="payment-detail border-bottom-0">
                <label className="form-label" htmlFor="one">
                  <img className="img-fluid img" src="/assets/images/icons/svg/mastercard.svg" alt="mastercard" />
                  <span>
                    <span className="fw-normal theme-color card-heading">Mastercard *** *** 4589</span>
                    <span className="fw-normal card-sub-heading">Expires on 16/24</span>
                  </span>
                </label>
                <div className="form-check">
                  <input 
                    id="one" 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault" 
                    checked={selectedPayment === "Mastercard"}
                    onChange={() => setSelectedPayment("Mastercard")}
                  />
                </div>
              </div>
            </li>
            <li className="cart-add-box payment-card-box gap-0 mt-3">
              <div className="payment-detail border-bottom-0">
                <label className="form-label" htmlFor="two">
                  <img className="img-fluid img" src="/assets/images/icons/svg/visa.svg" alt="visa" />
                  <span>
                    <span className="fw-normal theme-color card-heading">Visa *** *** 4589</span>
                    <span className="fw-normal card-sub-heading">Expires on 16/24</span>
                  </span>
                </label>
                <div className="form-check">
                  <input 
                    id="two" 
                    className="form-check-input" 
                    type="radio" 
                    name="flexRadioDefault"
                    checked={selectedPayment === "Visa"}
                    onChange={() => setSelectedPayment("Visa")}
                  />
                </div>
              </div>
            </li>
          </ul>

          <div className="new-card">
            <a href="#new-card" onClick={(e) => e.preventDefault()}>
              <h6>+Add New Card</h6>
            </a>
          </div>

          <h2 className="fw-semibold theme-color section-t-space">Wallet / E-Wallet</h2>
          <div className="payment-list">
            <ul className="cart-add-box payment-card-box gap-0 mt-3">
              <li className="w-100">
                <div className="payment-detail">
                  <label className="form-label" htmlFor="vnpay">
                    <span className="fw-bold text-primary me-2">VNPay</span>
                    <span><span className="fw-normal theme-color">VNPay QR / ATM</span></span>
                  </label>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      id="vnpay" 
                      type="radio" 
                      name="flexRadioDefault" 
                      checked={selectedPayment === "VNPay"}
                      onChange={() => setSelectedPayment("VNPay")}
                    />
                  </div>
                </div>
              </li>
              <li className="w-100">
                <div className="payment-detail">
                  <label className="form-label" htmlFor="momo">
                    <span className="fw-bold text-danger me-2">MoMo</span>
                    <span><span className="fw-normal theme-color">Ví MoMo</span></span>
                  </label>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      id="momo" 
                      type="radio" 
                      name="flexRadioDefault" 
                      checked={selectedPayment === "MoMo"}
                      onChange={() => setSelectedPayment("MoMo")}
                    />
                  </div>
                </div>
              </li>
              <li className="w-100">
                <div className="payment-detail border-bottom-0">
                  <label className="form-label" htmlFor="six">
                    <img className="img-fluid img" src="/assets/images/icons/svg/cash.svg" alt="cash" />
                    <span>
                      <span className="fw-normal theme-color">Cash on Delivery (COD)</span>
                    </span>
                  </label>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      id="six" 
                      type="radio" 
                      name="flexRadioDefault"
                      checked={selectedPayment === "Cash on Delivery"}
                      onChange={() => setSelectedPayment("Cash on Delivery")}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* payment method section end */}

      {/* pay popup start */}
      <div className="pay-popup">
        <div className="price-items">
          <h6>Total price</h6>
          <h2>${grandTotal.toFixed(2)}</h2>
        </div>
        <button type="button" onClick={handlePayNow} className="btn btn-lg theme-btn pay-btn mt-0 border-0">
          Pay Now
        </button>
      </div>
      {/* pay popup end */}

      {/* success payment modal start */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="confirm-title text-center">
                  <img className="img-fluid confirm-offer" src="/assets/images/gif/success.gif" alt="success-payment" />

                  <h2 className="theme-color text-center fw-medium mt-2">Congratulations !!</h2>
                  <h5 className="light-text fw-normal lh-base text-center w-100 mt-2 mx-auto">
                    Your order is accepted using {selectedPayment}. Your order has been registered in the database!
                  </h5>
                </div>

                <button onClick={() => navigate('/orders')} className="btn theme-btn w-100 mt-4 border-0">
                  View My Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* success payment modal end */}
    </>
  );
}
