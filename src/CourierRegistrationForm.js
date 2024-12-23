import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

function CourierRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    vehicleType: '', 
    plateNumber: '', 
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
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register-courier`, formData);
      setMessage(response.data); 
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        vehicleType: '',
        plateNumber: '',
      });
      navigate('/login-courier');
    } catch (error) {
      console.error(error);
      setMessage('Failed to register courier'); 
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <h2>Courier Registration</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder='Enter your name'
            required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder='Enter your email'
            required />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder='Enter your phone number'
            required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder='Enter your password'
            required />
          </div>
          <div className="form-group">
            <label>Vehicle Type:</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required>
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div className="form-group">
            <label>Plate Number:</label>
            <input type="text" name="plateNumber" 
            value={formData.plateNumber} 
            onChange={handleChange} 
            placeholder='Enter your vehicle plate number'
            required />
          </div>
          <button type="submit" className="primary-button">Register Courier</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="register-link">
          Already have an account? <a href="/login-courier">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default CourierRegistrationForm;