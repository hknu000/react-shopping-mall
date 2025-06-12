import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCardLarge.css';

const ProductCardLarge = ({ product }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const parentWidth = container.parentElement.clientWidth;
        
        // 원본 크기 1000px 기준으로 스케일 계산
        const scale = parentWidth / 1000;
        
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = 'top left';
        
        // 스케일된 높이만큼 부모 컨테이너 높이 조정
        const scaledHeight = 1600 * scale;
        container.parentElement.style.height = `${scaledHeight}px`;
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };
  const getColorStyle = (color) => {
    const colorMap = {
      '데저트-티타늄': '#A7B5C8',
      'desert': '#A7B5C8',
      '블랙-티타늄': '#62605F',
      '블랙': '#62605F',
      'black': '#62605F',
      '내추럴-티타늄': '#ACA49B',
      'natural': '#ACA49B',
      '화이트-티타늄': '#E1E4E8',
      '화이트': '#E1E4E8',
      'white': '#E1E4E8',
      '실버블루': '#87CEEB',
      '실버': '#E1E4E8',
      'silver': '#E1E4E8',
      '그레이': '#808080',
      'gray': '#808080',
      'gold': '#D4AF37',
      '블루': '#4A90E2',
      'blue': '#4A90E2',
      '아이시-블루': '#B0E0E6',
      'ice-blue': '#B0E0E6',
      '민트': '#98FB98',
      'mint': '#98FB98',
      '네이비': '#191970',
      'navy': '#191970',
      '핑크': '#FFB6C1',
      'pink': '#FFB6C1',
      '틸': '#40E0D0',
      'teal': '#40E0D0',
      '울트라마린': '#4169E1',
      'ultramarine': '#4169E1',
      '옐로우': '#FFFF00',
      'yellow': '#FFFF00'
    };
    return colorMap[color] || '#ccc';
  };
  const isWhiteColor = (color) => {
    return ['화이트-티타늄', '화이트', 'white', '실버', 'silver', '실버블루'].includes(color);
  };

  return (
    <div className="product-item-large">
      <Link to={`/products/${product.id}`} className="product-large-link">        <div ref={containerRef} className="product-container">
          {/* 상품 이미지 섹션 */}
          <div className="product-image-section">            <img 
              src={product.image || product.images?.[0] || '/images/placeholder-product.svg'} 
              alt={product.name}
              className="product-main-image"
            />
          </div>

          {/* 상품 정보 섹션 */}
          <div className="product-info-section">
            {/* 상품명 */}
            <div className="product-title">
              {product.name}
            </div>            {/* 색상 옵션 */}
            <div className="color-options">
              {product.colors?.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className={`color-circle ${isWhiteColor(color) ? 'white-border' : ''}`}
                  style={{ 
                    backgroundColor: getColorStyle(color),
                    border: isWhiteColor(color) ? '5px solid rgba(0, 0, 0, 0.5)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* 저장용량 옵션 */}
            <div className="storage-options">
              {product.specifications?.저장용량?.split(', ').slice(0, 3).map((storage, index) => (
                <div key={index} className="storage-option">
                  {storage}
                </div>
              ))}
            </div>            {/* 가격 섹션 */}
            <div className="price-section">
              {product.originalPrice && product.originalPrice !== product.price && (
                <div className="original-price">
                  정상가 <span className="price-line-through">{formatPrice(product.originalPrice)}원 ~</span>
                </div>
              )}              <div className="sale-price">
                <span className="discount-label">할인가 </span>
                <span className="price-amount">{formatPrice(product.salePrice || product.price)}원 ~</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardLarge;
