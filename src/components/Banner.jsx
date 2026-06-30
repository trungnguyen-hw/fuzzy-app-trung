import Iconsax from './Iconsax';

export default function Banner({ image, imgClass = "img-fluid img-bg" }) {
  return (
    <section className="banner-wapper">
      <div className="custom-container">
        <div className="banner-bg">
          <img className={imgClass} src={image} alt="banner" />
          <div className="banner-content">
            <h2 className="fw-semibold">Best Selling</h2>
            <h4>Comforts & Modern life Stylish Sofa</h4>
          </div>
          <a href="shop.html" className="more-btn">
            <h4>View More</h4>
            <Iconsax className="right-arrow" icon="arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
