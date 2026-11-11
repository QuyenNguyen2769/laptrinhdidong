import React, { useState } from 'react';
import CounterView from './features/counter/CounterView';
import ShoppingCartView from './features/cart/ShoppingCartView';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<'COUNTER' | 'CART'>('COUNTER');

  return (
    <div className="app-wrapper">
      {/* HEADER SINH VIÊN */}
      <header className="app-header">
        <div className="header-badge">LẬP TRÌNH THIẾT BỊ DI ĐỘNG - TUẦN 9</div>
        <h1 className="header-title">BÀI TẬP REDUX TOOLKIT CƠ BẢN</h1>
        <div className="student-badge">
          <span>Họ & Tên: <strong>Nguyễn Như Ngọc Quyên</strong></span>
          <span className="dot">•</span>
          <span>MSSV: <strong>23663981</strong></span>
          <span className="dot">•</span>
          <span>GVHD: <strong>Thầy Nguyễn Trọng Tiến</strong></span>
        </div>

        {/* THANH ĐIỀU HƯỚNG 2 BÀI TẬP */}
        <div className="nav-container">
          <button
            className={`nav-btn ${activeTab === 'COUNTER' ? 'active' : ''}`}
            onClick={() => setActiveTab('COUNTER')}
          >
            🔢 BÀI 1: COUNTER APP (ĐẾM SỐ)
          </button>
          <button
            className={`nav-btn ${activeTab === 'CART' ? 'active' : ''}`}
            onClick={() => setActiveTab('CART')}
          >
            🛒 BÀI 2: SHOPPING CART (GIỎ HÀNG LEVEL 1)
          </button>
        </div>
      </header>

      {/* NỘI DUNG TỪNG BÀI */}
      <main className="app-main">
        {activeTab === 'COUNTER' && <CounterView />}
        {activeTab === 'CART' && <ShoppingCartView />}
      </main>

      <footer className="app-footer">
        <p>© 2026 - Nguyễn Như Ngọc Quyên - 23663981 - Đại học Công Nghiệp TP.HCM (IUH)</p>
      </footer>
    </div>
  );
}
