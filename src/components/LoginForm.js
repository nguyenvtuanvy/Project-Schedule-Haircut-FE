import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import '../assets/LoginForm.css';

const LoginForm = ({ onClose, onSwitch, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Xử lý đăng nhập thật ở đây
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>ĐĂNG NHẬP</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="icon user-icon" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon lock-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot-password">
          <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }}>
            Quên mật khẩu?
          </a>
        </div>
        <button className="login-button" type="submit">Đăng nhập</button>
      </form>
      <div className="register-link">
        Bạn chưa có tài khoản?{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
