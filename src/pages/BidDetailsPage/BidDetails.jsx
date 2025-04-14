import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { backend_url } from "../../server";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import "./BidDetails.css";
import toast from "react-hot-toast";

function BidDetails() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBidDetails = async () => {
      try {
        const response = await axios.get(`${backend_url}/bid/get-bid/${id}`);
        setBid(response.data);
      } catch (err) {
        setError("Failed to fetch contractor details.");
      } finally {
        setLoading(false);
      }
    };
    getBidDetails();
  }, [id]);

  const handleChatClick = async () => {
    if (!user) {
      toast.error("Please login to chat with the bid poster.");
      navigate("/login");
      return;
    }

    try {
      // Create or fetch the conversation
      const response = await axios.post(`${backend_url}/conversations`, {
        senderId: user._id, // Current user's ID
        receiverId: bid?.user._id, // Job creator's ID
      });

      // Navigate to the community-chat page with the conversation ID
      navigate(`/community-chat/${response.data._id}`);
    } catch (err) {
      console.error("Error creating/fetching conversation:", err);
    }
  };

  return (
    <div>
      <Header />

      <div className="contractor-detail-page">
        {/* Hero Section */}
        <h2>Bid Poster</h2>
        <div className="contractor-hero">
          <img
            src={`http://localhost:5000${bid?.user.avatar}`}
            alt={bid?.user.name}
          />
          <div className="hero-text">
            <h1>{bid?.user?.name}</h1>
            <p className="location">
              <strong>Location:</strong> {bid?.location || "N/A"}
            </p>
            <p className="location">
              <strong>Email:</strong> {bid?.user.email || "N/A"}
            </p>

            <div id="cus-btn" className="chat-icon" onClick={handleChatClick}>
              <span className="chat-now">chat now</span>
              <FaCommentDots size={24} />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="contractor-about">
          <h2>About the Bid</h2>
          <h3>{bid?.title || "No description available."}</h3>
          <p>{bid?.description || "No description available."}</p>
        </div>

        {/* Contact Section */}
        <div className="contractor-contact">
          <h3>Essential Details</h3>
          <p>
            <strong>Bid closing date:</strong>{" "}
            {bid?.date?.split("T")[0] || "N/A"} <br />
            <strong>Budget:</strong> {bid?.budget || "N/A"} <br />
            <strong>Latest Bid:</strong> {bid?.currentBid || "N/A"} <br />
            <strong>Location:</strong> {bid?.location || "N/A"}
          </p>
          <p className="accent-note">
            For appointments, consultations, or project inquiries, feel free to
            reach out via email or phone.
          </p>
        </div>
      </div>

      {/* Floating Chat Icon */}
    </div>
  );
}

export default BidDetails;
