import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./UserProfile.css";

import axios from "axios";
import { useParams } from "react-router-dom";
import { backend_url } from "../../server";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backend_url}/auth/get-user/${id}`);
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div className="not-found">User not found</div>;

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            <img
              src={`http://localhost:5000${user.avatar}`}
              alt={user.name}
              className="profile-image"
              onError={(e) => {
                e.target.src = "http://localhost:5000/person/noAvatar.png";
              }}
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-role">{user.role}</p>
            <div className="profile-stats"></div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
