import { useState, useEffect } from "react";
import RecruiterSidebar from "../../Components/layouts/RecruiterSidebar";

const EventScheduling = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        eventName: "",
        eventType: "talk",
        date: "",
        time: "",
        location: "",
        duration: "",
        speaker: "",
        description: "",
        capacity: ""
    });
    const [submissionMessage, setSubmissionMessage] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("recruiter_events");
        if (saved) {
            setEvents(JSON.parse(saved));
        } else {
            // Sample events
            const sampleEvents = [
                {
                    id: 1,
                    eventName: "Tech Talk - Cloud Technologies",
                    eventType: "talk",
                    date: "2026-03-25",
                    time: "14:00",
                    location: "Auditorium A",
                    duration: "60",
                    speaker: "John Smith",
                    description: "An introduction to cloud computing and AWS",
                    capacity: 200,
                    registrations: 45
                },
                {
                    id: 2,
                    eventName: "Online Coding Assessment",
                    eventType: "test",
                    date: "2026-03-27",
                    time: "10:00",
                    location: "HackerEarth Platform",
                    duration: "180",
                    speaker: "Recruitment Team",
                    description: "Online assessment with 5 coding problems",
                    capacity: 100,
                    registrations: 67
                },
                {
                    id: 3,
                    eventName: "Interview Round 1",
                    eventType: "interview",
                    date: "2026-03-28",
                    time: "15:00",
                    location: "Meeting Rooms A-D",
                    duration: "30",
                    speaker: "Tech Team",
                    description: "One-on-one technical interview round",
                    capacity: 20,
                    registrations: 18
                }
            ];
            setEvents(sampleEvents);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            id: Date.now(),
            ...formData,
            capacity: parseInt(formData.capacity),
            registrations: 0
        };

        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem("recruiter_events", JSON.stringify(updatedEvents));

        setSubmissionMessage("Event scheduled successfully! ✓");
        setFormData({
            eventName: "",
            eventType: "talk",
            date: "",
            time: "",
            location: "",
            duration: "",
            speaker: "",
            description: "",
            capacity: ""
        });

        setTimeout(() => setSubmissionMessage(""), 3000);
    };

    const getEventTypeColor = (type) => {
        const colors = {
            talk: "#3b6ef8",
            test: "#e67e22",
            interview: "#27ae60",
            workshop: "#9f7aea"
        };
        return colors[type] || "#718096";
    };

    const getEventTypeLabel = (type) => {
        const labels = {
            talk: "Talk",
            test: "Test",
            interview: "Interview",
            workshop: "Workshop"
        };
        return labels[type] || type;
    };

    const getCapacityPercentage = (registrations, capacity) => {
        return (registrations / capacity) * 100;
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#0f1117", display: "flex" }}>
            <RecruiterSidebar />

            <main style={{ flex: 1, marginLeft: "260px", padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                            Schedule Events
                        </h1>
                        <p style={{ color: "#718096" }}>Organize talks, tests, and interviews.</p>
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
                        {showForm ? "Cancel" : "Schedule Event"}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div style={{ backgroundColor: "#1a1f2e", borderRadius: "0.75rem", padding: "2rem", border: "1px solid #2d3448", marginBottom: "2rem" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem" }}>
                            Create New Event
                        </h2>

                        {submissionMessage && (
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "#f0fff4",
                                border: "1px solid #9ae6b4",
                                borderRadius: "0.5rem",
                                color: "#22543d",
                                marginBottom: "1.5rem"
                            }}>
                                {submissionMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Event Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="eventName"
                                        value={formData.eventName}
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
                                        placeholder="e.g., Tech Talk - AI & ML"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Event Type *
                                    </label>
                                    <select
                                        name="eventType"
                                        value={formData.eventType}
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
                                        <option value="talk">Talk</option>
                                        <option value="test">Test</option>
                                        <option value="interview">Interview</option>
                                        <option value="workshop">Workshop</option>
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
                                        placeholder="e.g., Auditorium A"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Duration (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
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
                                        placeholder="e.g., 60"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Speaker/Host *
                                    </label>
                                    <input
                                        type="text"
                                        name="speaker"
                                        value={formData.speaker}
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
                                        placeholder="Name of speaker or host"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: "block", color: "#e2e8f0", marginBottom: "0.5rem", fontWeight: 500 }}>
                                        Capacity *
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
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
                                        placeholder="e.g., 200"
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
                                    placeholder="Event details and agenda..."
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
                                Schedule Event
                            </button>
                        </form>
                    </div>
                )}

                {/* Events Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "1.5rem" }}>
                    {events.map(event => {
                        const typeColor = getEventTypeColor(event.eventType);
                        const capacityPercentage = getCapacityPercentage(event.registrations, event.capacity);
                        const daysUntilEvent = Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24));
                        return (
                            <div
                                key={event.id}
                                style={{
                                    backgroundColor: "#1a1f2e",
                                    borderRadius: "0.75rem",
                                    padding: "1.5rem",
                                    border: "1px solid #2d3448",
                                    borderTop: `4px solid ${typeColor}`
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.5rem" }}>
                                            {event.eventName}
                                        </h3>
                                        <span style={{
                                            display: "inline-block",
                                            padding: "0.25rem 0.75rem",
                                            backgroundColor: typeColor,
                                            color: "white",
                                            borderRadius: "4px",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                            textTransform: "uppercase"
                                        }}>
                                            {getEventTypeLabel(event.eventType)}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: "0.875rem",
                                        color: daysUntilEvent <= 1 ? "#e74c3c" : "#a0aec0",
                                        fontWeight: 500
                                    }}>
                                        {daysUntilEvent} days left
                                    </span>
                                </div>

                                <div style={{ marginBottom: "1rem" }}>
                                    <p style={{ color: "#a0aec0", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                                        📅 {event.date} at {event.time}
                                    </p>
                                    <p style={{ color: "#a0aec0", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                                        📍 {event.location}
                                    </p>
                                    <p style={{ color: "#a0aec0", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                                        👤 {event.speaker} • ⏱️ {event.duration} min
                                    </p>
                                </div>

                                <p style={{ color: "#718096", fontSize: "0.875rem", lineHeight: "1.5", marginBottom: "1rem" }}>
                                    {event.description}
                                </p>

                                <div style={{ marginBottom: "1rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                        <p style={{ fontSize: "0.875rem", color: "#a0aec0" }}>Registrations</p>
                                        <p style={{ fontSize: "0.875rem", color: "#e2e8f0", fontWeight: 600 }}>
                                            {event.registrations} / {event.capacity}
                                        </p>
                                    </div>
                                    <div style={{ height: "8px", backgroundColor: "#242938", borderRadius: "9999px", overflow: "hidden" }}>
                                        <div style={{
                                            height: "100%",
                                            width: `${capacityPercentage}%`,
                                            backgroundColor: capacityPercentage > 90 ? "#e74c3c" : "#27ae60",
                                            borderRadius: "9999px"
                                        }} />
                                    </div>
                                </div>

                                <button
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem",
                                        backgroundColor: "#3b6ef8",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "0.375rem",
                                        cursor: "pointer",
                                        fontSize: "0.95rem",
                                        fontWeight: 500,
                                        transition: "opacity 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                                >
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>

                {events.length === 0 && !showForm && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
                        <p>No events scheduled yet. Schedule your first event!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EventScheduling;
