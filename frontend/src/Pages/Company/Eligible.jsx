import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const Eligible = () => {
    const [eligible, setEligible] = useState([]);

    useEffect(() => {
        // Load eligible students data
        const sampleEligible = [
            { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", cgpa: 3.8 },
            { id: 2, name: "Priya Sharma", email: "priya@example.com", cgpa: 3.9 }
        ];
        setEligible(sampleEligible);
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                    Eligible Students
                </h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {eligible.map(student => (
                        <div
                            key={student.id}
                            style={{
                                backgroundColor: "#1a1f2e",
                                borderRadius: "0.75rem",
                                padding: "1.5rem",
                                border: "1px solid #2d3448"
                            }}
                        >
                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                                {student.name}
                            </h3>
                            <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>{student.email}</p>
                            <p style={{ color: "#48bb78", fontWeight: 600 }}>CGPA: {student.cgpa}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Eligible;
