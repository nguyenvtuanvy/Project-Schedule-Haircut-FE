import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../assets/ForgotPassword.css';

const ForgotPasswordForm = ({ onClose, onBackToLogin }) => {
  return (
    <div className="forgot-container">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>QUÊN MẬT KHẨU</h2>

      <div className="input-group">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <input type="text" placeholder="Nhập tên đăng nhập" />
      </div>

      <div className="input-group">
        <FontAwesomeIcon icon={faPhone} className="icon" />
        <input type="text" placeholder="Nhập số điện thoại" />
      </div>

      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <input type="email" placeholder="Nhập email" />
      </div>

      <button className="send-button">Gửi</button>

      <div className="back-login">
        <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }}>
          Quay lại đăng nhập
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
