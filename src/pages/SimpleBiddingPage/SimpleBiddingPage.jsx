import React, { useState } from 'react';
import './SimpleBiddingPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const SimpleBiddingPage = () => {
  // State for Jobs
  const [jobs, setJobs] = useState([]);

  // Temporary state for the Job Post Form
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    location: '',
  });

  // ----------------------------
  // Handlers for Job Form
  // ----------------------------
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const postJob = (e) => {
    e.preventDefault();
    // Create a new job object
    const job = {
      ...newJob,
      id: Date.now().toString(), // unique ID
    };
    // Add to jobs array
    setJobs((prevJobs) => [...prevJobs, job]);

    // Reset form
    setNewJob({
      title: '',
      description: '',
      budget: '',
      deadline: '',
      location: '',
    });
  };

  return (
    <>
      <Header />
      <div className="bidding-container">
        <h1>Bidding System</h1>

        {/* Job Post Form */}
        <div className="job-post-form">
          <h2>Create Job Posting</h2>
          <form onSubmit={postJob}>
            <input
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleJobInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={newJob.description}
              onChange={handleJobInputChange}
              required
            />
            <input
              name="budget"
              placeholder="Budget"
              type="number"
              value={newJob.budget}
              onChange={handleJobInputChange}
              required
            />
            <input
              name="deadline"
              placeholder="Deadline"
              type="date"
              value={newJob.deadline}
              onChange={handleJobInputChange}
              required
            />
            <input
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleJobInputChange}
              required
            />
            <button type="submit">Post Job</button>
          </form>
        </div>

        {/* Job Listing */}
        <div className="job-list">
          <h2>Available Jobs</h2>
          {jobs.length === 0 && <p>No jobs have been posted yet.</p>}
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Budget:</strong> {job.budget}
              </p>
              <p>
                <strong>Deadline:</strong> {job.deadline}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SimpleBiddingPage;
