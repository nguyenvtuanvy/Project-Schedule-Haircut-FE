// src/components/ServiceDetail.js

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/ServiceDetail.css";

const ServiceDetail = ({ title, subtitle, combos }) => {
  return (
    <>
      <Header />

      <section className="service-detail">
        <h2 className="service-title">{title}</h2>
        <p className="service-subtitle">{subtitle}</p>

        <div className="combo-list">
          {combos.map((combo, index) => (
            <div key={index} className="combo-card">
              <h3>{combo.name}</h3>
              <p>{combo.description}</p>
              <img src={combo.image} alt={combo.name} />
              <div className="combo-footer">
                <span>{combo.time} phút</span>
                <a href={combo.link}>Tìm hiểu thêm →</a>
              </div>
            </div>
          ))}
        </div>

        <button className="booking-button">ĐẶT LỊCH NGAY</button>
      </section>

      <Footer />
    </>
  );
};

export default ServiceDetail;
