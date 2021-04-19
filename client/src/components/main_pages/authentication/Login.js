import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      window.location.href = "/products";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email "
          value={user.email}
          onChange={onChangeInput}
        ></input>
        <input
          type="password"
          name="password"
          required
          placeholder="Password "
          value={user.password}
          onChange={onChangeInput}
        ></input>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
