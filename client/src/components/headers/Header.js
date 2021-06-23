import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";

import ShoppingCartIcon from "./icon/shopping-cart.png";
import { Link, useLocation } from "react-router-dom";
import "../headers/Header.css";
import { useSelector } from "react-redux";
import Web_Logo from "../../website_logo.png";
import axios from "axios";
import Button from "./Button";
import { Grid } from "@material-ui/core";
import SearchBox from "./SearchBox.js";
import { makeStyles } from "@material-ui/core/styles";

import {
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const [user, setUser] = state.userAPI.user;

  const [cart] = state.userAPI.cart;

  const [menu, setMenu] = useState(false);
  const [button, setButton] = useState(true);

  const menuClassname = ["nav-menu-3", "nav-menu-5"];

  const checkMenuSize = isAdmin ? menuClassname[1] : menuClassname[0];

  const location = useLocation();

  const [toggleShakingCart, setToggleShakingCart] =
    state.userAPI.toggleShakingCart;

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      position: "absolute",
      top: "-3px",
      left: "-7px",
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));

  const classes = useStyles();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // bỏ rung shopping cart icon sau 1 thoi gian
  setTimeout(function () {
    if (toggleShakingCart) {
      setToggleShakingCart(false);
    }
  }, 1000);

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
        <li className="nav-item">
          <Link
            to="/create_product"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Create Product
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/category"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/discount"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            Discount
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
        <li className="nav-item">
          <Link
            to="/history"
            onClick={() => setMenu(false)}
            className="nav-links"
          >
            History
          </Link>
        </li>
        <li className="nav-item">
          <Link
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

  const userLink = () => {
    return (
      <Grid container>
        <Grid container style={{ marginTop: "-2px" }}>
          <li style={{ listStyle: "none" }} className="drop-nav">
            <Link to="#" className="avatar">
              <img
                style={{ marginTop: "10px", marginRight: "5px" }}
                src={user.avatar}
                alt="user avatar"
              ></img>
              {user.name}
              <i className="fas fa-sort-down"></i>
              {/* <Avatar
                alt="user avatar"
                src={user.avatar}
                className={classes.small}
              /> */}
            </Link>
            <ul
              className="dropdown"
              style={{
                marginTop: "-12px",
                marginLeft: "-21px",
              }}
            >
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
        </Grid>
      </Grid>
    );
  };

  const ToggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <nav className="navbar">
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Grid item xs={1}>
          <Link
            to="/"
            className="shop-logo"
            onClick={(() => setMenu(!menu), ToggleHome)}
          >
            {isAdmin ? "Admin" : "MamMam "}
          </Link>
          <div className="menu-icon" onClick={() => setMenu(!menu)}>
            <i className={menu ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </Grid>
        <Grid item xs={8}>
          <ul
            className={menu ? `${checkMenuSize} active ` : `${checkMenuSize}`}
          >
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
        </Grid>
        <Grid item xs={2}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
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
                className={toggleShakingCart ? "cart-icon active" : "cart-icon"}
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
          </Grid>
        </Grid>
        <Grid item xs>
          {location.pathname === "/products" && <SearchBox />}
        </Grid>
      </Grid>
    </nav>
  );
};

export default Header;
