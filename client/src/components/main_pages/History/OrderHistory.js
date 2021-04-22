import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import "./OrderHistory.css";
import axios from "axios";

import { motion } from "framer-motion";

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <div className="history-page">
        <h1>Order History</h1>
        <h2> You have {history.length} orders</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date of Purchase</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.paymentID}</td>
                  <td>{new Date(payment.createdAt).toLocaleDateString()}</td>

                  <td>
                    <Link to={`/history/${payment._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderHistory;
