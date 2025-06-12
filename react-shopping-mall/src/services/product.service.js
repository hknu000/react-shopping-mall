import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const productService = {
  // 상품 목록 조회
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_ENDPOINTS.PRODUCTS.LIST}?${queryString}` : API_ENDPOINTS.PRODUCTS.LIST;
    
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockProducts(params);
    }
    
    return await api.get(url);
  },

  // 상품 상세 조회
  getProduct: async (productId) => {
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockProduct(productId);
    }
    
    const url = API_ENDPOINTS.PRODUCTS.DETAIL.replace(':id', productId);
    return await api.get(url);
  },

  // 추천 상품 조회
  getFeaturedProducts: async (limit = 8) => {
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockFeaturedProducts(limit);
    }
    
    return await api.get(`${API_ENDPOINTS.PRODUCTS.FEATURED}?limit=${limit}`);
  },

  // 관련 상품 조회
  getRelatedProducts: async (productId, limit = 4) => {
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockRelatedProducts(productId, limit);
    }
    
    return await api.get(`/products/${productId}/related?limit=${limit}`);
  },

  // 상품 검색
  searchProducts: async (query, filters = {}) => {
    const params = { search: query, ...filters };
    return await productService.getProducts(params);
  },

  // 카테고리별 상품 조회
  getProductsByCategory: async (category, subcategory = null, params = {}) => {
    const searchParams = { category, ...params };
    if (subcategory) {
      searchParams.subcategory = subcategory;
    }
    return await productService.getProducts(searchParams);
  },

  // 상품 리뷰 조회
  getProductReviews: async (productId, params = {}) => {
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockProductReviews(productId, params);
    }
    
    const queryString = new URLSearchParams(params).toString();
    const url = queryString 
      ? `/products/${productId}/reviews?${queryString}` 
      : `/products/${productId}/reviews`;
    return await api.get(url);
  },

  // 상품 리뷰 작성
  createProductReview: async (productId, reviewData) => {
    return await api.post(`/products/${productId}/reviews`, reviewData);
  },

  // 상품 리뷰 수정
  updateProductReview: async (productId, reviewId, reviewData) => {
    return await api.put(`/products/${productId}/reviews/${reviewId}`, reviewData);
  },

  // 상품 리뷰 삭제
  deleteProductReview: async (productId, reviewId) => {
    return await api.delete(`/products/${productId}/reviews/${reviewId}`);
  },

  // 상품 위시리스트 추가
  addToWishlist: async (productId) => {
    return await api.post(`/products/${productId}/wishlist`);
  },

  // 상품 위시리스트 제거
  removeFromWishlist: async (productId) => {
    return await api.delete(`/products/${productId}/wishlist`);
  },

  // 카테고리 목록 조회
  getCategories: async () => {
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockCategories();
    }
    
    return await api.get(API_ENDPOINTS.PRODUCTS.CATEGORIES);
  },

  // 브랜드 목록 조회
  getBrands: async () => {
    return await api.get('/products/brands');
  },

  // 상품 재고 확인
  checkStock: async (productId, quantity = 1) => {
    return await api.get(`/products/${productId}/stock?quantity=${quantity}`);
  }
};

// Mock 데이터 함수들 (개발용)
const getMockProducts = async (params) => {
  // 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockProducts = [
    {
      id: 1,
      name: 'iPhone 16 Pro Max',
      price: 1890000,
      salePrice: 1790000,
      image: '/images/products/apple/iphone16-promax.jpg',
      images: [
        '/images/products/apple/iphone16-promax.jpg',
        '/images/products/apple/iphone16-promax-2.jpg',
        '/images/products/apple/iphone16-promax-3.jpg'
      ],
      category: 'iphone',
      subcategory: 'iphone-16',
      brand: 'Apple',
      rating: 4.9,
      reviewCount: 1247,
      description: '혁신적인 카메라 제어 기능과 A18 Pro 칩을 탑재한 역대 가장 강력한 iPhone',
      features: ['A18 Pro 칩', '티타늄 디자인', '새로운 카메라 제어 버튼', '48MP Pro 카메라', '5배 광학 줌'],
      specifications: {
        화면: '6.9인치 Super Retina XDR',
        칩셋: 'A18 Pro',
        저장용량: '256GB, 512GB, 1TB, 2TB',
        카메라: '48MP 메인 + 12MP 초광각 + 12MP 망원',
        배터리: '최대 29시간 비디오 재생',
        운영체제: 'iOS 17',
        색상: '네추럴 티타늄, 블루 티타늄, 화이트 티타늄, 블랙 티타늄'
      },
      inStock: true,
      stockCount: 15,
      tags: ['스마트폰', '아이폰', '애플', '프리미엄', '프로'],
      createdAt: '2024-01-10',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '6.7인치',
      camera: '48MP 프로',
      os: 'iOS 17',
      colors: ['네추럴 티타늄', '블루 티타늄', '화이트 티타늄', '블랙 티타늄'],
      ram: '8GB',
      battery: '4441mAh',
      weight: '221g',
      waterResistance: 'IP68',
      wirelessCharging: true,
      faceId: true,
      fingerprint: false,
      supports5G: true,
      performanceScore: 920000,
      batteryLife: 29
    },    {
      id: 2,
      name: 'Samsung Galaxy S25 Ultra',
      price: 1790000,
      salePrice: 1690000,
      image: '/images/products/samsung/galaxy-s25-ultra.jpg',
      images: [
        '/images/products/samsung/galaxy-s25-ultra.jpg',
        '/images/products/samsung/galaxy-s25-ultra-2.jpg',
        '/images/products/samsung/galaxy-s25-ultra-3.jpg'
      ],
      category: 'samsung',
      subcategory: 'galaxy-s25',
      brand: 'Samsung',
      rating: 4.9,
      reviewCount: 1432,
      description: 'S펜이 내장된 최고급 플래그십 스마트폰. 향상된 250MP 카메라와 진화한 Galaxy AI 탑재',
      features: ['Snapdragon 8 Gen 4', '250MP 카메라', 'S펜 내장', '차세대 Galaxy AI', '120배 스페이스 줌'],
      specifications: {
        화면: '7.0인치 Dynamic AMOLED 3X',
        칩셋: 'Snapdragon 8 Gen 4',
        저장용량: '256GB, 512GB, 1TB, 2TB',
        카메라: '250MP 메인 + 50MP 망원 + 12MP 망원 + 12MP 초광각',
        배터리: '5500mAh',
        운영체제: 'Android 14 (One UI 6.1)',
        색상: '티타늄 그레이, 티타늄 바이올렛, 티타늄 옐로우, 티타늄 블랙'
      },
      inStock: true,
      stockCount: 23,
      tags: ['스마트폰', '갤럭시', '삼성', 'S펜', 'AI'],
      createdAt: '2024-01-20',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '6.8인치',
      camera: '200MP 쿼드',
      os: 'Android 14',
      colors: ['티타늄 그레이', '티타늄 바이올렛', '티타늄 옐로우', '티타늄 블랙'],
      ram: '12GB',
      battery: '5000mAh',
      weight: '232g',
      waterResistance: 'IP68',
      wirelessCharging: true,
      faceId: false,
      fingerprint: true,
      supports5G: true,
      performanceScore: 950000,
      batteryLife: 28
    },    {
      id: 3,
      name: 'Samsung Galaxy Z Fold6',
      price: 2390000,
      salePrice: 2190000,
      image: '/images/products/samsung/galaxy-z-fold6.jpg',
      images: [
        '/images/products/samsung/galaxy-z-fold6.jpg',
        '/images/products/samsung/galaxy-z-fold6-2.jpg',
        '/images/products/samsung/galaxy-z-fold6-3.jpg'
      ],
      category: 'samsung',
      subcategory: 'galaxy-z-fold6',
      brand: 'Samsung',
      rating: 4.8,
      reviewCount: 752,
      description: '완전히 새로워진 폴더블 스마트폰. 더 얇고 가벼워진 디자인과 향상된 메인 디스플레이',
      features: ['Snapdragon 8 Gen 4', '폴더블 디스플레이', 'S펜 호환', '진화한 Galaxy AI', '트리플 카메라'],
      specifications: {
        화면: '7.8인치 메인 + 6.5인치 커버 디스플레이',
        칩셋: 'Snapdragon 8 Gen 4',
        저장용량: '256GB, 512GB, 1TB',
        카메라: '108MP 메인 + 12MP 망원 + 12MP 초광각',
        배터리: '4900mAh',
        운영체제: 'Android 15 (One UI 7.0)',
        색상: '팬텀 블랙, 크림, 네이비, 라벤더'
      },      inStock: true,
      stockCount: 42,
      tags: ['스마트폰', '갤럭시', '폴더블', '삼성', 'AI'],
      createdAt: '2025-04-01',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '7.8인치+6.5인치',
      camera: '108MP 트리플',
      os: 'Android 15',
      colors: ['팬텀 블랙', '크림', '네이비', '라벤더'],
      ram: '16GB',
      battery: '4900mAh',
      weight: '235g',
      waterResistance: 'IPX8',
      wirelessCharging: true,
      faceId: true,
      fingerprint: true,
      supports5G: true,
      performanceScore: 1050000,
      batteryLife: 26
    },
    {
      id: 4,
      name: 'Samsung Galaxy Z Flip6',
      price: 1490000,
      salePrice: 1390000,
      image: '/images/products/samsung/galaxy-z-flip6.jpg',
      images: [
        '/images/products/samsung/galaxy-z-flip6.jpg',
        '/images/products/samsung/galaxy-z-flip6-2.jpg',
        '/images/products/samsung/galaxy-z-flip6-3.jpg'
      ],
      category: 'samsung',
      subcategory: 'galaxy-z-flip6',
      brand: 'Samsung',
      rating: 4.7,
      reviewCount: 837,
      description: '완전히 새로워진 플립형 폴더블 스마트폰. 더 큰 커버 디스플레이와 향상된 카메라 시스템',
      features: ['Snapdragon 8 Gen 4', '3.6인치 커버 디스플레이', '향상된 카메라', 'Galaxy AI', 'FlexCam'],
      specifications: {
        화면: '6.8인치 메인 + 3.6인치 커버 디스플레이',
        칩셋: 'Snapdragon 8 Gen 4',
        저장용량: '256GB, 512GB',
        카메라: '50MP 메인 + 12MP 초광각',
        배터리: '4300mAh',
        운영체제: 'Android 15 (One UI 7.0)',
        색상: '그라파이트, 크림, 라일락, 민트'
      },
      inStock: true,
      stockCount: 18,
      tags: ['스마트폰', '샤오미', 'Leica', '카메라'],      inStock: true,
      stockCount: 35,
      tags: ['스마트폰', '갤럭시', '삼성', '플립', '폴더블', 'AI'],
      createdAt: '2025-04-10',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '6.8인치+3.6인치',
      camera: '50MP 듀얼',
      os: 'Android 15',
      colors: ['그라파이트', '크림', '라일락', '민트'],
      ram: '12GB',
      battery: '4300mAh',
      weight: '187g',
      waterResistance: 'IPX8',
      wirelessCharging: true,
      faceId: true,
      fingerprint: true,
      supports5G: true,
      performanceScore: 980000,
      batteryLife: 22
    },
    {
      id: 5,
      name: 'iPhone 16',
      price: 1290000,
      salePrice: 1190000,
      image: '/images/products/apple/iphone16.jpg',
      images: [
        '/images/products/apple/iphone16.jpg',
        '/images/products/apple/iphone16-2.jpg',
        '/images/products/apple/iphone16-3.jpg'
      ],
      category: 'iphone',
      subcategory: 'iphone-16',
      brand: 'Apple',
      rating: 4.8,
      reviewCount: 954,
      description: 'A18 칩과 향상된 카메라 시스템, 그리고 새로운 기능을 갖춘 스마트폰',
      features: ['A18 칩', '48MP 메인 카메라', '카메라 제어 버튼', '15시간 동영상 재생', 'iOS 18'],
      specifications: {
        화면: '6.1인치 Super Retina XDR',
        칩셋: 'A18',
        저장용량: '128GB, 256GB, 512GB',
        카메라: '48MP 메인 + 12MP 초광각',
        배터리: '최대 20시간 비디오 재생',
        운영체제: 'iOS 18',
        색상: '블루, 퍼플, 미드나이트, 스타라이트, 프로덕트 레드'
      },
      inStock: true,
      stockCount: 27,
      tags: ['스마트폰', '원플러스', 'Hasselblad', '플래그십'],      inStock: true,
      stockCount: 45,
      tags: ['스마트폰', '아이폰', '애플', 'A18'],
      createdAt: '2025-05-01',
      // 스마트폰 특화 필드
      storage: '128GB',
      screenSize: '6.1인치',
      camera: '48MP 듀얼',
      os: 'iOS 18',
      colors: ['블루', '퍼플', '미드나이트', '스타라이트', '프로덕트 레드'],
      ram: '8GB',
      battery: '3500mAh',
      weight: '168g',
      waterResistance: 'IP68',
      wirelessCharging: true,
      faceId: true,
      fingerprint: false,
      supports5G: true,
      performanceScore: 940000,
      batteryLife: 20
    },
    {
      id: 6,
      name: 'iPhone 16 Pro',
      price: 1590000,
      salePrice: 1490000,
      image: '/images/products/apple/iphone16-pro.jpg',
      images: [
        '/images/products/apple/iphone16-pro.jpg',
        '/images/products/apple/iphone16-pro-2.jpg',
        '/images/products/apple/iphone16-pro-3.jpg'
      ],
      category: 'iphone',
      subcategory: 'iphone-16',
      brand: 'Apple',
      rating: 4.9,
      reviewCount: 1205,
      description: 'A18 Pro 칩과 혁신적인 카메라 제어 버튼, 티타늄 디자인으로 더욱 강력해진 Pro 모델',
      features: ['A18 Pro 칩', '티타늄 디자인', '48MP 트리플 카메라', '새로운 카메라 제어 버튼', 'Face ID'],
      specifications: {
        화면: '6.3인치 Super Retina XDR ProMotion',
        칩셋: 'A18 Pro',
        저장용량: '256GB, 512GB, 1TB',
        카메라: '48MP 메인 + 48MP 울트라 와이드 + 12MP 망원',
        배터리: '최대 25시간 비디오 재생',
        운영체제: 'iOS 18',
        색상: '티타늄 내추럴, 티타늄 화이트, 티타늄 블랙, 티타늄 블루'
      },
      inStock: true,
      stockCount: 42,
      tags: ['스마트폰', '아이폰', '애플', '스탠다드'],      inStock: true,
      stockCount: 38,
      tags: ['스마트폰', '아이폰', '애플', '프로', 'A18 Pro'],
      createdAt: '2025-05-10',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '6.3인치',
      camera: '48MP 트리플',
      os: 'iOS 18',
      colors: ['티타늄 내추럴', '티타늄 화이트', '티타늄 블랙', '티타늄 블루'],
      ram: '8GB',
      battery: '3650mAh',
      weight: '187g',
      waterResistance: 'IP68',
      wirelessCharging: true,
      faceId: true,
      fingerprint: false,
      supports5G: true,
      performanceScore: 1080000,
      batteryLife: 25
    },
    {
      id: 7,
      name: 'Samsung Galaxy S25',
      price: 1390000,
      salePrice: 1290000,
      image: '/images/products/samsung/galaxy-s25.jpg',
      images: [
        '/images/products/samsung/galaxy-s25.jpg',
        '/images/products/samsung/galaxy-s25-2.jpg',
        '/images/products/samsung/galaxy-s25-3.jpg'
      ],
      category: 'samsung',
      subcategory: 'galaxy-s25',
      brand: 'Samsung',
      rating: 4.8,
      reviewCount: 923,
      description: '더 진화한 Galaxy AI와 슬림한 디자인, 향상된 카메라를 갖춘 삼성의 플래그십 스마트폰',
      features: ['Snapdragon 8 Gen 4', '50MP 고해상도 카메라', '향상된 Galaxy AI', '더 큰 배터리', '슬림한 디자인'],
      specifications: {
        화면: '6.2인치 Dynamic AMOLED 2X',
        칩셋: 'Snapdragon 8 Gen 4',
        저장용량: '128GB, 256GB, 512GB',
        카메라: '50MP 메인 + 12MP 망원 + 12MP 초광각',
        배터리: '4500mAh',
        운영체제: 'Android 15 (One UI 7.0)',
        색상: '팬텀 블랙, 블루, 바이올렛, 화이트'
      },
      inStock: true,
      stockCount: 19,
      tags: ['스마트폰', '갤럭시', '삼성', '폴더블', 'Z플립'],
      createdAt: '2024-02-15',
      // 스마트폰 특화 필드
      storage: '256GB',
      screenSize: '6.7인치',
      camera: '12MP 듀얼',
      os: 'Android 13',
      colors: ['민트', '크림', '라벤더', '그래파이트'],
      ram: '8GB',
      battery: '3700mAh',
      weight: '187g',
      waterResistance: 'IPX8',
      wirelessCharging: true,
      faceId: false,
      fingerprint: true,
      supports5G: true,
      performanceScore: 780000,
      batteryLife: 18
    },
    {
      id: 8,
      name: 'Google Pixel 8',
      price: 990000,
      salePrice: 890000,
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop'
      ],
      category: 'google',
      subcategory: 'smartphones',
      brand: 'Google',
      rating: 4.6,
      reviewCount: 534,
      description: 'Google AI 기능이 가득한 합리적인 픽셀 스마트폰',
      features: ['Tensor G3', 'Magic Eraser', 'Real Tone', 'Call Screen', '7년 업데이트'],
      specifications: {
        화면: '6.2인치 OLED',
        칩셋: 'Google Tensor G3',
        저장용량: '128GB, 256GB',
        카메라: '50MP 메인 + 12MP 초광각',
        배터리: '4575mAh',
        운영체제: 'Android 14',
        색상: '하젤, 로즈, 오브시디언'
      },
      inStock: true,
      stockCount: 35,
      tags: ['스마트폰', '픽셀', '구글', 'AI', '컴팩트'],
      createdAt: '2024-02-20',
      // 스마트폰 특화 필드
      storage: '128GB',
      screenSize: '6.2인치',
      camera: '50MP 듀얼',
      os: 'Android 14',
      colors: ['하젤', '로즈', '오브시디언'],
      ram: '8GB',
      battery: '4575mAh',
      weight: '187g',
      waterResistance: 'IP68',
      wirelessCharging: true,
      faceId: true,
      fingerprint: true,
      supports5G: true,
      performanceScore: 750000,
      batteryLife: 22
    }
  ];

  // 필터링 로직
  let filteredProducts = [...mockProducts];
  
  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category === params.category);
  }
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
  }

  // 가격 필터
  if (params.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.salePrice >= parseInt(params.minPrice));
  }
  
  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.salePrice <= parseInt(params.maxPrice));
  }

  // 브랜드 필터
  if (params.brand) {
    filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === params.brand.toLowerCase());
  }

  // 저장용량 필터
  if (params.storage) {
    filteredProducts = filteredProducts.filter(p => p.storage.includes(params.storage));
  }

  // 화면크기 필터
  if (params.screenSize) {
    filteredProducts = filteredProducts.filter(p => p.screenSize.includes(params.screenSize));
  }

  // 페이지네이션
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    success: true,
    data: {
      products: filteredProducts.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalItems: filteredProducts.length,
        itemsPerPage: limit
      }
    }
  };
};

const getMockProduct = async (productId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockProducts = await getMockProducts({});
  const product = mockProducts.data.products.find(p => p.id === parseInt(productId));
  
  if (!product) {
    return {
      success: false,
      error: '상품을 찾을 수 없습니다.'
    };
  }

  return {
    success: true,
    data: product
  };
};

const getMockFeaturedProducts = async (limit) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockProducts = await getMockProducts({});
  const featuredProducts = mockProducts.data.products
    .filter(p => p.rating >= 4.5)
    .slice(0, limit);

  return {
    success: true,
    data: featuredProducts
  };
};

const getMockProductReviews = async (productId, params) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockReviews = [
    {
      id: 1,
      productId: parseInt(productId),
      userId: 1,
      userName: '김스마트',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: '정말 만족스러운 스마트폰!',
      content: '카메라 성능이 정말 뛰어나고 배터리도 오래 갑니다. 추천해요!',
      pros: ['뛰어난 카메라', '긴 배터리 수명', '빠른 성능'],
      cons: ['가격이 조금 비쌈'],
      helpful: 15,
      createdAt: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      productId: parseInt(productId),
      userId: 2,
      userName: '박테크',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      title: '전반적으로 좋지만...',
      content: '성능은 정말 좋은데 크기가 좀 큰 것 같아요.',
      pros: ['빠른 성능', '좋은 디스플레이'],
      cons: ['큰 크기', '무거운 무게'],
      helpful: 8,
      createdAt: '2024-01-20',
      verified: true
    },
    {
      id: 3,
      productId: parseInt(productId),
      userId: 3,
      userName: '이유저',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      title: '최고의 스마트폰 경험',
      content: '이전에 사용하던 폰과 비교해보니 모든 면에서 업그레이드되었어요. 특히 카메라는 정말 놀라웠습니다.',
      pros: ['카메라 품질', '빠른 충전', '프리미엄 디자인', '5G 연결'],
      cons: ['높은 가격'],
      helpful: 22,
      createdAt: '2024-02-01',
      verified: true
    }
  ];

  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    success: true,
    data: {
      reviews: mockReviews.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(mockReviews.length / limit),
        totalItems: mockReviews.length,
        itemsPerPage: limit
      },
      summary: {
        averageRating: 4.7,
        totalReviews: mockReviews.length,
        ratingDistribution: {
          5: 65,
          4: 25,
          3: 7,
          2: 2,
          1: 1
        }
      }
    }
  };
};

const getMockRelatedProducts = async (productId, limit) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockProducts = await getMockProducts({});
  const currentProduct = mockProducts.data.products.find(p => p.id === parseInt(productId));
  
  if (!currentProduct) {
    return {
      success: false,
      error: '상품을 찾을 수 없습니다.'
    };
  }

  const relatedProducts = mockProducts.data.products
    .filter(p => p.id !== parseInt(productId) && (p.category === currentProduct.category || p.brand === currentProduct.brand))
    .slice(0, limit);

  return {
    success: true,
    data: relatedProducts
  };
};

const getMockCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    success: true,
    data: [
      {
        id: 'iphone',
        name: 'iPhone',
        icon: '📱',
        count: 12
      },
      {
        id: 'samsung',
        name: 'Samsung Galaxy',
        icon: '📱',
        count: 8
      },
      {
        id: 'google',
        name: 'Google Pixel',
        icon: '📱',
        count: 6
      },
      {
        id: 'xiaomi',
        name: 'Xiaomi',
        icon: '📱',
        count: 5
      },
      {
        id: 'oneplus',
        name: 'OnePlus',
        icon: '📱',
        count: 4
      },
      {
        id: 'accessories',
        name: '액세서리',
        icon: '🔌',
        count: 15
      }
    ]
  };
};

export default productService;