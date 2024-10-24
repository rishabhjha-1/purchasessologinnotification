import React, { useState } from 'react';
import axios from 'axios';
import './PurchaseDashboard.css'; 

const PurchaseDashboard = () => {
  const [purchaseDetails, setPurchaseDetails] = useState({
    itemName: '',
    quantity: '',
    unitPrice: '',
    totalPrice: '',
    shippingCharges: '',
    taxAmount: '',
    superiorEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setPurchaseDetails(prevState => {
      const updatedDetails = {
        ...prevState,
        [name]: value
      };

      // Calculate total price when quantity or unit price changes
      if (name === 'quantity' || name === 'unitPrice') {
        const quantity = updatedDetails.quantity ? parseFloat(updatedDetails.quantity) : 0;
        const unitPrice = updatedDetails.unitPrice ? parseFloat(updatedDetails.unitPrice) : 0;
        updatedDetails.totalPrice = quantity * unitPrice;
      }

      return updatedDetails;
    });
  };

  const createPurchaseRequest = () => {
    axios.post('http://localhost:3003/create-purchase', purchaseDetails)
      .then(response => {
        alert('Purchase request created');
        // Reset form after successful submission
        setPurchaseDetails({
          itemName: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          shippingCharges: '',
          taxAmount: '',
          superiorEmail: ''
        });
      })
      .catch(error => {
        console.error('Error creating purchase request:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <h1>Create Purchase Request</h1>
      <form className="purchase-form">
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={purchaseDetails.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={purchaseDetails.quantity}
            onChange={handleChange}
            required
            min="1" 
          />
        </div>
        <div className="form-group">
          <label>Unit Price</label>
          <input
            type="number"
            name="unitPrice"
            value={purchaseDetails.unitPrice}
            onChange={handleChange}
            required
            min="0" 
          />
        </div>
        <div className="form-group">
          <label>Total Price</label>
          <input
            type="number"
            name="totalPrice"
            value={purchaseDetails.totalPrice}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Shipping/Delivery Charges</label>
          <input
            type="number"
            name="shippingCharges"
            value={purchaseDetails.shippingCharges}
            onChange={handleChange}
            required
            min="0" 
          />
        </div>
        <div className="form-group">
          <label>Tax Amount</label>
          <input
            type="number"
            name="taxAmount"
            value={purchaseDetails.taxAmount}
            onChange={handleChange}
            required
            min="0" 
          />
        </div>
        <div className="form-group">
          <label>Superior's Email</label>
          <input
            type="email"
            name="superiorEmail"
            value={purchaseDetails.superiorEmail}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={createPurchaseRequest} className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PurchaseDashboard;
