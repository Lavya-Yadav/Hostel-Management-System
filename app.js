// ==========================================================
// HOSTEL MANAGEMENT & ASSISTANCE SYSTEM
// React 18 Application - Simple, Classroom-Friendly Architecture
// ==========================================================

const { useState, useEffect, useMemo } = React;

// ----------------------------------------------------------
// INITIAL SEED DATA (For instant classroom demonstration)
// ----------------------------------------------------------
const INITIAL_USERS = [
  {
    id: "user-1",
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
    id: "user-2",
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
    createdAt: "2026-10-24 14:30",
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
    createdAt: "2026-10-25 09:15",
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
    createdAt: "2026-10-23 08:00",
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
    createdAt: "2026-10-25 11:45",
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
    createdAt: "2026-10-22 19:20",
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
    preferredTime: "Afternoon (2:00 PM - 4:00 PM)",
    subIssue: "Very Slow Speed / Weak Signal",
    description: "Wi-Fi speeds drop below 1 Mbps near bed 2. Frequent disconnections during online coursework.",
    createdAt: "2026-10-24 16:10",
    supervisorNote: "Network admin rebooted 3rd floor router. Channel reconfiguration scheduled.",
    timeline: [
      { step: "Request Submitted", time: "24 Oct, 04:10 PM", done: true },
      { step: "IT Network Team Notified", time: "24 Oct, 05:00 PM", done: true },
      { step: "Router Access Point Reconfigured", time: "In Progress", done: false },
      { step: "Resolved", time: "Pending verification", done: false }
    ]
  }
];

// Category configuration with descriptive sub-options
const CATEGORIES = {
  room: {
    label: "Room Assistance",
    icon: "🛏️",
    badgeClass: "cat-room",
    description: "Cleaning, carpentry, door lock, bed & furniture",
    subIssues: [
      "Room Deep Cleaning",
      "Door / Window Lock Jammed",
      "Furniture / Chair Broken",
      "Mattress / Bed Frame Issue",
      "Pest Control (Insects / Termites)",
      "Curtain Rod / Wardrobe Hinge"
    ]
  },
  food: {
    label: "Food & Mess",
    icon: "🍲",
    badgeClass: "cat-food",
    description: "Mess quality, hygiene, dinner delay, sick diet",
    subIssues: [
      "Food Quality / Taste Concern",
      "Hygiene & Dining Cleanliness",
      "Special Sick Diet Meal Request",
      "Late Meal / Packed Lunch Request",
      "Mess Water Dispenser Issue",
      "Food Shortage in Buffet"
    ]
  },
  water: {
    label: "Water Facilities",
    icon: "💧",
    badgeClass: "cat-water",
    description: "Geyser, tap leakage, low pressure, drinking water",
    subIssues: [
      "Geyser / Hot Water issue",
      "Washroom Tap Leaking Continuously",
      "Low Water Pressure in Shower",
      "No Water Supply in Tanks",
      "Water Cooler Filter Foul Smell",
      "Drainage Clogging / Overflow"
    ]
  },
  ac: {
    label: "AC & Climate",
    icon: "❄️",
    badgeClass: "cat-ac",
    description: "AC cooling, water leakage, remote, noise",
    subIssues: [
      "AC Not Cooling",
      "Water Dripping Inside Room",
      "Loud Compressor Rattling Noise",
      "AC Remote Not Working / Dead",
      "AC Filter Extremely Dusty",
      "Power Tripping when AC is Turned On"
    ]
  },
  electrical: {
    label: "Electrical",
    icon: "⚡",
    badgeClass: "cat-electrical",
    description: "Lights, ceiling fans, power sockets, switchboards",
    subIssues: [
      "Tube light / Bulb fused or flickering",
      "Ceiling Fan Slow / Regulator Broken",
      "Power Socket Burnt / Not Working",
      "Switchboard Sparking",
      "MCB Tripping in Room"
    ]
  },
  wifi: {
    label: "Wi-Fi & Internet",
    icon: "📶",
    badgeClass: "cat-wifi",
    description: "Wi-Fi range, speed drops, portal login",
    subIssues: [
      "Very Slow Speed / Weak Signal",
      "Wi-Fi Disconnecting Repeatedly",
      "Hostel Login Portal Not Loading",
      "Ethernet Port in Room Inactive"
    ]
  }
};

// ----------------------------------------------------------
// MAIN APPLICATION COMPONENT
// ----------------------------------------------------------
function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("hostel_currentUser");
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to demo student
  });

  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [dbStatus, setDbStatus] = useState({ online: false, database: "checking", host: "" });
  const [loadingTickets, setLoadingTickets] = useState(false);

  const [authView, setAuthView] = useState("login"); // 'login' or 'signup'
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const activeRoleView = currentUser?.role === "warden" ? "warden" : "student";
  
  // Modals state
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState("room");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Check Node.js and MongoDB backend health
  const checkHealth = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setDbStatus({
        online: data.status === "online",
        database: data.database,
        host: data.databaseHost
      });
    } catch (err) {
      setDbStatus({ online: false, database: "disconnected", host: "offline" });
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch tickets from Node.js & MongoDB API
  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      let url = `/api/tickets?role=${activeRoleView}`;
      if (activeRoleView !== "warden" && currentUser?.email) {
        url += `&studentEmail=${encodeURIComponent(currentUser.email)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.tickets)) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.warn("API fetch error, keeping local state:", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("hostel_currentUser", JSON.stringify(currentUser));
      fetchTickets();
    } else {
      localStorage.removeItem("hostel_currentUser");
    }
  }, [currentUser, activeRoleView]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth Handlers with Node.js / MongoDB
  const handleLogin = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.user);
        showToast(data.message || `Welcome back, ${data.user.name}!`);
        return { success: true };
      } else {
        return { success: false, error: data.message || "Invalid email or password." };
      }
    } catch (err) {
      // Fallback to demo credentials if backend API is not responding
      const foundUser = INITIAL_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (foundUser) {
        setCurrentUser(foundUser);
        showToast(`Welcome back, ${foundUser.name}! (Demo Fallback)`);
        return { success: true };
      }
      return { success: false, error: "Connection error: " + err.message };
    }
  };

  const handleSignup = async (newUser) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.user);
        showToast(data.message || "Account created successfully!");
        return { success: true };
      } else {
        return { success: false, error: data.message || "Failed to create account." };
      }
    } catch (err) {
      return { success: false, error: "Server connection failed: " + err.message };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("hostel_currentUser");
    setAuthView("login");
    showToast("Logged out successfully.");
  };

  // Ticket Handlers
  const handleCreateTicket = async (ticketData) => {
    try {
      const payload = {
        ...ticketData,
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        roomNo: ticketData.roomNo || currentUser.roomNo,
        block: currentUser.block
      };

      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success && data.ticket) {
        setTickets((prev) => [data.ticket, ...prev]);
        setIsNewRequestOpen(false);
        showToast(`Request #${data.ticket.id} submitted successfully!`);
      } else {
        showToast("Error saving ticket: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      // Local fallback
      const newId = "HST-" + (205 + tickets.length);
      const newTicket = {
        id: newId,
        ...ticketData,
        status: "pending",
        studentName: currentUser.name,
        studentEmail: currentUser.email,
        roomNo: ticketData.roomNo || currentUser.roomNo,
        block: currentUser.block,
        supervisorNote: "Ticket logged.",
        timeline: [{ step: "Request Submitted", time: "Just now", done: true }]
      };
      setTickets([newTicket, ...tickets]);
      setIsNewRequestOpen(false);
      showToast(`Request #${newId} submitted successfully!`);
    }
  };

  const handleUpdateTicketStatus = async (ticketId, newStatus, note = "") => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, supervisorNote: note })
      });
      const data = await res.json();

      if (data.success && data.ticket) {
        setTickets((prev) =>
          prev.map((t) => (t.id === ticketId ? data.ticket : t))
        );
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(data.ticket);
        }
        showToast(`Ticket #${ticketId} status updated to ${newStatus === "progress" ? "In Progress" : newStatus.toUpperCase()}`);
      } else {
        showToast("Update error: " + (data.message || "Failed"));
      }
    } catch (err) {
      // Local state fallback
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus, supervisorNote: note || t.supervisorNote } : t))
      );
      showToast(`Ticket #${ticketId} status updated!`);
    }
  };

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // In student view, only show current student's tickets (or all for demo flexibility)
      const matchesStudent = activeRoleView === "warden" ? true : t.studentEmail === currentUser?.email;
      const matchesCategory = activeCategoryFilter === "all" || t.category === activeCategoryFilter;
      const matchesStatus = activeStatusFilter === "all" || t.status === activeStatusFilter;
      const matchesSearch =
        searchQuery === "" ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStudent && matchesCategory && matchesStatus && matchesSearch;
    });
  }, [tickets, activeRoleView, currentUser, activeCategoryFilter, activeStatusFilter, searchQuery]);

  // Statistics counts
  const stats = useMemo(() => {
    const relevant = activeRoleView === "warden" ? tickets : tickets.filter((t) => t.studentEmail === currentUser?.email);
    return {
      total: relevant.length,
      pending: relevant.filter((t) => t.status === "pending").length,
      progress: relevant.filter((t) => t.status === "progress").length,
      resolved: relevant.filter((t) => t.status === "resolved").length
    };
  }, [tickets, activeRoleView, currentUser]);

  // Open modal preselected to a category
  const handleOpenCategoryRequest = (catKey) => {
    setPreselectedCategory(catKey);
    setIsNewRequestOpen(true);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        activeRoleView={activeRoleView}
        dbStatus={dbStatus}
        onLogout={handleLogout}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Content Area */}
      {!currentUser ? (
        authView === "login" ? (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView("signup")}
          />
        ) : (
          <SignupPage
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView("login")}
          />
        )
      ) : (
        <Dashboard
          currentUser={currentUser}
          activeRoleView={activeRoleView}
          stats={stats}
          tickets={filteredTickets}
          activeCategoryFilter={activeCategoryFilter}
          onCategoryFilterChange={setActiveCategoryFilter}
          activeStatusFilter={activeStatusFilter}
          onStatusFilterChange={setActiveStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNewRequest={() => {
            setPreselectedCategory("room");
            setIsNewRequestOpen(true);
          }}
          onOpenCategoryRequest={handleOpenCategoryRequest}
          onSelectTicket={(ticket) => setSelectedTicket(ticket)}
          onUpdateStatus={handleUpdateTicketStatus}
        />
      )}

      {/* New Request Modal */}
      {isNewRequestOpen && (
        <NewRequestModal
          initialCategory={preselectedCategory}
          currentUser={currentUser}
          onClose={() => setIsNewRequestOpen(false)}
          onSubmit={handleCreateTicket}
        />
      )}

      {/* Ticket Details & Timeline Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          activeRoleView={activeRoleView}
          onClose={() => setSelectedTicket(null)}
          onUpdateStatus={handleUpdateTicketStatus}
        />
      )}

      {/* Classroom Guide & Viva Q&A Modal */}
      {isGuideOpen && <ClassroomGuideModal onClose={() => setIsGuideOpen(false)} />}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------
// NAVBAR COMPONENT
// ----------------------------------------------------------
function Navbar({ currentUser, activeRoleView, dbStatus, onLogout, onOpenGuide }) {
  const isWarden = activeRoleView === "warden";

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="brand">
          <div className="brand-icon">🏨</div>
          <span>HostelCare</span>
          <span className="brand-badge">{isWarden ? "Warden Admin" : "Student Portal"}</span>
          {dbStatus && (
            <div
              className={`status-indicator-pill ${dbStatus.database === "connected" ? "online" : "offline"}`}
              title={dbStatus.database === "connected" ? "Database connected and operational" : "Service Offline"}
            >
              <span className="status-dot-pulse"></span>
              <span>{dbStatus.database === "connected" ? "Active" : "Offline"}</span>
            </div>
          )}
        </div>

        <div className="nav-actions">
          {currentUser && (
            <>
              {/* User profile pill with automatic role tag */}
              <div className="user-badge">
                <div className="user-avatar">
                  {currentUser.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <span>{currentUser.name}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  ({isWarden ? "Admin" : currentUser.roomNo})
                </span>
                <span className={`badge ${isWarden ? "badge-progress" : "badge-resolved"}`} style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem", marginLeft: "0.3rem" }}>
                  {isWarden ? "Warden" : "Student"}
                </span>
              </div>

              {/* Logout button */}
              <button className="btn btn-outline btn-sm" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ----------------------------------------------------------
// LOGIN PAGE COMPONENT
// ----------------------------------------------------------
function LoginPage({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    const res = await onLogin(email, password);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
    }
  };

  // Quick helper to fill demo credentials during classroom presentation
  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Student Login</h1>
          <p>Hostel Assistance & Facility Complaint Portal</p>
        </div>

        {/* Demo Fast Autofill Box for Classroom ease */}
        <div className="demo-credentials-box">
          <div className="demo-credentials-title">
            <span>💡</span> Classroom Demo Quick Fill:
          </div>
          <div className="demo-buttons-row">
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => fillCredentials("rahul@hostel.edu", "student123")}
            >
              👤 Student
            </button>
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => fillCredentials("warden@hostel.edu", "admin123")}
            >
              🛡️ Warden (Admin)
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Hostel Email or Roll Number</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. student@hostel.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={loading}>
            {loading ? "Signing In..." : "Sign In to Hostel Portal"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account yet?
          <span className="auth-link" onClick={onSwitchToSignup}>
            Student Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// SIGNUP PAGE COMPONENT
// ----------------------------------------------------------
function SignupPage({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    block: "Block B (Boys)",
    roomNo: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.rollNo || !formData.roomNo || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await onSignup(formData);
    setLoading(false);
    if (!res.success) {
      setError(res.error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: "520px" }}>
        <div className="auth-header">
          <h1>Student Registration</h1>
          <p>Register your room and account for instant assistance</p>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem", border: "1px solid #fecaca" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Sahil Verma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Roll Number / Student ID *</label>
              <input
                type="text"
                name="rollNo"
                className="form-input"
                placeholder="e.g. STU-2024-089"
                value={formData.rollNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hostel Email *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="e.g. sahil@hostel.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Hostel Block *</label>
              <select name="block" className="form-select" value={formData.block} onChange={handleChange}>
                <option value="Block A (Girls)">Block A (Girls)</option>
                <option value="Block B (Boys)">Block B (Boys)</option>
                <option value="Block C (Boys)">Block C (Boys)</option>
                <option value="International Hostel">International Hostel</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Room Number *</label>
              <input
                type="text"
                name="roomNo"
                className="form-input"
                placeholder="e.g. B-204"
                value={formData.roomNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contact Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="+91 98765 00000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Create Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.5rem" }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Student Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already registered?
          <span className="auth-link" onClick={onSwitchToLogin}>
            Sign In here
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// MAIN DASHBOARD COMPONENT
// ----------------------------------------------------------
function Dashboard({
  currentUser,
  activeRoleView,
  stats,
  tickets,
  activeCategoryFilter,
  onCategoryFilterChange,
  activeStatusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchChange,
  onOpenNewRequest,
  onOpenCategoryRequest,
  onSelectTicket,
  onUpdateStatus
}) {
  return (
    <main className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-info">
          <h1>
            {activeRoleView === "warden" ? "🛡️ Hostel Administration Dashboard" : `Hello, ${currentUser.name}! 👋`}
          </h1>
          <p>
            {activeRoleView === "warden"
              ? "Overseeing all resident complaints, water, food, and room maintenance across hostel blocks."
              : "Raise and track maintenance requests for your room, mess food, water supply, AC, and other hostel facilities."}
          </p>

          <div className="welcome-meta">
            <span className="meta-pill">
              <span>📍</span> Room: <strong>{currentUser.roomNo}</strong>
            </span>
            <span className="meta-pill">
              <span>🏢</span> {currentUser.block}
            </span>
            <span className="meta-pill">
              <span>🎓</span> ID: <strong>{currentUser.rollNo}</strong>
            </span>
          </div>
        </div>

        <div className="welcome-actions">
          <button className="btn btn-primary" onClick={onOpenNewRequest} style={{ background: "white", color: "var(--primary)" }}>
            <span style={{ fontSize: "1.1rem" }}>➕</span> New Assistance Request
          </button>
        </div>
      </div>

      {/* Metrics / Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span>Total Requests</span>
            <h3>{stats.total}</h3>
          </div>
          <div className="stat-icon total">📋</div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Pending Action</span>
            <h3>{stats.pending}</h3>
          </div>
          <div className="stat-icon pending">⏳</div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>In Progress</span>
            <h3>{stats.progress}</h3>
          </div>
          <div className="stat-icon progress">🛠️</div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Resolved</span>
            <h3>{stats.resolved}</h3>
          </div>
          <div className="stat-icon resolved">✅</div>
        </div>
      </div>

      {/* Quick Facility Assistance Cards (Direct 1-Click Request Launchers) */}
      <section className="facilities-section">
        <div className="section-header">
          <div>
            <h2><span>⚡</span> Quick Facility Assistance</h2>
            <div className="section-subtitle">Click any category below to instantly report an issue</div>
          </div>
        </div>

        <div className="facility-grid">
          {Object.entries(CATEGORIES).map(([key, item]) => (
            <div
              key={key}
              className="facility-card"
              onClick={() => onOpenCategoryRequest(key)}
              title={`Report ${item.label} issue`}
            >
              <div className="facility-icon-circle" style={{ background: "var(--bg-subtle)" }}>
                {item.icon}
              </div>
              <div className="facility-name">{item.label}</div>
              <div className="facility-desc">{item.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Requests List & Filter Section */}
      <section className="requests-section">
        <div className="toolbar">
          {/* Category Filter Chips */}
          <div className="filter-group">
            <button
              className={`filter-chip ${activeCategoryFilter === "all" ? "active" : ""}`}
              onClick={() => onCategoryFilterChange("all")}
            >
              All Categories
            </button>
            {Object.entries(CATEGORIES).map(([key, item]) => (
              <button
                key={key}
                className={`filter-chip ${activeCategoryFilter === key ? "active" : ""}`}
                onClick={() => onCategoryFilterChange(key)}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="search-input-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by ID, room, or issue..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Status Sub-Filters */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}>
          {["all", "pending", "progress", "resolved"].map((st) => (
            <button
              key={st}
              className={`btn btn-sm ${activeStatusFilter === st ? "btn-primary" : "btn-outline"}`}
              onClick={() => onStatusFilterChange(st)}
              style={{ textTransform: "capitalize" }}
            >
              {st === "all" ? "All Statuses" : st === "progress" ? "In Progress" : st}
            </button>
          ))}
        </div>

        {/* Ticket Cards */}
        {tickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No assistance requests found</h3>
            <p>Try clearing your filters or create a new request for your room or facilities.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: "1rem" }}
              onClick={onOpenNewRequest}
            >
              ➕ Raise New Request
            </button>
          </div>
        ) : (
          <div className="tickets-list">
            {tickets.map((t) => (
              <div key={t.id} className="ticket-card">
                <div className="ticket-card-header">
                  <div className="ticket-left-meta">
                    <span className="ticket-id">{t.id}</span>
                    <span className={`badge-category ${CATEGORIES[t.category]?.badgeClass || ""}`}>
                      {CATEGORIES[t.category]?.icon} {CATEGORIES[t.category]?.label}
                    </span>
                    <span className={`badge-priority priority-${t.priority}`}>
                      {t.priority}
                    </span>
                  </div>

                  <span className={`badge-status status-${t.status}`}>
                    <span className="status-dot"></span>
                    {t.status === "pending" ? "Pending Approval" : t.status === "progress" ? "In Progress" : "Resolved"}
                  </span>
                </div>

                <div className="ticket-title">{t.title}</div>
                <div className="ticket-description">{t.description}</div>

                <div className="ticket-footer">
                  <div className="ticket-details-info">
                    <span>📍 <strong>Room {t.roomNo}</strong> ({t.block})</span>
                    <span>👤 {t.studentName}</span>
                    <span>🕒 Preferred: {t.preferredTime}</span>
                  </div>

                  <div className="ticket-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectTicket(t)}
                    >
                      👁️ Details & Timeline
                    </button>

                    {/* Quick Warden Action */}
                    {activeRoleView === "warden" && t.status !== "resolved" && (
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ background: "var(--success)", borderColor: "var(--success)" }}
                        onClick={() => onUpdateStatus(t.id, "resolved")}
                      >
                        ✓ Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// ----------------------------------------------------------
// NEW REQUEST MODAL COMPONENT
// ----------------------------------------------------------
function NewRequestModal({ initialCategory, currentUser, onClose, onSubmit }) {
  const [category, setCategory] = useState(initialCategory || "room");
  const [subIssue, setSubIssue] = useState(CATEGORIES[category]?.subIssues[0] || "");
  const [priority, setPriority] = useState("medium");
  const [roomNo, setRoomNo] = useState(currentUser?.roomNo || "");
  const [preferredTime, setPreferredTime] = useState("Morning (9:00 AM - 11:00 AM)");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Update subIssue when category changes
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const issues = CATEGORIES[newCat]?.subIssues;
    if (issues && issues.length > 0) {
      setSubIssue(issues[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please provide a brief description of the issue.");
      return;
    }

    setSubmitting(true);
    const finalTitle = title.trim() || `${subIssue} in Room ${roomNo || currentUser.roomNo}`;

    await onSubmit({
      title: finalTitle,
      category,
      subIssue,
      priority,
      roomNo,
      preferredTime,
      description
    });
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ New Assistance Request</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                {error}
              </div>
            )}

            <label className="form-label">1. Select Facility Category *</label>
            <div className="category-picker-grid">
              {Object.entries(CATEGORIES).map(([key, item]) => (
                <div
                  key={key}
                  className={`category-choice ${category === key ? "selected" : ""}`}
                  onClick={() => handleCategoryChange(key)}
                >
                  <div className="category-choice-icon">{item.icon}</div>
                  <div className="category-choice-label">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">2. Specific Issue Type</label>
                <select
                  className="form-select"
                  value={subIssue}
                  onChange={(e) => setSubIssue(e.target.value)}
                >
                  {CATEGORIES[category]?.subIssues.map((sub, i) => (
                    <option key={i} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">3. Urgency / Priority *</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low (Can wait 2-3 days)</option>
                  <option value="medium">Medium (Requires attention today)</option>
                  <option value="high">High (Urgent / Immediate visit)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room / Location *</label>
                <input
                  type="text"
                  className="form-input"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  placeholder="e.g. B-302 or Common Hall"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Inspection Time</label>
                <select
                  className="form-select"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                >
                  <option value="Morning (9:00 AM - 11:00 AM)">Morning (9:00 AM - 11:00 AM)</option>
                  <option value="Afternoon (2:00 PM - 4:00 PM)">Afternoon (2:00 PM - 4:00 PM)</option>
                  <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Issue Summary / Title (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder={`e.g. ${subIssue}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Description of Problem *</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Please describe what is happening (e.g., AC not cooling and making loud noise, water tap leaking in bathroom, food quality issue in mess dinner...)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting Request..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// TICKET DETAIL & TIMELINE MODAL
// ----------------------------------------------------------
function TicketDetailModal({ ticket, activeRoleView, onClose, onUpdateStatus }) {
  const [supervisorNote, setSupervisorNote] = useState(ticket.supervisorNote || "");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Ticket {ticket.id}</h2>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "2px" }}>
              Submitted on {ticket.createdAt} by {ticket.studentName}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <span className={`badge-category ${CATEGORIES[ticket.category]?.badgeClass || ""}`}>
              {CATEGORIES[ticket.category]?.icon} {CATEGORIES[ticket.category]?.label}
            </span>
            <span className={`badge-priority priority-${ticket.priority}`}>
              {ticket.priority} priority
            </span>
            <span className={`badge-status status-${ticket.status}`}>
              <span className="status-dot"></span>
              {ticket.status.toUpperCase()}
            </span>
          </div>

          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
            {ticket.title}
          </h3>

          <p style={{ background: "var(--bg-main)", padding: "0.85rem", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.25rem", border: "1px solid var(--border)" }}>
            {ticket.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
            <div><strong>Location:</strong> Room {ticket.roomNo} ({ticket.block})</div>
            <div><strong>Sub-category:</strong> {ticket.subIssue}</div>
            <div><strong>Preferred Time:</strong> {ticket.preferredTime}</div>
            <div><strong>Contact Email:</strong> {ticket.studentEmail}</div>
          </div>

          {/* Resolution Timeline */}
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
            Resolution Progress Timeline
          </h4>
          <div className="timeline">
            {ticket.timeline.map((step, idx) => (
              <div
                key={idx}
                className={`timeline-step ${step.done ? "completed" : "pending"}`}
              >
                <div className="timeline-node">
                  {step.done ? "✓" : idx + 1}
                </div>
                <div className="timeline-content">
                  <h4>{step.step}</h4>
                  <p>{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Supervisor / Warden Action Panel */}
          {activeRoleView === "warden" && (
            <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", border: "1px solid #cbd5e1", marginTop: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--primary)" }}>
                🛡️ Warden Administration Controls
              </h4>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: "0.8rem" }}>Supervisor Remark / Action Update</label>
                <input
                  type="text"
                  className="form-input"
                  value={supervisorNote}
                  onChange={(e) => setSupervisorNote(e.target.value)}
                  placeholder="e.g. Plumber assigned / In touch with mess manager..."
                />
              </div>

              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => onUpdateStatus(ticket.id, "pending", supervisorNote)}
                >
                  Set Pending
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ color: "#0369a1" }}
                  onClick={() => onUpdateStatus(ticket.id, "progress", supervisorNote)}
                >
                  Set In Progress
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ background: "var(--success)", borderColor: "var(--success)" }}
                  onClick={() => onUpdateStatus(ticket.id, "resolved", supervisorNote)}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          {ticket.status !== "resolved" && activeRoleView === "student" && (
            <button
              className="btn btn-primary"
              style={{ background: "var(--success)", borderColor: "var(--success)" }}
              onClick={() => {
                onUpdateStatus(ticket.id, "resolved", "Marked resolved by student resident.");
                onClose();
              }}
            >
              ✓ Issue is Fixed (Mark Resolved)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------
// CLASSROOM PRESENTATION & VIVA GUIDE MODAL
// ----------------------------------------------------------
function ClassroomGuideModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: "720px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>🎓 Classroom Presentation & Viva Guide</h2>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Everything you need to explain this project simply and confidently in class
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body guide-content">
          <div className="guide-section">
            <h3>1. Project Synopsis (What to say in 30 seconds)</h3>
            <p>
              <em>
                "Respected Teacher and friends, our project is a <strong>Hostel Assistance & Management System</strong> built using the <strong>React JavaScript framework</strong>. It provides students an intuitive portal to log in, register their room, and raise assistance requests for room maintenance, mess food quality, and facilities like water geyser/leakage and air conditioning. It also includes a warden administration view to monitor and resolve tickets with a full tracking timeline."
              </em>
            </p>
          </div>

          <div className="guide-section">
            <h3>2. Key Architecture & Framework Concepts</h3>
            <ul>
              <li><strong>Node.js & Express REST Backend:</strong> Provides backend API endpoints (`/api/auth` and `/api/tickets`) for student registration, login verification, and complaint ticket lifecycle management.</li>
              <li><strong>MongoDB & Mongoose:</strong> Provides robust NoSQL document storage for users and tickets with schemas, validation, and persistent history.</li>
              <li><strong>React 18 Component UI:</strong> Modular components (`Navbar`, `LoginPage`, `SignupPage`, `Dashboard`, `NewRequestModal`, `TicketDetailModal`).</li>
              <li><strong>State & Hooks (useState, useEffect, useMemo):</strong> Handles reactive state, asynchronous API fetching, dynamic status tracking, and computed analytics.</li>
              <li><strong>Dual-Role Architecture:</strong> Clear separation between Student view (submitting requests & tracking room tickets) and Warden administration (managing all hostel tickets & adding supervisor notes).</li>
            </ul>
          </div>

          <div className="guide-section">
            <h3>3. Architecture Flow Diagram</h3>
            <div className="guide-code-box">
              React 18 Frontend (Port 3000)<br/>
              &nbsp;├── UI Layer (Navbar, Login/Signup, Dashboard, Ticket Modals)<br/>
              &nbsp;└── REST API Client (fetch /api/auth, /api/tickets)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;▼ (JSON HTTP Requests)<br/>
              Node.js + Express Backend Server (`server.js`)<br/>
              &nbsp;├── Auth Routes (`/api/auth/login`, `/api/auth/signup`)<br/>
              &nbsp;├── Ticket Routes (`/api/tickets`, status patch, category filter)<br/>
              &nbsp;└── Mongoose ODM Layer (UserSchema, TicketSchema)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▲&nbsp;▼ (Mongoose Connection)<br/>
              MongoDB Database (`hostelcare` database, users & tickets collections)
            </div>
          </div>

          <div className="guide-section">
            <h3>4. Top 4 Expected Viva Questions & Answers</h3>
            
            <div className="qa-card">
              <strong>Q1: What is the tech stack of this application?</strong>
              The project is a Full-Stack MERN-architecture application: <strong>React 18</strong> for the reactive single-page frontend, <strong>Node.js</strong> and <strong>Express</strong> for the RESTful backend web server, and <strong>MongoDB</strong> with <strong>Mongoose</strong> for document database storage.
            </div>

            <div className="qa-card">
              <strong>Q2: How and where is data stored?</strong>
              All user accounts and hostel complaint tickets are saved permanently in a <strong>MongoDB</strong> database. Mongoose models (`User` and `Ticket`) enforce data validation and timestamps. When a ticket is submitted or updated, React sends a REST request to the Node.js backend which writes directly to MongoDB.
            </div>

            <div className="qa-card">
              <strong>Q3: How do you handle different categories like Food, AC, and Water?</strong>
              We defined a structured JavaScript configuration object `CATEGORIES`. Each category specifies unique icons, styling classes, and dynamic sub-issues (e.g., AC not cooling, Water tap leaking, Food hygiene) which dynamically populate the request form.
            </div>

            <div className="qa-card">
              <strong>Q4: How can the warden or supervisor interact with tickets?</strong>
              We built an interactive role switcher in the navbar. Switching to "Warden View" displays all hostel tickets and unlocks status controls to move tickets from Pending → In Progress → Resolved with supervisor remarks.
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Got it, Let's Present!
          </button>
        </div>
      </div>
    </div>
  );
}

// Mount React application to DOM
function mountHostelApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Fatal: #root element not found");
    return;
  }
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    console.log("✅ HostelCare React application mounted successfully.");
  } catch (err) {
    console.error("React render error:", err);
    rootElement.innerHTML = `
      <div style="padding:2rem;max-width:600px;margin:3rem auto;font-family:sans-serif;background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;color:#9f1239;">
        <h3 style="margin-top:0;">⚠️ Mounting Error</h3>
        <p>${err.message}</p>
        <button onclick="location.reload()" style="background:#e11d48;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Reload</button>
      </div>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountHostelApp);
} else {
  mountHostelApp();
}
