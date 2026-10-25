require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('../server/config/db');
const { seedDatabase } = require('../server/config/seedData');
const authRoutes = require('../server/routes/authRoutes');
const ticketRoutes = require('../server/routes/ticketRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB connected on each API call
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('DB connect error in middleware:', err);
  }
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    database: isDbConnected ? 'connected' : 'disconnected',
    databaseHost: mongoose.connection.host || 'none',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Fallback for unmatched API routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

module.exports = app;
