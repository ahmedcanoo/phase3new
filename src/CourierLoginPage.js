import React from 'react';
import CourierLogin from './CourierLogin';

function CourierLoginPage() {
  return (
    <div>
      <h1>Courier Login</h1>
      <CourierLogin />
      <p>Don't have an account? 
      <a href="/register-courier">Register here</a></p>
    </div>
  );
}

export default CourierLoginPage;
