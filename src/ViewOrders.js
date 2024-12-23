import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewOrders.css'; 
function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState(''); 

  const [newStatus, setNewStatus] = useState("");  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`);
        console.log("Fetched Orders:", response.data); 
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  

  const handleUpdate = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);  
    setShowUpdateModal(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const updateOrderStatus = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${selectedOrder.id}/status`, {
        status: newStatus,
      });

      if (response.status === 200) {
        setShowUpdateModal(false);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async () => {
    console.log("Selected Order to Delete:", selectedOrder);
  
    if (!selectedOrder || !selectedOrder.id) {
      console.log("Invalid Order ID");
      setMessage("Order ID is invalid.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${selectedOrder.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'userId': localStorage.getItem('userId'),
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Order deleted successfully:", data);
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== selectedOrder.id));
        setShowDeleteModal(false);
        setMessage("Order deleted successfully.");
      } else {
        setMessage(`Failed to delete order. ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      setMessage(`Failed to delete order. ${error.message}`);
    }
  }; 

  return (
    <div className="orders-container">
      <h2>Orders Management</h2>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id || 'No Name'}</td> 
                <td>{order.status}</td>
                <td className="actions-column">
                  <button onClick={() => handleUpdate(order)} className="update-button">Update</button>
                  <button onClick={() => handleDelete(order)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Order Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)} 
              className="status-dropdown"
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="In transit">In transit</option>
              <option value="Accepted">Accepted</option>
              <option value="Picked up">Picked up</option>
              <option value="Pending acceptance">Pending acceptance</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={updateOrderStatus} className="confirm-button-blue">Yes, Update</button>
            <button onClick={() => setShowUpdateModal(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this order?</h3>
            <button onClick={deleteOrder} className="confirm-button-red">Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewOrders;