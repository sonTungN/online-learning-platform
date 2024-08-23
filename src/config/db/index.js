const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = { connect };
