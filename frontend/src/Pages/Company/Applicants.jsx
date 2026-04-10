import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const Applicants = () => {
    const [recruiter, setRecruiter] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    
    // Detailed applicant view modal
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        // Get current recruiter
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setRecruiter(user);
            loadJobs();
            loadApplicants();
        }
    }, []);

    const loadJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                setJobs(await res.json());
            }
        } catch (err) {
            console.error("Failed to load jobs", err);
        }
    };

    const loadApplicants = () => {
        // Load applicants from localStorage (in real app, fetch from backend)
        const savedApplicants = localStorage.getItem("applicants");
        const applicantsList = savedApplicants ? JSON.parse(savedApplicants) : [];
        setApplicants(applicantsList);
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

    // When a job is selected, show only applicants for that job role
    const filteredApplicants = selectedJob 
        ? applicants.filter(app => app.jobRole === selectedJob.job_title)
        : [];

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                {!selectedJob ? (
                    <div>
                        <div style={{ marginBottom: "2rem" }}>
                            <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                                Listed Jobs
                            </h1>
                            <p style={{ color: "#718096" }}>Select a job to view its applicants.</p>
                        </div>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem" }}>
                            {jobs.map(job => {
                                const jobApplicantsCount = applicants.filter(a => a.jobRole === job.job_title).length;
                                return (
                                    <div
                                        key={job.id}
                                        onClick={() => setSelectedJob(job)}
                                        style={{
                                            backgroundColor: "#1a1f2e",
                                            borderRadius: "0.75rem",
                                            padding: "1.5rem",
                                            border: "1px solid #2d3448",
                                            cursor: "pointer",
                                            transition: "transform 0.2s, box-shadow 0.2s"
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = "translateY(-4px)";
                                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <h3 style={{ color: "#e2e8f0", fontSize: "1.25rem", marginBottom: "0.5rem" }}>{job.job_title}</h3>
                                        <p style={{ color: "#a0aec0", fontSize: "0.875rem", marginBottom: "1rem" }}>{job.company_name} • {job.location}</p>
                                        
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ color: "#48bb78", fontWeight: 600, fontSize: "0.875rem" }}>{job.salary} LPA</span>
                                            <span style={{ 
                                                backgroundColor: "#2d3448", 
                                                padding: "0.25rem 0.75rem", 
                                                borderRadius: "9999px", 
                                                color: "#e2e8f0", 
                                                fontSize: "0.75rem",
                                                fontWeight: 600 
                                            }}>
                                                {jobApplicantsCount} Applicants
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            {jobs.length === 0 && (
                                <div style={{ color: "#718096", gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
                                    No jobs listed yet. Create a job posting to see it here.
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                            <button
                                onClick={() => setSelectedJob(null)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#2d3448",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
                                }}
                            >
                                ← Back to Jobs
                            </button>
                            <div>
                                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0" }}>
                                    Applicants for {selectedJob.job_title}
                                </h1>
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
                                                                backgroundColor: "#3b6ef8",
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
                                                            View Profile
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
                                <p>No applicants for this job yet.</p>
                            </div>
                        )}
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
