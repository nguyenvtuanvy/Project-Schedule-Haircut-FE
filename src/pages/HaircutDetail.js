// src/pages/HaircutDetail.js

import React from "react";
import ServiceDetail from "../components/ServiceDetail";

// import hình ảnh cho từng combo
import combo1 from "../assets/image/combo1.jpg";
import combo2 from "../assets/image/combo2.jpg";
import combo3 from "../assets/image/combo3.png";
import combo4 from "../assets/image/combo4.jpg";
import combo5 from "../assets/image/combo5.jpg";
import combo6 from "../assets/image/combo6.jpg";

const HaircutDetail = () => {
  const haircutCombos = [
    {
      name: "Cắt gội khoang thường gia",
      description: "Combo cắt kỹ, combo gội massage",
      image: combo1,
      time: 50,
      link: "#",
    },
    {
      name: "Cắt gội Combo 1",
      description: "Combo cắt kỹ, combo gội massage",
      image: combo2,
      time: 45,
      link: "#",
    },
    {
      name: "Cắt gội Combo 2",
      description: "Combo cắt kỹ, Combo gội massage cổ vai gáy",
      image: combo3,
      time: 55,
      link: "#",
    },
    {
      name: "Cắt gội Combo 3",
      description: "Combo cắt kỹ, Combo gội massage chăm sóc da",
      image: combo4,
      time: 65,
      link: "#",
    },
    {
      name: "Cắt gội Combo 4",
      description: "Combo cắt kỹ, Combo gội massage bằng đá nóng",
      image: combo5,
      time: 75,
      link: "#",
    },
    {
      name: "Cắt gội Combo 5",
      description: "Combo cắt kỹ, Combo gội massage lấy nhân mụn",
      image: combo6,
      time: 75,
      link: "#",
    },
  ];

  return (
    <ServiceDetail
      title="DỊCH VỤ TÓC"
      subtitle="Trải nghiệm cắt tóc phong cách dành riêng cho phái mạnh, vừa tiện lợi vừa thư giãn tại đây"
      combos={haircutCombos}
    />
  );
};

export default HaircutDetail;
