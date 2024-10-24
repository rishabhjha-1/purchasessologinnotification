import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApprovalDashboard.css';

const ApprovalDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Fetch the pending purchase requests for approval
    axios.get('http://localhost:3003/pending-requests')
      .then(response => {
        setPendingRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending requests:', error);
      });
  }, []);

  const handleApprove = (requestId) => {
    axios.put(`http://localhost:3003/approve-purchase/${requestId}`)
      .then(response => {
        alert('Request approved');
        setPendingRequests(prevRequests => 
          prevRequests.filter(request => request._id !== requestId)
        );
      })
      .catch(error => {
        console.error('Error approving request:', error);
      });
  };

  return (
    <div className="approval-dashboard">
      <h1 className="dashboard-title">Approval Dashboard</h1>
      <ul className="request-list">
        {pendingRequests.map(request => (
          <li key={request.id} className="request-item">
            <span className="request-info">
              {request.itemName} - ${request.totalPrice.toFixed(2)}
            </span>
            <button onClick={() => handleApprove(request._id)} className="approve-button">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovalDashboard;
