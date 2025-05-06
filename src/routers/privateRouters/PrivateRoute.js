import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children, role, loginPage }) => {
    const token = Cookies.get('accessToken');
    const userRole = Cookies.get('role');
    const [status, setStatus] = useState('checking');

    useEffect(() => {
        if (!token) {
            if (loginPage) {
                setStatus('showLogin');
            } else {
                toast.warn('Bạn cần đăng nhập để truy cập vào trang này');
                setTimeout(() => setStatus('redirect'), 1000);
            }
        } else if (role && userRole !== role) {
            toast.error('Bạn không có quyền truy cập trang này');
            setTimeout(() => setStatus('unauthorized'), 1000);
        } else {
            setStatus('authorized');
        }
    }, [token, role, userRole, loginPage]);

    if (status === 'checking') {
        return null;
    }

    if (status === 'redirect') {
        return <Navigate to="/home" replace />;
    }

    if (status === 'unauthorized') {
        return null;
    }

    if (status === 'authorized') {
        return children;
    }

    if (status === 'showLogin') {
        return loginPage;
    }

    return null;
};

export default PrivateRoute;
