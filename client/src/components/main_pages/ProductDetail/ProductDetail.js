import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "./ProductDetail.css";
import ProductItem from "../Utils/productItem/ProductItem";

import ReactImageMagnify from "react-image-magnify";

import { motion } from "framer-motion";

import Tags from "./Tags";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addToCart = state.userAPI.addToCart;
  const [productDetail, setProductDetail] = useState([]);

  const [imageTest, setImageTest] = useState("");

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
          setImageTest(product.image.url);
        }
      });
    }
  }, [params.id, products]);

  //zoom image

  const imageProps = {
    smallImage: {
      isFluidWidth: true,
      src: imageTest,
      alt: "product detail image",
    },
    largeImage: {
      src: imageTest,
      width: 550,
      height: 600,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  };

  if (productDetail.length === 0) return null;

  return (
    <>
      <motion.div
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <div className="detail">
          <ReactImageMagnify {...imageProps}></ReactImageMagnify>

          {/* <img src={productDetail.image.url} alt="product detail image"></img> */}

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
            <div className="product-detail-tags">
              <Tags productDetail={productDetail}></Tags>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="products">
            {products.map((product) => {
              return (
                product.category === productDetail.category && (
                  <ProductItem
                    key={product._id}
                    product={product}
                  ></ProductItem>
                )
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetail;
