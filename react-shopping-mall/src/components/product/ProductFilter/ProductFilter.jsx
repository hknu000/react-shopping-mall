import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { PRODUCT_CATEGORIES } from '../../../utils/constants';
import { formatPrice } from '../../../utils/helpers';
import './ProductFilter.css';

const ProductFilter = ({ isOpen, onClose, onFilterChange, initialFilters = {} }) => {  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    storage: '',
    ram: '',
    screenSize: '',
    color: '',
    os: '',
    rating: '',
    inStock: false,
    onSale: false,
    search: '',
    ...initialFilters
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000000
  });
  const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Huawei', 'Oppo', 'Vivo'];

  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const ramOptions = ['4GB', '6GB', '8GB', '12GB', '16GB'];
  const screenSizes = ['5.0-5.5인치', '5.5-6.0인치', '6.0-6.5인치', '6.5-7.0인치', '7.0인치+'];
  const colors = ['블랙', '화이트', '실버', '골드', '블루', '그린', '퍼플', '레드', '핑크', '기타'];
  const osOptions = ['iOS', 'Android'];

  const categories = Object.values(PRODUCT_CATEGORIES);

  useEffect(() => {
    setFilters(prev => ({ ...prev, ...initialFilters }));
  }, [initialFilters]);
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };
  const handlePriceRangeChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    const newRange = { ...priceRange, [key]: numValue };
    setPriceRange(newRange);
    
    handleFilterChange('minPrice', newRange.min);
    handleFilterChange('maxPrice', newRange.max);
  };

  const handleApplyFilters = () => {
    // 빈 값들 제거
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== false && value !== 0) {
        acc[key] = value;
      }
      return acc;
    }, {});

    onFilterChange(cleanFilters);
  };
  const handleResetFilters = () => {
    const resetFilters = {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      storage: '',
      ram: '',
      screenSize: '',
      color: '',
      os: '',
      rating: '',
      inStock: false,
      onSale: false,
      search: ''
    };
    
    setFilters(resetFilters);
    setPriceRange({ min: 0, max: 3000000 });
    onFilterChange({});
  };
  const getPriceRangeLabel = (min, max) => {
    if (min === 0 && max === 3000000) return '전체';
    if (min === 0) return `${formatPrice(max)}원 이하`;
    if (max === 3000000) return `${formatPrice(min)}원 이상`;
    return `${formatPrice(min)}원 - ${formatPrice(max)}원`;
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay">      <div className="filter-panel">
        <div className="filter-header">
          <h3>스마트폰 필터</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="filter-content">
          {/* 검색 */}
          <div className="filter-section">
            <h4>검색</h4>
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="스마트폰 모델, 브랜드 검색..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* 브랜드 */}
          <div className="filter-section">
            <h4>브랜드</h4>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="filter-select"
            >
              <option value="">전체 브랜드</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* 카테고리 */}
          <div className="filter-section">
            <h4>카테고리</h4>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">전체 카테고리</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* 저장용량 */}
          <div className="filter-section">
            <h4>저장용량</h4>
            <select
              value={filters.storage}
              onChange={(e) => handleFilterChange('storage', e.target.value)}
              className="filter-select"
            >
              <option value="">전체</option>
              {storageOptions.map(storage => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </div>

          {/* RAM */}
          <div className="filter-section">
            <h4>RAM</h4>
            <select
              value={filters.ram}
              onChange={(e) => handleFilterChange('ram', e.target.value)}
              className="filter-select"
            >
              <option value="">전체</option>
              {ramOptions.map(ram => (
                <option key={ram} value={ram}>
                  {ram}
                </option>
              ))}
            </select>
          </div>

          {/* 화면 크기 */}
          <div className="filter-section">
            <h4>화면 크기</h4>
            <select
              value={filters.screenSize}
              onChange={(e) => handleFilterChange('screenSize', e.target.value)}
              className="filter-select"
            >
              <option value="">전체</option>
              {screenSizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* 색상 */}
          <div className="filter-section">
            <h4>색상</h4>
            <select
              value={filters.color}
              onChange={(e) => handleFilterChange('color', e.target.value)}
              className="filter-select"
            >
              <option value="">전체 색상</option>
              {colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* 운영체제 */}
          <div className="filter-section">
            <h4>운영체제</h4>
            <select
              value={filters.os}
              onChange={(e) => handleFilterChange('os', e.target.value)}
              className="filter-select"
            >
              <option value="">전체</option>
              {osOptions.map(os => (
                <option key={os} value={os}>
                  {os}
                </option>
              ))}
            </select>
          </div>

          {/* 가격 범위 */}
          <div className="filter-section">
            <h4>가격 범위</h4>
            <div className="price-range-container">
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="최저가"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="price-input"
                  min="0"
                />
                <span className="price-separator">~</span>
                <input
                  type="number"
                  placeholder="최고가"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="price-input"
                  min="0"
                />
              </div>
                <div className="price-range-slider">
                <input
                  type="range"
                  min="0"
                  max="3000000"
                  step="10000"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  className="range-slider min-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="3000000"
                  step="10000"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  className="range-slider max-slider"
                />
              </div>
              
              <div className="price-range-label">
                {getPriceRangeLabel(priceRange.min, priceRange.max)}
              </div>
            </div>
          </div>

          {/* 평점 */}
          <div className="filter-section">
            <h4>평점</h4>
            <div className="rating-filters">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="rating-option">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.rating === rating.toString()}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                  />
                  <span className="rating-label">
                    {rating}점 이상
                    <span className="stars">
                      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    </span>
                  </span>
                </label>
              ))}
              <label className="rating-option">
                <input
                  type="radio"
                  name="rating"
                  value=""
                  checked={filters.rating === ''}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                />
                <span className="rating-label">전체</span>
              </label>
            </div>
          </div>          {/* 기타 옵션 */}
          <div className="filter-section">
            <h4>기타 옵션</h4>
            <div className="checkbox-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                <span className="checkbox-label">재고 있는 상품만</span>
              </label>
              
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                />
                <span className="checkbox-label">할인 상품만</span>
              </label>
            </div>
          </div>
        </div>

        <div className="filter-footer">
          <button
            className="btn btn-outline-secondary"
            onClick={handleResetFilters}
          >
            초기화
          </button>
          <button
            className="btn btn-primary"
            onClick={handleApplyFilters}
          >
            필터 적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;