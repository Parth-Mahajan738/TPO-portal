import { useState, useEffect } from "react";
import TPOAdminSidebar from "../../Components/layouts/TPOAdminSidebar";

const Analytics = () => {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        totalRounds: 0,
        totalApplications: 0,
        placedStudents: 0
    });

    useEffect(() => {
        // Load real stats from localStorage
        const savedJobs = localStorage.getItem("recruiter_jobs");
        const savedRounds = localStorage.getItem("recruiter_rounds");

        const jobsList = savedJobs ? JSON.parse(savedJobs) : [];
        const companies = [...new Set(jobsList.map(j => j.companyName))].length;
        const rounds = savedRounds ? JSON.parse(savedRounds).length : 0;

        // Count actual applications across all students
        let totalApps = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("applications_")) {
                const apps = JSON.parse(localStorage.getItem(key));
                totalApps += Array.isArray(apps) ? apps.length : 0;
            }
        }

        setStats({
            totalCompanies: companies,
            totalRounds: rounds,
            totalApplications: totalApps,
            placedStudents: 0
        });
    }, []);

    const StatCard = ({ label, value, color }) => (
        <div style={{
            backgroundColor: "#1a1f2e",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            border: "1px solid #2d3448",
            textAlign: "center"
        }}>
            <p style={{ color: "#a0aec0", fontSize: "0.875rem", margin: "0 0 0.5rem 0" }}>{label}</p>
            <p style={{ color, fontSize: "2rem", fontWeight: 700, margin: 0 }}>{value}</p>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <TPOAdminSidebar />
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                    TPO Admin Dashboard
                </h1>
                <p style={{ color: "#a0aec0", marginBottom: "2rem" }}>Analytics and placement overview</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                    <StatCard label="Registered Companies" value={stats.totalCompanies} color="#3b6ef8" />
                    <StatCard label="Placement Rounds" value={stats.totalRounds} color="#27ae60" />
                    <StatCard label="Total Applications" value={stats.totalApplications} color="#e67e22" />
                    <StatCard label="Placed Students" value={stats.placedStudents} color="#9f7aea" />
                </div>

                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1rem" }}>
                        Placement Activities
                    </h2>
                    <p style={{ color: "#a0aec0" }}>
                        Overview of all placement activities, rounds, and student performance will be displayed here.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
