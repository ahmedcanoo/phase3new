import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function WelcomePage() {
  const navigate = useNavigate();

  const handleUserRedirect = () => {
    navigate('/register');
  };

  const handleSignInRedirect = () => {
    navigate('/login');
  };
  const handleCourierRedirect = () => {
    navigate('/register-courier');
  };

  const handleAdminRedirect = () => {
    navigate('/admin-login');
  };

  return (
    <div className="welcome-page">
      <div className="login-panel">
        <h2>Welcome!</h2>
        <p>Please choose your role:</p>
        <div className="buttonsContainer">
          <button onClick={handleUserRedirect}>User</button>
          <button onClick={handleCourierRedirect}>Courier</button>
          <button onClick={handleAdminRedirect}>Admin</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;