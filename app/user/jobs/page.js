'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../user/navbar/Navbar';
import './jobs.css';

export default function UserJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found');
      setLoading(false);
      return;
    }

    fetch('/api/jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="jobs-container">
        <h2 className="jobs-title">Available Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="job-title">{job.title}</div>
              <div className="job-description">{job.description}</div>
              <Link href={`/user/apply/${job._id}`} className="apply-link">
                Apply
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
