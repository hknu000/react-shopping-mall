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
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_ENDPOINTS.PRODUCTS.LIST}?${queryString}` : API_ENDPOINTS.PRODUCTS.LIST;
    
    // 개발 환경에서는 Mock 데이터 반환
    if (process.env.NODE_ENV === 'development') {
      return getMockProducts({ ...params, search: query });
    }
    
    return await api.get(url);
  },

  // 상품 추가 (관리자용)
  createProduct: async (productData) => {
    return await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
  },

  // 상품 수정 (관리자용)
  updateProduct: async (productId, productData) => {
    const url = API_ENDPOINTS.PRODUCTS.UPDATE.replace(':id', productId);
    return await api.put(url, productData);
  },

  // 상품 삭제 (관리자용)
  deleteProduct: async (productId) => {
    const url = API_ENDPOINTS.PRODUCTS.DELETE.replace(':id', productId);
    return await api.delete(url);
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

// Mock 데이터
const mockProducts = [
  // iPhone 카테고리
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    price: 1890000,
    salePrice: 1790000,    image: '/asset/apple.iphone16.promax.black.png',
    images: [
      '/asset/apple.iphone16.promax.black.png',
      '/asset/apple.iphone16.promax.desert.png',
      '/asset/apple.iphone16.promax.natural.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 1247,
    description: '혁신적인 카메라 제어 기능과 A18 Pro 칩을 탑재한 역대 가장 강력한 iPhone',
    features: ['A18 Pro 칩', '티타늄 디자인', '새로운 카메라 제어 버튼', '48MP Pro 카메라', '5배 광학 줌'],
    specifications: {
      화면: '6.9인치 Super Retina XDR',
      칩셋: 'A18 Pro',
      저장용량: '256GB, 512GB, 1TB',
      카메라: '48MP Pro 카메라 시스템',
      배터리: '최대 33시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙 티타늄, 화이트 티타늄, 내추럴 티타늄, 데저트 티타늄'
    },
    inStock: true,
    stockCount: 15,
    tags: ['스마트폰', '아이폰', '애플', '프로', 'A18 Pro'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.9인치',
    camera: '48MP 트리플',
    os: 'iOS 18',
    colors: ['블랙 티타늄', '화이트 티타늄', '내추럴 티타늄', '데저트 티타늄'],
    ram: '8GB',
    battery: '4422mAh',
    weight: '227g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 1200000,
    batteryLife: 33
  },
  {
    id: 2,
    name: 'iPhone 16 Pro',
    price: 1590000,
    salePrice: 1490000,
    image: '/asset/apple.iphone16.pro.black.png',
    images: [
      '/asset/apple.iphone16.pro.black.png',
      '/asset/apple.iphone16.pro.desert.png',    '/asset/apple.iphone16.pro.natural.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 892,
    description: 'A18 Pro 칩과 향상된 카메라 시스템을 탑재한 프로급 iPhone',
    features: ['A18 Pro 칩', '티타늄 디자인', '48MP Pro 카메라', '카메라 제어 버튼', 'Action Button'],
    specifications: {
      화면: '6.3인치 Super Retina XDR',
      칩셋: 'A18 Pro',
      저장용량: '128GB, 256GB, 512GB, 1TB',
      카메라: '48MP Pro 카메라 시스템',
      배터리: '최대 27시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙 티타늄, 화이트 티타늄, 내추럴 티타늄, 데저트 티타늄'
    },
    inStock: true,
    stockCount: 23,
    tags: ['스마트폰', '아이폰', '애플', '프로', 'A18 Pro'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.3인치',
    camera: '48MP 트리플',
    os: 'iOS 18',
    colors: ['블랙 티타늄', '화이트 티타늄', '내추럴 티타늄', '데저트 티타늄'],
    ram: '8GB',
    battery: '3582mAh',
    weight: '199g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 1150000,
    batteryLife: 27
  },
  {
    id: 3,
    name: 'iPhone 16',
    price: 1290000,
    salePrice: 1190000,
    image: '/asset/apple.iphone16.black.png',
    images: [
      '/asset/apple.iphone16.black.png',
      '/asset/apple.iphone16.white.png',
      '/asset/apple.iphone16.pink.png'    ],
    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.7,
    reviewCount: 1543,
    description: 'A18 칩과 새로운 기능들을 탑재한 차세대 iPhone',
    features: ['A18 칩', '48MP 메인 카메라', '카메라 제어 버튼', 'Action Button', 'iOS 18'],
    specifications: {
      화면: '6.1인치 Super Retina XDR',
      칩셋: 'A18',
      저장용량: '128GB, 256GB, 512GB',
      카메라: '48MP Fusion 카메라',
      배터리: '최대 22시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙, 화이트, 핑크, 틸, 울트라마린'
    },
    inStock: true,
    stockCount: 38,
    tags: ['스마트폰', '아이폰', '애플', 'A18'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.1인치',
    camera: '48MP 듀얼',
    os: 'iOS 18',
    colors: ['블랙', '화이트', '핑크', '틸', '울트라마린'],
    ram: '8GB',
    battery: '3561mAh',
    weight: '170g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 980000,
    batteryLife: 22
  },
  {
    id: 4,
    name: 'iPhone 16 Plus',
    price: 1490000,
    salePrice: 1390000,
    image: '/asset/apple.iphone16.plus.black.png',
    images: [
      '/asset/apple.iphone16.plus.black.png',
      '/asset/apple.iphone16.plus.white.png',
      '/asset/apple.iphone16.plus.pink.png'
    ],    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.6,
    reviewCount: 675,
    description: '더 큰 화면과 A18 칩을 탑재한 iPhone 16의 플러스 모델',
    features: ['A18 칩', '6.7인치 대형 화면', '48MP 메인 카메라', '향상된 배터리 수명'],
    specifications: {
      화면: '6.7인치 Super Retina XDR',
      칩셋: 'A18',
      저장용량: '128GB, 256GB, 512GB',
      카메라: '48MP Fusion 카메라',
      배터리: '최대 27시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙, 화이트, 핑크, 틸, 울트라마린'
    },
    inStock: true,
    stockCount: 28,
    tags: ['스마트폰', '아이폰', '애플', 'A18', '플러스'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.7인치',
    camera: '48MP 듀얼',
    os: 'iOS 18',
    colors: ['블랙', '화이트', '핑크', '틸', '울트라마린'],
    ram: '8GB',
    battery: '4674mAh',
    weight: '199g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 980000,
    batteryLife: 27
  },
  // Samsung 카테고리
  {
    id: 5,
    name: 'Samsung Galaxy S25 Ultra',
    price: 1890000,
    salePrice: 1690000,
    image: '/asset/samsung.galaxy.s25.ultra.black.png',
    images: [
      '/asset/samsung.galaxy.s25.ultra.black.png',
      '/asset/samsung.galaxy.s25.ultra.silver.png',    '/asset/samsung.galaxy.s25.ultra.gold.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.8,
    reviewCount: 1123,
    description: '차세대 Snapdragon 8 Gen 4와 향상된 Galaxy AI를 탑재한 삼성의 플래그십',
    features: ['Snapdragon 8 Gen 4', '200MP 카메라', 'S펜 내장', 'Galaxy AI', '5000mAh 배터리'],
    specifications: {
      화면: '6.8인치 Dynamic AMOLED 2X',
      칩셋: 'Snapdragon 8 Gen 4',
      저장용량: '256GB, 512GB, 1TB',
      카메라: '200MP 메인 + 12MP 울트라와이드 + 50MP 망원 + 10MP 망원',
      배터리: '5000mAh',
      운영체제: 'Android 15 (One UI 7.0)',
      색상: '팬텀 블랙, 크림, 그린, 바이올렛'
    },
    inStock: true,
    stockCount: 19,
    tags: ['스마트폰', '갤럭시', '삼성', 'S펜', '울트라'],
    createdAt: '2025-01-15',
    storage: '256GB',
    screenSize: '6.8인치',
    camera: '200MP 쿼드',
    os: 'Android 15',
    colors: ['팬텀 블랙', '크림', '그린', '바이올렛'],
    ram: '12GB',
    battery: '5000mAh',
    weight: '232g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: false,
    fingerprint: true,
    supports5G: true,
    performanceScore: 1100000,
    batteryLife: 24
  },
  {
    id: 6,
    name: 'Samsung Galaxy S25+',
    price: 1490000,
    salePrice: 1340000,
    image: '/asset/samsung.galaxy.s25.plus.black.png',
    images: [
      '/asset/samsung.galaxy.s25.plus.black.png',
      '/asset/samsung.galaxy.s25.plus.silver.png',
      '/asset/samsung.galaxy.s25.plus.blue.png'
    ],
    category: 'samsung',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 892,
    description: '대형 화면과 강력한 성능을 자랑하는 Galaxy S25의 플러스 모델',
    features: ['Snapdragon 8 Gen 4', '50MP 트리플 카메라', '4900mAh 대용량 배터리', 'Galaxy AI'],
    specifications: {
      화면: '6.7인치 Dynamic AMOLED 2X',
      칩셋: 'Snapdragon 8 Gen 4',
      저장용량: '256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4900mAh',
      운영체제: 'Android 15 (One UI 7.0)',
      색상: '팬텀 블랙, 크림, 아이시 블루, 민트'
    },
    inStock: true,
    stockCount: 32,
    tags: ['스마트폰', '갤럭시', '삼성', '플러스'],
    createdAt: '2025-01-15',
    storage: '256GB',
    screenSize: '6.7인치',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['팬텀 블랙', '크림', '아이시 블루', '민트'],
    ram: '12GB',
    battery: '4900mAh',
    weight: '196g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: false,
    fingerprint: true,
    supports5G: true,
    performanceScore: 1050000,
    batteryLife: 23
  },
  {
    id: 7,
    name: 'Samsung Galaxy S25',
    price: 1290000,
    salePrice: 1150000,
    image: '/asset/samsung.galaxy.s25.black.png',
    images: [
      '/asset/samsung.galaxy.s25.black.png',
      '/asset/samsung.galaxy.s25.silver.png',
      '/asset/samsung.galaxy.s25.yellow.png'
    ],
    category: 'samsung',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.6,
    reviewCount: 1234,
    description: '컴팩트한 크기에 강력한 성능을 담은 Galaxy S25 스탠다드 모델',
    features: ['Snapdragon 8 Gen 4', '50MP 트리플 카메라', '컴팩트 디자인', 'Galaxy AI'],
    specifications: {
      화면: '6.2인치 Dynamic AMOLED 2X',
      칩셋: 'Snapdragon 8 Gen 4',
      저장용량: '128GB, 256GB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4000mAh',
      운영체제: 'Android 15 (One UI 7.0)',
      색상: '팬텀 블랙, 크림, 코랄, 민트'
    },
    inStock: true,
    stockCount: 45,
    tags: ['스마트폰', '갤럭시', '삼성', '컴팩트'],
    createdAt: '2025-01-15',
    storage: '256GB',
    screenSize: '6.2인치',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['팬텀 블랙', '크림', '코랄', '민트'],
    ram: '8GB',
    battery: '4000mAh',
    weight: '168g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: false,
    fingerprint: true,
    supports5G: true,
    performanceScore: 1000000,
    batteryLife: 20
  },
  {
    id: 8,
    name: 'Samsung Galaxy Z Flip 6',
    price: 1590000,
    salePrice: 1390000,
    image: '/asset/samsung.galaxy.zflip6.mint.png',
    images: [
      '/asset/samsung.galaxy.zflip6.mint.png',
      '/asset/samsung.galaxy.zflip6.silver.png',
      '/asset/samsung.galaxy.zflip6.yellow.png'
    ],
    category: 'samsung',
    subcategory: 'galaxy-z',
    brand: 'Samsung',
    rating: 4.5,
    reviewCount: 567,
    description: '더욱 향상된 내구성과 Galaxy AI를 탑재한 폴더블 스마트폰',
    features: ['Snapdragon 8 Gen 3', '폴더블 디자인', 'Flex 모드', 'Galaxy AI', '50MP 듀얼 카메라'],
    specifications: {
      화면: '6.7인치 Dynamic AMOLED 2X (접었을 때: 3.4인치)',
      칩셋: 'Snapdragon 8 Gen 3',
      저장용량: '256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드',
      배터리: '4000mAh',
      운영체제: 'Android 14 (One UI 6.1)',
      색상: '민트, 실버 섀도우, 옐로우, 블루, 그린, 화이트'
    },
    inStock: true,
    stockCount: 23,
    tags: ['스마트폰', '갤럭시', '삼성', '폴더블', 'Z플립'],
    createdAt: '2024-07-15',
    storage: '256GB',
    screenSize: '6.7인치+3.4인치',
    camera: '50MP 듀얼',
    os: 'Android 14',
    colors: ['민트', '실버 섀도우', '옐로우', '블루'],
    ram: '12GB',
    battery: '4000mAh',
    weight: '187g',
    waterResistance: 'IPX8',
    wirelessCharging: true,
    faceId: false,
    fingerprint: true,
    supports5G: true,
    performanceScore: 950000,
    batteryLife: 18
  },
  // 태블릿 카테고리
  {
    id: 9,
    name: 'iPad Pro 13인치 (M4)',
    price: 1890000,
    salePrice: 1690000,
    image: '/asset/apple.ipad.pro.13.silver.png',
    images: [
      '/asset/apple.ipad.pro.13.silver.png',
      '/asset/apple.ipad.pro.13.space.png'
    ],
    category: 'tablet',
    subcategory: 'ipad-pro',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 234,
    description: 'M4 칩과 OLED 디스플레이를 탑재한 차세대 iPad Pro',
    features: ['M4 칩', '13인치 Ultra Retina XDR', 'Apple Pencil Pro 지원', 'Magic Keyboard 호환', 'Thunderbolt/USB 4'],
    specifications: {
      화면: '13인치 Ultra Retina XDR OLED',
      칩셋: 'Apple M4',
      저장용량: '256GB, 512GB, 1TB, 2TB',
      카메라: '12MP 광각 + 10MP 울트라와이드',
      배터리: '최대 10시간 사용',
      운영체제: 'iPadOS 18',
      색상: '실버, 스페이스 블랙'
    },
    inStock: true,
    stockCount: 18,
    tags: ['태블릿', '아이패드', '애플', 'M4', '프로'],
    createdAt: '2024-05-15',
    storage: '256GB',
    screenSize: '13인치',
    camera: '12MP 듀얼',
    os: 'iPadOS 18',
    colors: ['실버', '스페이스 블랙'],
    ram: '16GB',
    battery: '10090mAh',
    weight: '579g',
    waterResistance: '없음',
    wirelessCharging: false,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 1300000,
    batteryLife: 10
  },
  {
    id: 10,
    name: 'iPad Pro 11인치 (M4)',
    price: 1490000,
    salePrice: 1340000,
    image: '/asset/apple.ipad.pro.11.silver.png',
    images: [
      '/asset/apple.ipad.pro.11.silver.png',
      '/asset/apple.ipad.pro.11.space.png'
    ],
    category: 'tablet',
    subcategory: 'ipad-pro',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 456,
    description: '컴팩트한 크기에 M4 칩의 강력한 성능을 담은 iPad Pro',
    features: ['M4 칩', '11인치 Ultra Retina XDR', 'Apple Pencil Pro 지원', 'Magic Keyboard 호환'],
    specifications: {
      화면: '11인치 Ultra Retina XDR OLED',
      칩셋: 'Apple M4',
      저장용량: '256GB, 512GB, 1TB, 2TB',
      카메라: '12MP 광각 + 10MP 울트라와이드',
      배터리: '최대 10시간 사용',
      운영체제: 'iPadOS 18',
      색상: '실버, 스페이스 블랙'
    },
    inStock: true,
    stockCount: 25,
    tags: ['태블릿', '아이패드', '애플', 'M4', '프로'],
    createdAt: '2024-05-15',
    storage: '256GB',
    screenSize: '11인치',
    camera: '12MP 듀얼',
    os: 'iPadOS 18',
    colors: ['실버', '스페이스 블랙'],
    ram: '16GB',
    battery: '7538mAh',
    weight: '444g',
    waterResistance: '없음',
    wirelessCharging: false,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 1250000,
    batteryLife: 10
  },
  {
    id: 11,
    name: 'Samsung Galaxy Tab S10 Ultra',
    price: 1690000,
    salePrice: 1490000,
    image: '/asset/samsung.galaxy.tab.s10.ultra.gray.png',
    images: [
      '/asset/samsung.galaxy.tab.s10.ultra.gray.png',
      '/asset/samsung.galaxy.tab.s10.ultra.silver.png'
    ],
    category: 'tablet',
    subcategory: 'galaxy-tab',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 189,
    description: '대형 화면과 S펜을 지원하는 삼성의 프리미엄 태블릿',
    features: ['MediaTek Dimensity 9300+', '14.6인치 대형 화면', 'S펜 포함', 'DeX 모드', '11200mAh 배터리'],
    specifications: {
      화면: '14.6인치 Dynamic AMOLED 2X',
      칩셋: 'MediaTek Dimensity 9300+',
      저장용량: '256GB, 512GB, 1TB',
      카메라: '13MP 메인 + 8MP 울트라와이드',
      배터리: '11200mAh',
      운영체제: 'Android 14 (One UI 6.1)',
      색상: '문라이트 블루, 플래티넘 실버'
    },
    inStock: true,
    stockCount: 14,
    tags: ['태블릿', '갤럭시탭', '삼성', 'S펜', '울트라'],
    createdAt: '2024-10-15',
    storage: '256GB',
    screenSize: '14.6인치',
    camera: '13MP 듀얼',
    os: 'Android 14',
    colors: ['문라이트 블루', '플래티넘 실버'],
    ram: '12GB',
    battery: '11200mAh',
    weight: '718g',
    waterResistance: 'IP68',
    wirelessCharging: true,
    faceId: false,
    fingerprint: true,
    supports5G: true,
    performanceScore: 900000,
    batteryLife: 15
  },
  {
    id: 12,
    name: 'iPad Air 13인치 (M2)',
    price: 1190000,
    salePrice: 1090000,
    image: '/asset/apple.ipad.air.13.blue.png',
    images: [
      '/asset/apple.ipad.air.13.blue.png',
      '/asset/apple.ipad.air.13.purple.png',
      '/asset/apple.ipad.air.13.starlight.png'
    ],
    category: 'tablet',
    subcategory: 'ipad-air',
    brand: 'Apple',
    rating: 4.6,
    reviewCount: 678,
    description: 'M2 칩과 13인치 대형 화면을 제공하는 새로운 iPad Air',
    features: ['M2 칩', '13인치 Liquid Retina', 'Apple Pencil (USB-C) 지원', 'Magic Keyboard 호환'],
    specifications: {
      화면: '13인치 Liquid Retina',
      칩셋: 'Apple M2',
      저장용량: '128GB, 256GB, 512GB, 1TB',
      카메라: '12MP 광각',
      배터리: '최대 10시간 사용',
      운영체제: 'iPadOS 17',
      색상: '스페이스 그레이, 스타라이트, 핑크, 퍼플, 블루'
    },
    inStock: true,
    stockCount: 31,
    tags: ['태블릿', '아이패드', '애플', 'M2', '에어'],
    createdAt: '2024-05-07',
    storage: '256GB',
    screenSize: '13인치',
    camera: '12MP 싱글',
    os: 'iPadOS 17',
    colors: ['스페이스 그레이', '스타라이트', '핑크', '퍼플', '블루'],
    ram: '8GB',
    battery: '10090mAh',
    weight: '617g',
    waterResistance: '없음',
    wirelessCharging: false,
    faceId: true,
    fingerprint: false,
    supports5G: true,
    performanceScore: 850000,
    batteryLife: 10
  }
];

// Mock 데이터 함수들 (개발용)
const getMockProducts = async (params) => {
  // 시뮬레이션을 위한 지연
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredProducts = [...mockProducts];
  
  // 카테고리 필터링
  if (params.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === params.category
    );
  }
  
  // 검색어 필터링
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // 가격 범위 필터링
  if (params.minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.salePrice >= parseInt(params.minPrice)
    );
  }
  
  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.salePrice <= parseInt(params.maxPrice)
    );
  }
    // 브랜드 필터링
  if (params.brand) {
    filteredProducts = filteredProducts.filter(product => 
      product.brand.toLowerCase() === params.brand.toLowerCase()
    );
  }
  
  // 재고 필터링
  if (params.inStock) {
    filteredProducts = filteredProducts.filter(product => 
      product.inStock && product.stockCount > 0
    );
  }
  
  // 할인 상품 필터링
  if (params.onSale) {
    filteredProducts = filteredProducts.filter(product => 
      product.salePrice < product.price
    );
  }
  
  return {
    data: filteredProducts,
    total: filteredProducts.length,
    page: parseInt(params.page) || 1,
    limit: parseInt(params.limit) || 12
  };
};

const getMockProduct = async (productId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const product = mockProducts.find(p => p.id === parseInt(productId));
  if (!product) {
    throw new Error('Product not found');
  }
  
  return { data: product };
};

const getMockFeaturedProducts = async (limit = 8) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // 높은 평점과 많은 리뷰 수를 기준으로 추천 상품 선정
  const featured = mockProducts
    .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
    .slice(0, limit);
    
  return { data: featured };
};

const getMockRelatedProducts = async (productId, limit = 4) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const product = mockProducts.find(p => p.id === parseInt(productId));
  if (!product) {
    return { data: [] };
  }
  
  // 같은 카테고리의 다른 상품들을 관련 상품으로 반환
  const related = mockProducts
    .filter(p => p.id !== parseInt(productId) && p.category === product.category)
    .slice(0, limit);
    
  return { data: related };
};

const getMockCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return {
    data: [
      {
        id: 'iphone',
        name: 'iPhone',
        description: 'Apple iPhone 시리즈',
        image: '/asset/category-iphone.png',
        productCount: 4
      },
      {
        id: 'samsung',
        name: 'Samsung',
        description: 'Samsung Galaxy 시리즈',
        image: '/asset/category-samsung.png',
        productCount: 4
      },
      {
        id: 'tablet',
        name: '태블릿',
        description: 'iPad 및 Android 태블릿',
        image: '/asset/category-tablet.png',
        productCount: 4
      },
      {
        id: 'case',
        name: '케이스',
        description: '스마트폰 케이스 및 액세서리',
        image: '/asset/category-case.png',
        productCount: 0
      },
      {
        id: 'earphone',
        name: '이어폰',
        description: '무선 및 유선 이어폰',
        image: '/asset/category-earphone.png',
        productCount: 0
      }
    ]
  };
};

export default productService;