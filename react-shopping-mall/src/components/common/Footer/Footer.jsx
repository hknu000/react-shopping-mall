import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-banner"></div>
      <div className="footer-content">
        <div className="company">
          <h3>PHONE DUE</h3>
          <p>상호 : 폰듀플러스 | 대표 : 홍길동 | 사업자등록번호 : 123-45-67890</p>
          <p>전화 : 000-0000-0000 | 이메일 : phonedue@hankyung.ac.kr</p>
          <p>주소 : 경기도 성남시 분당구 정자동 327</p>
          <small>Copyright (c) Hankyung National University. All Rights Reserved.</small>
        </div>
        <div className="social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Naver</a>
        </div>
        <ul className="footer-nav">
          <li><Link to="/products">SHOP</Link></li>
          <li><Link to="/reviews">REVIEW</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/community">COMMUNITY</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;