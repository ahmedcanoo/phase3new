import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import Login from './Login';
import HomePage from './HomePage';
import CreateOrder from './CreateOrder';
import MyOrders from './MyOrders'; 
import OrderDetails from './OrderDetails';
import WelcomePage from './WelcomePage';
import CourierRegistrationForm from './CourierRegistrationForm'; 
import CourierLogin from './CourierLogin'; 
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ViewOrders from './ViewOrders';
import UpdateOrderStatus from './UpdateOrderStatus';
import DeleteOrder from './DeleteOrder';
import AssignedOrders from './AssignedOrders';
import CourierDashboard from './CourierDashboard'; 
import CourierOrders from './CourierOrders';
import './style.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} /> 
        <Route path="/create-order" element={<CreateOrder />} /> 
        <Route path="/my-orders" element={<MyOrders />} /> 
        <Route path="/order-details/:id" element={<OrderDetails />} /> 
        <Route path="/register-courier" element={<CourierRegistrationForm />} />
        <Route path="/login-courier" element={<CourierLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<ViewOrders />} />
        <Route path="/admin/orders/update/:id" element={<UpdateOrderStatus />} />
        <Route path="/admin/orders/delete/:id" element={<DeleteOrder />} />
        <Route path="/admin/assigned-orders" element={<AssignedOrders />} />
        <Route path="/courier-dashboard" element={<CourierDashboard />} />
        <Route path="/courier-orders" element={<CourierOrders />} />

        </Routes>
    </Router>
  );
};

export default App;
