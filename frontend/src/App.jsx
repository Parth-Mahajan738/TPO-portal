import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./Pages/Public/Login";
import Register from "./Pages/Public/Register";

// Student Pages
import StudentDashboard from "./Pages/Student/Dashboard";
import StudentProfile from "./Pages/Student/Profile";
import Companies from "./Pages/Student/Companies";
import Apply from "./Pages/Student/Apply";
import ApplicationTracker from "./Pages/Student/ApplicationTracker";

// Company/Recruiter Pages
import RecruiterDashboard from "./Pages/Company/Dashboard";
import JobPost from "./Pages/Company/JobPost";
import Applicants from "./Pages/Company/Applicants";
import PlacementRounds from "./Pages/Company/Rounds";
import EventScheduling from "./Pages/Company/Events";

// Admin Pages
import ManageCompanies from "./Pages/TPOAdmin/Manage";
import ApproveDrives from "./Pages/TPOAdmin/Approve";
import Analytics from "./Pages/TPOAdmin/Analytics";

import { WebSocketProvider } from "./Context/WebSocketContext";
import ProtectedRoute from "./Components/ProtectedRoute";

// BrowserRouter: Wraps the app to enable client-side routing.
// Routes: Container for all possible route definitions.
function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} /> {/* Default to login */}

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
          <Route path="/student/companies" element={<ProtectedRoute allowedRoles={['student']}><Companies /></ProtectedRoute>} />
          <Route path="/student/apply/:companyId" element={<ProtectedRoute allowedRoles={['student']}><Apply /></ProtectedRoute>} />
          <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><ApplicationTracker /></ProtectedRoute>} />

          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/post-job" element={<ProtectedRoute allowedRoles={['recruiter']}><JobPost /></ProtectedRoute>} />
          <Route path="/recruiter/applicants" element={<ProtectedRoute allowedRoles={['recruiter']}><Applicants /></ProtectedRoute>} />
          <Route path="/recruiter/rounds" element={<ProtectedRoute allowedRoles={['recruiter']}><PlacementRounds /></ProtectedRoute>} />
          <Route path="/recruiter/events" element={<ProtectedRoute allowedRoles={['recruiter']}><EventScheduling /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/companies" element={<ProtectedRoute allowedRoles={['tpo', 'admin']}><ManageCompanies /></ProtectedRoute>} />
          <Route path="/admin/drives" element={<ProtectedRoute allowedRoles={['tpo', 'admin']}><ApproveDrives /></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute allowedRoles={['tpo', 'admin']}><Analytics /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
