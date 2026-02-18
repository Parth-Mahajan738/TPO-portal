import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation



export default function Login() {
    const navigate = useNavigate(); // Initialize navigation hook

    // State management for form inputs.
    // We use a single object 'form' to hold all fields instead of separate variables.
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "student"
    });

    // Universal change handler for all inputs.
    // [e.target.name]: e.target.value -> Dynamic key update based on input's 'name' attribute.
    // ...form -> Spreads existing state so we don't lose other fields when updating one.
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleLogin = async (e) => {
        // e: Event Object. Contains details about the form submit event.
        // e.preventDefault(): Crucial! Stops the browser from reloading the page (default HTML behavior).
        e.preventDefault();
        try {
            // Sending POST request to Django Backend API
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form), // Convert JS object to JSON string
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Storing user role and login status in local storage.
            // This persists the session even if the user refreshes the page.
            localStorage.setItem("role", data.role);
            localStorage.setItem("isLoggedIn", "true");

            // Logic to redirect user based on their specific role using 'navigate'
            // navigate(): React Router's way to change pages without reloading the browser.
            if (data.role === 'student') {
                navigate('/student/dashboard');
            } else if (data.role === 'recruiter') {
                navigate('/recruiter/post-job');
            } else if (data.role === 'tpo') {
                navigate('/admin/results');
            } else {
                alert('Unknown role: ' + data.role);
            }

        } catch (error) {
            console.error('Login error:', error.message);
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Portal</h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="username"
                        placeholder="Email or Username"
                        value={form.username}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Role Dropdown */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 mb-1">I am a:</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="border p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 font-semibold">
                        Login
                    </button>

                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer hover:underline">Register</span>
                </p>
            </div>
        </div>
    );
}