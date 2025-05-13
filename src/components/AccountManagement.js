import React, { useState, useEffect } from 'react';
import {
    Table, Button, Modal, Form, Input, Select, Tag,
    Space, Popconfirm, message, DatePicker,
    Tabs, Divider, Row, Col, Spin,
    InputNumber
} from 'antd';
import {
    PlusOutlined, EditOutlined, DeleteOutlined,
    LockOutlined, UnlockOutlined, UserOutlined, TeamOutlined
} from '@ant-design/icons';
import '../assets/css/Management.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useManagementService from '../services/managementService';

dayjs.extend(customParseFormat);

const { TabPane } = Tabs;

const roleOptions = [
    { value: 0, label: 'Thợ cắt tóc' },
    { value: 1, label: 'Nhân viên spa' },
];

const AccountManagement = () => {
    const {
        getAccounts,
        managementState,
        createNewEmployee,
        updateAccount,
        deleteAccount,
        toggleAccountStatus
    } = useManagementService();

    const [accounts, setAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeTab, setActiveTab] = useState('staff');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAccounts();
            const filtered = data.filter(account =>
                account.type === (activeTab === 'staff' ? 'STAFF' : 'CUSTOMER')
            );
            setAccounts(filtered);
        } catch (error) {
            message.error('Lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            setLoading(true);
            await toggleAccountStatus(id);
            setAccounts(accounts.map(account =>
                account.id === id ? { ...account, isBlocked: !account.isBlocked } : account
            ));
            message.success('Cập nhật trạng thái thành công');
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteAccount(id);
            setAccounts(accounts.filter(account => account.id !== id));
            message.success('Xóa tài khoản thành công');
        } catch (error) {
            message.error(error.response?.data?.message || 'Lỗi khi xóa tài khoản');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            const requestData = {
                ...values.account,
                role: values.role,
                type: 'STAFF'
            };

            if (editingId) {
                const updatedAccount = await updateAccount(editingId, requestData);
                setAccounts(accounts.map(acc =>
                    acc.id === editingId ? { ...acc, ...updatedAccount } : acc
                ));
                message.success('Cập nhật tài khoản thành công');
            } else {
                const createdAccount = await createNewEmployee(requestData);
                setAccounts([...accounts, createdAccount]);
                message.success('Tạo tài khoản thành công');
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error(error.response?.data?.message || 'Vui lòng kiểm tra lại thông tin');
        }
    };

    const staffColumns = [
        {
            title: 'Họ tên',
            dataIndex: ['account', 'fullName'],
            key: 'fullName',
            sorter: (a, b) => a.account.fullName.localeCompare(b.account.fullName),
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
            render: role => roleOptions.find(r => r.value === role)?.label || role,
            filters: roleOptions.map(r => ({ text: r.label, value: r.value })),
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'SĐT',
            dataIndex: ['account', 'phone'],
            key: 'phone',
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
                                account: {
                                    fullName: record.account.fullName,
                                    userName: record.account.userName,
                                    email: record.account.email,
                                    phone: record.account.phone,
                                    age: record.account.age,
                                    address: record.account.address
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
                    {/* <Popconfirm
                        title="Xác nhận xóa vĩnh viễn?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm> */}
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
                <TabPane tab={<span><TeamOutlined />Nhân viên</span>} key="staff">
                    <Table
                        columns={staffColumns}
                        dataSource={accounts.filter(a => a.type === 'STAFF')}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 8,
                            showSizeChanger: false
                        }}
                        bordered
                        scroll={{ x: 1200 }}
                    />
                </TabPane>

                <TabPane tab={<span><UserOutlined />Khách hàng</span>} key="customer">
                    <Table
                        columns={customerColumns}
                        dataSource={accounts.filter(a => a.type === 'CUSTOMER')}
                        rowKey="id"
                        loading={loading}
                        pagination={{
                            pageSize: 8,
                            showSizeChanger: false
                        }}
                        bordered
                    />
                </TabPane>
            </Tabs>

            <Modal
                title={editingId ? 'Cập nhật tài khoản' : 'Thêm tài khoản nhân viên'}
                visible={isModalVisible}
                onOk={handleFormSubmit}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                width={800}
                destroyOnClose
                footer={[
                    <Button key="back" onClick={() => setIsModalVisible(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={managementState.loading}
                        onClick={handleFormSubmit}
                    >
                        {editingId ? 'Cập nhật' : 'Tạo mới'}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical" preserve={false}>
                    <h3>Thông tin tài khoản</h3>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'fullName']}
                                label="Họ tên"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập họ tên',
                                    whitespace: true
                                }]}
                            >
                                <Input placeholder="Nguyễn Văn A" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['account', 'userName']}
                                label="Tên đăng nhập"
                                rules={[{
                                    required: true,
                                    message: 'Vui lòng nhập tên đăng nhập',
                                    pattern: /^[a-zA-Z0-9_]+$/,
                                    message: 'Chỉ cho phép chữ, số và dấu gạch dưới'
                                }]}
                            >
                                <Input
                                    placeholder="hieunguyen"
                                    disabled={!!editingId}
                                />
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
                                name={['account', 'age']}
                                label="Tuổi"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập tuổi' },
                                    { type: 'number', min: 18, max: 60, message: 'Tuổi phải từ 18 đến 60' }
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name={['account', 'address']}
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

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
                                        <Input.Password placeholder="••••••" />
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
                                        <Input.Password placeholder="••••••" />
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