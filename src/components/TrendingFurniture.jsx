import Iconsax from './Iconsax';

export default function TrendingFurniture() {
  return (
    <section className="section-t-space">
      <div className="custom-container">
        <div className="title">
          <h2>Trending Furniture</h2>
          <a href="product-details.html">View All</a>
        </div>

        <div className="row g-3">
          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="product-details.html" className="horizontal-product-img">
                <img className="img-fluid img" src="/assets/images/product/3.png" alt="p3" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Wingback Chair</h4>
                  <div className="rating d-flex align-items-center">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <h6 className="theme-color fw-normal">4.5</h6>
                  </div>
                </div>
                <h5>Modern arms chairs</h5>

                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="fw-semibold">$25</h3>
                    <h6 className="save">Save $10</h6>
                  </div>
                  <a href="cart.html" className="cart-bag">
                    <Iconsax className="bag" icon="basket-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="product-details.html" className="horizontal-product-img">
                <img className="img-fluid img" src="/assets/images/product/4.png" alt="p4" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Mid Century Sofa</h4>
                  <div className="rating d-flex align-items-center">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <h6 className="theme-color fw-normal">4.5</h6>
                  </div>
                </div>
                <h5>Modern arms Sofa</h5>

                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div className="d-flex align-items-center gap-2">
                    <h3 className="fw-semibold">$999</h3>
                  </div>
                  <a href="cart.html" className="cart-bag">
                    <Iconsax className="bag" icon="basket-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="horizontal-product-box">
              <a href="product-details.html" className="horizontal-product-img">
                <img className="img-fluid img" src="/assets/images/product/5.png" alt="p5" />
              </a>
              <div className="horizontal-product-details">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>Beige Chair</h4>
                  <div className="rating d-flex align-items-center">
                    <img src="/assets/images/svg/Star.svg" alt="star" />
                    <h6 className="theme-color fw-normal">4.5</h6>
                  </div>
                </div>
                <h5>Modern arms chair</h5>

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
    </section>
  );
}
