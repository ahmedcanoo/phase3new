import React, { useState } from 'react';
import axios from 'axios';

function UpdateOrderStatus({ order, closeModal }) {
  const [status, setStatus] = useState(order.status);

  const updateOrderStatus = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${order._id}/status`, { status });
      console.log('Order updated:', response.data);
      alert('Order status updated successfully!');
      closeModal(); 
    } catch (error) {
      console.error("Error updating order:", error);
      alert('Failed to update order. Please try again.');
    }
  };

  return (
    <div className="modal">
      <h2>Update Order Status</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button onClick={updateOrderStatus}>Update</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}

export default UpdateOrderStatus;
