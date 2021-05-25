import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

const Buttons = ({ product, deleteProduct, toggleModal, setToggleModal }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
      <div className="row-btn">
        {isAdmin ? (
          <>
            <Link
              id="btn_buy"
              to="#!"
              onClick={() =>
                deleteProduct(product._id, product.image.public_id)
              }
            >
              Delete
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>
              Edit
            </Link>
          </>
        ) : (
          <>
            <Link id="btn_buy" to="#!" onClick={() => setToggleModal(true)}>
              Buy
            </Link>
            <Link
              id="btn_view"
              to={`/detail/${product._id}`}
              onClick={() => window.scrollTo({ top: 30, behavior: "smooth" })}
            >
              View
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Buttons;
