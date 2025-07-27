'use client';
import { useRouter } from 'next/navigation';
import './navbar.css';

export default function UserNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the stored token
    router.push('/user/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">User Dashboard</span>
      </div>
      <ul className="navbar-right">
        <li onClick={() => router.push('/user/jobs')}>Home</li>
        <li onClick={() => router.push('/user/about')}>About</li>
        <li onClick={() => router.push('/user/profile')}>Profile</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
}
