import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 로컬 스토리지에서 사용자 정보 복원
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  // 로그인
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API 호출 시뮬레이션 (실제로는 백엔드 API를 호출)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }

      const data = await response.json();
      const { user: userData, token } = data;

      // 사용자 정보와 토큰 저장
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {      // 개발 환경에서는 mock 데이터 사용
      if (process.env.NODE_ENV === 'development') {
        const mockUser = {
          id: 1,
          name: email === 'admin@example.com' ? '관리자' : '홍길동',
          email: email,
          phone: '010-1234-5678',
          address: '서울시 강남구 테헤란로 123',
          joinDate: '2024-01-15',
          isAdmin: email === 'admin@example.com', // 관리자 권한 추가
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('token', 'mock-jwt-token');
        setIsLoading(false);
        return { success: true };
      }
      
      setError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  // 회원가입
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const data = await response.json();
      setIsLoading(false);
      return { success: true, data };
    } catch (error) {
      // 개발 환경에서는 mock 성공 처리
      if (process.env.NODE_ENV === 'development') {
        setIsLoading(false);
        return { success: true };
      }
      
      setError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems'); // 장바구니도 초기화
  };

  // 사용자 정보 업데이트
  const updateUser = async (updatedData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('프로필 업데이트에 실패했습니다.');
      }

      const data = await response.json();
      const updatedUser = { ...user, ...data.user };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      // 개발 환경에서는 mock 업데이트
      if (process.env.NODE_ENV === 'development') {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsLoading(false);
        return { success: true };
      }
      
      setError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  // 비밀번호 변경
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      // 개발 환경에서는 mock 성공 처리
      if (process.env.NODE_ENV === 'development') {
        setIsLoading(false);
        return { success: true };
      }
      
      setError(error.message);
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};