import Dashboard from '../components/Dashboard';
import ServiceManagement from '../components/ServiceManagement';
import CustomerManagement from '../components/CustomerManagement';
import StaffManagement from '../components/StaffManagement';
import ScheduleManagement from '../components/ScheduleManagement';
import TransactionManagement from '../components/TransactionManagement';
import StaffLoginForm from '../components/StaffLogin';
import AdminHome from '../pages/AdminHome';
import Booking from '../pages/Booking';
import BookingHistory from '../pages/BookingHistory';
import Cart from '../pages/Cart';
import HaircutDetail from '../pages/HaircutDetail';
import Home from '../pages/Home';
import MainLayout from '../pages/MainLayout';
import PaymentPage from '../pages/PaymentPage';
import PaymentReturn from '../pages/PaymentReturn';
import Profile from '../pages/Profile';
import StaffHome from '../pages/StaffHome';
import PrivateRoute from '../routers/privateRouters/PrivateRoute';
import AdminLoginForm from '../components/AdminLogin';

const routes = [
    {
        path: '/home',
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
        private: false,
    },
    {
        path: '/detail/:categoryId',
        element: (
            <MainLayout>
                <HaircutDetail />
            </MainLayout>
        ),
        private: false,
    },
    {
        path: '/cart',
        element: (
            <PrivateRoute role="ROLE_USER">
                <MainLayout>
                    <Cart />
                </MainLayout>
            </PrivateRoute>
        ),
        private: true,
    },
    {
        path: '/profile',
        element: (
            <PrivateRoute role="ROLE_USER">
                <MainLayout>
                    <Profile />
                </MainLayout>
            </PrivateRoute>
        ),
        private: true,
    },
    {
        path: '/booking',
        element: (
            <PrivateRoute role="ROLE_USER">
                <MainLayout>
                    <Booking />
                </MainLayout>
            </PrivateRoute>
        ),
        private: true,
    },
    {
        path: '/booking-history',
        element: (
            <PrivateRoute role="ROLE_USER">
                <MainLayout>
                    <BookingHistory />
                </MainLayout>
            </PrivateRoute>
        ),
        private: true,
    }
    ,
    {
        path: '/payment/:bookingId',
        element: (
            <PrivateRoute role="ROLE_USER">
                <PaymentPage />
            </PrivateRoute>
        ),
        private: true,
    },
    {
        path: '/payment-return',
        element: (
            <PrivateRoute role="ROLE_USER">
                <PaymentReturn />
            </PrivateRoute>
        ),
        private: true,
    },


    {
        path: '/employee/home',
        element: (
            <PrivateRoute role="ROLE_EMPLOYEE" loginPage={<StaffLoginForm />}>
                <StaffHome />
            </PrivateRoute>
        ),
        private: false,
    },

    {
        path: '/admin/*',
        element: (
            <PrivateRoute role="ROLE_ADMIN" loginPage={<AdminLoginForm />}>
                <AdminHome />
            </PrivateRoute>
        ),
        private: false,
        children: [
            {
                path: '', // /admin
                element: <Dashboard />,
            },
            {
                path: '/customers', // /admin/customers
                element: <CustomerManagement />,
            },
            {
                path: 'staff', // /admin/staff
                element: <StaffManagement />,
            },
            {
                path: 'schedules', // /admin/schedules
                element: <ScheduleManagement />,
            },
            {
                path: 'services', // /admin/services
                element: <ServiceManagement />,
            },
            {
                path: 'transactions', // /admin/transactions
                element: <TransactionManagement />,
            },
        ]
    },

];

export default routes;
