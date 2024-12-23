import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourierOrders.css';

function CourierOrders() {
  const [orders, setOrders] = useState([]);
  const [courierEmail, setCourierEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('courierEmail');
    if (email) {
      setCourierEmail(email);
      fetchOrders(email);
    } else {
      setError('Courier email is not set. Please log in again.');
    }
  }, []);

  const fetchOrders = async (email) => {
    if (!email) {
      setError('Courier email is not set.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8001/api/courier/orders?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      } else {
        setOrders([]);
        setError('No orders found for this courier.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8001/api/orders/${orderId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courierEmail }),
      });

      if (!response.ok) throw new Error('Failed to accept order');
      const data = await response.json();
      fetchOrders(courierEmail);
    } catch (error) {
      setError(`Failed to accept order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8001/api/orders/${orderId}/decline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: courierEmail }),
      });

      if (!response.ok) throw new Error('Failed to decline order');
      const data = await response.json();
      fetchOrders(courierEmail);
    } catch (error) {
      setError(`Failed to decline order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (orderId, event) => {
    const selectedStatus = event.target.value;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: selectedStatus } : order
      )
    );
    handleUpdateStatus(orderId, selectedStatus);
  };

  const handleUpdateStatus = (orderId, status) => {
    const requestBody = { status, email: courierEmail };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderId}/update-status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchOrders(courierEmail);
        navigate(`/courier-orders`);
      })
      .catch((error) => console.error('Failed to update status:', error));
  };

  const isStatusDisabled = (order, status) => {
    if (status === 'In transit' && (order.status === 'Picked up' || order.status === 'Delivered')) {
      return true;
    }
    if (status === 'Picked up' && order.status === 'Delivered') {
      return true;
    }
    return false;
  };

  return (
    <div className="orders-container">
      <h2>Your Assigned Orders</h2>
      {isLoading && <p>Loading orders...</p>}
      {error && <p className="error-message">{error}</p>}

      {orders.length === 0 && !isLoading && !error ? (
        <p>No assigned orders at the moment. Please check back later.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Pickup Location</th>
              <th>Drop-Off Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.pickupLocation}</td>
                <td>{order.dropOffLocation}</td>
                <td>{order.status}</td>
                <td>
                  <div className="actions">
                    {order.status === 'Pending Acceptance' && (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleAcceptOrder(order.id)}
                          disabled={isLoading}
                        >
                          Accept
                        </button>
                        <button
                          className="decline-btn"
                          onClick={() => handleDeclineOrder(order.id)}
                          disabled={isLoading}
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {order.status !== 'Pending Acceptance' && (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e)}
                        disabled={isLoading}
                      >
                        <option value="In transit" disabled={isStatusDisabled(order, 'In transit')}>In transit</option>
                        <option value="Picked up" disabled={isStatusDisabled(order, 'Picked up')}>Picked up</option>
                        <option value="Delivered" disabled={isStatusDisabled(order, 'Delivered')}>Delivered</option>
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourierOrders;
