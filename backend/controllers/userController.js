const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role', 'name');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// You can add more functions to handle user-related operations
