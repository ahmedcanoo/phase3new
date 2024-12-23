import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetails.css';
const OrderDetails = () => {
  const { id } = useParams();  
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false); 
  const [isCanceling, setIsCanceling] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id && /^[0-9a-fA-F]{24}$/.test(id)) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        headers: { 'userId': localStorage.getItem('userId') }
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${text}`);
          });
        }
        return response.json();  
      })
      .then(data => {
        if (data && data.id) {
          setOrder(data); 
        } else {
          setMessage("Order not found or invalid data format.");
        }
      })
      .catch(error => {
        setMessage("Failed to fetch order details.");
      });
    } else {
      setMessage("Invalid Order ID format.");
    }
  }, [id]);  

  const handleCancelOrder = () => {
    if (order.status !== 'Pending' && order.status !== 'Pending Acceptance') {
      setMessage("Sorry, this order can't be canceled.");
      return;
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, {
      method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'userId': localStorage.getItem('userId') }
    })
    .then(response => response.json())
    .then(data => {
        setMessage(data.message || "Order canceled successfully.");
        setTimeout(() => navigate('/my-orders'), 2000); 
    })
    .catch(error => {
        setMessage(`Failed to cancel order. ${error.message}`);
    });
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false); 
    setIsCanceling(false);  
  };

  return (
    <div className="order-details">
      {message && <p>{message}</p>}  
      
      {order ? (
        <>
          <h2>Order Details</h2>
          <p><strong>Pickup Location:</strong> {order.pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> {order.dropOffLocation}</p>
          <p><strong>Package Details:</strong> {order.packageDetails}</p>
          <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
          <p><strong>Status:</strong> {order.status}</p>
          
          <div className="courier-info">
            <h3>Courier Info:</h3>
            <p><strong>Name:</strong> {order.courierName}</p>
            <p><strong>Email:</strong> {order.courierEmail}</p>
            <p><strong>Phone:</strong> {order.courierPhone}</p>
          </div>

          <button
            onClick={() => {
              if (order.status === 'Pending' || order.status === 'Pending Acceptance') {
                setShowCancelModal(true); 
                setIsCanceling(true);  
              } else {
                setMessage("Sorry, this order can't be canceled.");
              }
            }}
            className={isCanceling ? 'cancel-button active' : 'cancel-button'}
          >
            Cancel Order
          </button>
        </>
      ) : (
        <p>Loading order details...</p>  
      )}

      {showCancelModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to cancel this order?</h3>
            <button onClick={handleCancelOrder} className="confirm-button-red">Yes, Cancel</button>
            <button onClick={handleCancelModalClose} className="cancel-button">No, Keep</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
