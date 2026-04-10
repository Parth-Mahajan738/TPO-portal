import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const RecruiterDashboard = () => {
    const [recruiter, setRecruiter] = useState(null);
    const [stats, setStats] = useState({
        activeJobs: 0,
        totalApplications: 0,
        shortlistedCandidates: 0,
        offersExtended: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        // Get current recruiter
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setRecruiter(user);
            loadDashboardData(user.id || user.email);
        }
    }, []);

    const loadDashboardData = async (recruiterId) => {
        // Load only this recruiter's jobs from Backend
        let activeJobsCount = 0;
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                    headers: { "Authorization": `Token ${token}` }
                });
                if (res.ok) {
                    const recruiterJobs = await res.json();
                    activeJobsCount = recruiterJobs.length;
                }
            }
        } catch (e) {
            console.error("Failed to load recruiter jobs stats", e);
        }

        // Load only this recruiter's events
        const savedEvents = localStorage.getItem("recruiter_events");
        const allEvents = savedEvents ? JSON.parse(savedEvents) : [];
        const recruiterEvents = allEvents.filter(event => event.recruiterId === recruiterId);

        setStats({
            activeJobs: activeJobsCount,
            totalApplications: 0,
            shortlistedCandidates: 0,
            offersExtended: 0
        });

        setRecentApplications([]);
        setUpcomingEvents(recruiterEvents.slice(0, 3));
    };

    const getStatusColor = (status) => {
        const colors = {
            "Under Review": { bg: "#faf5ff", text: "#805ad5" },
            "Shortlisted": { bg: "#f0fff4", text: "#38a169" },
            "Interview Scheduled": { bg: "#e6fffa", text: "#319795" },
            "Offer Extended": { bg: "#c6f6d5", text: "#22543d" },
            "Rejected": { bg: "#fed7d7", text: "#c53030" }
        };
        return colors[status] || { bg: "#edf2f7", text: "#4a5568" };
    };

    const getEventTypeColor = (type) => {
        const colors = {
            talk: "#3b6ef8",
            test: "#e67e22",
            interview: "#27ae60"
        };
        return colors[type] || "#718096";
    };

    const quickActions = [
        { id: "post-job", label: "Post New Job", description: "Create a new job opening", path: "/recruiter/post-job", color: "#3b6ef8" },
        { id: "view-applicants", label: "Review Applicants", description: "Check recent applications", path: "/recruiter/applicants", color: "#27ae60" },
        { id: "schedule-event", label: "Schedule Event", description: "Organize talks, tests, or interviews", path: "/recruiter/events", color: "#e67e22" },
        { id: "manage-rounds", label: "Manage Rounds", description: "Configure placement rounds", path: "/recruiter/rounds", color: "#9f7aea" }
    ];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                {/* Welcome Section */}
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                        Recruiter Dashboard
                    </h1>
                    <p style={{ color: "#718096" }}>
                        Manage job postings, review applications, and schedule recruitment events.
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.5rem" }}>Active Jobs</p>
                            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#3b6ef8" }}>{stats.activeJobs}</p>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.5rem" }}>Total Applications</p>
                            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#e2e8f0" }}>{stats.totalApplications}</p>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.5rem" }}>Shortlisted</p>
                            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#27ae60" }}>{stats.shortlistedCandidates}</p>
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <div>
                            <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.5rem" }}>Offers Extended</p>
                            <p style={{ fontSize: "2rem", fontWeight: 700, color: "#9f7aea" }}>{stats.offersExtended}</p>
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
                            {quickActions.map(item => (
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
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = "#2d3448";
                                        e.currentTarget.style.backgroundColor = "#242938";
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

                    {/* Recent Applications */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                Recent Applications
                            </h2>
                            <button
                                onClick={() => navigate("/recruiter/applicants")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#e67e22",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
                                }}
                            >
                                View All →
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {recentApplications.map(app => {
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
                                            <p style={{ fontWeight: 500, color: "#e2e8f0", marginBottom: "0.25rem" }}>{app.studentName}</p>
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
                            })}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                Upcoming Events
                            </h2>
                            <button
                                onClick={() => navigate("/recruiter/events")}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#e67e22",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
                                }}
                            >
                                Manage →
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            {upcomingEvents.map(event => (
                                <div
                                    key={event.id}
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "#242938",
                                        borderRadius: "0.5rem",
                                        borderLeft: `4px solid ${getEventTypeColor(event.type)}`
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.5rem" }}>
                                        <p style={{ fontWeight: 500, color: "#e2e8f0" }}>{event.name}</p>
                                        <span style={{
                                            padding: "0.25rem 0.5rem",
                                            backgroundColor: getEventTypeColor(event.type),
                                            color: "white",
                                            borderRadius: "4px",
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase"
                                        }}>
                                            {event.type}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
                                        {event.date} at {event.time} • {event.location || event.platform}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RecruiterDashboard;
