import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Icons = {
    dashboard: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
    ),
    companies: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    analytics: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <path d="M17 5H9.5a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 1 0 3h-5a1.5 1.5 0 0 0 0 3h7.5"></path>
        </svg>
    ),
    logout: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    )
};

const TPOAdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const menuItems = [
        { label: "Dashboard", icon: Icons.dashboard, path: "/admin/results" },
        { label: "Manage Companies", icon: Icons.companies, path: "/admin/companies" },
        { label: "Approve Drives", icon: Icons.analytics, path: "/admin/drives" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <aside style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            width: isOpen ? "260px" : "80px",
            backgroundColor: "#1a1f2e",
            borderRight: "1px solid #2d3448",
            padding: "1.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.3s",
            zIndex: 1000
        }}>
            {/* Header */}
            <div style={{ marginBottom: "2rem", borderBottom: "1px solid #2d3448", paddingBottom: "1rem" }}>
                <h2 style={{
                    color: "#c0392b",
                    fontSize: isOpen ? "1.25rem" : "0",
                    fontWeight: 700,
                    margin: 0,
                    transition: "font-size 0.3s"
                }}>
                    {isOpen ? "TPO Admin" : ""}
                </h2>
            </div>

            {/* Menu Items */}
            <nav style={{ flex: 1 }}>
                {menuItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            style={{
                                width: "100%",
                                padding: "0.75rem 0.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                                color: isActive ? "#c0392b" : "#a0aec0",
                                backgroundColor: isActive ? "#242938" : "transparent",
                                border: "none",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                marginBottom: "0.5rem",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                transition: "all 0.2s"
                            }}
                            onMouseEnter={e => {
                                if (!isActive) e.currentTarget.style.backgroundColor = "#242938";
                            }}
                            onMouseLeave={e => {
                                if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                            }}
                        >
                            <item.icon />
                            <span style={{ display: isOpen ? "block" : "none" }}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* User Profile */}
            <div style={{ borderTop: "1px solid #2d3448", paddingTop: "1rem" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#242938"
                }}>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#c0392b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        flexShrink: 0
                    }}>
                        {user?.first_name?.[0]?.toUpperCase() || "A"}
                    </div>
                    {isOpen && (
                        <div style={{ minWidth: 0 }}>
                            <p style={{ color: "#e2e8f0", fontSize: "0.875rem", fontWeight: 600, margin: "0 0 0.25rem 0" }}>
                                {user?.first_name || "Admin"}
                            </p>
                            <p style={{ color: "#718096", fontSize: "0.75rem", margin: 0 }}>Admin</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        padding: "0.75rem 0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "#fc8181",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        transition: "all 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#242938"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                    <Icons.logout />
                    <span style={{ display: isOpen ? "block" : "none" }}>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default TPOAdminSidebar;
