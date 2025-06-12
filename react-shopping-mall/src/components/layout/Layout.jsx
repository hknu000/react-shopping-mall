import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer.jsx';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;