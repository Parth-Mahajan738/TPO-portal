import { useState, useEffect } from "react";
import TPOAdminSidebar from "../../Components/layouts/TPOAdminSidebar";

const ManageCompanies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Load companies from localStorage
        const savedJobs = localStorage.getItem("recruiter_jobs");
        if (savedJobs) {
            const jobs = JSON.parse(savedJobs);
            const uniqueCompanies = [...new Set(jobs.map(job => job.companyName))];
            setCompanies(uniqueCompanies);
        }
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <TPOAdminSidebar />
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                    Manage Companies
                </h1>
                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    {companies.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
                            {companies.map((company, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "#242938",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #2d3448",
                                        color: "#e2e8f0"
                                    }}
                                >
                                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 600 }}>{company}</h3>
                                    <p style={{ margin: 0, color: "#a0aec0", fontSize: "0.875rem" }}>Active Company</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: "#718096", textAlign: "center" }}>No companies registered yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ManageCompanies;
