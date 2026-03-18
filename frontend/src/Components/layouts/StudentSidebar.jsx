import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: "📊", path: "/student/dashboard" },
        { id: "profile", label: "My Profile", icon: "👤", path: "/student/profile" },
        { id: "companies", label: "Companies", icon: "🏢", path: "/student/companies" },
        { id: "applications", label: "Applications", icon: "📋", path: "/student/applications" }
    ];

    const isActive = (path) => location.pathname === path;

    // Generate avatar initials from user name
    const getInitials = () => {
        if (!user) return "ST";
        const first = user.first_name?.charAt(0) || "";
        const last = user.last_name?.charAt(0) || "";
        return (first + last).toUpperCase() || "ST";
    };

    return (
        <aside
            style={{
                width: isCollapsed ? "70px" : "260px",
                height: "100vh",
                backgroundColor: "#1a1f2e",
                borderRight: "1px solid #2d3448",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 100,
                transition: "width 0.3s ease"
            }}
        >
            {/* Logo Section with Toggle Button */}
            <div
                style={{
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isCollapsed ? "0 0.75rem" : "0 1.25rem",
                    borderBottom: "1px solid #2d3448"
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: "#3b6ef8",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "1.125rem",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/student/dashboard")}
                    >
                        T
                    </div>
                    {!isCollapsed && (
                        <span
                            style={{
                                color: "#e2e8f0",
                                fontWeight: 600,
                                fontSize: "1rem",
                                marginLeft: "0.75rem"
                            }}
                        >
                            TPO Portal
                        </span>
                    )}
                </div>

                {/* Collapse Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        padding: "0.5rem",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#718096",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s",
                        flexDirection: "column",
                        gap: "4px"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#e2e8f0"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#718096"}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    <span
                        style={{
                            display: "block",
                            width: "16px",
                            height: "2px",
                            backgroundColor: "currentColor",
                            borderRadius: "1px"
                        }}
                    />
                    <span
                        style={{
                            display: "block",
                            width: "16px",
                            height: "2px",
                            backgroundColor: "currentColor",
                            borderRadius: "1px"
                        }}
                    />
                    <span
                        style={{
                            display: "block",
                            width: "16px",
                            height: "2px",
                            backgroundColor: "currentColor",
                            borderRadius: "1px"
                        }}
                    />
                </button>
            </div>

            {/* Profile Section */}
            <div
                style={{
                    padding: isCollapsed ? "1rem 0.5rem" : "1.5rem 1.25rem",
                    borderBottom: "1px solid #2d3448",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem"
                }}
            >
                {/* Profile Photo / Avatar */}
                <div
                    style={{
                        width: isCollapsed ? "44px" : "64px",
                        height: isCollapsed ? "44px" : "64px",
                        borderRadius: "50%",
                        backgroundColor: "#3b6ef8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: isCollapsed ? "1rem" : "1.5rem",
                        fontWeight: 600,
                        border: "3px solid #2d3448",
                        transition: "all 0.3s ease"
                    }}
                >
                    {getInitials()}
                </div>

                {!isCollapsed && (
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <p
                            style={{
                                color: "#e2e8f0",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                marginBottom: "0.25rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {user ? `${user.first_name} ${user.last_name}` : "Student"}
                        </p>
                        <p
                            style={{
                                color: "#718096",
                                fontSize: "0.75rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {user?.email || "student@example.com"}
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation Menu */}
            <nav
                style={{
                    flex: 1,
                    padding: "1rem 0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    overflowY: "auto"
                }}
            >
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            padding: isCollapsed ? "0.75rem" : "0.875rem 1rem",
                            backgroundColor: isActive(item.path) ? "#3b6ef8" : "transparent",
                            color: isActive(item.path) ? "#fff" : "#a0aec0",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: isActive(item.path) ? 600 : 500,
                            transition: "all 0.2s ease",
                            justifyContent: isCollapsed ? "center" : "flex-start",
                            whiteSpace: "nowrap"
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive(item.path)) {
                                e.currentTarget.style.backgroundColor = "#242938";
                                e.currentTarget.style.color = "#e2e8f0";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive(item.path)) {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#a0aec0";
                            }
                        }}
                        title={isCollapsed ? item.label : ""}
                    >
                        <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                        {!isCollapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div style={{ padding: "0.75rem", borderTop: "1px solid #2d3448" }}>
                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        gap: "0.75rem",
                        padding: isCollapsed ? "0.75rem" : "0.875rem 1rem",
                        backgroundColor: "#c0392b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <span style={{ fontSize: "1.25rem" }}>🚪</span>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;