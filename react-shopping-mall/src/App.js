import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import OrderHistory from './pages/Order/OrderHistory';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* 레이아웃이 적용되는 페이지들 */}              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } />                <Route path="admin/dashboard" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="admin/products/add" element={
                  <ProtectedRoute adminOnly={true}>
                    <AddProduct />
                  </ProtectedRoute>
                } />
              </Route>
              
              {/* 레이아웃이 적용되지 않는 페이지들 (로그인, 회원가입) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* 404 페이지 */}
              <Route path="*" element={
                <div style={{ 
                  minHeight: '100vh', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  backgroundColor: 'var(--gray-100)'
                }}>
                  <h1 style={{ color: 'var(--dark-color)', marginBottom: '1rem' }}>
                    404 - 페이지를 찾을 수 없습니다
                  </h1>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '2rem' }}>
                    요청하신 페이지가 존재하지 않습니다.
                  </p>
                  <a 
                    href="/" 
                    style={{ 
                      color: 'var(--primary-color)', 
                      textDecoration: 'none',
                      padding: '0.75rem 1.5rem',
                      border: '2px solid var(--primary-color)',
                      borderRadius: 'var(--border-radius)',
                      transition: 'var(--transition)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'var(--primary-color)';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'var(--primary-color)';
                    }}
                  >
                    홈으로 돌아가기
                  </a>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;