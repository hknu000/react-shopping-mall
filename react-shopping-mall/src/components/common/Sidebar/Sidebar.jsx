import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './Sidebar.jsx';

const Sidebar = ({ isOpen, onClose }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    {
      id: 'electronics',
      name: '전자제품',
      subcategories: [
        { id: 'smartphones', name: '스마트폰' },
        { id: 'laptops', name: '노트북' },
        { id: 'tablets', name: '태블릿' },
        { id: 'accessories', name: '액세서리' }
      ]
    },
    {
      id: 'fashion',
      name: '패션',
      subcategories: [
        { id: 'mens', name: '남성의류' },
        { id: 'womens', name: '여성의류' },
        { id: 'shoes', name: '신발' },
        { id: 'bags', name: '가방' }
      ]
    },
    {
      id: 'home',
      name: '홈&리빙',
      subcategories: [
        { id: 'furniture', name: '가구' },
        { id: 'kitchen', name: '주방용품' },
        { id: 'bedding', name: '침구' },
        { id: 'decor', name: '인테리어' }
      ]
    },
    {
      id: 'beauty',
      name: '뷰티',
      subcategories: [
        { id: 'skincare', name: '스킨케어' },
        { id: 'makeup', name: '메이크업' },
        { id: 'fragrance', name: '향수' },
        { id: 'hair', name: '헤어케어' }
      ]
    },
    {
      id: 'sports',
      name: '스포츠',
      subcategories: [
        { id: 'fitness', name: '운동기구' },
        { id: 'outdoor', name: '아웃도어' },
        { id: 'sportswear', name: '스포츠웨어' }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>카테고리</h3>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link 
                  to="/products" 
                  className="sidebar-link main-link"
                  onClick={handleLinkClick}
                >
                  전체 상품
                </Link>
              </li>
              
              {categories.map((category) => (
                <li key={category.id} className="sidebar-item">
                  <div className="sidebar-category">
                    <Link 
                      to={`/products?category=${category.id}`}
                      className="sidebar-link"
                      onClick={handleLinkClick}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <button 
                        className="category-toggle"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {expandedCategories[category.id] ? 
                          <FaChevronDown /> : <FaChevronRight />
                        }
                      </button>
                    )}
                  </div>
                  
                  {category.subcategories && expandedCategories[category.id] && (
                    <ul className="sidebar-subcategories">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id} className="sidebar-subitem">
                          <Link 
                            to={`/products?category=${category.id}&subcategory=${subcategory.id}`}
                            className="sidebar-sublink"
                            onClick={handleLinkClick}
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-section">
              <h4>고객 서비스</h4>
              <ul className="sidebar-links">
                <li>
                  <Link to="/help" onClick={handleLinkClick}>고객센터</Link>
                </li>
                <li>
                  <Link to="/shipping" onClick={handleLinkClick}>배송 안내</Link>
                </li>
                <li>
                  <Link to="/returns" onClick={handleLinkClick}>교환/반품</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;