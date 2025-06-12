import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading/Loading';
import ProductCardLarge from '../../components/product/ProductCard/ProductCardLarge';
import { productService } from '../../services/product.service';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('베스트 상품');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 배너 데이터
  const banners = [
    {
      id: 1,
      title: "SPECIAL SALES",
      subtitle: "SUMMER OFFERS",
      description: "UP TO 50% OFF",
      buttonText: "SHOP NOW",
      link: "/products",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "NEW ARRIVAL",
      subtitle: "iPhone 16 Series",
      description: "혁신적인 카메라 제어",
      buttonText: "자세히 보기",
      link: "/products?category=smartphone&brand=Apple",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "GALAXY AI",
      subtitle: "Galaxy S25 Ultra",
      description: "AI로 진화된 스마트폰",
      buttonText: "구매하기",
      link: "/products?category=smartphone&brand=Samsung",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];  // 탭별 상품 데이터 
  const getTabProducts = () => {
    // 화면 크기에 따른 상품 개수 결정
    const getMaxProducts = () => {
      if (windowWidth <= 600) return 4; // 2열 2줄
      if (windowWidth <= 900) return 4; // 2열 2줄  
      if (windowWidth <= 1200) return 6; // 3열 2줄
      return 8; // 4열 2줄
    };
    
    const maxProducts = getMaxProducts();
    console.log('Window width:', windowWidth, 'Max products:', maxProducts);
    
    let filteredProducts;
    if (activeTab === 'WEEKLY BEST') {
      // WEEKLY BEST 탭에서는 삼성 상품들 위주로 표시
      filteredProducts = featuredProducts.filter(product => 
        product.brand === 'Samsung'
      );
    } else {
      // 기본 탭에서는 모든 상품 표시
      filteredProducts = featuredProducts;
    }
    
    const result = filteredProducts.slice(0, maxProducts);
    console.log('Filtered products count:', result.length);
    return result;
  };
  // 슬라이더 제어 함수들
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // 자동 슬라이드 (3초마다)
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);
  // 추천 상품 데이터를 서비스에서 가져오기
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      
      try {
        const response = await productService.getFeaturedProducts(16);
        if (response.success) {
          setFeaturedProducts(response.data);
        }
      } catch (error) {
        console.error('상품 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // 윈도우 리사이즈 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'smartphone', name: '스마트폰', icon: '📱' },
    { id: 'tablet', name: '태블릿', icon: '📟' },
    { id: 'accessories', name: '액세서리', icon: '🎧' },
    { id: 'case', name: '폰 케이스', icon: '🛡️' },
    { id: 'earphone', name: '무선 이어폰', icon: '🎵' },
    { id: 'charger', name: '충전기', icon: '🔌' },
    { id: 'etc', name: '기타', icon: '📦' }
  ];

  if (isLoading) {
    return <Loading text="페이지를 불러오는 중..." />;
  }

  return (
    <div className="home phone-due-style">      {/* 메인 비주얼 배너 */}
      <section className="main-visual">
        <div className="banner-slider">
          {banners.map((banner, index) => (
            <div 
              key={banner.id}
              className={`banner ${index === currentSlide ? 'active' : ''}`}
              style={{ background: banner.background }}
            >
              <div className="banner-text">
                <h2>{banner.title}</h2>
                <h1>{banner.subtitle}</h1>
                <p>{banner.description}</p>
                <Link to={banner.link} className="btn-shop">{banner.buttonText}</Link>
              </div>
            </div>
          ))}
        </div>        <div className="slider-controls">
          <button className="prev" onClick={prevSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F2B816">
              <path d="M362-165 48-480l314-314 89 88-164 163h627v126H287l164 163-89 89Z"/>
            </svg>
          </button>
          <span className="progress">
            <span 
              className="bar" 
              style={{ width: `${((currentSlide + 1) / banners.length) * 100}%` }}
            ></span>
          </span>
          <button className="next" onClick={nextSlide}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F2B816">
              <path d="m600-165-89-89 164-163H48v-126h627L511-706l89-88 314 314-314 315Z"/>
            </svg>
          </button>
          <button className="pause" onClick={togglePlay}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F2B816">
                <path d="M206-206v-548h548v548H206Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F2B816">
                <path d="M286-139v-682l537 341-537 341Z"/>
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* 카테고리 아이콘 */}
      <section className="categories">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/products?category=${category.id}`}>
                <div className="icon-box placeholder-box"></div>
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 주간 베스트 상품 */}
      <section className="weekly-best">
        <div className="tabs">
          <button 
            className={activeTab === '베스트 상품' ? 'active' : ''}
            onClick={() => setActiveTab('베스트 상품')}
          >
            베스트 상품
          </button>
          <button 
            className={activeTab === 'WEEKLY BEST' ? 'active' : ''}
            onClick={() => setActiveTab('WEEKLY BEST')}
          >
            WEEKLY BEST
          </button>        </div>        <div className="product-grid">
          {getTabProducts().map((product) => (
            <ProductCardLarge
              key={product.id}
              product={product}
            />
          ))}        </div>
      </section>

      {/* 하단 섹션 - 특집 & 리뷰 */}
      <section className="bottom-section">
        <div className="featured">
          <div className="info">
            <h2>Galaxy S25 Ultra</h2>
            <p>한 단계 더 진화된 나만의 <strong>맞춤형 AI</strong></p>
            <p>2억 화소 광각, 5천만 화소 초광각 AI로 진화된 카메라</p>
            <p>슬림해진 디자인에 티타늄으로 견고해진 내구성</p>
          </div>
        </div>
        
        <div className="review">
          <h2>대표 구매평</h2>
          <ul className="ratings">
            <li>상품 품질 <span>★★★★★</span></li>
            <li>상품 디자인 <span>★★★★★</span></li>
            <li>배송 시간 <span>★★★★★</span></li>
          </ul>
          <div className="review-images">
            <div className="img-placeholder"></div>
            <div className="img-placeholder"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;