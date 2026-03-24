import { useState, useEffect } from "react";
import TPOAdminSidebar from "../../Components/layouts/TPOAdminSidebar";

const ApproveDrives = () => {
    const [drives, setDrives] = useState([]);

    useEffect(() => {
        // Load placement drives/rounds from localStorage
        const savedRounds = localStorage.getItem("recruiter_rounds");
        if (savedRounds) {
            const rounds = JSON.parse(savedRounds);
            setDrives(rounds);
        }
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <TPOAdminSidebar />
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                    Approve Placement Drives
                </h1>
                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    {drives.length > 0 ? (
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {drives.map(drive => (
                                <div
                                    key={drive.id}
                                    style={{
                                        padding: "1rem",
                                        backgroundColor: "#242938",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #2d3448",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 600, color: "#e2e8f0" }}>
                                            {drive.roundName}
                                        </h3>
                                        <p style={{ margin: 0, color: "#a0aec0", fontSize: "0.875rem" }}>
                                            {drive.roundType} • {drive.date}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <button style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#27ae60",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "0.25rem",
                                            cursor: "pointer",
                                            fontSize: "0.875rem"
                                        }}>
                                            Approve
                                        </button>
                                        <button style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "0.25rem",
                                            cursor: "pointer",
                                            fontSize: "0.875rem"
                                        }}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: "#718096", textAlign: "center" }}>No drives to approve.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ApproveDrives;
