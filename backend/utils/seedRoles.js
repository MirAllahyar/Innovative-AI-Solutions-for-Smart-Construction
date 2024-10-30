const mongoose = require('mongoose');
const User = require('../models/User');

const adminUser = {
    username: 'admin',
    password: 'admin', // You may want to hash this in a real application
    role: 'Admin',
    isVerified: true,
};

const seedUsers = async () => {
    await User.deleteMany({});
    await new User(adminUser).save();
    console.log('Admin user created');
};

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        seedUsers().then(() => {
            mongoose.connection.close();
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
