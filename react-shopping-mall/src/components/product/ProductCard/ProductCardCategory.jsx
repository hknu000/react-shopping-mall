import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCardCategory.css';

const ProductCardCategory = ({ product }) => {
  if (!product) return null;
  const {
    id,
    name,
    price,
    salePrice,
    image,
    colors = [],
    specifications = {},
    brand
  } = product;
  const finalPrice = salePrice || price;
  const hasDiscount = salePrice && salePrice < price;

  return (
    <div className="product-item-large">
      <Link to={`/products/${id}`} className="product-large-link">
        <div className="product-container">
          {/* 상품 이미지 섹션 */}
          <div className="product-image-section">
            <img src={image} alt={name} className="product-main-image" />
          </div>
          {/* 상품 정보 섹션 */}
          <div className="product-info-section">
            <h2 className="product-title">{name}</h2>
            {/* 색상 옵션 */}
            {colors && colors.length > 0 && (
              <div className="color-options">
                {colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className={`color-circle color-${color.toLowerCase().replace(/\s+/g, '-')}`}
                  ></div>
                ))}
              </div>
            )}
            {/* 저장용량 옵션 */}
            {specifications.저장용량 && (
              <div className="storage-options">
                {specifications.저장용량.split(', ').map((storage, index) => (
                  <div key={index} className="storage-option">{storage}</div>
                ))}
              </div>
            )}
            {/* 가격 섹션 */}
            <div className="price-section">
              <div className="original-price">
                <span className="price-label">정상가 </span>
                <span className="price-line-through">{price?.toLocaleString()}원 ~</span>
              </div>
              <div className="sale-price">
                <span className="discount-label">할인가 </span>
                <span className="price-amount">{finalPrice?.toLocaleString()}원 ~</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCardCategory;
