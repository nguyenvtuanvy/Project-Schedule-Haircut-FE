import React, { useEffect, useState, useRef } from 'react';
import { FaChevronDown, FaCalendarAlt } from 'react-icons/fa';
import '../assets/css/BookingDatePicker.css';

const BookingDatePicker = ({ selectedDate, onSelect, onNext, onBack }) => {
    const [dateOptions, setDateOptions] = useState([]);
    const [showDateList, setShowDateList] = useState(false);
    const datePickerRef = useRef(null);

    useEffect(() => {
        const options = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayName = date.toLocaleDateString('vi-VN', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, ' - ');

            const isWeekend = date.getDay() === 0 || date.getDay() === 6;

            options.push({
                dayName,
                date: formattedDate,
                isWeekend,
                disabled: i > 1, // Chỉ cho chọn 2 ngày đầu tiên (i = 0 hoặc 1)
            });
        }

        setDateOptions(options);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDateList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="date-picker-container" ref={datePickerRef}>
            <h2 className="date-picker-title">3. Chọn Ngày</h2>

            <div className="date-selector">
                <div
                    className="date-toggle"
                    onClick={() => setShowDateList(!showDateList)}
                >
                    <span className="date-placeholder">
                        {selectedDate ? `Đã chọn: ${selectedDate}` : 'Chọn ngày phù hợp'}
                    </span>
                    <FaChevronDown
                        className={`dropdown-arrow ${showDateList ? 'open' : ''}`}
                    />
                </div>

                {showDateList && (
                    <div className="date-list-container">
                        {dateOptions.map((date, index) => (
                            <div
                                key={index}
                                className={`date-option 
                                    ${selectedDate === date.date ? 'selected' : ''} 
                                    ${date.disabled ? 'disabled' : ''}
                                `}
                                onClick={() => {
                                    if (!date.disabled) {
                                        onSelect(date.date);
                                        setShowDateList(false);
                                    }
                                }}
                            >
                                <div className="date-info">
                                    <div className="day-name">{date.dayName}</div>
                                    <div className="date-number">{date.date}</div>
                                </div>
                                <div className={`date-status ${date.isWeekend ? 'status-weekend' : 'status-weekday'}`}>
                                    {date.isWeekend ? 'Cuối tuần' : 'Ngày thường'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedDate && (
                <div className="selected-date-display">
                    <FaCalendarAlt className="selected-date-icon" />
                    <div className="selected-date-text">
                        Ngày đã chọn: {selectedDate}
                    </div>
                </div>
            )}

            <div className="navigation-buttons">
                <button className="nav-button back-button-date-picker" onClick={onBack}>
                    Quay lại
                </button>
                <button
                    className="nav-button next-button"
                    onClick={onNext}
                    disabled={!selectedDate}
                >
                    Tiếp theo
                </button>
            </div>
        </div>
    );
};

export default BookingDatePicker;
