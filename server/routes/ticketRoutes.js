const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { INITIAL_TICKETS } = require('../config/seedData');

// Helper to format step timestamp
const getFormattedTime = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// GET /api/tickets - fetch tickets with filtering and search
router.get('/', async (req, res) => {
  try {
    const { studentEmail, role, category, status, search } = req.query;

    let filter = {};

    // If role is student (or not warden), restrict to studentEmail if provided
    if (role !== 'warden' && studentEmail) {
      filter.studentEmail = studentEmail.toLowerCase();
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { id: regex },
        { title: regex },
        { roomNo: regex },
        { description: regex },
        { subIssue: regex }
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tickets.length, tickets });
  } catch (err) {
    console.error('Fetch tickets error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch tickets: ' + err.message });
  }
});

// GET /api/tickets/stats - get ticket counts
router.get('/stats', async (req, res) => {
  try {
    const { studentEmail, role } = req.query;
    let filter = {};

    if (role !== 'warden' && studentEmail) {
      filter.studentEmail = studentEmail.toLowerCase();
    }

    const total = await Ticket.countDocuments(filter);
    const pending = await Ticket.countDocuments({ ...filter, status: 'pending' });
    const progress = await Ticket.countDocuments({ ...filter, status: 'progress' });
    const resolved = await Ticket.countDocuments({ ...filter, status: 'resolved' });

    res.json({
      success: true,
      stats: { total, pending, progress, resolved }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/tickets/:id - get single ticket
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ id: req.params.id });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tickets - create a new ticket in MongoDB
router.post('/', async (req, res) => {
  try {
    const {
      title,
      category,
      priority,
      studentName,
      studentEmail,
      roomNo,
      block,
      preferredTime,
      subIssue,
      description
    } = req.body;

    if (!title || !category || !studentEmail || !roomNo || !description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required ticket fields (title, category, studentEmail, roomNo, description).'
      });
    }

    // Generate unique sequential ticket ID
    const count = await Ticket.countDocuments();
    let nextNum = 205 + count;
    let candidateId = `HST-${nextNum}`;
    while (await Ticket.findOne({ id: candidateId })) {
      nextNum += 1;
      candidateId = `HST-${nextNum}`;
    }

    const formattedTime = getFormattedTime();

    const newTicket = new Ticket({
      id: candidateId,
      title,
      category,
      priority: priority || 'medium',
      status: 'pending',
      studentName,
      studentEmail: studentEmail.toLowerCase(),
      roomNo,
      block: block || 'Block B (Boys)',
      preferredTime: preferredTime || 'Anytime',
      subIssue: subIssue || '',
      description,
      supervisorNote: 'Ticket logged into hostel assistance portal. Supervisor will review shortly.',
      timeline: [
        { step: 'Request Submitted', time: formattedTime, done: true },
        { step: 'Supervisor Review', time: 'Pending', done: false },
        { step: 'Staff Assignment', time: 'Pending', done: false },
        { step: 'Resolution', time: 'Pending', done: false }
      ]
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: `Request #${candidateId} submitted successfully!`,
      ticket: newTicket
    });
  } catch (err) {
    console.error('Create ticket error:', err);
    res.status(500).json({ success: false, message: 'Failed to create ticket: ' + err.message });
  }
});

// PATCH /api/tickets/:id - update ticket status / supervisor notes
router.patch('/:id', async (req, res) => {
  try {
    const { status, supervisorNote } = req.body;
    const ticket = await Ticket.findOne({ id: req.params.id });

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    if (status) {
      ticket.status = status;
      // Update timeline step completions according to status
      ticket.timeline = ticket.timeline.map((step, idx) => {
        if (status === 'progress' && idx <= 2) {
          return { step: step.step, time: step.time === 'Pending' ? getFormattedTime() : step.time, done: true };
        }
        if (status === 'resolved') {
          return { step: step.step, time: step.time === 'Pending' ? getFormattedTime() : step.time, done: true };
        }
        return step;
      });
    }

    if (supervisorNote !== undefined && supervisorNote !== '') {
      ticket.supervisorNote = supervisorNote;
    } else if (status === 'resolved' && !supervisorNote) {
      ticket.supervisorNote = 'Issue inspected and verified fixed by warden.';
    }

    await ticket.save();

    res.json({
      success: true,
      message: `Ticket #${ticket.id} updated successfully.`,
      ticket
    });
  } catch (err) {
    console.error('Update ticket error:', err);
    res.status(500).json({ success: false, message: 'Failed to update ticket: ' + err.message });
  }
});

// DELETE /api/tickets/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Ticket.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }
    res.json({ success: true, message: `Ticket #${req.params.id} deleted successfully.` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/tickets/seed - reset and seed sample tickets
router.post('/seed', async (req, res) => {
  try {
    await Ticket.deleteMany({});
    await Ticket.insertMany(INITIAL_TICKETS);
    res.json({ success: true, message: 'Initial sample tickets re-seeded successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

