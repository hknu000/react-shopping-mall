# React 쇼핑몰 프로젝트 생성 스크립트
# 작성자: hknu000
# 작성일: 2025-06-03

Write-Host "🛍️ React 쇼핑몰 프로젝트 생성을 시작합니다..." -ForegroundColor Green

# 프로젝트 이름 설정
$projectName = "react-shopping-mall"

# Node.js 및 npm 설치 확인
Write-Host "📋 시스템 요구사항을 확인하는 중..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js가 설치되어 있지 않습니다. https://nodejs.org에서 설치해주세요." -ForegroundColor Red
    exit 1
}

# Create React App으로 프로젝트 생성
Write-Host "🚀 React 프로젝트를 생성하는 중..." -ForegroundColor Yellow
npx create-react-app $projectName

# 프로젝트 디렉토리로 이동
Set-Location $projectName

# 추가 패키지 설치
Write-Host "📦 필요한 패키지들을 설치하는 중..." -ForegroundColor Yellow
npm install react-router-dom axios styled-components react-icons

# 개발용 패키지 설치
npm install --save-dev prettier eslint-config-prettier

# 기본 폴더 구조 생성
Write-Host "📁 폴더 구조를 생성하는 중..." -ForegroundColor Yellow

# src 하위 폴더들 생성
$folders = @(
    "src/components/common/Header",
    "src/components/common/Footer", 
    "src/components/common/Navbar",
    "src/components/common/Sidebar",
    "src/components/common/Loading",
    "src/components/layout",
    "src/components/product/ProductCard",
    "src/components/product/ProductList", 
    "src/components/product/ProductDetail",
    "src/components/product/ProductFilter",
    "src/components/cart/CartItem",
    "src/components/cart/CartSummary",
    "src/components/cart/CartModal",
    "src/components/auth/LoginForm",
    "src/components/auth/RegisterForm",
    "src/components/auth/ProfileForm",
    "src/components/payment/CheckoutForm",
    "src/components/payment/PaymentMethod",
    "src/components/payment/OrderSummary",
    "src/pages/Home",
    "src/pages/Products", 
    "src/pages/ProductDetail",
    "src/pages/Cart",
    "src/pages/Checkout",
    "src/pages/Login",
    "src/pages/Register", 
    "src/pages/Profile",
    "src/pages/Order",
    "src/hooks",
    "src/context",
    "src/services", 
    "src/utils",
    "src/styles",
    "src/assets/images",
    "src/assets/icons",
    "src/assets/fonts",
    "public/images/products",
    "public/images/logos"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "✅ 생성됨: $folder" -ForegroundColor Gray
}

Write-Host "🎯 기본 파일들을 생성하는 중..." -ForegroundColor Yellow

# .env 파일 생성
@"
# API 설정
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=React Shopping Mall

# 기타 설정
REACT_APP_VERSION=1.0.0
"@ | Out-File -FilePath ".env" -Encoding UTF8

# .gitignore 추가 내용
@"

# 환경 변수
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# 로그
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@ | Add-Content -Path ".gitignore" -Encoding UTF8

# README.md 생성
@"
# React Shopping Mall

React를 사용하여 제작된 현대적인 쇼핑몰 웹사이트입니다.

## 🚀 시작하기

### 설치
\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행
\`\`\`bash
npm start
\`\`\`

### 빌드
\`\`\`bash
npm run build
\`\`\`

## 📋 주요 기능

- 🛍️ 상품 목록 및 상세 보기
- 🛒 장바구니 관리
- 👤 사용자 인증 (로그인/회원가입)
- 💳 결제 시스템
- 📱 반응형 디자인

## 🛠️ 기술 스택

- React 18
- React Router
- Axios
- Styled Components
- React Icons

## 📁 프로젝트 구조

\`\`\`
src/
├── components/     # 재사용 가능한 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # 커스텀 훅
├── context/       # Context API
├── services/      # API 서비스
├── utils/         # 유틸리티 함수
└── styles/        # 글로벌 스타일
\`\`\`

## 👨‍💻 개발자

- hknu000

---
생성일: $(Get-Date -Format "yyyy-MM-dd")
"@ | Out-File -FilePath "README.md" -Encoding UTF8

# package.json에 스크립트 추가
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageJson.scripts | Add-Member -MemberType NoteProperty -Name "format" -Value "prettier --write src/**/*.{js,jsx,css,md}"
$packageJson.scripts | Add-Member -MemberType NoteProperty -Name "lint" -Value "eslint src/**/*.{js,jsx}"
$packageJson | ConvertTo-Json -Depth 10 | Out-File "package.json" -Encoding UTF8

# 기본 컴포넌트 파일들 생성
Write-Host "🎨 기본 컴포넌트 파일들을 생성하는 중..." -ForegroundColor Yellow

# Layout 컴포넌트
@"
import React from 'react';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
"@ | Out-File -FilePath "src/components/layout/Layout.jsx" -Encoding UTF8

# Layout CSS
@"
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
"@ | Out-File -FilePath "src/components/layout/Layout.css" -Encoding UTF8

# Header 컴포넌트
@"
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Shopping Mall</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/products">상품</a></li>
            <li><a href="/cart">장바구니</a></li>
            <li><a href="/login">로그인</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
"@ | Out-File -FilePath "src/components/common/Header/Header.jsx" -Encoding UTF8

# Header CSS
@"
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: #333;
  margin: 0;
  font-size: 1.5rem;
}

.nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: #007bff;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }
  
  .nav ul {
    gap: 1rem;
  }
}
"@ | Out-File -FilePath "src/components/common/Header/Header.css" -Encoding UTF8

# Footer 컴포넌트
@"
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2025 Shopping Mall. All rights reserved.</p>
        <p>Made by hknu000</p>
      </div>
    </footer>
  );
};

export default Footer;
"@ | Out-File -FilePath "src/components/common/Footer/Footer.jsx" -Encoding UTF8

# Footer CSS
@"
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer p {
  margin: 0.5rem 0;
}
"@ | Out-File -FilePath "src/components/common/Footer/Footer.css" -Encoding UTF8

# Home 페이지
@"
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to Shopping Mall</h1>
        <p>최고의 상품을 만나보세요!</p>
        <button className="cta-button">쇼핑 시작하기</button>
      </div>
    </div>
  );
};

export default Home;
"@ | Out-File -FilePath "src/pages/Home/Home.jsx" -Encoding UTF8

# Home CSS
@"
.home {
  text-align: center;
}

.hero-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #fff;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-section {
    padding: 2rem 1rem;
  }
}
"@ | Out-File -FilePath "src/pages/Home/Home.css" -Encoding UTF8

# 수정된 App.js
@"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
"@ | Out-File -FilePath "src/App.js" -Encoding UTF8

# 글로벌 스타일
@"
/* 글로벌 변수 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  --border-radius: 0.375rem;
  --box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

/* 기본 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  line-height: 1.6;
  color: var(--dark-color);
  background-color: #f5f5f5;
}

/* 공통 유틸리티 클래스 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* 반응형 유틸리티 */
.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}
"@ | Out-File -FilePath "src/styles/globals.css" -Encoding UTF8

# index.css 업데이트
@"
@import './styles/globals.css';

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
"@ | Out-File -FilePath "src/index.css" -Encoding UTF8

# prettier 설정 파일
@"
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
"@ | ConvertTo-Json | Out-File -FilePath ".prettierrc" -Encoding UTF8

Write-Host "🎉 프로젝트 생성이 완료되었습니다!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 다음 단계:" -ForegroundColor Cyan
Write-Host "1. cd $projectName" -ForegroundColor Yellow
Write-Host "2. npm start" -ForegroundColor Yellow  
Write-Host ""
Write-Host "🌐 개발 서버가 http://localhost:3000 에서 실행됩니다." -ForegroundColor Green
Write-Host ""
Write-Host "💡 추가 명령어:" -ForegroundColor Cyan
Write-Host "- npm run format  # 코드 포맷팅" -ForegroundColor Gray
Write-Host "- npm run build   # 프로덕션 빌드" -ForegroundColor Gray
Write-Host "- npm test        # 테스트 실행" -ForegroundColor Gray

Write-Host ""
Write-Host "🚀 React 쇼핑몰 프로젝트가 성공적으로 생성되었습니다!" -ForegroundColor Green
Write-Host "Happy coding! 🎯" -ForegroundColor Magenta