import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Loading from '../Loading/Loading';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  adminOnly = false,
  redirectTo = '/login' 
}) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <Loading text="인증 정보를 확인하는 중..." />;
  }

  if (requireAuth && !user) {
    // 로그인이 필요한 페이지인데 로그인하지 않은 경우
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }
  if (adminOnly && (!user || !user.isAdmin)) {
    // 관리자 권한이 필요한 페이지인데 관리자가 아닌 경우
    return <Navigate to="/" replace />;
  }

  if (!requireAuth && user) {
    // 로그인하지 않은 사용자만 접근 가능한 페이지인데 로그인한 경우
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;