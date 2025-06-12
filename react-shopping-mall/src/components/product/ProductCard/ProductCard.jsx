import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { formatPrice, calculateDiscountPercentage } from '../../../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const {
    id,
    name,
    price,
    salePrice,
    image,
    rating = 0,
    reviewCount = 0,
    brand,
    inStock = true,
    tags = [],
    description,
    // 스마트폰 전용 필드
    storage,
    screenSize,
    colors = [],
    camera,
    os
  } = product;

  const finalPrice = salePrice || price;
  const discountPercentage = salePrice ? calculateDiscountPercentage(price, salePrice) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) return;
    
    const result = addToCart(product, 1);
    if (result.success) {
      // 성공 토스트 메시지 표시 (추후 구현)
      console.log(result.message);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // 로그인 필요 메시지
      alert('로그인이 필요합니다.');
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    // 위시리스트 API 호출 (추후 구현)
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaStar key={i} className="star empty" />);
      }
    }
    
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className={`product-card list-view ${!inStock ? 'out-of-stock' : ''}`}>
        <Link to={`/products/${id}`} className="product-link">
          <div className="product-image-container">
            <div className="product-image">
              {!imageLoaded && !imageError && (
                <div className="image-placeholder">
                  <div className="loading-spinner"></div>
                </div>
              )}
              <img
                src={imageError ? '/images/placeholder-product.svg' : image}
                alt={name}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ display: imageLoaded || imageError ? 'block' : 'none' }}
              />
              {discountPercentage > 0 && (
                <div className="discount-badge">-{discountPercentage}%</div>
              )}
              {!inStock && <div className="stock-badge">품절</div>}
            </div>
          </div>
            <div className="product-info">
            <div className="product-header">
              <h3 className="product-name">{name}</h3>
              <button
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlistToggle}
                title="위시리스트"
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            {brand && <p className="product-brand">{brand}</p>}
            
            {/* 스마트폰 특화 스펙 표시 */}
            {(storage || screenSize || camera) && (
              <div className="phone-specs">
                {screenSize && <span className="spec-item">📱 {screenSize}</span>}
                {storage && <span className="spec-item">💾 {storage}</span>}
                {camera && <span className="spec-item">📷 {camera}</span>}
                {os && <span className="spec-item">🔧 {os}</span>}
              </div>
            )}
            
            <div className="product-rating">
              <div className="stars">{renderStars()}</div>
              <span className="rating-text">
                {rating.toFixed(1)} ({reviewCount.toLocaleString()})
              </span>
            </div>
            
            {description && (
              <p className="product-description">{description}</p>
            )}
            
            <div className="product-price">
              <span className="current-price">{formatPrice(finalPrice)}원</span>
              {salePrice && (
                <span className="original-price">{formatPrice(price)}원</span>
              )}
            </div>
            
            {/* 색상 옵션 표시 */}
            {colors.length > 0 && (
              <div className="color-options">
                {colors.slice(0, 4).map((color, index) => (
                  <span key={index} className="color-dot" title={color}></span>
                ))}
                {colors.length > 4 && <span className="more-colors">+{colors.length - 4}</span>}
              </div>
            )}
            
            {tags.length > 0 && (
              <div className="product-tags">
                {tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className="product-actions">
            <button
              className={`add-to-cart-btn btn ${!inStock ? 'disabled' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <FaShoppingCart />
              {inStock ? '장바구니' : '품절'}
            </button>
          </div>
        </Link>
      </div>
    );
  }

  // Grid View (기본)
  return (
    <div className={`product-card grid-view ${!inStock ? 'out-of-stock' : ''}`}>
      <Link to={`/products/${id}`} className="product-link">
        <div className="product-image-container">
          <div className="product-image">
            {!imageLoaded && !imageError && (
              <div className="image-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
            <img
              src={imageError ? '/images/placeholder-product.svg' : image}
              alt={name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              style={{ display: imageLoaded || imageError ? 'block' : 'none' }}
            />
            
            {discountPercentage > 0 && (
              <div className="discount-badge">-{discountPercentage}%</div>
            )}
            
            {!inStock && <div className="stock-badge">품절</div>}
            
            <div className="product-overlay">
              <div className="overlay-actions">
                <button
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  title="위시리스트"
                >
                  {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button
                  className="quick-view-btn"
                  title="빠른 보기"
                >
                  <FaEye />
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="product-info">
          {brand && <p className="product-brand">{brand}</p>}
          
          <h3 className="product-name">{name}</h3>
          
          {/* 스마트폰 주요 스펙 */}
          {(storage || screenSize) && (
            <div className="phone-specs">
              {screenSize && <span className="spec-item">📱 {screenSize}</span>}
              {storage && <span className="spec-item">💾 {storage}</span>}
            </div>
          )}
          
          <div className="product-rating">
            <div className="stars">{renderStars()}</div>
            <span className="rating-text">
              {rating > 0 ? `${rating.toFixed(1)} (${reviewCount})` : '리뷰 없음'}
            </span>
          </div>
          
          <div className="product-price">
            <span className="current-price">{formatPrice(finalPrice)}원</span>
            {salePrice && (
              <span className="original-price">{formatPrice(price)}원</span>
            )}
          </div>
          
          {/* 색상 옵션 */}
          {colors.length > 0 && (
            <div className="color-options">
              {colors.slice(0, 3).map((color, index) => (
                <span key={index} className="color-dot" title={color}></span>
              ))}
              {colors.length > 3 && <span className="more-colors">+{colors.length - 3}</span>}
            </div>
          )}
          
          <button
            className={`add-to-cart-btn btn ${!inStock ? 'disabled' : 'btn-primary'}`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <FaShoppingCart />
            {inStock ? '장바구니 담기' : '품절'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;