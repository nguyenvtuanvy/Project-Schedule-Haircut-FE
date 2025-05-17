import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/FloatingWidgets.css';
import botImg from '../assets/image/bot.jpg';
import barberImg from '../assets/image/barber.png';
import { FaArrowUp, FaTimes, FaPaperPlane, FaCut } from 'react-icons/fa';
import CountService from './CountService';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useAIService from '../services/aiService';
import { toast } from 'react-toastify';
import { addMessage } from '../stores/slices/aiSlice';
import { useDispatch } from 'react-redux';

const ChatBox = ({ onClose }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [activeFeature, setActiveFeature] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const {
        sendMessage,
        messages,
        isLoading,
        clearChatHistory
    } = useAIService();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeFeature]);

    const handleSend = async () => {
        try {
            if (!inputMessage.trim()) return;

            // Thêm tin nhắn người dùng trước khi gửi
            dispatch(addMessage({
                text: inputMessage,
                isBot: false,
                isError: false
            }));

            await sendMessage(inputMessage);
            setInputMessage('');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleQuickAction = async (action) => {
        setActiveFeature(action);
        setInputMessage('');
        inputRef.current.focus();

        let message = '';
        switch (action) {
            case 'hairstyle':
                message = "Hãy mô tả khuôn mặt và kiểu tóc hiện tại của bạn (ví dụ: 'Mặt tròn, tóc dày và xoăn')";
                break;
            default:
                message = "Tôi có thể giúp gì cho bạn?";
        }

        // Chỉ gửi tin nhắn qua sendMessage, không dispatch trực tiếp
        await sendMessage(message);
    };

    const renderQuickActions = () => (
        <div className="quick-actions">
            <button
                onClick={() => handleQuickAction('hairstyle')}
                className={activeFeature === 'hairstyle' ? 'active' : ''}
                disabled={isLoading}
            >
                <FaCut /> Gợi ý kiểu tóc
            </button>
        </div>
    );

    return (
        <div className="chat-box">
            <div className="chat-header">
                <h3>Trợ lý BarberPro</h3>
                <div className="header-actions">
                    <button
                        className="clear-btn"
                        onClick={clearChatHistory}
                        title="Xóa lịch sử chat"
                        disabled={isLoading}
                    >
                        Xóa
                    </button>
                    <button className="close-btn" onClick={onClose} disabled={isLoading}>
                        <FaTimes size={16} />
                    </button>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-container ${msg.isBot ? 'bot' : 'user'}`}
                    >
                        {msg.isBot && (
                            <img
                                src={botImg}
                                alt="Bot avatar"
                                className="message-avatar"
                            />
                        )}

                        {!msg.isBot && (
                            <img
                                src={barberImg}
                                alt="User avatar"
                                className="message-avatar"
                            />
                        )}

                        <div className={`message ${msg.isError ? 'error' : ''}`}>
                            {msg.text.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line.startsWith('-') ? (
                                        <div style={{ marginLeft: '15px' }}>{line}</div>
                                    ) : (
                                        <div>{line}</div>
                                    )}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message-container bot">
                        <img
                            src={botImg}
                            alt="Bot avatar"
                            className="message-avatar"
                        />
                        <div className="message loading">
                            <SyncLoader size={6} color="#333" speedMultiplier={0.5} />
                            <span>Đang trả lời...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {renderQuickActions()}

            <div className="chat-input">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                        activeFeature === 'hairstyle' ? "Mô tả khuôn mặt/kiểu tóc..." :
                            "Nhập tin nhắn..."
                    }
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading || !inputMessage.trim()}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

const FloatingWidgets = () => {
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleBarberClick = () => {
        navigate('/cart');
    };

    return (
        <div className="floating-widgets">
            {showChat && <ChatBox onClose={() => setShowChat(false)} />}

            <div className="circle-btn arrow" onClick={scrollToTop}>
                <FaArrowUp color="white" size={20} />
            </div>

            <div
                className="circle-btn"
                onClick={() => setShowChat(!showChat)}
            >
                <img src={botImg} alt="Chatbot" />
            </div>

            <div
                className="circle-btn outline"
                onClick={handleBarberClick}
            >
                <img src={barberImg} alt="Barber" />
                <CountService />
            </div>
        </div>
    );
};

export default FloatingWidgets;