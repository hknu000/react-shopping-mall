import api from './api';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS, API_ENDPOINTS } from '../utils/constants';

export const authService = {
  // 로그인
  login: async (email, password) => {
    const result = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password
    });

    if (result.success) {
      const { user, token } = result.data;
      storage.set(STORAGE_KEYS.USER, user);
      storage.set(STORAGE_KEYS.TOKEN, token);
    }

    return result;
  },

  // 회원가입
  register: async (userData) => {
    return await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  // 로그아웃
  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // API 호출 성공/실패와 관계없이 로컬 데이터 삭제
      storage.remove(STORAGE_KEYS.USER);
      storage.remove(STORAGE_KEYS.TOKEN);
      storage.remove(STORAGE_KEYS.CART_ITEMS);
    }
  },

  // 토큰 갱신
  refreshToken: async () => {
    const result = await api.post(API_ENDPOINTS.AUTH.REFRESH);
    
    if (result.success) {
      const { token } = result.data;
      storage.set(STORAGE_KEYS.TOKEN, token);
    }
    
    return result;
  },

  // 프로필 조회
  getProfile: async () => {
    return await api.get(API_ENDPOINTS.AUTH.PROFILE);
  },

  // 프로필 업데이트
  updateProfile: async (profileData) => {
    const result = await api.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
    
    if (result.success) {
      const currentUser = storage.get(STORAGE_KEYS.USER);
      const updatedUser = { ...currentUser, ...result.data.user };
      storage.set(STORAGE_KEYS.USER, updatedUser);
    }
    
    return result;
  },

  // 비밀번호 변경
  changePassword: async (currentPassword, newPassword) => {
    return await api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
  },

  // 비밀번호 재설정 요청
  requestPasswordReset: async (email) => {
    return await api.post('/auth/password-reset-request', { email });
  },

  // 비밀번호 재설정
  resetPassword: async (token, newPassword) => {
    return await api.post('/auth/password-reset', { token, newPassword });
  },

  // 이메일 인증 요청
  requestEmailVerification: async () => {
    return await api.post('/auth/email-verification-request');
  },

  // 이메일 인증 확인
  verifyEmail: async (token) => {
    return await api.post('/auth/email-verification', { token });
  },

  // 현재 사용자 정보 확인
  getCurrentUser: () => {
    return storage.get(STORAGE_KEYS.USER);
  },

  // 토큰 확인
  getToken: () => {
    return storage.get(STORAGE_KEYS.TOKEN);
  },

  // 인증 상태 확인
  isAuthenticated: () => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    const user = storage.get(STORAGE_KEYS.USER);
    return !!(token && user);
  },

  // 사용자 권한 확인
  hasRole: (role) => {
    const user = storage.get(STORAGE_KEYS.USER);
    return user?.roles?.includes(role) || false;
  },

  // 권한 확인 (여러 권한 중 하나라도)
  hasAnyRole: (roles) => {
    const user = storage.get(STORAGE_KEYS.USER);
    return roles.some(role => user?.roles?.includes(role)) || false;
  },

  // 소셜 로그인 URL 생성
  getSocialLoginUrl: (provider) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    return `${baseUrl}/auth/social/${provider}`;
  }
};