const User = require('../models/User');
const Ticket = require('../models/Ticket');

const INITIAL_USERS = [
  {
    name: "Rahul Sharma",
    email: "rahul@hostel.edu",
    password: "student123",
    rollNo: "STU-2024-042",
    block: "Block B (Boys)",
    roomNo: "B-302",
    phone: "+91 98765 43210",
    role: "student"
  },
  {
    name: "Dr. K. Verma",
    email: "warden@hostel.edu",
    password: "admin123",
    rollNo: "FAC-1002",
    block: "Central Administration",
    roomNo: "Admin-01",
    phone: "+91 98765 00001",
    role: "warden"
  }
];

const INITIAL_TICKETS = [
  {
    id: "HST-204",
    title: "AC Not Cooling & Rattling Noise",
    category: "ac",
    priority: "high",
    status: "progress",
    studentName: "Rahul Sharma",
    studentEmail: "rahul@hostel.edu",
    roomNo: "B-302",
    block: "Block B (Boys)",
    preferredTime: "Afternoon (2:00 PM - 4:00 PM)",
    subIssue: "AC Not Cooling",
    description: "The split AC in room B-302 is blowing normal room temperature air even at 18°C. There is also a continuous rattling noise from the blower unit.",
    supervisorNote: "Technician Mr. Ramesh (HVAC) assigned. Gas check scheduled today.",
    timeline: [
      { step: "Request Submitted", time: "24 Oct, 02:30 PM", done: true },
      { step: "Supervisor Verified", time: "24 Oct, 03:15 PM", done: true },
      { step: "HVAC Technician Assigned", time: "24 Oct, 04:00 PM", done: true },
      { step: "Inspection & Resolution", time: "Pending technician visit", done: false }
    ]
  },
  {
    id: "HST-203",
    title: "Mess Dinner Hygiene & Quality Concern",
    category: "food",
    priority: "medium",
    status: "pending",
    studentName: "Priya Patel",
    studentEmail: "priya@hostel.edu",
    roomNo: "G-104",
    block: "Block A (Girls)",
    preferredTime: "Evening (5:00 PM - 7:00 PM)",
    subIssue: "Food Quality / Hygiene",
    description: "The dinner served on Friday had undercooked chapatis and watery dal. Requesting mess committee inspection of kitchen standards.",
    supervisorNote: "Forwarded to Mess Contractor & Dining Supervisor.",
    timeline: [
      { step: "Request Submitted", time: "25 Oct, 09:15 AM", done: true },
      { step: "Forwarded to Mess Committee", time: "25 Oct, 10:00 AM", done: true },
      { step: "Kitchen Audit & Inspection", time: "Scheduled for lunch prep", done: false },
      { step: "Resolution & Feedback", time: "Awaiting", done: false }
    ]
  },
  {
    id: "HST-202",
    title: "Washroom Geyser Not Heating Water",
    category: "water",
    priority: "high",
    status: "resolved",
    studentName: "Aman Gupta",
    studentEmail: "aman@hostel.edu",
    roomNo: "B-108",
    block: "Block B (Boys)",
    preferredTime: "Morning (9:00 AM - 11:00 AM)",
    subIssue: "Geyser / Hot Water issue",
    description: "The bathroom geyser indicator light turns on, but after 20 minutes the water is still cold. Heating coil suspected to be burnt.",
    supervisorNote: "Electrician replaced the heating coil and thermostat. Tested hot water output successfully.",
    timeline: [
      { step: "Request Submitted", time: "23 Oct, 08:00 AM", done: true },
      { step: "Supervisor Verified", time: "23 Oct, 09:00 AM", done: true },
      { step: "Electrician Assigned", time: "23 Oct, 10:30 AM", done: true },
      { step: "Resolved & Closed", time: "23 Oct, 12:45 PM", done: true }
    ]
  },
  {
    id: "HST-201",
    title: "Balcony Sliding Door Latch Jammed",
    category: "room",
    priority: "low",
    status: "pending",
    studentName: "Rahul Sharma",
    studentEmail: "rahul@hostel.edu",
    roomNo: "B-302",
    block: "Block B (Boys)",
    preferredTime: "Morning (9:00 AM - 11:00 AM)",
    subIssue: "Door/Window Repair",
    description: "The sliding mosquito mesh door latch on the room balcony is stuck in the lock position and cannot be shut tightly.",
    supervisorNote: "Carpenter will visit during morning inspection rounds.",
    timeline: [
      { step: "Request Submitted", time: "25 Oct, 11:45 AM", done: true },
      { step: "Carpenter Assigned", time: "Pending", done: false },
      { step: "Work Completed", time: "Pending", done: false }
    ]
  },
  {
    id: "HST-200",
    title: "Study Table Fluorescent Tube Flickering",
    category: "electrical",
    priority: "low",
    status: "resolved",
    studentName: "Ananya Singh",
    studentEmail: "ananya@hostel.edu",
    roomNo: "G-215",
    block: "Block A (Girls)",
    preferredTime: "Evening (5:00 PM - 7:00 PM)",
    subIssue: "Tube light / Bulb fused",
    description: "The tube light over study desk 2 flickers continuously and strains the eyes while reading at night.",
    supervisorNote: "Starter and tube light replaced with new 20W LED tube.",
    timeline: [
      { step: "Request Submitted", time: "22 Oct, 07:20 PM", done: true },
      { step: "Assigned to Electrician", time: "23 Oct, 09:00 AM", done: true },
      { step: "Resolved & Closed", time: "23 Oct, 11:15 AM", done: true }
    ]
  },
  {
    id: "HST-199",
    title: "Weak Wi-Fi Signal in Room 302 Corner",
    category: "wifi",
    priority: "medium",
    status: "progress",
    studentName: "Rahul Sharma",
    studentEmail: "rahul@hostel.edu",
    roomNo: "B-302",
    block: "Block B (Boys)",
    preferredTime: "Urgent (Anytime)",
    subIssue: "Very Slow Speed / Weak Signal",
    description: "Wi-Fi speeds drop to less than 1 Mbps at the study desk area and repeatedly prompts for captive portal login.",
    supervisorNote: "Network admin notified to check Corridor AP-04 coverage and channel interference.",
    timeline: [
      { step: "Request Submitted", time: "24 Oct, 06:10 PM", done: true },
      { step: "IT Desk Acknowledged", time: "24 Oct, 07:00 PM", done: true },
      { step: "Access Point Diagnostic", time: "Scheduled tonight", done: false },
      { step: "Resolved & Tested", time: "Awaiting", done: false }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial demo users into MongoDB...');
      await User.insertMany(INITIAL_USERS);
      console.log(`✅ Seeded ${INITIAL_USERS.length} demo users.`);
    }

    const ticketCount = await Ticket.countDocuments();
    if (ticketCount === 0) {
      console.log('🌱 Seeding initial demo tickets into MongoDB...');
      await Ticket.insertMany(INITIAL_TICKETS);
      console.log(`✅ Seeded ${INITIAL_TICKETS.length} demo tickets.`);
    }
  } catch (error) {
    console.error('⚠️ Seeding error:', error.message);
  }
};

module.exports = { seedDatabase, INITIAL_USERS, INITIAL_TICKETS };

