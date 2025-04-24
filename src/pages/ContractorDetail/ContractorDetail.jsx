import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ContractorDetail.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { backend_url } from "../../server";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { FaStar } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const ContractorDetail = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const handleRatingSubmit = async () => {
    try {
      await axios.post(
        `${backend_url}/contractor/rate/${id}`,
        {
          userId: user._id,
          rating,
          comment,
        },
        { withCredentials: true }
      );

      const response = await axios.get(
        `${backend_url}/contractor/get-Contractor/${id}`
      );
      setContractor(response.data.contractor);
      setRating(0); // Reset after submission
      setComment("");
    } catch (error) {
      alert("Failed to submit rating");
    }
  };
  const handleStartChat = async (receiverId) => {
    if (!user) {
      alert("Please log in to start a chat.");
      return;
    }

    try {
      // Create/fetch conversation
      const res = await axios.post(`${backend_url}/conversations`, {
        senderId: user._id,
        receiverId,
      });

      // Redirect to the chat page with the conversation ID
      navigate(`/community-chat/${res.data._id}`);
    } catch (err) {
      console.error("Failed to start chat:", err);
      alert("Failed to start chat. Please try again.");
    }
  };

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/contractor/get-Contractor/${id}`
        );
        setContractor(response?.data?.contractor);
      } catch (err) {
        setError("Failed to fetch contractor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractor();
  }, [id]);

  if (loading) return <p className="loading">Loading contractor details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!contractor) return <p className="error">No contractor found.</p>;

  return (
    <>
      <Header />
      <div className="contractor-detail-page">
        {/* Hero Section */}
        <div className="contractor-hero">
          <img
            src={`http://localhost:5000${contractor.avatar}`}
            alt={contractor.name}
          />
          <div className="hero-text">
            <h1>{contractor.name}</h1>
            <p className="specialization">{contractor.designation || "N/A"}</p>
            <p className="experience">
              <strong>Experience:</strong>{" "}
              {contractor.experience ? `${contractor.experience} years` : "N/A"}
            </p>
            <p className="location">
              <strong>Location:</strong> {contractor.location || "N/A"}
            </p>
            <button
              className="start-chat-button"
              onClick={() => handleStartChat(contractor._id)}
            >
              Start Chat
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="contractor-about">
          <h2>About the Contractor</h2>
          <p>{contractor.description || "No description available."}</p>
        </div>

        {/* Skills / Specializations */}
        <div className="contractor-skills">
          <h3>Specializations</h3>
          <ul>
            {contractor.specializations?.length ? (
              contractor.specializations.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))
            ) : (
              <li>No specializations listed.</li>
            )}
          </ul>
        </div>

        {/* Contact Section */}
        <div className="contractor-contact">
          <h3>Contact & Availability</h3>
          <p>
            <strong>Email:</strong> {contractor.email || "N/A"} <br />
            {contractor.phone && (
              <>
                <strong>Phone:</strong> {contractor.phone} <br />
              </>
            )}
          </p>
          <p className="accent-note">
            For appointments, consultations, or project inquiries, feel free to
            reach out via email or phone.
          </p>
        </div>

        <div className="contractor-rating">
          <h3 className="mb-4">User Ratings</h3>
          {contractor.rating?.filter((r) => r?.rating).length > 0 ? (
            contractor.rating.map((r, i) => (
              <div key={i} className="user-rating">
                <div className="rating-header">
                  <div className="rating-user-info">
                    <p className="rating-user">{r?.name || "Anonymous"}</p>
                    <p className="rating-time">
                      {r?.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "Invalid date"}
                    </p>
                  </div>
                </div>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      color={star <= (r?.rating || 0) ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  ))}
                </div>
                <p className="rating-comment">
                  {r?.comment || "No comment provided."}
                </p>
              </div>
            ))
          ) : (
            <p className="no-ratings">No ratings yet.</p>
          )}
        </div>

        <div className="mt-5">
          <h3>Rate This Contractor</h3>
          <div className="stars mb-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={24}
                onMouseEnter={() => setHover(value)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(value)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment (optional)"
          />
          <button className="mt-3" onClick={handleRatingSubmit}>
            Submit Rating
          </button>
        </div>
      </div>

      {/* Rating Section */}

      {/* WhatsApp Chat Button */}
      {contractor.phone && (
        <div className="whatsapp-button-container">
          <FloatingWhatsApp
            phoneNumber={contractor.phone}
            accountName={contractor.name}
            avatar={`http://localhost:5000${contractor.avatar}`}
            chatColor="#25d366"
            statusMessage={contractor.designation}
            allowClickAway={true}
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default ContractorDetail;
