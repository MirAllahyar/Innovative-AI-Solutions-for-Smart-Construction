const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  services: { type: String, required: true },
  experience: { type: String, required: true },
  qualifications: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
