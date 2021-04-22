import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "./OrderDetail.css";

import { motion } from "framer-motion";

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((payment) => {
        if (payment._id === params.id) setOrderDetail(payment);
      });
    }
  }, [params.id, history]);

  if (orderDetail.length === 0) {
    return null;
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <div className="history-page">
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Country Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderDetail.address.recipient_name}</td>
                <td>
                  {orderDetail.address.line1 + " - " + orderDetail.address.city}
                </td>
                <td>{orderDetail.address.postal_code}</td>
                <td>{orderDetail.address.country_code}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table style={{ margin: "30px 0px" }}>
          <thead>
            <tr>
              <th></th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.cart.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={product.image.url} alt="Product Image"></img>
                </td>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderDetail;
