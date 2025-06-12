import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
          <Link to="/" onClick={closeMobileMenu}>
            PHONE<br />DUE
          </Link>
        </div>
        <nav className="global-nav">
          <ul>
            <li><Link to="/products?category=phonedue-plus">Phone Due Plus</Link></li>
            <li><Link to="/support">고객지원</Link></li>
            {user ? (
              <li><button onClick={handleLogout}>Sign out</button></li>
            ) : (
              <li><Link to="/login">Sign in</Link></li>
            )}
            <li><Link to="/profile">마이페이지</Link></li>
          </ul>
          <div className="search-cart">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="icon search">🔍</button>
            <Link to="/cart" className="icon cart">
              🛒
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
            <button className="icon menu" onClick={toggleMobileMenu}>☰</button>
          </div>
        </nav>
      </div>      <nav className="main-nav">
        <ul>
          <li><Link to="/products?category=smartphone">스마트폰</Link></li>
          <li><Link to="/products?category=tablet">태블릿</Link></li>
          <li><Link to="/products?category=accessories">액세서리</Link></li>
          <li><Link to="/events">이벤트</Link></li>
          <li><Link to="/special">기획전</Link></li>
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <span>메뉴</span>
            <button onClick={closeMobileMenu}>
              <FaTimes />
            </button>
          </div>          <ul className="mobile-nav-list">
            <li><Link to="/products?category=smartphone" onClick={closeMobileMenu}>스마트폰</Link></li>
            <li><Link to="/products?category=tablet" onClick={closeMobileMenu}>태블릿</Link></li>
            <li><Link to="/products?category=accessories" onClick={closeMobileMenu}>액세서리</Link></li>
            <li><Link to="/events" onClick={closeMobileMenu}>이벤트</Link></li>
            <li><Link to="/special" onClick={closeMobileMenu}>기획전</Link></li>
            {user ? (
              <>
                <li><Link to="/profile" onClick={closeMobileMenu}>마이페이지</Link></li>
                <li><Link to="/orders" onClick={closeMobileMenu}>주문내역</Link></li>
                <li><button onClick={handleLogout}>로그아웃</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMobileMenu}>로그인</Link></li>
                <li><Link to="/register" onClick={closeMobileMenu}>회원가입</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;