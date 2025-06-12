import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
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
    <header className="header">
      <div className="header-container">        <div className="header-left">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <h1>📱 PhoneDue</h1>
          </Link>
        </div>

        <div className="header-center">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">              <input
                type="text"
                placeholder="iPhone, Galaxy, Pixel 등 스마트폰을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>

        <div className="header-right">
          <nav className={`nav ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                  홈
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" onClick={closeMobileMenu}>
                  상품
                </Link>
              </li>
              <li className="nav-item cart-item">
                <Link to="/cart" className="nav-link cart-link" onClick={closeMobileMenu}>
                  <FaShoppingCart />
                  <span className="cart-text">장바구니</span>
                  {cartItemsCount > 0 && (
                    <span className="cart-badge">{cartItemsCount}</span>
                  )}
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item dropdown">
                    <button className="nav-link user-menu">
                      <FaUser />
                      <span className="user-name">{user.name}</span>
                    </button>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item" onClick={closeMobileMenu}>
                        프로필
                      </Link>
                      <Link to="/orders" className="dropdown-item" onClick={closeMobileMenu}>
                        주문내역
                      </Link>
                      <button 
                        className="dropdown-item logout-btn" 
                        onClick={handleLogout}
                      >
                        로그아웃
                      </button>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                      로그인
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link 
                      to="/register" 
                      className="nav-link btn-register" 
                      onClick={closeMobileMenu}
                    >
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="메뉴 토글"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;