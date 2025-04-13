import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import HaircutDetail from './pages/HaircutDetail'; // import trang chi tiết

import './assets/LoginForm.css';
import './assets/Register.css';
import './assets/ForgotPassword.css';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('login');

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

  useEffect(() => {
    document.body.style.overflow = isFormVisible ? 'hidden' : 'unset';
  }, [isFormVisible]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home onOpenLogin={handleOpenLogin} />} />
          <Route path="/haircut" element={<HaircutDetail />} />
          {/* Thêm các route khác ở đây nếu cần */}
        </Routes>

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
    </Router>
  );
}

export default App;
