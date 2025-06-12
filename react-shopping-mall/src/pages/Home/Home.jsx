import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading/Loading';
import { productService } from '../../services/product.service';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('베스트 상품');

  // 탭별 상품 데이터 
  const getTabProducts = () => {
    if (activeTab === 'WEEKLY BEST') {
      // WEEKLY BEST 탭에서는 삼성 상품들 위주로 표시
      return featuredProducts.filter(product => 
        product.brand === 'Samsung'
      ).slice(0, 8);
    }
    // 기본 탭에서는 모든 상품 표시
    return featuredProducts.slice(0, 8);
  };

  // 추천 상품 데이터를 서비스에서 가져오기
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      
      try {
        const response = await productService.getFeaturedProducts(8);
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

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
    <div className="home phone-due-style">
      {/* 메인 비주얼 배너 */}
      <section className="main-visual">
        <div className="banner">
          <div className="banner-text">
            <h2>SPECIAL SALES</h2>
            <h1>SUMMER OFFERS</h1>
            <p>UP TO 50% OFF</p>
            <Link to="/products" className="btn-shop">SHOP NOW</Link>
          </div>
        </div>
        <div className="slider-controls">
          <button className="prev">◀</button>
          <span className="progress">
            <span className="bar"></span>
          </span>
          <button className="next">▶</button>
          <button className="pause">▮▮</button>
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
          </button>
        </div>
        
        <div className="product-grid">
          {getTabProducts().map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/products/${product.id}`}>
                <div className="product-img">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className="colors">
                  {product.colors && product.colors.map((color, index) => (
                    <span key={index} className={`color-dot color-${color.toLowerCase().replace(/\s+/g, '-')}`}></span>
                  ))}
                </div>
                <div className="price">
                  <del>{formatPrice(product.price)}원</del>
                  <strong>{formatPrice(product.salePrice)}원</strong>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="pager">
          <button disabled>&lt;</button>
          <span>1 / 2</span>
          <button>&gt;</button>
        </div>
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