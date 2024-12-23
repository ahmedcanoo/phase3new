import React from 'react';
import axios from 'axios';

function DeleteOrder({ order, closeModal }) {
  const deleteOrder = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${order._id}`);
      console.log('Order deleted:', response.data);
      alert('Order deleted successfully!');
      closeModal(); 
    } catch (error) {
      console.error("Error deleting order:", error);
      alert('Failed to delete order. Please try again.');
    }
  };

  return (
    <div className="modal">
      <h2>Are you sure you want to delete this orderrrrrrrr?</h2>
      <button onClick={deleteOrder}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
}

export default DeleteOrder;
