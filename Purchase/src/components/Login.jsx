import React from 'react';
import './Login.css'; 

const Login = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login with Google</h1>
      <button className="login-button" onClick={loginWithGoogle}>
        Login
      </button>
    </div>
  );
};

export default Login;
