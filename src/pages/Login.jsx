import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="logo">Nasa Apod Gallery</div>
      <h3>Login</h3>
      <form className="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <div className="google-login">
          <button className="google-button">Login with Google</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
