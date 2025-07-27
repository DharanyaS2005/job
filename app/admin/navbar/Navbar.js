'use client';
import { useRouter } from 'next/navigation';
import './navbar.css';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">Admin Dashboard</span>
      </div>
      <ul className="navbar-right">
        <li onClick={() => router.push('/admin/jobs')}>Home</li>
        <li onClick={() => router.push('/admin/profile')}>Profile</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
}
