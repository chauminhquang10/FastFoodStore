import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { isLength, isMatch } from "../main_pages/Utils/Validation/Validation";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../main_pages/Utils/Notification/Notification";
import { GlobalState } from "../../GlobalState";

import "./UserProfile.css";

const initialState = {
  name: "",
  password: "",
  confirm_password: "",
  error: "",
  success: "",
};

const UserProfile = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [user, setUser] = state.userAPI.user;
  const [allUsers, setAllUsers] = state.userAPI.allUsers;
  const [callback, setCallback] = state.userAPI.callback;

  const [favoriteProducts, setfavoriteProducts] =
    state.userAPI.favoriteProducts;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialState);
  const { name, password, confirm_password, error, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, error: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({ ...data, error: "No file uploaded!", success: "" });
      //1MB
      if (file.size > 1024 * 1024) {
        return setData({ ...data, error: "Size too large!", success: "" });
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return setData({ ...data, error: "Invalid format!", success: "" });
      }

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);

      setAvatar(res.data.url);
    } catch (error) {
      setData({ ...data, error: error.response.data.msg, success: "" });
    }
  };

  const updateUser = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(token);

      setData({ ...data, error: "", success: "Updated Successfully" });
    } catch (error) {
      setData({ ...data, error: error.response.data.msg, success: "" });
    }
  };

  const updateUserPassword = () => {
    if (isLength(password)) {
      return setData({
        ...data,
        error: "Password must be at least 6 characters.",
        success: "",
      });
    }
    if (!isMatch(password, confirm_password)) {
      return setData({
        ...data,
        error: "Passwords do not match !",
        success: "",
      });
    }
    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data, error: "", success: "Updated Successfully" });
    } catch (error) {
      setData({ ...data, error: error.response.data.msg, success: "" });
    }
  };

  //Update all info by combining two func into one
  const handleUpdate = () => {
    if (name || avatar) updateUser();
    if (password) updateUserPassword();
  };

  const handleDelete = async (id) => {
    try {
      // tranh truong hop tu huy , k dc tu xoa ban than
      if (user._id !== id) {
        if (window.confirm("Are you sure you want to delete this account?")) {
          setLoading(true);
          await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
        }
      }
    } catch (error) {
      setData({ ...data, error: error.response.data.msg, success: "" });
    }
  };

  // custom hàm addtofavorite List lại vì nó chỉ thực hiện duy nhất là set cái list này lại thôi.
  const addToFavoriteList = async (favoriteProducts) => {
    await axios.patch(
      "/user/add_favoriteList",
      { favoriteProducts },
      {
        headers: { Authorization: token },
      }
    );
    setLoading(false);
  };

  // xóa sản phẩm yêu thích khỏi list
  const handleDeleteFavoriteProduct = (id) => {
    if (
      window.confirm(
        "Are you sure to remove this product from your favorite list ?"
      )
    ) {
      setLoading(true);
      favoriteProducts.forEach((product, index) => {
        if (product._id === id) {
          favoriteProducts.splice(index, 1);
        }
      });
    }
    setfavoriteProducts([...favoriteProducts]);
    addToFavoriteList(favoriteProducts);
  };

  return (
    <>
      <div>
        {error && showErrorMessage(error)}
        {success && showSuccessMessage(success)}
        {loading && <h3>Loading...</h3>}
      </div>

      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
          <div className="avatar">
            <img src={avatar ? avatar : user.avatar}></img>
            <span>
              <i className="fas fa-camera-retro"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={changeAvatar}
              ></input>
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              placeholder="Your name"
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.email}
              placeholder="Your Email"
              disabled
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm New Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Your Confirm Password"
              value={confirm_password}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <em style={{ color: "crimson" }}>
              * If you update your password here, you won't able to login
              quickly using google and facebook.
            </em>
          </div>

          <button disabled={loading} onClick={handleUpdate}>
            Update
          </button>
        </div>

        <div className="col-right">
          <h2>{isAdmin ? "Users" : "My Favorite"}</h2>

          {isAdmin ? (
            <div style={{ overflowX: "auto" }}>
              <table className="customers">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role === 1 ? (
                          <i className="fas fa-check" title="Admin"></i>
                        ) : (
                          <i className="fas fa-times" title="User"></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}>
                          <i className="fas fa-user-edit" title="Edit"></i>
                        </Link>
                        <i
                          className="far fa-trash-alt "
                          title="Delete"
                          onClick={() => handleDelete(user._id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="favorite__list">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.image.url} alt="Product Image"></img>
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <i
                          className="far fa-trash-alt  "
                          title="Delete"
                          onClick={() =>
                            handleDeleteFavoriteProduct(product._id)
                          }
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
