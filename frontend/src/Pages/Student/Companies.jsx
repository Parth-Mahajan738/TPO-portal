import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../Components/layouts/StudentSidebar";

const Companies = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        jobType: "all",
        ctcRange: "all",
        eligibleOnly: false
    });
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                headers: { "Authorization": `Token ${token}` }
            });

            if (res.ok) {
                const jobs = await res.json();
                
                // Track applied jobs to filter them out
                let appliedIds = [];
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const u = JSON.parse(storedUser);
                    // Same logic as getStudentStorageKey
                    const studentKey = u.prn || u.urn || u.email;
                    if (studentKey) {
                        const apps = JSON.parse(localStorage.getItem(`applications_${studentKey}`) || "[]");
                        appliedIds = apps.map(app => app.companyId);
                    }
                }

                const companyList = jobs
                    .filter(job => !appliedIds.includes(job.id))
                    .map(job => ({
                    id: job.id,
                    name: job.company_name,
                    logo: job.company_name ? job.company_name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() : "??",
                    industry: job.job_type || "General",
                    description: job.job_description || "No description provided.",
                    website: "#",
                    location: job.location || "Not specified",
                    jobRole: job.job_title || "Not specified",
                    jobType: job.job_type || "Full-time",
                    ctc: job.salary ? `${job.salary} LPA` : "Not disclosed",
                    baseSalary: job.salary ? `${job.salary} LPA` : "Not disclosed",
                    bond: "N/A",
                    eligibility: {
                        cgpa: 0,
                        tenth: 0,
                        twelfth: 0,
                        backlog: 0
                    },
                    skills: job.qualifications ? job.qualifications.split(",").map(s => s.trim()).filter(Boolean) : [],
                    deadline: job.application_deadline || "",
                    driveDate: job.application_deadline || "",
                    rounds: [],
                    applied: false
                }));
                setCompanies(companyList);
                setFilteredCompanies(companyList);
            }
        } catch (err) {
            console.error("Failed to load companies/jobs", err);
        }
    };

    useEffect(() => {
        let filtered = companies;

        if (searchTerm) {
            filtered = filtered.filter(company =>
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (filters.jobType !== "all") {
            filtered = filtered.filter(company => company.jobType === filters.jobType);
        }

        if (filters.ctcRange !== "all") {
            const [min, max] = filters.ctcRange.split("-").map(v => parseInt(v));
            filtered = filtered.filter(company => {
                const ctcValue = parseInt(company.ctc.split("-")[0]);
                return ctcValue >= min && (max ? ctcValue <= max : true);
            });
        }

        setFilteredCompanies(filtered);
    }, [searchTerm, filters, companies]);

    const handleApply = (companyId) => {
        navigate(`/student/apply/${companyId}`);
    };

    const isEligible = (company) => {
        // In a real app, compare with student's actual profile data
        return true; // Simplified for demo
    };

    // Dark theme styles
    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #2d3448",
        backgroundColor: "#242938",
        color: "#e2e8f0",
        fontSize: "0.9rem",
        outline: "none",
        boxSizing: "border-box"
    };

    const cardStyle = {
        backgroundColor: "#1a1f2e",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid #2d3448"
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                    Available Companies
                </h1>

                {/* Search and Filters */}
                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    marginBottom: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Search companies, roles, skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <select
                                value={filters.jobType}
                                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="all">All Job Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Internship + PPO">Internship + PPO</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filters.ctcRange}
                                onChange={(e) => setFilters({ ...filters, ctcRange: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="all">All CTC Ranges</option>
                                <option value="0-8">Below 8 LPA</option>
                                <option value="8-12">8 - 12 LPA</option>
                                <option value="12-16">12 - 16 LPA</option>
                                <option value="16-100">16+ LPA</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Companies Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem" }}>
                    {filteredCompanies.map(company => (
                        <div
                            key={company.id}
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
                            onClick={() => setSelectedCompany(company)}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    backgroundColor: "#3b6ef8",
                                    borderRadius: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "1.5rem",
                                    fontWeight: 700
                                }}>
                                    {company.logo}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.25rem" }}>
                                        {company.name}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>{company.industry}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: "1rem" }}>
                                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#e2e8f0", marginBottom: "0.25rem" }}>
                                    {company.jobRole}
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "#718096" }}>{company.location}</p>
                            </div>

                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                                {company.skills.slice(0, 4).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        style={{
                                            padding: "0.25rem 0.5rem",
                                            backgroundColor: "#242938",
                                            color: "#a0aec0",
                                            borderRadius: "0.25rem",
                                            fontSize: "0.75rem"
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {company.skills.length > 4 && (
                                    <span style={{ fontSize: "0.75rem", color: "#718096" }}>
                                        +{company.skills.length - 4} more
                                    </span>
                                )}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <div>
                                    <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#48bb78" }}>{company.ctc}</p>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>CTC per annum</p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: "0.875rem", color: "#fc8181", fontWeight: 500 }}>
                                        Deadline: {new Date(company.deadline).toLocaleDateString()}
                                    </p>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                        Drive: {new Date(company.driveDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleApply(company.id);
                                }}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    backgroundColor: isEligible(company) ? "#3b6ef8" : "#4a5568",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: isEligible(company) ? "pointer" : "not-allowed",
                                    fontSize: "0.875rem",
                                    fontWeight: 600
                                }}
                                disabled={!isEligible(company)}
                            >
                                {isEligible(company) ? "Apply Now" : "Not Eligible"}
                            </button>
                        </div>
                    ))}
                </div>

                {filteredCompanies.length === 0 && (
                    <div style={{ textAlign: "center", padding: "3rem" }}>
                        <p style={{ color: "#718096", fontSize: "1rem" }}>No companies found matching your criteria.</p>
                    </div>
                )}
            </main>

            {/* Company Details Modal */}
            {selectedCompany && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "1rem"
                    }}
                    onClick={() => setSelectedCompany(null)}
                >
                    <div
                        style={{
                            backgroundColor: "#1a1f2e",
                            borderRadius: "1rem",
                            maxWidth: "700px",
                            width: "100%",
                            maxHeight: "90vh",
                            overflow: "auto",
                            padding: "2rem",
                            border: "1px solid #2d3448"
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{
                                    width: "70px",
                                    height: "70px",
                                    backgroundColor: "#3b6ef8",
                                    borderRadius: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "1.75rem",
                                    fontWeight: 700
                                }}>
                                    {selectedCompany.logo}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0" }}>{selectedCompany.name}</h2>
                                    <p style={{ color: "#a0aec0" }}>{selectedCompany.industry}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCompany(null)}
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
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>About</h3>
                                <p style={{ color: "#a0aec0", fontSize: "0.875rem", lineHeight: 1.6 }}>{selectedCompany.description}</p>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                                <div style={{ backgroundColor: "#242938", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Job Role</p>
                                    <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.jobRole}</p>
                                </div>
                                <div style={{ backgroundColor: "#242938", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Job Type</p>
                                    <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.jobType}</p>
                                </div>
                                <div style={{ backgroundColor: "#242938", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>CTC</p>
                                    <p style={{ fontWeight: 600, color: "#48bb78" }}>{selectedCompany.ctc}</p>
                                </div>
                                <div style={{ backgroundColor: "#242938", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Base Salary</p>
                                    <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.baseSalary}</p>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>Eligibility Criteria</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" }}>
                                    <div style={{ backgroundColor: "#242938", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>CGPA</p>
                                        <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.eligibility.cgpa}+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#242938", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>10th %</p>
                                        <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.eligibility.tenth}%+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#242938", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>12th %</p>
                                        <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.eligibility.twelfth}%+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#242938", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#718096" }}>Backlogs</p>
                                        <p style={{ fontWeight: 600, color: "#e2e8f0" }}>{selectedCompany.eligibility.backlog}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>Required Skills</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {selectedCompany.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: "0.375rem 0.75rem",
                                                backgroundColor: "#242938",
                                                color: "#a0aec0",
                                                borderRadius: "9999px",
                                                fontSize: "0.875rem"
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>Selection Process</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {selectedCompany.rounds.map((round, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                                padding: "0.75rem",
                                                backgroundColor: "#242938",
                                                borderRadius: "0.5rem"
                                            }}
                                        >
                                            <span style={{
                                                width: "24px",
                                                height: "24px",
                                                backgroundColor: "#3b6ef8",
                                                color: "white",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "0.75rem",
                                                fontWeight: 600
                                            }}>
                                                {idx + 1}
                                            </span>
                                            <span style={{ color: "#a0aec0" }}>{round}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                <button
                                    onClick={() => handleApply(selectedCompany.id)}
                                    style={{
                                        flex: 1,
                                        padding: "0.875rem",
                                        backgroundColor: isEligible(selectedCompany) ? "#3b6ef8" : "#4a5568",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: isEligible(selectedCompany) ? "pointer" : "not-allowed",
                                        fontSize: "1rem",
                                        fontWeight: 600
                                    }}
                                    disabled={!isEligible(selectedCompany)}
                                >
                                    {isEligible(selectedCompany) ? "Apply Now" : "Not Eligible"}
                                </button>
                                <button
                                    onClick={() => setSelectedCompany(null)}
                                    style={{
                                        padding: "0.875rem 1.5rem",
                                        backgroundColor: "#242938",
                                        color: "#a0aec0",
                                        border: "1px solid #2d3448",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        fontWeight: 500
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Companies;
