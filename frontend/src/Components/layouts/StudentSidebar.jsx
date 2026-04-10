import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Professional SVG Icons
const Icons = {
    dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    profile: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    companies: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    applications: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
    ),
    logout: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    ),
    menu: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    )
};

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
        { id: "dashboard", label: "Dashboard", Icon: Icons.dashboard, path: "/student/dashboard" },
        { id: "profile", label: "My Profile", Icon: Icons.profile, path: "/student/profile" },
        { id: "companies", label: "Companies", Icon: Icons.companies, path: "/student/companies" },
        { id: "applications", label: "Applications", Icon: Icons.applications, path: "/student/applications" }
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
                        transition: "color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#e2e8f0"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#718096"}
                    title={isCollapsed ? "Expand" : "Collapse"}
                >
                    <Icons.menu />
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
                {menuItems.map((item) => {
                    const IconComponent = item.Icon;
                    return (
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
                                justifyContent: isCollapsed ? "center" : "center",
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
                            <IconComponent />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
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
                        backgroundColor: "transparent",
                        color: "#a0aec0",
                        border: "1px solid #2d3448",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#c0392b";
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.borderColor = "#c0392b";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "#a0aec0";
                        e.currentTarget.style.borderColor = "#2d3448";
                    }}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <Icons.logout />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;