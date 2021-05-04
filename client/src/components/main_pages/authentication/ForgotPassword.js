import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../Utils/Validation/Validation";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../Utils/Notification/Notification";

import "./ForgotPassword.css";

const initialState = {
  email: "",
  error: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, error, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const forgotPassword = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, error: "Invalid email", success: "" });
    }

    try {
      const res = await axios.post("/user/forget", { email });
      return setData({ ...data, error: "", success: res.data.msg });
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, error: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="fg_pass">
      <h2>Forgot Your Password ??</h2>
      <div className="row">
        {error && showErrorMessage(error)}
        {success && showSuccessMessage(success)}

        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        ></input>
        <button onClick={forgotPassword}>Verify your email</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
