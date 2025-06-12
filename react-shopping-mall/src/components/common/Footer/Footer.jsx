import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-container">          <div className="footer-section">
            <div className="footer-brand">
              <h3>📱 PhoneDue</h3>
              <p>
                최신 스마트폰과 전문적인 서비스를 제공하는 스마트폰 전문 쇼핑몰입니다. 
                모든 고객이 완벽한 스마트폰을 찾을 수 있도록 도와드립니다.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook" className="social-link">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" aria-label="Twitter" className="social-link">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" aria-label="Instagram" className="social-link">
                  <FaInstagram />
                </a>
                <a href="https://youtube.com" aria-label="YouTube" className="social-link">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>          <div className="footer-section">
            <h4>스마트폰 브랜드</h4>
            <ul className="footer-links">
              <li><Link to="/products">전체 상품</Link></li>
              <li><Link to="/products?category=iphone">iPhone</Link></li>
              <li><Link to="/products?category=samsung">Samsung Galaxy</Link></li>
              <li><Link to="/products?category=xiaomi">Xiaomi</Link></li>
              <li><Link to="/products?category=google">Google Pixel</Link></li>
              <li><Link to="/products?category=oneplus">OnePlus</Link></li>
              <li><Link to="/products?category=accessories">액세서리</Link></li>
            </ul>
          </div>          <div className="footer-section">
            <h4>고객 서비스</h4>
            <ul className="footer-links">
              <li><Link to="/help">고객센터</Link></li>
              <li><Link to="/shipping">배송 안내</Link></li>
              <li><Link to="/returns">교환/반품</Link></li>
              <li><Link to="/trial">7일 무료 체험</Link></li>
              <li><Link to="/consultation">전문가 상담</Link></li>
              <li><Link to="/faq">자주 묻는 질문</Link></li>
              <li><Link to="/terms">이용약관</Link></li>
              <li><Link to="/privacy">개인정보처리방침</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>회사 정보</h4>
            <ul className="footer-links">
              <li><Link to="/about">회사 소개</Link></li>
              <li><Link to="/careers">채용 정보</Link></li>
              <li><Link to="/press">보도자료</Link></li>
              <li><Link to="/investors">투자자 정보</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>연락처</h4>
            <div className="contact-info">              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <p>스마트폰 전문 상담센터</p>
                  <p className="contact-detail">1588-8888</p>
                  <small>평일 09:00 - 20:00 / 주말 10:00 - 18:00</small>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <p>이메일</p>
                  <p className="contact-detail">support@phonedue.com</p>
                </div>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <p>주소</p>
                  <p className="contact-detail">
                    서울시 강남구 테헤란로 456<br />
                    PhoneDue 타워 12층
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">            <div className="copyright">
              <p>&copy; {currentYear} PhoneDue. All rights reserved.</p>
              <p>Made by <strong>hknu000</strong></p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/terms">이용약관</Link>
              <Link to="/privacy">개인정보처리방침</Link>
              <Link to="/sitemap">사이트맵</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;