import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../main_pages/Utils/Notification/Notification";

import { GlobalState } from "../../GlobalState";

import "./EditUser.css";

const EditUser = () => {
  const state = useContext(GlobalState);
  const [allUsers, setAllUsers] = state.userAPI.allUsers;
  const [token] = state.token;
  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [number, setNumber] = useState(0);
  const [callback, setCallback] = state.userAPI.callback;

  useEffect(() => {
    if (allUsers.length !== 0) {
      allUsers.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [allUsers, id, history]);

  const handleUpdate = async () => {
    try {
      // number la so chan co nghia la k thay doi gia tri checkadmin , la so le thi co su thay doi
      if (number % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          { role: checkAdmin ? 1 : 0 },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        setSuccess(res.data.msg);
        setNumber(0);
      }
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  const handleCheck = () => {
    setError("");
    setSuccess("");
    setCheckAdmin(!checkAdmin);
    setNumber(number + 1);
  };

  return (
    <div className="profile_page edit_user">
      <div className="row">
        <button onClick={() => history.goBack()} className="go_back">
          <i className="fas fa-long-arrow-alt-left"></i> Go Back
        </button>
      </div>

      <div className="col-left">
        <h2>Edit User</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={handleCheck}
          ></input>
          <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button onClick={handleUpdate}>Update</button>

        {error && showErrorMessage(error)}
        {success && showSuccessMessage(success)}
      </div>
    </div>
  );
};

export default EditUser;
