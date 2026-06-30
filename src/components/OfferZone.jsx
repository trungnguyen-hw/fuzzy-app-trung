import { useEffect } from 'react';
import Iconsax from './Iconsax';

export default function OfferZone() {
  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper(".offer", {
        slidesPerView: 1.5,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
          0: { slidesPerView: 1 },
          375: { slidesPerView: 1.2 },
          425: { slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
        },
      });
    }
  }, []);

  return (
    <section className="offer-zone section-b-space pt-0">
      <div className="custom-container">
        <div className="title">
          <h2>Offer Zone</h2>
          <a href="product-details.html">View All</a>
        </div>

        <div className="swiper offer">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="horizontal-product-box">
                <a href="product-details.html" className="horizontal-product-img">
                  <img className="img-fluid img" src="/assets/images/product/6.png" alt="p6" />
                </a>
                <div className="horizontal-product-details">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>Table Lamp</h4>
                  </div>
                  <h5>Bedroom Study Table Lamp</h5>
                  <div className="rating d-flex align-items-center gap-1 mt-1">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="fw-semibold">$37</h3>
                    </div>
                    <a href="cart.html" className="cart-bag">
                      <Iconsax className="bag" icon="basket-2" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="horizontal-product-box mt-3">
                <a href="product-details.html" className="horizontal-product-img">
                  <img className="img-fluid img" src="/assets/images/product/7.png" alt="p7" />
                </a>
                <div className="horizontal-product-details">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>Side Table</h4>
                  </div>
                  <h5>Solid wood console table</h5>
                  <div className="rating d-flex align-items-center gap-1 mt-1">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="fw-semibold">$37</h3>
                    </div>
                    <a href="cart.html" className="cart-bag">
                      <Iconsax className="bag" icon="basket-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="horizontal-product-box">
                <a href="product-details.html" className="horizontal-product-img">
                  <img className="img-fluid img" src="/assets/images/product/8.png" alt="p8" />
                </a>
                <div className="horizontal-product-details">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>Lounge Chair</h4>
                  </div>
                  <h5>Modern arms chair</h5>
                  <div className="rating d-flex align-items-center gap-1 mt-1">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="fw-semibold">$37</h3>
                    </div>
                    <a href="cart.html" className="cart-bag">
                      <Iconsax className="bag" icon="basket-2" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="horizontal-product-box mt-3">
                <a href="product-details.html" className="horizontal-product-img">
                  <img className="img-fluid img" src="/assets/images/product/9.png" alt="p9" />
                </a>
                <div className="horizontal-product-details">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>Swing Chair</h4>
                  </div>
                  <h5>Modern steel swing chair</h5>
                  <div className="rating d-flex align-items-center gap-1 mt-1">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="fw-semibold">$37</h3>
                    </div>
                    <a href="cart.html" className="cart-bag">
                      <Iconsax className="bag" icon="basket-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
