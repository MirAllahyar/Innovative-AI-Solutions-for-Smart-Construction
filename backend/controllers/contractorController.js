const Contractor = require('../models/Contractor');

// Controller to save contractor data
const saveContractorData = async (req, res) => {
    try {
      console.log(req.body); // Log incoming data
  
      const { name, email, number, experience, skills, qualifications } = req.body;
  
      if (!name || !email || !number || !experience || !skills || !qualifications) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const contractor = new Contractor({
        name,
        email,
        number,
        experience,
        skills,
        qualifications,
      });
  
      const savedContractor = await contractor.save();
      res.status(201).json({ message: 'Contractor profile saved successfully', contractor: savedContractor });
    } catch (error) {
      console.error('Error saving contractor:', error.message);
      res.status(500).json({ message: 'Error saving contractor profile', error: error.message });
    }
  };
  

module.exports = { saveContractorData };
