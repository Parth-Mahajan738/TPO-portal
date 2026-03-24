import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../Components/layouts/StudentSidebar";
import { getStudentStorageKey } from "../../Utils/studentStorageKey";

const ApplicationTracker = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const studentKey = getStudentStorageKey(parsedUser);
            if (studentKey) {
                loadApplications(studentKey);
            }
        }
    }, []);

    const loadApplications = (studentKey) => {
        // Load from localStorage (in real app, fetch from backend)
        const savedApplications = localStorage.getItem(`applications_${studentKey}`);
        if (savedApplications) {
            const apps = JSON.parse(savedApplications);
            // Add some sample data for demonstration
            const sampleApps = [
                {
                    id: 1001,
                    companyId: 2,
                    companyName: "DataFlow Analytics",
                    jobRole: "Data Analyst",
                    appliedDate: "2026-03-15T10:30:00",
                    status: "Shortlisted",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-15T10:30:00", note: "Application submitted successfully" },
                        { status: "Under Review", date: "2026-03-18T14:20:00", note: "Resume being reviewed by HR team" },
                        { status: "Shortlisted", date: "2026-03-20T09:00:00", note: "Congratulations! You have been shortlisted for online assessment" }
                    ],
                    nextRound: "Online Assessment",
                    nextRoundDate: "2026-03-25T10:00:00",
                    location: "Bangalore, Mumbai",
                    ctc: "8-10 LPA"
                },
                {
                    id: 1002,
                    companyId: 1,
                    companyName: "Tech Solutions Inc.",
                    jobRole: "Software Development Engineer",
                    appliedDate: "2026-03-10T14:15:00",
                    status: "Rejected",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-10T14:15:00", note: "Application submitted successfully" },
                        { status: "Under Review", date: "2026-03-12T11:00:00", note: "Resume being reviewed" },
                        { status: "Rejected", date: "2026-03-16T16:30:00", note: "Profile does not match current requirements" }
                    ],
                    nextRound: null,
                    nextRoundDate: null,
                    location: "Bangalore, Hyderabad, Pune",
                    ctc: "12-15 LPA"
                },
                {
                    id: 1003,
                    companyId: 5,
                    companyName: "MobileFirst Apps",
                    jobRole: "Mobile Developer",
                    appliedDate: "2026-03-18T09:45:00",
                    status: "Applied",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-18T09:45:00", note: "Application submitted successfully" }
                    ],
                    nextRound: null,
                    nextRoundDate: null,
                    location: "Bangalore",
                    ctc: "9-12 LPA"
                }
            ];
            setApplications([...sampleApps, ...apps]);
            setFilteredApplications([...sampleApps, ...apps]);
        } else {
            // Set sample data if no applications yet
            const sampleApps = [
                {
                    id: 1001,
                    companyId: 2,
                    companyName: "DataFlow Analytics",
                    jobRole: "Data Analyst",
                    appliedDate: "2026-03-15T10:30:00",
                    status: "Shortlisted",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-15T10:30:00", note: "Application submitted successfully" },
                        { status: "Under Review", date: "2026-03-18T14:20:00", note: "Resume being reviewed by HR team" },
                        { status: "Shortlisted", date: "2026-03-20T09:00:00", note: "Congratulations! You have been shortlisted for online assessment" }
                    ],
                    nextRound: "Online Assessment",
                    nextRoundDate: "2026-03-25T10:00:00",
                    location: "Bangalore, Mumbai",
                    ctc: "8-10 LPA"
                },
                {
                    id: 1002,
                    companyId: 1,
                    companyName: "Tech Solutions Inc.",
                    jobRole: "Software Development Engineer",
                    appliedDate: "2026-03-10T14:15:00",
                    status: "Rejected",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-10T14:15:00", note: "Application submitted successfully" },
                        { status: "Under Review", date: "2026-03-12T11:00:00", note: "Resume being reviewed" },
                        { status: "Rejected", date: "2026-03-16T16:30:00", note: "Profile does not match current requirements" }
                    ],
                    nextRound: null,
                    nextRoundDate: null,
                    location: "Bangalore, Hyderabad, Pune",
                    ctc: "12-15 LPA"
                },
                {
                    id: 1003,
                    companyId: 5,
                    companyName: "MobileFirst Apps",
                    jobRole: "Mobile Developer",
                    appliedDate: "2026-03-18T09:45:00",
                    status: "Applied",
                    statusHistory: [
                        { status: "Applied", date: "2026-03-18T09:45:00", note: "Application submitted successfully" }
                    ],
                    nextRound: null,
                    nextRoundDate: null,
                    location: "Bangalore",
                    ctc: "9-12 LPA"
                }
            ];
            setApplications(sampleApps);
            setFilteredApplications(sampleApps);
        }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === "all") {
            setFilteredApplications(applications);
        } else {
            setFilteredApplications(applications.filter(app => app.status === status));
        }
    };



    const getStatusColor = (status) => {
        const colors = {
            "Applied": { bg: "#ebf8ff", text: "#2b6cb0", border: "#90cdf4" },
            "Under Review": { bg: "#fffaf0", text: "#c05621", border: "#fbd38d" },
            "Shortlisted": { bg: "#f0fff4", text: "#38a169", border: "#9ae6b4" },
            "Online Assessment": { bg: "#faf5ff", text: "#805ad5", border: "#d6bcfa" },
            "Technical Interview": { bg: "#e6fffa", text: "#319795", border: "#81e6d9" },
            "HR Interview": { bg: "#fff5f5", text: "#e53e3e", border: "#feb2b2" },
            "Offer Extended": { bg: "#f0fff4", text: "#22543d", border: "#68d391" },
            "Offer Accepted": { bg: "#c6f6d5", text: "#22543d", border: "#48bb78" },
            "Rejected": { bg: "#fed7d7", text: "#c53030", border: "#fc8181" }
        };
        return colors[status] || { bg: "#edf2f7", text: "#4a5568", border: "#cbd5e0" };
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusStats = () => {
        const stats = {
            total: applications.length,
            applied: applications.filter(a => a.status === "Applied").length,
            shortlisted: applications.filter(a => a.status === "Shortlisted" || a.status === "Online Assessment" || a.status === "Technical Interview" || a.status === "HR Interview").length,
            offers: applications.filter(a => a.status === "Offer Extended" || a.status === "Offer Accepted").length,
            rejected: applications.filter(a => a.status === "Rejected").length
        };
        return stats;
    };

    const stats = getStatusStats();

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                    My Applications
                </h1>

                {/* Stats Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.25rem" }}>Total Applications</p>
                        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0" }}>{stats.total}</p>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.25rem" }}>Applied</p>
                        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#3b6ef8" }}>{stats.applied}</p>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.25rem" }}>Shortlisted</p>
                        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#48bb78" }}>{stats.shortlisted}</p>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.25rem" }}>Offers</p>
                        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#9f7aea" }}>{stats.offers}</p>
                    </div>
                    <div style={{ backgroundColor: "#1a1f2e", padding: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2d3448" }}>
                        <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "0.25rem" }}>Rejected</p>
                        <p style={{ fontSize: "1.875rem", fontWeight: 700, color: "#fc8181" }}>{stats.rejected}</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    {["all", "Applied", "Shortlisted", "Online Assessment", "Technical Interview", "HR Interview", "Offer Extended", "Rejected"].map(status => (
                        <button
                            key={status}
                            onClick={() => handleFilterChange(status)}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: filterStatus === status ? "#3b6ef8" : "#1a1f2e",
                                color: filterStatus === status ? "white" : "#a0aec0",
                                border: "1px solid #2d3448",
                                borderRadius: "9999px",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                fontWeight: 500
                            }}
                        >
                            {status === "all" ? "All Applications" : status}
                        </button>
                    ))}
                </div>

                {/* Applications List */}
                <div style={{ display: "grid", gap: "1rem" }}>
                    {filteredApplications.map(app => {
                        const statusStyle = getStatusColor(app.status);
                        return (
                            <div
                                key={app.id}
                                style={{
                                    backgroundColor: "#1a1f2e",
                                    borderRadius: "0.75rem",
                                    padding: "1.5rem",
                                    border: "1px solid #2d3448",
                                    cursor: "pointer",
                                    transition: "box-shadow 0.2s",
                                    borderLeft: `4px solid ${statusStyle.border}`
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)"}
                                onClick={() => setSelectedApplication(app)}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{
                                            width: "50px",
                                            height: "50px",
                                            backgroundColor: "#3182ce",
                                            borderRadius: "0.5rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                            fontSize: "1.25rem",
                                            fontWeight: 700
                                        }}>
                                            {app.companyName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748" }}>{app.companyName}</h3>
                                            <p style={{ fontSize: "0.875rem", color: "#718096" }}>{app.jobRole}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <span style={{
                                            display: "inline-block",
                                            padding: "0.375rem 0.75rem",
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.text,
                                            borderRadius: "9999px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            marginBottom: "0.5rem"
                                        }}>
                                            {app.status}
                                        </span>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                            Applied: {formatDate(app.appliedDate)}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: "2rem", marginTop: "1rem", flexWrap: "wrap" }}>
                                    <div>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>Location</p>
                                        <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>{app.location}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>CTC</p>
                                        <p style={{ fontSize: "0.875rem", color: "#38a169", fontWeight: 500 }}>{app.ctc}</p>
                                    </div>
                                    {app.nextRound && (
                                        <div>
                                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>Next Round</p>
                                            <p style={{ fontSize: "0.875rem", color: "#805ad5", fontWeight: 500 }}>{app.nextRound}</p>
                                        </div>
                                    )}
                                    {app.nextRoundDate && (
                                        <div>
                                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>Scheduled</p>
                                            <p style={{ fontSize: "0.875rem", color: "#e53e3e", fontWeight: 500 }}>
                                                {formatDateTime(app.nextRoundDate)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredApplications.length === 0 && (
                    <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "white", borderRadius: "0.75rem" }}>
                        <p style={{ color: "#718096", marginBottom: "1rem" }}>No applications found in this category.</p>
                        <button
                            onClick={() => navigate("/student/companies")}
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.875rem"
                            }}
                        >
                            Browse Companies
                        </button>
                    </div>
                )}
            </main>

            {/* Application Details Modal */}
            {selectedApplication && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "1rem"
                    }}
                    onClick={() => setSelectedApplication(null)}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            borderRadius: "1rem",
                            maxWidth: "700px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflow: "auto",
                            padding: "2rem"
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <div>
                                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d3748" }}>{selectedApplication.companyName}</h2>
                                <p style={{ color: "#718096" }}>{selectedApplication.jobRole}</p>
                            </div>
                            <button
                                onClick={() => setSelectedApplication(null)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: "1.5rem",
                                    cursor: "pointer",
                                    color: "#718096"
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "1.5rem" }}>
                            {/* Current Status */}
                            <div style={{ backgroundColor: "#f7fafc", padding: "1.25rem", borderRadius: "0.75rem" }}>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                                    Current Status
                                </h3>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <span style={{
                                        display: "inline-block",
                                        padding: "0.5rem 1rem",
                                        backgroundColor: getStatusColor(selectedApplication.status).bg,
                                        color: getStatusColor(selectedApplication.status).text,
                                        borderRadius: "9999px",
                                        fontSize: "0.875rem",
                                        fontWeight: 600
                                    }}>
                                        {selectedApplication.status}
                                    </span>
                                    <span style={{ color: "#718096", fontSize: "0.875rem" }}>
                                        Last updated: {formatDateTime(selectedApplication.statusHistory[selectedApplication.statusHistory.length - 1].date)}
                                    </span>
                                </div>
                            </div>

                            {/* Status Timeline */}
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                                    Application Timeline
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                                    {selectedApplication.statusHistory.map((history, index) => (
                                        <div key={index} style={{ display: "flex", gap: "1rem" }}>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <div style={{
                                                    width: "12px",
                                                    height: "12px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#3182ce"
                                                }} />
                                                {index < selectedApplication.statusHistory.length - 1 && (
                                                    <div style={{ width: "2px", flex: 1, backgroundColor: "#e2e8f0", margin: "4px 0" }} />
                                                )}
                                            </div>
                                            <div style={{ paddingBottom: "1.5rem", flex: 1 }}>
                                                <p style={{ fontWeight: 600, color: "#2d3748" }}>{history.status}</p>
                                                <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>
                                                    {formatDateTime(history.date)}
                                                </p>
                                                <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>{history.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next Steps */}
                            {selectedApplication.nextRound && (
                                <div style={{ backgroundColor: "#ebf8ff", padding: "1.25rem", borderRadius: "0.75rem" }}>
                                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2c5282", marginBottom: "0.5rem" }}>
                                        Next Step
                                    </h3>
                                    <p style={{ color: "#2b6cb0", fontWeight: 500, marginBottom: "0.25rem" }}>
                                        {selectedApplication.nextRound}
                                    </p>
                                    {selectedApplication.nextRoundDate && (
                                        <p style={{ color: "#2b6cb0", fontSize: "0.875rem" }}>
                                            Scheduled for: {formatDateTime(selectedApplication.nextRoundDate)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Application Details */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
                                <div>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>Applied On</p>
                                    <p style={{ fontWeight: 500, color: "#2d3748" }}>{formatDate(selectedApplication.appliedDate)}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>Location</p>
                                    <p style={{ fontWeight: 500, color: "#2d3748" }}>{selectedApplication.location}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>CTC</p>
                                    <p style={{ fontWeight: 500, color: "#38a169" }}>{selectedApplication.ctc}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setSelectedApplication(null)}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#3182ce",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationTracker;
