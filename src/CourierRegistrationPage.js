import React from 'react';
import CourierRegistrationForm from './CourierRegistrationForm';

function CourierRegistrationPage() {
  return (
    <div>
      <h1>Courier Registration</h1>
      <CourierRegistrationForm />
      <p>Already have an account? 
      <a href="/login-courier">Login here</a></p>
    </div>
  );
}

export default CourierRegistrationPage;
