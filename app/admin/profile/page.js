'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/Navbar';
import './profile.css';
import Image from 'next/image';
export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin/login');
    }
  }, [router]);
  return (
    <div>
      <Navbar /> 
    <div className="profile-container">
      <div className="profile-card">
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="Profile"
          className="profile-img"
        />
        <h2 className="profile-name">DHARANYA S</h2>
        <p className="profile-role">Internal Job Board Admin</p>
        <div className="profile-info">
          <p><strong>Email:</strong> admin@gmail.com</p>
          <p><strong>Department:</strong> HR</p>
          <p><strong>Location:</strong> Bangalore, India</p>
        </div>
      </div>
    </div>
    </div>
  );
}
