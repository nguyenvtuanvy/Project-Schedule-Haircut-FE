import React, { useState } from 'react';
import { Table, Button, Space, Image, Input, Select, message, Popconfirm, Modal, Form, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../assets/css/ServiceManagement.css';

const { Search } = Input;
const { Option } = Select;

// Mock dữ liệu
const mockServices = [
    {
        id: 1,
        name: 'Cắt tóc nam',
        price: 150000,
        haircutTime: 45,
        image: 'https://i.postimg.cc/hPN2xWW3/image.png',
        category: { id: 1, name: 'HAIRCUT' }
    },
    {
        id: 2,
        name: 'Gội đầu dưỡng sinh',
        price: 120000,
        haircutTime: 30,
        image: 'https://i.postimg.cc/hPN2xWW3/image.png',
        category: { id: 2, name: 'SPA' }
    },
    {
        id: 3,
        name: 'Cạo mặt',
        price: 80000,
        haircutTime: 20,
        image: 'https://i.postimg.cc/hPN2xWW3/image.png',
        category: { id: 1, name: 'HAIRCUT' }
    },
    {
        id: 4,
        name: 'Massage mặt',
        price: 180000,
        haircutTime: 40,
        image: 'https://i.postimg.cc/hPN2xWW3/image.png',
        category: { id: 2, name: 'SPA' }
    },
];

const mockCombos = [
    {
        id: 1,
        name: 'Combo VIP',
        price: 300000,
        image: 'https://i.postimg.cc/hPN2xWW3/image.png',
        services: [1, 3], // Các dịch vụ trong combo
    }
];

const ServiceManagement = () => {
    const [services, setServices] = useState(mockServices);
    const [combos, setCombos] = useState(mockCombos);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [viewMode, setViewMode] = useState('service'); // 'service' hoặc 'combo'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [editingCombo, setEditingCombo] = useState(null);
    const [form] = Form.useForm();

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const handleCategoryFilter = (value) => {
        setSelectedCategory(value);
    };

    const handleDeleteService = (id) => {
        setServices(prev => prev.filter(service => service.id !== id));
        message.success('Xóa dịch vụ thành công');
    };

    const handleDeleteCombo = (id) => {
        setCombos(prev => prev.filter(combo => combo.id !== id));
        message.success('Xóa combo thành công');
    };

    const filteredServices = services.filter(service => {
        const matchName = service.name.toLowerCase().includes(searchText.toLowerCase());
        const matchCategory = selectedCategory ? service.category.name === selectedCategory : true;
        return matchName && matchCategory;
    });

    const filteredCombos = combos.filter(combo => {
        const matchName = combo.name.toLowerCase().includes(searchText.toLowerCase());
        return matchName;
    });

    const openAddModal = () => {
        setEditingService(null);
        setEditingCombo(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (service) => {
        setEditingService(service);
        setEditingCombo(null);
        form.setFieldsValue({
            name: service.name,
            price: service.price,
            haircutTime: service.haircutTime,
            image: service.image,
            category: service.category.name,
        });
        setIsModalOpen(true);
    };

    const openEditComboModal = (combo) => {
        setEditingCombo(combo);
        setEditingService(null);
        form.setFieldsValue({
            name: combo.name,
            price: combo.price,
            image: combo.image,
            services: combo.services,
        });
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        form.validateFields().then(values => {
            if (editingService) {
                // Edit service
                const updated = services.map(s =>
                    s.id === editingService.id
                        ? { ...s, ...values, category: { id: s.category.id, name: values.category } }
                        : s
                );
                setServices(updated);
                message.success('Cập nhật dịch vụ thành công');
            } else if (editingCombo) {
                // Edit combo
                const updatedCombos = combos.map(c =>
                    c.id === editingCombo.id
                        ? { ...c, ...values, services: values.services }
                        : c
                );
                setCombos(updatedCombos);
                message.success('Cập nhật combo thành công');
            } else {
                // Add new service or combo
                if (viewMode === 'service') {
                    const newService = { id: services.length + 1, ...values, category: { id: values.category === 'HAIRCUT' ? 1 : 2, name: values.category } };
                    setServices([...services, newService]);
                    message.success('Thêm dịch vụ mới thành công');
                } else if (viewMode === 'combo') {
                    const newCombo = { id: combos.length + 1, ...values };
                    setCombos([...combos, newCombo]);
                    message.success('Thêm combo mới thành công');
                }
            }
            setIsModalOpen(false);
        });
    };

    const columns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (image) => <Image src={image} width={80} />,
        },
        { title: 'Tên dịch vụ', dataIndex: 'name' },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price) => price.toLocaleString('vi-VN') + ' đ',
        },
        {
            title: 'Thời gian (phút)',
            dataIndex: 'haircutTime',
            render: (time) => `${time} phút`,
        },
        {
            title: 'Danh mục',
            dataIndex: ['category', 'name'],
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => openEditModal(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa dịch vụ này?"
                        onConfirm={() => handleDeleteService(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const comboColumns = [
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            render: (image) => <Image src={image} width={80} />,
        },
        { title: 'Tên combo', dataIndex: 'name' },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price) => price.toLocaleString('vi-VN') + ' đ',
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'services',
            render: (servicesIds) => (
                <ul>
                    {servicesIds.map(id => {
                        const service = services.find(s => s.id === id);
                        return <li key={id}>{service?.name}</li>;
                    })}
                </ul>
            ),
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => openEditComboModal(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa combo này?"
                        onConfirm={() => handleDeleteCombo(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="management-container">
            <div className="management-header">
                <h2>Quản lý Dịch vụ và Combo</h2>
                <Button type="primary" style={{ marginBottom: 16 }} onClick={openAddModal}>
                    Thêm mới
                </Button>
            </div>
            <Space style={{ marginBottom: 16 }}>
                <Select value={viewMode} onChange={setViewMode} style={{ width: 200 }}>
                    <Option value="service">Dịch vụ</Option>
                    <Option value="combo">Combo</Option>
                </Select>
                <Search
                    placeholder="Tìm kiếm"
                    allowClear
                    enterButton="Tìm"
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
                {viewMode === 'service' ? (
                    <Select
                        placeholder="Lọc theo danh mục"
                        allowClear
                        style={{ width: 200 }}
                        onChange={handleCategoryFilter}
                    >
                        <Option value="HAIRCUT">HAIRCUT</Option>
                        <Option value="SPA">SPA</Option>
                    </Select>
                ) : null}
            </Space>
            <Table
                columns={viewMode === 'service' ? columns : comboColumns}
                dataSource={viewMode === 'service' ? filteredServices : filteredCombos}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
            />
            <Modal
                title={editingService || editingCombo ? "Chỉnh sửa" : "Thêm mới"}
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={() => setIsModalOpen(false)}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian (phút)"
                        name="haircutTime"
                        rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                    {viewMode === 'service' ? (
                        <>
                            <Form.Item
                                label="Danh mục"
                                name="category"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                            >
                                <Select>
                                    <Option value="HAIRCUT">HAIRCUT</Option>
                                    <Option value="SPA">SPA</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                                rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]}
                            >
                                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                label="Dịch vụ"
                                name="services"
                                rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                            >
                                <Select mode="multiple" placeholder="Chọn dịch vụ">
                                    {services.map(service => (
                                        <Option key={service.id} value={service.id}>
                                            {service.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Hình ảnh"
                                name="image"
                                rules={[{ required: true, message: 'Vui lòng tải ảnh lên!' }]}
                            >
                                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default ServiceManagement;
