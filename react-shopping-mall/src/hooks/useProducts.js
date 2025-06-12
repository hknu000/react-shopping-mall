import { useState, useEffect, useCallback } from 'react';

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
      // queryParams 변수 제거하고 직접 사용
      // const queryParams = new URLSearchParams({
      //   page: searchFilters.page || 1,
      //   limit: searchFilters.limit || 12,
      //   ...searchFilters
      // });

      // const response = await fetch(`${process.env.REACT_APP_API_URL}/products?${queryParams}`);
      // const data = await response.json();

      // Mock 데이터 (개발용)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProducts = generateMockProducts(searchFilters);
      
      setProducts(mockProducts.products);
      setPagination(mockProducts.pagination);
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
  const allProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 1290000,
      salePrice: 1190000,
      image: '/images/products/iphone15pro.jpg',
      category: 'electronics',
      subcategory: 'smartphones',
      rating: 4.8,
      reviews: 1234,
      description: '최신 A17 Pro 칩셋과 티타늄 디자인',
      inStock: true,
      stockCount: 25,
      brand: 'Apple'
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      price: 1790000,
      salePrice: 1690000,
      image: '/images/products/macbook-air.jpg',
      category: 'electronics',
      subcategory: 'laptops',
      rating: 4.9,
      reviews: 856,
      description: '13.6형 M3 칩 탑재 울트라북',
      inStock: true,
      stockCount: 15,
      brand: 'Apple'
    },
    {
      id: 3,
      name: '나이키 에어포스 1',
      price: 129000,
      salePrice: 99000,
      image: '/images/products/nike-airforce.jpg',
      category: 'fashion',
      subcategory: 'shoes',
      rating: 4.7,
      reviews: 2341,
      description: '클래식한 디자인의 스니커즈',
      inStock: true,
      stockCount: 50,
      brand: 'Nike'
    },
    {
      id: 4,
      name: '다이슨 V15 무선청소기',
      price: 899000,
      salePrice: 799000,
      image: '/images/products/dyson-v15.jpg',
      category: 'home',
      subcategory: 'appliances',
      rating: 4.6,
      reviews: 567,
      description: '레이저 먼지 감지 기술 탑재',
      inStock: true,
      stockCount: 8,
      brand: 'Dyson'
    },
    // 더 많은 mock 데이터...
  ];

  // 필터링 로직
  let filteredProducts = allProducts;

  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }

  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter(p => p.subcategory === filters.subcategory);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(p => 
      (p.salePrice || p.price) >= parseInt(filters.minPrice)
    );
  }

  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => 
      (p.salePrice || p.price) <= parseInt(filters.maxPrice)
    );
  }

  // 정렬
  if (filters.sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'price':
          aValue = a.salePrice || a.price;
          bValue = b.salePrice || b.price;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviews':
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
  }

  // 페이지네이션
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 12;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit
    }
  };
};