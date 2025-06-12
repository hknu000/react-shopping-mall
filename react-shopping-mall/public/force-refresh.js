// 강제 새로고침 및 레이아웃 수정
(function() {
  'use strict';
  
  console.log('강력한 레이아웃 수정 적용 중...');
  
  const forceLayoutFix = () => {
    // 상품명과 버튼 겹침 방지
    const productHeader = document.querySelector('.product-header');
    if (productHeader) {
      productHeader.style.display = 'flex';
      productHeader.style.justifyContent = 'space-between';
      productHeader.style.alignItems = 'flex-start';
      productHeader.style.gap = '1rem';
      productHeader.style.width = '100%';
    }
    
    const productTitle = document.querySelector('.product-title');
    if (productTitle) {
      productTitle.style.flex = '1';
      productTitle.style.maxWidth = 'calc(100% - 120px)';
      productTitle.style.marginRight = '1rem';
    }
    
    const productName = document.querySelector('.product-name');
    if (productName) {
      productName.style.wordBreak = 'break-word';
      productName.style.overflowWrap = 'break-word';
      productName.style.maxWidth = '100%';
    }
    
    const actionsHeader = document.querySelector('.product-actions-header');
    if (actionsHeader) {
      actionsHeader.style.flexShrink = '0';
      actionsHeader.style.position = 'relative';
      actionsHeader.style.zIndex = '100';
    }
    
    // 옵션 레이아웃 강제 수정
    const productVariants = document.querySelector('.product-variants');
    if (productVariants) {
      productVariants.style.position = 'relative';
      productVariants.style.width = '100%';
      productVariants.style.overflow = 'visible';
      productVariants.style.zIndex = '1';
      productVariants.style.clear = 'both';
    }
    
    const storageOptions = document.querySelector('.storage-options');
    if (storageOptions) {
      storageOptions.style.display = 'grid';
      storageOptions.style.gridTemplateColumns = 'repeat(3, 1fr)';
      storageOptions.style.gap = '0.75rem';
      storageOptions.style.width = '100%';
      storageOptions.style.position = 'relative';
      storageOptions.style.zIndex = '1';
    }
    
    const colorOptions = document.querySelector('.color-options');
    if (colorOptions) {
      colorOptions.style.display = 'grid';
      colorOptions.style.gridTemplateColumns = 'repeat(5, 1fr)';
      colorOptions.style.gap = '1rem';
      colorOptions.style.width = '100%';
      colorOptions.style.position = 'relative';
      colorOptions.style.zIndex = '1';
    }
    
    // 반응형 처리
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
    
    if (isMobile && storageOptions) {
      storageOptions.style.gridTemplateColumns = '1fr';
    }
    
    if (isMobile && colorOptions) {
      colorOptions.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    
    if (isTablet && storageOptions) {
      storageOptions.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    
    if (isTablet && colorOptions) {
      colorOptions.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
    
    if (isTablet && productHeader) {
      productHeader.style.flexDirection = 'column';
      productHeader.style.alignItems = 'flex-start';
      
      if (actionsHeader) {
        actionsHeader.style.order = '-1';
        actionsHeader.style.alignSelf = 'flex-end';
      }
      
      if (productTitle) {
        productTitle.style.maxWidth = '100%';
        productTitle.style.marginRight = '0';
      }
    }
    
    console.log('레이아웃 수정 완료!');
  };
  
  // DOM 로드 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceLayoutFix);
  } else {
    forceLayoutFix();
  }
  
  // 일정 간격으로 레이아웃 체크
  setInterval(forceLayoutFix, 1000);
  
  // 윈도우 리사이즈 시에도 적용
  window.addEventListener('resize', forceLayoutFix);
})();
