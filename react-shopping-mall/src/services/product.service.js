import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Mock 데이터
const mockProducts = [
  {
    id: 'galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    price: 1790000,
    originalPrice: 1890000,
    salePrice: 1690000,
    image: '/asset/samsung.s25.ultra.silverblue.png',
    images: [
      '/asset/samsung.s25.ultra.silverblue.png',
      '/asset/samsung.s25.ultra.white.png',
      '/asset/samsung.s25.ultra.black.png',
      '/asset/samsung.s25.ultra.gray.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.8,
    reviewCount: 1567,
    description: '궁극의 성능과 혁신적인 S펜 기능을 결합한 Galaxy S의 궁극 모델',
    features: ['Snapdragon 8 Gen 3', 'S펜 내장', '200MP 카메라', '5000mAh 배터리', 'Galaxy AI'],
    specifications: {
      저장용량: '256GB, 512GB, 1TB',
      카메라: '200MP 메인 + 50MP 페리스코프 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '5000mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '실버블루, 화이트, 블랙, 그레이'
    },
    stockCount: 25,
    tags: ['스마트폰', '갤럭시', '삼성', 'S펜', 'AI', '울트라'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.8인치',
    camera: '200MP 쿼드',
    os: 'Android 15',
    colors: ['실버블루', '화이트', '블랙', '그레이'],
    variants: [
      { id: 'galaxy-s25-ultra-256gb-silverblue', storage: '256GB', color: '실버블루', image: '/asset/samsung.s25.ultra.silverblue.png', salePrice: 1690000, inStock: true },
      { id: 'galaxy-s25-ultra-512gb-silverblue', storage: '512GB', color: '실버블루', image: '/asset/samsung.s25.ultra.silverblue.png', salePrice: 1890000, inStock: true },
      { id: 'galaxy-s25-ultra-1tb-silverblue', storage: '1TB', color: '실버블루', image: '/asset/samsung.s25.ultra.silverblue.png', salePrice: 2090000, inStock: true },
      { id: 'galaxy-s25-ultra-256gb-white', storage: '256GB', color: '화이트', image: '/asset/samsung.s25.ultra.white.png', salePrice: 1690000, inStock: true },
      { id: 'galaxy-s25-ultra-512gb-white', storage: '512GB', color: '화이트', image: '/asset/samsung.s25.ultra.white.png', salePrice: 1890000, inStock: true },
      { id: 'galaxy-s25-ultra-1tb-white', storage: '1TB', color: '화이트', image: '/asset/samsung.s25.ultra.white.png', salePrice: 2090000, inStock: false },
      { id: 'galaxy-s25-ultra-256gb-black', storage: '256GB', color: '블랙', image: '/asset/samsung.s25.ultra.black.png', salePrice: 1690000, inStock: true },
      { id: 'galaxy-s25-ultra-512gb-black', storage: '512GB', color: '블랙', image: '/asset/samsung.s25.ultra.black.png', salePrice: 1890000, inStock: true },
      { id: 'galaxy-s25-ultra-1tb-black', storage: '1TB', color: '블랙', image: '/asset/samsung.s25.ultra.black.png', salePrice: 2090000, inStock: true },
      { id: 'galaxy-s25-ultra-256gb-gray', storage: '256GB', color: '그레이', image: '/asset/samsung.s25.ultra.gray.png', salePrice: 1690000, inStock: true },
      { id: 'galaxy-s25-ultra-512gb-gray', storage: '512GB', color: '그레이', image: '/asset/samsung.s25.ultra.gray.png', salePrice: 1890000, inStock: false },
      { id: 'galaxy-s25-ultra-1tb-gray', storage: '1TB', color: '그레이', image: '/asset/samsung.s25.ultra.gray.png', salePrice: 2090000, inStock: true }
    ]
  },
  {
    id: 'iphone-16',
    name: 'iPhone 16',
    price: 1290000,
    originalPrice: 1290000,
    salePrice: 1190000,
    image: '/asset/apple.iphone16.normal.black.png',
    images: [
      '/asset/apple.iphone16.normal.black.png',
      '/asset/apple.iphone16.normal.white.png',
      '/asset/apple.iphone16.normal.pink.png',
      '/asset/apple.iphone16.normal.teal.png',
      '/asset/apple.iphone16.normal.ultramarine.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.7,
    reviewCount: 1543,
    description: 'A18 칩과 새로운 기능들을 탑재한 차세대 iPhone',
    features: ['A18 칩', '48MP 메인 카메라', '카메라 제어 버튼', 'Action Button', 'iOS 18'],
    specifications: {
      저장용량: '128GB, 256GB, 512GB',
      카메라: '48MP Fusion 카메라',
      배터리: '최대 22시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙, 화이트, 핑크, 틸, 울트라마린'
    },
    stockCount: 38,
    tags: ['스마트폰', '아이폰', '애플', 'A18'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.1인치',
    camera: '48MP 듀얼',
    os: 'iOS 18',
    colors: ['블랙', '화이트', '핑크', '틸', '울트라마린'],
    variants: [
      { id: 'iphone-16-128gb-black', storage: '128GB', color: '블랙', image: '/asset/apple.iphone16.normal.black.png', salePrice: 1190000, inStock: true },
      { id: 'iphone-16-256gb-black', storage: '256GB', color: '블랙', image: '/asset/apple.iphone16.normal.black.png', salePrice: 1350000, inStock: true },
      { id: 'iphone-16-512gb-black', storage: '512GB', color: '블랙', image: '/asset/apple.iphone16.normal.black.png', salePrice: 1670000, inStock: true },
      { id: 'iphone-16-128gb-white', storage: '128GB', color: '화이트', image: '/asset/apple.iphone16.normal.white.png', salePrice: 1190000, inStock: true },
      { id: 'iphone-16-256gb-white', storage: '256GB', color: '화이트', image: '/asset/apple.iphone16.normal.white.png', salePrice: 1350000, inStock: true },
      { id: 'iphone-16-512gb-white', storage: '512GB', color: '화이트', image: '/asset/apple.iphone16.normal.white.png', salePrice: 1670000, inStock: false },
      { id: 'iphone-16-128gb-pink', storage: '128GB', color: '핑크', image: '/asset/apple.iphone16.normal.pink.png', salePrice: 1190000, inStock: true },
      { id: 'iphone-16-256gb-pink', storage: '256GB', color: '핑크', image: '/asset/apple.iphone16.normal.pink.png', salePrice: 1350000, inStock: true },
      { id: 'iphone-16-512gb-pink', storage: '512GB', color: '핑크', image: '/asset/apple.iphone16.normal.pink.png', salePrice: 1670000, inStock: true },
      { id: 'iphone-16-128gb-teal', storage: '128GB', color: '틸', image: '/asset/apple.iphone16.normal.teal.png', salePrice: 1190000, inStock: true },
      { id: 'iphone-16-256gb-teal', storage: '256GB', color: '틸', image: '/asset/apple.iphone16.normal.teal.png', salePrice: 1350000, inStock: true },
      { id: 'iphone-16-512gb-teal', storage: '512GB', color: '틸', image: '/asset/apple.iphone16.normal.teal.png', salePrice: 1670000, inStock: true },
      { id: 'iphone-16-128gb-ultramarine', storage: '128GB', color: '울트라마린', image: '/asset/apple.iphone16.normal.ultramarine.png', salePrice: 1190000, inStock: true },
      { id: 'iphone-16-256gb-ultramarine', storage: '256GB', color: '울트라마린', image: '/asset/apple.iphone16.normal.ultramarine.png', salePrice: 1350000, inStock: false },
      { id: 'iphone-16-512gb-ultramarine', storage: '512GB', color: '울트라마린', image: '/asset/apple.iphone16.normal.ultramarine.png', salePrice: 1670000, inStock: true }
    ]
  },
  {
    id: 'galaxy-s25-plus',
    name: 'Galaxy S25+',
    price: 1490000,
    originalPrice: 1590000,
    salePrice: 1390000,
    image: '/asset/samsung.s25.plus.iceblue.png',
    images: [
      '/asset/samsung.s25.plus.iceblue.png',
      '/asset/samsung.s25.plus.mint.png',
      '/asset/samsung.s25.plus.navy.png',
      '/asset/samsung.s25.plus.silver.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.6,
    reviewCount: 892,
    description: '대화면과 강력한 성능을 결합한 Galaxy S25 시리즈의 플러스 모델',
    features: ['Snapdragon 8 Gen 3', '50MP 트리플 카메라', '4900mAh 배터리', 'Galaxy AI', '6.7인치 Dynamic AMOLED'],
    specifications: {
      저장용량: '256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4900mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '아이시 블루, 민트, 네이비, 실버'
    },
    stockCount: 18,
    tags: ['스마트폰', '갤럭시', '삼성', 'AI', '플러스'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.7인치',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['아이시-블루', '민트', '네이비', '실버'],
    variants: [
      { id: 'galaxy-s25-plus-256gb-iceblue', storage: '256GB', color: '아이시-블루', image: '/asset/samsung.s25.plus.iceblue.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-s25-plus-512gb-iceblue', storage: '512GB', color: '아이시-블루', image: '/asset/samsung.s25.plus.iceblue.png', salePrice: 1590000, inStock: true },
      { id: 'galaxy-s25-plus-256gb-mint', storage: '256GB', color: '민트', image: '/asset/samsung.s25.plus.mint.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-s25-plus-512gb-mint', storage: '512GB', color: '민트', image: '/asset/samsung.s25.plus.mint.png', salePrice: 1590000, inStock: false },
      { id: 'galaxy-s25-plus-256gb-navy', storage: '256GB', color: '네이비', image: '/asset/samsung.s25.plus.navy.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-s25-plus-512gb-navy', storage: '512GB', color: '네이비', image: '/asset/samsung.s25.plus.navy.png', salePrice: 1590000, inStock: true },
      { id: 'galaxy-s25-plus-256gb-silver', storage: '256GB', color: '실버', image: '/asset/samsung.s25.plus.silver.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-s25-plus-512gb-silver', storage: '512GB', color: '실버', image: '/asset/samsung.s25.plus.silver.png', salePrice: 1590000, inStock: true }
    ]
  },
  {
    id: 'galaxy-s25',
    name: 'Galaxy S25',
    price: 1190000,
    originalPrice: 1290000,
    salePrice: 1090000,
    image: '/asset/samsung.s25.normal.iceblue.png',
    images: [
      '/asset/samsung.s25.normal.iceblue.png',
      '/asset/samsung.s25.normal.mint.png',
      '/asset/samsung.s25.normal.navy.png',
      '/asset/samsung.s25.normal.silver.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.5,
    reviewCount: 654,
    description: 'Galaxy AI와 함께하는 새로운 모바일 경험의 시작',
    features: ['Snapdragon 8 Gen 3', '50MP 트리플 카메라', '4000mAh 배터리', 'Galaxy AI', '6.2인치 Dynamic AMOLED'],
    specifications: {
      저장용량: '128GB, 256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4000mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '아이시 블루, 민트, 네이비, 실버'
    },
    stockCount: 32,
    tags: ['스마트폰', '갤럭시', '삼성', 'AI', '베이직'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.2인치',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['아이시-블루', '민트', '네이비', '실버'],
    variants: [
      { id: 'galaxy-s25-128gb-iceblue', storage: '128GB', color: '아이시-블루', image: '/asset/samsung.s25.normal.iceblue.png', salePrice: 1090000, inStock: true },
      { id: 'galaxy-s25-256gb-iceblue', storage: '256GB', color: '아이시-블루', image: '/asset/samsung.s25.normal.iceblue.png', salePrice: 1250000, inStock: true },
      { id: 'galaxy-s25-512gb-iceblue', storage: '512GB', color: '아이시-블루', image: '/asset/samsung.s25.normal.iceblue.png', salePrice: 1450000, inStock: true },
      { id: 'galaxy-s25-128gb-mint', storage: '128GB', color: '민트', image: '/asset/samsung.s25.normal.mint.png', salePrice: 1090000, inStock: true },
      { id: 'galaxy-s25-256gb-mint', storage: '256GB', color: '민트', image: '/asset/samsung.s25.normal.mint.png', salePrice: 1250000, inStock: false },
      { id: 'galaxy-s25-512gb-mint', storage: '512GB', color: '민트', image: '/asset/samsung.s25.normal.mint.png', salePrice: 1450000, inStock: true },
      { id: 'galaxy-s25-128gb-navy', storage: '128GB', color: '네이비', image: '/asset/samsung.s25.normal.navy.png', salePrice: 1090000, inStock: true },
      { id: 'galaxy-s25-256gb-navy', storage: '256GB', color: '네이비', image: '/asset/samsung.s25.normal.navy.png', salePrice: 1250000, inStock: true },
      { id: 'galaxy-s25-512gb-navy', storage: '512GB', color: '네이비', image: '/asset/samsung.s25.normal.navy.png', salePrice: 1450000, inStock: true },
      { id: 'galaxy-s25-128gb-silver', storage: '128GB', color: '실버', image: '/asset/samsung.s25.normal.silver.png', salePrice: 1090000, inStock: true },
      { id: 'galaxy-s25-256gb-silver', storage: '256GB', color: '실버', image: '/asset/samsung.s25.normal.silver.png', salePrice: 1250000, inStock: true },
      { id: 'galaxy-s25-512gb-silver', storage: '512GB', color: '실버', image: '/asset/samsung.s25.normal.silver.png', salePrice: 1450000, inStock: false }
    ]
  },
  {
    id: 'iphone-16-plus',
    name: 'iPhone 16 Plus',
    price: 1490000,
    originalPrice: 1490000,
    salePrice: 1390000,
    image: '/asset/apple.iphone16.plus.black.png',
    images: [
      '/asset/apple.iphone16.plus.black.png',
      '/asset/apple.iphone16.plus.white.png',
      '/asset/apple.iphone16.plus.pink.png',
      '/asset/apple.iphone16.plus.teal.png',
      '/asset/apple.iphone16.plus.ultramarine.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16',
    brand: 'Apple',
    rating: 4.6,
    reviewCount: 743,
    description: '더 큰 화면으로 즐기는 iPhone 16의 모든 기능',
    features: ['A18 칩', '48MP 메인 카메라', '카메라 제어 버튼', 'Action Button', 'iOS 18', '6.7인치 디스플레이'],
    specifications: {
      저장용량: '128GB, 256GB, 512GB',
      카메라: '48MP Fusion 카메라',
      배터리: '최대 27시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙, 화이트, 핑크, 틸, 울트라마린'
    },
    stockCount: 22,
    tags: ['스마트폰', '아이폰', '애플', 'A18', '플러스'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.7인치',
    camera: '48MP 듀얼',
    os: 'iOS 18',
    colors: ['블랙', '화이트', '핑크', '틸', '울트라마린'],
    variants: [
      { id: 'iphone-16-plus-128gb-black', storage: '128GB', color: '블랙', image: '/asset/apple.iphone16.plus.black.png', salePrice: 1390000, inStock: true },
      { id: 'iphone-16-plus-256gb-black', storage: '256GB', color: '블랙', image: '/asset/apple.iphone16.plus.black.png', salePrice: 1550000, inStock: true },
      { id: 'iphone-16-plus-512gb-black', storage: '512GB', color: '블랙', image: '/asset/apple.iphone16.plus.black.png', salePrice: 1870000, inStock: true },
      { id: 'iphone-16-plus-128gb-white', storage: '128GB', color: '화이트', image: '/asset/apple.iphone16.plus.white.png', salePrice: 1390000, inStock: true },
      { id: 'iphone-16-plus-256gb-white', storage: '256GB', color: '화이트', image: '/asset/apple.iphone16.plus.white.png', salePrice: 1550000, inStock: false },
      { id: 'iphone-16-plus-512gb-white', storage: '512GB', color: '화이트', image: '/asset/apple.iphone16.plus.white.png', salePrice: 1870000, inStock: true },
      { id: 'iphone-16-plus-128gb-pink', storage: '128GB', color: '핑크', image: '/asset/apple.iphone16.plus.pink.png', salePrice: 1390000, inStock: true },
      { id: 'iphone-16-plus-256gb-pink', storage: '256GB', color: '핑크', image: '/asset/apple.iphone16.plus.pink.png', salePrice: 1550000, inStock: true },
      { id: 'iphone-16-plus-512gb-pink', storage: '512GB', color: '핑크', image: '/asset/apple.iphone16.plus.pink.png', salePrice: 1870000, inStock: true },
      { id: 'iphone-16-plus-128gb-teal', storage: '128GB', color: '틸', image: '/asset/apple.iphone16.plus.teal.png', salePrice: 1390000, inStock: true },
      { id: 'iphone-16-plus-256gb-teal', storage: '256GB', color: '틸', image: '/asset/apple.iphone16.plus.teal.png', salePrice: 1550000, inStock: true },
      { id: 'iphone-16-plus-512gb-teal', storage: '512GB', color: '틸', image: '/asset/apple.iphone16.plus.teal.png', salePrice: 1870000, inStock: false },
      { id: 'iphone-16-plus-128gb-ultramarine', storage: '128GB', color: '울트라마린', image: '/asset/apple.iphone16.plus.ultramarine.png', salePrice: 1390000, inStock: true },
      { id: 'iphone-16-plus-256gb-ultramarine', storage: '256GB', color: '울트라마린', image: '/asset/apple.iphone16.plus.ultramarine.png', salePrice: 1550000, inStock: true },
      { id: 'iphone-16-plus-512gb-ultramarine', storage: '512GB', color: '울트라마린', image: '/asset/apple.iphone16.plus.ultramarine.png', salePrice: 1870000, inStock: true }
    ]
  },
  {
    id: 'galaxy-z-flip6',
    name: 'Galaxy Z Flip6',
    price: 1490000,
    originalPrice: 1590000,
    salePrice: 1390000,
    image: '/asset/samsung.zflip6.blue.png',
    images: [
      '/asset/samsung.zflip6.blue.png',
      '/asset/samsung.zflip6.mint.png',
      '/asset/samsung.zflip6.silver.png',
      '/asset/samsung.zflip6.yellow.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-z',
    brand: 'Samsung',
    rating: 4.4,
    reviewCount: 567,
    description: '혁신적인 플립 폼팩터로 새로운 모바일 라이프스타일을 제안하는 폴더블 스마트폰',
    features: ['Snapdragon 8 Gen 3', '50MP 듀얼 카메라', '4000mAh 배터리', 'Galaxy AI', '플렉스 모드'],
    specifications: {
      저장용량: '256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드',
      배터리: '4000mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '블루, 민트, 실버, 옐로우'
    },
    stockCount: 15,
    tags: ['스마트폰', '갤럭시', '삼성', 'AI', '폴더블', '플립'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.7인치 (펼쳤을 때)',
    camera: '50MP 듀얼',
    os: 'Android 15',
    colors: ['블루', '민트', '실버', '옐로우'],
    variants: [
      { id: 'galaxy-z-flip6-256gb-blue', storage: '256GB', color: '블루', image: '/asset/samsung.zflip6.blue.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-z-flip6-512gb-blue', storage: '512GB', color: '블루', image: '/asset/samsung.zflip6.blue.png', salePrice: 1590000, inStock: true },
      { id: 'galaxy-z-flip6-256gb-mint', storage: '256GB', color: '민트', image: '/asset/samsung.zflip6.mint.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-z-flip6-512gb-mint', storage: '512GB', color: '민트', image: '/asset/samsung.zflip6.mint.png', salePrice: 1590000, inStock: false },
      { id: 'galaxy-z-flip6-256gb-silver', storage: '256GB', color: '실버', image: '/asset/samsung.zflip6.silver.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-z-flip6-512gb-silver', storage: '512GB', color: '실버', image: '/asset/samsung.zflip6.silver.png', salePrice: 1590000, inStock: true },
      { id: 'galaxy-z-flip6-256gb-yellow', storage: '256GB', color: '옐로우', image: '/asset/samsung.zflip6.yellow.png', salePrice: 1390000, inStock: true },
      { id: 'galaxy-z-flip6-512gb-yellow', storage: '512GB', color: '옐로우', image: '/asset/samsung.zflip6.yellow.png', salePrice: 1590000, inStock: true }
    ]
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    price: 2190000,
    originalPrice: 2190000,
    salePrice: 2090000,
    image: '/asset/apple.iphone16.promax.black.png',
    images: [
      '/asset/apple.iphone16.promax.black.png',
      '/asset/apple.iphone16.promax.white.png',
      '/asset/apple.iphone16.promax.natural.png',
      '/asset/apple.iphone16.promax.desert.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16-pro',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 1234,
    description: 'iPhone의 가장 진보된 기술을 담은 최고급 모델',
    features: ['A18 Pro 칩', '48MP 프로 카메라 시스템', '티타늄 디자인', '120Hz ProMotion', 'Action Button'],
    specifications: {
      저장용량: '256GB, 512GB, 1TB',
      카메라: '48MP 프로 카메라 시스템',
      배터리: '최대 33시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙 티타늄, 화이트 티타늄, 내추럴 티타늄, 데저트 티타늄'
    },
    stockCount: 8,
    tags: ['스마트폰', '아이폰', '애플', 'A18Pro', '프로맥스', '티타늄'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.9인치',
    camera: '48MP 프로',
    os: 'iOS 18',
    colors: ['블랙-티타늄', '화이트-티타늄', '내추럴-티타늄', '데저트-티타늄'],
    variants: [
      { id: 'iphone-16-pro-max-256gb-black', storage: '256GB', color: '블랙-티타늄', image: '/asset/apple.iphone16.promax.black.png', salePrice: 2090000, inStock: true },
      { id: 'iphone-16-pro-max-512gb-black', storage: '512GB', color: '블랙-티타늄', image: '/asset/apple.iphone16.promax.black.png', salePrice: 2410000, inStock: true },
      { id: 'iphone-16-pro-max-1tb-black', storage: '1TB', color: '블랙-티타늄', image: '/asset/apple.iphone16.promax.black.png', salePrice: 2730000, inStock: false },
      { id: 'iphone-16-pro-max-256gb-white', storage: '256GB', color: '화이트-티타늄', image: '/asset/apple.iphone16.promax.white.png', salePrice: 2090000, inStock: true },
      { id: 'iphone-16-pro-max-512gb-white', storage: '512GB', color: '화이트-티타늄', image: '/asset/apple.iphone16.promax.white.png', salePrice: 2410000, inStock: true },
      { id: 'iphone-16-pro-max-1tb-white', storage: '1TB', color: '화이트-티타늄', image: '/asset/apple.iphone16.promax.white.png', salePrice: 2730000, inStock: true },
      { id: 'iphone-16-pro-max-256gb-natural', storage: '256GB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.promax.natural.png', salePrice: 2090000, inStock: true },
      { id: 'iphone-16-pro-max-512gb-natural', storage: '512GB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.promax.natural.png', salePrice: 2410000, inStock: true },
      { id: 'iphone-16-pro-max-1tb-natural', storage: '1TB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.promax.natural.png', salePrice: 2730000, inStock: true },
      { id: 'iphone-16-pro-max-256gb-desert', storage: '256GB', color: '데저트-티타늄', image: '/asset/apple.iphone16.promax.desert.png', salePrice: 2090000, inStock: true },
      { id: 'iphone-16-pro-max-512gb-desert', storage: '512GB', color: '데저트-티타늄', image: '/asset/apple.iphone16.promax.desert.png', salePrice: 2410000, inStock: false },
      { id: 'iphone-16-pro-max-1tb-desert', storage: '1TB', color: '데저트-티타늄', image: '/asset/apple.iphone16.promax.desert.png', salePrice: 2730000, inStock: true }
    ]
  },
  {
    id: 'galaxy-z-fold6',
    name: 'Galaxy Z Fold6',
    price: 2390000,
    originalPrice: 2490000,
    salePrice: 2290000,
    image: '/asset/samsung.zfold6.navy.png',
    images: [
      '/asset/samsung.zfold6.navy.png',
      '/asset/samsung.zfold6.pink.png',
      '/asset/samsung.zfold6.silver.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-z',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 423,
    description: '태블릿과 스마트폰을 하나로 만나는 궁극의 폴더블 디바이스',
    features: ['Snapdragon 8 Gen 3', '50MP 트리플 카메라', '4400mAh 배터리', 'Galaxy AI', 'S펜 호환'],
    specifications: {
      저장용량: '256GB, 512GB, 1TB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4400mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '네이비, 핑크, 실버'
    },
    stockCount: 12,
    tags: ['스마트폰', '갤럭시', '삼성', 'AI', '폴더블', '폴드'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '7.6인치 (펼쳤을 때)',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['네이비', '핑크', '실버'],
    variants: [
      { id: 'galaxy-z-fold6-256gb-navy', storage: '256GB', color: '네이비', image: '/asset/samsung.zfold6.navy.png', salePrice: 2290000, inStock: true },
      { id: 'galaxy-z-fold6-512gb-navy', storage: '512GB', color: '네이비', image: '/asset/samsung.zfold6.navy.png', salePrice: 2490000, inStock: true },
      { id: 'galaxy-z-fold6-1tb-navy', storage: '1TB', color: '네이비', image: '/asset/samsung.zfold6.navy.png', salePrice: 2690000, inStock: false },
      { id: 'galaxy-z-fold6-256gb-pink', storage: '256GB', color: '핑크', image: '/asset/samsung.zfold6.pink.png', salePrice: 2290000, inStock: true },
      { id: 'galaxy-z-fold6-512gb-pink', storage: '512GB', color: '핑크', image: '/asset/samsung.zfold6.pink.png', salePrice: 2490000, inStock: true },
      { id: 'galaxy-z-fold6-1tb-pink', storage: '1TB', color: '핑크', image: '/asset/samsung.zfold6.pink.png', salePrice: 2690000, inStock: true },
      { id: 'galaxy-z-fold6-256gb-silver', storage: '256GB', color: '실버', image: '/asset/samsung.zfold6.silver.png', salePrice: 2290000, inStock: true },
      { id: 'galaxy-z-fold6-512gb-silver', storage: '512GB', color: '실버', image: '/asset/samsung.zfold6.silver.png', salePrice: 2490000, inStock: false },
      { id: 'galaxy-z-fold6-1tb-silver', storage: '1TB', color: '실버', image: '/asset/samsung.zfold6.silver.png', salePrice: 2690000, inStock: true }
    ]
  },
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    price: 1690000,
    originalPrice: 1690000,
    salePrice: 1590000,
    image: '/asset/apple.iphone16.pro.black.png',
    images: [
      '/asset/apple.iphone16.pro.black.png',
      '/asset/apple.iphone16.pro.white.png',
      '/asset/apple.iphone16.pro.natural.png',
      '/asset/apple.iphone16.pro.desert.png'
    ],
    category: 'smartphone',
    subcategory: 'iphone-16-pro',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 891,
    description: 'Pro급 성능과 프로 카메라 시스템을 갖춘 iPhone 16 Pro',
    features: ['A18 Pro 칩', '48MP 프로 카메라 시스템', '티타늄 디자인', '120Hz ProMotion', 'Action Button'],
    specifications: {
      저장용량: '128GB, 256GB, 512GB, 1TB',
      카메라: '48MP 프로 카메라 시스템',
      배터리: '최대 27시간 비디오 재생',
      운영체제: 'iOS 18',
      색상: '블랙 티타늄, 화이트 티타늄, 내추럴 티타늄, 데저트 티타늄'
    },
    stockCount: 15,
    tags: ['스마트폰', '아이폰', '애플', 'A18Pro', '프로', '티타늄'],
    createdAt: '2024-12-15',
    storage: '128GB',
    screenSize: '6.3인치',
    camera: '48MP 프로',
    os: 'iOS 18',
    colors: ['블랙-티타늄', '화이트-티타늄', '내추럴-티타늄', '데저트-티타늄'],
    variants: [
      { id: 'iphone-16-pro-128gb-black', storage: '128GB', color: '블랙-티타늄', image: '/asset/apple.iphone16.pro.black.png', salePrice: 1590000, inStock: true },
      { id: 'iphone-16-pro-256gb-black', storage: '256GB', color: '블랙-티타늄', image: '/asset/apple.iphone16.pro.black.png', salePrice: 1750000, inStock: true },
      { id: 'iphone-16-pro-512gb-black', storage: '512GB', color: '블랙-티타늄', image: '/asset/apple.iphone16.pro.black.png', salePrice: 2070000, inStock: true },
      { id: 'iphone-16-pro-1tb-black', storage: '1TB', color: '블랙-티타늄', image: '/asset/apple.iphone16.pro.black.png', salePrice: 2390000, inStock: false },
      { id: 'iphone-16-pro-128gb-white', storage: '128GB', color: '화이트-티타늄', image: '/asset/apple.iphone16.pro.white.png', salePrice: 1590000, inStock: true },
      { id: 'iphone-16-pro-256gb-white', storage: '256GB', color: '화이트-티타늄', image: '/asset/apple.iphone16.pro.white.png', salePrice: 1750000, inStock: true },
      { id: 'iphone-16-pro-512gb-white', storage: '512GB', color: '화이트-티타늄', image: '/asset/apple.iphone16.pro.white.png', salePrice: 2070000, inStock: true },
      { id: 'iphone-16-pro-1tb-white', storage: '1TB', color: '화이트-티타늄', image: '/asset/apple.iphone16.pro.white.png', salePrice: 2390000, inStock: true },
      { id: 'iphone-16-pro-128gb-natural', storage: '128GB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.pro.natural.png', salePrice: 1590000, inStock: true },
      { id: 'iphone-16-pro-256gb-natural', storage: '256GB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.pro.natural.png', salePrice: 1750000, inStock: true },
      { id: 'iphone-16-pro-512gb-natural', storage: '512GB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.pro.natural.png', salePrice: 2070000, inStock: false },
      { id: 'iphone-16-pro-1tb-natural', storage: '1TB', color: '내추럴-티타늄', image: '/asset/apple.iphone16.pro.natural.png', salePrice: 2390000, inStock: true },
      { id: 'iphone-16-pro-128gb-desert', storage: '128GB', color: '데저트-티타늄', image: '/asset/apple.iphone16.pro.desert.png', salePrice: 1590000, inStock: true },
      { id: 'iphone-16-pro-256gb-desert', storage: '256GB', color: '데저트-티타늄', image: '/asset/apple.iphone16.pro.desert.png', salePrice: 1750000, inStock: true },
      { id: 'iphone-16-pro-512gb-desert', storage: '512GB', color: '데저트-티타늄', image: '/asset/apple.iphone16.pro.desert.png', salePrice: 2070000, inStock: true },
      { id: 'iphone-16-pro-1tb-desert', storage: '1TB', color: '데저트-티타늄', image: '/asset/apple.iphone16.pro.desert.png', salePrice: 2390000, inStock: true }
    ]
  },
  {
    id: 'galaxy-s25-edge',
    name: 'Galaxy S25 Edge',
    price: 1390000,
    originalPrice: 1490000,
    salePrice: 1290000,
    image: '/asset/samsung.s25.edge.iceblue.png',
    images: [
      '/asset/samsung.s25.edge.iceblue.png',
      '/asset/samsung.s25.edge.black.png',
      '/asset/samsung.s25.edge.silver.png'
    ],
    category: 'smartphone',
    subcategory: 'galaxy-s25',
    brand: 'Samsung',
    rating: 4.4,
    reviewCount: 432,
    description: '커브드 엣지 디스플레이와 슬림한 디자인이 특징인 Galaxy S25 Edge',
    features: ['Snapdragon 8 Gen 3', '50MP 트리플 카메라', '4200mAh 배터리', 'Galaxy AI', '6.5인치 Edge 디스플레이'],
    specifications: {
      저장용량: '256GB, 512GB',
      카메라: '50MP 메인 + 12MP 울트라와이드 + 10MP 망원',
      배터리: '4200mAh',
      운영체제: 'Android 15 (One UI 7)',
      색상: '아이시 블루, 블랙, 실버'
    },
    stockCount: 20,
    tags: ['스마트폰', '갤럭시', '삼성', 'AI', '엣지'],
    createdAt: '2024-12-15',
    storage: '256GB',
    screenSize: '6.5인치',
    camera: '50MP 트리플',
    os: 'Android 15',
    colors: ['아이시-블루', '블랙', '실버'],
    variants: [
      { id: 'galaxy-s25-edge-256gb-iceblue', storage: '256GB', color: '아이시-블루', image: '/asset/samsung.s25.edge.iceblue.png', salePrice: 1290000, inStock: true },
      { id: 'galaxy-s25-edge-512gb-iceblue', storage: '512GB', color: '아이시-블루', image: '/asset/samsung.s25.edge.iceblue.png', salePrice: 1490000, inStock: true },
      { id: 'galaxy-s25-edge-256gb-black', storage: '256GB', color: '블랙', image: '/asset/samsung.s25.edge.black.png', salePrice: 1290000, inStock: true },
      { id: 'galaxy-s25-edge-512gb-black', storage: '512GB', color: '블랙', image: '/asset/samsung.s25.edge.black.png', salePrice: 1490000, inStock: false },
      { id: 'galaxy-s25-edge-256gb-silver', storage: '256GB', color: '실버', image: '/asset/samsung.s25.edge.silver.png', salePrice: 1290000, inStock: true },
      { id: 'galaxy-s25-edge-512gb-silver', storage: '512GB', color: '실버', image: '/asset/samsung.s25.edge.silver.png', salePrice: 1490000, inStock: true }
    ]
  }
];

// Mock 함수들
const getMockProducts = (params = {}) => {
  let products = [...mockProducts];
  
  // 검색 필터링
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // 카테고리 필터링
  if (params.category) {
    products = products.filter(product => product.category === params.category);
  }
  
  // 브랜드 필터링
  if (params.brand) {
    products = products.filter(product => product.brand === params.brand);
  }
  
  // 가격 필터링
  if (params.minPrice) {
    products = products.filter(product => (product.salePrice || product.price) >= params.minPrice);
  }
  if (params.maxPrice) {
    products = products.filter(product => (product.salePrice || product.price) <= params.maxPrice);
  }
  
  // 재고 필터링
  if (params.inStock) {
    products = products.filter(product => product.stockCount > 0);
  }
  
  // 할인 상품 필터링
  if (params.onSale) {
    products = products.filter(product => product.salePrice && product.salePrice < product.price);
  }
  
  // 정렬
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price_asc':
        products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price_desc':
        products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'name_asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  }
  
  const totalCount = products.length;
  const page = params.page || 1;
  const limit = params.limit || 8;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: {
      products: paginatedProducts,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: endIndex < totalCount,
      hasPrevPage: page > 1
    }
  };
};

const getMockProduct = (productId) => {
  const product = mockProducts.find(p => p.id === productId);
  return {
    success: !!product,
    data: { product: product || null }
  };
};

const getMockFeaturedProducts = (limit = 16) => {
  // 인기 상품들을 랜덤하게 섞어서 반환
  const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
  return {
    success: true,
    data: shuffled.slice(0, limit)
  };
};

const getMockRelatedProducts = (productId, limit = 4) => {
  const currentProduct = mockProducts.find(p => p.id === productId);
  if (!currentProduct) {
    return { success: false, data: [] };
  }
  
  // 같은 브랜드 또는 카테고리의 상품들을 찾기
  const related = mockProducts.filter(p => 
    p.id !== productId && 
    (p.brand === currentProduct.brand || p.category === currentProduct.category)
  );
  
  return {
    success: true,
    data: related.slice(0, limit)
  };
};

// 서비스 객체
export const productService = {
  getProducts: async (params = {}) => {
    if (process.env.NODE_ENV === 'development') {
      return getMockProducts(params);
    }
    return await api.get(API_ENDPOINTS.PRODUCTS.LIST);
  },

  getProduct: async (productId) => {
    if (process.env.NODE_ENV === 'development') {
      return getMockProduct(productId);
    }
    return await api.get(`${API_ENDPOINTS.PRODUCTS.DETAIL}/${productId}`);
  },

  getFeaturedProducts: async (limit = 8) => {
    if (process.env.NODE_ENV === 'development') {
      return getMockFeaturedProducts(limit);
    }
    return await api.get(`${API_ENDPOINTS.PRODUCTS.FEATURED}?limit=${limit}`);
  },

  getRelatedProducts: async (productId, limit = 4) => {
    if (process.env.NODE_ENV === 'development') {
      return getMockRelatedProducts(productId, limit);
    }
    return await api.get(`/products/${productId}/related?limit=${limit}`);
  },

  searchProducts: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    return await productService.getProducts(params);
  },

  getProductsByCategory: async (category, filters = {}) => {
    const params = { category, ...filters };
    return await productService.getProducts(params);
  }
};

export default productService;