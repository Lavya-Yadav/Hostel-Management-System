const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hostelcare';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`💡 Tip: If running MongoDB locally, make sure your MongoDB server is running (e.g. 'mongod' or 'brew services start mongodb-community').`);
    console.warn(`💡 Tip: If using MongoDB Atlas (cloud), update MONGODB_URI in your .env file with your cluster connection string: MONGODB_URI=mongodb+srv://...\n`);
    return false;
  }
};

module.exports = connectDB;
