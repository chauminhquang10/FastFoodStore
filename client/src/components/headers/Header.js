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
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const [cart] = state.userAPI.cart;

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

  const logOutUser = async () => {
    await axios.get("/user/logout");
    setIsAdmin(false);
    setIsLogged(false);
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
      </>
    );
  };

  // bắt 2 sự kiện hàm cho onclick
  const onClickEvents = () => {
    setMenu(false);
    logOutUser();
  };

  console.log(menu);
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
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenu(!menu)}>
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
            onClick={isLogged && onClickEvents}
          >
            {!isLogged ? "SIGN UP" : "LOG OUT"}
          </Button>
        )}

        {!isAdmin && (
          <div className="cart-icon">
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
