import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import "./ProductDetail.css";
import ProductItem from "../Utils/productItem/ProductItem";

import ProductItemStarRating from "../Utils/productItem/ProductItemStarRating/ProductItemStarRating";

import ReactImageMagnify from "react-image-magnify";

import { motion } from "framer-motion";

import Tags from "./Tags";

import Comments from "./Comments/Comments";

const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [products] = state.productsAPI.products;
  const addToCart = state.userAPI.addToCart;
  const [productDetail, setProductDetail] = useState([]);

  const [callback, setCallback] = state.productsAPI.callback;

  const [imageTest, setImageTest] = useState("");

  //hiển thị thể loại của sản phẩm
  const [category, setCategory] = useState([]);

  //comments khách hàng
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
          setImageTest(product.image.url);
        }
      });
    }
  }, [params.id, products, callback]);

  useEffect(() => {
    if (productDetail) {
      categories.forEach((category) => {
        if (category._id === productDetail.category) {
          setCategory(category);
        }
      });
    }
  }, [productDetail, categories]);

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
              {/* <h6>#{productDetail.product_id}</h6> */}
            </div>
            <span>${productDetail.price}</span>
            <p>{productDetail.description}</p>
            <p>{productDetail.content}</p>
            <p>Sold: {productDetail.sold}</p>
            <div className="customer-evaluation">
              <ProductItemStarRating
                rating={productDetail.star}
              ></ProductItemStarRating>
              <p>({comments.length} Customer's Evaluation)</p>
            </div>
            <p>Category: {category.name}</p>

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
              <Tags
                productDetail={productDetail}
                categoryName={category.name}
              ></Tags>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="products">
            {products.map((product) => {
              return product.category === productDetail.category &&
                product._id != productDetail._id ? (
                <ProductItem key={product._id} product={product}></ProductItem>
              ) : null;
            })}
          </div>
        </div>

        <Comments
          productDetail={productDetail}
          comments={comments}
          setComments={setComments}
        ></Comments>
      </motion.div>
    </>
  );
};

export default ProductDetail;
