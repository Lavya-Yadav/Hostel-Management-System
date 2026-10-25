# 🏨 HostelCare - Hostel Assistance & Management System
> **Full-Stack Web Project: React 18 + Node.js + Express + MongoDB**  
> *Designed for easy classroom presentation, clean architecture, and viva defense.*

---

## 🌟 1. Project Overview
**HostelCare** is a modern full-stack web application built using **React 18**, **Node.js (Express)**, and **MongoDB (Mongoose)**. It provides hostel residents with a centralized digital portal to register, log in, and raise assistance requests for:
- 🛏️ **Room Assistance**: Cleaning service, carpentry, door lock repair, furniture fixes, pest control.
- 🍲 **Food & Mess Facilities**: Mess food hygiene & quality concerns, late meal requests, sick diet requests, drinking water issues.
- 💧 **Water Facilities**: Geyser malfunction, hot water problems, pipe/tap leakage, low shower pressure, water supply shortages.
- ❄️ **AC & Climate**: AC not cooling, indoor unit water dripping, compressor rattling, broken remotes.
- ⚡ **Electrical**: Burnt bulbs/tube lights, slow ceiling fans, sparking switchboards, room MCB trips.
- 📶 **Wi-Fi & Internet**: Weak signal in room corners, frequent disconnections, hostel captive portal errors.

The system also includes an administrative **Warden View** where hostel staff review complaints, update status (*Pending* → *In Progress* → *Resolved*), and add supervisor notes.

---

## 🛠️ 2. Tech Stack

- **Frontend:** React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useMemo`)
- **Backend:** Node.js + Express REST API
- **Database:** MongoDB (via Mongoose ODM)
- **Styling:** Vanilla CSS3 design system (modern cards, glassmorphism, responsive grid)
- **Environment:** Configurable via `.env` file

---

## 🚀 3. How to Run the Project

### Step 1: Install Dependencies (First time only)
```bash
npm install
```

### Step 2: Configure MongoDB Connection
Check the `.env` file in the project root:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/hostelcare
```
> **Note for MongoDB Atlas (Cloud):** If you prefer using MongoDB Atlas cloud database instead of a local MongoDB installation, simply paste your Atlas connection URI into `.env`:
> ```env
> MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostelcare?retryWrites=true&w=majority
> ```

### Step 3: Start the Node.js Server
```bash
npm start
```
Then visit **`http://localhost:3000`** in your browser.

*(On Windows, you can also double-click `start_app.bat` to launch automatically.)*

---

## 🔑 4. Pre-Loaded Demo Accounts

The database is automatically pre-seeded with sample users and tickets upon first launch. The login page has **Quick-Fill Buttons** so you never have to fumble with credentials during presentations:

| Role | Email | Password | What You Can Demo |
| :--- | :--- | :--- | :--- |
| **Student** | `rahul@hostel.edu` | `student123` | View Room B-302 tickets, create new requests, view timeline. |
| **Warden (Admin)** | `warden@hostel.edu` | `admin123` | View all hostel complaints, update status, add supervisor remarks. |

*You can also click **"Student Sign Up"** to demonstrate registering a brand new student account directly saved into MongoDB.*

---

## 🔌 5. REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Checks server status and MongoDB connection state |
| `POST` | `/api/auth/login` | Validates email & password against MongoDB `users` |
| `POST` | `/api/auth/signup` | Registers new student account into MongoDB |
| `GET` | `/api/tickets` | Returns tickets with role, status, category, and search filters |
| `GET` | `/api/tickets/stats` | Returns aggregated metrics (total, pending, progress, resolved) |
| `POST` | `/api/tickets` | Inserts new assistance ticket into MongoDB |
| `PATCH` | `/api/tickets/:id` | Updates ticket status, supervisor note, and timeline |
| `DELETE` | `/api/tickets/:id` | Deletes a ticket from MongoDB |

---

## 📁 6. Project Structure

```text
Hostel Management System/
│
├── server.js               # Node.js Express server entry point & static serving
├── .env                    # Environment variables (PORT, MONGODB_URI)
├── .env.example            # Sample environment file with Atlas instructions
│
├── server/
│   ├── config/
│   │   ├── db.js           # Mongoose connection handler
│   │   └── seedData.js     # Automatic MongoDB seed data on initial start
│   ├── models/
│   │   ├── User.js         # Mongoose User schema (student & warden)
│   │   └── Ticket.js       # Mongoose Ticket schema (status, timeline, category)
│   └── routes/
│       ├── authRoutes.js   # Authentication endpoints (login, signup)
│       └── ticketRoutes.js # Complaint & ticket CRUD endpoints
│
├── index.html              # HTML5 entry point loading React 18 & design CSS
├── style.css               # Vanilla CSS design system
├── app.js                  # React 18 source code (Hooks, Modals, API calls)
├── app.compiled.js         # Compiled JavaScript
├── build.js                # Build script (compiles app.js JSX -> app.compiled.js)
├── package.json            # npm packages and scripts
└── README.md               # Documentation & viva guide
```

---

## ❓ 7. Common Viva & Teacher Questions (With Answers)

**Q1: What is the tech stack of this application?**  
> **Answer:** It uses **React 18** on the frontend for reactive UI, **Node.js with Express** for the RESTful API backend, and **MongoDB with Mongoose** for document database storage.

**Q2: How and where is data stored?**  
> **Answer:** All student profiles and complaint tickets are stored persistently in **MongoDB** collections (`users` and `tickets`). Mongoose models define schema validation, defaults, and timestamps.

**Q3: How does the frontend communicate with the backend?**  
> **Answer:** React components use the native `fetch` API to send asynchronous HTTP requests (GET, POST, PATCH) with JSON payloads to Express endpoints under `/api/auth` and `/api/tickets`.

**Q4: How do you handle different facility categories?**  
> **Answer:** Categories (*Room, Food/Mess, Water, AC, Electrical, Wi-Fi*) are configured with distinct icons and dynamic sub-issues. When a student chooses a category, the sub-issue dropdown automatically updates to relevant presets.
