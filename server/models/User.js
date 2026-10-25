const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    rollNo: {
      type: String,
      default: ''
    },
    block: {
      type: String,
      default: ''
    },
    roomNo: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      enum: ['student', 'warden'],
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);

