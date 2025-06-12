import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { validateEmail, validatePassword, formatPhoneNumber } from '../../utils/helpers';
import Loading from '../../components/common/Loading/Loading';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    gender: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const from = location.state?.from || '/';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // 전화번호 자동 포맷팅
    if (name === 'phone') {
      newValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // 실시간 유효성 검사
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // 비밀번호 강도 체크
    if (name === 'password') {
      checkPasswordStrength(newValue);
    }
  };

  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push('8자 이상');
    }

    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('소문자 포함');
    }

    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('대문자 포함');
    }

    if (/[0-9]/.test(password)) {
      score += 12.5;
    } else {
      feedback.push('숫자 포함');
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 12.5;
    } else {
      feedback.push('특수문자 포함');
    }

    setPasswordStrength({ score, feedback });
  };

  const validateForm = () => {
    const newErrors = {};

    // 이름 검증
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '이름은 2자 이상이어야 합니다.';
    }

    // 이메일 검증
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    // 전화번호 검증
    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다.';
    }

    // 생년월일 검증
    if (!formData.birthDate) {
      newErrors.birthDate = '생년월일을 선택해주세요.';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 14) {
        newErrors.birthDate = '14세 이상만 가입할 수 있습니다.';
      }
    }

    // 약관 동의 검증
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요.';
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = '개인정보처리방침에 동의해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        agreeMarketing: formData.agreeMarketing
      };

      const result = await register(userData);
      
      if (result.success) {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login', { state: { from } });
      } else {
        setErrors({ submit: result.error || '회원가입에 실패했습니다.' });
      }
    } catch (error) {
      setErrors({ submit: '네트워크 오류가 발생했습니다.' });
    }
  };

  const handleAllAgree = (checked) => {
    setFormData(prev => ({
      ...prev,
      agreeTerms: checked,
      agreePrivacy: checked,
      agreeMarketing: checked
    }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score < 25) return '#dc3545';
    if (passwordStrength.score < 50) return '#fd7e14';
    if (passwordStrength.score < 75) return '#ffc107';
    return '#28a745';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score < 25) return '약함';
    if (passwordStrength.score < 50) return '보통';
    if (passwordStrength.score < 75) return '강함';
    return '매우 강함';
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">          <div className="register-header">
            <Link to="/" className="logo">
              <h1>📱 PhoneDue</h1>
            </Link>
            <h2>회원가입</h2>
            <p>PhoneDue 스마트폰 전문몰에 오신 것을 환영합니다</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="error-message">
                {errors.submit}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  이름 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="이름을 입력하세요"
                  autoComplete="name"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일 주소 <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="이메일을 입력하세요"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  비밀번호 <span className="required">*</span>
                </label>
                <div className="password-input-group">
                  <input
                    type={showPassword.password ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(prev => ({ 
                      ...prev, 
                      password: !prev.password 
                    }))}
                  >
                    {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{ 
                          width: `${passwordStrength.score}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <div className="strength-text">
                      강도: <span style={{ color: getPasswordStrengthColor() }}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="strength-feedback">
                        필요: {passwordStrength.feedback.join(', ')}
                      </div>
                    )}
                  </div>
                )}
                
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  비밀번호 확인 <span className="required">*</span>
                </label>
                <div className="password-input-group">
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="비밀번호를 다시 입력하세요"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(prev => ({ 
                      ...prev, 
                      confirmPassword: !prev.confirmPassword 
                    }))}
                  >
                    {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formData.confirmPassword && formData.password && (
                    <div className="password-match-indicator">
                      {formData.password === formData.confirmPassword ? (
                        <FaCheck className="match-icon success" />
                      ) : (
                        <FaTimes className="match-icon error" />
                      )}
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  전화번호 <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">
                  생년월일 <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.birthDate && (
                  <div className="invalid-feedback">{errors.birthDate}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  성별
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            <div className="agreements-section">
              <h4>약관 동의</h4>
              
              <label className="agreement-item all-agree">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms && formData.agreePrivacy && formData.agreeMarketing}
                  onChange={(e) => handleAllAgree(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="agreement-text">전체 동의</span>
              </label>

              <div className="agreement-list">
                <label className={`agreement-item ${errors.agreeTerms ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span className="agreement-text">
                    <span className="required">[필수]</span> 이용약관 동의
                  </span>
                  <Link to="/terms" target="_blank" className="agreement-link">
                    보기
                  </Link>
                </label>

                <label className={`agreement-item ${errors.agreePrivacy ? 'error' : ''}`}>
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span className="agreement-text">
                    <span className="required">[필수]</span> 개인정보처리방침 동의
                  </span>
                  <Link to="/privacy" target="_blank" className="agreement-link">
                    보기
                  </Link>
                </label>

                <label className="agreement-item">
                  <input
                    type="checkbox"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  <span className="agreement-text">
                    [선택] 마케팅 정보 수신 동의
                  </span>
                  <Link to="/marketing" target="_blank" className="agreement-link">
                    보기
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary register-btn"
              disabled={isLoading}
            >
              {isLoading ? <Loading size="small" text="" /> : '회원가입'}
            </button>
          </form>

          <div className="register-footer">
            <p>
              이미 계정이 있으신가요?{' '}
              <Link to="/login" state={{ from }}>
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;