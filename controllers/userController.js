const User = require('../models/User');


// GET PROFILE
const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.userId)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// UPDATE PROFILE
const updateProfile = async (req, res) => {
    try {

        const { name, phoneNumber, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            {
                name,
                phoneNumber,
                email
            },
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            message: 'Profile updated successfully',
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};