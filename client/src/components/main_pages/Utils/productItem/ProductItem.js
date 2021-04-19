import React from "react";
import "./ProductItem.css";
import Buttons from "./Buttons";

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
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
          <span>${product.price}</span>
          <p>{product.description}</p>
        </div>
        <Buttons product={product} deleteProduct={deleteProduct}></Buttons>
      </div>
    </>
  );
};

export default ProductItem;
