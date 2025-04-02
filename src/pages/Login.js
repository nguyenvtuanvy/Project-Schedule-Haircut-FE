import React from 'react';
import '../assets/Login.css'; // Đảm bảo bạn đã import file CSS

const LoginForm = ({ onClose, children }) => { // Thêm props.children
  return (
    <div className="login-container">
      {children} {/* Hiển thị nút đóng */}
      <h2>ĐĂNG NHẬP</h2>
      <div className="input-group">
        <span className="icon"></span>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-group">
        <span className="icon"></span>
        <input type="password" placeholder="Password" />
      </div>
      <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
      <button className="login-button">Đăng nhập</button>
      <div className="register-link">
        Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
      </div>
    </div>
  );
};

export default LoginForm;