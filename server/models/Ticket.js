const mongoose = require('mongoose');

const timelineStepSchema = new mongoose.Schema(
  {
    step: { type: String, required: true },
    time: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['room', 'food', 'water', 'ac', 'electrical', 'wifi']
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['pending', 'progress', 'resolved'],
      default: 'pending'
    },
    studentName: {
      type: String,
      required: true
    },
    studentEmail: {
      type: String,
      required: true,
      lowercase: true
    },
    roomNo: {
      type: String,
      required: true
    },
    block: {
      type: String,
      default: ''
    },
    preferredTime: {
      type: String,
      default: 'Anytime'
    },
    subIssue: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      required: true
    },
    supervisorNote: {
      type: String,
      default: 'Ticket logged into hostel assistance portal. Supervisor will review shortly.'
    },
    timeline: {
      type: [timelineStepSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);

