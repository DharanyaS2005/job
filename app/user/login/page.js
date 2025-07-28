'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'user' }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      router.push('/user/jobs');
    } else {
      alert(data.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">User Login</h2>
      <input
        type="email"
        className="login-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="signup-link">
        {"Don't have an account?"}{' '}
        <span onClick={() => router.push('/user/signup')} className="link-text">
          Create new account
        </span>
      </p>
    </div>
  );
}
