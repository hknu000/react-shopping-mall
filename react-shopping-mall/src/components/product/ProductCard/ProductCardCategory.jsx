import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './ProductCardCategory.css';

const ProductCardCategory = ({ product }) => {
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
        
        // 스케일된 높이만큼 부모 컨테이너 높이 조정 (1800px로 증가)
        const scaledHeight = 1800 * scale;
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
      'black': '#62605F',
      '내추럴-티타늄': '#ACA49B',
      'natural': '#ACA49B',
      '화이트-티타늄': '#E1E4E8',
      'white': '#E1E4E8',
      'silver': '#E1E4E8',
      'gold': '#D4AF37',
      'blue': '#4A90E2',
      '아이스-블루': '#B0E0E6',
      'ice-blue': '#B0E0E6',
      '민트': '#98FB98',
      'mint': '#98FB98',
      '네이비': '#191970',
      'navy': '#191970',
      '핑크': '#FFB6C1',
      'pink': '#FFB6C1',
      '틸': '#008B8B',
      'teal': '#008B8B',
      '울트라마린': '#4169E1',
      'ultramarine': '#4169E1'
    };
    
    return colorMap[color] || '#CCCCCC';
  };

  if (!product) return null;

  const { id, name, price, originalPrice, salePrice, image, colors = [], variants = [] } = product;
  const finalPrice = salePrice || price;
  const hasDiscount = originalPrice && originalPrice > finalPrice;

  return (
    <div className="product-item-category">
      <Link to={`/products/${id}`} className="product-category-link">
        <div ref={containerRef} className="product-container-category">
          {/* 상품 이미지 섹션 - 1000px */}
          <div className="product-image-section-category">
            <img src={image} alt={name} className="product-main-image-category" />
          </div>
          
          {/* 상품 정보 섹션 */}
          <div className="product-info-section-category">
            <div className="product-title-category">{name}</div>
            
            {/* 색상 옵션 */}
            {colors.length > 0 && (
              <div className="color-options-category">
                {colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="color-circle-category"
                    style={{ backgroundColor: getColorStyle(color) }}
                  />
                ))}
              </div>
            )}
            
            {/* 저장용량 옵션 */}
            {variants.length > 0 && (
              <div className="storage-options-category">
                {variants.slice(0, 3).map((variant, index) => (
                  <div key={index} className="storage-option-category">
                    {variant.storage}
                  </div>
                ))}
              </div>
            )}
            
            {/* 가격 섹션 */}
            <div className="price-section-category">
              {hasDiscount && (
                <div className="original-price-category">
                  <span className="price-label-category">정상가 </span>
                  <span className="price-line-through-category">{formatPrice(originalPrice)}원 ~</span>
                </div>
              )}
              <div className="sale-price-category">
                <span className="discount-label-category">{hasDiscount ? '할인가 ' : ''}</span>
                <span className="price-amount-category">{formatPrice(finalPrice)}원 ~</span>
              </div>
            </div>
          </div>
          
          {/* 하단 액션 버튼 섹션 - 200px */}
          <div className="product-action-section-category">
            <div className="action-icon-category">
              <FaShoppingCart />
            </div>
            <div className="action-text-category">자세히 / 구매</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardCategory;
