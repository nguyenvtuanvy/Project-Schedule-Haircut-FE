import React from "react";
import "../assets/Home.css";  // Import file CSS
import Footer from "../components/Footer"; // Import Footer để tái sử dụng
import bannerImage from "../assets/image/banner.jpg"; // Import ảnh banner
import logoImage from "../assets/image/logo.png"; // Import ảnh logo
import haircutImage from "../assets/image/haircut.jpg";
import hairColorImage from "../assets/image/haircolor.jpg";
import hairCurlImage from "../assets/image/haircurl.jpg";
import spa1 from "../assets/image/spa1.jpg";
import spa2 from "../assets/image/spa2.png";
import shineBanner from "../assets/image/shine_banner.jpg";
import shine1 from "../assets/image/shine1.jpg";
import shine2 from "../assets/image/shine2.jpg";
import shine3 from "../assets/image/shine3.jpg";
import ShineMemberBanner from "../assets/image/shine-member-banner.jpg";
const Home = () => {
    return (
        <div>
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src={logoImage} alt="30Shine Logo" />
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Trang Chủ</a></li>
                        <li><a href="#">Về 30Shine</a></li>
                        <li><a href="#">30Shine Shop</a></li>
                        <li><a href="#">Tìm 30Shine gần nhất</a></li>
                        <li><a href="#">Nhượng quyền</a></li>
                        <li><a href="#">Đối tác</a></li>
                        <li><a href="#">Nụ cười DV</a></li>
                    </ul>
                </nav>
                <button className="login-btn">Đăng nhập</button>
            </header>
            {/* Banner */}
            <section className="banner">
                <img src={bannerImage} alt="30 Shine Banner" />
            </section>
        {/* Đặt lịch */}
        <section className="booking">
                <div className="booking-box">
                    <h2>Đặt lịch giữ chỗ chỉ 30 giây</h2>
                    <p>Cắt xong trả tiền, hủy lịch không sao</p>
                    <div className="booking-form">
                        <input type="text" placeholder="Nhập SĐT để đặt lịch" />
                        <button>ĐẶT LỊCH NGAY</button>
                    </div>
                </div>
                <div className="rating-box">
                    <a href="#">
                        <h3>Mời anh đánh giá chất lượng dịch vụ</h3>
                        <p>Phản hồi của anh sẽ giúp chúng em cải thiện chất lượng dịch vụ tốt hơn</p>
                        <div className="stars">⭐⭐⭐⭐☆</div>
                    </a>
                </div>
            </section>
            {/* Dịch vụ tóc */}
            <section className="services">
                <h2>DỊCH VỤ TÓC</h2>
                <div className="service-list">
                    <div className="service-item">
                        <a href="#">
                            <img src={haircutImage} alt="Cắt tóc" />
                        </a>
                        <h3>Cắt tóc</h3>
                        <p>Giá từ 50.000đ</p>
                        <a href="#">Tìm hiểu thêm →</a>
                    </div>
                    <div className="service-item">
                        <a href="#">
                            <img src={hairColorImage} alt="Thay đổi màu tóc" />
                        </a>
                        <h3>Thay đổi màu tóc</h3>
                        <p>Giá từ 200.000đ</p>
                        <a href="#">Tìm hiểu thêm →</a>
                    </div>
                    <div className="service-item">
                        <a href="#">
                            <img src={hairCurlImage} alt="Uốn tóc định hình" />
                        </a>
                        <h3>Uốn tóc định hình</h3>
                        <p>Giá từ 350.000đ</p>
                        <a href="#">Tìm hiểu thêm →</a>
                    </div>
                </div>
            </section>
            {/* SPA & RELAX */}
            <section className="spa-relax">
                <h2>SPA & RELAX</h2>
                <div className="spa-list">
                    <div className="spa-item">
                        <a href="#">
                            <img src={spa1} alt="Gội Massage Relax" />
                        </a>
                        <h3>Gội Massage Relax</h3>
                        <p>Chọn Combo ...</p>
                        <a href="#">Tìm hiểu thêm →</a>
                    </div>
                    <div className="spa-item">
                        <a href="#">
                            <img src={spa2} alt="Lấy ráy tai êm" />
                        </a>
                        <h3>Lấy ráy tai êm</h3>
                        <p>Giá từ 60.000đ</p>
                        <a href="#">Tìm hiểu thêm →</a>
                    </div>
                </div>
            </section>
            {/* SHINE COLLECTION */}
            <section className="shine-collection">
                <h2>SHINE COLLECTION - `VIBE` NÀO CŨNG TỎA SÁNG</h2>
                <div className="shine-list">
                    <div className="shine-item shine-banner">
                        <a href="#">
                            <img src={shineBanner} alt="Men Hairstyle AW 25-26" />
                        </a>
                    </div>
                    <div className="shine-item">
                        <a href="#">
                            <img src={shine1} alt="Ready for new game" />
                        </a>
                    </div>
                    <div className="shine-item">
                        <a href="#">
                            <img src={shine2} alt="Anh trai say hair" />
                        </a>
                    </div>
                    <div className="shine-item">
                        <a href="#">
                            <img src={shine3} alt="Bad Boy" />
                        </a>
                    </div>
                </div>
            </section>
            {/* Top Thợ Cắt Tóc Trong Tháng */}
            <section className="top-barbers">
                <div className="top-barbers-header">
                    <h2>TOP THỢ CẮT TÓC TRONG THÁNG</h2>
                    <p>Đội ngũ Stylist dày dặn kinh nghiệm</p>
                </div>
                <div className="barber-list">
                    <div className="barber-item">
                        <img src={require("../assets/image/barber1.jpg")} alt="Dương Văn Mạnh" />
                        <h3>Dương Văn Mạnh</h3>
                        <p>345 Nguyễn Văn Linh, Đà Nẵng</p>
                    </div>
                    <div className="barber-item">
                        <img src={require("../assets/image/barber2.jpg")} alt="Đỗ Duy Thành" />
                        <h3>Đỗ Duy Thành</h3>
                        <p>172 Quang Trung, Đà Nẵng</p>
                    </div>
                    <div className="barber-item">
                        <img src={require("../assets/image/barber3.jpg")} alt="Nguyễn Văn Thuận" />
                        <h3>Nguyễn Văn Thuận</h3>
                        <p>328 Bạch Đằng, Hà Nội</p>
                    </div>
                </div>
            </section>
            {/* Shine Member */}
            <section className="shine-member">
                <h2 className="shine-title">SHINE MEMBER</h2>
                <p className="shine-description">
                    Khi tham gia chương trình thành viên, anh được hưởng những ưu đãi đặc biệt và nhiều quyền lợi vượt trội trong quá trình sử dụng dịch vụ.
                </p>
                <div className="shine-banner">
                    <a href="">
                        <img src={ShineMemberBanner} alt="Shine Member Banner" />
                    </a>
                </div>
            </section>
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default Home;