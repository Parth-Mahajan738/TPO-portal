import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "student"
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Login failed");
            }

            const data = await response.json();

            localStorage.setItem("role", data.role);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("token", data.token);

            // Fetch full profile with the token so we have first_name for the dashboard
            const profileRes = await fetch("http://localhost:8000/api/auth/profile/", {
                headers: { "Authorization": `Token ${data.token}` }
            });
            if (profileRes.ok) {
                const profile = await profileRes.json();
                localStorage.setItem("user", JSON.stringify(profile));
            }

            if (data.role === "student") navigate("/student/dashboard");
            else if (data.role === "recruiter") navigate("/recruiter/post-job");
            else if (data.role === "tpo") navigate("/admin/results");
            else alert("Unknown role: " + data.role);

        } catch (error) {
            console.error("Login error:", error.message);
            alert("Login failed: " + error.message);
        }
    };

    /* ── Styles ── */
    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #2d3448",
        backgroundColor: "#242938",
        color: "#e2e8f0",
        fontSize: "0.9rem",
        outline: "none",
        boxSizing: "border-box",
    };

    const roleColors = { student: "#3b6ef8", recruiter: "#27ae60", admin: "#c0392b" };
    const btnColor = roleColors[form.role] || "#3b6ef8";

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#0f1117",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, system-ui, sans-serif",
        }}>
            <div style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#1a1f2e",
                border: "1px solid #2d3448",
                borderRadius: "12px",
                padding: "2rem",
            }}>
                <h1 style={{ color: "#e2e8f0", textAlign: "center", marginBottom: "1.5rem", fontSize: "1.4rem", fontWeight: 700 }}>
                    Login Portal
                </h1>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Email or Username"
                        value={form.username}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <label style={{ color: "#718096", fontSize: "0.8rem" }}>I am a:</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            style={{ ...inputStyle, cursor: "pointer" }}
                        >
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: btnColor,
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "10px",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            marginTop: "4px",
                            transition: "opacity 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        Login
                    </button>
                </form>

                <p style={{ marginTop: "1.2rem", textAlign: "center", color: "#718096", fontSize: "0.85rem" }}>
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")} style={{ color: "#7c9ef8", cursor: "pointer" }}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}