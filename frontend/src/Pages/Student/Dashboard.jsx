// This acts as the main landing page for students after login.
// It will eventually show key metrics like upcoming drives, application status, etc.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentSidebar from "../../Components/layouts/StudentSidebar";

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

    // useEffect runs once when the component first renders (mounts).
    // We read the profile from localStorage — it was saved there right after login.
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            loadDashboardData(parsedUser.id);
        }
    }, []); // Empty array [] means: run this only once, on first render

    const loadDashboardData = (userId) => {
        // Load applications
        const savedApplications = localStorage.getItem(`applications_${userId}`);
        const applications = savedApplications ? JSON.parse(savedApplications) : [];

        // Sample data for demonstration
        const sampleApps = [
            { id: 1001, companyName: "DataFlow Analytics", jobRole: "Data Analyst", status: "Shortlisted", appliedDate: "2026-03-15" },
            { id: 1002, companyName: "Tech Solutions Inc.", jobRole: "Software Development Engineer", status: "Rejected", appliedDate: "2026-03-10" },
            { id: 1003, companyName: "MobileFirst Apps", jobRole: "Mobile Developer", status: "Applied", appliedDate: "2026-03-18" }
        ];
        const allApps = [...sampleApps, ...applications];

        setStats({
            totalApplications: allApps.length,
            shortlisted: allApps.filter(a => ["Shortlisted", "Online Assessment", "Technical Interview", "HR Interview"].includes(a.status)).length,
            offers: allApps.filter(a => ["Offer Extended", "Offer Accepted"].includes(a.status)).length,
            pending: allApps.filter(a => a.status === "Applied").length
        });

        setRecentApplications(allApps.slice(0, 5));

        // Sample upcoming drives
        setUpcomingDrives([
            { id: 1, companyName: "CloudNine Systems", driveDate: "2026-03-25", jobRole: "DevOps Engineer", location: "Hyderabad" },
            { id: 2, companyName: "FinTech Innovations", driveDate: "2026-03-28", jobRole: "Software Engineer", location: "Mumbai" },
            { id: 3, companyName: "Tech Solutions Inc.", driveDate: "2026-04-02", jobRole: "SDE Intern", location: "Bangalore" }
        ]);

        // Calculate profile completion
        const savedProfile = localStorage.getItem(`profile_${userId}`);
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
        { id: "profile", label: "My Profile", icon: "👤", description: "Manage your personal info, education, and documents", path: "/student/profile", color: "#3182ce" },
        { id: "companies", label: "Browse Companies", icon: "🏢", description: "View and apply to companies visiting campus", path: "/student/companies", color: "#38a169" },
        { id: "applications", label: "My Applications", icon: "📋", description: "Track status of your job applications", path: "/student/applications", color: "#805ad5" }
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                {/* Welcome Section */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                        Student Dashboard
                    </h1>
                    <p style={{ color: "#718096" }}>
                        Track your placement journey, apply to companies, and manage your profile.
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontSize: "2rem" }}>📝</div>
                            <div>
                                <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Total Applications</p>
                                <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0" }}>{stats.totalApplications}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontSize: "2rem" }}>⭐</div>
                            <div>
                                <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Shortlisted</p>
                                <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#48bb78" }}>{stats.shortlisted}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontSize: "2rem" }}>🎉</div>
                            <div>
                                <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Offers Received</p>
                                <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#9f7aea" }}>{stats.offers}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ fontSize: "2rem" }}>⏳</div>
                            <div>
                                <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Pending Review</p>
                                <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#ed8936" }}>{stats.pending}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
                    {/* Quick Actions */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                            Quick Actions
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
                                        e.currentTarget.style.borderColor = "#3b6ef8";
                                        e.currentTarget.style.backgroundColor = "#2d3448";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "#2d3448";
                                        e.currentTarget.style.backgroundColor = "#242938";
                                    }}
                                >
                                    <div style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundColor: item.color,
                                        borderRadius: "0.75rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.5rem"
                                    }}>
                                        {item.icon}
                                    </div>
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
                            Profile Completion
                        </h2>
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Completion</span>
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
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: item.complete ? "#48bb78" : "#2d3448",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.75rem"
                                    }}>
                                        {item.complete ? "✓" : ""}
                                    </span>
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
                                Complete Your Profile
                            </button>
                        )}
                    </div>

                    {/* Recent Applications */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                Recent Applications
                            </h2>
                            <button
                                onClick={() => navigate("/student/applications")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#3b6ef8",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
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
                                            borderRadius: "0.5rem"
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
                                Upcoming Drives
                            </h2>
                            <button
                                onClick={() => navigate("/student/companies")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#3b6ef8",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                View All →
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {upcomingDrives.map(drive => (
                                <div
                                    key={drive.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "1rem",
                                        backgroundColor: "#242938",
                                        borderRadius: "0.5rem"
                                    }}
                                >
                                    <div>
                                        <p style={{ fontWeight: 500, color: "#e2e8f0", marginBottom: "0.25rem" }}>{drive.companyName}</p>
                                        <p style={{ fontSize: "0.75rem", color: "#a0aec0" }}>{drive.jobRole} • {drive.location}</p>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <p style={{ fontSize: "0.875rem", color: "#fc8181", fontWeight: 500 }}>
                                            {new Date(drive.driveDate).toLocaleDateString()}
                                        </p>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                            {Math.ceil((new Date(drive.driveDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
