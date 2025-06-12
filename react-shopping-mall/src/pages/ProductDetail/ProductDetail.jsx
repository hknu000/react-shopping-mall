import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaShare, FaMinus, FaPlus, FaArrowLeft, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { productService } from '../../services/product.service';
import { formatPrice, calculateDiscountPercentage } from '../../utils/helpers';
import Loading from '../../components/common/Loading/Loading';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart, isInCart, getItemQuantity } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  // const [reviews, setReviews] = useState([]); // 리뷰 기능은 현재 구현되지 않음
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {      // 상품 상세 정보 조회
      const productResult = await productService.getProduct(id);
      if (productResult.success) {
        setProduct(productResult.data.product);
        // 기본 옵션 설정
        if (productResult.data.product.variants?.length > 0) {
          const firstVariant = productResult.data.product.variants[0];
          setSelectedStorage(firstVariant.storage);
          setSelectedVariant(firstVariant);
        }
        if (productResult.data.product.colors?.length > 0) {
          setSelectedColor(productResult.data.product.colors[0]);
        }
      } else {
        setError('상품을 찾을 수 없습니다.');
      }// 관련 상품 조회
      const relatedResult = await productService.getRelatedProducts(id, 4);
      if (relatedResult.success) {
        setRelatedProducts(relatedResult.data);
      }      // 리뷰 조회 - 현재 구현되지 않음
      // const reviewsResult = await productService.getProductReviews(id, { limit: 5 });
      // if (reviewsResult.success) {
      //   setReviews(reviewsResult.data.reviews);
      // }

    } catch (error) {
      setError('상품 정보를 불러오는 중 오류가 발생했습니다.');
      console.error('Product fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]); // id를 의존성으로 추가
  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]); // fetchProductData를 의존성으로 추가

  const handleAddToCart = () => {
    if (!product.inStock) return;

    // 선택된 옵션으로 variant 찾기
    const variant = product.variants?.find(v => 
      v.storage === selectedStorage && 
      v.color === selectedColor
    );

    // 옵션 정보 텍스트 생성
    const optionText = [];
    if (selectedStorage) optionText.push(`저장용량: ${selectedStorage}`);
    if (selectedColor) optionText.push(`색상: ${selectedColor}`);

    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.images?.[selectedImage] || product.image,
      price: product.price,
      salePrice: variant?.salePrice || product.salePrice,
      selectedStorage,
      selectedColor,
      selectedVariant: variant,
      optionText: optionText.join(', '), // 옵션 정보를 하나의 문자열로
      inStock: variant?.inStock !== false,
      category: product.category,
      quantity
    };

    const result = addToCart(cartItem, quantity);
    if (result.success) {
      alert('장바구니에 상품이 추가되었습니다.');
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      if (window.confirm('구매를 위해 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login', { state: { from: `/products/${id}` } });
      }
      return;
    }

    handleAddToCart();
    navigate('/checkout');
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
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

  if (loading) {
    return <Loading text="상품 정보를 불러오는 중..." />;
  }

  if (error || !product) {
    return (
      <div className="error-page">
        <div className="container">
          <h2>{error || '상품을 찾을 수 없습니다.'}</h2>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            상품 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const originalPrice = getOriginalPrice();
  const discountPercentage = selectedVariant?.salePrice || product.salePrice ? 
    calculateDiscountPercentage(originalPrice, currentPrice) : 0;

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* 브레드크럼 */}
        <nav className="breadcrumb">
          <Link to="/">홈</Link>
          <span>/</span>
          <Link to="/products">상품</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* 뒤로가기 버튼 */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> 이전 페이지
        </button>

        <div className="product-detail-content">
          {/* 상품 이미지 */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images?.[selectedImage] || product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.svg';
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
                <h1 className="product-name">{product.name}</h1>
              </div>
              
              <div className="product-actions-header">
                <button 
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  title="위시리스트"
                >
                  {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button 
                  className="share-btn"
                  onClick={handleShare}
                  title="공유하기"
                >
                  <FaShare />
                </button>
              </div>
            </div>

            <div className="product-rating">
              <div className="stars">{renderStars(product.rating || 0)}</div>
              <span className="rating-text">
                {product.rating?.toFixed(1) || '0.0'} ({product.reviewCount?.toLocaleString() || '0'}개 리뷰)
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
            </div>            {/* 옵션 선택 */}
            {((product.variants && product.variants.length > 0) || (product.colors && product.colors.length > 0)) && (
              <div className="product-variants">
                <h4>옵션 선택</h4>
                <div className="variants-container">                  {/* 저장용량 선택 */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="variant-group">
                      <label className="variant-label">저장용량</label>
                      <div className="storage-options">
                        {[...new Set(product.variants.map(v => v.storage))].map((storage) => {
                          const storageVariants = product.variants.filter(v => v.storage === storage);
                          const hasStock = storageVariants.some(v => v.inStock !== false);
                          const baseVariant = storageVariants.find(v => v.color === selectedColor) || storageVariants[0];
                          const basePrice = baseVariant?.salePrice || baseVariant?.price || product.price;
                          const priceDiff = basePrice - (product.salePrice || product.price);
                          
                          return (
                            <button
                              key={storage}
                              className={`storage-option ${selectedStorage === storage ? 'active' : ''} ${!hasStock ? 'disabled' : ''}`}
                              onClick={() => {
                                if (hasStock) {
                                  setSelectedStorage(storage);
                                  // 선택된 저장용량과 색상에 맞는 variant 찾기
                                  const newVariant = product.variants.find(v => 
                                    v.storage === storage && v.color === selectedColor
                                  ) || storageVariants[0];
                                  setSelectedVariant(newVariant);
                                }
                              }}
                              disabled={!hasStock}
                            >
                              <div className="storage-content">
                                <span className="storage-name">{storage}</span>
                                {priceDiff !== 0 && (
                                  <span className="storage-price">
                                    {priceDiff > 0 ? '+' : ''}{formatPrice(Math.abs(priceDiff))}원
                                  </span>
                                )}
                              </div>
                              {!hasStock && <span className="out-of-stock-badge">품절</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 색상 선택 */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="variant-group">
                      <label className="variant-label">색상</label>
                      <div className="color-options">
                        {product.colors.map((color, index) => {
                          const colorVariants = product.variants?.filter(v => v.color === color) || [];
                          const hasStock = colorVariants.length === 0 || colorVariants.some(v => v.inStock !== false);
                          
                          return (
                            <button
                              key={color}
                              className={`color-option ${selectedColor === color ? 'active' : ''} ${!hasStock ? 'disabled' : ''}`}                              onClick={() => {
                                if (hasStock) {
                                  setSelectedColor(color);
                                  setSelectedImage(index);
                                  // 선택된 저장용량과 색상에 맞는 variant 찾기
                                  if (product.variants && selectedStorage) {
                                    const newVariant = product.variants.find(v => 
                                      v.storage === selectedStorage && v.color === color
                                    );
                                    if (newVariant) {
                                      setSelectedVariant(newVariant);
                                    }
                                  }
                                }
                              }}
                              disabled={!hasStock}
                              title={color}
                            >
                              <div 
                                className="color-swatch"
                                style={{ 
                                  backgroundImage: `url(${product.images[index] || product.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              />
                              <span className="color-name">{color}</span>
                              {!hasStock && <span className="color-out-of-stock">품절</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
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
                {isInCart && isInCart(product.id) ? 
                  `장바구니에 ${getItemQuantity && getItemQuantity(product.id)}개` : 
                  '장바구니 담기'
                }
              </button>
              <button
                className={`btn btn-primary buy-now-btn ${!product.inStock ? 'disabled' : ''}`}
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                {product.inStock ? '바로구매' : '품절'}
              </button>
            </div>

            {/* 혜택 정보 */}
            <div className="benefits-info">
              <div className="benefit-item">
                <FaTruck className="benefit-icon" />
                <div>
                  <strong>무료배송</strong>
                  <p>50,000원 이상 구매 시</p>
                </div>
              </div>
              <div className="benefit-item">
                <FaUndo className="benefit-icon" />
                <div>
                  <strong>무료 교환/반품</strong>
                  <p>30일 이내</p>
                </div>
              </div>
              <div className="benefit-item">
                <FaShieldAlt className="benefit-icon" />
                <div>
                  <strong>품질보증</strong>
                  <p>정품 보장</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 상세 탭 */}
        <div className="product-tabs">          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              상품상세
            </button>
            <button
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              스마트폰 스펙
            </button>
            <button
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              주요기능
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              리뷰 ({product.reviewCount || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <div dangerouslySetInnerHTML={{ __html: product.detailDescription || product.description }} />
                  {product.features && (
                  <div className="features-section">
                    <h3>주요 특징</h3>
                    <ul>
                      {product.features.slice(0, 5).map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}            {activeTab === 'specifications' && (
              <div className="specifications-content">
                <h3>📱 스마트폰 상세 스펙</h3>
                {product.specifications && (
                  <div className="spec-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <div className="spec-label">
                          <span className="spec-icon">
                            {key === '화면' && '📱'}
                            {key === '칩셋' && '⚡'}
                            {key === '저장용량' && '💾'}
                            {key === '메모리' && '🧠'}
                            {key === 'RAM' && '🧠'}
                            {key === '카메라' && '📷'}
                            {key === '배터리' && '🔋'}
                            {key === '운영체제' && '💻'}
                            {key === '색상' && '🎨'}
                            {key === '무게' && '⚖️'}
                            {key === '크기' && '📏'}
                            {key === '방수등급' && '💧'}
                            {key === '무선충전' && '🔌'}
                          </span>
                          {key}
                        </div>
                        <div className="spec-value">{value}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 추가 스마트폰 정보 */}
                <div className="phone-additional-specs">
                  <h4>📊 성능 정보</h4>
                  <div className="performance-grid">
                    {product.performanceScore && (
                      <div className="performance-item">
                        <span className="performance-label">성능 점수</span>
                        <div className="performance-bar">
                          <div 
                            className="performance-fill" 
                            style={{ width: `${(product.performanceScore / 1000000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="performance-score">{product.performanceScore?.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {product.batteryLife && (
                      <div className="performance-item">
                        <span className="performance-label">배터리 수명</span>
                        <div className="performance-bar">
                          <div 
                            className="performance-fill battery" 
                            style={{ width: `${(product.batteryLife / 24) * 100}%` }}
                          ></div>
                        </div>
                        <span className="performance-score">{product.batteryLife}시간</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="features-content">
                <h3>✨ 주요 특징</h3>
                {product.features && (
                  <div className="features-grid">
                    {product.features.map((feature, index) => (
                      <div key={index} className="feature-card">
                        <div className="feature-icon">
                          {feature.includes('카메라') && '📷'}
                          {feature.includes('칩') && '⚡'}
                          {feature.includes('배터리') && '🔋'}
                          {feature.includes('디스플레이') && '📱'}
                          {feature.includes('충전') && '🔌'}
                          {feature.includes('보안') && '🔒'}
                          {feature.includes('방수') && '💧'}
                          {!feature.includes('카메라') && !feature.includes('칩') && 
                           !feature.includes('배터리') && !feature.includes('디스플레이') &&
                           !feature.includes('충전') && !feature.includes('보안') && 
                           !feature.includes('방수') && '⭐'}
                        </div>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 호환성 정보 */}
                <div className="compatibility-section">
                  <h4>🔗 호환성</h4>
                  <div className="compatibility-grid">
                    <div className="compatibility-item">
                      <span className="compatibility-label">5G 지원</span>
                      <span className="compatibility-value">
                        {product.supports5G ? '✅ 지원' : '❌ 미지원'}
                      </span>
                    </div>
                    <div className="compatibility-item">
                      <span className="compatibility-label">무선충전</span>
                      <span className="compatibility-value">
                        {product.wirelessCharging ? '✅ 지원' : '❌ 미지원'}
                      </span>
                    </div>
                    <div className="compatibility-item">
                      <span className="compatibility-label">얼굴인식</span>
                      <span className="compatibility-value">
                        {product.faceId ? '✅ 지원' : '❌ 미지원'}
                      </span>
                    </div>
                    <div className="compatibility-item">
                      <span className="compatibility-label">지문인식</span>
                      <span className="compatibility-value">
                        {product.fingerprint ? '✅ 지원' : '❌ 미지원'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="no-reviews">
                  <p>리뷰 기능은 현재 준비 중입니다. 곧 만나보실 수 있습니다!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 관련 상품 */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h3>관련 상품</h3>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;