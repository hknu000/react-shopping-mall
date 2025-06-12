import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaShippingFast, FaHeadset, FaUndo, FaStar } from 'react-icons/fa';
import Loading from '../../components/common/Loading/Loading';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 추천 상품 데이터 (실제로는 API에서 가져옴)
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      
      // API 호출 시뮬레이션
      try {
        // 실제로는 API 호출
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/products/featured`);
        // const data = await response.json();
          // Mock 데이터 (개발용)
        await new Promise(resolve => setTimeout(resolve, 1000));
          const mockProducts = [
          {
            id: 1,
            name: 'iPhone 15 Pro Max',
            price: 1790000,
            salePrice: 1690000,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
            rating: 4.9,
            reviews: 2847,
            category: 'iphone',
            brand: 'Apple',
            specs: '256GB, 티타늄 블루',
            storage: '256GB',
            screenSize: '6.7인치',
            camera: '48MP 트리플',
            os: 'iOS 17',
            colors: ['티타늄 블루', '티타늄 화이트', '티타늄 블랙', '티타늄 네추럴']
          },
          {
            id: 2,
            name: 'Samsung Galaxy S24 Ultra',
            price: 1690000,
            salePrice: 1590000,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
            rating: 4.8,
            reviews: 1956,
            category: 'samsung',
            brand: 'Samsung',
            specs: '256GB, 티타늄 그레이',
            storage: '256GB',
            screenSize: '6.8인치',
            camera: '200MP 쿼드',
            os: 'Android 14',
            colors: ['티타늄 그레이', '티타늄 바이올렛', '티타늄 옐로우', '티타늄 블랙']
          },
          {
            id: 3,
            name: 'Google Pixel 8 Pro',
            price: 1290000,
            salePrice: 1190000,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',            rating: 4.7,
            reviews: 1432,
            category: 'google',
            brand: 'Google',
            specs: '128GB, 오브시디언 블랙',
            storage: '128GB',
            screenSize: '6.7인치',
            camera: '50MP 트리플',
            os: 'Android 14',
            colors: ['오브시디언', '포르셀린', '베이']
          },
          {
            id: 4,
            name: 'Xiaomi 14 Ultra',
            price: 1490000,
            salePrice: 1390000,
            image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
            rating: 4.6,
            reviews: 892,
            category: 'xiaomi',
            brand: 'Xiaomi',
            specs: '512GB, 화이트',
            storage: '512GB',
            screenSize: '6.73인치',
            camera: '50MP 쿼드',
            os: 'MIUI 14',
            colors: ['화이트', '블랙', '골드']
          },
          {
            id: 5,
            name: 'OnePlus 12',
            price: 1190000,
            salePrice: 1090000,
            image: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9a8cb?w=400&h=400&fit=crop',
            rating: 4.5,
            reviews: 634,
            category: 'oneplus',
            brand: 'OnePlus',
            specs: '256GB, 실키 블랙',
            storage: '256GB',
            screenSize: '6.82인치',
            camera: '50MP 트리플',
            os: 'OxygenOS 14',
            colors: ['실키 블랙', '플루이드 실버', '선셋 듄']
          },
          {
            id: 6,
            name: 'iPhone 14',
            price: 1290000,
            salePrice: 1090000,
            image: 'https://images.unsplash.com/photo-1663661953028-04c46ee16bb4?w=400&h=400&fit=crop',
            rating: 4.8,
            reviews: 3421,
            category: 'iphone',
            brand: 'Apple',
            specs: '128GB, 미드나이트',
            storage: '128GB',
            screenSize: '6.1인치',
            camera: '12MP 듀얼',
            os: 'iOS 17',
            colors: ['미드나이트', '스타라이트', '레드', '블루', '퍼플']
          },
          {
            id: 7,
            name: 'Samsung Galaxy Z Flip5',
            price: 1390000,
            salePrice: 1250000,
            image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
            rating: 4.7,
            reviews: 1182,
            category: 'samsung',
            brand: 'Samsung',
            specs: '256GB, 그래파이트',
            storage: '256GB',
            screenSize: '6.7인치 (폴더블)',
            camera: '12MP 듀얼',
            os: 'Android 14',
            colors: ['그래파이트', '크림', '라벤더', '민트']
          },
          {
            id: 8,
            name: 'Google Pixel 8',
            price: 990000,
            salePrice: 890000,
            image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
            rating: 4.6,
            reviews: 987,
            category: 'google',
            brand: 'Google',
            specs: '128GB, 헤이즐',
            storage: '128GB',
            screenSize: '6.2인치',
            camera: '50MP 듀얼',
            os: 'Android 14',
            colors: ['헤이즐', '로즈', '오브시디언']
          }        ];
        
        setFeaturedProducts(mockProducts);
      } catch (error) {
        console.error('추천 상품 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const calculateDiscount = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };  const categories = [
    {
      id: 'iphone',
      name: 'iPhone',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop',
      description: '최신 iPhone 15, 14, SE 시리즈',
      icon: '🍎'
    },
    {
      id: 'samsung',
      name: 'Samsung Galaxy',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop',
      description: 'Galaxy S, Note, A, Z 시리즈',
      icon: '📱'
    },
    {
      id: 'google',
      name: 'Google Pixel',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop',
      description: 'Pixel 8, 7, A 시리즈',
      icon: '🎯'
    },
    {
      id: 'xiaomi',
      name: 'Xiaomi',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&h=200&fit=crop',
      description: 'Mi, Redmi, POCO 시리즈',
      icon: '🤖'
    },
    {
      id: 'oneplus',
      name: 'OnePlus',
      image: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9a8cb?w=300&h=200&fit=crop',
      description: 'OnePlus 12, Nord 시리즈',
      icon: '🚀'
    },
    {
      id: 'accessories',
      name: '액세서리',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop',
      description: '케이스, 충전기, 이어폰 등',
      icon: '🎧'
    }
  ];

  const services = [
    {
      icon: <FaShippingFast />,
      title: '빠른 배송',
      description: '스마트폰 당일/익일 배송'
    },
    {
      icon: <FaHeadset />,
      title: '전문 상담',
      description: '스마트폰 전문가 상담 서비스'
    },
    {
      icon: <FaUndo />,
      title: '7일 무료 체험',
      description: '7일간 무료 체험 후 반품 가능'
    }
  ];

  if (isLoading) {
    return <Loading text="페이지를 불러오는 중..." />;
  }

  return (
    <div className="home">      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>📱 Welcome to PhoneDue</h1>
            <p>스마트한 선택, 완벽한 스마트폰을 만나보세요!</p>
            <div className="hero-subtext">
              <span>🍎 iPhone</span>
              <span>📱 Galaxy</span>
              <span>🎯 Pixel</span>
              <span>🤖 Xiaomi</span>
              <span>🚀 OnePlus</span>
            </div>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                <FaShoppingCart /> 스마트폰 쇼핑하기
              </Link>
              <Link to="/products?sort=popular" className="btn btn-outline-primary btn-lg">
                인기 스마트폰 보기
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-phones.svg" alt="Smartphones" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">브랜드별 스마트폰</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <div className="category-image">
                  <div className="category-icon">{category.icon}</div>
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 인기 스마트폰</h2>
            <Link to="/products" className="view-all-link">
              전체보기 →
            </Link>
          </div>
            <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.salePrice < product.price && (
                      <div className="discount-badge">
                        -{calculateDiscount(product.price, product.salePrice)}%
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <p className="product-brand">{product.brand}</p>
                    <h3 className="product-name">{product.name}</h3>
                    
                    {/* 스마트폰 스펙 표시 */}
                    <div className="phone-specs">
                      {product.screenSize && <span className="spec-item">📱 {product.screenSize}</span>}
                      {product.storage && <span className="spec-item">💾 {product.storage}</span>}
                      {product.camera && <span className="spec-item">📷 {product.camera}</span>}
                    </div>
                    
                    <div className="product-rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating}</span>
                      <span className="reviews-count">({product.reviews})</span>
                    </div>
                    <div className="product-price">
                      {product.salePrice < product.price ? (
                        <>
                          <span className="sale-price">
                            {formatPrice(product.salePrice)}원
                          </span>
                          <span className="original-price">
                            {formatPrice(product.price)}원
                          </span>
                        </>
                      ) : (
                        <span className="sale-price">
                          {formatPrice(product.price)}원
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>특별 혜택을 받아보세요!</h2>
            <p>최신 상품 정보와 독점 할인 혜택을 이메일로 받아보세요.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="이메일 주소를 입력하세요"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                구독하기
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;