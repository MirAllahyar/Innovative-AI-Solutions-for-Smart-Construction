import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./LoginPage.css";
import { backend_url } from "../../server";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [resetEmail, setResetEmail] = useState(""); // State for the reset email
  const [resetMessage, setResetMessage] = useState(null); // Message after reset request
  const navigate = useNavigate();
  const { setUser } = useUser();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${backend_url}/auth/login`, formData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset request
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backend_url}/auth/forget-password`, {
        email: resetEmail,
      });
      setResetMessage(
        res.data.message || "Password reset link sent! Check your email."
      );
      toast.success(res.data.message || "Password reset link sent!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
      setResetMessage("Failed to send reset link. Please try again.");
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* Forget Password Link */}

          <Link to="/signup">
            <p className="forgot-password-link">Signup here</p>
          </Link>

          <p
            className="forgot-password-link"
            onClick={() => setIsModalOpen(true)}
          >
            Forgot Password?
          </p>
        </form>
      </div>
      <Footer />

      {/* Password Reset Modal */}
      {isModalOpen && (
        <div className="modal-overlay" id="modal-bg">
          <div className="modal-content">
            <h3>Reset Your Password</h3>
            {resetMessage ? (
              <p className="reset-message">{resetMessage}</p>
            ) : (
              <form onSubmit={handlePasswordReset}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
                <button type="submit">Send Reset Link</button>
              </form>
            )}
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
