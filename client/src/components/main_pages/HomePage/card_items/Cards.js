import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";
import food_1 from "../../../../images/cahoi.jpg";
import food_2 from "../../../../images/Lobster.jpg";
import food_3 from "../../../../images/raw-chicken.jpg";
import food_4 from "../../../../images/rice.jpg";
import food_5 from "../../../../images/meat_raw.jpg";
const Cards = () => {
  return (
    <div className="cards">
      <h1>Cùng thưởng thức những mặt hàng tươi ngon!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={food_1}
              text="Còn gì bằng một bữa sáng dinh dưỡng với cá hồi"
              label="Đọc thêm"
              path="/"
            ></CardItem>
            <CardItem
              src={food_2}
              text="Tôm hùm - lựa chọn hàng đầu cho các bữa ăn thịnh soạn"
              label="Đọc thêm"
              path="/"
            ></CardItem>
          </ul>
          <ul className="cards__items">
            <CardItem
              src={food_3}

              text="Tạo điểm nhấn cho bữa ăn bằng món gà"
              label="Đọc thêm"

              path="/"
            />
            <CardItem
              src={food_4}
              text="Gạo luôn là thực phẩm thiết yếu trong bữa ăn"
              label="Đọc thêm"
              path="/products"
            />
            <CardItem
              src={food_5}

              text="Kích thích vị giác bằng các món chế biến từ thịt tươi"
              label="Đọc thêm"


              path="/"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cards;
