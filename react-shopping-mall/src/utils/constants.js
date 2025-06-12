// API 관련 상수
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    FEATURED: '/products/featured',
    CATEGORIES: '/products/categories',
    SEARCH: '/products/search'
  },
  CART: {
    LIST: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
    CLEAR: '/cart/clear'
  },
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: '/orders/:id',
    CANCEL: '/orders/:id/cancel'
  }
};

// 스마트폰 브랜드 카테고리
export const PRODUCT_CATEGORIES = {
  IPHONE: {
    id: 'iphone',
    name: 'iPhone',
    icon: '🍎',
    subcategories: [
      { id: 'iphone-16', name: 'iPhone 16 시리즈' },
      { id: 'iphone-15', name: 'iPhone 15 시리즈' },
      { id: 'iphone-14', name: 'iPhone 14 시리즈' },
      { id: 'iphone-se', name: 'iPhone SE' },
      { id: 'iphone-accessories', name: 'iPhone 액세서리' }
    ]
  },
  SAMSUNG: {
    id: 'samsung',
    name: 'Samsung Galaxy',
    icon: '📱',
    subcategories: [
      { id: 'galaxy-s25', name: 'Galaxy S25 시리즈' },
      { id: 'galaxy-z-fold6', name: 'Galaxy Z Fold6' },
      { id: 'galaxy-z-flip6', name: 'Galaxy Z Flip6' },
      { id: 'galaxy-a', name: 'Galaxy A 시리즈' },
      { id: 'samsung-accessories', name: 'Samsung 액세서리' }
    ]
  },
  XIAOMI: {
    id: 'xiaomi',
    name: 'Xiaomi',
    icon: '🤖',
    subcategories: [
      { id: 'mi', name: 'Mi 시리즈' },
      { id: 'redmi', name: 'Redmi 시리즈' },
      { id: 'poco', name: 'POCO 시리즈' },
      { id: 'xiaomi-accessories', name: 'Xiaomi 액세서리' }
    ]
  },
  GOOGLE: {
    id: 'google',
    name: 'Google Pixel',
    icon: '🎯',
    subcategories: [
      { id: 'pixel-8', name: 'Pixel 8 시리즈' },
      { id: 'pixel-7', name: 'Pixel 7 시리즈' },
      { id: 'pixel-a', name: 'Pixel a 시리즈' },
      { id: 'pixel-accessories', name: 'Pixel 액세서리' }
    ]
  },
  ONEPLUS: {
    id: 'oneplus',
    name: 'OnePlus',
    icon: '🚀',
    subcategories: [
      { id: 'oneplus-11', name: 'OnePlus 11 시리즈' },
      { id: 'oneplus-nord', name: 'OnePlus Nord' },
      { id: 'oneplus-accessories', name: 'OnePlus 액세서리' }
    ]
  },
  ACCESSORIES: {
    id: 'accessories',
    name: '액세서리',
    icon: '🎧',
    subcategories: [
      { id: 'cases', name: '케이스' },
      { id: 'screen-protectors', name: '화면보호필름' },
      { id: 'chargers', name: '충전기' },
      { id: 'earphones', name: '이어폰/헤드폰' },
      { id: 'powerbanks', name: '보조배터리' },
      { id: 'wireless-chargers', name: '무선충전기' }
    ]
  }
};

// 스마트폰 스펙 필터
export const PHONE_SPECS = {
  STORAGE: [
    { value: '64gb', label: '64GB' },
    { value: '128gb', label: '128GB' },
    { value: '256gb', label: '256GB' },
    { value: '512gb', label: '512GB' },
    { value: '1tb', label: '1TB' }
  ],
  RAM: [
    { value: '4gb', label: '4GB' },
    { value: '6gb', label: '6GB' },
    { value: '8gb', label: '8GB' },
    { value: '12gb', label: '12GB' },
    { value: '16gb', label: '16GB' }
  ],
  SCREEN_SIZE: [
    { value: '5.4', label: '5.4인치 이하' },
    { value: '6.1', label: '6.1인치' },
    { value: '6.7', label: '6.7인치' },
    { value: '6.8', label: '6.8인치 이상' }
  ],
  COLORS: [
    { value: 'black', label: '블랙', hex: '#000000' },
    { value: 'white', label: '화이트', hex: '#FFFFFF' },
    { value: 'blue', label: '블루', hex: '#007AFF' },
    { value: 'red', label: '레드', hex: '#FF3B30' },
    { value: 'purple', label: '퍼플', hex: '#AF52DE' },
    { value: 'gold', label: '골드', hex: '#FFD700' },
    { value: 'silver', label: '실버', hex: '#C0C0C0' },
    { value: 'green', label: '그린', hex: '#34C759' }
  ]
};

// 정렬 옵션
export const SORT_OPTIONS = [
  { value: 'latest', label: '최신순', sortBy: 'newest', sortOrder: 'desc' },
  { value: 'popular', label: '인기순', sortBy: 'rating', sortOrder: 'desc' },
  { value: 'price-low', label: '낮은 가격순', sortBy: 'price_asc', sortOrder: 'asc' },
  { value: 'price-high', label: '높은 가격순', sortBy: 'price_desc', sortOrder: 'desc' },
  { value: 'rating', label: '평점순', sortBy: 'rating', sortOrder: 'desc' },
  { value: 'name', label: '이름순', sortBy: 'name', sortOrder: 'asc' }
];

// 배송 관련 상수
export const SHIPPING = {
  FREE_SHIPPING_THRESHOLD: 100000, // 무료배송 기준금액 (10만원)
  STANDARD_SHIPPING_COST: 3000,   // 일반배송비
  EXPRESS_SHIPPING_COST: 5000,    // 특급배송비
  DELIVERY_DAYS: {
    STANDARD: '2-3일',
    EXPRESS: '당일/익일'
  }
};

// 결제 관련 상수
export const PAYMENT_METHODS = {
  CARD: { id: 'card', name: '신용카드', icon: '💳' },
  BANK_TRANSFER: { id: 'bank', name: '계좌이체', icon: '🏦' },
  VIRTUAL_ACCOUNT: { id: 'virtual', name: '가상계좌', icon: '🧾' },
  MOBILE: { id: 'mobile', name: '휴대폰결제', icon: '📱' },
  KAKAO_PAY: { id: 'kakao', name: '카카오페이', icon: '💛' },
  SAMSUNG_PAY: { id: 'samsung', name: '삼성페이', icon: '💳' },
  APPLE_PAY: { id: 'apple', name: 'Apple Pay', icon: '🍎' },
  PAYPAL: { id: 'paypal', name: 'PayPal', icon: '🅿️' }
};

// 주문 상태
export const ORDER_STATUS = {
  PENDING: { id: 'pending', name: '결제대기', color: '#ffc107' },
  PAID: { id: 'paid', name: '결제완료', color: '#28a745' },
  PROCESSING: { id: 'processing', name: '상품준비중', color: '#17a2b8' },
  SHIPPED: { id: 'shipped', name: '배송중', color: '#6f42c1' },
  DELIVERED: { id: 'delivered', name: '배송완료', color: '#20c997' },
  CANCELLED: { id: 'cancelled', name: '취소됨', color: '#dc3545' },
  REFUNDED: { id: 'refunded', name: '환불됨', color: '#6c757d' }
};

// 응답 메시지
export const MESSAGES = {
  SUCCESS: {
    LOGIN: '로그인이 완료되었습니다.',
    LOGOUT: '로그아웃되었습니다.',
    REGISTER: '회원가입이 완료되었습니다.',
    PROFILE_UPDATE: '프로필이 업데이트되었습니다.',
    PASSWORD_CHANGE: '비밀번호가 변경되었습니다.',
    ADD_TO_CART: '장바구니에 상품이 추가되었습니다.',
    REMOVE_FROM_CART: '상품이 장바구니에서 제거되었습니다.',
    ORDER_COMPLETE: '주문이 완료되었습니다.',
    ORDER_CANCEL: '주문이 취소되었습니다.'
  },
  ERROR: {
    NETWORK: '네트워크 오류가 발생했습니다.',
    SERVER: '서버 오류가 발생했습니다.',
    AUTH_REQUIRED: '로그인이 필요합니다.',
    INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
    USER_EXISTS: '이미 가입된 이메일입니다.',
    PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
    OUT_OF_STOCK: '재고가 부족합니다.',
    PAYMENT_FAILED: '결제에 실패했습니다.'
  }
};

// PhoneDue 브랜드 관련 상수
export const BRAND_INFO = {
  NAME: 'PhoneDue',
  SLOGAN: '스마트한 선택, 완벽한 스마트폰',
  DESCRIPTION: '최고의 스마트폰을 합리적인 가격에 만나보세요',
  COLORS: {
    PRIMARY: '#007AFF',
    SECONDARY: '#FF6B35',
    SUCCESS: '#34C759',
    WARNING: '#FF9500',
    ERROR: '#FF3B30',
    DARK: '#1C1C1E',
    LIGHT: '#F2F2F7'
  }
};

// 정규식 패턴
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^01[0-9]-\d{3,4}-\d{4}$/,
  PASSWORD: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  KOREAN_NAME: /^[가-힣]{2,5}$/,
  POSTAL_CODE: /^\d{5}$/
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  USER: 'phonedue_user',
  TOKEN: 'phonedue_token',
  CART_ITEMS: 'phonedue_cart',
  RECENT_SEARCHES: 'phonedue_searches',
  WISHLIST: 'phonedue_wishlist',
  THEME: 'phonedue_theme'
};

// 기본 설정
export const DEFAULT_SETTINGS = {
  ITEMS_PER_PAGE: 12,
  SEARCH_RESULTS_PER_PAGE: 20,
  MAX_CART_ITEMS: 10,
  IMAGE_QUALITY: 'high',
  CURRENCY: 'KRW',
  LANGUAGE: 'ko'
};

// 스마트폰 인기 검색어
export const POPULAR_SEARCHES = [
  'iPhone 16',
  'iPhone 16 Pro',
  'Galaxy S25 Ultra',
  'Galaxy Z Fold6',
  'Galaxy Z Flip6',
  'iPhone SE',
  '무선충전기',
  '에어팟 프로',
  '갤럭시 버즈',
  '화면보호필름'
];

export const APP_CONFIG = {
  MAX_RECENT_SEARCHES: 10,
  PRODUCT_IMAGE_PLACEHOLDER: '/images/placeholder-product.svg',
  USER_AVATAR_PLACEHOLDER: '/images/placeholder-avatar.svg'
};