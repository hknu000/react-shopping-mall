// 가격 관련 포맷터
export const priceFormatter = {
  // 기본 가격 포맷팅
  format: (price, currency = 'KRW') => {
    if (typeof price !== 'number' || isNaN(price)) return '0원';
    
    switch (currency) {
      case 'KRW':
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price);
      case 'EUR':
        return new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }).format(price);
      default:
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    }
  },

  // 할인가격 포맷팅
  formatDiscount: (originalPrice, discountPrice) => {
    const discount = originalPrice - discountPrice;
    const percentage = Math.round((discount / originalPrice) * 100);
    
    return {
      amount: priceFormatter.format(discount),
      percentage: `${percentage}%`,
      saved: `${priceFormatter.format(discount)} 할인`
    };
  },

  // 배송비 포맷팅
  formatShipping: (cost, freeThreshold = 50000) => {
    if (cost === 0) return '무료배송';
    return priceFormatter.format(cost);
  }
};

// 날짜 관련 포맷터
export const dateFormatter = {
  // 기본 날짜 포맷팅
  format: (date, format = 'default') => {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) return '';
    
    const formats = {
      default: { year: 'numeric', month: 'long', day: 'numeric' },
      short: { year: '2-digit', month: '2-digit', day: '2-digit' },
      long: { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      },
      time: { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      },
      datetime: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    };
    
    return d.toLocaleDateString('ko-KR', formats[format] || formats.default);
  },

  // 상대 시간 포맷팅
  relative: (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 30) return `${diffInDays}일 전`;
    if (diffInMonths < 12) return `${diffInMonths}개월 전`;
    return `${diffInYears}년 전`;
  },

  // 배송 예정일 계산
  calculateDeliveryDate: (orderDate, deliveryDays = 2) => {
    const order = new Date(orderDate);
    const delivery = new Date(order);
    delivery.setDate(order.getDate() + deliveryDays);
    
    // 주말 제외 (토요일: 6, 일요일: 0)
    while (delivery.getDay() === 0 || delivery.getDay() === 6) {
      delivery.setDate(delivery.getDate() + 1);
    }
    
    return dateFormatter.format(delivery);
  }
};

// 텍스트 관련 포맷터
export const textFormatter = {
  // 텍스트 자르기
  truncate: (text, maxLength = 100, suffix = '...') => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + suffix;
  },

  // 첫 글자 대문자
  capitalize: (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  // 카멜케이스를 읽기 쉬운 형태로
  camelToReadable: (text) => {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  },

  // 전화번호 포맷팅
  phone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  },

  // 카드번호 포맷팅
  cardNumber: (number) => {
    const cleaned = number.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join('-') : number;
  },

  // 카드번호 마스킹
  maskCardNumber: (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length >= 8) {
      const first4 = cleaned.substring(0, 4);
      const last4 = cleaned.substring(cleaned.length - 4);
      const middle = '*'.repeat(cleaned.length - 8);
      return `${first4}${middle}${last4}`.match(/.{1,4}/g).join('-');
    }
    return number;
  }
};

// 주소 관련 포맷터
export const addressFormatter = {
  // 주소 전체 포맷팅
  format: (address) => {
    const { zipCode, address1, address2, city, state } = address;
    const parts = [address1, address2, city, state].filter(Boolean);
    const fullAddress = parts.join(' ');
    return zipCode ? `(${zipCode}) ${fullAddress}` : fullAddress;
  },

  // 우편번호 포맷팅
  zipCode: (code) => {
    const cleaned = code.replace(/\D/g, '');
    return cleaned.length === 5 ? cleaned : code;
  }
};

// 파일 관련 포맷터
export const fileFormatter = {
  // 파일 크기 포맷팅
  size: (bytes) => {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  // 파일 확장자 추출
  extension: (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  },

  // 파일명에서 확장자 제거
  nameWithoutExtension: (filename) => {
    return filename.replace(/\.[^/.]+$/, '');
  }
};

// 별점 관련 포맷터
export const ratingFormatter = {
  // 별점을 별 문자로 변환
  toStars: (rating, maxRating = 5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
    
    return {
      full: '★'.repeat(fullStars),
      half: hasHalfStar ? '☆' : '',
      empty: '☆'.repeat(emptyStars),
      display: '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars)
    };
  },

  // 별점을 퍼센트로 변환
  toPercentage: (rating, maxRating = 5) => {
    return Math.round((rating / maxRating) * 100);
  }
};

// 색상 관련 포맷터
export const colorFormatter = {
  // HEX 색상 유효성 검사
  isValidHex: (hex) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  },

  // HEX를 RGB로 변환
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  // RGB를 HEX로 변환
  rgbToHex: (r, g, b) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }
};