import axios from 'axios';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (토큰 자동 추가)
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (토큰 만료 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // 토큰 만료 또는 인증 실패
      storage.remove(STORAGE_KEYS.TOKEN);
      storage.remove(STORAGE_KEYS.USER);
      
      // 로그인 페이지로 리디렉션 (현재 페이지가 로그인 페이지가 아닌 경우)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API 응답 래퍼
const apiWrapper = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// API 에러 처리
const handleApiError = (error) => {
  let errorMessage = '알 수 없는 오류가 발생했습니다.';
  let errorCode = 'UNKNOWN_ERROR';

  if (error.response) {
    // 서버 응답이 있는 경우
    const { status, data } = error.response;
    errorMessage = data?.message || `서버 오류 (${status})`;
    errorCode = data?.code || `HTTP_${status}`;
  } else if (error.request) {
    // 요청이 만들어졌지만 응답을 받지 못한 경우
    errorMessage = '네트워크 연결을 확인해주세요.';
    errorCode = 'NETWORK_ERROR';
  } else {
    // 요청 설정 중에 오류가 발생한 경우
    errorMessage = error.message || '요청 처리 중 오류가 발생했습니다.';
    errorCode = 'REQUEST_ERROR';
  }

  console.error('API Error:', error);
  
  return {
    success: false,
    error: {
      message: errorMessage,
      code: errorCode,
      status: error.response?.status,
      originalError: error
    }
  };
};

// 파일 업로드용 API
export const uploadFile = async (file, onProgress = null) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export default apiWrapper;