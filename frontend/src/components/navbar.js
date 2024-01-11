import React, {useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from "react-router-dom";

import homepagePic from './homepage1.png';

import counters from './Counters.png';
import './navbar.css';
import Testimonials from "./Testimonials";


export default function NavBar({ user, login, logout}) {
   
  const testimonialsRef = useRef();

  const handleTestButtonClick = () => {
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  
   
  const handleButtonClick = () => {
    // Scroll down by 50vh
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth', // You can change this to 'auto' for instant scroll
    });
  };
    
  const handleLogout = () => {
    logout()
  };
  return (
    <div style={{marginBottom: '18vh'}}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                    <button
                      className="nav-link login-link"
                      style={{
                        marginRight: "10px",
                        color: "black",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onClick={handleButtonClick}
                      onMouseEnter={(e) => e.target.style.color = "#18A1CC"}
                      onMouseLeave={(e) => e.target.style.color = "black"}
                    >
                      Search Now
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link login-link"
                      style={{
                        marginRight: "10px",
                        color: "black",
                        cursor: "pointer",
                        transition: "color 0.3s",
                      }}
                      onClick={handleTestButtonClick}
                      onMouseEnter={(e) => e.target.style.color = "#18A1CC"} 
                      onMouseLeave={(e) => e.target.style.color = "black"}
                    >
                      Testimonials
                    </button>
                  </li>
                  <li className="nav-item">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="nav-link login-link"
                        style={{
                          marginRight: "10px",
                          color: "black",
                          cursor: "pointer",
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#18A1CC"}
                        onMouseLeave={(e) => e.target.style.color = "black"}
                      >
                        {user.name.split(" ")[0]}, Logout
                      </button>
                    ) : (
                      <button
                        onClick={login}
                        className="nav-link login-link"
                        style={{
                          marginRight: "10px",
                          color: "black",
                          cursor: "pointer",
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#18A1CC"}
                        onMouseLeave={(e) => e.target.style.color = "black"}
                      >
                        Login
                      </button>
                    )}
                  </li>
                </ul>
              </div>

          </nav>
          <div>
          <div className="container text-left" style={{marginTop: '5vh'}}>
          <div className="row">
            <div className="col" style={{paddingTop:'10vh'}}>
                <h1 className="turbocharge">HealthConnect</h1>
                <p>Explore top-notch healthcare by finding the best doctors in your area effortlessly. Our platform streamlines your search, connecting you with qualified medical professionals tailored to your needs.</p>
                <div
                  className="SizeSTypeSecondaryStateHoverIconLeftOffIconRightOnBackgroundLightIconOnlyOff"
                  style={{
                    height: '5vh',
                    paddingLeft: 16,
                    paddingRight: '1vw',
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
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'right',
                        color: 'white',
                        fontSize: '2rem',
                        fontFamily: 'Arial',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
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
                    </div>
                </div>
              </div>
              <div className="col" style={{marginLeft:'9vw'}}>
                  <div className="Object" style={{width: 487.12, height: 612.71, position: 'relative'}}>
                      <img src={homepagePic} style={{width: 487.12, height: 612.71, left: 0, top: 0, position: 'absolute'}} />
                  </div>
            </div>
          </div>
         </div>
       </div>

          <div className="container">
          <div className="Counters" style={{width: 1127, height: 210, position: 'relative'}}>
              <img src={counters}/>
          </div>
          </div>

          <div className="container" style={{marginTop: '12vh'}}>
            <h2 className="text-center" style={{marginTop: '10vh', marginBottom: '3vh', size: "4.5rem", color: "#18A1CC"}}>Testimonials</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Testimonials ref={testimonialsRef} />
            </div>
           
          </div>
    </div>
  );
  
}
