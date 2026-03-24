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
    briefcase: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 7v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
        </svg>
    ),
    users: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    calendar: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    ),
    settings: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
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

const RecruiterSidebar = () => {
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
        { id: "dashboard", label: "Dashboard", Icon: Icons.dashboard, path: "/recruiter/dashboard" },
        { id: "post-job", label: "Post Job", Icon: Icons.briefcase, path: "/recruiter/post-job" },
        { id: "applicants", label: "Applicants", Icon: Icons.users, path: "/recruiter/applicants" },
        { id: "rounds", label: "Placement Rounds", Icon: Icons.briefcase, path: "/recruiter/rounds" },
        { id: "events", label: "Schedule Events", Icon: Icons.calendar, path: "/recruiter/events" }
    ];

    const isActive = (path) => location.pathname === path;

    const getInitials = () => {
        if (!user) return "RC";
        const first = user.first_name?.charAt(0) || "";
        const last = user.last_name?.charAt(0) || "";
        return (first + last).toUpperCase() || "RC";
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
                            backgroundColor: "#e67e22",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "1.125rem",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/recruiter/dashboard")}
                    >
                        R
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
                        backgroundColor: "#e67e22",
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
                            {user ? `${user.first_name} ${user.last_name}` : "Recruiter"}
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
                            {user?.email || "recruiter@example.com"}
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
                                backgroundColor: isActive(item.path) ? "#e67e22" : "transparent",
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

export default RecruiterSidebar;
