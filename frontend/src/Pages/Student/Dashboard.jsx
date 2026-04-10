// This acts as the main landing page for students after login.
// It will eventually show key metrics like upcoming drives, application status, etc.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentSidebar from "../../Components/layouts/StudentSidebar";
import { getStudentStorageKey } from "../../Utils/studentStorageKey";

const StudentDashboard = () => {
    const navigate = useNavigate();
    // State to hold the full user profile object fetched after login
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        totalApplications: 0,
        shortlisted: 0,
        offers: 0,
        pending: 0
    });
    const [upcomingDrives, setUpcomingDrives] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [expandedCard, setExpandedCard] = useState(null);

    // useEffect runs once when the component first renders (mounts).
    // We read the profile from localStorage — it was saved there right after login.
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const studentKey = getStudentStorageKey(parsedUser);
            if (studentKey) {
                loadDashboardData(studentKey);
            }
        }
    }, []); // Empty array [] means: run this only once, on first render

    const loadDashboardData = async (studentKey) => {
        // Load applications from localStorage
        const savedApplications = localStorage.getItem(`applications_${studentKey}`);
        const allApps = savedApplications ? JSON.parse(savedApplications) : [];

        setStats({
            totalApplications: allApps.length,
            shortlisted: allApps.filter(a => ["Shortlisted", "Online Assessment", "Technical Interview", "HR Interview"].includes(a.status)).length,
            offers: allApps.filter(a => ["Offer Extended", "Offer Accepted"].includes(a.status)).length,
            pending: allApps.filter(a => a.status === "Applied").length
        });

        setRecentApplications(allApps.slice(0, 5));

        // Load upcoming drives from recruiter jobs in Backend
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                    headers: { "Authorization": `Token ${token}` }
                });
                if (res.ok) {
                    const jobs = await res.json();
                    const drives = jobs
                        .filter(job => job.application_deadline && new Date(job.application_deadline) >= new Date())
                        .map(job => ({
                            id: job.id,
                            companyName: job.company_name,
                            driveDate: job.application_deadline,
                            jobRole: job.job_title,
                            location: job.location
                        }))
                        .slice(0, 5);
                    setUpcomingDrives(drives);
                }
            }
        } catch (e) {
            console.error("Failed to load upcoming drives", e);
        }

        // Calculate profile completion
        const savedProfile = localStorage.getItem(`profile_${studentKey}`);
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            let completion = 0;
            if (profile.personalInfo?.firstName) completion += 25;
            if (profile.education?.graduation?.cgpa) completion += 25;
            if (profile.skills?.length > 0) completion += 25;
            if (profile.projects?.length > 0) completion += 25;
            setProfileCompletion(completion);
        }
    };



    const getStatusColor = (status) => {
        const colors = {
            "Applied": { bg: "#ebf8ff", text: "#2b6cb0" },
            "Shortlisted": { bg: "#f0fff4", text: "#38a169" },
            "Online Assessment": { bg: "#faf5ff", text: "#805ad5" },
            "Technical Interview": { bg: "#e6fffa", text: "#319795" },
            "HR Interview": { bg: "#fff5f5", text: "#e53e3e" },
            "Offer Extended": { bg: "#c6f6d5", text: "#22543d" },
            "Rejected": { bg: "#fed7d7", text: "#c53030" }
        };
        return colors[status] || { bg: "#edf2f7", text: "#4a5568" };
    };

    const menuItems = [
        { id: "profile", label: "My Profile", description: "Manage your personal info, education, and documents", path: "/student/profile", color: "#3b6ef8" },
        { id: "companies", label: "Browse Companies", description: "View and apply to companies visiting campus", path: "/student/companies", color: "#27ae60" },
        { id: "applications", label: "My Applications", description: "Track status of your job applications", path: "/student/applications", color: "#9f7aea" }
    ];

    const StatCard = ({ label, value, color, icon }) => (
        <div
            onMouseEnter={() => setExpandedCard(label)}
            onMouseLeave={() => setExpandedCard(null)}
            style={{
                backgroundColor: "#1a1f2e",
                padding: "1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid #2d3448",
                transition: "all 0.3s ease",
                transform: expandedCard === label ? "translateY(-4px)" : "translateY(0)",
                boxShadow: expandedCard === label ? "0 10px 20px rgba(59, 110, 248, 0.1)" : "none"
            }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.5rem" }}>{label}</p>
                        <p style={{ fontSize: "2rem", fontWeight: 700, color: color }}>{value}</p>
                    </div>
                    <span style={{ fontSize: "2rem", opacity: 0.3 }}>{icon}</span>
                </div>
            </div>
    );

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                {/* Welcome Section */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                        Welcome back, {user?.first_name || "Student"}! 👋
                    </h1>
                    <p style={{ color: "#718096" }}>
                        Track your placement journey, apply to companies, and manage your profile.
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                    <StatCard label="Total Applications" value={stats.totalApplications} color="#3b6ef8" icon="📝" />
                    <StatCard label="Shortlisted" value={stats.shortlisted} color="#27ae60" icon="⭐" />
                    <StatCard label="Offers Received" value={stats.offers} color="#9f7aea" icon="🎉" />
                    <StatCard label="Pending Review" value={stats.pending} color="#ed8936" icon="⏳" />
                </div>

                {/* Main Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
                    {/* Quick Actions */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                            🚀 Quick Actions
                        </h2>
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => navigate(item.path)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        padding: "1rem",
                                        backgroundColor: "#242938",
                                        border: "1px solid #2d3448",
                                        borderRadius: "0.75rem",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        transition: "all 0.2s",
                                        width: "100%"
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = item.color;
                                        e.currentTarget.style.backgroundColor = "#2d3448";
                                        e.currentTarget.style.transform = "translateX(4px)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "#2d3448";
                                        e.currentTarget.style.backgroundColor = "#242938";
                                        e.currentTarget.style.transform = "translateX(0)";
                                    }}
                                >
                                    <div style={{
                                        width: "8px",
                                        height: "48px",
                                        backgroundColor: item.color,
                                        borderRadius: "4px"
                                    }} />
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.25rem" }}>
                                            {item.label}
                                        </h3>
                                        <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>{item.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Profile Completion */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                            📋 Profile Completion
                        </h2>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Progress</span>
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: profileCompletion === 100 ? "#48bb78" : "#3b6ef8" }}>
                                    {profileCompletion}%
                                </span>
                            </div>
                            <div style={{ height: "8px", backgroundColor: "#242938", borderRadius: "9999px", overflow: "hidden" }}>
                                <div style={{
                                    height: "100%",
                                    width: `${profileCompletion}%`,
                                    backgroundColor: profileCompletion === 100 ? "#48bb78" : "#3b6ef8",
                                    borderRadius: "9999px",
                                    transition: "width 0.3s ease"
                                }} />
                            </div>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {[
                                { label: "Personal Information", complete: profileCompletion >= 25 },
                                { label: "Education Details", complete: profileCompletion >= 50 },
                                { label: "Skills & Certifications", complete: profileCompletion >= 75 },
                                { label: "Projects & Experience", complete: profileCompletion >= 100 }
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <span style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: item.complete ? "#27ae60" : "#4a5568"
                                    }} />
                                    <span style={{ fontSize: "0.875rem", color: item.complete ? "#e2e8f0" : "#718096" }}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {profileCompletion < 100 && (
                            <button
                                onClick={() => navigate("/student/profile")}
                                style={{
                                    width: "100%",
                                    marginTop: "1.5rem",
                                    padding: "0.75rem",
                                    backgroundColor: "#3b6ef8",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    transition: "opacity 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                            >
                                Complete Your Profile →
                            </button>
                        )}
                    </div>

                    {/* Recent Applications */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                📤 Recent Applications
                            </h2>
                            <button
                                onClick={() => navigate("/student/applications")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#3b6ef8",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    transition: "color 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "#5a7cff"}
                                onMouseLeave={e => e.currentTarget.style.color = "#3b6ef8"}
                            >
                                View All →
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {recentApplications.length > 0 ? recentApplications.slice(0, 4).map(app => {
                                const statusStyle = getStatusColor(app.status);
                                return (
                                    <div
                                        key={app.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "1rem",
                                            backgroundColor: "#242938",
                                            borderRadius: "0.5rem",
                                            transition: "all 0.2s",
                                            cursor: "pointer"
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.backgroundColor = "#2d3448";
                                            e.currentTarget.style.borderLeft = "3px solid #3b6ef8";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.backgroundColor = "#242938";
                                            e.currentTarget.style.borderLeft = "none";
                                        }}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 500, color: "#e2e8f0", marginBottom: "0.25rem" }}>{app.companyName}</p>
                                            <p style={{ fontSize: "0.75rem", color: "#a0aec0" }}>{app.jobRole}</p>
                                        </div>
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.text,
                                            borderRadius: "9999px",
                                            fontSize: "0.75rem",
                                            fontWeight: 500
                                        }}>
                                            {app.status}
                                        </span>
                                    </div>
                                );
                            }) : (
                                <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
                                    No applications yet. Start applying!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Drives */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                🎯 Upcoming Drives
                            </h2>
                            <button
                                onClick={() => navigate("/student/companies")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#3b6ef8",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500,
                                    transition: "color 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "#5a7cff"}
                                onMouseLeave={e => e.currentTarget.style.color = "#3b6ef8"}
                            >
                                View All →
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {upcomingDrives.map(drive => {
                                const daysLeft = Math.ceil((new Date(drive.driveDate) - new Date()) / (1000 * 60 * 60 * 24));
                                return (
                                    <div
                                        key={drive.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "1rem",
                                            backgroundColor: "#242938",
                                            borderRadius: "0.5rem",
                                            transition: "all 0.2s",
                                            cursor: "pointer",
                                            borderLeft: daysLeft <= 2 ? "3px solid #e74c3c" : "none"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2d3448"}
                                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#242938"}
                                    >
                                        <div>
                                            <p style={{ fontWeight: 500, color: "#e2e8f0", marginBottom: "0.25rem" }}>{drive.companyName}</p>
                                            <p style={{ fontSize: "0.75rem", color: "#a0aec0" }}>{drive.jobRole} • {drive.location}</p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <p style={{ fontSize: "0.875rem", color: daysLeft <= 2 ? "#e74c3c" : "#fc8181", fontWeight: 500 }}>
                                                {new Date(drive.driveDate).toLocaleDateString()}
                                            </p>
                                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                                {daysLeft} days left
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
