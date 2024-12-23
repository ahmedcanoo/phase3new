import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('adminId');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.welcomeMessage}><b>Welcome, Admin!</b></p>

      <div style={styles.linkContainer}>
        <Link to="/admin/orders" style={styles.linkButton}>
          View Orders
        </Link>
        <Link to="/admin/assigned-orders" style={styles.linkButton}>
          Assigned Orders
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

export default AdminDashboard;
