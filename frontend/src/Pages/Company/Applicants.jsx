import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const Applicants = () => {
    const [recruiter, setRecruiter] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [filters, setFilters] = useState({
        status: "all",
        jobRole: "all",
        searchQuery: ""
    });
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        // Get current recruiter
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setRecruiter(user);
            loadApplicants();
        }
    }, []);

    const loadApplicants = () => {
        // Sample applicants data
        const sampleApplicants = [
            {
                id: 1,
                name: "Rajesh Kumar",
                email: "rajesh@example.com",
                phone: "+91-9876543210",
                jobRole: "Software Engineer",
                status: "Shortlisted",
                appliedDate: "2026-03-18",
                cgpa: 3.8,
                skills: ["Java", "Spring Boot", "SQL", "AWS"],
                experience: "2 years",
                resumeUrl: "#"
            },
            {
                id: 2,
                name: "Priya Sharma",
                email: "priya@example.com",
                phone: "+91-9876543211",
                jobRole: "Data Analyst",
                status: "Under Review",
                appliedDate: "2026-03-17",
                cgpa: 3.9,
                skills: ["Python", "SQL", "Tableau", "Excel"],
                experience: "1 year",
                resumeUrl: "#"
            },
            {
                id: 3,
                name: "Amit Patel",
                email: "amit@example.com",
                phone: "+91-9876543212",
                jobRole: "Frontend Developer",
                status: "Interview Scheduled",
                appliedDate: "2026-03-16",
                cgpa: 3.7,
                skills: ["React", "JavaScript", "CSS", "TypeScript"],
                experience: "1.5 years",
                resumeUrl: "#"
            },
            {
                id: 4,
                name: "Neha Singh",
                email: "neha@example.com",
                phone: "+91-9876543213",
                jobRole: "Software Engineer",
                status: "Applied",
                appliedDate: "2026-03-15",
                cgpa: 3.6,
                skills: ["Python", "JavaScript", "Django", "React"],
                experience: "0.5 years",
                resumeUrl: "#"
            },
            {
                id: 5,
                name: "Vikram Reddy",
                email: "vikram@example.com",
                phone: "+91-9876543214",
                jobRole: "Data Analyst",
                status: "Rejected",
                appliedDate: "2026-03-14",
                cgpa: 3.2,
                skills: ["Excel", "Python", "Power BI"],
                experience: "0 years",
                resumeUrl: "#"
            }
        ];

        setApplicants(sampleApplicants);
    };

    const getStatusColor = (status) => {
        const colors = {
            "Applied": { bg: "#ebf8ff", text: "#2b6cb0" },
            "Under Review": { bg: "#faf5ff", text: "#805ad5" },
            "Shortlisted": { bg: "#f0fff4", text: "#38a169" },
            "Interview Scheduled": { bg: "#e6fffa", text: "#319795" },
            "Offer Extended": { bg: "#c6f6d5", text: "#22543d" },
            "Rejected": { bg: "#fed7d7", text: "#c53030" }
        };
        return colors[status] || { bg: "#edf2f7", text: "#4a5568" };
    };

    const handleStatusChange = (applicantId, newStatus) => {
        setApplicants(applicants.map(app =>
            app.id === applicantId ? { ...app, status: newStatus } : app
        ));
        setShowDetailModal(false);
    };

    const filteredApplicants = applicants.filter(app => {
        const matchStatus = filters.status === "all" || app.status === filters.status;
        const matchRole = filters.jobRole === "all" || app.jobRole === filters.jobRole;
        const matchSearch = app.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(filters.searchQuery.toLowerCase());
        return matchStatus && matchRole && matchSearch;
    });

    const uniqueRoles = [...new Set(applicants.map(a => a.jobRole))];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                        Applicants
                    </h1>
                    <p style={{ color: "#718096" }}>Review and manage applications from candidates.</p>
                </div>

                {/* Filters */}
                <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "1.5rem", border: "1px solid #2d3448", marginBottom: "2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={filters.searchQuery}
                                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    backgroundColor: "#242938",
                                    border: "1px solid #2d3448",
                                    borderRadius: "0.5rem",
                                    color: "#e2e8f0",
                                    fontSize: "0.95rem"
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>
                                Job Role
                            </label>
                            <select
                                value={filters.jobRole}
                                onChange={(e) => setFilters({ ...filters, jobRole: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    backgroundColor: "#242938",
                                    border: "1px solid #2d3448",
                                    borderRadius: "0.5rem",
                                    color: "#e2e8f0",
                                    fontSize: "0.95rem"
                                }}
                            >
                                <option value="all">All Roles</option>
                                {uniqueRoles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    backgroundColor: "#242938",
                                    border: "1px solid #2d3448",
                                    borderRadius: "0.5rem",
                                    color: "#e2e8f0",
                                    fontSize: "0.95rem"
                                }}
                            >
                                <option value="all">All Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Offer Extended">Offer Extended</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applicants Table */}
                <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", border: "1px solid #2d3448", overflow: "hidden" }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid #2d3448" }}>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Name</th>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Email</th>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Job Role</th>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>CGPA</th>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Status</th>
                                    <th style={{ padding: "1rem", textAlign: "left", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Applied</th>
                                    <th style={{ padding: "1rem", textAlign: "center", color: "#a0aec0", fontWeight: 600, fontSize: "0.875rem" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplicants.map(applicant => {
                                    const statusColor = getStatusColor(applicant.status);
                                    return (
                                        <tr key={applicant.id} style={{ borderBottom: "1px solid #2d3448", backgroundColor: "#1a1f2e" }}>
                                            <td style={{ padding: "1rem", color: "#e2e8f0", fontWeight: 500 }}>{applicant.name}</td>
                                            <td style={{ padding: "1rem", color: "#a0aec0", fontSize: "0.875rem" }}>{applicant.email}</td>
                                            <td style={{ padding: "1rem", color: "#a0aec0", fontSize: "0.875rem" }}>{applicant.jobRole}</td>
                                            <td style={{ padding: "1rem", color: "#e2e8f0" }}>{applicant.cgpa}</td>
                                            <td style={{ padding: "1rem" }}>
                                                <span style={{
                                                    padding: "0.25rem 0.75rem",
                                                    backgroundColor: statusColor.bg,
                                                    color: statusColor.text,
                                                    borderRadius: "9999px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600
                                                }}>
                                                    {applicant.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: "1rem", color: "#a0aec0", fontSize: "0.875rem" }}>{applicant.appliedDate}</td>
                                            <td style={{ padding: "1rem", textAlign: "center" }}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedApplicant(applicant);
                                                        setShowDetailModal(true);
                                                    }}
                                                    style={{
                                                        padding: "0.5rem 1rem",
                                                        backgroundColor: "#e67e22",
                                                        color: "white",
                                                        border: "none",
                                                        borderRadius: "0.375rem",
                                                        cursor: "pointer",
                                                        fontSize: "0.875rem",
                                                        fontWeight: 500,
                                                        transition: "opacity 0.2s"
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredApplicants.length === 0 && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
                        <p>No applicants found matching your filters.</p>
                    </div>
                )}

                {/* Detail Modal */}
                {showDetailModal && selectedApplicant && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: "#1a1f2e",
                            borderRadius: "0.75rem",
                            border: "1px solid #2d3448",
                            padding: "2rem",
                            maxWidth: "600px",
                            width: "90%",
                            maxHeight: "80vh",
                            overflowY: "auto"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0" }}>
                                    {selectedApplicant.name}
                                </h2>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#a0aec0",
                                        fontSize: "1.5rem",
                                        cursor: "pointer"
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Email:</strong> {selectedApplicant.email}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Phone:</strong> {selectedApplicant.phone}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Job Role:</strong> {selectedApplicant.jobRole}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>CGPA:</strong> {selectedApplicant.cgpa}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Experience:</strong> {selectedApplicant.experience}
                                </p>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.75rem" }}>Skills</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {selectedApplicant.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: "0.25rem 0.75rem",
                                                backgroundColor: "#242938",
                                                color: "#a0aec0",
                                                borderRadius: "9999px",
                                                fontSize: "0.75rem"
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <button
                                    onClick={() => window.open(selectedApplicant.resumeUrl)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        backgroundColor: "#3b6ef8",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "0.95rem",
                                        fontWeight: 500,
                                        marginBottom: "1rem",
                                        transition: "opacity 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    Download Resume
                                </button>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 600 }}>
                                    Update Status
                                </label>
                                <select
                                    value={selectedApplicant.status}
                                    onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        backgroundColor: "#242938",
                                        border: "1px solid #2d3448",
                                        borderRadius: "0.5rem",
                                        color: "#e2e8f0",
                                        fontSize: "0.95rem"
                                    }}
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Offer Extended">Offer Extended</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setShowDetailModal(false)}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    backgroundColor: "#2d3448",
                                    color: "#e2e8f0",
                                    border: "1px solid #2d3448",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.95rem",
                                    fontWeight: 500,
                                    transition: "background-color 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a4456"}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2d3448"}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Applicants;
