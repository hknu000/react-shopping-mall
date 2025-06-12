import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaSave, FaArrowLeft } from 'react-icons/fa';
import { productService } from '../../../services/product.service';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    subcategory: '',
    brand: '',
    tags: [''],
    stockCount: '',
    features: [''],
    // 스마트폰/태블릿 특화 필드
    screenSize: '',
    storage: '',
    ram: '',
    battery: '',
    camera: '',
    os: '',
    colors: [''],
    weight: '',
    waterResistance: '',
    wirelessCharging: false,
    faceId: false,
    fingerprint: false,
    supports5G: false
  });
  
  const [images, setImages] = useState(['']);
  const [errors, setErrors] = useState({});

  // 카테고리 옵션
  const categoryOptions = [
    { value: 'iphone', label: 'iPhone' },
    { value: 'samsung', label: 'Samsung Galaxy' },
    { value: 'pixel', label: 'Google Pixel' },
    { value: 'tablet', label: '태블릿' },
    { value: 'case', label: '폰 케이스' },
    { value: 'earphone', label: '무선 이어폰' },
    { value: 'etc', label: '기타' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (arrayName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (arrayName, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }));
  };
  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = '상품명을 입력해주세요.';
    if (!formData.description.trim()) newErrors.description = '상품 설명을 입력해주세요.';
    if (!formData.price || formData.price <= 0) newErrors.price = '올바른 가격을 입력해주세요.';
    if (!formData.category) newErrors.category = '카테고리를 선택해주세요.';
    if (!formData.brand.trim()) newErrors.brand = '브랜드를 입력해주세요.';
    if (!formData.stockCount || formData.stockCount < 0) newErrors.stockCount = '재고 수량을 입력해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        id: 'product-' + Date.now(),
        price: parseInt(formData.price),
        salePrice: formData.salePrice ? parseInt(formData.salePrice) : null,
        stockCount: parseInt(formData.stockCount),
        image: images[0],
        images: images.filter(img => img.trim()),
        rating: 0,
        reviewCount: 0,
        inStock: true,
        tags: formData.tags.filter(tag => tag.trim()),
        features: formData.features.filter(feature => feature.trim()),
        specifications: formData.specifications.reduce((acc, spec) => {
          if (spec.key.trim() && spec.value.trim()) {
            acc[spec.key] = spec.value;
          }
          return acc;
        }, {}),
        variants: formData.variants.map((variant, index) => ({
          id: `variant-${Date.now()}-${index}`,
          name: variant.name || `옵션 ${index + 1}`,
          price: parseInt(variant.price) || parseInt(formData.price),
          salePrice: variant.salePrice ? parseInt(variant.salePrice) : null,
          inStock: true,
          stockCount: parseInt(variant.stockCount) || parseInt(formData.stockCount)
        }))
      };

      // Mock 상품 추가 (실제 환경에서는 API 호출)
      const result = await productService.addProduct(productData);
      
      if (result.success) {
        alert('상품이 성공적으로 추가되었습니다!');
        navigate('/admin/products');
      } else {
        alert('상품 추가에 실패했습니다: ' + result.error);
      }    } catch (error) {
      console.error('상품 추가 오류:', error);
      alert('상품 추가 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="container">
        <div className="page-header">
          <h1>새 상품 추가</h1>
          <button 
            className="btn btn-outline-secondary"
            onClick={() => navigate('/admin/products')}
          >
            목록으로 돌아가기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* 기본 정보 */}
          <div className="form-section">
            <h2>기본 정보</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>상품명 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'error' : ''}
                  placeholder="상품명을 입력하세요"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>브랜드 *</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className={errors.brand ? 'error' : ''}
                  placeholder="브랜드명을 입력하세요"
                />
                {errors.brand && <span className="error-text">{errors.brand}</span>}
              </div>              <div className="form-group">
                <label>카테고리 *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={errors.category ? 'error' : ''}
                >
                  <option value="">카테고리 선택</option>
                  {categoryOptions.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>                ))}
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label>상품 설명 *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={errors.description ? 'error' : ''}
                placeholder="상품에 대한 간단한 설명을 입력하세요"
                rows="3"
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>

            <div className="form-group full-width">
              <label>상세 설명</label>
              <textarea
                value={formData.detailDescription}
                onChange={(e) => handleInputChange('detailDescription', e.target.value)}
                placeholder="상품에 대한 자세한 설명을 입력하세요 (HTML 태그 사용 가능)"
                rows="5"
              />
            </div>
          </div>

          {/* 가격 및 재고 */}
          <div className="form-section">
            <h2>가격 및 재고</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>정가 *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className={errors.price ? 'error' : ''}
                  placeholder="0"
                  min="0"
                />
                {errors.price && <span className="error-text">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label>할인가</label>
                <input
                  type="number"
                  value={formData.salePrice}
                  onChange={(e) => handleInputChange('salePrice', e.target.value)}
                  placeholder="할인가 (선택사항)"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>재고 수량 *</label>
                <input
                  type="number"
                  value={formData.stockCount}
                  onChange={(e) => handleInputChange('stockCount', e.target.value)}
                  className={errors.stockCount ? 'error' : ''}
                  placeholder="0"
                  min="0"
                />
                {errors.stockCount && <span className="error-text">{errors.stockCount}</span>}
              </div>
            </div>
          </div>

          {/* 이미지 */}
          <div className="form-section">
            <h2>상품 이미지</h2>
            
            {images.map((image, index) => (
              <div key={index} className="image-input-group">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[index] = e.target.value;
                    setImages(newImages);
                  }}
                  placeholder="이미지 URL을 입력하세요"
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => setImages([...images, ''])}
              className="btn btn-outline-primary btn-sm"
            >
              <FaPlus /> 이미지 추가
            </button>
          </div>

          {/* 태그 */}
          <div className="form-section">
            <h2>태그</h2>
            
            {formData.tags.map((tag, index) => (
              <div key={index} className="tag-input-group">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                  placeholder="태그를 입력하세요"
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tags', index)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => addArrayItem('tags')}
              className="btn btn-outline-primary btn-sm"
            >
              <FaPlus /> 태그 추가
            </button>
          </div>

          {/* 스마트폰 스펙 */}
          <div className="form-section">
            <h2>📱 스마트폰 스펙</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label>화면 크기</label>
                <input
                  type="text"
                  value={formData.screenSize}
                  onChange={(e) => handleInputChange('screenSize', e.target.value)}
                  placeholder="예: 6.1인치"
                />
              </div>

              <div className="form-group">
                <label>저장 용량</label>
                <select
                  value={formData.storage}
                  onChange={(e) => handleInputChange('storage', e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB</option>
                </select>
              </div>

              <div className="form-group">
                <label>RAM</label>
                <select
                  value={formData.ram}
                  onChange={(e) => handleInputChange('ram', e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="4GB">4GB</option>
                  <option value="6GB">6GB</option>
                  <option value="8GB">8GB</option>
                  <option value="12GB">12GB</option>
                  <option value="16GB">16GB</option>
                </select>
              </div>

              <div className="form-group">
                <label>배터리</label>
                <input
                  type="text"
                  value={formData.battery}
                  onChange={(e) => handleInputChange('battery', e.target.value)}
                  placeholder="예: 4000mAh"
                />
              </div>

              <div className="form-group">
                <label>메인 카메라</label>
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) => handleInputChange('camera', e.target.value)}
                  placeholder="예: 48MP 트리플 카메라"
                />
              </div>

              <div className="form-group">
                <label>운영체제</label>
                <select
                  value={formData.os}
                  onChange={(e) => handleInputChange('os', e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="iOS 17">iOS 17</option>
                  <option value="Android 14">Android 14</option>
                  <option value="Android 13">Android 13</option>
                  <option value="MIUI 14">MIUI 14</option>
                  <option value="One UI 6">One UI 6</option>
                </select>
              </div>

              <div className="form-group">
                <label>무게</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="예: 194g"
                />
              </div>

              <div className="form-group">
                <label>방수 등급</label>
                <select
                  value={formData.waterResistance}
                  onChange={(e) => handleInputChange('waterResistance', e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="IP68">IP68</option>
                  <option value="IP67">IP67</option>
                  <option value="없음">없음</option>
                </select>
              </div>
            </div>

            {/* 추가 기능 */}
            <div className="form-group">
              <label>추가 기능</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.wirelessCharging}
                    onChange={(e) => handleInputChange('wirelessCharging', e.target.checked)}
                  />
                  무선충전 지원
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.faceId}
                    onChange={(e) => handleInputChange('faceId', e.target.checked)}
                  />
                  얼굴인식 (Face ID)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.fingerprint}
                    onChange={(e) => handleInputChange('fingerprint', e.target.checked)}
                  />
                  지문인식
                </label>
              </div>
            </div>

            {/* 색상 옵션 */}
            <div className="form-group">
              <label>색상 옵션</label>
              {formData.colors.map((color, index) => (
                <div key={index} className="color-input-group">
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                    placeholder="예: 미드나이트, 스타라이트, 골드"
                  />
                  {formData.colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          colors: prev.colors.filter((_, i) => i !== index)
                        }));
                      }}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <FaMinus />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('colors')}
                className="btn btn-sm btn-outline-primary"
              >
                <FaPlus /> 색상 추가
              </button>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn btn-outline-secondary"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              <FaSave />
              {isLoading ? '저장 중...' : '상품 저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;