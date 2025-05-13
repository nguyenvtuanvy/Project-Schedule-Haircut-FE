import React, { useState, useEffect } from 'react';
import { Select, Button, TimePicker, message, List, Spin, Card, Tag } from 'antd';
import { PlusOutlined, ScheduleOutlined } from '@ant-design/icons';
import moment from 'moment';
import '../assets/css/Management.css';
import useManagementService from '../services/managementService';

const ScheduleManagement = () => {
    const { getAccounts, managementState } = useManagementService();
    const [staffMembers, setStaffMembers] = useState([]);
    const [staffTimes, setStaffTimes] = useState({});
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                setLoading(true);
                const response = await getAccounts();

                const staffData = response.reduce((acc, staff) => {
                    if (staff.type === "STAFF") {
                        acc.members.push({
                            id: staff.id,
                            name: staff.account.fullName,
                        });
                        acc.times[staff.id] = staff.times;
                    }
                    return acc;
                }, { members: [], times: {} });

                setStaffMembers(staffData.members);
                setStaffTimes(staffData.times);

            } catch (error) {
                message.error("Lỗi tải dữ liệu nhân viên");
            } finally {
                setLoading(false);
            }
        };

        fetchStaffData();
    }, []);

    const disabledHours = () => [...Array(24).keys()].filter(h => h < 8 || h > 17);
    const disabledMinutes = () => [...Array(60).keys()].filter(m => m % 30 !== 0);

    const handleAddTime = async () => {
        if (!selectedStaff || !selectedTime) {
            message.warning('Vui lòng chọn nhân viên và giờ làm');
            return;
        }

        const newTime = selectedTime.format('HH:mm');
        const currentTimes = staffTimes[selectedStaff] || [];

        if (currentTimes.includes(newTime)) {
            message.warning('Giờ làm đã tồn tại');
            return;
        }

        try {
            // Giả sử có API endpoint updateStaffTimes
            // await updateStaffTimes(selectedStaff, [...currentTimes, newTime]);

            // Cập nhật client-side tạm thời
            setStaffTimes(prev => ({
                ...prev,
                [selectedStaff]: [...currentTimes, newTime]
            }));

            message.success('Thêm giờ làm thành công');
            setSelectedTime(null);
        } catch (error) {
            message.error('Thêm giờ làm thất bại');
        }
    };

    return (
        <div className="management-container">
            <Card
                title={
                    <div className="header-title">
                        <ScheduleOutlined style={{ marginRight: 12, color: '#1890ff' }} />
                        <span>Quản lý Lịch làm việc</span>
                    </div>
                }
                bordered={false}
                headStyle={{ borderBottom: '1px solid #f0f0f0' }}
            >
                <Spin spinning={loading || managementState.loading}>
                    <div className="schedule-controls">
                        <div className="staff-selector">
                            <Select
                                placeholder="Chọn nhân viên"
                                style={{ width: '100%' }}
                                value={selectedStaff}
                                onChange={setSelectedStaff}
                                options={staffMembers.map(staff => ({
                                    value: staff.id,
                                    label: staff.name
                                }))}
                                optionFilterProp="label"
                                showSearch
                                filterOption={(input, option) =>
                                    option.label.props.children[1].props.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            />
                        </div>

                        <div className="time-picker-section">
                            <TimePicker
                                format="HH:mm"
                                value={selectedTime}
                                onChange={setSelectedTime}
                                disabledHours={disabledHours}
                                disabledMinutes={disabledMinutes}
                                minuteStep={30}
                                placeholder="Chọn khung giờ"
                                style={{ width: '100%' }}
                                suffixIcon={<ScheduleOutlined />}
                            />
                        </div>

                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddTime}
                            disabled={!selectedStaff}
                            className="add-button"
                            block
                        >
                            Thêm khung giờ
                        </Button>
                    </div>

                    {selectedStaff && (
                        <Card
                            className="schedule-list"
                            title={
                                <div className="schedule-title">
                                    <span>Lịch làm việc của </span>
                                    <Tag color="blue">
                                        {staffMembers.find(s => s.id === selectedStaff)?.name}
                                    </Tag>
                                </div>
                            }
                        >
                            <List
                                grid={{ gutter: 16, column: 2 }}
                                dataSource={staffTimes[selectedStaff] || []}
                                renderItem={time => (
                                    <List.Item>
                                        <div className="time-slot">
                                            <span className="time-text">{time}</span>
                                            <Button
                                                type="link"
                                                danger
                                            // onClick={() => handleRemoveTime(time)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </List.Item>
                                )}
                                locale={{ emptyText: 'Chưa có lịch làm việc' }}
                            />
                        </Card>
                    )}
                </Spin>
            </Card>
        </div>
    );
};

export default ScheduleManagement;