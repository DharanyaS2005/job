'use client';
import { useEffect, useState } from 'react';
import './profile.css';
import Navbar from '../navbar/Navbar';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('https://job-m75o.onrender.com/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <Navbar/>
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Degree:</strong> {user.degree}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
    </div>
  );
}
