import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBox, FaEye, FaDownload, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../utils/helpers';
import Loading from '../../components/common/Loading/Loading';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('3months');
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock 데이터
      const mockOrders = [
        {
          id: 'ORD-2024-001',
          orderDate: '2024-01-15',
          status: 'delivered',
          statusText: '배송완료',
          totalAmount: 1190000,
          items: [
            {
              id: 1,
              name: 'iPhone 15 Pro',
              price: 1190000,
              quantity: 1,
              image: '/images/products/iphone15pro.jpg'
            }
          ],
          deliveryInfo: {
            address: '서울시 강남구 테헤란로 123',
            trackingNumber: 'CJ123456789'
          }
        },
        {
          id: 'ORD-2024-002',
          orderDate: '2024-01-10',
          status: 'shipped',
          statusText: '배송중',
          totalAmount: 178000,
          items: [
            {
              id: 3,
              name: '나이키 에어포스 1',
              price: 99000,
              quantity: 1,
              image: '/images/products/nike-airforce.jpg'
            },
            {
              id: 5,
              name: '아디다스 스탠스미스',
              price: 79000,
              quantity: 1,
              image: '/images/products/adidas-stansmith.jpg'
            }
          ],
          deliveryInfo: {
            address: '서울시 강남구 테헤란로 123',
            trackingNumber: 'CJ987654321'
          }
        },
        {
          id: 'ORD-2024-003',
          orderDate: '2024-01-05',
          status: 'processing',
          statusText: '주문처리중',
          totalAmount: 1690000,
          items: [
            {
              id: 2,
              name: 'MacBook Air M3',
              price: 1690000,
              quantity: 1,
              image: '/images/products/macbook-air.jpg'
            }
          ],
          deliveryInfo: {
            address: '서울시 강남구 테헤란로 123'
          }
        }
      ];

      // 필터 적용
      let filteredOrders = mockOrders;
      if (filter !== 'all') {
        filteredOrders = mockOrders.filter(order => order.status === filter);
      }

      setOrders(filteredOrders);
    } catch (error) {
      console.error('주문 내역을 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filter]); // filter를 의존성으로 추가

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate, fetchOrders, dateRange]); // fetchOrders를 의존성 배열에 추가

  const getStatusColor = (status) => {
    const colors = {
      processing: '#fbbf24',
      confirmed: '#3b82f6',
      shipped: '#10b981',
      delivered: '#059669',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const handleOrderDetail = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleTrackDelivery = (trackingNumber) => {
    // 배송 추적 페이지로 이동 또는 외부 링크
    window.open(`https://www.cjlogistics.com/ko/tool/parcel/tracking?gnbInvNo=${trackingNumber}`, '_blank');
  };

  if (isLoading) {
    return <Loading text="주문 내역을 불러오는 중..." />;
  }

  return (
    <div className="order-history-page">
      <div className="container">
        <div className="order-history-header">
          <div className="header-content">
            <h1>주문 내역</h1>
            <p>지금까지의 주문 내역을 확인하실 수 있습니다.</p>
          </div>
          
          <div className="header-controls">
            <div className="filter-group">
              <FaFilter className="filter-icon" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">전체 주문</option>
                <option value="processing">주문처리중</option>
                <option value="confirmed">주문확인</option>
                <option value="shipped">배송중</option>
                <option value="delivered">배송완료</option>
                <option value="cancelled">주문취소</option>
              </select>
            </div>
            
            <div className="date-filter">
              <FaCalendarAlt className="calendar-icon" />
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="date-select"
              >
                <option value="1month">최근 1개월</option>
                <option value="3months">최근 3개월</option>
                <option value="6months">최근 6개월</option>
                <option value="1year">최근 1년</option>
              </select>
            </div>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">{order.id}</h3>
                    <p className="order-date">{formatDate(order.orderDate)}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.statusText}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (                    <div key={index} className="order-item">
                      <img 
                        src={item.image || '/images/placeholder-product.svg'} 
                        alt={item.name} 
                        className="item-image"
                        onError={(e) => {
                          e.target.src = '/images/placeholder-product.svg';
                        }}
                      />
                      <div className="item-info">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-details">
                          {formatPrice(item.price)}원 × {item.quantity}개
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="order-total">
                    <span className="total-label">총 결제금액</span>
                    <span className="total-amount">{formatPrice(order.totalAmount)}원</span>
                  </div>
                  
                  <div className="order-actions">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleOrderDetail(order.id)}
                    >
                      <FaEye /> 상세보기
                    </button>
                    
                    {order.deliveryInfo?.trackingNumber && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleTrackDelivery(order.deliveryInfo.trackingNumber)}
                      >
                        <FaBox /> 배송추적
                      </button>
                    )}
                    
                    <button className="btn btn-outline-secondary">
                      <FaDownload /> 영수증
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-orders">
            <FaBox className="empty-icon" />
            <h3>주문 내역이 없습니다</h3>
            <p>첫 번째 상품을 주문해보세요!</p>
            <Link to="/products" className="btn btn-primary">
              상품 둘러보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
