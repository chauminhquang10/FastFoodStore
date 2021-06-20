import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";

import ShoppingCartIcon from "./icon/shopping-cart.png";
import { Link } from "react-router-dom";

import "../headers/Header.css";
import Web_Logo from "../../website_logo.png";
import axios from "axios";
import Button from "./Button";

const Header = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const [user, setUser] = state.userAPI.user;

  const [cart] = state.userAPI.cart;

  const [toggleShakingCart, setToggleShakingCart] =
    state.userAPI.toggleShakingCart;

  const [menu, setMenu] = useState(false);
  const [button, setButton] = useState(true);

  const menuClassname = ["nav-menu-3", "nav-menu-5"];

  const checkMenuSize = isAdmin ? menuClassname[1] : menuClassname[0];

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  // bỏ rung shopping cart icon sau 1 thoi gian
  setTimeout(function () {
    if (toggleShakingCart) {
      setToggleShakingCart(false);
    }
  }, 1000);

  const logOutUser = async () => {
    await axios.get("/user/logout");
    setIsAdmin(false);
    setIsLogged(false);
    setUser([]);
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link
            className="nav-items"
            to="/create_product"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Create Product
          </Link>
        </li>
        <li>
          <Link
            className="nav-items"
            to="/category"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            className="nav-items"
            to="/discount"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Discounts
          </Link>
        </li>
      </>
    );
  };

  // bắt 2 sự kiện hàm cho onclick
  const onClickEvents = () => {
    setMenu(false);
    logOutUser();
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link
            className="nav-items"
            to="/history"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            History
          </Link>
        </li>
        <li>
          <Link
            className="nav-items"
            to="/products"
            onClick={onClickEvents}
            className="nav-links-mobile"
          >
            Log out
          </Link>
        </li>
        <li>
          <Link
            className="nav-items"
            to="/chat"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Chat
          </Link>
        </li>
      </>
    );
  };

  //display user avatar
  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="user avatar"></img>
          {user.name}
          <i className="fas fa-sort-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={onClickEvents}>
              Log out
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="shop-logo" onClick={() => setMenu(!menu)}>
          {isAdmin ? "Admin" : "MamMam "}
          {/* <img src={Web_Logo}></img> */}
        </Link>

        <div className="menu-icon" onClick={() => setMenu(!menu)}>
          <i className={menu ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={menu ? `${checkMenuSize} active ` : `${checkMenuSize}`}>
          <li className="nav-item">
            <Link
              to="/products"
              onClick={() => setMenu(false)}
              className="nav-links"
            >
              {isAdmin ? "Products" : "Shopping"}
            </Link>
          </li>

          {isAdmin && adminRouter()}

          {isLogged ? (
            loggedRouter()
          ) : (
            <li className="nav-item">
              <Link
                to="/login"
                onClick={() => setMenu(false)}
                className="nav-links-mobile"
              >
                Sign Up
              </Link>
            </li>
          )}
        </ul>

        {button && (
          <Button
            buttonStyle="btn--outline"
            isLogged={isLogged}
            // onClick={isLogged && onClickEvents}
          >
            {!isLogged ? "SIGN UP" : userLink()}
          </Button>
        )}

        {!isAdmin && isLogged && (
          <div
            className={toggleShakingCart ? "cart__icon active" : "cart__icon"}
          >
            <span>{cart.length}</span>
            <Link to="/cart">
              <img
                src={ShoppingCartIcon}
                alt="shopping cart icon"
                width="30px"
              ></img>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
