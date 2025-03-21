require('dotenv').config();
const mongoose = require('mongoose');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bgmi';

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to database...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDb;