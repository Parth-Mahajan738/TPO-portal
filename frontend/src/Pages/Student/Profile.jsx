import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../../Components/layouts/StudentSidebar";
import { getStudentStorageKey } from "../../Utils/studentStorageKey";

const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);

    // Profile data states
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        linkedin: "",
        github: "",
        portfolio: ""
    });

    const [education, setEducation] = useState({
        tenth: { board: "", school: "", percentage: "", yearOfPassing: "" },
        twelfth: { board: "", school: "", percentage: "", yearOfPassing: "" },
        graduation: {
            degree: "",
            branch: "",
            college: "",
            university: "",
            cgpa: "",
            currentYear: "",
            expectedGraduation: "",
            backlogCount: "0"
        }
    });

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [certifications, setCertifications] = useState([]);
    const [newCertification, setNewCertification] = useState({ name: "", issuer: "", year: "" });
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: "", description: "", technologies: "", link: "" });
    const [workExperience, setWorkExperience] = useState([]);
    const [newExperience, setNewExperience] = useState({ company: "", role: "", duration: "", description: "" });

    // Resume upload state
    const [resume, setResume] = useState(null);
    const [gradeCard, setGradeCard] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const studentKey = getStudentStorageKey(parsedUser);
            // Load existing profile data if available
            if (studentKey) {
                loadProfileData(studentKey);
            }
        }
    }, []);

    const loadProfileData = (studentKey) => {
        // In a real app, this would fetch from backend
        // For now, we'll use sample data or localStorage
        const savedProfile = localStorage.getItem(`profile_${studentKey}`);
        if (savedProfile) {
            const data = JSON.parse(savedProfile);
            setPersonalInfo(data.personalInfo || personalInfo);
            setEducation(data.education || education);
            setSkills(data.skills || []);
            setCertifications(data.certifications || []);
            setProjects(data.projects || []);
            setWorkExperience(data.workExperience || []);
        }
    };

    const saveProfileData = () => {
        if (user) {
            const studentKey = getStudentStorageKey(user);
            if (!studentKey) {
                alert("Unable to identify your account. Please log in again.");
                return;
            }
            const profileData = {
                personalInfo,
                education,
                skills,
                certifications,
                projects,
                workExperience
            };
            localStorage.setItem(`profile_${studentKey}`, JSON.stringify(profileData));
            setIsEditing(false);
            alert("Profile saved successfully!");
        }
    };



    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === "resume") {
                setResume(file);
            } else if (type === "gradeCard") {
                setGradeCard(file);
            }
        }
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const addCertification = () => {
        if (newCertification.name.trim()) {
            setCertifications([...certifications, { ...newCertification, id: Date.now() }]);
            setNewCertification({ name: "", issuer: "", year: "" });
        }
    };

    const removeCertification = (id) => {
        setCertifications(certifications.filter(cert => cert.id !== id));
    };

    const addProject = () => {
        if (newProject.title.trim()) {
            setProjects([...projects, { ...newProject, id: Date.now() }]);
            setNewProject({ title: "", description: "", technologies: "", link: "" });
        }
    };

    const removeProject = (id) => {
        setProjects(projects.filter(proj => proj.id !== id));
    };

    const addExperience = () => {
        if (newExperience.company.trim()) {
            setWorkExperience([...workExperience, { ...newExperience, id: Date.now() }]);
            setNewExperience({ company: "", role: "", duration: "", description: "" });
        }
    };

    const removeExperience = (id) => {
        setWorkExperience(workExperience.filter(exp => exp.id !== id));
    };

    const renderPersonalInfo = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                {[
                    { label: "First Name", key: "firstName" },
                    { label: "Last Name", key: "lastName" },
                    { label: "Email", key: "email", type: "email" },
                    { label: "Phone", key: "phone", type: "tel" },
                    { label: "Date of Birth", key: "dateOfBirth", type: "date" }
                ].map(field => (
                    <div key={field.key}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                            {field.label}
                        </label>
                        {isEditing ? (
                            <input
                                type={field.type || "text"}
                                value={personalInfo[field.key]}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, [field.key]: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                        ) : (
                            <p style={{ padding: "0.625rem", backgroundColor: "#f7fafc", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                                {personalInfo[field.key] || "Not provided"}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Gender
                </label>
                {isEditing ? (
                    <select
                        value={personalInfo.gender}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                        style={{
                            width: "100%",
                            maxWidth: "250px",
                            padding: "0.625rem",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem"
                        }}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                ) : (
                    <p style={{ padding: "0.625rem", backgroundColor: "#f7fafc", borderRadius: "0.5rem", fontSize: "0.875rem", maxWidth: "250px" }}>
                        {personalInfo.gender || "Not provided"}
                    </p>
                )}
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Address
                </label>
                {isEditing ? (
                    <textarea
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        rows="3"
                        style={{
                            width: "100%",
                            padding: "0.625rem",
                            border: "1px solid #e2e8f0",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem",
                            resize: "vertical"
                        }}
                    />
                ) : (
                    <p style={{ padding: "0.625rem", backgroundColor: "#f7fafc", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                        {personalInfo.address || "Not provided"}
                    </p>
                )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                    { label: "City", key: "city" },
                    { label: "State", key: "state" },
                    { label: "Pincode", key: "pincode" }
                ].map(field => (
                    <div key={field.key}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                            {field.label}
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={personalInfo[field.key]}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, [field.key]: e.target.value })}
                                style={{
                                    width: "100%",
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                        ) : (
                            <p style={{ padding: "0.625rem", backgroundColor: "#f7fafc", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                                {personalInfo[field.key] || "Not provided"}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                {[
                    { label: "LinkedIn Profile", key: "linkedin" },
                    { label: "GitHub Profile", key: "github" },
                    { label: "Portfolio Website", key: "portfolio" }
                ].map(field => (
                    <div key={field.key}>
                        <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                            {field.label}
                        </label>
                        {isEditing ? (
                            <input
                                type="url"
                                value={personalInfo[field.key]}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, [field.key]: e.target.value })}
                                placeholder={`https://${field.key}.com/username`}
                                style={{
                                    width: "100%",
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.5rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                        ) : (
                            <p style={{ padding: "0.625rem", backgroundColor: "#f7fafc", borderRadius: "0.5rem", fontSize: "0.875rem" }}>
                                {personalInfo[field.key] ? (
                                    <a href={personalInfo[field.key]} target="_blank" rel="noopener noreferrer" style={{ color: "#3182ce" }}>
                                        {personalInfo[field.key]}
                                    </a>
                                ) : "Not provided"}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderEducation = () => (
        <div style={{ display: "grid", gap: "2rem" }}>
            {/* 10th Standard */}
            <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>10th Standard</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                    {[
                        { label: "Board", key: "board" },
                        { label: "School Name", key: "school" },
                        { label: "Percentage/CGPA", key: "percentage" },
                        { label: "Year of Passing", key: "yearOfPassing" }
                    ].map(field => (
                        <div key={field.key}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#718096", marginBottom: "0.25rem" }}>
                                {field.label}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={education.tenth[field.key]}
                                    onChange={(e) => setEducation({
                                        ...education,
                                        tenth: { ...education.tenth, [field.key]: e.target.value }
                                    })}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "0.375rem",
                                        fontSize: "0.875rem"
                                    }}
                                />
                            ) : (
                                <p style={{ fontSize: "0.875rem", color: "#2d3748" }}>
                                    {education.tenth[field.key] || "Not provided"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 12th Standard */}
            <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>12th Standard / Diploma</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                    {[
                        { label: "Board", key: "board" },
                        { label: "School/College Name", key: "school" },
                        { label: "Percentage/CGPA", key: "percentage" },
                        { label: "Year of Passing", key: "yearOfPassing" }
                    ].map(field => (
                        <div key={field.key}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#718096", marginBottom: "0.25rem" }}>
                                {field.label}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={education.twelfth[field.key]}
                                    onChange={(e) => setEducation({
                                        ...education,
                                        twelfth: { ...education.twelfth, [field.key]: e.target.value }
                                    })}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "0.375rem",
                                        fontSize: "0.875rem"
                                    }}
                                />
                            ) : (
                                <p style={{ fontSize: "0.875rem", color: "#2d3748" }}>
                                    {education.twelfth[field.key] || "Not provided"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Graduation */}
            <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>Graduation (Current)</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                    {[
                        { label: "Degree", key: "degree" },
                        { label: "Branch/Specialization", key: "branch" },
                        { label: "College Name", key: "college" },
                        { label: "University", key: "university" },
                        { label: "Current CGPA/Percentage", key: "cgpa" },
                        { label: "Current Year", key: "currentYear" },
                        { label: "Expected Graduation", key: "expectedGraduation" },
                        { label: "Active Backlogs", key: "backlogCount" }
                    ].map(field => (
                        <div key={field.key}>
                            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#718096", marginBottom: "0.25rem" }}>
                                {field.label}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={education.graduation[field.key]}
                                    onChange={(e) => setEducation({
                                        ...education,
                                        graduation: { ...education.graduation, [field.key]: e.target.value }
                                    })}
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "0.375rem",
                                        fontSize: "0.875rem"
                                    }}
                                />
                            ) : (
                                <p style={{ fontSize: "0.875rem", color: "#2d3748" }}>
                                    {education.graduation[field.key] || "Not provided"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSkills = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>Technical Skills</h3>
                {isEditing && (
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill (e.g., JavaScript, Python)"
                            onKeyPress={(e) => e.key === "Enter" && addSkill()}
                            style={{
                                flex: 1,
                                padding: "0.625rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.5rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <button
                            onClick={addSkill}
                            style={{
                                padding: "0.625rem 1rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                fontSize: "0.875rem"
                            }}
                        >
                            Add
                        </button>
                    </div>
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {skills.length > 0 ? skills.map((skill, index) => (
                        <span
                            key={index}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: "#ebf8ff",
                                color: "#2b6cb0",
                                borderRadius: "9999px",
                                fontSize: "0.875rem"
                            }}
                        >
                            {skill}
                            {isEditing && (
                                <button
                                    onClick={() => removeSkill(skill)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#2b6cb0",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                        lineHeight: 1
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </span>
                    )) : (
                        <p style={{ color: "#718096", fontSize: "0.875rem" }}>No skills added yet</p>
                    )}
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>Certifications</h3>
                {isEditing && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.5rem", marginBottom: "1rem" }}>
                        <input
                            type="text"
                            value={newCertification.name}
                            onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                            placeholder="Certification Name"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <input
                            type="text"
                            value={newCertification.issuer}
                            onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                            placeholder="Issuing Organization"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <input
                            type="text"
                            value={newCertification.year}
                            onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                            placeholder="Year"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <button
                            onClick={addCertification}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem"
                            }}
                        >
                            Add
                        </button>
                    </div>
                )}
                <div style={{ display: "grid", gap: "0.75rem" }}>
                    {certifications.length > 0 ? certifications.map((cert) => (
                        <div
                            key={cert.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "1rem",
                                backgroundColor: "#f7fafc",
                                borderRadius: "0.5rem"
                            }}
                        >
                            <div>
                                <p style={{ fontWeight: 500, color: "#2d3748" }}>{cert.name}</p>
                                <p style={{ fontSize: "0.875rem", color: "#718096" }}>{cert.issuer} • {cert.year}</p>
                            </div>
                            {isEditing && (
                                <button
                                    onClick={() => removeCertification(cert.id)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#e53e3e",
                                        cursor: "pointer",
                                        fontSize: "1.25rem"
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    )) : (
                        <p style={{ color: "#718096", fontSize: "0.875rem" }}>No certifications added yet</p>
                    )}
                </div>
            </div>
        </div>
    );

    const renderProjects = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            {isEditing && (
                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.75rem" }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.75rem" }}>Add New Project</h4>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="Project Title"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Project Description"
                            rows="2"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem",
                                resize: "vertical"
                            }}
                        />
                        <input
                            type="text"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            placeholder="Technologies Used (comma separated)"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <input
                            type="url"
                            value={newProject.link}
                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            placeholder="Project Link (GitHub/Live Demo)"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <button
                            onClick={addProject}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                marginTop: "0.5rem"
                            }}
                        >
                            Add Project
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: "grid", gap: "1rem" }}>
                {projects.length > 0 ? projects.map((project) => (
                    <div
                        key={project.id}
                        style={{
                            padding: "1.25rem",
                            backgroundColor: "#f7fafc",
                            borderRadius: "0.75rem",
                            border: "1px solid #e2e8f0"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748" }}>{project.title}</h4>
                            {isEditing && (
                                <button
                                    onClick={() => removeProject(project.id)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#e53e3e",
                                        cursor: "pointer",
                                        fontSize: "1.25rem"
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "#4a5568", marginBottom: "0.75rem" }}>{project.description}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                            {project.technologies.split(",").map((tech, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        padding: "0.25rem 0.5rem",
                                        backgroundColor: "#e2e8f0",
                                        borderRadius: "0.25rem",
                                        fontSize: "0.75rem",
                                        color: "#4a5568"
                                    }}
                                >
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "0.875rem", color: "#3182ce" }}
                            >
                                View Project →
                            </a>
                        )}
                    </div>
                )) : (
                    <p style={{ color: "#718096", fontSize: "0.875rem", textAlign: "center", padding: "2rem" }}>
                        No projects added yet
                    </p>
                )}
            </div>
        </div>
    );

    const renderExperience = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            {isEditing && (
                <div style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.75rem" }}>
                    <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.75rem" }}>Add Work Experience</h4>
                    <div style={{ display: "grid", gap: "0.5rem" }}>
                        <input
                            type="text"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                            placeholder="Company Name"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <input
                            type="text"
                            value={newExperience.role}
                            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                            placeholder="Job Title/Role"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <input
                            type="text"
                            value={newExperience.duration}
                            onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                            placeholder="Duration (e.g., Jan 2023 - Jun 2023)"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem"
                            }}
                        />
                        <textarea
                            value={newExperience.description}
                            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                            placeholder="Description of work and achievements"
                            rows="2"
                            style={{
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.375rem",
                                fontSize: "0.875rem",
                                resize: "vertical"
                            }}
                        />
                        <button
                            onClick={addExperience}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                marginTop: "0.5rem"
                            }}
                        >
                            Add Experience
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: "grid", gap: "1rem" }}>
                {workExperience.length > 0 ? workExperience.map((exp) => (
                    <div
                        key={exp.id}
                        style={{
                            padding: "1.25rem",
                            backgroundColor: "#f7fafc",
                            borderRadius: "0.75rem",
                            border: "1px solid #e2e8f0"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <div>
                                <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748" }}>{exp.role}</h4>
                                <p style={{ fontSize: "0.875rem", color: "#3182ce" }}>{exp.company}</p>
                            </div>
                            {isEditing && (
                                <button
                                    onClick={() => removeExperience(exp.id)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#e53e3e",
                                        cursor: "pointer",
                                        fontSize: "1.25rem"
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "0.5rem" }}>{exp.duration}</p>
                        <p style={{ fontSize: "0.875rem", color: "#4a5568" }}>{exp.description}</p>
                    </div>
                )) : (
                    <p style={{ color: "#718096", fontSize: "0.875rem", textAlign: "center", padding: "2rem" }}>
                        No work experience added yet
                    </p>
                )}
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div style={{ display: "grid", gap: "2rem" }}>
            {/* Resume Upload */}
            <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>Resume</h3>
                <div style={{ border: "2px dashed #cbd5e0", borderRadius: "0.75rem", padding: "2rem", textAlign: "center" }}>
                    {resume ? (
                        <div>
                            <p style={{ color: "#2d3748", marginBottom: "0.5rem" }}>📄 {resume.name}</p>
                            <p style={{ fontSize: "0.875rem", color: "#718096" }}>
                                Size: {(resume.size / 1024).toFixed(2)} KB
                            </p>
                            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                                <button
                                    onClick={() => setResume(null)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: "#e53e3e",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.375rem",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p style={{ color: "#718096", marginBottom: "1rem" }}>Upload your resume (PDF, DOC, DOCX)</p>
                            <label
                                style={{
                                    display: "inline-block",
                                    padding: "0.625rem 1.25rem",
                                    backgroundColor: "#3182ce",
                                    color: "white",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Choose File
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => handleFileUpload(e, "resume")}
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Grade Card Upload */}
            <div style={{ backgroundColor: "#f7fafc", padding: "1.5rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>Grade Card / Marksheet</h3>
                <div style={{ border: "2px dashed #cbd5e0", borderRadius: "0.75rem", padding: "2rem", textAlign: "center" }}>
                    {gradeCard ? (
                        <div>
                            <p style={{ color: "#2d3748", marginBottom: "0.5rem" }}>📄 {gradeCard.name}</p>
                            <p style={{ fontSize: "0.875rem", color: "#718096" }}>
                                Size: {(gradeCard.size / 1024).toFixed(2)} KB
                            </p>
                            <div style={{ marginTop: "1rem" }}>
                                <button
                                    onClick={() => setGradeCard(null)}
                                    style={{
                                        padding: "0.5rem 1rem",
                                        backgroundColor: "#e53e3e",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.375rem",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p style={{ color: "#718096", marginBottom: "1rem" }}>Upload your latest grade card (PDF, JPG, PNG)</p>
                            <label
                                style={{
                                    display: "inline-block",
                                    padding: "0.625rem 1.25rem",
                                    backgroundColor: "#3182ce",
                                    color: "white",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Choose File
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload(e, "gradeCard")}
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Document Guidelines */}
            <div style={{ backgroundColor: "#fffaf0", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #fbd38d" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#c05621", marginBottom: "0.5rem" }}>📋 Document Guidelines</h4>
                <ul style={{ fontSize: "0.875rem", color: "#744210", paddingLeft: "1.25rem", margin: 0 }}>
                    <li>Resume should be in PDF format and not exceed 2MB</li>
                    <li>Grade card should clearly show all semesters and CGPA</li>
                    <li>Ensure all documents are clear and readable</li>
                    <li>Keep documents updated with latest information</li>
                </ul>
            </div>
        </div>
    );

    const tabs = [
        { id: "personal", label: "Personal Info" },
        { id: "education", label: "Education" },
        { id: "skills", label: "Skills & Certifications" },
        { id: "projects", label: "Projects" },
        { id: "experience", label: "Experience" },
        { id: "documents", label: "Documents" }
    ];

    // Dark theme input style
    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #2d3448",
        backgroundColor: "#242938",
        color: "#e2e8f0",
        fontSize: "0.9rem",
        outline: "none",
        boxSizing: "border-box"
    };

    const labelStyle = {
        display: "block",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#a0aec0",
        marginBottom: "0.5rem"
    };

    const cardStyle = {
        backgroundColor: "#1a1f2e",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        border: "1px solid #2d3448"
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0" }}>My Profile</h1>
                    <button
                        onClick={() => isEditing ? saveProfileData() : setIsEditing(true)}
                        style={{
                            padding: "0.625rem 1.5rem",
                            backgroundColor: isEditing ? "#27ae60" : "#3b6ef8",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            transition: "opacity 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                </div>

                {/* Tabs */}
                <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid #2d3448",
                    overflowX: "auto"
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: "0.75rem 1.25rem",
                                backgroundColor: "transparent",
                                border: "none",
                                borderBottom: activeTab === tab.id ? "2px solid #3b6ef8" : "2px solid transparent",
                                color: activeTab === tab.id ? "#3b6ef8" : "#718096",
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    {activeTab === "personal" && renderPersonalInfo()}
                    {activeTab === "education" && renderEducation()}
                    {activeTab === "skills" && renderSkills()}
                    {activeTab === "projects" && renderProjects()}
                    {activeTab === "experience" && renderExperience()}
                    {activeTab === "documents" && renderDocuments()}
                </div>
            </main>
        </div>
    );
};

export default Profile;
