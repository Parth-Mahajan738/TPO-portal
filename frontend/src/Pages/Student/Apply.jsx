import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentSidebar from "../../Components/layouts/StudentSidebar";
import { getStudentStorageKey } from "../../Utils/studentStorageKey";

const Apply = () => {
    const navigate = useNavigate();
    const { companyId } = useParams();
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Application form data
    const [applicationData, setApplicationData] = useState({
        preferredLocation: "",
        expectedCTC: "",
        joiningDate: "",
        references: [{ name: "", relation: "", contact: "" }],
        coverLetter: "",
        additionalInfo: "",
        agreeToTerms: false,
        confirmAccuracy: false
    });

    // Profile verification data (fetched from profile)
    const [profileData, setProfileData] = useState({
        personalInfo: {},
        education: {},
        skills: [],
        resume: null,
        gradeCard: null
    });

    const [verificationStatus, setVerificationStatus] = useState({
        personal: false,
        education: false,
        documents: false
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const studentKey = getStudentStorageKey(parsedUser);
            if (studentKey) {
                loadProfileData(studentKey);
            }
        }
        loadCompanyData();
    }, [companyId]);

    const loadProfileData = (studentKey) => {
        const savedProfile = localStorage.getItem(`profile_${studentKey}`);
        if (savedProfile) {
            const data = JSON.parse(savedProfile);
            setProfileData({
                personalInfo: data.personalInfo || {},
                education: data.education || {},
                skills: data.skills || [],
                resume: data.resume || null,
                gradeCard: data.gradeCard || null
            });

            // Check verification status
            setVerificationStatus({
                personal: data.personalInfo && data.personalInfo.firstName && data.personalInfo.email,
                education: data.education && data.education.graduation && data.education.graduation.cgpa,
                documents: false // Would check actual file uploads in real app
            });
        }
    };

    const loadCompanyData = () => {
        // In a real app, fetch from backend using companyId
        const sampleCompanies = [
            {
                id: 1,
                name: "Tech Solutions Inc.",
                logo: "TS",
                jobRole: "Software Development Engineer",
                ctc: "12-15 LPA",
                location: "Bangalore, Hyderabad, Pune",
                deadline: "2026-04-15",
                eligibility: { cgpa: 7.5, tenth: 75, twelfth: 75, backlog: 0 }
            },
            {
                id: 2,
                name: "DataFlow Analytics",
                logo: "DF",
                jobRole: "Data Analyst",
                ctc: "8-10 LPA",
                location: "Bangalore, Mumbai",
                deadline: "2026-04-10",
                eligibility: { cgpa: 7.0, tenth: 70, twelfth: 70, backlog: 0 }
            },
            {
                id: 3,
                name: "CloudNine Systems",
                logo: "CN",
                jobRole: "DevOps Engineer",
                ctc: "10-14 LPA",
                location: "Hyderabad, Chennai",
                deadline: "2026-04-20",
                eligibility: { cgpa: 7.0, tenth: 70, twelfth: 70, backlog: 0 }
            },
            {
                id: 4,
                name: "FinTech Innovations",
                logo: "FT",
                jobRole: "Software Engineer",
                ctc: "15-18 LPA",
                location: "Mumbai, Pune",
                deadline: "2026-04-05",
                eligibility: { cgpa: 8.0, tenth: 80, twelfth: 80, backlog: 0 }
            },
            {
                id: 5,
                name: "MobileFirst Apps",
                logo: "MF",
                jobRole: "Mobile Developer",
                ctc: "9-12 LPA",
                location: "Bangalore",
                deadline: "2026-04-12",
                eligibility: { cgpa: 7.0, tenth: 70, twelfth: 70, backlog: 0 }
            }
        ];

        const found = sampleCompanies.find(c => c.id === parseInt(companyId)) || sampleCompanies[0];
        setCompany(found);
    };



    const handleInputChange = (field, value) => {
        setApplicationData({ ...applicationData, [field]: value });
    };

    const handleReferenceChange = (index, field, value) => {
        const updatedReferences = [...applicationData.references];
        updatedReferences[index][field] = value;
        setApplicationData({ ...applicationData, references: updatedReferences });
    };

    const addReference = () => {
        setApplicationData({
            ...applicationData,
            references: [...applicationData.references, { name: "", relation: "", contact: "" }]
        });
    };

    const removeReference = (index) => {
        const updatedReferences = applicationData.references.filter((_, i) => i !== index);
        setApplicationData({ ...applicationData, references: updatedReferences });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const studentKey = getStudentStorageKey(user);
        if (!studentKey) {
            setIsSubmitting(false);
            alert("Unable to identify your account. Please log in again.");
            return;
        }

        // Save application to localStorage
        const applications = JSON.parse(localStorage.getItem(`applications_${studentKey}`) || "[]");
        applications.push({
            id: Date.now(),
            companyId: company.id,
            companyName: company.name,
            jobRole: company.jobRole,
            appliedDate: new Date().toISOString(),
            status: "Applied",
            applicationData: applicationData
        });
        localStorage.setItem(`applications_${studentKey}`, JSON.stringify(applications));

        setIsSubmitting(false);
        setSubmitSuccess(true);
    };

    const renderStep1 = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "#f7fafc", padding: "1.25rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                    📋 Profile Verification
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "1rem" }}>
                    Please verify that your profile information is complete and accurate before applying.
                </p>

                <div style={{ display: "grid", gap: "0.75rem" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        border: `2px solid ${verificationStatus.personal ? "#38a169" : "#e53e3e"}`
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: verificationStatus.personal ? "#38a169" : "#e53e3e",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.875rem"
                            }}>
                                {verificationStatus.personal ? "✓" : "!"}
                            </span>
                            <div>
                                <p style={{ fontWeight: 500, color: "#2d3748" }}>Personal Information</p>
                                <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                    {verificationStatus.personal ? "Complete" : "Incomplete - Please fill in your profile"}
                                </p>
                            </div>
                        </div>
                        {!verificationStatus.personal && (
                            <button
                                onClick={() => navigate("/student/profile")}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#3182ce",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.75rem",
                                    cursor: "pointer"
                                }}
                            >
                                Complete
                            </button>
                        )}
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        border: `2px solid ${verificationStatus.education ? "#38a169" : "#e53e3e"}`
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: verificationStatus.education ? "#38a169" : "#e53e3e",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.875rem"
                            }}>
                                {verificationStatus.education ? "✓" : "!"}
                            </span>
                            <div>
                                <p style={{ fontWeight: 500, color: "#2d3748" }}>Education Details</p>
                                <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                    {verificationStatus.education ? "Complete" : "Incomplete - Please add education details"}
                                </p>
                            </div>
                        </div>
                        {!verificationStatus.education && (
                            <button
                                onClick={() => navigate("/student/profile")}
                                style={{
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "#3182ce",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.75rem",
                                    cursor: "pointer"
                                }}
                            >
                                Complete
                            </button>
                        )}
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        border: `2px solid ${verificationStatus.documents ? "#38a169" : "#ecc94b"}`
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: verificationStatus.documents ? "#38a169" : "#ecc94b",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.875rem"
                            }}>
                                {verificationStatus.documents ? "✓" : "!"}
                            </span>
                            <div>
                                <p style={{ fontWeight: 500, color: "#2d3748" }}>Documents</p>
                                <p style={{ fontSize: "0.75rem", color: "#718096" }}>
                                    Resume and grade card upload recommended
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate("/student/profile")}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#3182ce",
                                color: "white",
                                border: "none",
                                borderRadius: "0.375rem",
                                fontSize: "0.75rem",
                                cursor: "pointer"
                            }}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: "#f7fafc", padding: "1.25rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                    📊 Eligibility Check
                </h3>
                {company && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
                        <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>Required CGPA</p>
                            <p style={{ fontWeight: 600, color: "#2d3748" }}>{company.eligibility.cgpa}+</p>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>10th Percentage</p>
                            <p style={{ fontWeight: 600, color: "#2d3748" }}>{company.eligibility.tenth}%+</p>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>12th Percentage</p>
                            <p style={{ fontWeight: 600, color: "#2d3748" }}>{company.eligibility.twelfth}%+</p>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "0.75rem", borderRadius: "0.5rem" }}>
                            <p style={{ fontSize: "0.75rem", color: "#718096" }}>Active Backlogs</p>
                            <p style={{ fontWeight: 600, color: "#2d3748" }}>{company.eligibility.backlog}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Preferred Location
                </label>
                <select
                    value={applicationData.preferredLocation}
                    onChange={(e) => handleInputChange("preferredLocation", e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem"
                    }}
                >
                    <option value="">Select preferred location</option>
                    {company && company.location.split(", ").map((loc, idx) => (
                        <option key={idx} value={loc}>{loc}</option>
                    ))}
                    <option value="any">Any location</option>
                </select>
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Expected CTC (in LPA)
                </label>
                <input
                    type="text"
                    value={applicationData.expectedCTC}
                    onChange={(e) => handleInputChange("expectedCTC", e.target.value)}
                    placeholder="e.g., 12"
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem"
                    }}
                />
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Earliest Joining Date
                </label>
                <input
                    type="date"
                    value={applicationData.joiningDate}
                    onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem"
                    }}
                />
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Cover Letter / Why should we hire you?
                </label>
                <textarea
                    value={applicationData.coverLetter}
                    onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                    rows="5"
                    placeholder="Write a brief cover letter explaining why you're a good fit for this role..."
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        resize: "vertical"
                    }}
                />
            </div>

            <div>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#4a5568", marginBottom: "0.5rem" }}>
                    Additional Information (Optional)
                </label>
                <textarea
                    value={applicationData.additionalInfo}
                    onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                    rows="3"
                    placeholder="Any other information you'd like to share..."
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        resize: "vertical"
                    }}
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                    References (Optional)
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#718096", marginBottom: "1rem" }}>
                    Add professional references who can vouch for your skills and experience.
                </p>

                {applicationData.references.map((ref, index) => (
                    <div key={index} style={{ backgroundColor: "#f7fafc", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                            <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748" }}>Reference {index + 1}</h4>
                            {applicationData.references.length > 1 && (
                                <button
                                    onClick={() => removeReference(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#e53e3e",
                                        cursor: "pointer",
                                        fontSize: "0.875rem"
                                    }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <div style={{ display: "grid", gap: "0.75rem" }}>
                            <input
                                type="text"
                                value={ref.name}
                                onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                                placeholder="Reference Name"
                                style={{
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                            <input
                                type="text"
                                value={ref.relation}
                                onChange={(e) => handleReferenceChange(index, "relation", e.target.value)}
                                placeholder="Relationship (e.g., Professor, Manager)"
                                style={{
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                            <input
                                type="text"
                                value={ref.contact}
                                onChange={(e) => handleReferenceChange(index, "contact", e.target.value)}
                                placeholder="Contact Number / Email"
                                style={{
                                    padding: "0.625rem",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "0.375rem",
                                    fontSize: "0.875rem"
                                }}
                            />
                        </div>
                    </div>
                ))}

                <button
                    onClick={addReference}
                    style={{
                        padding: "0.625rem 1rem",
                        backgroundColor: "#e2e8f0",
                        color: "#4a5568",
                        border: "none",
                        borderRadius: "0.375rem",
                        cursor: "pointer",
                        fontSize: "0.875rem"
                    }}
                >
                    + Add Another Reference
                </button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div style={{ display: "grid", gap: "1.5rem" }}>
            <div style={{ backgroundColor: "#f7fafc", padding: "1.25rem", borderRadius: "0.75rem" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#2d3748", marginBottom: "1rem" }}>
                    Application Summary
                </h3>

                <div style={{ display: "grid", gap: "1rem" }}>
                    <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>
                            Company Details
                        </h4>
                        {company && (
                            <div style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                                <p><strong>Company:</strong> {company.name}</p>
                                <p><strong>Role:</strong> {company.jobRole}</p>
                                <p><strong>CTC:</strong> {company.ctc}</p>
                            </div>
                        )}
                    </div>

                    <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>
                            Your Preferences
                        </h4>
                        <div style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                            <p><strong>Preferred Location:</strong> {applicationData.preferredLocation || "Not specified"}</p>
                            <p><strong>Expected CTC:</strong> {applicationData.expectedCTC || "Not specified"} LPA</p>
                            <p><strong>Joining Date:</strong> {applicationData.joiningDate || "Not specified"}</p>
                        </div>
                    </div>

                    {applicationData.coverLetter && (
                        <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem" }}>
                            <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2d3748", marginBottom: "0.5rem" }}>
                                Cover Letter
                            </h4>
                            <p style={{ fontSize: "0.875rem", color: "#4a5568", whiteSpace: "pre-wrap" }}>
                                {applicationData.coverLetter}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={applicationData.agreeToTerms}
                        onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                        style={{ marginTop: "0.25rem" }}
                    />
                    <span style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                        I agree to the terms and conditions of the placement process and understand that providing false information may result in disqualification.
                    </span>
                </label>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        checked={applicationData.confirmAccuracy}
                        onChange={(e) => handleInputChange("confirmAccuracy", e.target.checked)}
                        style={{ marginTop: "0.25rem" }}
                    />
                    <span style={{ fontSize: "0.875rem", color: "#4a5568" }}>
                        I confirm that all the information provided in my profile and this application is accurate and true to the best of my knowledge.
                    </span>
                </label>
            </div>
        </div>
    );

    const steps = [
        { number: 1, label: "Verify Profile" },
        { number: 2, label: "Application Details" },
        { number: 3, label: "References" },
        { number: 4, label: "Review & Submit" }
    ];

    if (submitSuccess) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
                <StudentSidebar />
                <main style={{ flex: 1, marginLeft: "260px", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
                    <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "#1a1f2e", borderRadius: "1rem", border: "1px solid #2d3448" }}>
                        <div style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#27ae60",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1.5rem",
                            fontSize: "2.5rem"
                        }}>
                            ✓
                        </div>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                            Application Submitted Successfully!
                        </h2>
                        <p style={{ color: "#a0aec0", marginBottom: "1.5rem" }}>
                            Your application for {company?.name} has been submitted. You can track its status in the Applications section.
                        </p>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                            <button
                                onClick={() => navigate("/student/applications")}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#3b6ef8",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 600
                                }}
                            >
                                View My Applications
                            </button>
                            <button
                                onClick={() => navigate("/student/companies")}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#242938",
                                    color: "#e2e8f0",
                                    border: "1px solid #2d3448",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem"
                                }}
                            >
                                Browse More Companies
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <StudentSidebar />

            {/* Main Content */}
            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                {company && (
                    <div style={{
                        backgroundColor: "#1a1f2e",
                        borderRadius: "0.75rem",
                        padding: "1.5rem",
                        marginBottom: "1.5rem",
                        border: "1px solid #2d3448"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#3b6ef8",
                                borderRadius: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "1.5rem",
                                fontWeight: 700
                            }}>
                                {company.logo}
                            </div>
                            <div>
                                <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#e2e8f0" }}>{company.name}</h1>
                                <p style={{ color: "#a0aec0", fontSize: "0.875rem" }}>{company.jobRole}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Steps */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
                    {steps.map((s, index) => (
                        <div key={s.number} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: step >= s.number ? "#3b6ef8" : "#2d3448",
                                    color: step >= s.number ? "white" : "#718096",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 600,
                                    fontSize: "0.875rem"
                                }}>
                                    {step > s.number ? "✓" : s.number}
                                </div>
                                <span style={{
                                    fontSize: "0.75rem",
                                    color: step >= s.number ? "#3b6ef8" : "#718096",
                                    marginTop: "0.5rem",
                                    textAlign: "center"
                                }}>
                                    {s.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div style={{
                                    flex: 1,
                                    height: "2px",
                                    backgroundColor: step > s.number ? "#3b6ef8" : "#2d3448",
                                    margin: "0 0.5rem",
                                    marginBottom: "1.5rem"
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <div style={{
                    backgroundColor: "#1a1f2e",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    border: "1px solid #2d3448"
                }}>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                    {step === 4 && renderStep4()}

                    {/* Navigation Buttons */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
                        <button
                            onClick={() => setStep(step - 1)}
                            disabled={step === 1}
                            style={{
                                padding: "0.75rem 1.5rem",
                                backgroundColor: step === 1 ? "#2d3448" : "#4a5568",
                                color: step === 1 ? "#718096" : "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: step === 1 ? "not-allowed" : "pointer",
                                fontSize: "0.875rem"
                            }}
                        >
                            Previous
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: "#3b6ef8",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 600
                                }}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!applicationData.agreeToTerms || !applicationData.confirmAccuracy || isSubmitting}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    backgroundColor: (!applicationData.agreeToTerms || !applicationData.confirmAccuracy || isSubmitting) ? "#4a5568" : "#27ae60",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: (!applicationData.agreeToTerms || !applicationData.confirmAccuracy || isSubmitting) ? "not-allowed" : "pointer",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem"
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span>Submitting...</span>
                                        <span style={{ animation: "spin 1s linear infinite" }}>⟳</span>
                                    </>
                                ) : (
                                    "Submit Application"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Apply;
