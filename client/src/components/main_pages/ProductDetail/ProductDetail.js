import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "./ProductDetail.css";
import ProductItem from "../Utils/productItem/ProductItem";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addToCart = state.userAPI.addToCart;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetail(product);
      });
    }
  }, [params.id, products]);

  if (productDetail.length === 0) return null;
  return (
    <>
      <div className="detail">
        <img src={productDetail.image.url} alt="product detail image"></img>
        <div className="box-detail">
          <div className="row">
            <h2>{productDetail.title}</h2>
            <h6>#{productDetail.product_id}</h6>
          </div>
          <span>${productDetail.price}</span>
          <p>{productDetail.description}</p>
          <p>{productDetail.content}</p>
          <p>Sold: {productDetail.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => {
              addToCart(productDetail);
            }}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map((product) => {
            return (
              product.category === productDetail.category && (
                <ProductItem key={product._id} product={product}></ProductItem>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
