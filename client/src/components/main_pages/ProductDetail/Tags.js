import React from "react";

import "./Tags.css";

const Tags = ({ productDetail }) => {
  return (
    <div className="tags-container">
      <i className="fas fa-tags"></i>
      <h6>Tags</h6>
      <ul className="tags-list">
        <li>#{productDetail.product_id}</li>
        <li>#{productDetail.title}</li>
        <li>#{productDetail.content}</li>
      </ul>
    </div>
  );
};

export default Tags;
