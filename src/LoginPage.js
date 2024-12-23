import React from 'react';
import Login from './Login';

function LoginPage() {
  return (
    <div>
      <h1>User Login</h1>
      <Login />
      <p>Don't have an account? 
      <a href="/">Register here</a></p>
    </div>
  );
}

export default LoginPage;
