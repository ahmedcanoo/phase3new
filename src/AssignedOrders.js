import React, { useState, useEffect } from 'react';

function AssignedOrders() {
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState({});
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    fetchOrdersAndCouriers();
  }, []);

  const fetchOrdersAndCouriers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/admin/orders`)
    .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Failed to fetch orders:', error));

      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/couriers`)
      .then((response) => response.json())
      .then((data) => setCouriers(data))
      .catch((error) => console.error('Failed to fetch couriers:', error));
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 3000); 
  };

  const handleAssignOrReassign = (orderId, isReassign) => {
    const courierEmail = selectedCourier[orderId];
    const currentOrder = orders.find(order => order.id === orderId);
  
    if (!courierEmail) {
      console.error('No courier selected.');
      showPopupMessage('Please select a courier.');
      return;
    }
  
    if (!isReassign && currentOrder.assignedCourier) {
      showPopupMessage("Order is already assigned. Cannot assign again.");
      return;
    }
  
    if (isReassign && currentOrder.assignedCourier === courierEmail) {
      showPopupMessage('Cannot reassign to the same courier.');
      return;
    }
  
    const endpoint = isReassign
    ? `${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${orderId}/reassign-courier`
    : `${process.env.REACT_APP_BACKEND_URL}/api/admin/orders/${orderId}/assign-courier`;
  
    fetch(endpoint, {
      method: isReassign ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: courierEmail }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => Promise.reject(err));
        }
        return response.json();
      })
      .then((data) => {
        showPopupMessage(data.message || (isReassign ? 'Order reassigned successfully' : 'Order assigned successfully'));
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: 'Pending Acceptance', assignedCourier: courierEmail } : order
          )
        );
      })
      .catch((error) => console.error(`Failed to ${isReassign ? 'reassign' : 'assign'} courier:`, error));
  };
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Assigned Orders</h2>

      {popupMessage && (
        <div
          style={{
            background: 'red',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            position: 'fixed',
            top: '20px',
            left: '20px',
            borderRadius: '5px',
          }}
        >
          {popupMessage}
        </div>
      )}

      <div
        style={{
          backgroundColor: 'white', 
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Select Courier</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
  {orders.map((order) => (
    <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
      <td style={{ padding: '8px' }}>{order.id}</td>
      <td style={{ padding: '8px', textAlign: 'left' }}>{order.status}</td>
      {['In transit', 'Delivered', 'Picked up'].includes(order.status) ? (
        <>
          <td style={{ padding: '8px' }}></td> {}
          <td style={{ padding: '8px' }}></td> {}
        </>
      ) : (
        <>
          <td style={{ padding: '8px' }}>
            <select
              onChange={(e) => setSelectedCourier({ ...selectedCourier, [order.id]: e.target.value })}
              value={selectedCourier[order.id] || ''}
              style={{ padding: '5px', width: '100%' }}
            >
              <option value="">Select a courier</option>
              {couriers.map((courier) => (
                <option
                  key={courier.id}
                  value={courier.email}
                  disabled={order.assignedCourier === courier.email}
                >
                  {courier.name}
                </option>
              ))}
            </select>
          </td>
          <td style={{ padding: '8px' }}>
            <button
              onClick={() => handleAssignOrReassign(order.id, false)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#3498db', // Blue
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                marginRight: '5px',
              }}
            >
              Assign
            </button>
            <button
              onClick={() => handleAssignOrReassign(order.id, true)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#d9534f', // Red
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reassign
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>


        </table>
      </div>
    </div>
  );
}

export default AssignedOrders;
