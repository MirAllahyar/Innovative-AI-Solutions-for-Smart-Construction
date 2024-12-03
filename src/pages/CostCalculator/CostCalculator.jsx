import React, { useState } from 'react';
import Header from '../../components/Header/Header'; // Import the Header component
import Footer from '../../components/Footer/Footer'; // Import the Footer component
import './CostCalculator.css';

const CostCalculator = () => {
  const [city, setCity] = useState('Islamabad');
  const [areaSize, setAreaSize] = useState('');
  const [constructionType, setConstructionType] = useState('Gray Structure');
  const [constructionMode, setConstructionMode] = useState('With Material');
  const [floors, setFloors] = useState(1);
  const [cost, setCost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const calculateCost = () => {
    let ratePerSqFt;

    // Rates per square foot based on city, construction type, and mode
    const rates = {
      Islamabad: {
        'Gray Structure': {
          'With Material': 2000,
          'Without Material': 450,
        },
        'Complete Finishing': {
          'With Material': 3500,
          'Without Material': 750,
        },
      },
      Karachi: {
        'Gray Structure': {
          'With Material': 1900,
          'Without Material': 430,
        },
        'Complete Finishing': {
          'With Material': 3400,
          'Without Material': 720,
        },
      },
      Chitral: {
        'Gray Structure': {
          'With Material': 2300,
          'Without Material': 470,
        },
        'Complete Finishing': {
          'With Material': 4000,
          'Without Material': 800,
        },
      },
    };

    // Retrieve the appropriate rate per square foot based on user input
    ratePerSqFt =
      rates[city][constructionType][constructionMode] || 0;

    // Calculate the total cost
    const totalCost = ratePerSqFt * parseInt(areaSize, 10) * parseInt(floors, 10);
    setCost(totalCost);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="cost-calculator">
      <Header /> {/* Navbar at the top */}

      <div className="calculator-content">
        <h2>Construction Cost Calculator</h2>
        <p>Use our Construction Cost Calculator to get an estimate of required building materials along with their costs.</p>

        <div className="form-section">
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Islamabad">Islamabad</option>
            <option value="Karachi">Karachi</option>
            <option value="Chitral">Chitral</option>
          </select>

          <label>Covered Area (Sq. Ft.):</label>
          <input
            type="number"
            value={areaSize}
            onChange={(e) => setAreaSize(e.target.value)}
            placeholder="Enter area in square feet"
          />

          <label>Construction Type:</label>
          <select value={constructionType} onChange={(e) => setConstructionType(e.target.value)}>
            <option value="Gray Structure">Gray Structure</option>
            <option value="Complete Finishing">Complete Finishing</option>
          </select>

          <label>Construction Mode:</label>
          <select value={constructionMode} onChange={(e) => setConstructionMode(e.target.value)}>
            <option value="With Material">With Material</option>
            <option value="Without Material">Without Material</option>
          </select>

          <label>Number of Floors:</label>
          <select value={floors} onChange={(e) => setFloors(e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>

          <button onClick={calculateCost} className="calculate-button">
            Calculate Cost
          </button>
        </div>
      </div>

      {/* Modal for displaying the estimated cost */}
      {isModalOpen && (
        <div className="result-modal">
          <div className="result-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Total Estimated Cost</h2>
            <p>
              For a {areaSize} Sq. Ft. house in {city} with the following details:
            </p>
            <ul>
              <li><strong>Construction Type:</strong> {constructionType}</li>
              <li><strong>Construction Mode:</strong> {constructionMode}</li>
              <li><strong>Number of Floors:</strong> {floors}</li>
            </ul>
            <p className="total-cost">Total Cost: PKR {cost.toLocaleString()}</p>
          </div>
        </div>
      )}

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default CostCalculator;
