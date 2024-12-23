import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        method: 'GET',
        headers: {
          'userId': userId,
        },
      })
        .then(response => response.json())
        .then(data => {
          setOrders(data || []);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    } else {
      console.error('UserID is not available');
    }
  }, [userId]);

  return (
    <div className="orders-container">
      <h2 className="heading">My Orders</h2>
      {orders.length > 0 ? (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Pickup Location</th>
                <th>Drop-off Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.pickupLocation}</td>
                  <td>{order.dropOffLocation}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link to={`/order-details/${order.id}`} className="view-details-button">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default MyOrders;
