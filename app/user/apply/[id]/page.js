'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import './apply.css';
import Navbar from '../../navbar/Navbar';

export default function ApplyJob() {
  const { id: jobId } = useParams(); 

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    college: '',
    cgpa: '',
    resume: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setForm((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('jobId', jobId);

    const res = await fetch('https://job-m75o.onrender.com/api/applications', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) alert('Application submitted!');
    else alert('Failed to submit application');
  };

  return (
    <div>
      <Navbar />
      <div className="apply-container">
        <h2>Job Application</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="apply-form">
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleChange} />
          <input type="text" name="college" placeholder="College Name" onChange={handleChange} required />
          <input type="text" name="cgpa" placeholder="CGPA" onChange={handleChange} required />
          <input type="file" name="resume" accept=".pdf" onChange={handleChange} required />
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
}
