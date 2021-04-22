import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Loading from "../Utils/Loading/Loading";
import "./CreateProduct.css";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

import { motion } from "framer-motion";

const initState = {
  product_id: "",
  title: "",
  price: 0,
  description: "A brand new product totally cool",
  content: "A tasty food !",
  category: "",
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initState);
  const [categories] = state.categoriesAPI.categories;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);

  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImage(product.image);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initState);
      setImage(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async (event) => {
    try {
      if (!isAdmin) return alert("You are not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (error) {
      return alert(error.response.data.msg);
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      if (!image) return alert("No image uploaded");
      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, image },
          { headers: { Authorization: token } }
        );
        swal({
          title: "Info !",
          text: "Updated Product Successfully",
          icon: "success",
          confirmButtonText: "Yes",
        });
      } else {
        await axios.post(
          "/api/products",
          { ...product, image },
          { headers: { Authorization: token } }
        );
        swal({
          title: "Info !",
          text: "Product Created!",
          icon: "success",
          confirmButtonText: "Yes",
        });
      }
      setCallback(!callback);
      setImage(false);
      setProduct(initState);
      history.push("/");
    } catch (error) {
      return alert(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <div className="create_product">
        <div className="upload">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />

          {loading ? (
            <div className="loading-img">
              <Loading></Loading>
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={image ? image.url : ""} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
            />
          </div>

          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
            />
          </div>

          <div className="row">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              onChange={handleChangeInput}
              rows="5"
            />
          </div>

          <div className="row">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              onChange={handleChangeInput}
              rows="7"
            />
          </div>

          <div className="row">
            <label htmlFor="categories">Categories: </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateProduct;
