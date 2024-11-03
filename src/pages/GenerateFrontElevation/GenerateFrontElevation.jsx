import React, { useState } from 'react';
import './GenerateFrontElevation.css';
import axios from 'axios';

const GenerateFrontElevation = () => {
  const [plotSize, setPlotSize] = useState('5 Marla');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
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
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated Front Elevation"
          className="generated-image"
        />
      )}
    </div>
  );
};

export default GenerateFrontElevation;
