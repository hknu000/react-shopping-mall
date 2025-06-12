import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaMobileAlt, FaUniversity, FaLock, FaArrowLeft } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import Loading from '../../components/common/Loading/Loading';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cartItems, getCartTotal, getShippingCost, getFinalTotal, clearCart } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: 배송정보, 2: 결제정보, 3: 주문완료

  const [shippingInfo, setShippingInfo] = useState({
    recipientName: user?.name || '',
    phone: user?.phone || '',
    zipCode: '',
    address1: '',
    address2: '',
    deliveryRequest: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardHolder: '',
    bankAccount: '',
    phoneCarrier: 'SKT'
  });

  const [errors, setErrors] = useState({});
  const [orderResult, setOrderResult] = useState(null);

  const subtotal = getCartTotal();
  const shippingCost = getShippingCost();
  const finalTotal = getFinalTotal();

  useEffect(() => {
    // 로그인 체크
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    // 장바구니 빈 경우 체크
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, cartItems, navigate]);

  const handleInputChange = (section, field, value) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }

    // 에러 제거
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateShippingInfo = () => {
    const newErrors = {};

    if (!shippingInfo.recipientName.trim()) {
      newErrors.recipientName = '수령인 이름을 입력해주세요.';
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요.';
    }

    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = '우편번호를 입력해주세요.';
    }

    if (!shippingInfo.address1.trim()) {
      newErrors.address1 = '주소를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentInfo = () => {
    const newErrors = {};

    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = '카드번호를 입력해주세요.';
      }
      if (!paymentInfo.cardExpiry) {
        newErrors.cardExpiry = '유효기간을 입력해주세요.';
      }
      if (!paymentInfo.cardCVC) {
        newErrors.cardCVC = 'CVC 번호를 입력해주세요.';
      }
      if (!paymentInfo.cardHolder.trim()) {
        newErrors.cardHolder = '카드 소지자명을 입력해주세요.';
      }
    } else if (paymentInfo.method === 'bank') {
      if (!paymentInfo.bankAccount.trim()) {
        newErrors.bankAccount = '계좌번호를 입력해주세요.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateShippingInfo()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePaymentInfo()) {
        handlePlaceOrder();
      }
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    try {
      // 실제 결제 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderData = {
        id: `ORDER-${Date.now()}`,
        items: cartItems,
        shippingInfo,
        paymentInfo,
        totals: {
          subtotal,
          shipping: shippingCost,
          total: finalTotal
        },
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };

      setOrderResult(orderData);
      clearCart();
      setStep(3);

    } catch (error) {
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  if (!user || cartItems.length === 0) {
    return <Loading text="페이지를 준비하는 중..." />;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* 헤더 */}
        <div className="checkout-header">
          <button className="back-btn" onClick={() => navigate('/cart')}>
            <FaArrowLeft /> 장바구니로 돌아가기
          </button>
          <h1>주문/결제</h1>
        </div>

        {/* 단계 표시 */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-text">배송 정보</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-text">결제 정보</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-text">주문 완료</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* 1단계: 배송 정보 */}
          {step === 1 && (
            <div className="checkout-section">
              <h2>배송 정보</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>수령인 <span className="required">*</span></label>
                  <input
                    type="text"
                    value={shippingInfo.recipientName}
                    onChange={(e) => handleInputChange('shipping', 'recipientName', e.target.value)}
                    className={errors.recipientName ? 'error' : ''}
                    placeholder="수령인 이름"
                  />
                  {errors.recipientName && <span className="error-text">{errors.recipientName}</span>}
                </div>

                <div className="form-group">
                  <label>전화번호 <span className="required">*</span></label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                    className={errors.phone ? 'error' : ''}
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>우편번호 <span className="required">*</span></label>
                  <div className="address-search">
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                      className={errors.zipCode ? 'error' : ''}
                      placeholder="우편번호"
                    />
                    <button type="button" className="btn btn-outline-primary">
                      주소 검색
                    </button>
                  </div>
                  {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>

                <div className="form-group full-width">
                  <label>주소 <span className="required">*</span></label>
                  <input
                    type="text"
                    value={shippingInfo.address1}
                    onChange={(e) => handleInputChange('shipping', 'address1', e.target.value)}
                    className={errors.address1 ? 'error' : ''}
                    placeholder="기본 주소"
                  />
                  {errors.address1 && <span className="error-text">{errors.address1}</span>}
                </div>

                <div className="form-group full-width">
                  <label>상세 주소</label>
                  <input
                    type="text"
                    value={shippingInfo.address2}
                    onChange={(e) => handleInputChange('shipping', 'address2', e.target.value)}
                    placeholder="상세 주소"
                  />
                </div>

                <div className="form-group full-width">
                  <label>배송 요청사항</label>
                  <select
                    value={shippingInfo.deliveryRequest}
                    onChange={(e) => handleInputChange('shipping', 'deliveryRequest', e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    <option value="door">문 앞에 놓아주세요</option>
                    <option value="security">경비실에 맡겨주세요</option>
                    <option value="call">배송 전 연락주세요</option>
                    <option value="safe">안전한 곳에 놓아주세요</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 2단계: 결제 정보 */}
          {step === 2 && (
            <div className="checkout-section">
              <h2>결제 정보</h2>
              
              <div className="payment-methods">
                <h3>결제 수단 선택</h3>
                <div className="payment-options">
                  <label className={`payment-option ${paymentInfo.method === 'card' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentInfo.method === 'card'}
                      onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                    />
                    <FaCreditCard />
                    <span>신용카드</span>
                  </label>

                  <label className={`payment-option ${paymentInfo.method === 'bank' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentInfo.method === 'bank'}
                      onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                    />
                    <FaUniversity />
                    <span>계좌이체</span>
                  </label>

                  <label className={`payment-option ${paymentInfo.method === 'mobile' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile"
                      checked={paymentInfo.method === 'mobile'}
                      onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                    />
                    <FaMobileAlt />
                    <span>휴대폰결제</span>
                  </label>

                  <label className={`payment-option ${paymentInfo.method === 'paypal' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentInfo.method === 'paypal'}
                      onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                    />
                    <FaPaypal />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              {/* 신용카드 정보 */}
              {paymentInfo.method === 'card' && (
                <div className="payment-details">
                  <h3>카드 정보</h3>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>카드 번호 <span className="required">*</span></label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', formatCardNumber(e.target.value))}
                        className={errors.cardNumber ? 'error' : ''}
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label>유효기간 <span className="required">*</span></label>
                      <input
                        type="text"
                        value={paymentInfo.cardExpiry}
                        onChange={(e) => handleInputChange('payment', 'cardExpiry', formatExpiry(e.target.value))}
                        className={errors.cardExpiry ? 'error' : ''}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                    </div>

                    <div className="form-group">
                      <label>CVC <span className="required">*</span></label>
                      <input
                        type="text"
                        value={paymentInfo.cardCVC}
                        onChange={(e) => handleInputChange('payment', 'cardCVC', e.target.value.replace(/\D/g, ''))}
                        className={errors.cardCVC ? 'error' : ''}
                        placeholder="000"
                        maxLength="4"
                      />
                      {errors.cardCVC && <span className="error-text">{errors.cardCVC}</span>}
                    </div>

                    <div className="form-group full-width">
                      <label>카드 소지자명 <span className="required">*</span></label>
                      <input
                        type="text"
                        value={paymentInfo.cardHolder}
                        onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                        className={errors.cardHolder ? 'error' : ''}
                        placeholder="카드에 인쇄된 이름"
                      />
                      {errors.cardHolder && <span className="error-text">{errors.cardHolder}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* 계좌이체 정보 */}
              {paymentInfo.method === 'bank' && (
                <div className="payment-details">
                  <h3>계좌 정보</h3>
                  <div className="form-group">
                    <label>계좌번호 <span className="required">*</span></label>
                    <input
                      type="text"
                      value={paymentInfo.bankAccount}
                      onChange={(e) => handleInputChange('payment', 'bankAccount', e.target.value)}
                      className={errors.bankAccount ? 'error' : ''}
                      placeholder="계좌번호를 입력하세요"
                    />
                    {errors.bankAccount && <span className="error-text">{errors.bankAccount}</span>}
                  </div>
                </div>
              )}

              {/* 휴대폰결제 정보 */}
              {paymentInfo.method === 'mobile' && (
                <div className="payment-details">
                  <h3>휴대폰 정보</h3>
                  <div className="form-group">
                    <label>통신사</label>
                    <select
                      value={paymentInfo.phoneCarrier}
                      onChange={(e) => handleInputChange('payment', 'phoneCarrier', e.target.value)}
                    >
                      <option value="SKT">SKT</option>
                      <option value="KT">KT</option>
                      <option value="LGU+">LG U+</option>
                      <option value="알뜰폰">알뜰폰</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="security-notice">
                <FaLock />
                <span>모든 결제 정보는 SSL로 보호됩니다</span>
              </div>
            </div>
          )}

          {/* 3단계: 주문 완료 */}
          {step === 3 && orderResult && (
            <div className="checkout-section order-complete">
              <div className="success-icon">✓</div>
              <h2>주문이 완료되었습니다!</h2>
              <p>주문번호: <strong>{orderResult.id}</strong></p>
              <p>예상 배송일: <strong>{orderResult.estimatedDelivery}</strong></p>
              
              <div className="order-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  쇼핑 계속하기
                </button>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/orders')}
                >
                  주문 내역 보기
                </button>
              </div>
            </div>
          )}

          {/* 주문 요약 */}
          {step < 3 && (
            <div className="order-summary">
              <h3>주문 요약</h3>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img 
                      src={item.image || '/images/placeholder-product.svg'} 
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>수량: {item.quantity}</p>
                      <p className="item-price">
                        {formatPrice((item.salePrice || item.price) * item.quantity)}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>상품금액</span>
                  <span>{formatPrice(subtotal)}원</span>
                </div>
                <div className="total-row">
                  <span>배송비</span>
                  <span>{shippingCost === 0 ? '무료' : formatPrice(shippingCost) + '원'}</span>
                </div>
                <div className="total-row final-total">
                  <span>총 결제금액</span>
                  <span>{formatPrice(finalTotal)}원</span>
                </div>
              </div>

              <div className="checkout-actions">
                {step > 1 && (
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setStep(step - 1)}
                    disabled={isLoading}
                  >
                    이전 단계
                  </button>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loading size="small" text="" />
                  ) : step === 1 ? (
                    '다음 단계'
                  ) : (
                    `${formatPrice(finalTotal)}원 결제하기`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;