// This acts as the main landing page for students after login.
// It will eventually show key metrics like upcoming drives, application status, etc.
const StudentDashboard = () => {
    return (
        <div className="p-8">
            {/* Main Heading to identify the page */}
            <h1 className="text-3xl font-bold text-blue-700">Student Dashboard - Redirect Successful! ✅</h1>
            <p className="mt-4 text-gray-600">Welcome to your dashboard. This is where you will see your stats.</p>
        </div>
    );
};

export default StudentDashboard;
