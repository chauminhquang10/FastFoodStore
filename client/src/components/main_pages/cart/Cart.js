import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";

import "./Cart.css";
import axios from "axios";

import PaypalButton from "./PayPalButton";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;

  const [token] = state.token;

  //tổng tiền khởi tạo bằng 0
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/add_cart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  // tăng giá trị số lượng của sản phẩm
  const incrementEvent = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  // giảm giá trị số lượng của sản phẩm
  const decreamentEvent = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart); // việc thêm hàm addToCart này là để đồng bộ database
    // ví dụ như remove 1 sản phẩm thì nó mất khỏi (state) card  chứ k mất khỏi thuộc tính card của user trong database
    // card được dùng gián tiếp chứ k trực tiếp
  };

  // xóa sản phẩm khỏi giỏ hàng
  const removeEvent = (id) => {
    if (
      window.confirm("Are you sure to remove this product from your cart ?")
    ) {
      cart.forEach((product, index) => {
        if (product._id === id) {
          cart.splice(index, 1);
        }
      });
    }
    setCart([...cart]);
    addToCart(cart);
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);

    alert("You have successfully placed an order.");
  };

  if (cart.length === 0) {
    return <h1>Cart Empty !</h1>;
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.image.url} alt="" className="cart_item_img" />

          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button onClick={() => decreamentEvent(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => incrementEvent(product._id)}> + </button>
            </div>
            <div
              className="detele-cart-item"
              onClick={() => removeEvent(product._id)}
            >
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: ${total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess}></PaypalButton>
      </div>
    </div>
  );
};

export default Cart;
