'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/Navbar';
import './job.css';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [applicants, setApplicants] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const router = useRouter();
  

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin/login');
    }
  }, []);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
  try {
    const res = await fetch('/api/jobs');
    const data = await res.json();

    if (Array.isArray(data)) {
      setJobs(data);
    } else {
      console.error('Expected jobs to be an array, got:', data);
      setJobs([]); 
    }
  } catch (err) {
    console.error('Error fetching jobs:', err);
    setJobs([]);
  }
};


const handleAdd = async () => {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, email: 'admin@gmail.com' }),
  });

  if (res.ok) {
    fetchJobs();
    setTitle('');
    setDescription('');
  } else {
    const error = await res.json();
    console.error('Add job failed:', error.error || 'Unknown error');
  }
};


  const handleDelete = async (id) => {
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  const handleViewApplicants = async (jobId) => {
    setSelectedJobId(jobId);
    const token = localStorage.getItem('token');

const res = await fetch(`/api/applicants?jobId=${jobId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

    const data = await res.json();

    if (Array.isArray(data)) {
      setApplicants(data);
    } else {
      setApplicants([]);
      console.error('Applicants response is not an array:', data);
    }
  };
const selectedJob = jobs.find(job => job._id === selectedJobId);

  return (
    <div>
     <Navbar />

      <div className="container">
        <h2>Manage Job Openings</h2>

        <div className="input-group">
          <input
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleAdd}>Add Job</button>
        </div>

        <div className="jobs-list">
         {Array.isArray(jobs) && jobs.length > 0 ? (
  jobs.map((job) => (
    <div className="job-card" key={job._id}>
      <div className="job-header">
        <h3>{job.title}</h3>
        <div className="job-actions">
          <button onClick={() => handleDelete(job._id)}>Delete</button>
          <button onClick={() => handleViewApplicants(job._id)}>View Applicants</button>
        </div>
      </div>
      <p>{job.description}</p>
    </div>
  ))
) : (
  <p>No jobs available</p>
)}

        </div>

        {selectedJobId && (
          <div className="applicants-section">
            <h3>Applicants for: {selectedJob?.title || selectedJobId}</h3>

            {applicants.length > 0 ? (
              <ul>
                {applicants.map((applicant, index) => (
                  <li key={index}>
                    Name: {applicant.name} | Email: {applicant.email} | 
                    {applicant.resumeUrl && (
                      <a
                        href={applicant.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                         View Resume
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applicants found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
