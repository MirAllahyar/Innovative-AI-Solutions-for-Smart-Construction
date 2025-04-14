import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ResetPassword.css";
import { backend_url } from "../../server";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    password: "",
  });
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetPassword({
      ...resetPassword,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${backend_url}/auth/reset-password/${token}`,
        { password: resetPassword.password },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setError(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header hideAuthButtons />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          {error && <p className="error">{error}</p>}

          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={resetPassword.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
