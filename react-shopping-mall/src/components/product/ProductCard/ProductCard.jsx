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
      console.log(result.message);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    
    setIsWishlisted(!isWishlisted);
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

  // 메인 페이지용 대형 뷰 (4*2 배열)
  if (viewMode === 'large') {
    return (
      <div className="product-item-large">
        <Link to={`/products/${id}`} className="product-large-link">
          <div className="product-container">
            {/* 상품 이미지 섹션 */}
            <div className="product-image-section">
              <img src={image} alt={name} className="product-main-image" />
            </div>
            
            {/* 상품 정보 섹션 */}
            <div className="product-info-section">
              <h2 className="product-title">{name}</h2>
              
              {/* 색상 옵션 */}
              {colors && colors.length > 0 && (
                <div className="color-options">
                  {colors.slice(0, 4).map((color, index) => (
                    <div 
                      key={index} 
                      className={`color-circle color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                    ></div>
                  ))}
                </div>
              )}
              
              {/* 저장용량 옵션 */}
              {product.specifications?.저장용량 && (
                <div className="storage-options">
                  {product.specifications.저장용량.split(', ').map((storage, index) => (
                    <div key={index} className="storage-option">{storage}</div>
                  ))}
                </div>
              )}
              
              {/* 가격 섹션 */}
              <div className="price-section">
                <div className="original-price">
                  <span className="price-label">정상가 </span>
                  <span className="price-line-through">{formatPrice(price)}원 ~</span>
                </div>
                <div className="sale-price">
                  <span className="discount-label">할인가 </span>
                  <span className="price-amount">{formatPrice(finalPrice)}원 ~</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // 상품 리스트 페이지용 대형 뷰 (4*n 배열)
  if (viewMode === 'productList') {
    return (
      <div className="product-item-list-large">
        <Link to={`/products/${id}`} className="product-large-link">
          <div className="product-container-list">
            {/* 상품 이미지 섹션 */}
            <div className="product-image-section-list">
              <img src={image} alt={name} className="product-main-image-list" />
            </div>
            
            {/* 상품 정보 섹션 */}
            <div className="product-info-section-list">
              <h2 className="product-title-list">{name}</h2>
              
              {/* 색상 옵션 */}
              {colors && colors.length > 0 && (
                <div className="color-options-list">
                  {colors.slice(0, 4).map((color, index) => (
                    <div 
                      key={index} 
                      className={`color-circle-list color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                    ></div>
                  ))}
                </div>
              )}
              
              {/* 저장용량 옵션 */}
              {product.specifications?.저장용량 && (
                <div className="storage-options-list">
                  {product.specifications.저장용량.split(', ').map((storage, index) => (
                    <div key={index} className="storage-option-list">{storage}</div>
                  ))}
                </div>
              )}
              
              {/* 가격 섹션 */}
              <div className="price-section-list">
                <div className="original-price-list">
                  <span className="price-label-list">정상가 </span>
                  <span className="price-line-through-list">{formatPrice(price)}원 ~</span>
                </div>
                <div className="sale-price-list">
                  <span className="discount-label-list">할인가 </span>
                  <span className="price-amount-list">{formatPrice(finalPrice)}원 ~</span>
                </div>
              </div>
            </div>
            
            {/* 하단 액션 버튼 섹션 */}
            <div className="product-action-section">
              <div className="action-icon">
                <FaShoppingCart />
              </div>
              <div className="action-text">자세히 / 구매</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

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
  }  // Large View (대형 디스플레이)
  if (viewMode === 'large') {
    return (
      <div className={`product-card large-view ${!inStock ? 'out-of-stock' : ''}`}>
        <Link to={`/products/${id}`} className="product-link">
          <div className="large-product-image-container">
            <div className="large-product-image">
              <img
                src={imageError ? '/images/placeholder-product.svg' : image}
                alt={name}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
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
          
          <div className="large-product-info">
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
              <div className="color-options-large">
                <span className="options-label">색상:</span>
                <div className="color-dots">
                  {colors.slice(0, 4).map((color, index) => (
                    <span 
                      key={index} 
                      className={`color-dot color-${color.toLowerCase().replace(/\s+/g, '-')}`} 
                      title={color}
                    ></span>
                  ))}
                  {colors.length > 4 && <span className="more-colors">+{colors.length - 4}</span>}
                </div>
              </div>
            )}
            
            {/* 저장용량 옵션 */}
            {product.specifications?.저장용량 && (
              <div className="storage-options-large">
                <span className="options-label">용량:</span>
                <div className="storage-buttons">
                  {product.specifications.저장용량.split(', ').slice(0, 3).map((storage, index) => (
                    <span key={index} className="storage-button">{storage}</span>
                  ))}
                </div>
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