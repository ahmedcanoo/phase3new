import React from 'react';
import AdminLogin from './AdminLogin';

function AdminLoginPage() {
  return (
    <div>
      <h1>Courier Login</h1>
      <AdminLogin />
      <p>Don't have an account? 
      <a href="/register-courier">Register here</a></p>
    </div>
  );
}

export default CourierLoginPage;
