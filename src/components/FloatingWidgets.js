import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/FloatingWidgets.css';
import botImg from '../assets/image/bot.jpg';
import barberImg from '../assets/image/barber.png';
import { FaArrowUp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import CountService from './CountService';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import useAIService from '../services/aiService';
import { toast } from 'react-toastify';

const ChatBox = ({ onClose }) => {
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);
    const { sendMessage, messages, isLoading } = useAIService();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        try {
            if (!inputMessage.trim()) return;

            await sendMessage(inputMessage);
            setInputMessage('');
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="chat-box">
            <div className="chat-header">
                <h3>Chatbot</h3>
                <button className="close-btn" onClick={onClose}>
                    <FaTimes size={16} />
                </button>
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
                                src={barberImg} // Thay bằng avatar người dùng thực tế
                                alt="User avatar"
                                className="message-avatar"
                            />
                        )}

                        <div className={`message ${msg.isError ? 'error' : ''}`}>
                            <span dangerouslySetInnerHTML={{ __html: msg.text }} />
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

            <div className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>
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
        const startingY = window.scrollY;
        const duration = 1000; // Thời gian cuộn (ms)
        const startTime = performance.now();

        const easeOutQuad = (t) => t * (2 - t); // Hàm easing để giảm tốc dần

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            window.scrollTo(0, startingY * (1 - easeOutQuad(progress)));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
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