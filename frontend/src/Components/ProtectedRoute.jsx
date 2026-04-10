import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("role");

    // 1. Check if user is logged in
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 2. Role-based protection (ensure user stays in their designated area)
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Redirect an unauthorized user to their proper destination based on their actual role
        if (userRole === "student") return <Navigate to="/student/dashboard" replace />;
        if (userRole === "recruiter") return <Navigate to="/recruiter/dashboard" replace />;
        // The API returns 'tpo' or 'admin' depending on setup
        if (userRole === "tpo" || userRole === "admin") return <Navigate to="/admin/results" replace />;
        
        // Fallback
        return <Navigate to="/login" replace />;
    }

    // 3. User is authorized, render the requested component
    return children;
};

export default ProtectedRoute;
