import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';

export default function Shipping() {
  const navigate = useNavigate();
  const [selectedShipping, setSelectedShipping] = useState('regular');

  const handleApply = (e) => {
    e.preventDefault();
    navigate('/checkout');
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
            <h3>Choose Shipping</h3>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* shipping section start */}
      <section>
        <div className="custom-container">
          <div className="row g-3">
            <div className="col-12">
              <div className="shipping-box" onClick={() => setSelectedShipping('economy')} style={{ cursor: 'pointer' }}>
                <a href="#economy" onClick={(e) => e.preventDefault()}>
                  <Iconsax className="icons" icon="box-tick" />
                </a>
                <div className="shipping-details">
                  <div className="shipping-info">
                    <h4>Economy</h4>
                    <h5>Estimated Arrival, Mar 20-23</h5>
                  </div>
                  <div className="price">
                    <div className="form-check form-check-reverse">
                      <label className="form-check-label" htmlFor="radio1">$10</label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="exampleRadio" 
                        id="radio1" 
                        checked={selectedShipping === 'economy'}
                        onChange={() => setSelectedShipping('economy')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="shipping-box" onClick={() => setSelectedShipping('regular')} style={{ cursor: 'pointer' }}>
                <a href="#regular" onClick={(e) => e.preventDefault()}>
                  <Iconsax className="icons" icon="package" />
                </a>
                <div className="shipping-details">
                  <div className="shipping-info">
                    <h4>Regular</h4>
                    <h5>Estimated Arrival, Mar 20-22</h5>
                  </div>
                  <div className="price">
                    <div className="form-check form-check-reverse">
                      <label className="form-check-label" htmlFor="radio2">$15</label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="exampleRadio" 
                        id="radio2" 
                        checked={selectedShipping === 'regular'}
                        onChange={() => setSelectedShipping('regular')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="shipping-box" onClick={() => setSelectedShipping('cargo')} style={{ cursor: 'pointer' }}>
                <a href="#cargo" onClick={(e) => e.preventDefault()}>
                  <Iconsax className="icons" icon="truck" />
                </a>
                <div className="shipping-details">
                  <div className="shipping-info">
                    <h4>Cargo</h4>
                    <h5>Estimated Arrival, Mar 19-20</h5>
                  </div>
                  <div className="price">
                    <div className="form-check form-check-reverse">
                      <label className="form-check-label" htmlFor="radio3">$20</label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="exampleRadio" 
                        id="radio3" 
                        checked={selectedShipping === 'cargo'}
                        onChange={() => setSelectedShipping('cargo')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="shipping-box" onClick={() => setSelectedShipping('express')} style={{ cursor: 'pointer' }}>
                <a href="#express" onClick={(e) => e.preventDefault()}>
                  <Iconsax className="icons" icon="truck-fast" />
                </a>
                <div className="shipping-details">
                  <div className="shipping-info">
                    <h4>Express</h4>
                    <h5>Estimated Arrival, Mar 18-19</h5>
                  </div>
                  <div className="price">
                    <div className="form-check form-check-reverse">
                      <label className="form-check-label" htmlFor="radio4">$30</label>
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="exampleRadio" 
                        id="radio4" 
                        checked={selectedShipping === 'express'}
                        onChange={() => setSelectedShipping('express')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleApply} className="btn theme-btn w-100 shipping border-0 mt-4">Apply</button>
        </div>
      </section>
      {/* shipping section end */}
    </>
  );
}
