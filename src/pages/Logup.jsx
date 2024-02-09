import React from 'react';

const LogupPage = () => {
  return (
    <div className="logup-container">
      <div className="logo">Nasa Apod Gallery</div>
      <h3>Sign Up</h3>
      <form className="logup-form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
        <div className="google-login">
          <button className="google-button">Sign Up with Google</button>
        </div>
      </form>
    </div>
  );
};

export default LogupPage;
