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
        // productService에서 반환하는 구조에 맞게 수정
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalCount,
          itemsPerPage: searchFilters.limit || 8,
          hasNextPage: response.data.hasNextPage,
          hasPrevPage: response.data.hasPrevPage
        });
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