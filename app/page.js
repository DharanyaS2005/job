'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  // Prevent any body margin if needed inside useEffect
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  const handleRedirect = (role) => {
    if (role === 'admin') {
      router.push('/admin/login');
    } else if (role === 'user') {
      router.push('/user/login');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Internal Job Board</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleRedirect('admin')}>Admin</button>
        <button style={styles.button} onClick={() => handleRedirect('user')}>User</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f2f5',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    overflow: 'hidden',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 20px',
    fontSize: '15px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    width:'100px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  },
};
