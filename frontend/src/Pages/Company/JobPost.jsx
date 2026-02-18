// This is the page where recruiters land after logging in.
// Recruiters will use this page to post new job openings for students.
const JobPost = () => {
    return (
        <div className="p-8">
            {/* Main Heading to identify the page */}
            <h1 className="text-3xl font-bold text-green-700">Recruiter Dashboard - Job Post</h1>
            <h2 className="text-xl mt-2 text-gray-500">Redirect Successful! ✅</h2>
            <p className="mt-4">Here you will be able to fill out forms to create new job listings.</p>
        </div>
    );
};

export default JobPost;
