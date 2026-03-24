import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#0f1117",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "Inter, system-ui, sans-serif"
        }}>
            <div style={{ textAlign: "center", maxWidth: "600px" }}>
                <h1 style={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: "#e2e8f0",
                    marginBottom: "1rem"
                }}>
                    Placement Portal
                </h1>
                <p style={{
                    fontSize: "1.125rem",
                    color: "#a0aec0",
                    marginBottom: "2rem",
                    lineHeight: 1.6
                }}>
                    A comprehensive platform for managing placements, connecting students with companies, and streamlining the recruitment process.
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "0.875rem 2rem",
                            backgroundColor: "#3b6ef8",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: 600,
                            transition: "opacity 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        Get Started
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        style={{
                            padding: "0.875rem 2rem",
                            backgroundColor: "transparent",
                            color: "#3b6ef8",
                            border: "2px solid #3b6ef8",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: 600,
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = "#3b6ef8";
                            e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#3b6ef8";
                        }}
                    >
                        Sign In
                    </button>
                </div>

                <div style={{
                    marginTop: "3rem",
                    padding: "2rem",
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    border: "1px solid #2d3448"
                }}>
                    <h3 style={{ color: "#e2e8f0", marginBottom: "1rem", fontSize: "1.125rem", fontWeight: 600 }}>
                        Demo Credentials
                    </h3>
                    <div style={{ textAlign: "left", display: "grid", gap: "0.75rem" }}>
                        <div>
                            <p style={{ color: "#a0aec0", margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: 600 }}>
                                For Students:
                            </p>
                            <p style={{ color: "#718096", margin: 0, fontSize: "0.875rem" }}>
                                Username: student | Password: password
                            </p>
                        </div>
                        <div>
                            <p style={{ color: "#a0aec0", margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: 600 }}>
                                For Companies:
                            </p>
                            <p style={{ color: "#718096", margin: 0, fontSize: "0.875rem" }}>
                                Username: recruiter | Password: password
                            </p>
                        </div>
                        <div>
                            <p style={{ color: "#a0aec0", margin: "0 0 0.25rem 0", fontSize: "0.875rem", fontWeight: 600 }}>
                                For Admin:
                            </p>
                            <p style={{ color: "#718096", margin: 0, fontSize: "0.875rem" }}>
                                Username: admin | Password: password
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
