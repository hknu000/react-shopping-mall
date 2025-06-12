import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 로컬 스토리지에서 장바구니 데이터 복원
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('장바구니 데이터 파싱 오류:', error);
        localStorage.removeItem('cartItems');
      }
    }
  }, []);

  // 장바구니 데이터 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 상품을 장바구니에 추가
  const addToCart = (product, quantity = 1) => {
    setIsLoading(true);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // 이미 존재하는 상품이면 수량만 증가
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // 새 상품이면 추가
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    setIsLoading(false);
    
    // 성공 메시지 표시 (선택사항)
    return { success: true, message: '장바구니에 상품이 추가되었습니다.' };
  };

  // 장바구니에서 상품 제거
  const removeFromCart = (productId) => {
    setIsLoading(true);
    
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
    
    setIsLoading(false);
    return { success: true, message: '상품이 장바구니에서 제거되었습니다.' };
  };

  // 상품 수량 업데이트
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(productId);
    }
    
    setIsLoading(true);
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    
    setIsLoading(false);
    return { success: true };
  };

  // 수량 증가
  const increaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      return updateQuantity(productId, item.quantity + 1);
    }
  };

  // 수량 감소
  const decreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      return updateQuantity(productId, item.quantity - 1);
    }
  };

  // 장바구니 전체 비우기
  const clearCart = () => {
    setIsLoading(true);
    setCartItems([]);
    setIsLoading(false);
    return { success: true, message: '장바구니가 비워졌습니다.' };
  };

  // 장바구니 총 금액 계산
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  // 장바구니 총 수량 계산
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 특정 상품이 장바구니에 있는지 확인
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // 특정 상품의 장바구니 수량 가져오기
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // 배송비 계산 (무료배송 기준: 50,000원)
  const getShippingCost = () => {
    const total = getCartTotal();
    const freeShippingThreshold = 50000;
    return total >= freeShippingThreshold ? 0 : 3000;
  };

  // 최종 결제 금액 계산
  const getFinalTotal = () => {
    return getCartTotal() + getShippingCost();
  };

  // 할인 적용 (쿠폰, 적립금 등)
  const applyDiscount = (discountAmount) => {
    const total = getCartTotal();
    const discountedTotal = Math.max(0, total - discountAmount);
    return {
      originalTotal: total,
      discountAmount: Math.min(discountAmount, total),
      discountedTotal: discountedTotal,
      finalTotal: discountedTotal + getShippingCost()
    };
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getItemQuantity,
    getShippingCost,
    getFinalTotal,
    applyDiscount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};