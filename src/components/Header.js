import React from "react";
import logoImage from "../assets/image/logo.png";
const Header = ({ onOpenLogin }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="30Shine Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="/">Trang Chủ</a></li>
          <li><a href="/about">Về 30Shine</a></li>
          <li><a href="/shop">30Shine Shop</a></li>
          <li><a href="/locations">Tìm 30Shine gần nhất</a></li>
          <li><a href="/franchise">Nhượng quyền</a></li>
          <li><a href="/partners">Đối tác</a></li>
          <li><a href="/dv-smiles">Nụ cười DV</a></li>
        </ul>
      </nav>
      <button className="login-btn" onClick={onOpenLogin}>Đăng nhập</button>
    </header>
  );
};

export default Header;