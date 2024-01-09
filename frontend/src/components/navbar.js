import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from "react-router-dom";

import homepagePic from './homepage1.png';

import counters from './counters.png';


export default function NavBar({ user, login, logout}) {
   
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    // Scroll down by 50vh
    window.scrollTo({
      top: window.innerHeight * 0.5,
      behavior: 'smooth', // You can change this to 'auto' for instant scroll
    });
  };
   
    
  const handleLogout = () => {
    logout()
  };
  return (
    <div style={{marginBottom: '20vh'}}>
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
    <div>
    <div style={{marginTop: '10vh'}} className="container">
      <div className="container">
        <div className="col">
        <div className="row">
          <div className="col">
            <h1>Doctor Lookup</h1>
            <p>Find the best doctors in your area </p>
            <div
          className="SizeSTypeSecondaryStateHoverIconLeftOffIconRightOnBackgroundLightIconOnlyOff"
          style={{
            width: 128,
            height: 32,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
            background: 'linear-gradient(91deg, #18A1CC 0%, #92D1FF 100%)',
            boxShadow: '0px 3px 10px rgba(32, 132, 217, 0.50)',
            borderRadius: 8,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'inline-flex',
            cursor: 'pointer', // Add cursor style for better UX
          }}
          onClick={handleButtonClick}
        >
          <div
            className="Text"
            style={{
              textAlign: 'right',
              color: 'white',
              fontSize: 12,
              fontFamily: 'Poppins',
              fontWeight: '600',
              lineHeight: 16,
              letterSpacing: 0.20,
              wordWrap: 'break-word',
            }}
          >
            Search Now 
          </div>
          <div
            className="ChevronRight"
            style={{
              width: 16,
              height: 16,
              position: 'relative',
            }}
          >
            <div
              className="Vector"
              style={{
                width: 4,
                height: 8,
                left: 6,
                top: 4,
                position: 'absolute',
                border: '2px white solid',
              }}
            ></div>
      </div>
    </div>
          </div>
          <div className="col">
            <div className="Object" style={{width: 487.12, height: 612.71, position: 'relative'}}>
                <img src={homepagePic} style={{width: 487.12, height: 612.71, left: 0, top: 0, position: 'absolute'}} />
            </div>
      </div>
      </div>
      </div>
    </div>





    <div className="container">
    <div className="Counters" style={{width: 1127, height: 210, position: 'relative'}}>
    <div className="Counter" style={{width: 349, height: 176, paddingTop: 11, left: 0, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
        <img src={counters} style={{width: '90vw', height: '30vh'}} />

    </div>
    </div>
    </div>
    </div>
  </div>
    </div>
  );
  
}
