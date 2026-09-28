const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
    'mongodb://127.0.0.1:27017/blog_management'
);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
