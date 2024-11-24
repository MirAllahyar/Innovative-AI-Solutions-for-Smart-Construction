const Contractor = require('../models/Contractor');

// Fetch contractor profile by email
exports.getContractorProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await Contractor.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile.', error: error.message });
  }
};

// Update or create contractor profile
exports.updateContractorProfile = async (req, res) => {
  try {
    const { name, number, email, experience, skills, qualifications } = req.body;

    let contractor = await Contractor.findOne({ email });

    if (!contractor) {
      contractor = new Contractor({ name, number, email, experience, skills, qualifications });
    } else {
      contractor.name = name;
      contractor.number = number;
      contractor.experience = experience;
      contractor.skills = skills;
      contractor.qualifications = qualifications;
    }

    await contractor.save();
    res.status(200).json({ message: 'Profile updated successfully', contractor });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Failed to update profile.', error: error.message });
  }
};
