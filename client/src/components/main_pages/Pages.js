import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Cart from "./cart/Cart";
import OrderHistory from "./History/OrderHistory";
import OrderDetail from "./History/OrderDetail";
import NotFound from "./Utils/Not_found/NotFound";
import ProductDetail from "./ProductDetail/ProductDetail";
import { GlobalState } from "../../GlobalState";
import Categories from "./Categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import HomePage from "./HomePage/HomePage";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/products" exact component={Products}></Route>
      <Route path="/detail/:id" exact component={ProductDetail}></Route>
      <Route
        path="/login"
        exact
        component={isLogged ? NotFound : Login}
      ></Route>
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      ></Route>
      <Route path="/cart" exact component={Cart}></Route>

      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      ></Route>

      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetail : NotFound}
      ></Route>

      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      ></Route>

      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      ></Route>

      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProduct : NotFound}
      ></Route>

      <Route path="*" exact component={NotFound}></Route>
    </Switch>
  );
};

export default Pages;
