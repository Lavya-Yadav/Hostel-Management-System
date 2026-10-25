const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: userObj
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login: ' + err.message });
  }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, rollNo, block, roomNo, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      rollNo: rollNo || '',
      block: block || 'Block B (Boys)',
      roomNo: roomNo || '',
      phone: phone || '',
      role: 'student'
    });

    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      message: `Account created successfully for ${newUser.name}!`,
      user: userObj
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error during signup: ' + err.message });
  }
});

// GET /api/auth/users - list demo users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: 1 });
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

