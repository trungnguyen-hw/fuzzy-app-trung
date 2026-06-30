import { useEffect } from 'react';

export default function Categories() {
  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper(".categories", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        breakpoints: {
          0: { slidesPerView: 3 },
          375: { slidesPerView: 4 },
          767: { slidesPerView: 5 },
        },
      });
    }
  }, []);

  return (
    <section>
      <div className="custom-container">
        <div className="swiper categories">
          <div className="swiper-wrapper ratio_square">
            <div className="swiper-slide">
              <a href="#" className="categories-item active">
                <img className="categories-img" src="/assets/images/svg/sofa.svg" alt="sofa" />
                <h4>Sofa</h4>
              </a>
            </div>
            <div className="swiper-slide">
              <a href="shop.html" className="categories-item">
                <h4>Chair</h4>
              </a>
            </div>
            <div className="swiper-slide">
              <a href="shop.html" className="categories-item">
                <h4>Table</h4>
              </a>
            </div>
            <div className="swiper-slide">
              <a href="shop.html" className="categories-item">
                <h4>Cabinets</h4>
              </a>
            </div>
            <div className="swiper-slide">
              <a href="shop.html" className="categories-item">
                <h4>Cupboard</h4>
              </a>
            </div>
            <div className="swiper-slide">
              <a href="shop.html" className="categories-item">
                <h4>Lamp</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
