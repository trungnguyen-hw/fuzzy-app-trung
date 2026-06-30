import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Iconsax from './Iconsax';
import { useApp } from '../context/AppContext';

export default function ProductCard({
  id = 1,
  img,
  title,
  subtitle,
  price,
  oldPrice,
  rating,
  showRating = true,
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const liked = isInWishlist(id);
  const [animating, setAnimating] = useState(false);

  const parsePrice = (p) => {
    if (typeof p === 'number') return p;
    if (!p) return 100;
    const clean = p.toString().replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 100;
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    setAnimating(true);
    toggleWishlist({
      id,
      name: title,
      price: parsePrice(price),
      originalPrice: oldPrice ? parsePrice(oldPrice) : parsePrice(price) * 1.2,
      image: img,
      rating: rating || 4.5
    });
    setTimeout(() => setAnimating(false), 500);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id,
      name: title,
      price: parsePrice(price),
      originalPrice: oldPrice ? parsePrice(oldPrice) : parsePrice(price) * 1.2,
      image: img,
      size: "M",
      color: "Standard"
    });
  };

  return (
    <div className="product-box">
      <div className="product-box-img">
        <Link to={`/product/${id}`}>
          <img className="img" src={img} alt={title} />
        </Link>

        <div className="cart-box">
          <button type="button" onClick={handleAddToCart} className="cart-bag border-0 bg-transparent p-0">
            <Iconsax className="bag" icon="basket-2" />
          </button>
        </div>
      </div>
      <div
        className={`like-btn ${animating ? 'animate' : ''} ${liked ? 'active' : 'inactive'}`}
        onClick={handleToggleLike}
        style={{ cursor: 'pointer' }}
      >
        <img className="outline-icon" src="/assets/images/svg/like.svg" alt="like" />
        <img className="fill-icon" src="/assets/images/svg/like-fill.svg" alt="like" />
        <div className="effect-group">
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
          <span className="effect"></span>
        </div>
      </div>
      <div className="product-box-detail">
        <Link to={`/product/${id}`} className="text-decoration-none text-dark">
          <h4>{title}</h4>
        </Link>
        {showRating ? (
          <>
            <h5>{subtitle}</h5>
            <div className="bottom-panel">
              <div className="price">
                <h4>
                  {price} {oldPrice && <del className="pev-price">{oldPrice}</del>}
                </h4>
              </div>
              <div className="rating">
                <img src="/assets/images/svg/Star.svg" alt="star" />
                <h6>{rating}</h6>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-between gap-3">
            <h5>{subtitle}</h5>
            <h3 className="fw-semibold">{price}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
