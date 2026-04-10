import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const JobPost = () => {
    const [recruiter, setRecruiter] = useState(null);
    const [formData, setFormData] = useState({
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        CGPA: "",
        salary: "",
        jobType: "Full-time",
        location: "",
        applicationDeadline: "",
        postedDate: new Date().toISOString().split('T')[0]
    });
    const [submitMessage, setSubmitMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [postedJobs, setPostedJobs] = useState([]);

    useEffect(() => {
        // Get current recruiter identity
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setRecruiter(JSON.parse(storedUser));
        }
        loadRecruiterJobs();
    }, []);

    const loadRecruiterJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                headers: { "Authorization": `Token ${token}` }
            });
            if (res.ok) {
                const jobs = await res.json();
                setPostedJobs(jobs);
            }
        } catch (err) {
            console.error("Failed to load jobs", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8000/api/recruiter/jobs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify({
                    job_title: formData.jobTitle,
                    company_name: formData.companyName,
                    job_description: formData.jobDescription,
                    qualifications: formData.CGPA,
                    salary: formData.salary.trim() === "" ? null : formData.salary,
                    job_type: formData.jobType,
                    location: formData.location,
                    application_deadline: formData.applicationDeadline.trim() === "" ? null : formData.applicationDeadline
                })
            });

            if (!res.ok) {
                const errorData = await res.text();
                throw new Error(errorData);
            }

            const newJob = await res.json();
            setPostedJobs([newJob, ...postedJobs]);

            setSubmitMessage("Job posted successfully! ✓");
            setFormData({
                jobTitle: "",
                companyName: "",
                jobDescription: "",
                CGPA: "",
                salary: "",
                jobType: "Full-time",
                location: "",
                applicationDeadline: "",
                postedDate: new Date().toISOString().split('T')[0]
            });

            setTimeout(() => setSubmitMessage(""), 3000);
        } catch (err) {
            console.error("Error posting job:", err);
            setSubmitMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <div style={{ marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                        Post a New Job
                    </h1>
                    <p style={{ color: "#718096" }}>Create a job opening and start recruiting talented students.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {/* Job Form */}
                    {showForm && (
                        <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "2rem", border: "1px solid #2d3448" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                                Job Details
                            </h2>

                            {submitMessage && (
                                <div style={{
                                    padding: "1rem",
                                    backgroundColor: "#f0fff4",
                                    border: "1px solid #9ae6b4",
                                    borderRadius: "0.5rem",
                                    color: "#22543d",
                                    marginBottom: "1.5rem"
                                }}>
                                    {submitMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Job Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem"
                                        }}
                                        placeholder="e.g., Software Engineer"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem"
                                        }}
                                        placeholder="Your company name"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Job Description *
                                    </label>
                                    <textarea
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem",
                                            minHeight: "100px",
                                            fontFamily: "inherit"
                                        }}
                                        placeholder="Describe the job role and responsibilities"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Required CGPA *
                                    </label>
                                    <input
                                        type="number"
                                        name="CGPA"
                                        value={formData.CGPA}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem"
                                        }}
                                        placeholder="e.g., 7.5"
                                    />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                                    <div>
                                        <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                            Salary (LPA) *
                                        </label>
                                        <input
                                            type="number"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                            required
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem",
                                                backgroundColor: "#242938",
                                                border: "1px solid #2d3448",
                                                borderRadius: "0.5rem",
                                                color: "#e2e8f0",
                                                fontSize: "0.95rem"
                                            }}
                                            placeholder="e.g., 12.5"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                            Job Type *
                                        </label>
                                        <select
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleInputChange}
                                            style={{
                                                width: "100%",
                                                padding: "0.75rem",
                                                backgroundColor: "#242938",
                                                border: "1px solid #2d3448",
                                                borderRadius: "0.5rem",
                                                color: "#e2e8f0",
                                                fontSize: "0.95rem"
                                            }}
                                        >
                                            <option value="Full-time">Full-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem"
                                        }}
                                        placeholder="e.g., Bangalore, India"
                                    />
                                </div>

                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Application Deadline *
                                    </label>
                                    <input
                                        type="date"
                                        name="applicationDeadline"
                                        value={formData.applicationDeadline}
                                        onChange={handleInputChange}
                                        onClick={(e) => {
                                            try {
                                                e.target.showPicker();
                                            } catch (err) {
                                                // ignore if browser doesn't support showPicker
                                            }
                                        }}
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "0.75rem",
                                            backgroundColor: "#242938",
                                            border: "1px solid #2d3448",
                                            borderRadius: "0.5rem",
                                            color: "#e2e8f0",
                                            fontSize: "0.95rem",
                                            cursor: "pointer"
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem",
                                        backgroundColor: "#e67e22",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        transition: "opacity 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    Post Job
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Posted Jobs List */}
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "2rem", border: "1px solid #2d3448" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0" }}>
                                Posted Jobs ({postedJobs.length})
                            </h2>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#242938",
                                    border: "1px solid #2d3448",
                                    borderRadius: "0.5rem",
                                    color: "#e67e22",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 500
                                }}
                            >
                                {showForm ? "Hide Form" : "Show Form"}
                            </button>
                        </div>

                        <div style={{ display: "grid", gap: "1rem" }}>
                            {postedJobs.length > 0 ? postedJobs.map(job => (
                                <div
                                    key={job.id}
                                    style={{
                                        padding: "1.5rem",
                                        backgroundColor: "#242938",
                                        borderRadius: "0.5rem",
                                        borderLeft: "4px solid #e67e22"
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                                        <div>
                                            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.25rem" }}>
                                                {job.job_title}
                                            </h3>
                                            <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>{job.company_name}</p>
                                        </div>
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            backgroundColor: "#f0fff4",
                                            color: "#22543d",
                                            borderRadius: "9999px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600
                                        }}>
                                            Active
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "0.875rem", color: "#a0aec0", marginBottom: "1rem" }}>
                                        {job.location} • ₹{job.salary} LPA • {job.job_type}
                                    </p>
                                    <p style={{ fontSize: "0.875rem", color: "#718096", lineHeight: "1.5" }}>
                                        {job.job_description && job.job_description.substring(0, 150)}...
                                    </p>
                                    <p style={{ fontSize: "0.75rem", color: "#718096", marginTop: "1rem" }}>
                                        Posted: {job.posted_date} • Deadline: {job.application_deadline}
                                    </p>
                                </div>
                            )) : (
                                <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
                                    No jobs posted yet. Create your first posting!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default JobPost;
