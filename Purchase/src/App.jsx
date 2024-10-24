import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PurchaseDashboard from './components/PurchaseDashboard'; // Purchase Request Form
import ApprovalDashboard from './components/ApprovalDashboard'; // Approval Page

const App = () => {
  return (
    <Router>
      <div style={{width:'100%'}}>
        <Routes>
          {/* Route for Google Login */}
          <Route path="/" element={<Login />} />

          {/* Route for Purchase Request Dashboard */}
          <Route path="/purchase" element={<PurchaseDashboard />} />

          {/* Route for Purchase Approval Dashboard */}
          <Route path="/approval" element={<ApprovalDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
