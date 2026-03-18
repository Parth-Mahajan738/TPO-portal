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

    const loadCompanies = () => {
        // Sample data - in real app, fetch from backend
        const sampleCompanies = [
            {
                id: 1,
                name: "Tech Solutions Inc.",
                logo: "TS",
                industry: "Information Technology",
                description: "Leading software development company specializing in enterprise solutions and cloud services.",
                website: "https://techsolutions.com",
                location: "Bangalore, Hyderabad, Pune",
                jobRole: "Software Development Engineer",
                jobType: "Full-time",
                ctc: "12-15 LPA",
                baseSalary: "10 LPA",
                bond: "1 year",
                eligibility: {
                    cgpa: 7.5,
                    tenth: 75,
                    twelfth: 75,
                    backlog: 0
                },
                skills: ["Java", "Python", "React", "Node.js", "SQL"],
                deadline: "2026-04-15",
                driveDate: "2026-04-25",
                rounds: ["Online Assessment", "Technical Interview", "HR Interview"],
                applied: false
            },
            {
                id: 2,
                name: "DataFlow Analytics",
                logo: "DF",
                industry: "Data Science & Analytics",
                description: "Data-driven company providing AI and machine learning solutions to global clients.",
                website: "https://dataflow.io",
                location: "Bangalore, Mumbai",
                jobRole: "Data Analyst",
                jobType: "Full-time",
                ctc: "8-10 LPA",
                baseSalary: "7 LPA",
                bond: "None",
                eligibility: {
                    cgpa: 7.0,
                    tenth: 70,
                    twelfth: 70,
                    backlog: 0
                },
                skills: ["Python", "R", "SQL", "Tableau", "Machine Learning"],
                deadline: "2026-04-10",
                driveDate: "2026-04-20",
                rounds: ["Aptitude Test", "Coding Round", "Technical Interview", "HR Round"],
                applied: false
            },
            {
                id: 3,
                name: "CloudNine Systems",
                logo: "CN",
                industry: "Cloud Computing",
                description: "Cloud infrastructure and DevOps solutions provider for startups and enterprises.",
                website: "https://cloudnine.tech",
                location: "Hyderabad, Chennai",
                jobRole: "DevOps Engineer",
                jobType: "Full-time",
                ctc: "10-14 LPA",
                baseSalary: "9 LPA",
                bond: "6 months",
                eligibility: {
                    cgpa: 7.0,
                    tenth: 70,
                    twelfth: 70,
                    backlog: 0
                },
                skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
                deadline: "2026-04-20",
                driveDate: "2026-04-30",
                rounds: ["Technical Assessment", "System Design", "Technical Interview", "HR Interview"],
                applied: false
            },
            {
                id: 4,
                name: "FinTech Innovations",
                logo: "FT",
                industry: "Financial Technology",
                description: "Revolutionizing banking and financial services through cutting-edge technology.",
                website: "https://fintechinnovations.com",
                location: "Mumbai, Pune",
                jobRole: "Software Engineer",
                jobType: "Full-time",
                ctc: "15-18 LPA",
                baseSalary: "12 LPA",
                bond: "2 years",
                eligibility: {
                    cgpa: 8.0,
                    tenth: 80,
                    twelfth: 80,
                    backlog: 0
                },
                skills: ["Java", "Spring Boot", "Microservices", "Kafka", "PostgreSQL"],
                deadline: "2026-04-05",
                driveDate: "2026-04-18",
                rounds: ["Online Test", "Technical Interview 1", "Technical Interview 2", "HR Interview"],
                applied: false
            },
            {
                id: 5,
                name: "MobileFirst Apps",
                logo: "MF",
                industry: "Mobile Development",
                description: "Award-winning mobile app development company creating innovative iOS and Android applications.",
                website: "https://mobilefirst.io",
                location: "Bangalore",
                jobRole: "Mobile Developer",
                jobType: "Full-time",
                ctc: "9-12 LPA",
                baseSalary: "8 LPA",
                bond: "1 year",
                eligibility: {
                    cgpa: 7.0,
                    tenth: 70,
                    twelfth: 70,
                    backlog: 0
                },
                skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
                deadline: "2026-04-12",
                driveDate: "2026-04-22",
                rounds: ["Coding Test", "App Development Task", "Technical Interview", "HR Interview"],
                applied: false
            }
        ];
        setCompanies(sampleCompanies);
        setFilteredCompanies(sampleCompanies);
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
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    marginBottom: "1.5rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Search companies, roles, skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                        </div>
                        <div>
                            <select
                                value={filters.jobType}
                                onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
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
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
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
                                backgroundColor: "white",
                                borderRadius: "0.75rem",
                                padding: "1.5rem",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.2s"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                            }}
                            onClick={() => setSelectedCompany(company)}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    backgroundColor: "#3182ce",
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
                                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.25rem" }}>
                                        {company.name}
                                    </h3>
                                    <p style={{ fontSize: "0.875rem", color: "#718096" }}>{company.industry}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: "1rem" }}>
                                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#2d3748", marginBottom: "0.25rem" }}>
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
                                            backgroundColor: "#ebf8ff",
                                            color: "#2b6cb0",
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
                                    <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#38a169" }}>{company.ctc}</p>
                                    <p style={{ fontSize: "0.75rem", color: "#718096" }}>CTC per annum</p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <p style={{ fontSize: "0.875rem", color: "#e53e3e", fontWeight: 500 }}>
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
                                    backgroundColor: isEligible(company) ? "#3182ce" : "#a0aec0",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.5rem",
                                    cursor: isEligible(company) ? "pointer" : "not-allowed",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
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
                        backgroundColor: "rgba(0,0,0,0.5)",
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
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{
                                    width: "70px",
                                    height: "70px",
                                    backgroundColor: "#3182ce",
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
                                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d3748" }}>{selectedCompany.name}</h2>
                                    <p style={{ color: "#718096" }}>{selectedCompany.industry}</p>
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
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>About</h3>
                                <p style={{ color: "#4a5568", fontSize: "0.875rem", lineHeight: 1.6 }}>{selectedCompany.description}</p>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Job Role</p>
                                    <p style={{ fontWeight: 600, color: "#2d3748" }}>{selectedCompany.jobRole}</p>
                                </div>
                                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Job Type</p>
                                    <p style={{ fontWeight: 600, color: "#2d3748" }}>{selectedCompany.jobType}</p>
                                </div>
                                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>CTC</p>
                                    <p style={{ fontWeight: 600, color: "#38a169" }}>{selectedCompany.ctc}</p>
                                </div>
                                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.5rem" }}>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginBottom: "0.25rem" }}>Base Salary</p>
                                    <p style={{ fontWeight: 600, color: "#2d3748" }}>{selectedCompany.baseSalary}</p>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>Eligibility Criteria</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem" }}>
                                    <div style={{ backgroundColor: "#ebf8ff", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#2b6cb0" }}>CGPA</p>
                                        <p style={{ fontWeight: 600, color: "#2c5282" }}>{selectedCompany.eligibility.cgpa}+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#ebf8ff", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#2b6cb0" }}>10th %</p>
                                        <p style={{ fontWeight: 600, color: "#2c5282" }}>{selectedCompany.eligibility.tenth}%+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#ebf8ff", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#2b6cb0" }}>12th %</p>
                                        <p style={{ fontWeight: 600, color: "#2c5282" }}>{selectedCompany.eligibility.twelfth}%+</p>
                                    </div>
                                    <div style={{ backgroundColor: "#ebf8ff", padding: "0.75rem", borderRadius: "0.5rem" }}>
                                        <p style={{ fontSize: "0.75rem", color: "#2b6cb0" }}>Backlogs</p>
                                        <p style={{ fontWeight: 600, color: "#2c5282" }}>{selectedCompany.eligibility.backlog}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>Required Skills</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {selectedCompany.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: "0.375rem 0.75rem",
                                                backgroundColor: "#e2e8f0",
                                                color: "#4a5568",
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
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>Selection Process</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    {selectedCompany.rounds.map((round, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                                padding: "0.75rem",
                                                backgroundColor: "#f7fafc",
                                                borderRadius: "0.5rem"
                                            }}
                                        >
                                            <span style={{
                                                width: "24px",
                                                height: "24px",
                                                backgroundColor: "#3182ce",
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
                                            <span style={{ color: "#4a5568" }}>{round}</span>
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
                                        backgroundColor: isEligible(selectedCompany) ? "#3182ce" : "#a0aec0",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.5rem",
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
                                        backgroundColor: "#e2e8f0",
                                        color: "#4a5568",
                                        border: "none",
                                        borderRadius: "0.5rem",
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