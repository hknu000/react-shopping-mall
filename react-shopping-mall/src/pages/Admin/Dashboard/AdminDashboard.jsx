import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaBox, 
  FaShoppingCart, 
  FaDollarSign, 
  FaChartLine, 
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import { formatPrice, formatDate } from '../../../utils/helpers';
import Loading from '../../../components/common/Loading/Loading';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 관리자 권한 확인
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock 데이터 (실제로는 API에서 가져옴)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 15234,
        totalProducts: 1892,
        totalOrders: 8956,
        totalRevenue: 125678900,
        todayOrders: 127,
        todayRevenue: 2890000
      });

      setRecentOrders([
        {
          id: 'ORD-2024-001',
          customerName: '김철수',
          totalAmount: 189000,
          status: 'confirmed',
          statusText: '주문확인',
          orderDate: '2024-01-15T10:30:00'
        },
        {
          id: 'ORD-2024-002',
          customerName: '이영희',
          totalAmount: 299000,
          status: 'shipped',
          statusText: '배송중',
          orderDate: '2024-01-15T09:15:00'
        },
        {
          id: 'ORD-2024-003',
          customerName: '박민수',
          totalAmount: 89000,
          status: 'delivered',
          statusText: '배송완료',
          orderDate: '2024-01-14T16:45:00'
        }
      ]);

      setRecentProducts([
        {
          id: 1,
          name: 'iPhone 15 Pro',
          price: 1290000,
          stock: 45,
          sales: 123,
          status: 'active'
        },
        {
          id: 2,
          name: 'MacBook Air M3',
          price: 1790000,
          stock: 23,
          sales: 67,
          status: 'active'
        },
        {
          id: 3,
          name: '나이키 에어포스 1',
          price: 129000,
          stock: 0,
          sales: 234,
          status: 'out_of_stock'
        }
      ]);
    } catch (error) {
      console.error('대시보드 데이터를 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: '#3b82f6',
      shipped: '#10b981',
      delivered: '#059669',
      cancelled: '#ef4444',
      processing: '#fbbf24'
    };
    return colors[status] || '#6b7280';
  };

  const getProductStatusText = (status) => {
    const statusMap = {
      active: '판매중',
      inactive: '판매중지',
      out_of_stock: '품절'
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return <Loading text="대시보드를 불러오는 중..." />;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>관리자 대시보드</h1>
          <p>쇼핑몰 운영 현황을 한눈에 확인하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>총 회원수</h3>
              <p className="stat-number">{stats.totalUsers?.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon products">
              <FaBox />
            </div>
            <div className="stat-content">
              <h3>총 상품수</h3>
              <p className="stat-number">{stats.totalProducts?.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orders">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>총 주문수</h3>
              <p className="stat-number">{stats.totalOrders?.toLocaleString()}</p>
              <span className="stat-sub">오늘: {stats.todayOrders}</span>
            </div>
          </div>          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaDollarSign />
            </div>
            <div className="stat-content">
              <h3>총 매출</h3>
              <p className="stat-number">{formatPrice(stats.totalRevenue)}원</p>
              <span className="stat-sub">오늘: {formatPrice(stats.todayRevenue)}원</span>
            </div>
          </div>
        </div>

        {/* 빠른 액션 */}
        <div className="quick-actions">
          <h2>빠른 작업</h2>
          <div className="action-buttons">
            <Link to="/admin/products/add" className="action-btn">
              <FaPlus />
              <span>상품 추가</span>
            </Link>
            <Link to="/admin/orders" className="action-btn">
              <FaShoppingCart />
              <span>주문 관리</span>
            </Link>
            <Link to="/admin/users" className="action-btn">
              <FaUsers />
              <span>회원 관리</span>
            </Link>
            <Link to="/admin/analytics" className="action-btn">
              <FaChartLine />
              <span>통계 분석</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-content">
          {/* 최근 주문 */}
          <div className="recent-section">
            <div className="section-header">
              <h2>최근 주문</h2>
              <Link to="/admin/orders" className="view-all-btn">
                전체보기
              </Link>
            </div>
            
            <div className="recent-orders">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <h4>{order.id}</h4>
                    <p>{order.customerName}</p>
                    <span className="order-date">
                      {formatDate(order.orderDate, { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="order-amount">
                    {formatPrice(order.totalAmount)}원
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.statusText}
                    </span>
                  </div>
                  <div className="order-actions">
                    <button className="action-icon-btn" title="상세보기">
                      <FaEye />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 상품 현황 */}
          <div className="recent-section">
            <div className="section-header">
              <h2>상품 현황</h2>
              <Link to="/admin/products" className="view-all-btn">
                전체보기
              </Link>
            </div>
            
            <div className="recent-products">
              {recentProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{formatPrice(product.price)}원</p>
                  </div>
                  <div className="product-stats">
                    <span className="stock">재고: {product.stock}</span>
                    <span className="sales">판매: {product.sales}</span>
                  </div>
                  <div className="product-status">
                    <span className={`status-text ${product.status}`}>
                      {getProductStatusText(product.status)}
                    </span>
                  </div>
                  <div className="product-actions">
                    <button className="action-icon-btn" title="수정">
                      <FaEdit />
                    </button>
                    <button className="action-icon-btn danger" title="삭제">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
