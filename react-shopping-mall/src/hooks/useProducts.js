import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/product.service';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });

  const fetchProducts = useCallback(async (searchFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProducts(searchFilters);
      
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.error || '상품을 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError(err.message);
      console.error('상품 로딩 오류:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 상품 검색
  const searchProducts = useCallback((searchTerm, additionalFilters = {}) => {
    const newFilters = {
      ...filters,
      ...additionalFilters,
      search: searchTerm,
      page: 1 // 검색 시 첫 페이지로
    };
    fetchProducts(newFilters);
  }, [filters, fetchProducts]);

  // 필터 적용
  const applyFilters = useCallback((newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      page: 1 // 필터 적용 시 첫 페이지로
    };
    fetchProducts(updatedFilters);
  }, [filters, fetchProducts]);

  // 페이지 변경
  const changePage = useCallback((page) => {
    const newFilters = { ...filters, page };
    fetchProducts(newFilters);
  }, [filters, fetchProducts]);

  // 정렬 변경
  const changeSort = useCallback((sortBy, sortOrder = 'asc') => {
    const newFilters = { 
      ...filters, 
      sortBy, 
      sortOrder,
      page: 1 
    };
    fetchProducts(newFilters);
  }, [filters, fetchProducts]);
  // 초기 로딩
  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]); // fetchProducts와 filters를 의존성 배열에 추가

  return {
    products,
    loading,
    error,
    pagination,
    searchProducts,
    applyFilters,
    changePage,
    changeSort,
    refetch: () => fetchProducts(filters)
  };
};

// Mock 데이터 생성 함수
const generateMockProducts = (filters) => {
  // 이제 productService에서 처리하므로 이 함수는 사용하지 않음
  return {
    products: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 12
    }
  };
};