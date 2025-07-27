'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './signup.css';

export default function UserSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    college: '',
    degree: ''
  });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/user/login');
    else alert(await res.text());
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">User Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="signup-input" />
      <input name="email" placeholder="Email" onChange={handleChange} className="signup-input" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="signup-input" />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} className="signup-input" />
      <input name="gender" placeholder="Gender" onChange={handleChange} className="signup-input" />
      <input name="college" placeholder="College" onChange={handleChange} className="signup-input" />
      <input name="degree" placeholder="Degree" onChange={handleChange} className="signup-input" />
      <button className="signup-button" onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
