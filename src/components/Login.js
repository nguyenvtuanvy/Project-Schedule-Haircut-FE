import React, { useState } from 'react';
import '../assets/css/Login.css';
import useAuthService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '../stores/slices/authSlice';

const LoginForm = ({ onClose, onSwitchToRegister, onSwitchToForgotPassword }) => {
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { login } = useAuthService();
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {
            setCredentials({ userName: '', password: '' });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        if (!credentials.userName || !credentials.password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const user = await login(credentials);
            if (user?.username) {
                dispatch(initializeAuth({
                    username: user.username,
                    isAuthenticated: true,
                }));

                toast.success('Đăng nhập thành công!');
                onClose();
            }
        } catch (error) {
            toast.error(error.message || 'Đăng nhập thất bại.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="login-container">
            <button className="close-button" onClick={onClose}>×</button>
            <h2 className="login-title">ĐĂNG NHẬP</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="login-fields">
                <div className="input-group">
                    <span className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        value={credentials.userName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div className="input-group">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        required
                        disabled={isLoading}
                    />
                    <span
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        style={isLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    >
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </span>
                </div>
                <a
                    href="#"
                    className="forgot-password"
                    onClick={onSwitchToForgotPassword}
                    style={isLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                    Quên mật khẩu?
                </a>
                <button
                    className="login-button"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            {' '}Đang đăng nhập...
                        </>
                    ) : 'Đăng nhập'}
                </button>
            </div>

            <div className="register-link">
                Bạn chưa có tài khoản?{' '}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!isLoading) onSwitchToRegister();
                    }}
                    style={isLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                    Đăng ký ngay
                </a>
            </div>
        </div>
    );
};

export default LoginForm;