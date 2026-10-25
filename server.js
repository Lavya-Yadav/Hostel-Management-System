const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./server/config/db');
const { seedDatabase } = require('./server/config/seedData');
const authRoutes = require('./server/routes/authRoutes');
const ticketRoutes = require('./server/routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health and DB status endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    database: isDbConnected ? 'connected' : 'disconnected',
    databaseHost: mongoose.connection.host || 'none',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for Single Page Application
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server and connect to MongoDB
const startServer = async () => {
  app.listen(PORT, async () => {
    console.log(`\n==================================================`);
    console.log(`🏨 HostelCare Node.js Server Running!`);
    console.log(`🌐 Local URL:       http://localhost:${PORT}`);
    console.log(`📡 Connecting to MongoDB...`);
    console.log(`==================================================\n`);

    const dbConnected = await connectDB();
    if (dbConnected) {
      await seedDatabase();
    }
  });
};

startServer();
