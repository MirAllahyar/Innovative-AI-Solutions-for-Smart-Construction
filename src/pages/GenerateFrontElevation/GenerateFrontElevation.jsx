import React, { useState } from 'react';
import './GenerateFrontElevation.css';
import axios from 'axios';
import Header from '../../components/Header/Header'; // Import Header component
import Footer from '../../components/Footer/Footer'; // Import Footer component

const GenerateFrontElevation = () => {
  const [plotSize, setPlotSize] = useState('5 Marla');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/generate',
        { plotSize },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.image) {
        setImageUrl(`data:image/png;base64,${response.data.image}`);
        setShowImageModal(true);
      } else {
        setError('No image data received');
      }
    } catch (err) {
      console.error('Error generating front elevation:', err);
      setError('Failed to generate image. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowImageModal(false);
  };

  return (
    <div className="app-container">
      <Header /> {/* Use your Header component */}
      <main className="main-content">
        <div className="generate-front-elevation">
          <h2>Generate Front Elevation</h2>
          <div className="input-container">
            <label htmlFor="plotSize">Select Plot Size:</label>
            <select
              id="plotSize"
              value={plotSize}
              onChange={(e) => setPlotSize(e.target.value)}
            >
              <option value="5 Marla">5 Marla</option>
              {/* Add more plot sizes if needed */}
            </select>
          </div>
          <button
            onClick={handleGenerateClick}
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : `Generate ${plotSize} Front Elevation`}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>

        {/* Modal for displaying the generated image */}
        {showImageModal && imageUrl && (
          <div className="image-modal">
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>&times;</span>
              <img
                src={imageUrl}
                alt="Generated Front Elevation"
                className="generated-image"
              />
            </div>
          </div>
        )}
      </main>
      <Footer /> {/* Use your Footer component */}
    </div>
  );
};

export default GenerateFrontElevation;
