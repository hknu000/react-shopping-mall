import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { formatPrice } from '../../../utils/helpers';
import './ProductFilter.css';

const ProductFilter = ({ isOpen, onClose, onFilterChange, initialFilters = {} }) => {  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    onSale: false,
    search: '',
    ...initialFilters
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000000
  });  const brands = ['Apple', 'Samsung'];

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
  };  const handleResetFilters = () => {
    const resetFilters = {
      brand: '',
      minPrice: '',
      maxPrice: '',
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
    <div className="filter-overlay">      <div className="filter-panel">        <div className="filter-header">
          <h3>상품 필터</h3>
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
          </div>          {/* 브랜드 */}
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