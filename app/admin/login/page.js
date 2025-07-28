'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/admin/jobs');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('https://job-m75o.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        router.push('/admin/jobs');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Login request failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Admin Login</h2>
      <input
        className="login-input"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
}
