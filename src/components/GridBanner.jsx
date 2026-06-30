import Iconsax from './Iconsax';

export default function GridBanner() {
  return (
    <section className="banner-wapper grid-banner">
      <div className="custom-container">
        <div className="row">
          <div className="col-6">
            <div className="banner-bg">
              <img className="img-fluid img-bg" src="/assets/images/banner/banner-3.jpg" alt="banner-3" />
              <div className="banner-content">
                <h3>Wingback Chair</h3>
              </div>
              <a href="shop.html" className="more-btn d-block">
                <Iconsax className="right-arrow" icon="arrow-right" />
                <h3>View More</h3>
              </a>
              <div className="banner-bg"></div>
            </div>
          </div>

          <div className="col-6">
            <div className="banner-bg">
              <img className="img-fluid img-bg" src="/assets/images/banner/banner-4.jpg" alt="banner-3" />
              <div className="banner-content">
                <h3>Wingback Chair</h3>
              </div>
              <a href="shop.html" className="more-btn d-block">
                <Iconsax className="right-arrow" icon="arrow-right" />
                <h3>View More</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
