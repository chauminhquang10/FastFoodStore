import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import {
  showErrorMessage,
  showSuccessMessage,
} from "../Utils/Notification/Notification";

import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../Utils/Validation/Validation";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    error: "",
    success: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value, error: "", success: "" });
  };

  const registerSubmit = async (event) => {
    event.preventDefault();

    //validation
    if (isEmpty(user.name) || isEmpty(user.password))
      return setUser({
        ...user,
        error: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(user.email))
      return setUser({ ...user, error: "Invalid emails.", success: "" });

    if (isLength(user.password))
      return setUser({
        ...user,
        error: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(user.password, user.confirm_password))
      return setUser({
        ...user,
        error: "Password did not match.",
        success: "",
      });

    try {
      const { name, email, password } = user;
      const res = await axios.post("/user/register", { name, email, password });

      setUser({ ...user, error: "", success: res.data.msg });

      window.location.href = "/";
    } catch (error) {
      setUser({ ...user, error: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        {user.error && showErrorMessage(user.error)}
        {user.success && showSuccessMessage(user.success)}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email "
          value={user.email}
          onChange={onChangeInput}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password "
          value={user.password}
          onChange={onChangeInput}
        ></input>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password "
          value={user.confirm_password}
          onChange={onChangeInput}
        ></input>
        <div className="row">
          <button type="submit">Register</button>
          <p>
            Already have an account ?<Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
