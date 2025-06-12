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
          </ul>          <div className="search-cart">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="icon search">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
                <path d="M782-82 523-341q-29 20-67.5 32T372-297q-118 0-200.5-82.5T89-580q0-118 82.5-200.5T372-863q118 0 200.5 82.5T655-580q0 46-12 83.5T611-431l260 261-89 88ZM372-423q66 0 111.5-45.5T529-580q0-66-45.5-111.5T372-737q-66 0-111.5 45.5T215-580q0 66 45.5 111.5T372-423Z"/>
              </svg>
            </button>
            <Link to="/cart" className="icon cart">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333">
                <path d="M280-65q-33 0-56.5-23.5T200-145q0-33 23.5-56.5T280-225q33 0 56.5 23.5T360-145q0 33-23.5 56.5T280-65Zm400 0q-33 0-56.5-23.5T600-145q0-33 23.5-56.5T680-225q33 0 56.5 23.5T760-145q0 33-23.5 56.5T680-65ZM271-705l73 154h276l84-154H271Zm-54-110h552q40.62 0 61.81 35.5Q852-744 832-707L713-490q-13 23-34.95 36.5Q656.1-440 630-440H341l-35 65h469v110H280q-56 0-83-47.5t-1-93.5l51-90-136-289H25v-110h154l38 80Zm127 264h276-276Z"/>
              </svg>
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>            <button className="icon menu" onClick={toggleMobileMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="6" width="18" height="2" fill="#333"/>
                <rect x="3" y="11" width="18" height="2" fill="#333"/>
                <rect x="3" y="16" width="18" height="2" fill="#333"/>
              </svg>
            </button>
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