import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, formData);
      const { userId, username, message } = response.data;
  
      setMessage(message);
      setFormData({ email: '', password: '' });
  
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
  
      navigate('/home');
    } catch (error) {
      console.error(error);
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder='Enter your email'
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder='Enter your password'
              required 
            />
          </div>
          <button type="submit" className="primary-button">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="register-link">
          Don’t have an account? <a href="/">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;