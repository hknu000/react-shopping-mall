import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaShare, FaMinus, FaPlus } from 'react-icons/fa';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import { formatPrice, calculateDiscountPercentage } from '../../../utils/helpers';
import './ProductDetail.css';

const ProductDetail = ({ product, onClose }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.inStock) return;

    const cartItem = {
      ...product,
      selectedVariant,
      quantity
    };

    const result = addToCart(cartItem, quantity);
    if (result.success) {
      alert('장바구니에 상품이 추가되었습니다.');
      if (onClose) onClose();
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product.stockCount || 999)) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    if (!user) {
      alert('위시리스트 이용을 위해 로그인이 필요합니다.');
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.salePrice || selectedVariant.price;
    }
    return product?.salePrice || product?.price || 0;
  };

  const getOriginalPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    return product?.price || 0;
  };

  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();
  const discountPercentage = selectedVariant?.salePrice || product.salePrice ? 
    calculateDiscountPercentage(originalPrice, currentPrice) : 0;

  const renderStars = (rating) => {
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

  return (
    <div className="product-detail-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          
          <div className="product-detail-container">
            {/* 상품 이미지 */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={product.images?.[selectedImage] || product.image} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-product.jpg';
                  }}
                />
                {discountPercentage > 0 && (
                  <div className="discount-badge">-{discountPercentage}%</div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="thumbnail-images">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 상품 정보 */}
            <div className="product-info">
              <div className="product-header">
                <div className="product-title">
                  {product.brand && (
                    <p className="product-brand">{product.brand}</p>
                  )}
                  <h2 className="product-name">{product.name}</h2>
                </div>
                
                <div className="product-actions-header">
                  <button 
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={handleWishlistToggle}
                  >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button className="share-btn">
                    <FaShare />
                  </button>
                </div>
              </div>

              <div className="product-rating">
                <div className="stars">{renderStars(product.rating || 0)}</div>
                <span className="rating-text">
                  {product.rating?.toFixed(1) || '0.0'} ({product.reviewCount?.toLocaleString() || 0}개 리뷰)
                </span>
              </div>

              <div className="product-price">
                <span className="current-price">{formatPrice(currentPrice)}원</span>
                {discountPercentage > 0 && (
                  <>
                    <span className="original-price">{formatPrice(originalPrice)}원</span>
                    <span className="discount-amount">
                      {formatPrice(originalPrice - currentPrice)}원 할인
                    </span>
                  </>
                )}
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* 옵션 선택 */}
              {product.variants && product.variants.length > 0 && (
                <div className="product-variants">
                  <h4>옵션 선택</h4>
                  <div className="variants-list">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        className={`variant-btn ${selectedVariant?.id === variant.id ? 'active' : ''} ${!variant.inStock ? 'disabled' : ''}`}
                        onClick={() => variant.inStock && setSelectedVariant(variant)}
                        disabled={!variant.inStock}
                      >
                        <span className="variant-name">{variant.name}</span>
                        <span className="variant-price">
                          {formatPrice(variant.salePrice || variant.price)}원
                        </span>
                        {!variant.inStock && <span className="out-of-stock">품절</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 수량 선택 */}
              <div className="quantity-section">
                <h4>수량</h4>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.stockCount || 999)}
                  >
                    <FaPlus />
                  </button>
                </div>
                {product.stockCount && (
                  <p className="stock-info">재고: {product.stockCount}개</p>
                )}
              </div>

              {/* 구매 버튼 */}
              <div className="purchase-buttons">
                <button
                  className={`btn btn-outline-primary add-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart />
                  장바구니 담기
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary view-detail-btn"
                  onClick={onClose}
                >
                  상세보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;