import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm'; // <-- THÊM
import './assets/LoginForm.css';
import './assets/Register.css';
import './assets/ForgotPassword.css'; // <-- THÊM

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('login'); // 'login' | 'register' | 'forgot'

  const handleOpenLogin = () => {
    setCurrentForm('login');
    setIsFormVisible(true);
  };

  const handleSwitchForm = () => {
    setCurrentForm((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleForgotPassword = () => {
    setCurrentForm('forgot');
  };

  const handleBackToLogin = () => {
    setCurrentForm('login');
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  // Khóa scroll khi form hiển thị
  useEffect(() => {
    document.body.style.overflow = isFormVisible ? 'hidden' : 'unset';
  }, [isFormVisible]);

  return (
    <div className="App">
      <Home onOpenLogin={handleOpenLogin} />
      {isFormVisible && (
        <>
          <div className="overlay" onClick={handleClose}></div>
          {currentForm === 'login' && (
            <LoginForm
              onClose={handleClose}
              onSwitch={handleSwitchForm}
              onForgotPassword={handleForgotPassword}
            />
          )}
          {currentForm === 'register' && (
            <RegisterForm
              onClose={handleClose}
              onSwitch={handleSwitchForm}
            />
          )}
          {currentForm === 'forgot' && (
            <ForgotPasswordForm
              onClose={handleClose}
              onBackToLogin={handleBackToLogin}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
