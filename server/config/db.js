const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb+srv://yadavshaantanuu_db_user:Yadu0202@nexplay.plmabg2.mongodb.net/hostelcare?retryWrites=true&w=majority';

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false
    }).then((conn) => {
      console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    });
  }

  try {
    cached.conn = await cached.promise;
    return true;
  } catch (error) {
    cached.promise = null;
    console.error(`\n❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
