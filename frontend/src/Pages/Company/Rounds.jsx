import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const PlacementRounds = () => {
    const [rounds, setRounds] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        roundName: "",
        roundType: "Technical",
        date: "",
        time: "",
        location: "",
        maxCandidates: "",
        description: ""
    });
    const [selectedRound, setSelectedRound] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("recruiter_rounds");
        if (saved) {
            setRounds(JSON.parse(saved));
        } else {
            // Sample rounds data
            const sampleRounds = [
                {
                    id: 1,
                    roundName: "Online Assessment",
                    roundType: "Technical",
                    date: "2026-03-25",
                    time: "10:00",
                    location: "HackerEarth Platform",
                    maxCandidates: 50,
                    description: "Online coding assessment with 5 problems",
                    status: "Scheduled",
                    participantCount: 0
                },
                {
                    id: 2,
                    roundName: "Technical Interview Round 1",
                    roundType: "Interview",
                    date: "2026-03-27",
                    time: "14:00",
                    location: "Meeting Room A",
                    maxCandidates: 10,
                    description: "One-on-one technical interview",
                    status: "Scheduled",
                    participantCount: 0
                }
            ];
            setRounds(sampleRounds);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRound = {
            id: Date.now(),
            ...formData,
            status: "Scheduled",
            participantCount: 0
        };

        const updatedRounds = [...rounds, newRound];
        setRounds(updatedRounds);
        localStorage.setItem("recruiter_rounds", JSON.stringify(updatedRounds));

        setFormData({
            roundName: "",
            roundType: "Technical",
            date: "",
            time: "",
            location: "",
            maxCandidates: "",
            description: ""
        });
        setShowForm(false);
    };

    const getRoundTypeColor = (type) => {
        const colors = {
            "Technical": "#3b6ef8",
            "Interview": "#27ae60",
            "Group Discussion": "#e67e22",
            "HR Round": "#9f7aea",
            "Assessment": "#e74c3c"
        };
        return colors[type] || "#718096";
    };

    const getStatusColor = (status) => {
        const colors = {
            "Scheduled": { bg: "#ebf8ff", text: "#2b6cb0" },
            "In Progress": { bg: "#faf5ff", text: "#805ad5" },
            "Completed": { bg: "#f0fff4", text: "#38a169" },
            "Cancelled": { bg: "#fed7d7", text: "#c53030" }
        };
        return colors[status] || { bg: "#edf2f7", text: "#4a5568" };
    };

    const updateRoundStatus = (roundId, newStatus) => {
        setRounds(rounds.map(r => r.id === roundId ? { ...r, status: newStatus } : r));
        setShowDetailModal(false);
    };

    const deleteRound = (roundId) => {
        setRounds(rounds.filter(r => r.id !== roundId));
        setShowDetailModal(false);
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                            Placement Rounds
                        </h1>
                        <p style={{ color: "#718096" }}>Schedule and manage placement rounds.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            padding: "0.875rem 1.5rem",
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
                        {showForm ? "Cancel" : "Create Round"}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "2rem", border: "1px solid #2d3448", marginBottom: "2rem" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                            Create New Round
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Round Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="roundName"
                                        value={formData.roundName}
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
                                        placeholder="e.g., Technical Round 1"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Round Type *
                                    </label>
                                    <select
                                        name="roundType"
                                        value={formData.roundType}
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
                                        <option value="Technical">Technical</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Group Discussion">Group Discussion</option>
                                        <option value="HR Round">HR Round</option>
                                        <option value="Assessment">Assessment</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
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
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
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
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Location/Platform *
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
                                        placeholder="e.g., Meeting Room A"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Max Candidates *
                                    </label>
                                    <input
                                        type="number"
                                        name="maxCandidates"
                                        value={formData.maxCandidates}
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
                                        placeholder="e.g., 50"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
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
                                    placeholder="Add any additional details about this round..."
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    padding: "0.875rem 2rem",
                                    backgroundColor: "#27ae60",
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
                                Create Round
                            </button>
                        </form>
                    </div>
                )}

                {/* Rounds List */}
                <div style={{ display: "grid", gap: "1.5rem" }}>
                    {rounds.map(round => {
                        const statusColor = getStatusColor(round.status);
                        const typeColor = getRoundTypeColor(round.roundType);
                        return (
                            <div
                                key={round.id}
                                style={{
                                    backgroundColor: "#1a1f2e",
                                    borderRadius: "0.75rem",
                                    padding: "1.5rem",
                                    border: "1px solid #2d3448",
                                    borderLeft: `4px solid ${typeColor}`
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                                            {round.roundName}
                                        </h3>
                                        <p style={{ color: "#a0aec0", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                                            {round.date} • {round.time}
                                        </p>
                                        <p style={{ color: "#a0aec0", fontSize: "0.875rem" }}>
                                            📍 {round.location}
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            backgroundColor: typeColor,
                                            color: "white",
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase"
                                        }}>
                                            {round.roundType}
                                        </span>
                                        <span style={{
                                            padding: "0.25rem 0.75rem",
                                            backgroundColor: statusColor.bg,
                                            color: statusColor.text,
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600
                                        }}>
                                            {round.status}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: "1rem" }}>
                                    <p style={{ color: "#718096", fontSize: "0.875rem", lineHeight: "1.5" }}>
                                        {round.description || "No description provided"}
                                    </p>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid #2d3448" }}>
                                    <p style={{ color: "#a0aec0", fontSize: "0.875rem" }}>
                                        Capacity: {round.participantCount} / {round.maxCandidates}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedRound(round);
                                            setShowDetailModal(true);
                                        }}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            backgroundColor: "#3b6ef8",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "0.375rem",
                                            cursor: "pointer",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            transition: "opacity 0.2s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {rounds.length === 0 && !showForm && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
                        <p>No rounds scheduled yet. Create your first placement round!</p>
                    </div>
                )}

                {/* Management Modal */}
                {showDetailModal && selectedRound && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: "#1a1f2e",
                            borderRadius: "0.75rem",
                            border: "1px solid #2d3448",
                            padding: "2rem",
                            maxWidth: "500px",
                            width: "90%"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e2e8f0" }}>
                                    {selectedRound.roundName}
                                </h2>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#a0aec0",
                                        fontSize: "1.5rem",
                                        cursor: "pointer"
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Type:</strong> {selectedRound.roundType}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Date & Time:</strong> {selectedRound.date} {selectedRound.time}
                                </p>
                                <p style={{ color: "#a0aec0", marginBottom: "0.5rem" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Location:</strong> {selectedRound.location}
                                </p>
                                <p style={{ color: "#a0aec0" }}>
                                    <strong style={{ color: "#e2e8f0" }}>Capacity:</strong> {selectedRound.participantCount} / {selectedRound.maxCandidates}
                                </p>
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.75rem", fontWeight: 600 }}>
                                    Update Status
                                </label>
                                <select
                                    defaultValue={selectedRound.status}
                                    onChange={(e) => updateRoundStatus(selectedRound.id, e.target.value)}
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
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    style={{
                                        padding: "0.75rem",
                                        backgroundColor: "#2d3448",
                                        color: "#e2e8f0",
                                        border: "1px solid #2d3448",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "0.95rem",
                                        fontWeight: 500,
                                        transition: "background-color 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "#3a4456"}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2d3448"}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => deleteRound(selectedRound.id)}
                                    style={{
                                        padding: "0.75rem",
                                        backgroundColor: "#c0392b",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.5rem",
                                        cursor: "pointer",
                                        fontSize: "0.95rem",
                                        fontWeight: 500,
                                        transition: "opacity 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    Delete Round
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PlacementRounds;
