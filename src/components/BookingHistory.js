import React from 'react';
import '../assets/BookingHistory.css';
import Header from './Header';
import Footer from './Footer';
import haircutImg from '../assets/image/haircut.jpg';
import earCleaningImg from '../assets/image/spa2.png';

const BookingHistory = () => {
  return (
    <div className="booking-page">
      <Header />

      <div className="booking-history">
        <h2>Lịch sử đặt lịch</h2>

        <div className="status-tabs">
          <span className="active">Chờ xác nhận</span>
          <span>Đã xác nhận</span>
          <span>Đã hoàn thành</span>
        </div>

        <div className="booking-item">
          <img src={haircutImg} alt="Hớt tóc combo 1" />
          <div className="details">
            <h3>Hớt tóc combo 1</h3>
            <p>Combo cắt kỹ, gội đầu massage thư giãn</p>
            <span>x1</span>
          </div>
          <div className="price-action">
            <span>150.000đ</span>
            <button>Thanh toán</button>
          </div>
        </div>

        <div className="booking-item">
          <img src={earCleaningImg} alt="Lấy ráy tai êm" />
          <div className="details">
            <h3>Lấy ráy tai êm</h3>
            <p>Kĩ thuật lấy ráy tai nhẹ nhàng, thư giãn trong không gian yên tĩnh, sạch sẽ</p>
            <span>x1</span>
          </div>
          <div className="price-action">
            <span>70.000đ</span>
            <button>Thanh toán</button>
          </div>
        </div>

        <div className="total-payment">
          <span>Thành tiền : 220.000đ</span>
        </div>

        <div className="action-buttons">
          <button className="review">Đánh giá</button>
          <button className="refund">Yêu cầu trả tiền/ Hoàn tiền</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingHistory;
