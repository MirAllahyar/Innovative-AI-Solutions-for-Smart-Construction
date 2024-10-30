const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Contractor', 'ServiceProvider'], required: true },
    isVerified: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
