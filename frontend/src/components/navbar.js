import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function NavBar({ user, login, logout}) {
 
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/doctors" className="navbar-brand d-flex align-items-center">
        <img src="../logo.png"  width="" height="40" className="d-inline-block align-top mr-2" />
        HealthConnect
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {user ? (
              <button onClick={handleLogout} className="nav-link login-link">
                {user.name.split(" ")[0]}, Logout
              </button>
            ) : (
              <button onClick={login} className="nav-link login-link" style={{marginRight: "10px"}}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
  
}
