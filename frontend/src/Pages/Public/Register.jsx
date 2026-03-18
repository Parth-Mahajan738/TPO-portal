import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        role: "student"
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Registration failed");
            }

            alert("Registration successful! Redirecting to login...");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.message);
            alert("Registration failed: " + error.message);
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
                    Create Account
                </h1>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
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
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#27ae60",
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
                        Sign Up
                    </button>
                </form>

                <p style={{ marginTop: "1.2rem", textAlign: "center", color: "#718096", fontSize: "0.85rem" }}>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")} style={{ color: "#7c9ef8", cursor: "pointer" }}>
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}
