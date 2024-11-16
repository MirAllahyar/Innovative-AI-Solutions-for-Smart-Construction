import React, { useState } from "react";
import "./GenerateFrontElevation.css";
import axios from "axios";
import Header from "../../components/Header/Header"; // Assuming Header is already implemented
import Footer from "../../components/Footer/Footer"; // Assuming Footer is already implemented

const GenerateFrontElevation = () => {
  const [plotSize, setPlotSize] = useState("5 Marla");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/generate",
        { plotSize },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.image) {
        setImageUrl(`data:image/png;base64,${response.data.image}`);
      } else {
        setError("No image data received from the server.");
      }
    } catch (err) {
      console.error("Error generating front elevation:", err);
      setError("Failed to generate image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="content-container">
          {/* Left Section */}
          <div className="left-section">
            <h2 className="title">Generate Front Elevation</h2>
            <p className="description">
              Select your desired plot size and click the button below to
              generate a custom front elevation.
            </p>
            <div className="input-container">
              <label htmlFor="plotSize" className="input-label">
                Select Plot Size:
              </label>
              <select
                id="plotSize"
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                className="dropdown"
              >
                <option value="5 Marla">5 Marla</option>
                <option value="10 Marla">10 Marla</option>
                <option value="1 Kanal">1 Kanal</option>
              </select>
            </div>
            <div className="button-container">
              <button
                onClick={handleGenerateClick}
                disabled={loading}
                className="generate-btn"
              >
                {loading ? "Generating..." : `Generate ${plotSize} Front Elevation`}
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {imageUrl && (
              <div className="image-container">
                <h3 className="image-title">Generated Front Elevation</h3>
                <img
                  src={imageUrl}
                  alt="Generated Front Elevation"
                  className="generated-image"
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GenerateFrontElevation;
