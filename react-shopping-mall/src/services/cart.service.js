import api from './api';
import { storage } from '../utils/helpers';
import { STORAGE_KEYS } from '../utils/constants';

export const cartService = {
  // 장바구니 목록 조회
  getCartItems: async () => {
    // 로그인된 사용자의 경우 서버에서 가져오기
    const token = storage.get(STORAGE_KEYS.TOKEN);
    if (token) {
      try {
        return await api.get('/cart');
      } catch (error) {
        console.error('서버 장바구니 조회 실패, 로컬 데이터 사용:', error);
      }
    }

    // 로컬 스토리지에서 가져오기
    const localItems = storage.get(STORAGE_KEYS.CART_ITEMS, []);
    return {
      success: true,
      data: {
        items: localItems,
        total: cartService.calculateTotal(localItems)
      }
    };
  },

  // 장바구니에 상품 추가
  addToCart: async (productId, quantity = 1, options = {}) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      try {
        return await api.post('/cart/add', {
          productId,
          quantity,
          options
        });
      } catch (error) {
        console.error('서버 장바구니 추가 실패, 로컬에 저장:', error);
      }
    }

    // 로컬 스토리지에 추가
    const localItems = storage.get(STORAGE_KEYS.CART_ITEMS, []);
    const existingItemIndex = localItems.findIndex(
      item => item.productId === productId && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingItemIndex > -1) {
      localItems[existingItemIndex].quantity += quantity;
    } else {
      localItems.push({
        id: Date.now().toString(),
        productId,
        quantity,
        options,
        addedAt: new Date().toISOString()
      });
    }

    storage.set(STORAGE_KEYS.CART_ITEMS, localItems);
    return {
      success: true,
      data: {
        items: localItems,
        message: '상품이 장바구니에 추가되었습니다.'
      }
    };
  },

  // 장바구니 상품 수량 업데이트
  updateCartItem: async (itemId, quantity) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      try {
        return await api.put(`/cart/items/${itemId}`, { quantity });
      } catch (error) {
        console.error('서버 장바구니 업데이트 실패, 로컬에서 처리:', error);
      }
    }

    // 로컬 스토리지에서 업데이트
    const localItems = storage.get(STORAGE_KEYS.CART_ITEMS, []);
    const itemIndex = localItems.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        localItems.splice(itemIndex, 1);
      } else {
        localItems[itemIndex].quantity = quantity;
      }
      
      storage.set(STORAGE_KEYS.CART_ITEMS, localItems);
      return {
        success: true,
        data: {
          items: localItems,
          message: '수량이 업데이트되었습니다.'
        }
      };
    }

    return {
      success: false,
      error: { message: '상품을 찾을 수 없습니다.' }
    };
  },

  // 장바구니에서 상품 제거
  removeFromCart: async (itemId) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      try {
        return await api.delete(`/cart/items/${itemId}`);
      } catch (error) {
        console.error('서버 장바구니 제거 실패, 로컬에서 처리:', error);
      }
    }

    // 로컬 스토리지에서 제거
    const localItems = storage.get(STORAGE_KEYS.CART_ITEMS, []);
    const filteredItems = localItems.filter(item => item.id !== itemId);
    
    storage.set(STORAGE_KEYS.CART_ITEMS, filteredItems);
    return {
      success: true,
      data: {
        items: filteredItems,
        message: '상품이 장바구니에서 제거되었습니다.'
      }
    };
  },

  // 장바구니 전체 비우기
  clearCart: async () => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      try {
        return await api.delete('/cart/clear');
      } catch (error) {
        console.error('서버 장바구니 초기화 실패, 로컬에서 처리:', error);
      }
    }

    // 로컬 스토리지 초기화
    storage.set(STORAGE_KEYS.CART_ITEMS, []);
    return {
      success: true,
      data: {
        items: [],
        message: '장바구니가 비워졌습니다.'
      }
    };
  },

  // 장바구니 총액 계산
  calculateTotal: (items) => {
    return items.reduce((total, item) => {
      const price = item.salePrice || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  },

  // 배송비 계산
  calculateShipping: (total, items = []) => {
    const freeShippingThreshold = 50000;
    const standardShippingCost = 3000;
    
    // 무료배송 조건 확인
    if (total >= freeShippingThreshold) {
      return 0;
    }

    // 특정 카테고리나 브랜드 무료배송 확인
    const hasFreeShippingItem = items.some(item => 
      item.category === 'electronics' || 
      item.brand === 'Apple'
    );

    return hasFreeShippingItem ? 0 : standardShippingCost;
  },

  // 할인 적용
  applyDiscount: async (discountCode) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    
    if (token) {
      try {
        return await api.post('/cart/discount', { code: discountCode });
      } catch (error) {
        console.error('할인 적용 실패:', error);
        return {
          success: false,
          error: { message: '할인 코드 적용에 실패했습니다.' }
        };
      }
    }

    // 로컬 환경에서는 mock 할인 처리
    const mockDiscounts = {
      'WELCOME10': { type: 'percentage', value: 10, description: '신규가입 10% 할인' },
      'SAVE5000': { type: 'amount', value: 5000, description: '5,000원 할인' },
      'FREESHIP': { type: 'shipping', value: 0, description: '무료배송' }
    };

    const discount = mockDiscounts[discountCode.toUpperCase()];
    if (discount) {
      return {
        success: true,
        data: {
          discount,
          message: `${discount.description}이 적용되었습니다.`
        }
      };
    }

    return {
      success: false,
      error: { message: '유효하지 않은 할인 코드입니다.' }
    };
  },

  // 장바구니 동기화 (로그인 시)
  syncCart: async (localItems = []) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    if (!token || localItems.length === 0) return;

    try {
      await api.post('/cart/sync', { items: localItems });
      storage.remove(STORAGE_KEYS.CART_ITEMS); // 로컬 데이터 삭제
      return { success: true };
    } catch (error) {
      console.error('장바구니 동기화 실패:', error);
      return { success: false, error };
    }
  },

  // 상품 재고 확인
  checkStock: async (items) => {
    try {
      const productIds = items.map(item => item.productId);
      return await api.post('/cart/check-stock', { productIds });
    } catch (error) {
      console.error('재고 확인 실패:', error);
      // Mock 재고 확인
      return {
        success: true,
        data: {
          availableItems: items,
          unavailableItems: []
        }
      };
    }
  }
};