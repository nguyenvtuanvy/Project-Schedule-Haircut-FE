import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showAuthModal } from '../stores/slices/actionFormSlice';
import logoImage from '../assets/image/logo.png';
import '../assets/css/Header.css';
import { useAuth } from '../stores/context/AuthContext';
import useAuthService from '../services/authService';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dropdownRef = useRef(null);
    const userInfoRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { username, isAuthenticated } = useAuth();

    const { logout } = useAuthService();

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            userInfoRef.current &&
            !userInfoRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLoginClick = () => {
        dispatch(showAuthModal({
            form: 'login',
        }));
    };

    const handleLogout = async () => {
        try {
            await logout();
            setShowDropdown(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="header-wrapper">
            <header className="header">
                <div className="logo">
                    <img
                        src={logoImage}
                        alt="30Shine Logo"
                        onClick={() => navigate('/home')}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? '✕' : '☰'}
                </button>

                <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Trang Chủ</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">Về 30Shine</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/shop" className="nav-link">30Shine Shop</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/locations" className="nav-link">Tìm 30Shine gần nhất</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/franchise" className="nav-link">Nhượng quyền</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/partners" className="nav-link">Đối tác</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dv-smiles" className="nav-link">Nụ cười DV</Link>
                        </li>
                    </ul>
                </nav>

                <div className="user-actions">
                    {isAuthenticated ? (
                        <div className="user-info" onClick={toggleDropdown} ref={userInfoRef}>
                            <div className="user-dropdown-trigger">
                                <span>Xin chào, {username}</span>
                                <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="login-btn"
                            onClick={handleLoginClick}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>

                {/* Dropdown menu */}
                {isAuthenticated && (
                    <div className={`dropdown-wrapper ${showDropdown ? 'open' : ''}`} ref={dropdownRef}>
                        <div className="dropdown-menu-header">
                            <Link
                                to="/profile"
                                onClick={() => {
                                    setShowDropdown(false);
                                    setMobileMenuOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                Thông tin cá nhân
                            </Link>
                            <Link
                                to="/booking-history"
                                onClick={() => {
                                    setShowDropdown(false);
                                    setMobileMenuOpen(false);
                                }}
                                className="dropdown-item"
                            >
                                Lịch sử đặt lịch
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="dropdown-item logout"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;