const mongoose = require('mongoose');

const ContractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: String, required: true },
  skills: { type: String, required: true },
  qualifications: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Contractor', ContractorSchema);
