// This acts as the main landing page for students after login.
// It will eventually show key metrics like upcoming drives, application status, etc.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentDashboard = () => {
    const navigate = useNavigate();
    // State to hold the full user profile object fetched after login
    const [user, setUser] = useState(null);

    // useEffect runs once when the component first renders (mounts).
    // We read the profile from localStorage — it was saved there right after login.
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Convert JSON string back to an object
        }
    }, []); // Empty array [] means: run this only once, on first render

    const handleLogout = () => {
        // Clear ALL auth-related keys from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");

        setUser(null);
        navigate("/login");
    };

    return (
        <div>
            {/* ── Navbar ── */}
            <nav style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#1a1f2e",
                borderBottom: "1px solid #2d3448",
                padding: "0 1.25rem",
                height: "60px",
            }}>

                {/* Left — Sidebar toggle (hamburger) */}
                <button
                    title="Toggle sidebar"
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        padding: "6px",
                        borderRadius: "6px",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2d3448"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#a0aec0", borderRadius: "2px" }} />
                    <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#a0aec0", borderRadius: "2px" }} />
                    <span style={{ display: "block", width: "22px", height: "2px", backgroundColor: "#a0aec0", borderRadius: "2px" }} />
                </button>

                {/* Centre — Welcome message */}
                <p style={{ margin: 0, color: "#e2e8f0", fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                    Welcome,&nbsp;<strong style={{ color: "#7c9ef8" }}>{user ? user.first_name : "..."}</strong>!
                </p>

                {/* Right — Logout */}
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#c0392b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "7px 18px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e74c3c"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#c0392b"}
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default StudentDashboard;
