import React, { useState, useEffect } from 'react';
import {
    Table, Button, Modal, Form, Input, Select, Tag,
    Space, Popconfirm, message, DatePicker, Upload,
    Tabs, Divider, Row, Col, Spin
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    LockOutlined, UnlockOutlined, UploadOutlined,
    UserOutlined, TeamOutlined
} from '@ant-design/icons';
import '../assets/css/Management.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { TabPane } = Tabs;

// Mock data
const mockAccounts = [
    // Staff accounts
    {
        id: 1,
        type: 'STAFF',
        account: {
            userName: 'staff1',
            email: 'staff1@example.com',
            fullName: 'Nguyễn Văn A',
            phone: '0987654321',
            age: 28,
            address: 'Hà Nội',
            avatar: '',
            createdAt: '2023-01-15T10:30:00',
            updatedAt: '2023-06-20T14:45:00'
        },
        role: 'HAIR_STYLIST',
        isBlocked: false,
        times: ['08:00-12:00', '13:00-17:00']
    },
    // Customer accounts
    {
        id: 2,
        type: 'CUSTOMER',
        account: {
            userName: 'customer1',
            email: 'customer1@example.com',
            fullName: 'Trần Thị B',
            phone: '0912345678',
            age: 32,
            address: 'TP.HCM',
            avatar: '',
            createdAt: '2023-02-20T09:15:00',
            updatedAt: '2023-07-10T11:20:00'
        },
        bookingCount: 5,
        isBlocked: false
    }
];

const roleOptions = [
    { value: 'HAIR_STYLIST', label: 'Thợ cắt tóc' },
    { value: 'SPA_STAFF', label: 'Nhân viên spa' },
    { value: 'MANAGER', label: 'Quản lý' }
];

const timeSlots = [
    { value: '08:00-12:00', label: 'Sáng (8h-12h)' },
    { value: '13:00-17:00', label: 'Chiều (13h-17h)' },
    { value: '18:00-22:00', label: 'Tối (18h-22h)' }
];

const AccountManagement = () => {
    const [accounts, setAccounts] = useState(mockAccounts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState('staff');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch data from API based on activeTab
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Replace with actual API call
            // const response = await fetchAccounts(activeTab);
            // setAccounts(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            setLoading(true);
            // Call API to toggle status
            // await toggleAccountStatus(id);

            // Update UI temporarily
            setAccounts(accounts.map(account =>
                account.id === id ? { ...account, isBlocked: !account.isBlocked } : account
            ));
            message.success('Cập nhật trạng thái thành công');
        } catch (error) {
            message.error('Lỗi khi cập nhật trạng thái');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            // Call API to delete
            // await deleteAccount(id);

            setAccounts(accounts.filter(account => account.id !== id));
            message.success('Xóa tài khoản thành công');
        } catch (error) {
            message.error('Lỗi khi xóa tài khoản');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                type: activeTab === 'staff' ? 'STAFF' : 'CUSTOMER',
                account: {
                    ...values.account,
                    age: parseInt(values.account.age),
                    createdAt: values.account.createdAt?.format('YYYY-MM-DDTHH:mm:ss'),
                    updatedAt: new Date().toISOString()
                },
                ...(activeTab === 'staff' && { times: values.times || [] })
            };

            if (editingId) {
                // Call API to update
                // await updateAccount(editingId, formattedValues);

                setAccounts(accounts.map(account =>
                    account.id === editingId ? formattedValues : account
                ));
                message.success('Cập nhật thành công');
            } else {
                // Call API to create
                // const newAccount = await createAccount(formattedValues);

                const newAccount = {
                    id: Math.max(...accounts.map(a => a.id), 0) + 1,
                    ...formattedValues,
                    isBlocked: false,
                    ...(activeTab === 'customer' && { bookingCount: 0 })
                };
                setAccounts([...accounts, newAccount]);
                message.success('Tạo tài khoản thành công');
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error('Vui lòng kiểm tra lại thông tin');
        }
    };

    const staffColumns = [
        {
            title: 'Họ tên',
            dataIndex: ['account', 'fullName'],
            key: 'fullName',
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: ['account', 'userName'],
            key: 'userName',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: role => roleOptions.find(r => r.value === role)?.label || role
        },
        {
            title: 'SĐT',
            dataIndex: ['account', 'phone'],
            key: 'phone',
        },
        {
            title: 'Ca làm việc',
            dataIndex: 'times',
            key: 'times',
            render: times => times?.map(time => (
                <Tag key={time}>{timeSlots.find(t => t.value === time)?.label || time}</Tag>
            ))
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
                        icon={<EditOutlined />}
                        onClick={() => {
                            form.setFieldsValue({
                                role: record.role,
                                times: record.times,
                                account: {
                                    ...record.account,
                                    createdAt: record.account.createdAt ? dayjs(record.account.createdAt) : null
                                }
                            });
                            setEditingId(record.id);
                            setIsModalVisible(true);
                        }}
                    />
                    <Button
                        icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
                        onClick={() => handleToggleStatus(record.id)}
                    />
                    <Popconfirm
                        title="Xác nhận xóa vĩnh viễn?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const customerColumns = [
        {
            title: 'Họ tên',
            dataIndex: ['account', 'fullName'],
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: ['account', 'email'],
            key: 'email',
        },
        {
            title: 'SĐT',
            dataIndex: ['account', 'phone'],
            key: 'phone',
        },
        {
            title: 'Lịch sử đặt',
            dataIndex: 'bookingCount',
            key: 'bookingCount',
            render: count => `${count} lần`
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
                        onClick={() => handleToggleStatus(record.id)}
                    />
                </Space>
            ),
        },
    ];

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const filteredAccounts = accounts.filter(account =>
        account.type === (activeTab === 'staff' ? 'STAFF' : 'CUSTOMER')
    );

    return (
        <div className="management-container">
            <div className="management-header">
                <h2>Quản lý Tài khoản</h2>
                {activeTab === 'staff' && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setEditingId(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Thêm tài khoản
                    </Button>
                )}
            </div>

            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane
                    tab={
                        <span>
                            <TeamOutlined />
                            Nhân viên
                        </span>
                    }
                    key="staff"
                >
                    <Table
                        columns={staffColumns}
                        dataSource={filteredAccounts}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 8 }}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            Khách hàng
                        </span>
                    }
                    key="customer"
                >
                    <Table
                        columns={customerColumns}
                        dataSource={filteredAccounts}
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 8 }}
                    />
                </TabPane>
            </Tabs>

            {/* Staff Account Modal */}
            <Modal
                title={editingId ? 'Cập nhật tài khoản' : 'Thêm tài khoản nhân viên'}
                visible={isModalVisible && activeTab === 'staff'}
                onOk={handleFormSubmit}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                destroyOnClose
            >
                <Form form={form} layout="vertical" preserve={false}>
                    <h3>Thông tin tài khoản</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'fullName']}
                                label="Họ tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'userName']}
                                label="Tên đăng nhập"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input disabled={!!editingId} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'email']}
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'phone']}
                                label="Số điện thoại"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập số điện thoại' },
                                    { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="role"
                                label="Vai trò"
                                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                            >
                                <Select options={roleOptions} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="times"
                                label="Ca làm việc"
                            >
                                <Select mode="multiple" options={timeSlots} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'age']}
                                label="Tuổi"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tuổi' },
                                    { type: 'number', min: 18, max: 60, message: 'Tuổi phải từ 18 đến 60' }
                                ]}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'address']}
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name={['account', 'avatar']}
                        label="Ảnh đại diện"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="avatar" listType="picture" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Tải lên</Button>
                        </Upload>
                    </Form.Item>

                    {!editingId && (
                        <>
                            <Divider />
                            <h3>Thông tin đăng nhập</h3>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name={['account', 'password']}
                                        label="Mật khẩu"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập mật khẩu' },
                                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="confirmPassword"
                                        label="Xác nhận mật khẩu"
                                        dependencies={['account', 'password']}
                                        rules={[
                                            { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue(['account', 'password']) === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Mật khẩu không khớp'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default AccountManagement;