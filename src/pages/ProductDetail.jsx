import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Iconsax from '../components/Iconsax';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Brown");
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getProduct(id);
        if (data) {
          const images = data.images || (data.image ? [data.image] : ["/assets/images/product/1.png"]);
          setProduct({
            ...data,
            images,
            desc: data.description || data.desc || "Premium interior product built with care and high quality materials."
          });
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(Array.isArray(data.colors) ? data.colors[0] : data.colors);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(Array.isArray(data.sizes) ? data.sizes[0] : data.sizes);
          }
        } else {
          // Fallback local products if backend is not running or doesn't have it
          const localProductsData = {
            "1": { id: 1, name: "Sheesham Wood Armchair", price: 120.00, originalPrice: 150.00, rating: 4.5, images: ["/assets/images/product/1.png", "/assets/images/product/3.png", "/assets/images/product/11.png"], desc: "High quality handcrafted Sheesham Wood Armchair designed for comfort and modern aesthetic.", colors: ["Brown", "Black"], sizes: ["M", "L"], stock: 15 },
            "2": { id: 2, name: "Modern Velvet Sofa", price: 350.00, originalPrice: 400.00, rating: 4.8, images: ["/assets/images/product/2.png", "/assets/images/product/11.png"], desc: "Luxurious velvet sofa featuring deep seating and durable wooden frame.", colors: ["Grey", "Blue"], sizes: ["L", "XL"], stock: 8 },
            "3": { id: 3, name: "Wooden Dining Table", price: 280.00, originalPrice: 320.00, rating: 4.7, images: ["/assets/images/product/3.png", "/assets/images/product/7.png"], desc: "Solid wood dining table suitable for family dinners and gatherings.", colors: ["Brown"], sizes: ["L"], stock: 2 },
            "7": { id: 7, name: "Side Table", price: 50.00, originalPrice: 80.00, rating: 4.3, images: ["/assets/images/product/7.png", "/assets/images/product/1.png"], desc: "Compact and stylish side table for living room or bedroom.", colors: ["Brown", "Black"], sizes: ["S", "M"], stock: 20 },
            "11": { id: 11, name: "Lounge Chair", price: 130.00, originalPrice: 160.00, rating: 4.6, images: ["/assets/images/product/11.png", "/assets/images/product/1.png"], desc: "Ergonomic lounge chair for ultimate relaxation.", colors: ["Blue"], sizes: ["M"], stock: 0 },
            "13": { id: 13, name: "Hanging Light", price: 30.00, originalPrice: 60.00, rating: 4.9, images: ["/assets/images/product/13.png", "/assets/images/product/19.png"], desc: "Modern hanging light fixture to illuminate your space.", colors: ["Black", "Gold"], sizes: ["Standard"], stock: 25 }
          };
          const fallbackProd = localProductsData[id];
          if (fallbackProd) {
            setProduct(fallbackProd);
            if (fallbackProd.colors && fallbackProd.colors.length > 0) {
              setSelectedColor(fallbackProd.colors[0]);
            }
            if (fallbackProd.sizes && fallbackProd.sizes.length > 0) {
              setSelectedSize(fallbackProd.sizes[0]);
            }
          } else {
            setError("Không tìm thấy sản phẩm trong hệ thống.");
          }
        }
      } catch (err) {
        setError("Lỗi kết nối API lấy chi tiết sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light p-4 text-center">
        <Iconsax icon="danger" className="text-danger display-1 mb-3" />
        <h3 className="fw-bold mb-2">Không tìm thấy sản phẩm</h3>
        <p className="text-secondary mb-4">{error || "Sản phẩm không khả dụng hoặc đã bị xóa."}</p>
        <Link to="/" className="btn theme-btn px-4 border-0">Quay lại trang chủ</Link>
      </div>
    );
  }

  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.stock === 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    });
    navigate('/cart');
  };

  const productColors = Array.isArray(product.colors) 
    ? product.colors 
    : (typeof product.colors === 'string' ? product.colors.split(',').map(c => c.trim()) : ["Brown", "Black", "Blue"]);

  const productSizes = Array.isArray(product.sizes) 
    ? product.sizes 
    : (typeof product.sizes === 'string' ? product.sizes.split(',').map(s => s.trim()) : ["S", "M", "L"]);

  return (
    <>
      {/* header start */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <Link to={-1}>
              <Iconsax className="back-btn" icon="arrow-left" />
            </Link>
            <h3>Product Detail</h3>
            <button 
              type="button" 
              className="border-0 bg-transparent p-0"
              onClick={() => toggleWishlist(product)}
            >
              <Iconsax className={`icons ${liked ? 'text-danger' : ''}`} icon="heart" />
            </button>
          </div>
        </div>
      </header>
      {/* header end */}

      {/* product image preview */}
      <section className="mt-3">
        <div className="custom-container text-center">
          <div className="p-3 bg-light rounded-4 mb-3" style={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={product.images[activeImgIndex] || "/assets/images/product/1.png"} 
              alt={product.name} 
              className="img-fluid" 
              style={{ maxHeight: '220px', objectFit: 'contain' }}
            />
          </div>
          <div className="d-flex justify-content-center gap-2 mb-3">
            {product.images.map((img, idx) => (
              <img 
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setActiveImgIndex(idx)}
                className={`rounded border p-1 ${activeImgIndex === idx ? 'border-primary border-2' : ''}`}
                style={{ width: '50px', height: '50px', cursor: 'pointer', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* details section */}
      <section className="section-b-space">
        <div className="custom-container">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h2 className="fw-bold">{product.name}</h2>
              <div className="d-flex align-items-center gap-1 text-warning mt-1">
                <Iconsax icon="star" />
                <span className="fw-semibold text-dark">{product.rating || 4.5}</span>
                <span className="text-secondary ms-2" style={{ fontSize: '13px' }}>
                  ({product.stock > 0 ? `Còn hàng: ${product.stock}` : "Hết hàng"})
                </span>
              </div>
            </div>
            <div className="text-end">
              <h2 className="theme-color fw-bold">${product.price.toFixed(2)}</h2>
              {product.originalPrice && (
                <del className="light-text">${product.originalPrice.toFixed(2)}</del>
              )}
            </div>
          </div>

          <p className="light-text my-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
            {product.desc}
          </p>

          {/* Color Selector */}
          {productColors.length > 0 && (
            <div className="mb-3">
              <h5 className="fw-semibold mb-2">Select Color:</h5>
              <div className="d-flex gap-2">
                {productColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`btn btn-sm ${selectedColor === color ? 'btn-primary' : 'btn-outline-secondary'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {productSizes.length > 0 && (
            <div className="mb-4">
              <h5 className="fw-semibold mb-2">Select Size:</h5>
              <div className="d-flex gap-2">
                {productSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`btn btn-sm ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                    style={{ width: 'auto', minWidth: '40px' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Bottom Add To Cart */}
      <div className="pay-popup">
        <div className="price-items">
          <h6>Price</h6>
          <h2>${product.price.toFixed(2)}</h2>
        </div>
        <button 
          type="button" 
          onClick={handleAddToCart}
          className="btn btn-lg theme-btn pay-btn mt-0 border-0"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      <section className="panel-space"></section>
    </>
  );
}
