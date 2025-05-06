// CustomerManagement.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Input, Tag, Popconfirm, message } from 'antd';
import { SearchOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import '../assets/css/Management.css';

// Mock data for customers
const mockCustomers = [
    {
        id: 1,
        fullName: 'Nguyễn Văn A',
        phone: '0987654321',
        email: 'a.nguyen@example.com',
        isBlocked: false,
        bookings: 5
    },
    {
        id: 2,
        fullName: 'Trần Thị B',
        phone: '0912345678',
        email: 'b.tran@example.com',
        isBlocked: true,
        bookings: 2
    },
    {
        id: 3,
        fullName: 'Lê Văn C',
        phone: '0978123456',
        email: 'c.le@example.com',
        isBlocked: false,
        bookings: 10
    },
    {
        id: 4,
        fullName: 'Phạm Thị D',
        phone: '0965432187',
        email: 'd.pham@example.com',
        isBlocked: false,
        bookings: 3
    },
    {
        id: 5,
        fullName: 'Hoàng Văn E',
        phone: '0932165498',
        email: 'e.hoang@example.com',
        isBlocked: true,
        bookings: 1
    }
];

const CustomerManagement = () => {
    const [customers, setCustomers] = useState(mockCustomers);
    const [searchText, setSearchText] = useState('');

    const handleBlock = (id) => {
        setCustomers(customers.map(customer =>
            customer.id === id ? { ...customer, isBlocked: !customer.isBlocked } : customer
        ));
        message.success('Cập nhật trạng thái thành công');
    };

    const handleDelete = (id) => {
        setCustomers(customers.filter(customer => customer.id !== id));
        message.success('Xóa khách hàng thành công');
    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Lịch sử đặt',
            dataIndex: 'bookings',
            key: 'bookings',
            render: bookings => `${bookings} lần`
        },
        {
            title: 'Trạng thái',
            key: 'isBlocked',
            render: (_, record) => (
                <Tag color={record.isBlocked ? 'red' : 'green'}>
                    {record.isBlocked ? 'Đã khóa' : 'Hoạt động'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
                        onClick={() => handleBlock(record.id)}
                    >
                        {record.isBlocked ? 'Mở khóa' : 'Khóa'}
                    </Button>
                    <Popconfirm
                        title="Xác nhận xóa?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredData = customers.filter(customer =>
        Object.values(customer).some(value =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className="management-container">
            <div className="management-header">
                <h2>Quản lý Khách hàng</h2>
                <Input.Search
                    placeholder="Tìm kiếm..."
                    prefix={<SearchOutlined />}
                    style={{ width: 300 }}
                    onSearch={setSearchText}
                    allowClear
                />
            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                bordered
                pagination={{ pageSize: 8 }}
            />
        </div>
    );
};

export default CustomerManagement;