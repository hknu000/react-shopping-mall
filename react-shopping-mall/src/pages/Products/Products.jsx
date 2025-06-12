import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../../components/product/ProductList/ProductList';
import { parseQueryString } from '../../utils/helpers';
import './Products.css';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // URL 쿼리 파라미터를 필터로 변환
    const queryParams = parseQueryString(location.search);
    setFilters(queryParams);
  }, [location.search]);

  const handleFilterChange = (newFilters) => {
    // 필터를 URL 쿼리 파라미터로 변환
    const queryString = new URLSearchParams(newFilters).toString();
    const newPath = queryString ? `/products?${queryString}` : '/products';
    navigate(newPath, { replace: true });
  };
  return (
    <div className="products-page">
      <div className="products-container">
        <ProductList
          initialFilters={filters}
          onFilterChange={handleFilterChange}
          showFilters={true}
          showSorting={true}
          showViewToggle={true}
        />
      </div>
    </div>
  );
};

export default Products;