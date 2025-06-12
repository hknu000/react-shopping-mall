import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import Loading from '../../components/common/Loading/Loading';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getShippingCost,
    getFinalTotal,
    isLoading
  } = useContext(CartContext);

  const [processingItemId, setProcessingItemId] = useState(null);

  const subtotal = getCartTotal();
  const shippingCost = getShippingCost();
  const finalTotal = getFinalTotal();
  const freeShippingThreshold = 50000;
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setProcessingItemId(itemId);
    await updateQuantity(itemId, newQuantity);
    setProcessingItemId(null);
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('이 상품을 장바구니에서 제거하시겠습니까?')) {
      setProcessingItemId(itemId);
      await removeFromCart(itemId);
      setProcessingItemId(null);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('장바구니를 모두 비우시겠습니까?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    if (!user) {
      if (window.confirm('결제를 위해 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login', { state: { from: '/cart' } });
      }
      return;
    }
    navigate('/checkout');
  };

  if (isLoading) {
    return <Loading text="장바구니를 불러오는 중..." />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <FaShoppingBag className="empty-cart-icon" />
            <h2>장바구니가 비어있습니다</h2>
            <p>쇼핑을 시작해보세요!</p>
            <Link to="/products" className="btn btn-primary">
              상품 둘러보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> 쇼핑 계속하기
          </button>
          <h1>장바구니</h1>
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
            disabled={isLoading}
          >
            <FaTrash /> 전체 삭제
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {/* 무료배송 안내 */}
            {remainingForFreeShip > 0 && (
              <div className="free-shipping-notice">
                <p>
                  <strong>{formatPrice(remainingForFreeShip)}원</strong> 더 주문하시면 
                  <span className="highlight"> 무료배송</span>입니다!
                </p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* 장바구니 아이템 목록 */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`cart-item ${processingItemId === item.id ? 'processing' : ''}`}
                >
                  <div className="item-image">
                    <img 
                      src={item.image || '/images/placeholder-product.jpg'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </div>                  <div className="item-details">
                    <Link to={`/products/${item.id}`} className="item-name">
                      {item.name}
                    </Link>
                    {item.brand && (
                      <p className="item-brand">{item.brand}</p>
                    )}
                    {/* 선택된 옵션 정보 표시 */}
                    {(item.selectedStorage || item.selectedColor || item.optionText) && (
                      <div className="item-options">
                        {item.optionText ? (
                          <p className="item-option">{item.optionText}</p>
                        ) : (
                          <>
                            {item.selectedStorage && (
                              <p className="item-option">저장용량: {item.selectedStorage}</p>
                            )}
                            {item.selectedColor && (
                              <p className="item-option">색상: {item.selectedColor}</p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                    {item.variant && (
                      <p className="item-variant">{item.variant}</p>
                    )}
                    <div className="item-price">
                      {item.salePrice && item.salePrice < item.price ? (
                        <>
                          <span className="sale-price">
                            {formatPrice(item.salePrice)}원
                          </span>
                          <span className="original-price">
                            {formatPrice(item.price)}원
                          </span>
                        </>
                      ) : (
                        <span className="sale-price">
                          {formatPrice(item.price)}원
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || processingItemId === item.id}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={processingItemId === item.id}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="item-total">
                      {formatPrice((item.salePrice || item.price) * item.quantity)}원
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={processingItemId === item.id}
                      title="상품 삭제"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>주문 요약</h3>
              
              <div className="summary-row">
                <span>상품 금액</span>
                <span>{formatPrice(subtotal)}원</span>
              </div>
              
              <div className="summary-row">
                <span>배송비</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="free-text">무료</span>
                  ) : (
                    `${formatPrice(shippingCost)}원`
                  )}
                </span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>총 결제금액</span>
                <span className="total-price">{formatPrice(finalTotal)}원</span>
              </div>

              <button
                className="checkout-btn btn btn-primary"
                onClick={handleCheckout}
                disabled={isLoading || cartItems.length === 0}
              >
                주문하기 ({cartItems.length}개 상품)
              </button>

              {!user && (
                <p className="login-notice">
                  <Link to="/login">로그인</Link>하시면 더 빠른 결제가 가능합니다.
                </p>
              )}
            </div>            {/* 혜택 정보 */}
            <div className="benefits-card">
              <h4>📱 PhoneDue 특별 혜택</h4>
              <ul>
                <li>📦 100,000원 이상 구매 시 무료배송</li>
                <li>🎁 스마트폰 전문 상담 무료 제공</li>
                <li>📱 7일 무료 체험 서비스</li>
                <li>💳 스마트폰 전용 할부 프로그램 (최대 24개월)</li>
                <li>🔄 30일 무료 교환/반품</li>
                <li>📞 전문가 1:1 상담 서비스</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;