import React, { useState, useContext, useEffect } from "react";
import "./ProductItem.css";
import Buttons from "./Buttons";
import Modal from "./Modal";

import { GlobalState } from "../../../../GlobalState";

import ProductItemStarRating from "./ProductItemStarRating/ProductItemStarRating";

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const state = useContext(GlobalState);

  const [categories] = state.categoriesAPI.categories;

  const [favoriteProducts] = state.userAPI.favoriteProducts;

  const addToFavoriteList = state.userAPI.addToFavoriteList;

  const [toggleFavorite, setToggleFavorite] = useState(false);

  //hiển thị thể loại của sản phẩm
  const [category, setCategory] = useState([]);

  useEffect(() => {
    categories.forEach((category) => {
      if (category._id === product.category) {
        setCategory(category);
      }
    });
  }, [product, categories]);

  useEffect(() => {
    if (favoriteProducts.length !== 0) {
      favoriteProducts.forEach((favoriteProduct) => {
        if (favoriteProduct._id === product._id) {
          console.log(favoriteProduct.isFavorited);
          setToggleFavorite(true);
        }
      });
    }
  }, [favoriteProducts]);

  return (
    <>
      <div className="product_card">
        {isAdmin && (
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleCheck(product._id)}
          ></input>
        )}
        <img src={product.image.url} alt="product image"></img>
        <div className="product-box">
          <h2 title={product.title}>{product.title}</h2>
          <i
            className={
              toggleFavorite
                ? "fas fa-heart fa-2x favorite__icon"
                : "far fa-heart fa-2x favorite__icon"
            }
            onClick={() => {
              addToFavoriteList(product);
              setToggleFavorite(true);
            }}
          ></i>

          <span>${product.price}</span>
          <p>{product.description}</p>
          <h6> {category.name}</h6>
        </div>

        <ProductItemStarRating rating={product.star}></ProductItemStarRating>

        <Buttons
          product={product}
          deleteProduct={deleteProduct}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
        ></Buttons>
      </div>
      {toggleModal && (
        <Modal
          product={product}
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
        ></Modal>
      )}
    </>
  );
};

export default ProductItem;
