import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Pages
import Login from "./Pages/Public/Login";
import Register from "./Pages/Public/Register";

// Student Pages
import StudentDashboard from "./Pages/Student/Dashboard";
import StudentProfile from "./Pages/Student/Profile";
import ApplicationTracker from "./Pages/Student/ApplicationTracker";

// Company/Recruiter Pages
import JobPost from "./Pages/Company/JobPost";
import Applicants from "./Pages/Company/Applicants";

// Admin Pages
import ManageCompanies from "./Pages/TPOAdmin/Manage";
import ApproveDrives from "./Pages/TPOAdmin/Approve";
import Analytics from "./Pages/TPOAdmin/Analytics";

// BrowserRouter: Wraps the app to enable client-side routing.
// Routes: Container for all possible route definitions.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> {/* Default to login */}

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/applications" element={<ApplicationTracker />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter/post-job" element={<JobPost />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />

        {/* Admin Routes */}
        <Route path="/admin/companies" element={<ManageCompanies />} />
        <Route path="/admin/drives" element={<ApproveDrives />} />
        <Route path="/admin/results" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
