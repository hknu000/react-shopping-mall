import React, { useState, useEffect } from 'react';
import { FaThLarge, FaList, FaFilter, FaSort, FaExpand } from 'react-icons/fa';
import ProductCard from '../ProductCard/ProductCard';
import ProductFilter from '../ProductFilter/ProductFilter';
import Loading from '../../common/Loading/Loading';
import { useProducts } from '../../../hooks/useProducts';
import { SORT_OPTIONS } from '../../../utils/constants';
import './ProductList.css';

const ProductList = ({ 
  initialFilters = {}, 
  showFilters = true, 
  showSorting = true,
  showViewToggle = true 
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'large'
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  
  const {
    products,
    loading,
    error,
    pagination,
    applyFilters,
    changePage,
    changeSort
  } = useProducts(initialFilters);

  useEffect(() => {
    const selectedSort = SORT_OPTIONS.find(option => option.value === sortBy);
    if (selectedSort) {
      changeSort(selectedSort.sortBy, selectedSort.sortOrder);
    }
  }, [sortBy, changeSort]);

  const handleFilterChange = (newFilters) => {
    applyFilters(newFilters);
    setShowFilterPanel(false);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (page) => {
    changePage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisiblePages = 5;

    // 시작과 끝 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 이전 페이지 버튼
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </button>
      );
    }

    // 첫 페이지
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // 마지막 페이지
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="pagination-btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // 다음 페이지 버튼
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </button>
      );
    }

    return (
      <div className="pagination">
        {pages}
      </div>
    );
  };

  if (loading && products.length === 0) {
    return <Loading text="상품을 불러오는 중..." />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>상품을 불러오는 중 오류가 발생했습니다.</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* 필터 패널 */}
      {showFilters && (
        <ProductFilter
          isOpen={showFilterPanel}
          onClose={() => setShowFilterPanel(false)}
          onFilterChange={handleFilterChange}
          initialFilters={initialFilters}
        />
      )}

      {/* 헤더 */}
      <div className="product-list-header">
        <div className="results-info">
          <h2>상품 목록</h2>
          <p>
            총 {pagination.totalItems.toLocaleString()}개의 상품
            {pagination.totalPages > 1 && (
              <span> (페이지 {pagination.currentPage} / {pagination.totalPages})</span>
            )}
          </p>
        </div>

        <div className="header-controls">
          {/* 정렬 */}
          {showSorting && (
            <div className="sort-controls">
              <FaSort className="sort-icon" />
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 필터 버튼 */}
          {showFilters && (
            <button
              className="filter-toggle-btn btn btn-outline-primary"
              onClick={() => setShowFilterPanel(true)}
            >
              <FaFilter /> 필터
            </button>
          )}          {/* 뷰 모드 토글 */}
          {showViewToggle && (
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="그리드 보기"
              >
                <FaThLarge />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="리스트 보기"
              >
                <FaList />
              </button>
              <button
                className={`view-btn ${viewMode === 'productList' ? 'active' : ''}`}
                onClick={() => setViewMode('productList')}
                title="대형 보기"
              >
                <FaExpand />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 상품 목록 */}
      {products.length === 0 ? (
        <div className="no-products">
          <p>조건에 맞는 상품이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className={`product-grid ${viewMode}-view`}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* 로딩 중 (추가 상품 로딩) */}
          {loading && products.length > 0 && (
            <div className="loading-more">
              <Loading size="small" text="추가 상품을 불러오는 중..." />
            </div>
          )}

          {/* 페이지네이션 */}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default ProductList;