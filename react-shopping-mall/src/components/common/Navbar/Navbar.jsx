import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const categories = [
    { id: 'all', name: '전체상품', path: '/products' },
    { id: 'electronics', name: '전자제품', path: '/products?category=electronics' },
    { id: 'fashion', name: '패션', path: '/products?category=fashion' },
    { id: 'home', name: '홈&리빙', path: '/products?category=home' },
    { id: 'beauty', name: '뷰티', path: '/products?category=beauty' },
    { id: 'sports', name: '스포츠', path: '/products?category=sports' },
    { id: 'books', name: '도서', path: '/products?category=books' },
    { id: 'food', name: '식품', path: '/products?category=food' }
  ];

  const isActive = (path) => {
    if (path === '/products' && location.pathname === '/products' && !location.search) {
      return true;
    }
    return location.pathname + location.search === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-list">
          {categories.map((category) => (
            <li key={category.id} className="navbar-item">
              <Link 
                to={category.path}
                className={`navbar-link ${isActive(category.path) ? 'active' : ''}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;