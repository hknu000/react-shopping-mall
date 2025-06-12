import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading/Loading';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  const [activeTab, setActiveTab] = useState('베스트 상품');

  // 탭별 상품 데이터 
  const getTabProducts = () => {
    if (activeTab === 'WEEKLY BEST') {
      // WEEKLY BEST 탭에서는 다른 상품들 표시
      return [
        {
          id: 9,
          name: 'Galaxy S25 Ultra',
          price: 1800000,
          salePrice: 1550000,
          image: '/asset/samsung.s25.ultra.black.png',
          colors: ['black', 'gray', 'silverblue']
        },
        {
          id: 10,
          name: 'Galaxy S25+',
          price: 1400000,
          salePrice: 1200000,
          image: '/asset/samsung.s25.plus.mint.png',
          colors: ['iceblue', 'mint', 'navy']
        },
        {
          id: 11,
          name: 'Galaxy Z Fold6',
          price: 2200000,
          salePrice: 1900000,
          image: '/asset/samsung.zfold6.silver.png',
          colors: ['navy', 'pink', 'silver']
        },
        {
          id: 12,
          name: 'Galaxy Z Flip6',
          price: 1500000,
          salePrice: 1300000,
          image: '/asset/samsung.zflip6.yellow.png',
          colors: ['blue', 'mint', 'silver']
        },
        ...featuredProducts.slice(0, 4) // 나머지는 기본 상품으로 채움
      ];
    }
    return featuredProducts;
  };

  // 추천 상품 데이터 (sample.html과 동일한 8개 상품을 반복)
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // sample.html과 동일한 상품 데이터
        const mockProducts = [
          {
            id: 1,
            name: '아이폰 16 프로 맥스',
            price: 1900000,
            salePrice: 1600000,
            image: '/asset/apple.iphone16.promax.black.png',
            colors: ['black', 'desert', 'natural']
          },
          {
            id: 2,
            name: '아이폰 16 프로',
            price: 1550000,
            salePrice: 1250000,
            image: '/asset/apple.iphone16.pro.white.png',
            colors: ['black', 'desert', 'natural']
          },
          {
            id: 3,
            name: '아이폰 16',
            price: 1250000,
            salePrice: 1050000,
            image: '/asset/apple.iphone16.normal.ultramarine.png',
            colors: ['black', 'pink', 'teal']
          },
          {
            id: 4,
            name: '아이폰 16e',
            price: 990000,
            salePrice: 790000,
            image: '/asset/apple.iphone16.e.black.png',
            colors: ['black']
          },
          {
            id: 5,
            name: '아이폰 16 프로 맥스',
            price: 1900000,
            salePrice: 1600000,
            image: '/asset/apple.iphone16.promax.desert.png',
            colors: ['black', 'desert', 'natural']
          },
          {
            id: 6,
            name: '아이폰 16 프로',
            price: 1550000,
            salePrice: 1250000,
            image: '/asset/apple.iphone16.pro.natural.png',
            colors: ['black', 'desert', 'natural']
          },
          {
            id: 7,
            name: '아이폰 16',
            price: 1250000,
            salePrice: 1050000,
            image: '/asset/apple.iphone16.normal.pink.png',
            colors: ['black', 'pink', 'teal']
          },
          {
            id: 8,
            name: '아이폰 16e',
            price: 990000,
            salePrice: 790000,
            image: '/asset/apple.iphone16.e.white.png',
            colors: ['white']
          }
        ];
        
        setFeaturedProducts(mockProducts);
      } catch (error) {
        console.error('상품 로딩 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const categories = [
    { id: 'iphone', name: '아이폰', icon: '🍎' },
    { id: 'samsung', name: '갤럭시', icon: '📱' },
    { id: 'pixel', name: 'Pixel', icon: '🎯' },
    { id: 'tablet', name: '태블릿', icon: '📟' },
    { id: 'case', name: '폰 케이스', icon: '🛡️' },
    { id: 'earphone', name: '무선 이어폰', icon: '🎧' },
    { id: 'etc', name: 'etc.', icon: '📦' }  ];

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
      </section>      {/* 카테고리 아이콘 */}
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
      </section>{/* 주간 베스트 상품 */}
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
                  {product.colors.map((color, index) => (
                    <span key={index} className={`color-dot color-${color}`}></span>
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
      </section>      {/* 하단 섹션 - 특집 & 리뷰 */}
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
            <li>상품        <span>★★★★★</span></li>
            <li>배송 시간   <span>★★★★★</span></li>
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