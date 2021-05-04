import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../Utils/Notification/Notification";

import { GoogleLogin } from "react-google-login";

import FacebookLogin from "react-facebook-login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value, error: "", success: "" });
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = user;
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, error: "", success: res.data.msg });

      window.location.href = "/";
    } catch (error) {
      setUser({ ...user, error: error.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      // console.log(response);
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      window.location.href = "/";
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, error: error.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    //console.log(response);
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      window.location.href = "/";
    } catch (error) {
      error.response.data.msg &&
        setUser({ ...user, error: error.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        {user.error && showErrorMessage(user.error)}
        {user.success && showSuccessMessage(user.success)}

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
        <div className="row">
          <button type="submit">Login</button>
          <p>
            New customer ? <Link to="/register">Register</Link>
          </p>
          <Link to="/forgot_password">Forgot your password ?</Link>
        </div>
      </form>

      <div className="hr"> Or login with </div>

      <div className="social">
        <GoogleLogin
          clientId="465399330410-mf31k69b3j7pg371ivpm9es19d83agnb.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="310866944063959"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>
    </div>
  );
};

export default Login;
