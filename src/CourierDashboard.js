import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CourierDashboard() {
  const [courierName, setCourierName] = useState('');
  const navigate = useNavigate(); // useNavigate hook to redirect

  useEffect(() => {
    const courier = localStorage.getItem('courierName'); // Assume courier's name is stored in localStorage upon login
    if (courier) {
      setCourierName(courier);
    } else {
      // Handle case where courier name is not found (e.g., redirect to login)
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('courierName');
    localStorage.removeItem('courierEmail');
    navigate('/'); // Redirect to the homepage or login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Courier Dashboard</h1>
      <p style={styles.welcomeMessage}>Welcome, {courierName}!</p>

      <div style={styles.linkContainer}>
        <Link to="/courier-orders" style={styles.linkButton}>
          My Assigned Orders
        </Link>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5em',
    color: '#3498db',
    marginBottom: '20px',
  },
  welcomeMessage: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '30px',
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  linkButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CourierDashboard;
