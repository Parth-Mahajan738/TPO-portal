import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    // We maintain all form data in a single state object.
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "student"
    });

    // Handle input changes dynamically using the 'name' attribute
    function handleChange(e) {
        setForm({
            ...form, // Keep existing values (name, email, etc.)
            [e.target.name]: e.target.value // Update only the changed field
        });
    }

    // ADVANCED: Async/Await
    // JavaScript is non-blocking (doesn't wait). 'async' tells JS this function will take time.
    // 'await' pauses this line until the server actually responds.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // fetch(): The modern way to make HTTP requests.
            // By default, fetch is GET. We must specify POST to send data.
            // headers: Tells the backend "I am sending you JSON data".
            const response = await fetch('http://localhost:8000/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), // Transforms JS Object {name: "Parth"} -> String '{"name": "Parth"}'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            // Simulate successful registration and redirect
            alert("Registration successful! Redirecting to login...");
            navigate("/login");
        } catch (error) {
            console.error('Registration error:', error.message);
            alert('Registration failed: ' + error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />

                    {/* Role Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">I am a:</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer hover:underline">Log in</span>
                </p>
            </div>
        </div>
    );
}
