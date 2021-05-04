import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../Utils/Notification/Notification";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (error) {
          error.response.data.msg && setError(error.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="active_page">
      {error && showErrorMessage(error)}
      {success && showSuccessMessage(success)}
    </div>
  );
};

export default ActivationEmail;
