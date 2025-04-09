import React, { useState } from 'react';
import '../assets/css/Login.css'; // Import your CSS file for styling
import useAuthService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useAuth } from '../stores/context/AuthContext';

const LoginForm = ({ onClose, children }) => {
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuthService();
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const user = await login(credentials); // trả về payload nếu thành công
            if (user) {
                toast.success('Đăng nhập thành công!');
                onClose(); // gọi luôn vì chắc chắn thành công
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {children}
            <h2>ĐĂNG NHẬP</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
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
                        required
                    />
                </div>
                <div className="input-group">
                    <span className="icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
                <button
                    type="submit"
                    className="login-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>

            <div className="register-link">
                Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </div>
        </div>
    );
};

export default LoginForm;